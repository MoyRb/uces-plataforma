import type { SupabaseClient } from "@supabase/supabase-js";

import { PSICOMETRICO_BASE_ASSESSMENT_ID } from "@/lib/assessmentConstants";

type AttemptState = {
  id: string;
  status: string | null;
  submitted_at: string | null;
  started_at: string | null;
};

const COMPLETED_STATUSES = new Set(["SUBMITTED", "UNDER_REVIEW", "COMPLETED"]);

export const isPsicometricoCompletedAttempt = (attempt: Pick<AttemptState, "status" | "submitted_at">) => {
  if (attempt.submitted_at) return true;
  return COMPLETED_STATUSES.has(attempt.status ?? "");
};

export async function getPsicometricoAttemptState(supabase: SupabaseClient, userId: string) {
  const { data: attempts, error } = await supabase
    .from("attempts")
    .select("id, status, submitted_at, started_at, application:applications!inner(user_id)")
    .eq("assessment_id", PSICOMETRICO_BASE_ASSESSMENT_ID)
    .eq("application.user_id", userId)
    .order("started_at", { ascending: false });

  if (error) {
    return { error: error.message, completed: false, pendingAttemptId: null as string | null };
  }

  const typedAttempts = ((attempts ?? []) as (AttemptState & { application: { user_id: string } })[]).map((attempt) => ({
    id: attempt.id,
    status: attempt.status,
    submitted_at: attempt.submitted_at,
    started_at: attempt.started_at,
  }));

  const completed = typedAttempts.some((attempt) => isPsicometricoCompletedAttempt(attempt));
  const pendingAttempt = typedAttempts.find((attempt) => !isPsicometricoCompletedAttempt(attempt));

  return {
    error: null,
    completed,
    pendingAttemptId: pendingAttempt?.id ?? null,
  };
}

export async function ensurePsicometricoAttempt(supabase: SupabaseClient, userId: string) {
  const state = await getPsicometricoAttemptState(supabase, userId);

  if (state.error) {
    return { error: state.error, completed: false, attemptId: null as string | null };
  }

  if (state.completed) {
    return { error: null, completed: true, attemptId: null as string | null };
  }

  if (state.pendingAttemptId) {
    return { error: null, completed: false, attemptId: state.pendingAttemptId };
  }

  const { data: assessment, error: assessmentError } = await supabase
    .from("assessments")
    .select("id, vacancy_id, duration_minutes")
    .eq("id", PSICOMETRICO_BASE_ASSESSMENT_ID)
    .maybeSingle();

  if (assessmentError || !assessment?.vacancy_id) {
    return { error: "No se encontró el assessment psicométrico base", completed: false, attemptId: null as string | null };
  }

  const { data: existingApplication, error: applicationLookupError } = await supabase
    .from("applications")
    .select("id")
    .eq("user_id", userId)
    .eq("vacancy_id", assessment.vacancy_id)
    .maybeSingle();

  if (applicationLookupError) {
    return { error: applicationLookupError.message, completed: false, attemptId: null as string | null };
  }

  let applicationId = existingApplication?.id;

  if (!applicationId) {
    const { data: createdApplication, error: applicationCreateError } = await supabase
      .from("applications")
      .insert({ user_id: userId, vacancy_id: assessment.vacancy_id })
      .select("id")
      .maybeSingle();

    if (applicationCreateError || !createdApplication) {
      return { error: "No se pudo crear la aplicación psicométrica", completed: false, attemptId: null as string | null };
    }

    applicationId = createdApplication.id;
  }

  const startedAt = new Date();
  const deadlineAt = new Date(startedAt.getTime() + (assessment.duration_minutes ?? 10) * 60000);

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
    return { error: "No se pudo iniciar el psicométrico", completed: false, attemptId: null as string | null };
  }

  return { error: null, completed: false, attemptId: attempt.id };
}
