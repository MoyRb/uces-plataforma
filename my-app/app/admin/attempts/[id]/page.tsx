"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes } from "@/lib/format";
import { getRoleForSession } from "@/lib/auth";
import { supabaseBrowser } from "@/lib/supabaseClient";
import { PsicometricoSummary } from "@/lib/psicometricoResults";

type Decision = "APPROVED" | "REJECTED";

type AttemptDetail = {
  id: string;
  status: string | null;
  decision?: Decision | null;
  reviewer_notes?: string | null;
  started_at: string | null;
  submitted_at: string | null;
  deadline_at: string | null;
  theory_score: number | null;
  application?: {
    vacancy?: { title?: string | null; module?: { name?: string | null } | null } | null;
    profile?: { email?: string | null; name?: string | null } | null;
  } | null;
  answers?: AttemptAnswer[];
  evidence_uploads?: EvidenceUpload[];
  psychometric_summary?: PsicometricoSummary | null;
};

type AttemptAnswer = {
  id: string;
  selected_option?: string | null;
  answer?: unknown;
  question?: {
    id: string;
    prompt?: string | null;
    options?: unknown;
    correct_option?: string | null;
  } | null;
};

type EvidenceUpload = {
  id?: string;
  path?: string | null;
  file_path?: string | null;
  size?: number | null;
  file_size?: number | null;
  mime_type?: string | null;
  created_at?: string | null;
  signedUrl?: string | null;
};

const normalizeOptions = (raw: unknown): string[] => {
  if (Array.isArray(raw)) return raw.filter((value): value is string => typeof value === "string");

  if (typeof raw === "string") {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((value): value is string => typeof value === "string");
      }
    } catch {
      return [raw];
    }
    return [raw];
  }

  if (raw && typeof raw === "object") {
    return Object.values(raw).filter((value): value is string => typeof value === "string");
  }

  return [];
};

const formatDate = (value: string | null | undefined) => (value ? new Date(value).toLocaleString() : "-");

const formatAnswer = (answer: AttemptAnswer): string => {
  if (answer.selected_option) return answer.selected_option;

  if (typeof answer.answer === "string") return answer.answer;
  if (answer.answer && typeof answer.answer === "object") return JSON.stringify(answer.answer);

  return "Sin respuesta";
};


const traitLabels = [
  ["Estabilidad emocional", "estabilidadEmocional"],
  ["Amabilidad", "amabilidad"],
  ["Responsabilidad", "responsabilidad"],
  ["Apertura", "apertura"],
  ["Extroversión", "extroversion"],
] as const;

const decisionBadgeVariant = (decision: string | null | undefined) => {
  if (decision === "APPROVED") return "default" as const;
  if (decision === "REJECTED") return "destructive" as const;
  return "secondary" as const;
};

export default function AttemptDetailAdminPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<AttemptDetail | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [editableDecision, setEditableDecision] = useState<Decision | "">("");

  const callAdmin = async <T,>(path: string, init?: RequestInit): Promise<T> => {
    if (!token) throw new Error("Sin sesión");

    const response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        ...(init?.headers ?? {}),
      },
    });

    const json = (await response.json().catch(() => ({}))) as T & { error?: string; warning?: string };
    if (!response.ok) {
      throw new Error(json.error ?? "Error inesperado");
    }

    return json;
  };

  const loadAttempt = async () => {
    const result = await callAdmin<{ data: AttemptDetail }>(`/api/admin/attempts/${params.id}/detail`);
    setAttempt(result.data);
    setNotes(result.data.reviewer_notes ?? "");
    setEditableDecision((result.data.decision as Decision | null) ?? "");
  };

  const updateAttempt = async ({ status, decision, confirmIfCompleted }: { status?: string; decision?: Decision | null; confirmIfCompleted?: boolean }) => {
    if (confirmIfCompleted && attempt?.status === "COMPLETED") {
      const accepted = window.confirm("Este intento ya está COMPLETED. ¿Deseas actualizar la decisión/notas?");
      if (!accepted) return;
    }

    setSaving(true);
    setErrorMessage("");
    setWarningMessage("");
    setSuccessMessage("");
    try {
      const result = await callAdmin<{ data: AttemptDetail; warning?: string }>(`/api/admin/attempts/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, notes, decision }),
      });
      await loadAttempt();
      if (result.warning) {
        setWarningMessage(result.warning);
      }
      setSuccessMessage("Cambios guardados correctamente.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "No se pudo actualizar el intento");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }

      const role = await getRoleForSession(supabase);
      if (role !== "admin") {
        router.replace("/panel");
        return;
      }

      setToken(data.session.access_token);
      setLoading(false);
    });
  }, [router, supabase]);

  useEffect(() => {
    if (!token) return;
    setErrorMessage("");
    loadAttempt().catch((error) => {
      setErrorMessage(error instanceof Error ? error.message : "No se pudo cargar el intento");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, params.id]);

  if (loading) return <main className="p-6">Cargando…</main>;

  const isCompleted = attempt?.status === "COMPLETED";

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Revisión de intento</h1>
          <Button asChild variant="outline">
            <Link href="/admin">Volver</Link>
          </Button>
        </div>

        {errorMessage ? <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</div> : null}
        {successMessage ? <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{successMessage}</div> : null}
        {warningMessage ? <div className="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">{warningMessage}</div> : null}

        {!attempt ? (
          <Card>
            <CardContent className="p-6 text-sm text-slate-600">No encontramos este intento.</CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>Información general del candidato y estado del intento.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {attempt.application?.profile?.email ?? "Sin email"}</p>
                <p><span className="font-medium">Nombre:</span> {attempt.application?.profile?.name ?? "Sin nombre"}</p>
                <p><span className="font-medium">Vacante:</span> {attempt.application?.vacancy?.title ?? "Sin vacante"}</p>
                <p><span className="font-medium">Módulo:</span> {attempt.application?.vacancy?.module?.name ?? "Sin módulo"}</p>
                <p className="flex items-center gap-2"><span className="font-medium">Estado:</span> <Badge variant="secondary">{attempt.status ?? "-"}</Badge></p>
                <p className="flex items-center gap-2"><span className="font-medium">Decisión:</span> <Badge variant={decisionBadgeVariant(attempt.decision)}>{attempt.decision ?? "Sin decisión"}</Badge></p>
                <p><span className="font-medium">Inicio:</span> {formatDate(attempt.started_at)}</p>
                <p><span className="font-medium">Enviado:</span> {formatDate(attempt.submitted_at)}</p>
                <p><span className="font-medium">Deadline:</span> {formatDate(attempt.deadline_at)}</p>
                <p><span className="font-medium">Puntaje teórico:</span> {attempt.theory_score ?? "-"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumen psicométrico</CardTitle>
                <CardDescription>Visible solo para revisión interna de admin.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {attempt.psychometric_summary ? (
                  <>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                      <p className="font-medium text-slate-900">Cultura Capital</p>
                      <p className="text-base font-semibold text-orange-700">
                        {attempt.psychometric_summary.cultureCapital.score} / {attempt.psychometric_summary.cultureCapital.max}
                      </p>
                      <p className="text-slate-700">{attempt.psychometric_summary.cultureCapital.classification}</p>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium text-slate-900">Mini Big Five</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {traitLabels.map(([label, key]) => {
                          const trait = attempt.psychometric_summary?.miniBigFive[key];
                          if (!trait) return null;

                          return (
                            <div key={key} className="rounded border bg-white p-3">
                              <p className="font-medium text-slate-900">{label}</p>
                              <p className="font-semibold text-blue-700">{trait.score} / {trait.max}</p>
                              <p className="text-xs text-slate-600">{trait.classification}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-slate-600">No hay resumen psicométrico guardado para este intento.</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones de revisión</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <select className="w-full rounded border p-2 text-sm" value={editableDecision} onChange={(event) => setEditableDecision(event.target.value as Decision | "") }>
                  <option value="">Sin decisión</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                </select>
                <textarea
                  className="min-h-24 w-full rounded border p-2 text-sm"
                  placeholder="Notas del revisor"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  <Button disabled={saving} onClick={() => updateAttempt({ status: "UNDER_REVIEW", decision: null })}>Marcar en revisión</Button>
                  <Button disabled={saving || isCompleted} variant="outline" onClick={() => updateAttempt({ status: "COMPLETED", decision: "APPROVED" })}>Aprobar</Button>
                  <Button disabled={saving || isCompleted} variant="destructive" onClick={() => updateAttempt({ status: "COMPLETED", decision: "REJECTED" })}>Rechazar</Button>
                  <Button disabled={saving} variant="secondary" onClick={() => updateAttempt({ decision: editableDecision || null, confirmIfCompleted: true })}>
                    Guardar notas / decisión
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Respuestas ({attempt.answers?.length ?? 0})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!attempt.answers?.length ? (
                  <p className="text-sm text-slate-600">No hay respuestas registradas para este intento.</p>
                ) : (
                  attempt.answers.map((answer, index) => {
                    const options = normalizeOptions(answer.question?.options);
                    return (
                      <div key={answer.id ?? `${index}-${answer.question?.id ?? "question"}`} className="rounded border bg-white p-3 text-sm">
                        <p className="font-medium">{index + 1}. {answer.question?.prompt ?? "Pregunta sin texto"}</p>
                        <p className="text-slate-700"><span className="font-medium">Respuesta:</span> {formatAnswer(answer)}</p>
                        <p className="text-slate-600"><span className="font-medium">Correcta:</span> {answer.question?.correct_option ?? "-"}</p>
                        {options.length > 0 ? <p className="text-xs text-slate-500">Opciones: {options.join(" · ")}</p> : null}
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidencias ({attempt.evidence_uploads?.length ?? 0})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!attempt.evidence_uploads?.length ? (
                  <p className="text-sm text-slate-600">No hay archivos de evidencia en este intento.</p>
                ) : (
                  attempt.evidence_uploads.map((evidence, index) => {
                    const path = evidence.path ?? evidence.file_path ?? "Archivo sin ruta";
                    const size = evidence.size ?? evidence.file_size ?? 0;
                    return (
                      <div key={evidence.id ?? `${path}-${index}`} className="rounded border bg-white p-3 text-sm">
                        <p className="font-medium break-all">{path}</p>
                        <p className="text-xs text-slate-500">{evidence.mime_type ?? ""} · {formatBytes(size)}</p>
                        <p className="text-xs text-slate-500">Subido: {formatDate(evidence.created_at)}</p>
                        {evidence.signedUrl ? (
                          <a className="text-sm font-medium text-blue-700" href={evidence.signedUrl} target="_blank" rel="noreferrer">
                            Descargar
                          </a>
                        ) : (
                          <p className="text-xs text-slate-500">No se pudo generar URL de descarga.</p>
                        )}
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}
