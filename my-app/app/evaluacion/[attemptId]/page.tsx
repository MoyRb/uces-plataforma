import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabaseServer";

import { EvaluationClient } from "./cliente";

type EvaluationPageProps = {
  params: { attemptId: string };
};

type Question = {
  id: string;
  prompt: string;
  options: Record<string, string>;
};

type PracticalTask = {
  id: string;
  instructions: string;
  expected_output: string | null;
};

type AttemptRecord = {
  id: string;
  deadline_at: string;
  submitted_at: string | null;
  status: string | null;
  assessment?: {
    id: string;
    title: string | null;
    duration_minutes: number | null;
    questions: Question[];
    practical_tasks: PracticalTask[];
  } | null;
};

type SavedAnswer = {
  question_id: string;
  selected_option: string | null;
};

type EvidenceUpload = {
  path: string;
  mime_type: string | null;
  size: number | null;
  created_at: string;
};

export default async function EvaluationPage({ params }: EvaluationPageProps) {
  const supabase = supabaseServer();

  const [{ data: attempt }, { data: savedAnswers }, { data: evidenceUploads }] = await Promise.all([
    supabase
      .from("attempts")
      .select(
        "id, deadline_at, submitted_at, status, assessment:assessments(id, title, duration_minutes, questions(id, prompt, options), practical_tasks(id, instructions, expected_output))"
      )
      .eq("id", params.attemptId)
      .maybeSingle<AttemptRecord>(),
    supabase.from("answers").select("question_id, selected_option").eq("attempt_id", params.attemptId),
    supabase
      .from("evidence_uploads")
      .select("path, mime_type, size, created_at")
      .eq("attempt_id", params.attemptId)
      .order("created_at", { ascending: false }),
  ]);

  if (!attempt || !attempt.assessment) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Evaluación no disponible</h1>
          <p className="text-slate-600">No encontramos el intento solicitado.</p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/panel">Volver al panel</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const questions = (attempt.assessment.questions || []).slice(0, 5);
  const practicalTask = attempt.assessment.practical_tasks?.[0] ?? null;
  const answersMap = (savedAnswers as SavedAnswer[] | null)?.reduce<Record<string, string>>((acc, answer) => {
    if (answer.selected_option) {
      acc[answer.question_id] = answer.selected_option;
    }
    return acc;
  }, {}) ?? {};

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700">Evaluación</p>
            <h1 className="text-3xl font-bold text-slate-900">{attempt.assessment.title ?? "Intento"}</h1>
            <p className="text-slate-600">Tiempo asignado: {attempt.assessment.duration_minutes ?? 30} minutos.</p>
          </div>
          <Badge variant="secondary" className="w-fit uppercase">Estado: {attempt.status ?? "IN_PROGRESS"}</Badge>
        </header>

        <EvaluationClient
          attemptId={attempt.id}
          deadlineAt={attempt.deadline_at}
          submittedAt={attempt.submitted_at}
          questions={questions}
          practicalTask={practicalTask}
          initialAnswers={answersMap}
          initialEvidence={(evidenceUploads as EvidenceUpload[] | null)?.[0] ?? null}
        />
      </div>
    </main>
  );
}
