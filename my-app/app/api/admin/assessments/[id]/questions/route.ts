import { NextResponse } from "next/server";

import { requireAdmin, toNullableText } from "../../../utils";

type Params = { params: Promise<{ id: string }> };

type QuestionType = "multiple_choice" | "open_text";

const normalizeType = (value: unknown): QuestionType => (value === "open_text" ? "open_text" : "multiple_choice");

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const prompt = toNullableText(body?.prompt);

  if (!prompt) {
    return NextResponse.json({ error: "El prompt es obligatorio" }, { status: 400 });
  }

  const questionType = normalizeType(body?.type);
  const options = questionType === "open_text"
    ? { type: "open_text" }
    : (body?.options && typeof body.options === "object" ? body.options : { A: "", B: "", C: "", D: "" });

  const payload = {
    assessment_id: id,
    prompt,
    options,
    correct_option: questionType === "multiple_choice" ? toNullableText(body?.correct_option) : null,
    created_by: admin.userId,
  };

  const { data, error } = await admin.supabase.from("questions").insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo crear la pregunta" }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
