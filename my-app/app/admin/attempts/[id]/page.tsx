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

type AttemptDetail = {
  id: string;
  status: string | null;
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
  reviews?: Review[];
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

type Review = {
  id?: string;
  notes?: string | null;
  comments?: string | null;
  decision?: string | null;
  created_at?: string | null;
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

export default function AttemptDetailAdminPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [attempt, setAttempt] = useState<AttemptDetail | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [notes, setNotes] = useState("");

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

    const json = (await response.json().catch(() => ({}))) as T & { error?: string };
    if (!response.ok) {
      throw new Error(json.error ?? "Error inesperado");
    }

    return json;
  };

  const loadAttempt = async () => {
    const result = await callAdmin<{ data: AttemptDetail }>(`/api/admin/attempts/${params.id}/detail`);
    setAttempt(result.data);
    const latestReview = (result.data.reviews ?? [])[0];
    setNotes(latestReview?.notes ?? latestReview?.comments ?? "");
  };

  const updateAttempt = async (status: string, decision?: string) => {
    setSaving(true);
    setErrorMessage("");
    try {
      await callAdmin(`/api/admin/attempts/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, notes, decision }),
      });
      await loadAttempt();
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
                <p><span className="font-medium">Inicio:</span> {formatDate(attempt.started_at)}</p>
                <p><span className="font-medium">Enviado:</span> {formatDate(attempt.submitted_at)}</p>
                <p><span className="font-medium">Deadline:</span> {formatDate(attempt.deadline_at)}</p>
                <p><span className="font-medium">Puntaje teórico:</span> {attempt.theory_score ?? "-"}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Acciones de revisión</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <textarea
                  className="min-h-24 w-full rounded border p-2 text-sm"
                  placeholder="Notas del revisor"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                  <Button disabled={saving} onClick={() => updateAttempt("UNDER_REVIEW", "UNDER_REVIEW")}>Marcar en revisión</Button>
                  <Button disabled={saving} variant="outline" onClick={() => updateAttempt("APPROVED", "APPROVED")}>Aprobar</Button>
                  <Button disabled={saving} variant="destructive" onClick={() => updateAttempt("REJECTED", "REJECTED")}>Rechazar</Button>
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
