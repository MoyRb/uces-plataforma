"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PSICOMETRICO_BASE_ASSESSMENT_ID, PSICOMETRICO_REQUIRED_MESSAGE } from "@/lib/assessmentConstants";
import { getRoleForSession } from "@/lib/auth";
import { supabaseBrowser } from "@/lib/supabaseClient";

type Profile = {
  name: string | null;
  email: string | null;
};

type Module = {
  id: string;
  name: string;
  description: string | null;
};

export default function PanelPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [loadingModules, setLoadingModules] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);
  const [userRole, setUserRole] = useState<"user" | "admin">("user");
  const [psicometricoReady, setPsicometricoReady] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }

      setSession(data.session);
      setCheckingSession(false);
    });
  }, [router, supabase]);

  useEffect(() => {
    if (!session) return;

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("name, email")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!error && data) {
        setProfile(data as Profile);
      } else {
        setProfile({ name: null, email: session.user.email ?? null });
      }
    };

    loadProfile();
  }, [session, supabase]);


  useEffect(() => {
    if (!session) return;

    const loadRole = async () => {
      const role = await getRoleForSession(supabase);
      setUserRole(role);
    };

    loadRole();
  }, [session, supabase]);

  useEffect(() => {
    if (!session) return;

    const loadModules = async () => {
      const { data, error } = await supabase.from("modules").select("id, name, description").order("name");

      if (!error && data) {
        setModules(data as Module[]);
      }

      setLoadingModules(false);
    };

    loadModules();
  }, [session, supabase]);

  useEffect(() => {
    if (!session) return;

    const loadPsicometricoState = async () => {
      const { data } = await supabase
        .from("attempts")
        .select("status, submitted_at")
        .eq("assessment_id", PSICOMETRICO_BASE_ASSESSMENT_ID)
        .order("started_at", { ascending: false });

      const hasCompleted = (data ?? []).some((attempt) => {
        if (attempt.submitted_at) return true;
        return ["SUBMITTED", "UNDER_REVIEW", "COMPLETED"].includes(attempt.status ?? "");
      });

      setPsicometricoReady(hasCompleted);
    };

    loadPsicometricoState();
  }, [session, supabase]);

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-600">Cargando panel...</div>
      </main>
    );
  }

  const isAdmin = userRole === "admin";
  const userLabel = profile?.name || profile?.email || session?.user.email;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold uppercase text-white">UCES</div>
              <div>
                <p className="text-sm font-semibold text-blue-700">Plataforma de talento</p>
                <h1 className="text-2xl font-bold text-slate-900">Panel principal</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button asChild variant="outline">
                <Link href="/perfil">Mi perfil</Link>
              </Button>
              {isAdmin ? (
                <Button asChild variant="secondary">
                  <Link href="/admin">Panel Administrativo</Link>
                </Button>
              ) : null}
            </div>
          </div>
          <div>
            <p className="text-base font-medium text-slate-900">Hola {userLabel}</p>
            <p className="text-sm text-slate-600">
              Explora los módulos disponibles y sigue tus pendientes. Podrás registrar evidencias, revisar convocatorias y
              mantener comunicación con revisores.
            </p>
          </div>
        </header>

        {!isAdmin && psicometricoReady === false ? (
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="text-sm font-semibold text-amber-800">Requisito pendiente</p>
            <p className="mt-1 text-sm text-amber-900">{PSICOMETRICO_REQUIRED_MESSAGE}</p>
            <Button asChild className="mt-4">
              <Link href="/psicometrico">Iniciar psicométrico</Link>
            </Button>
          </section>
        ) : null}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Módulos disponibles</h2>
            <p className="text-sm font-medium text-blue-700">Rol activo: {userRole}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loadingModules ? (
              <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-600">
                Cargando módulos...
              </div>
            ) : modules.length === 0 ? (
              <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-600">
                No hay módulos disponibles por el momento.
              </div>
            ) : (
              modules.map((module) => (
                <Card key={module.id} className="border-slate-100 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-slate-900">{module.name}</CardTitle>
                    <CardDescription className="text-slate-700">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" variant="outline">
                      <Link href={`/modulos/${module.id}`}>Entrar</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
