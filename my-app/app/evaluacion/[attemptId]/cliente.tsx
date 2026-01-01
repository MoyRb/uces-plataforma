"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseBrowser } from "@/lib/supabaseClient";

import { formatBytes } from "./utils";

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

type EvidenceFile = {
  path: string;
  mime_type: string | null;
  size: number | null;
  created_at?: string;
};

type EvaluationClientProps = {
  attemptId: string;
  deadlineAt: string;
  submittedAt: string | null;
  questions: Question[];
  practicalTask: PracticalTask | null;
  initialAnswers: Record<string, string>;
  initialEvidence: EvidenceFile | null;
};

export function EvaluationClient({
  attemptId,
  deadlineAt,
  submittedAt,
  questions,
  practicalTask,
  initialAnswers,
  initialEvidence,
}: EvaluationClientProps) {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers);
  const [token, setToken] = useState<string | null>(null);
  const [savingQuestion, setSavingQuestion] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [remainingMs, setRemainingMs] = useState(() => new Date(deadlineAt).getTime() - Date.now());
  const [uploading, setUploading] = useState(false);
  const [evidence, setEvidence] = useState<EvidenceFile | null>(initialEvidence);
  const [submitting, setSubmitting] = useState(false);

  const isExpired = remainingMs <= 0;
  const answeredCount = Object.values(answers).filter(Boolean).length;
  const progress = questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const accessToken = data.session?.access_token;
      if (!accessToken) {
        router.replace("/login");
        return;
      }
      setToken(accessToken);
    });
  }, [router, supabase]);

  useEffect(() => {
    if (submittedAt) {
      router.replace(`/resultado/${attemptId}`);
    }
  }, [attemptId, router, submittedAt]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingMs(new Date(deadlineAt).getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [deadlineAt]);

  const evidenceUrl = useMemo(() => {
    if (!evidence) return null;
    return supabase.storage.from("evidences").getPublicUrl(evidence.path).data.publicUrl;
  }, [evidence, supabase]);

  const formatTime = (ms: number) => {
    const safeMs = Math.max(ms, 0);
    const totalSeconds = Math.floor(safeMs / 1000);
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const saveAnswer = async (questionId: string, selectedOption: string) => {
    if (!token) return;
    if (isExpired) {
      setStatusMessage("El tiempo se agotó, no puedes seguir respondiendo.");
      return;
    }

    setSavingQuestion(questionId);
    setStatusMessage(null);

    const response = await fetch(`/api/attempts/${attemptId}/answers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ questionId, selectedOption }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatusMessage(payload.error ?? "No se pudo guardar la respuesta");
    } else {
      setStatusMessage("Respuesta guardada");
    }

    setSavingQuestion(null);
  };

  const handleSelect = (questionId: string, optionKey: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    void saveAnswer(questionId, optionKey);
  };

  const handleUpload = async (file?: File | null) => {
    if (!file || !token) return;
    if (isExpired) {
      setStatusMessage("El tiempo se agotó, no puedes subir archivos.");
      return;
    }

    setUploading(true);
    setStatusMessage(null);

    const extension = file.name.split(".").pop();
    const storagePath = `${attemptId}/${Date.now()}-${Math.random().toString(36).slice(2)}${extension ? `.${extension}` : ""}`;

    const { error: uploadError } = await supabase.storage
      .from("evidences")
      .upload(storagePath, file, { contentType: file.type, cacheControl: "3600", upsert: false });

    if (uploadError) {
      setStatusMessage("No se pudo subir el archivo");
      setUploading(false);
      return;
    }

    const { data: record, error: recordError } = await supabase
      .from("evidence_uploads")
      .insert({ attempt_id: attemptId, path: storagePath, mime_type: file.type, size: file.size })
      .select("path, mime_type, size, created_at")
      .maybeSingle<EvidenceFile>();

    if (recordError || !record) {
      setStatusMessage("No se pudo registrar la evidencia");
      setUploading(false);
      return;
    }

    setEvidence(record);
    setStatusMessage("Evidencia subida correctamente");
    setUploading(false);
  };

  const handleSubmitAttempt = async () => {
    if (!token) return;
    if (isExpired) {
      setStatusMessage("El tiempo se agotó, no puedes enviar el intento.");
      return;
    }

    setSubmitting(true);
    setStatusMessage(null);

    const response = await fetch(`/api/attempts/${attemptId}/submit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatusMessage(payload.error ?? "No se pudo enviar tu evaluación");
      setSubmitting(false);
      return;
    }

    router.push(`/resultado/${attemptId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-100 shadow-md">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg text-slate-900">Progreso</CardTitle>
            <CardDescription>{answeredCount} de {questions.length} preguntas contestadas</CardDescription>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-800">
            <span>Tiempo restante</span>
            <Badge variant={isExpired ? "destructive" : "outline"}>{formatTime(remainingMs)}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
          </div>
          {statusMessage ? <p className="mt-3 text-sm text-slate-700">{statusMessage}</p> : null}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-slate-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Sección A: Teórica</CardTitle>
            <CardDescription>Responde las opciones múltiples. Se guardan automáticamente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="space-y-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-8 w-8 rounded-full bg-blue-600 text-center text-sm font-bold leading-8 text-white">
                    {index + 1}
                  </div>
                  <div className="text-slate-900">{question.prompt}</div>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(question.options).map(([optionKey, optionValue]) => {
                    const isSelected = answers[question.id] === optionKey;
                    return (
                      <button
                        key={optionKey}
                        onClick={() => handleSelect(question.id, optionKey)}
                        disabled={isExpired || savingQuestion === question.id}
                        className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition ${
                          isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-900"
                            : "border-slate-200 bg-white text-slate-800 hover:border-blue-200"
                        } ${isExpired ? "cursor-not-allowed opacity-60" : ""}`}
                        type="button"
                      >
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border">
                          {isSelected ? <span className="h-3 w-3 rounded-full bg-blue-600" /> : null}
                        </span>
                        <span className="font-medium uppercase text-slate-600">{optionKey}.</span>
                        <span>{optionValue}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {questions.length === 0 ? <p className="text-sm text-slate-600">No hay preguntas disponibles.</p> : null}
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Sección B: Práctica</CardTitle>
            <CardDescription>Sube evidencia antes de enviar tu intento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {practicalTask ? (
              <div className="space-y-2 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">Instrucciones</p>
                <p>{practicalTask.instructions}</p>
                {practicalTask.expected_output ? (
                  <p className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">Entrega esperada: {practicalTask.expected_output}</p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-slate-600">No hay tarea práctica definida.</p>
            )}

            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Carga de evidencia</p>
              <p className="text-slate-600">Acepta imágenes o PDF. Tamaño máximo según configuración de bucket.</p>
              <div className="mt-3 flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={(event) => handleUpload(event.target.files?.[0])}
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || isExpired}
                  className="bg-white"
                >
                  {uploading ? "Subiendo..." : "Subir archivo"}
                </Button>
                {evidence ? <Badge variant="secondary">Evidencia guardada</Badge> : null}
              </div>
              {evidence ? (
                <div className="mt-3 rounded-lg bg-white p-3 text-sm text-slate-700">
                  <p className="font-semibold">Archivo actual</p>
                  <p className="text-slate-600">{evidence.path}</p>
                  <p className="text-xs text-slate-500">{evidence.mime_type ?? ""} · {formatBytes(evidence.size ?? 0)}</p>
                  {evidenceUrl ? (
                    <a className="text-sm font-semibold text-blue-700" href={evidenceUrl} target="_blank" rel="noreferrer">
                      Ver evidencia
                    </a>
                  ) : null}
                </div>
              ) : null}
              {isExpired ? (
                <p className="mt-3 text-sm font-semibold text-red-600">El tiempo se agotó. No puedes cargar archivos.</p>
              ) : null}
            </div>

            <div className="pt-2">
              <Button
                className="w-full bg-orange-500 text-white hover:bg-orange-600"
                onClick={handleSubmitAttempt}
                disabled={isExpired || submitting}
              >
                {submitting ? "Enviando..." : "Enviar evaluación"}
              </Button>
              <p className="mt-2 text-xs text-slate-500">Debes enviar antes de que termine el tiempo.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
