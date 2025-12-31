"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { resolveRole } from "@/lib/auth";
import { supabaseBrowser } from "@/lib/supabaseClient";

type Profile = {
  name: string | null;
  role: string | null;
  email: string | null;
};

const modules = [
  {
    title: "Laboratorio y talleres",
    description: "Agenda y seguimiento de prácticas supervisadas con reportes en línea.",
  },
  {
    title: "Deportes y recreación",
    description: "Calendario de actividades deportivas, inscripciones y control de asistencia.",
  },
  {
    title: "Campos clínicos",
    description: "Asignación de rotaciones y seguimiento de evaluaciones clínicas.",
  },
  {
    title: "Tecnología y soporte informático",
    description: "Mesa de ayuda, reportes de incidentes y estado de tickets.",
  },
  {
    title: "Biblioteca y recursos académicos",
    description: "Préstamos, reservaciones de salas y acceso a recursos digitales.",
  },
  {
    title: "Vinculación",
    description: "Convenios, bolsa de prácticas y seguimiento de postulaciones.",
  },
  {
    title: "Auxiliar técnico académico",
    description: "Soporte a docentes, materiales y coordinación de evaluaciones.",
  },
];

export default function PanelPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

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
        .select("name, role, email")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!error && data) {
        setProfile(data as Profile);
      } else {
        setProfile({ name: null, role: null, email: session.user.email ?? null });
      }
    };

    loadProfile();
  }, [session, supabase]);

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-600">Cargando panel...</div>
      </main>
    );
  }

  const effectiveRole = resolveRole(profile?.role, session?.user.email);
  const isAdmin = effectiveRole === "admin" || effectiveRole === "reviewer";
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
              <Button variant="outline">Mi perfil</Button>
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

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Módulos disponibles</h2>
            <p className="text-sm font-medium text-blue-700">Rol activo: {effectiveRole}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => (
              <Card key={module.title} className="border-slate-100 shadow-md">
                <CardHeader>
                  <CardTitle className="text-slate-900">{module.title}</CardTitle>
                  <CardDescription className="text-slate-700">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Entrar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
