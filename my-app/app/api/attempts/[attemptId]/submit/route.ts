import { NextResponse } from "next/server";

import { supabaseServer } from "@/lib/supabaseServer";

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

  const { data: questions } = await supabase
    .from("questions")
    .select("id, correct_option")
    .eq("assessment_id", attempt.assessment_id);

  const { data: answers } = await supabase
    .from("answers")
    .select("question_id, selected_option")
    .eq("attempt_id", params.attemptId);

  const totalQuestions = questions?.length ?? 0;
  let correctAnswers = 0;

  if (questions && answers) {
    const answersMap = new Map(answers.map((a) => [a.question_id, a.selected_option]));
    questions.forEach((question) => {
      if (question.correct_option && answersMap.get(question.id) === question.correct_option) {
        correctAnswers += 1;
      }
    });
  }

  const theoryScore = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  const { error: updateError } = await supabase
    .from("attempts")
    .update({ theory_score: theoryScore, submitted_at: new Date().toISOString(), status: "UNDER_REVIEW" })
    .eq("id", params.attemptId);

  if (updateError) {
    return NextResponse.json({ error: "No se pudo enviar tu intento" }, { status: 400 });
  }

  return NextResponse.json({ theoryScore });
}
