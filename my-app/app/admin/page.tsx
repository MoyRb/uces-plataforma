"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveRole } from "@/lib/auth";
import { supabaseBrowser } from "@/lib/supabaseClient";

type Profile = {
  name: string | null;
  role: string | null;
  email: string | null;
};

export default function AdminPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("name, role, email")
        .eq("user_id", data.session.user.id)
        .maybeSingle();

      const mergedProfile: Profile = profileData ?? {
        name: null,
        role: null,
        email: data.session.user.email ?? null,
      };

      const effectiveRole = resolveRole(mergedProfile.role, mergedProfile.email);

      if (effectiveRole !== "admin" && effectiveRole !== "reviewer") {
        // TEMP: replace with roles from profiles table when available
        router.replace("/panel");
        return;
      }

      setProfile(mergedProfile);
      setChecking(false);
    });
  }, [router, supabase]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-600">Validando permisos...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <p className="text-sm font-semibold text-blue-700">Panel administrativo</p>
          <h1 className="text-2xl font-bold text-slate-900">Gestión y revisión</h1>
          <p className="text-sm text-slate-600">
            Acceso restringido para administradores y revisores. Gestiona contenidos, revisa evaluaciones y consulta KPIs.
          </p>
          <div className="mt-2 flex items-center gap-3 text-sm text-slate-700">
            <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">{profile?.email}</span>
            <span className="rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-700">Acceso autorizado</span>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-slate-100 shadow-md">
            <CardHeader>
              <CardTitle>Gestor de Preguntas</CardTitle>
              <CardDescription>Organiza bancos de preguntas y tareas prácticas por módulo.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Abrir gestor
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-md">
            <CardHeader>
              <CardTitle>Revisión de Evaluaciones</CardTitle>
              <CardDescription>Seguimiento de intentos, rúbricas y decisiones de revisión.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                Ir a revisiones
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-md">
            <CardHeader>
              <CardTitle>KPIs (próximamente)</CardTitle>
              <CardDescription>Indicadores clave de desempeño y progreso general.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" disabled>
                Muy pronto
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
