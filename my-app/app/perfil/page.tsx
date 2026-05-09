"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, Clock3, FileText, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseBrowser } from "@/lib/supabaseClient";

type Profile = {
  email: string | null;
};

type AttemptItem = {
  id: string;
  status: string | null;
  submitted_at: string | null;
  deadline_at: string | null;
  theory_score: number | null;
  decision: "APPROVED" | "REJECTED" | null;
  reviewer_notes: string | null;
  application?: {
    vacancy?: {
      title?: string | null;
      module?: { name?: string | null } | null;
    } | null;
  } | null;
};

type Review = {
  attempt_id: string;
  decision?: string | null;
  notes?: string | null;
  comments?: string | null;
};

const formatDate = (value: string | null | undefined) => {
  if (!value) return "Sin fecha registrada";
  return new Date(value).toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" });
};

const getStatusLabel = (status: string | null | undefined) => {
  const labels: Record<string, string> = {
    IN_PROGRESS: "En progreso",
    SUBMITTED: "Enviada",
    UNDER_REVIEW: "En revisión",
    COMPLETED: "Finalizada",
  };

  return status ? labels[status] ?? status : "Sin estado";
};

const getDecisionLabel = (decision: AttemptItem["decision"]) => {
  if (decision === "APPROVED") return "Aceptado";
  if (decision === "REJECTED") return "No seleccionado";
  return "Pendiente";
};

const getFriendlyStatus = (attempt: AttemptItem) => {
  if (attempt.status === "IN_PROGRESS") return "Tienes una evaluación en progreso. Complétala antes de la fecha límite.";
  if (attempt.status === "SUBMITTED") return "Tu evaluación fue enviada correctamente.";
  if (attempt.status === "UNDER_REVIEW") return "Tu evaluación está siendo revisada por el equipo administrativo.";
  if (attempt.status === "COMPLETED" && attempt.decision === "APPROVED") return "Felicidades, tu proceso fue aprobado. El equipo podrá contactarte para los siguientes pasos.";
  if (attempt.status === "COMPLETED" && attempt.decision === "REJECTED") return "Tu proceso fue revisado. En esta ocasión no fuiste seleccionado para esta vacante.";
  if (attempt.status === "COMPLETED") return "Tu evaluación fue finalizada.";
  return "El estado de tu postulación fue actualizado.";
};

const getDecisionSnapshot = (attempt: AttemptItem) => `${attempt.status ?? "-"}:${attempt.decision ?? "-"}`;

const getStatusBadgeVariant = (status: string | null | undefined) => {
  if (status === "COMPLETED") return "success" as const;
  if (status === "UNDER_REVIEW") return "info" as const;
  if (status === "SUBMITTED") return "outline" as const;
  return "secondary" as const;
};

export default function PerfilPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [session, setSession] = useState<Session | null>(null);
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<AttemptItem[]>([]);
  const [newDecisionByAttempt, setNewDecisionByAttempt] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const totalAttempts = attempts.length;
  const underReviewCount = attempts.filter((attempt) => attempt.status === "UNDER_REVIEW").length;
  const approvedCount = attempts.filter((attempt) => attempt.decision === "APPROVED").length;
  const rejectedCount = attempts.filter((attempt) => attempt.decision === "REJECTED").length;

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }

      setSession(data.session);
      setLoading(false);
    });
  }, [router, supabase]);

  useEffect(() => {
    if (!session) return;

    const loadProfileAndAttempts = async () => {
      setLoadingAttempts(true);
      setErrorMessage("");

      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("email")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (profileError) throw new Error("No se pudo cargar la información del perfil.");
        setProfileEmail((profileData as Profile | null)?.email ?? session.user.email ?? null);

        const { data: attemptsData, error: attemptsError } = await supabase
          .from("attempts")
          .select(
            "id, status, submitted_at, deadline_at, theory_score, decision, reviewer_notes, application:applications!inner(user_id, vacancy:vacancies(title, module:modules(name)))"
          )
          .eq("application.user_id", session.user.id)
          .order("started_at", { ascending: false });

        if (attemptsError) throw new Error("No se pudieron cargar tus postulaciones.");

        const parsedAttempts = ((attemptsData ?? []) as AttemptItem[]).map((attempt) => ({
          ...attempt,
          decision: attempt.decision === "APPROVED" || attempt.decision === "REJECTED" ? attempt.decision : null,
        }));

        const unresolved = parsedAttempts.filter((attempt) => !attempt.decision).map((attempt) => attempt.id);

        if (unresolved.length > 0) {
          const { data: reviewsData } = await supabase
            .from("reviews")
            .select("attempt_id, decision, notes, comments")
            .in("attempt_id", unresolved)
            .order("created_at", { ascending: false });

          const reviews = (reviewsData ?? []) as Review[];
          const byAttempt = new Map<string, Review>();

          reviews.forEach((review) => {
            if (!byAttempt.has(review.attempt_id)) byAttempt.set(review.attempt_id, review);
          });

          parsedAttempts.forEach((attempt) => {
            const review = byAttempt.get(attempt.id);
            if (!review) return;
            if (review.decision === "APPROVED" || review.decision === "REJECTED") attempt.decision = review.decision;
            attempt.reviewer_notes = review.notes ?? review.comments ?? attempt.reviewer_notes;
          });
        }

        const decisionChanges: Record<string, boolean> = {};
        parsedAttempts.forEach((attempt) => {
          const snapshot = getDecisionSnapshot(attempt);
          const key = `lastSeenDecision:${session.user.id}:${attempt.id}`;
          const previous = window.localStorage.getItem(key);
          decisionChanges[attempt.id] = previous !== null && previous !== snapshot;
        });

        parsedAttempts.forEach((attempt) => {
          const key = `lastSeenDecision:${session.user.id}:${attempt.id}`;
          window.localStorage.setItem(key, getDecisionSnapshot(attempt));
        });

        setAttempts(parsedAttempts);
        setNewDecisionByAttempt(decisionChanges);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Ocurrió un error inesperado.");
      } finally {
        setLoadingAttempts(false);
      }
    };

    void loadProfileAndAttempts();
  }, [session, supabase]);

  if (loading) {
    return (
      <main className="uces-page flex items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 text-sm text-slate-600">Cargando perfil...</CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="uces-page">
      <div className="uces-container space-y-6">
        <header className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-300/40">
          <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_0.85fr] md:p-8">
            <div>
              <Badge variant="info" className="mb-4 w-fit">Perfil del postulante</Badge>
              <h1 className="text-3xl font-black tracking-tight">Mi proceso de reclutamiento</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Consulta el avance de tus postulaciones, evaluaciones enviadas y respuestas del equipo administrativo.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-slate-300">Sesión activa</p>
              <p className="mt-1 break-all text-base font-semibold">{profileEmail ?? "Sin email disponible"}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild variant="secondary">
                  <Link href="/panel">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al panel
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {errorMessage ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div> : null}

        <section className="grid gap-4 md:grid-cols-4">
          <Card><CardContent className="flex items-center gap-4 p-5"><FileText className="h-7 w-7 text-blue-700" /><div><p className="text-sm text-slate-500">Postulaciones</p><p className="text-3xl font-black">{totalAttempts}</p></div></CardContent></Card>
          <Card><CardContent className="flex items-center gap-4 p-5"><Clock3 className="h-7 w-7 text-amber-700" /><div><p className="text-sm text-slate-500">En revisión</p><p className="text-3xl font-black">{underReviewCount}</p></div></CardContent></Card>
          <Card><CardContent className="flex items-center gap-4 p-5"><CheckCircle2 className="h-7 w-7 text-emerald-700" /><div><p className="text-sm text-slate-500">Aceptadas</p><p className="text-3xl font-black">{approvedCount}</p></div></CardContent></Card>
          <Card><CardContent className="flex items-center gap-4 p-5"><XCircle className="h-7 w-7 text-red-700" /><div><p className="text-sm text-slate-500">No seleccionadas</p><p className="text-3xl font-black">{rejectedCount}</p></div></CardContent></Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>Mis postulaciones</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {loadingAttempts ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600">Cargando tus postulaciones...</div>
            ) : attempts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-base font-semibold text-slate-900">Aún no tienes postulaciones registradas.</p>
                <p className="mt-1 text-sm text-slate-600">Cuando te postules a una vacante, podrás revisar aquí el estado de tu proceso.</p>
                <Button asChild className="mt-4">
                  <Link href="/panel">Explorar módulos disponibles</Link>
                </Button>
              </div>
            ) : (
              attempts.map((attempt) => (
                <article key={attempt.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <BriefcaseBusiness className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-bold text-slate-950">{attempt.application?.vacancy?.title ?? "Vacante sin título"}</h2>
                          {newDecisionByAttempt[attempt.id] ? <Badge variant="destructive">Actualización nueva</Badge> : null}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">Módulo: {attempt.application?.vacancy?.module?.name ?? "Sin módulo asignado"}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant={getStatusBadgeVariant(attempt.status)}>{getStatusLabel(attempt.status)}</Badge>
                      {attempt.decision ? (
                        <Badge variant={attempt.decision === "APPROVED" ? "success" : "destructive"}>{getDecisionLabel(attempt.decision)}</Badge>
                      ) : (
                        <Badge variant="outline">Decisión pendiente</Badge>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-700">{getFriendlyStatus(attempt)}</p>

                  <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                    <div><p className="text-slate-500">Fecha de envío</p><p className="font-semibold text-slate-900">{formatDate(attempt.submitted_at)}</p></div>
                    <div><p className="text-slate-500">Fecha límite</p><p className="font-semibold text-slate-900">{formatDate(attempt.deadline_at)}</p></div>
                    <div><p className="text-slate-500">Puntaje teórico</p><p className="font-semibold text-slate-900">{attempt.theory_score !== null ? `${attempt.theory_score} pts` : "Pendiente"}</p></div>
                  </div>

                  {attempt.reviewer_notes ? (
                    <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <p className="text-sm font-bold text-blue-900">Comentarios del revisor</p>
                      <p className="mt-1 text-sm leading-6 text-blue-800">{attempt.reviewer_notes}</p>
                    </div>
                  ) : null}
                </article>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
