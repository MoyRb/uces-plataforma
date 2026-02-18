import { NextResponse } from "next/server";

import { requireAdmin } from "../../../utils";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
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

  return NextResponse.json({
    data: {
      ...data,
      evidence_uploads: evidenceWithUrl,
    },
  });
}
