import { NextResponse } from "next/server";

import { requireAdmin, toNullableText, toOptionalBoolean, toOptionalNumber } from "../../utils";

type Params = { params: { id: string } };

export async function PATCH(request: Request, { params }: Params) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  const name = toNullableText(body?.name);
  if (!name) return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });

  const payload: Record<string, unknown> = { name, description: toNullableText(body?.description) };
  const payloadBase = { ...payload };

  if (body && Object.prototype.hasOwnProperty.call(body, "is_active")) payload.is_active = toOptionalBoolean(body.is_active, true);
  if (body && Object.prototype.hasOwnProperty.call(body, "sort_order")) payload.sort_order = toOptionalNumber(body.sort_order);

  let response = await admin.supabase.from("modules").update(payload).eq("id", params.id).select("*").single();

  if (response.error && /column/i.test(response.error.message)) {
    response = await admin.supabase.from("modules").update(payloadBase).eq("id", params.id).select("*").single();
  }

  if (response.error) return NextResponse.json({ error: response.error.message || "No se pudo actualizar el módulo" }, { status: 400 });

  return NextResponse.json({ data: response.data });
}

export async function DELETE(request: Request, { params }: Params) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { error } = await admin.supabase.from("modules").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message || "No se pudo eliminar el módulo" }, { status: 400 });

  return NextResponse.json({ ok: true });
}
