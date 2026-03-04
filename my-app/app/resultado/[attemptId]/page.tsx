import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PsicometricoSummary } from "@/lib/psicometricoResults";
import { formatBytes } from "@/lib/format";
import { supabaseServer } from "@/lib/supabaseServer";

type ResultPageProps = {
  params: Promise<{ attemptId: string }>;
};

type EvidenceUpload = {
  path: string;
  mime_type: string | null;
  size: number | null;
  created_at: string;
};

type AttemptResult = {
  id: string;
  theory_score: number | null;
  submitted_at: string | null;
  status: string | null;
  psychometric_summary?: PsicometricoSummary | null;
  evidence_uploads: EvidenceUpload[];
};

type ReviewRubric = {
  rubric: PsicometricoSummary | null;
};

const traitLabels = [
  ["Estabilidad emocional", "estabilidadEmocional"],
  ["Amabilidad", "amabilidad"],
  ["Responsabilidad", "responsabilidad"],
  ["Apertura", "apertura"],
  ["Extroversión", "extroversion"],
] as const;

export default async function ResultPage({ params }: ResultPageProps) {
  const { attemptId } = await params;
  const supabase = supabaseServer();

  const { data: attemptWithSummary, error: summaryColumnError } = await supabase
    .from("attempts")
    .select("id, theory_score, submitted_at, status, psychometric_summary, evidence_uploads(path, mime_type, size, created_at)")
    .eq("id", attemptId)
    .maybeSingle<AttemptResult>();

  const { data: plainAttempt } = summaryColumnError
    ? await supabase
        .from("attempts")
        .select("id, theory_score, submitted_at, status, evidence_uploads(path, mime_type, size, created_at)")
        .eq("id", attemptId)
        .maybeSingle<Omit<AttemptResult, "psychometric_summary">>()
    : { data: null };

  const attempt: AttemptResult | null = summaryColumnError
    ? plainAttempt
      ? { ...plainAttempt, psychometric_summary: null }
      : null
    : attemptWithSummary;

  if (!attempt) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Resultado no disponible</h1>
          <p className="text-slate-600">No encontramos la información de tu intento.</p>
          <Button asChild>
            <Link href="/panel">Volver al panel</Link>
          </Button>
        </div>
      </main>
    );
  }

  let summary = attempt.psychometric_summary ?? null;

  if (!summary) {
    const { data: review } = await supabase
      .from("reviews")
      .select("rubric")
      .eq("attempt_id", attemptId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle<ReviewRubric>();

    summary = review?.rubric ?? null;
  }

  const evidence = attempt.evidence_uploads?.[0];
  const { data: signedEvidence } = evidence
    ? await supabase.storage.from("evidences").createSignedUrl(evidence.path, 60 * 60)
    : { data: null };
  const evidenceUrl = signedEvidence?.signedUrl ?? null;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase text-blue-700">Evaluación enviada</p>
          <h1 className="text-3xl font-bold text-slate-900">Gracias por completar tu proceso</h1>
          <p className="text-slate-600">Tiempo estimado de revisión: 2–3 días hábiles.</p>
        </header>

        <Card className="border-slate-100 shadow-md">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl text-slate-900">Resumen del intento</CardTitle>
              <CardDescription>Conserva este folio para seguimiento.</CardDescription>
            </div>
            <Badge variant="secondary" className="uppercase">{attempt.status ?? "UNDER_REVIEW"}</Badge>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-800">
            <p className="text-sm">Folio de intento: {attempt.id}</p>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">Puntaje general</p>
              <p className="text-2xl font-bold text-blue-700">{attempt.theory_score ?? 0} / 100</p>
              <p className="text-xs text-slate-500">Calculado por suma Likert del psicométrico.</p>
            </div>

            {summary ? (
              <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Cultura Capital</p>
                  <p className="text-xl font-bold text-orange-600">
                    {summary.cultureCapital.score} / {summary.cultureCapital.max}
                  </p>
                  <p className="text-sm text-slate-700">{summary.cultureCapital.classification}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">Mini Big Five</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {traitLabels.map(([label, key]) => {
                      const trait = summary.miniBigFive[key];
                      return (
                        <div key={key} className="rounded-lg bg-slate-50 p-3 text-sm">
                          <p className="font-semibold text-slate-900">{label}</p>
                          <p className="text-base font-bold text-blue-700">{trait.score} / {trait.max}</p>
                          <p className="text-xs text-slate-600">{trait.classification}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-600">Aún no hay resumen psicométrico disponible para este intento.</p>
            )}

            {evidence ? (
              <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Evidencia subida</p>
                <p className="text-slate-600">{evidence.path}</p>
                <p className="text-xs text-slate-500">{evidence.mime_type ?? ""} · {formatBytes(evidence.size ?? 0)}</p>
                {evidenceUrl ? (
                  <a className="text-sm font-semibold text-blue-700" href={evidenceUrl} target="_blank" rel="noreferrer">
                    Ver archivo
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No se cargó evidencia para este intento.</p>
            )}
          </CardContent>
        </Card>

        <div>
          <Button asChild className="bg-orange-500 text-white hover:bg-orange-600">
            <Link href="/panel">Volver al panel</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
