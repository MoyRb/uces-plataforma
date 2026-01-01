import { NextResponse } from "next/server";

import { supabaseServer } from "@/lib/supabaseServer";

type AnswerPayload = {
  questionId?: string;
  selectedOption?: string;
};

export async function POST(request: Request, { params }: { params: { attemptId: string } }) {
  const supabase = supabaseServer();
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as AnswerPayload | null;

  if (!body?.questionId || !body?.selectedOption) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  const { data: attempt } = await supabase
    .from("attempts")
    .select("id, assessment_id, deadline_at, submitted_at, application:applications!inner(user_id)")
    .eq("id", params.attemptId)
    .maybeSingle();

  if (!attempt) {
    return NextResponse.json({ error: "Intento no encontrado" }, { status: 404 });
  }

  if (attempt.application.user_id !== userData.user.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 403 });
  }

  if (attempt.submitted_at) {
    return NextResponse.json({ error: "El intento ya fue enviado" }, { status: 400 });
  }

  if (Date.now() > new Date(attempt.deadline_at).getTime()) {
    return NextResponse.json({ error: "Tiempo agotado" }, { status: 400 });
  }

  const { data: question } = await supabase.from("questions").select("assessment_id").eq("id", body.questionId).maybeSingle();

  if (!question || question.assessment_id !== attempt.assessment_id) {
    return NextResponse.json({ error: "Pregunta no válida" }, { status: 400 });
  }

  const { error: saveError } = await supabase.from("answers").upsert({
    attempt_id: params.attemptId,
    question_id: body.questionId,
    selected_option: body.selectedOption,
  });

  if (saveError) {
    return NextResponse.json({ error: "No se pudo guardar" }, { status: 400 });
  }

  return NextResponse.json({ saved: true });
}
