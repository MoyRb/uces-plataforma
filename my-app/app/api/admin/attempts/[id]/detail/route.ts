import { NextResponse } from "next/server";

import { normalizedDecision, requireAdmin, toNullableText } from "../../../utils";

type Params = { params: Promise<{ id: string }> };

type SupabaseErrorLike = { code?: string; message?: string } | null;

const isMissingReviewsTable = (error: SupabaseErrorLike) => {
  if (!error) return false;
  return error.code === "42P01" || error.code === "PGRST205" || error.message?.toLowerCase().includes("reviews") || false;
};

const isMissingPsychometricSummaryColumn = (error: SupabaseErrorLike) => {
  if (!error) return false;
  return error.code === "42703" || error.message?.toLowerCase().includes("psychometric_summary") || false;
};

const readDecisionState = async (admin: Exclude<Awaited<ReturnType<typeof requireAdmin>>, NextResponse>, attemptId: string) => {
  const { data: reviewData, error: reviewError } = await admin.supabase
    .from("reviews")
    .select("decision, notes, comments")
    .eq("attempt_id", attemptId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ decision?: string | null; notes?: string | null; comments?: string | null }>();

  if (!reviewError) {
    return {
      decision: normalizedDecision(reviewData?.decision),
      reviewer_notes: toNullableText(reviewData?.notes ?? reviewData?.comments),
      decision_source: "reviews",
    };
  }

  if (!isMissingReviewsTable(reviewError)) {
    throw reviewError;
  }

  const { data: attemptData, error: attemptError } = await admin.supabase
    .from("attempts")
    .select("decision, reviewer_notes")
    .eq("id", attemptId)
    .maybeSingle<{ decision?: string | null; reviewer_notes?: string | null }>();

  if (attemptError) {
    return {
      decision: null,
      reviewer_notes: null,
      decision_source: "none",
    };
  }

  return {
    decision: normalizedDecision(attemptData?.decision),
    reviewer_notes: toNullableText(attemptData?.reviewer_notes),
    decision_source: "attempts",
  };
};

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const queryWithSummary = admin.supabase
    .from("attempts")
    .select(
      "id, assessment_id, status, started_at, submitted_at, deadline_at, theory_score, psychometric_summary, application:applications!inner(id, user_id, vacancy_id, vacancy:vacancies(id, title, module_id, module:modules(id, name)), profile:profiles!applications_user_id_fkey(name, email)), answers(*, question:questions(id, prompt, options, correct_option)), evidence_uploads(*)"
    )
    .eq("id", id);

  const { data: dataWithSummary, error: errorWithSummary } = await queryWithSummary.maybeSingle<Record<string, unknown>>();

  const { data, error } = isMissingPsychometricSummaryColumn(errorWithSummary)
    ? await admin.supabase
        .from("attempts")
        .select(
          "id, assessment_id, status, started_at, submitted_at, deadline_at, theory_score, application:applications!inner(id, user_id, vacancy_id, vacancy:vacancies(id, title, module_id, module:modules(id, name)), profile:profiles!applications_user_id_fkey(name, email)), answers(*, question:questions(id, prompt, options, correct_option)), evidence_uploads(*)"
        )
        .eq("id", id)
        .maybeSingle<Record<string, unknown>>()
    : { data: dataWithSummary, error: errorWithSummary };

  if (error || !data) {
    return NextResponse.json({ error: "Intento no encontrado" }, { status: 404 });
  }

  const evidence = Array.isArray(data.evidence_uploads) ? data.evidence_uploads.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === "object")) : [];

  const evidenceWithUrl = await Promise.all(
    evidence.map(async (item) => {
      const bucket = typeof item.bucket === "string" && item.bucket.trim() ? item.bucket : "evidences";
      const path = typeof item.path === "string" ? item.path : typeof item.file_path === "string" ? item.file_path : "";

      if (!path) {
        return {
          ...item,
          signedUrl: null,
        };
      }

      const { data: signedData } = await admin.supabase.storage.from(bucket).createSignedUrl(path, 60 * 60);
      return {
        ...item,
        signedUrl: signedData?.signedUrl ?? null,
      };
    })
  );

  const decisionState = await readDecisionState(admin, id);

  return NextResponse.json({
    data: {
      ...data,
      ...decisionState,
      evidence_uploads: evidenceWithUrl,
    },
  });
}
