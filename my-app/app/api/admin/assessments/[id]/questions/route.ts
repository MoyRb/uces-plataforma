import { NextResponse } from "next/server";

import { requireAdmin, toNullableText } from "../../../utils";

type Params = { params: Promise<{ id: string }> };

const normalizeOptions = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value.map((option) => String(option).trim()).filter(Boolean);
};

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { data, error } = await admin.supabase
    .from("questions")
    .select("id, assessment_id, prompt, options, correct_option")
    .eq("assessment_id", id)
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudieron cargar las preguntas" }, { status: 400 });
  }

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request, { params }: Params) {
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
    assessment_id: id,
    prompt,
    options,
    correct_option: toNullableText(body?.correct_option),
    created_by: admin.userId,
  };

  const { data, error } = await admin.supabase.from("questions").insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo crear la pregunta" }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
