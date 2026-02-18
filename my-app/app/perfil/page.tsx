"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";

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
    vacancy?: { title?: string | null; module?: { name?: string | null } | null } | null;
  } | null;
};

type Review = {
  attempt_id: string;
  decision?: string | null;
  notes?: string | null;
  comments?: string | null;
};

const formatDate = (value: string | null | undefined) => (value ? new Date(value).toLocaleString() : "-");

const getFriendlyStatus = (attempt: AttemptItem) => {
  if (attempt.status !== "COMPLETED") {
    if (attempt.status === "IN_PROGRESS") return "Tienes un intento en progreso.";
    if (attempt.status === "SUBMITTED") return "Tu evaluación fue enviada.";
    if (attempt.status === "UNDER_REVIEW") return "Tu evaluación está en revisión.";
    return "Estado de evaluación actualizado.";
  }

  if (attempt.decision === "APPROVED") return "✅ Aceptado";
  if (attempt.decision === "REJECTED") return "❌ No aceptado";
  return "✅ Evaluación finalizada";
};

const getDecisionSnapshot = (attempt: AttemptItem) => `${attempt.status ?? "-"}:${attempt.decision ?? "-"}`;

export default function PerfilPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<AttemptItem[]>([]);
  const [newDecisionByAttempt, setNewDecisionByAttempt] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

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
      const { data } = await supabase.from("profiles").select("email").eq("user_id", session.user.id).maybeSingle();
      setProfileEmail((data as Profile | null)?.email ?? session.user.email ?? null);

      const { data: attemptsData } = await supabase
        .from("attempts")
        .select(
          "id, status, submitted_at, deadline_at, theory_score, decision, reviewer_notes, application:applications!inner(user_id, vacancy:vacancies(title, module:modules(name)))"
        )
        .eq("applications.user_id", session.user.id)
        .order("started_at", { ascending: false });

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
          if (!byAttempt.has(review.attempt_id)) {
            byAttempt.set(review.attempt_id, review);
          }
        });

        parsedAttempts.forEach((attempt) => {
          const review = byAttempt.get(attempt.id);
          if (!review) return;
          if (review.decision === "APPROVED" || review.decision === "REJECTED") {
            attempt.decision = review.decision;
          }
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
    };

    loadProfileAndAttempts();
  }, [session, supabase]);

  if (loading) {
    return <main className="p-6">Cargando perfil...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl space-y-4">
        <Button asChild variant="outline">
          <Link href="/panel">Volver al panel</Link>
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Mi perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Email</p>
            <p className="text-base font-medium text-slate-900">{profileEmail ?? "Sin email disponible"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mis postulaciones / Mis intentos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {attempts.length === 0 ? (
              <p className="text-sm text-slate-600">Aún no tienes intentos registrados.</p>
            ) : (
              attempts.map((attempt) => (
                <div key={attempt.id} className="rounded border bg-white p-3 text-sm">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <p className="font-medium">{attempt.application?.vacancy?.title ?? "Vacante sin título"}</p>
                    {newDecisionByAttempt[attempt.id] ? <Badge variant="destructive">Nuevo</Badge> : null}
                  </div>
                  <p className="text-slate-600">Módulo: {attempt.application?.vacancy?.module?.name ?? "Sin módulo"}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{attempt.status ?? "-"}</Badge>
                    {attempt.decision ? <Badge variant={attempt.decision === "APPROVED" ? "default" : "destructive"}>{attempt.decision}</Badge> : null}
                  </div>
                  <p className="mt-1 text-slate-700">{getFriendlyStatus(attempt)}</p>
                  <p className="text-slate-500">Enviado: {formatDate(attempt.submitted_at)}</p>
                  <p className="text-slate-500">Deadline: {formatDate(attempt.deadline_at)}</p>
                  <p className="text-slate-500">Puntaje teórico: {attempt.theory_score ?? "-"}</p>
                  {attempt.reviewer_notes ? <p className="mt-1 text-slate-700">Notas del revisor: {attempt.reviewer_notes}</p> : null}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
