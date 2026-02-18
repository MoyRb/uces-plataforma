import { NextResponse } from "next/server";

import { normalizedAttemptStatus, requireAdmin, toNullableText, toOptionalNumber } from "../../utils";

type Params = { params: Promise<{ id: string }> };
type AdminSession = Exclude<Awaited<ReturnType<typeof requireAdmin>>, NextResponse>;

type SupabaseErrorLike = { code?: string; message?: string } | null;

const isMissingReviewsTable = (error: SupabaseErrorLike) => {
  if (!error) return false;
  return error.code === "42P01" || error.code === "PGRST205" || error.message?.toLowerCase().includes("reviews") || false;
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

async function getAttemptDetail(request: Request, id: string) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { data, error } = await admin.supabase
    .from("attempts")
    .select(
      "id, assessment_id, status, started_at, submitted_at, deadline_at, theory_score, application:applications!inner(id, user_id, vacancy_id, vacancy:vacancies(id, title, module_id, module:modules(id, name)), profile:profiles!applications_user_id_fkey(name, email)), answers(*, question:questions(id, prompt, options, correct_option)), evidence_uploads(*), reviews(*)"
    )
    .eq("id", id)
    .maybeSingle<Record<string, unknown>>();

  if (error || !data) {
    return NextResponse.json({ error: "Intento no encontrado" }, { status: 404 });
  }

  const evidence = Array.isArray(data.evidence_uploads) ? data.evidence_uploads.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object")) : [];

  const evidenceWithUrl = await withEvidenceSignedUrls(admin.supabase, evidence);

  return NextResponse.json({
    data: {
      ...data,
      evidence_uploads: evidenceWithUrl,
    },
  });
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  return getAttemptDetail(request, id);
}

const upsertReview = async (
  admin: AdminSession,
  id: string,
  notes: string | null,
  decision: string | null
) => {
  const { data: existingReview, error: existingReviewError } = await admin.supabase
    .from("reviews")
    .select("id")
    .eq("attempt_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string }>();

  if (isMissingReviewsTable(existingReviewError)) {
    return null;
  }

  const cleanDecision = toNullableText(decision)?.toUpperCase() ?? null;
  const cleanNotes = toNullableText(notes);

  const writeReview = async (notesColumn: "notes" | "comments") => {
    const reviewPayload: Record<string, unknown> = {
      attempt_id: id,
      reviewer_id: admin.userId,
      decision: cleanDecision,
      created_at: new Date().toISOString(),
    };

    if (cleanNotes !== null) {
      reviewPayload[notesColumn] = cleanNotes;
    }

    return existingReview
      ? admin.supabase.from("reviews").update(reviewPayload).eq("id", existingReview.id)
      : admin.supabase.from("reviews").insert(reviewPayload);
  };

  let { error: reviewError } = await writeReview("notes");

  if (reviewError?.message?.toLowerCase().includes("notes")) {
    ({ error: reviewError } = await writeReview("comments"));
  }

  if (reviewError && !isMissingReviewsTable(reviewError)) {
    return reviewError;
  }

  return null;
};

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  const requestedStatus = normalizedAttemptStatus(body?.status);
  const theoryScore = toOptionalNumber(body?.theory_score);

  const updatePayload: Record<string, unknown> = {};

  if (requestedStatus) {
    updatePayload.status = requestedStatus;
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

  const reviewError = await upsertReview(
    admin,
    id,
    typeof body?.notes === "string" ? body.notes : null,
    typeof body?.decision === "string" ? body.decision : null
  );

  if (reviewError) {
    return NextResponse.json({ error: reviewError.message || "No se pudo guardar la revisión" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
