import { NextResponse } from "next/server";

import { requireAdmin, toNullableText, toOptionalBoolean } from "../../utils";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  const moduleId = toNullableText(body?.module_id);
  const title = toNullableText(body?.title);
  if (!moduleId || !title) return NextResponse.json({ error: "Módulo y título son obligatorios" }, { status: 400 });

  const payload: Record<string, unknown> = { module_id: moduleId, title, description: toNullableText(body?.description), status: toNullableText(body?.status) ?? "open" };
  const payloadBase = { ...payload };

  if (body && Object.prototype.hasOwnProperty.call(body, "is_active")) payload.is_active = toOptionalBoolean(body.is_active, true);
  if (body && Object.prototype.hasOwnProperty.call(body, "deadline")) payload.deadline = toNullableText(body.deadline);

  let response = await admin.supabase.from("vacancies").update(payload).eq("id", id).select("*").single();

  if (response.error && /column/i.test(response.error.message)) {
    response = await admin.supabase.from("vacancies").update(payloadBase).eq("id", id).select("*").single();
  }

  if (response.error) return NextResponse.json({ error: response.error.message || "No se pudo actualizar la vacante" }, { status: 400 });

  return NextResponse.json({ data: response.data });
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { error } = await admin.supabase.from("vacancies").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message || "No se pudo eliminar la vacante" }, { status: 400 });

  return NextResponse.json({ ok: true });
}
