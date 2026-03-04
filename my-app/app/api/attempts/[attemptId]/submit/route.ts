import { NextResponse } from "next/server";

import { calculatePsicometricoSummary } from "@/lib/psicometricoResults";
import { supabaseServer } from "@/lib/supabaseServer";

const isMissingColumnError = (message?: string) => {
  if (!message) return false;
  const normalized = message.toLowerCase();
  return normalized.includes("column") && normalized.includes("psychometric_summary");
};

export async function POST(request: Request, { params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
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
    .eq("id", attemptId)
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

  const { data: questions } = await supabase.from("questions").select("id, prompt").eq("assessment_id", attempt.assessment_id);

  const { data: answers } = await supabase.from("answers").select("question_id, selected_option").eq("attempt_id", attemptId);

  const answersMap = new Map((answers ?? []).map((a) => [a.question_id, a.selected_option]));
  const summary = calculatePsicometricoSummary(
    (questions ?? []).map((question) => ({
      prompt: question.prompt,
      selected_option: answersMap.get(question.id) ?? null,
    }))
  );

  const theoryScore = Math.round((summary.totals.likertAnswered / Math.max(summary.totals.likertQuestions, 1)) * 100);
  const isTimedOut = Date.now() > new Date(attempt.deadline_at).getTime();
  const summaryPayload = {
    ...summary,
    submitMeta: {
      timedOutBeforeSubmit: isTimedOut,
    },
  };

  const baseUpdate = {
    theory_score: theoryScore,
    submitted_at: new Date().toISOString(),
    status: "UNDER_REVIEW",
  };

  let { error: updateError } = await supabase
    .from("attempts")
    .update({
      ...baseUpdate,
      psychometric_summary: summaryPayload,
    })
    .eq("id", attemptId);

  if (updateError && isMissingColumnError(updateError.message)) {
    const { error: fallbackAttemptError } = await supabase.from("attempts").update(baseUpdate).eq("id", attemptId);
    if (fallbackAttemptError) {
      return NextResponse.json({ error: "No se pudo enviar tu intento" }, { status: 400 });
    }

    const { error: reviewError } = await supabase.from("reviews").insert({
      attempt_id: attemptId,
      rubric: summaryPayload,
      comments: "Resumen psicométrico automático",
    });

    if (reviewError && !reviewError.message.toLowerCase().includes("reviews")) {
      return NextResponse.json({ error: "No se pudo guardar el resumen psicométrico" }, { status: 400 });
    }

    updateError = null;
  }

  if (updateError) {
    return NextResponse.json({ error: "No se pudo enviar tu intento" }, { status: 400 });
  }

  return NextResponse.json({ theoryScore, summary, timedOutBeforeSubmit: isTimedOut });
}
