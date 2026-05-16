"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowRight, BriefcaseBusiness, ClipboardCheck, LayoutDashboard, LogOut, ShieldCheck, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

type AttemptState = {
  status: string | null;
  submitted_at: string | null;
  application?: { user_id: string } | { user_id: string }[] | null;
};

const completedStatuses = new Set(["SUBMITTED", "UNDER_REVIEW", "COMPLETED"]);

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
  const [errorMessage, setErrorMessage] = useState("");

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

      if (!error && data) setProfile(data as Profile);
      else setProfile({ name: null, email: session.user.email ?? null });
    };

    void loadProfile();
  }, [session, supabase]);

  useEffect(() => {
    if (!session) return;

    const loadRole = async () => {
      const role = await getRoleForSession(supabase);
      setUserRole(role);
    };

    void loadRole();
  }, [session, supabase]);

  useEffect(() => {
    if (!session) return;

    const loadModules = async () => {
      setLoadingModules(true);
      setErrorMessage("");

      const { data, error } = await supabase.from("modules").select("id, name, description").order("name");

      if (error) setErrorMessage("No se pudieron cargar los módulos disponibles.");
      else setModules((data ?? []) as Module[]);

      setLoadingModules(false);
    };

    void loadModules();
  }, [session, supabase]);

  useEffect(() => {
    if (!session) return;

    const loadPsicometricoState = async () => {
      const { data, error } = await supabase
        .from("attempts")
        .select("status, submitted_at, application:applications!inner(user_id)")
        .eq("assessment_id", PSICOMETRICO_BASE_ASSESSMENT_ID)
        .eq("application.user_id", session.user.id)
        .order("started_at", { ascending: false });

      if (error) {
        setPsicometricoReady(false);
        return;
      }

      const attempts = (data ?? []) as AttemptState[];
      const hasCompleted = attempts.some((attempt) => Boolean(attempt.submitted_at) || completedStatuses.has(attempt.status ?? ""));
      setPsicometricoReady(hasCompleted);
    };

    void loadPsicometricoState();
  }, [session, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (checkingSession) {
    return (
      <main className="uces-page flex items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 text-sm text-slate-600">Cargando panel...</CardContent>
        </Card>
      </main>
    );
  }

  const isAdmin = userRole === "admin";
  const userLabel = profile?.name || profile?.email || session?.user.email || "Usuario";
  const totalModules = modules.length;

  return (
    <main className="uces-page">
      <div className="uces-container space-y-8">
        <header className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-300/40">
          <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_0.85fr] md:p-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 font-black">UC</div>
                <div>
                  <p className="text-sm font-semibold text-blue-200">UCES Plataforma de Talento</p>
                  <h1 className="text-3xl font-black tracking-tight">Panel principal</h1>
                </div>
                <Badge variant={isAdmin ? "warning" : "info"}>{isAdmin ? "Administrador" : "Postulante"}</Badge>
              </div>
              <div>
                <p className="text-lg font-semibold">Hola, {userLabel}</p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                  Explora módulos, consulta vacantes y da seguimiento a tus evaluaciones dentro del proceso de reclutamiento universitario.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="secondary">
                  <Link href="/perfil">
                    <UserRound className="h-4 w-4" />
                    Mi perfil
                  </Link>
                </Button>
                {isAdmin ? (
                  <Button asChild>
                    <Link href="/admin">
                      <ShieldCheck className="h-4 w-4" />
                      Panel administrativo
                    </Link>
                  </Button>
                ) : null}
                <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Módulos activos</p>
                <p className="mt-1 text-3xl font-black">{totalModules}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Psicométrico</p>
                <p className="mt-1 text-xl font-black">{psicometricoReady ? "Completado" : "Pendiente"}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Sesión</p>
                <p className="mt-1 break-all text-sm font-semibold">{profile?.email ?? session?.user.email}</p>
              </div>
            </div>
          </div>
        </header>

        {errorMessage ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div> : null}

        {!isAdmin && psicometricoReady === false ? (
          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-amber-900">Requisito pendiente</p>
                  <p className="mt-1 text-sm leading-6 text-amber-900">{PSICOMETRICO_REQUIRED_MESSAGE}</p>
                </div>
              </div>
              <Button asChild>
                <Link href="/psicometrico">Iniciar psicométrico</Link>
              </Button>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Rol activo</p>
                <p className="text-xl font-black capitalize text-slate-950">{userRole}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Áreas disponibles</p>
                <p className="text-xl font-black text-slate-950">{totalModules}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <ClipboardCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Estado inicial</p>
                <p className="text-xl font-black text-slate-950">{psicometricoReady ? "Listo" : "Pendiente"}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Explorar</p>
              <h2 className="uces-section-title">Módulos disponibles</h2>
            </div>
            <p className="text-sm text-slate-500">Selecciona un módulo para ver las vacantes publicadas.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {loadingModules ? (
              <Card className="col-span-full border-dashed bg-white/80">
                <CardContent className="p-8 text-center text-sm text-slate-600">Cargando módulos...</CardContent>
              </Card>
            ) : modules.length === 0 ? (
              <Card className="col-span-full border-dashed bg-white/80">
                <CardContent className="p-8 text-center text-sm text-slate-600">No hay módulos disponibles por el momento.</CardContent>
              </Card>
            ) : (
              modules.map((module) => (
                <Card key={module.id} className="group overflow-hidden bg-white/95 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-300/50">
                  <CardHeader>
                    <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <CardTitle>{module.name}</CardTitle>
                    <CardDescription>{module.description || "Consulta las vacantes y evaluaciones disponibles para esta área."}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" variant="outline">
                      <Link href={`/modulos/${module.id}`}>
                        Entrar al módulo
                        <ArrowRight className="h-4 w-4" />
                      </Link>
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
