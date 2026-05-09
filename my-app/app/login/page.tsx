"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseBrowser } from "@/lib/supabaseClient";

const getFriendlyAuthError = (message: string) => {
  const lower = message.toLowerCase();
  if (lower.includes("invalid login")) return "Correo o contraseña incorrectos.";
  if (lower.includes("email not confirmed")) return "Tu correo aún no ha sido confirmado.";
  return message;
};

export default function LoginPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/panel");
      else setCheckingSession(false);
    });
  }, [router, supabase]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(getFriendlyAuthError(signInError.message));
      return;
    }

    router.replace("/panel");
  };

  if (checkingSession) {
    return (
      <main className="uces-page flex items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 text-sm text-slate-600">Verificando sesión...</CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="uces-page">
      <div className="uces-container grid min-h-screen items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden space-y-6 lg:block">
          <Badge variant="info" className="w-fit">Acceso seguro</Badge>
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tight text-slate-950">Continúa tu proceso de reclutamiento.</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Ingresa para revisar vacantes, completar evaluaciones y consultar actualizaciones de tus postulaciones.
            </p>
          </div>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-blue-700" />
              <div>
                <p className="font-semibold text-slate-950">Roles separados</p>
                <p className="text-sm text-slate-600">El sistema muestra herramientas diferentes para administradores y postulantes.</p>
              </div>
            </div>
          </div>
        </section>

        <Card className="mx-auto w-full max-w-md bg-white/95 shadow-xl shadow-slate-300/40 backdrop-blur">
          <CardHeader className="space-y-3 text-center">
            <Badge variant="secondary" className="mx-auto w-fit">UCES Talento</Badge>
            <div>
              <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
              <CardDescription>Usa tus credenciales para entrar al panel.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="uces-label" htmlFor="email">Correo electrónico</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    className="uces-input pl-10"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    placeholder="nombre@uces.mx"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="uces-label" htmlFor="password">Contraseña</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    className="uces-input pl-10"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {error ? <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Accediendo..." : "Entrar al panel"}
                {!loading ? <ArrowRight className="h-4 w-4" /> : null}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-center text-sm text-slate-600">
              ¿Aún no tienes cuenta? {" "}
              <Link className="font-bold text-blue-700 hover:underline" href="/register">Crea una cuenta de postulante</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
