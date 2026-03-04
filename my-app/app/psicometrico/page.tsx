"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PSICOMETRICO_REQUIRED_MESSAGE } from "@/lib/assessmentConstants";
import { supabaseBrowser } from "@/lib/supabaseClient";

export default function PsicometricoPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const startOrResumeAttempt = useCallback(
    async ({ clearError }: { clearError: boolean }) => {
      if (clearError) {
        setError(null);
      }

      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        router.replace("/login");
        return;
      }

      const response = await fetch("/api/psicometrico/start", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(payload.error ?? "No se pudo iniciar el psicométrico");
        setLoading(false);
        return;
      }

      if (payload.completed) {
        router.replace("/panel");
        return;
      }

      router.replace(`/evaluacion/${payload.attemptId}`);
    },
    [router, supabase],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      startOrResumeAttempt({ clearError: false });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [startOrResumeAttempt]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <Card className="w-full max-w-xl border-slate-100 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">Test psicométrico base</CardTitle>
          <CardDescription className="text-slate-700">{PSICOMETRICO_REQUIRED_MESSAGE}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-700">
            Este test es requisito único antes de postularte a cualquier vacante. Te tomará aproximadamente 10 minutos.
          </p>
          <Button
            onClick={() => {
              setLoading(true);
              startOrResumeAttempt({ clearError: true });
            }}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Preparando evaluación..." : "Reintentar inicio"}
          </Button>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </CardContent>
      </Card>
    </main>
  );
}
