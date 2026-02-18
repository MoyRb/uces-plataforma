"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseBrowser } from "@/lib/supabaseClient";

type Profile = {
  email: string | null;
};

export default function PerfilPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [profileEmail, setProfileEmail] = useState<string | null>(null);
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

    const loadProfile = async () => {
      const { data } = await supabase.from("profiles").select("email").eq("user_id", session.user.id).maybeSingle();
      setProfileEmail((data as Profile | null)?.email ?? session.user.email ?? null);
    };

    loadProfile();
  }, [session, supabase]);

  if (loading) {
    return <main className="p-6">Cargando perfil...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-2xl space-y-4">
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
      </div>
    </main>
  );
}
