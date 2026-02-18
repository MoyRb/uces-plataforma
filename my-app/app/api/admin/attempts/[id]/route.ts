import { NextResponse } from "next/server";

import {
  ALLOWED_ATTEMPT_STATUSES,
  normalizedAttemptStatus,
  normalizedDecision,
  requireAdmin,
  toNullableText,
  toOptionalNumber,
} from "../../utils";

type Params = { params: Promise<{ id: string }> };
type AdminSession = Exclude<Awaited<ReturnType<typeof requireAdmin>>, NextResponse>;

type SupabaseErrorLike = { code?: string; message?: string } | null;

type DecisionPayload = {
  decision: "APPROVED" | "REJECTED" | null;
  notes: string | null;
  source: "reviews" | "attempts" | "none";
};

const isMissingReviewsTable = (error: SupabaseErrorLike) => {
  if (!error) return false;
  return error.code === "42P01" || error.code === "PGRST205" || error.message?.toLowerCase().includes("reviews") || false;
};

const isMissingAttemptsColumn = (error: SupabaseErrorLike, columnName: "decision" | "reviewer_notes") => {
  if (!error?.message) return false;
  const message = error.message.toLowerCase();
  return message.includes("column") && message.includes(columnName);
};

const withEvidenceSignedUrls = async (
  supabase: Awaited<ReturnType<typeof requireAdmin>> extends infer T
    ? T extends { supabase: infer S }
      ? S
      : never
    : never,
  evidence: Record<string, unknown>[]
) => {
  return Promise.all(
    evidence.map(async (item) => {
      const bucket = typeof item.bucket === "string" && item.bucket.trim() ? item.bucket : "evidences";
      const path = typeof item.path === "string" ? item.path : typeof item.file_path === "string" ? item.file_path : "";

      if (!path) {
        return {
          ...item,
          signedUrl: null,
        };
      }

      const { data: signedData } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60);
      return {
        ...item,
        signedUrl: signedData?.signedUrl ?? null,
      };
    })
  );
};

const readDecisionFromReviews = async (admin: AdminSession, attemptId: string): Promise<DecisionPayload | null> => {
  const { data, error } = await admin.supabase
    .from("reviews")
    .select("decision, notes, comments")
    .eq("attempt_id", attemptId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ decision?: string | null; notes?: string | null; comments?: string | null }>();

  if (error) {
    if (isMissingReviewsTable(error)) return null;

    if (error.message?.toLowerCase().includes("notes")) {
      const { data: fallbackData, error: fallbackError } = await admin.supabase
        .from("reviews")
        .select("decision, comments")
        .eq("attempt_id", attemptId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle<{ decision?: string | null; comments?: string | null }>();

      if (fallbackError) {
        if (isMissingReviewsTable(fallbackError)) return null;
        throw fallbackError;
      }

      return {
        decision: normalizedDecision(fallbackData?.decision),
        notes: toNullableText(fallbackData?.comments),
        source: "reviews",
      };
    }

    throw error;
  }

  return {
    decision: normalizedDecision(data?.decision),
    notes: toNullableText(data?.notes ?? data?.comments),
    source: "reviews",
  };
};

const readDecisionFromAttempts = async (admin: AdminSession, attemptId: string): Promise<DecisionPayload | null> => {
  const { data, error } = await admin.supabase
    .from("attempts")
    .select("decision, reviewer_notes")
    .eq("id", attemptId)
    .maybeSingle<{ decision?: string | null; reviewer_notes?: string | null }>();

  if (error) {
    if (isMissingAttemptsColumn(error, "decision") || isMissingAttemptsColumn(error, "reviewer_notes")) return null;
    throw error;
  }

  return {
    decision: normalizedDecision(data?.decision),
    notes: toNullableText(data?.reviewer_notes),
    source: "attempts",
  };
};

const readDecisionState = async (admin: AdminSession, attemptId: string): Promise<DecisionPayload> => {
  const reviewDecision = await readDecisionFromReviews(admin, attemptId);
  if (reviewDecision) return reviewDecision;

  const attemptDecision = await readDecisionFromAttempts(admin, attemptId);
  if (attemptDecision) return attemptDecision;

  return { decision: null, notes: null, source: "none" };
};

const upsertReview = async (admin: AdminSession, id: string, notes: string | null, decision: "APPROVED" | "REJECTED" | null) => {
  const { data: existingReview, error: existingReviewError } = await admin.supabase
    .from("reviews")
    .select("id")
    .eq("attempt_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string }>();

  if (isMissingReviewsTable(existingReviewError)) {
    return { usedReviews: false, error: null as SupabaseErrorLike };
  }

  const cleanNotes = toNullableText(notes);

  const writeReview = async (notesColumn: "notes" | "comments", includeUpdatedAt = true) => {
    const now = new Date().toISOString();
    const reviewPayload: Record<string, unknown> = {
      attempt_id: id,
      reviewer_id: admin.userId,
      decision,
    };

    if (!existingReview) {
      reviewPayload.created_at = now;
    }

    if (includeUpdatedAt) {
      reviewPayload.updated_at = now;
    }

    reviewPayload[notesColumn] = cleanNotes;

    return existingReview
      ? admin.supabase.from("reviews").update(reviewPayload).eq("id", existingReview.id)
      : admin.supabase.from("reviews").insert(reviewPayload);
  };

  let { error: reviewError } = await writeReview("notes");

  if (reviewError?.message?.toLowerCase().includes("notes")) {
    ({ error: reviewError } = await writeReview("comments"));
  }

  if (reviewError?.message?.toLowerCase().includes("updated_at")) {
    ({ error: reviewError } = await writeReview("notes", false));
  }

  if (reviewError && !isMissingReviewsTable(reviewError)) {
    return { usedReviews: true, error: reviewError };
  }

  return { usedReviews: !reviewError, error: null as SupabaseErrorLike };
};

const persistDecisionAndNotes = async (admin: AdminSession, id: string, notes: string | null, decision: "APPROVED" | "REJECTED" | null) => {
  const reviewResult = await upsertReview(admin, id, notes, decision);
  if (reviewResult.error) {
    return reviewResult.error;
  }

  if (reviewResult.usedReviews) {
    return null;
  }

  const { error } = await admin.supabase.from("attempts").update({ decision, reviewer_notes: notes }).eq("id", id);

  return error;
};

async function getAttemptDetail(request: Request, id: string) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { data, error } = await admin.supabase
    .from("attempts")
    .select(
      "id, assessment_id, status, started_at, submitted_at, deadline_at, theory_score, application:applications!inner(id, user_id, vacancy_id, vacancy:vacancies(id, title, module_id, module:modules(id, name)), profile:profiles!applications_user_id_fkey(name, email)), answers(*, question:questions(id, prompt, options, correct_option)), evidence_uploads(*)"
    )
    .eq("id", id)
    .maybeSingle<Record<string, unknown>>();

  if (error || !data) {
    return NextResponse.json({ error: "Intento no encontrado" }, { status: 404 });
  }

  const decisionState = await readDecisionState(admin, id);

  const evidence = Array.isArray(data.evidence_uploads) ? data.evidence_uploads.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object")) : [];

  const evidenceWithUrl = await withEvidenceSignedUrls(admin.supabase, evidence);

  return NextResponse.json({
    data: {
      ...data,
      decision: decisionState.decision,
      reviewer_notes: decisionState.notes,
      decision_source: decisionState.source,
      evidence_uploads: evidenceWithUrl,
    },
  });
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  return getAttemptDetail(request, id);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  const rawStatus = body?.status;
  const requestedStatus = normalizedAttemptStatus(rawStatus);
  const theoryScore = toOptionalNumber(body?.theory_score);

  if (rawStatus !== undefined && !requestedStatus) {
    return NextResponse.json(
      { error: `Estado inválido. Estados permitidos: ${ALLOWED_ATTEMPT_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  const rawDecision = body?.decision;
  const requestedDecision = rawDecision === null ? null : normalizedDecision(rawDecision);

  if (rawDecision !== undefined && rawDecision !== null && !requestedDecision) {
    return NextResponse.json({ error: "Decisión inválida. Valores permitidos: APPROVED, REJECTED" }, { status: 400 });
  }

  const notes = body?.notes === null ? null : toNullableText(body?.notes);

  const updatePayload: Record<string, unknown> = {};

  if (requestedStatus) {
    updatePayload.status = requestedStatus;
  }

  if (rawDecision !== undefined && requestedDecision && updatePayload.status !== "UNDER_REVIEW") {
    updatePayload.status = "COMPLETED";
  }

  if (typeof theoryScore === "number") {
    updatePayload.theory_score = theoryScore;
  }

  if (Object.keys(updatePayload).length > 0) {
    const { error: attemptError } = await admin.supabase.from("attempts").update(updatePayload).eq("id", id);
    if (attemptError) {
      return NextResponse.json({ error: attemptError.message || "No se pudo actualizar el intento" }, { status: 400 });
    }
  }

  if (rawDecision !== undefined || body?.notes !== undefined) {
    const decisionError = await persistDecisionAndNotes(admin, id, notes, requestedDecision ?? null);
    if (decisionError) {
      return NextResponse.json({ error: decisionError.message || "No se pudo guardar la revisión" }, { status: 400 });
    }
  }

  return getAttemptDetail(request, id);
}
