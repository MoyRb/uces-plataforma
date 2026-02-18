import { NextResponse } from "next/server";

import { normalizedAttemptStatus, requireAdmin, toNullableText, toOptionalNumber } from "../../utils";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { data, error } = await admin.supabase
    .from("attempts")
    .select(
      "id, status, started_at, submitted_at, deadline_at, theory_score, application:applications!inner(id, user_id, vacancy_id, vacancy:vacancies(title), profile:profiles!applications_user_id_fkey(name, email)), answers(id, selected_option, question:questions(id, prompt, options, correct_option)), evidence_uploads(id, bucket, path, mime_type, size, created_at), reviews(id, comments, decision, created_at)"
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Intento no encontrado" }, { status: 404 });
  }

  const evidenceWithUrl = await Promise.all((data.evidence_uploads ?? []).map(async (item: { bucket: string | null; path: string }) => {
    const bucket = item.bucket ?? "evidences";
    const { data: signedData } = await admin.supabase.storage.from(bucket).createSignedUrl(item.path, 60 * 60);
    return {
      ...item,
      signedUrl: signedData?.signedUrl ?? null,
    };
  }));

  return NextResponse.json({
    data: {
      ...data,
      evidence_uploads: evidenceWithUrl,
    },
  });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;

  const scoreFinal = toOptionalNumber(body?.score_final);
  const reviewNotes = toNullableText(body?.review_notes);
  const requestedStatus = normalizedAttemptStatus(body?.status);

  const updatePayload: Record<string, unknown> = {};

  if (typeof scoreFinal === "number") {
    updatePayload.theory_score = scoreFinal;
  }

  updatePayload.status = requestedStatus ?? "COMPLETED";

  const { error: attemptError } = await admin.supabase.from("attempts").update(updatePayload).eq("id", id);

  if (attemptError) {
    return NextResponse.json({ error: attemptError.message || "No se pudo actualizar el intento" }, { status: 400 });
  }

  const { data: existingReview } = await admin.supabase
    .from("reviews")
    .select("id")
    .eq("attempt_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle<{ id: string }>();

  const reviewPayload = {
    attempt_id: id,
    reviewer_id: admin.userId,
    comments: reviewNotes,
    decision: toNullableText(body?.decision) ?? "APPROVED",
    created_at: new Date().toISOString(),
  };

  const reviewQuery = existingReview
    ? admin.supabase.from("reviews").update(reviewPayload).eq("id", existingReview.id)
    : admin.supabase.from("reviews").insert(reviewPayload);

  const { error: reviewError } = await reviewQuery;

  if (reviewError) {
    return NextResponse.json({ error: reviewError.message || "No se pudo guardar la revisión" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
