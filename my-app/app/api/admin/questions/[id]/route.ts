import { NextResponse } from "next/server";

import { requireAdmin, toNullableText } from "../../utils";

type Params = { params: Promise<{ id: string }> };

const normalizeOptions = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.map((option) => String(option).trim()).filter(Boolean);
};

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const prompt = toNullableText(body?.prompt);

  if (!prompt) {
    return NextResponse.json({ error: "El prompt es obligatorio" }, { status: 400 });
  }

  const options = normalizeOptions(body?.options);
  if (options.length === 0) {
    return NextResponse.json({ error: "Debes enviar al menos una opción" }, { status: 400 });
  }

  const payload = {
    prompt,
    options,
    correct_option: toNullableText(body?.correct_option),
  };

  const { data, error } = await admin.supabase.from("questions").update(payload).eq("id", id).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo actualizar la pregunta" }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { error } = await admin.supabase.from("questions").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo eliminar la pregunta" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
