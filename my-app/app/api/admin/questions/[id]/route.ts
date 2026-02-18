import { NextResponse } from "next/server";

import { requireAdmin, toNullableText } from "../../utils";

type Params = { params: { id: string } };

type QuestionType = "multiple_choice" | "open_text";

const normalizeType = (value: unknown): QuestionType => (value === "open_text" ? "open_text" : "multiple_choice");

export async function PATCH(request: Request, { params }: Params) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const prompt = toNullableText(body?.prompt);

  if (!prompt) {
    return NextResponse.json({ error: "El prompt es obligatorio" }, { status: 400 });
  }

  const questionType = normalizeType(body?.type);

  const payload = {
    prompt,
    options:
      questionType === "open_text"
        ? { type: "open_text" }
        : (body?.options && typeof body.options === "object" ? body.options : { A: "", B: "", C: "", D: "" }),
    correct_option: questionType === "multiple_choice" ? toNullableText(body?.correct_option) : null,
  };

  const { data, error } = await admin.supabase.from("questions").update(payload).eq("id", params.id).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo actualizar la pregunta" }, { status: 400 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: Request, { params }: Params) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { error } = await admin.supabase.from("questions").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo eliminar la pregunta" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
