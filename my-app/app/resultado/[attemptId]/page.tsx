import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabaseServer";

import { formatBytes } from "../evaluacion/[attemptId]/utils";

type ResultPageProps = {
  params: { attemptId: string };
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
  evidence_uploads: EvidenceUpload[];
};

export default async function ResultPage({ params }: ResultPageProps) {
  const supabase = supabaseServer();

  const { data: attempt } = await supabase
    .from("attempts")
    .select("id, theory_score, submitted_at, status, evidence_uploads(path, mime_type, size, created_at)")
    .eq("id", params.attemptId)
    .maybeSingle<AttemptResult>();

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

  const evidence = attempt.evidence_uploads?.[0];
  const evidenceUrl = evidence ? supabase.storage.from("evidences").getPublicUrl(evidence.path).data.publicUrl : null;

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
              <p className="text-sm font-semibold text-slate-900">Puntaje teórico</p>
              <p className="text-2xl font-bold text-blue-700">{attempt.theory_score ?? 0} / 100</p>
              <p className="text-xs text-slate-500">Se calculará nuevamente durante la revisión.</p>
            </div>
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
