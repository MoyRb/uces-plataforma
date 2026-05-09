import { NextResponse } from "next/server";

import { PSICOMETRICO_REQUIRED_MESSAGE } from "@/lib/assessmentConstants";
import { getPsicometricoAttemptState } from "@/lib/psicometrico";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = supabaseServer();
  const { id } = await params;
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "").trim();

  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
  }

  const userId = userData.user.id;
  const vacancyId = id;

  const psicometricoState = await getPsicometricoAttemptState(supabase, userId);
  if (psicometricoState.error) {
    return NextResponse.json({ error: psicometricoState.error }, { status: 400 });
  }

  if (!psicometricoState.completed) {
    return NextResponse.json(
      {
        error: PSICOMETRICO_REQUIRED_MESSAGE,
        requiresPsychometric: true,
        redirectTo: "/psicometrico",
      },
      { status: 403 },
    );
  }

  const { data: vacancy, error: vacancyError } = await supabase
    .from("vacancies")
    .select("id, status")
    .eq("id", vacancyId)
    .maybeSingle();

  if (vacancyError || !vacancy) {
    return NextResponse.json({ error: "Vacante no encontrada" }, { status: 404 });
  }

  if (vacancy.status !== "open") {
    return NextResponse.json({ error: "Esta vacante no está abierta para nuevas postulaciones" }, { status: 400 });
  }

  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .select("id, duration_minutes")
    .eq("vacancy_id", vacancyId)
    .maybeSingle();

  if (assessmentError || !assessment) {
    return NextResponse.json({ error: "La vacante no tiene evaluación configurada" }, { status: 400 });
  }

  const { data: existingApplication } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", userId)
    .eq("vacancy_id", vacancyId)
    .maybeSingle();

  let applicationId = existingApplication?.id;

  if (!applicationId) {
    const { data: applicationResult, error: applicationError } = await supabase
      .from("applications")
      .insert({ user_id: userId, vacancy_id: vacancyId })
      .select("id")
      .maybeSingle();

    if (applicationError || !applicationResult) {
      return NextResponse.json({ error: "No se pudo registrar tu aplicación" }, { status: 400 });
    }

    applicationId = applicationResult.id;
  }

  const { data: existingAttempt } = await supabase
    .from("attempts")
    .select("id, submitted_at")
    .eq("application_id", applicationId)
    .order("started_at", { ascending: false })
    .maybeSingle();

  if (existingAttempt && !existingAttempt.submitted_at) {
    return NextResponse.json({ attemptId: existingAttempt.id });
  }

  const startedAt = new Date();
  const deadlineAt = new Date(startedAt.getTime() + (assessment.duration_minutes ?? 30) * 60000);

  const { data: attempt, error: attemptError } = await supabase
    .from("attempts")
    .insert({
      application_id: applicationId,
      assessment_id: assessment.id,
      started_at: startedAt.toISOString(),
      deadline_at: deadlineAt.toISOString(),
    })
    .select("id")
    .maybeSingle();

  if (attemptError || !attempt) {
    return NextResponse.json({ error: "No se pudo iniciar el intento" }, { status: 400 });
  }

  return NextResponse.json({ attemptId: attempt.id });
}
