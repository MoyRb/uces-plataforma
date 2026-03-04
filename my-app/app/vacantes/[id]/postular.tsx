"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PSICOMETRICO_REQUIRED_MESSAGE } from "@/lib/assessmentConstants";
import { supabaseBrowser } from "@/lib/supabaseClient";

export function ApplyButton({ vacancyId }: { vacancyId: string }) {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApply = async () => {
    setLoading(true);
    setError(null);

    const { data: sessionData } = await supabase.auth.getSession();
    const token = sessionData.session?.access_token;

    if (!token) {
      router.replace("/login");
      setLoading(false);
      return;
    }

    const response = await fetch(`/api/vacancies/${vacancyId}/apply`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (payload.requiresPsychometric) {
        setError(payload.error ?? PSICOMETRICO_REQUIRED_MESSAGE);
        router.push(payload.redirectTo ?? "/psicometrico");
      } else {
        setError(payload.error ?? "No se pudo completar la postulación");
      }
      setLoading(false);
      return;
    }

    router.push(`/evaluacion/${payload.attemptId}`);
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleApply}
        disabled={loading}
        className="w-full bg-orange-500 text-white hover:bg-orange-600"
      >
        {loading ? "Procesando..." : "Postularme ahora"}
      </Button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
