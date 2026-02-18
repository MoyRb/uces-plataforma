import { NextResponse } from "next/server";

import { requireAdmin, toNullableText, toOptionalNumber } from "../../utils";

type Params = { params: { id: string } };

export async function GET(request: Request, { params }: Params) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { data, error } = await admin.supabase
    .from("assessments")
    .select("id, vacancy_id, title, duration_minutes, questions(id, prompt, options, correct_option)")
    .eq("id", params.id)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Evaluación no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PATCH(request: Request, { params }: Params) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const vacancyId = toNullableText(body?.vacancy_id);

  if (!vacancyId) {
    return NextResponse.json({ error: "vacancy_id es obligatorio" }, { status: 400 });
  }

  const payload = {
    vacancy_id: vacancyId,
    title: toNullableText(body?.title),
    duration_minutes: toOptionalNumber(body?.duration_minutes) ?? 30,
  };

  const { data, error } = await admin.supabase.from("assessments").update(payload).eq("id", params.id).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo actualizar la evaluación" }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: Request, { params }: Params) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { error } = await admin.supabase.from("assessments").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo eliminar la evaluación" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
