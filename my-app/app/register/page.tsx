"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, Fingerprint, LockKeyhole, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseBrowser } from "@/lib/supabaseClient";

const curpPattern = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

export default function RegisterPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [curp, setCurp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  const normalizedCurp = curp.trim().toUpperCase();
  const isCurpValid = normalizedCurp.length === 0 || curpPattern.test(normalizedCurp);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/panel");
      else setCheckingSession(false);
    });
  }, [router, supabase]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!curpPattern.test(normalizedCurp)) {
      setError("CURP inválida. Revisa el formato antes de continuar.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), password, curp: normalizedCurp }),
    });

    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(body.error ?? "No se pudo crear tu cuenta");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
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
      <div className="uces-container grid min-h-screen items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
        <Card className="mx-auto w-full max-w-md bg-white/95 shadow-xl shadow-slate-300/40 backdrop-blur">
          <CardHeader className="space-y-3 text-center">
            <Badge variant="info" className="mx-auto w-fit">Nuevo postulante</Badge>
            <div>
              <CardTitle className="text-2xl">Crear cuenta</CardTitle>
              <CardDescription>Regístrate para iniciar evaluaciones y dar seguimiento a tus postulaciones.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="uces-label" htmlFor="email">Correo electrónico</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input id="email" type="email" className="uces-input pl-10" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="nombre@uces.mx" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="uces-label" htmlFor="password">Contraseña</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input id="password" type="password" className="uces-input pl-10" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={6} autoComplete="new-password" />
                </div>
                <p className="text-xs text-slate-500">Mínimo 6 caracteres.</p>
              </div>

              <div className="space-y-2">
                <label className="uces-label" htmlFor="curp">CURP</label>
                <div className="relative">
                  <Fingerprint className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <input
                    id="curp"
                    type="text"
                    className={`uces-input pl-10 uppercase ${!isCurpValid ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}`}
                    value={curp}
                    onChange={(event) => setCurp(event.target.value.toUpperCase())}
                    required
                    maxLength={18}
                    placeholder="ABCD010101HDFRLL00"
                  />
                </div>
                {!isCurpValid ? <p className="text-xs font-medium text-red-600">El formato de CURP no es válido.</p> : null}
              </div>

              {error ? <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear cuenta"}
                {!loading ? <ArrowRight className="h-4 w-4" /> : null}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-center text-sm text-slate-600">
              ¿Ya tienes cuenta? {" "}
              <Link className="font-bold text-blue-700 hover:underline" href="/login">Inicia sesión</Link>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-6">
          <Badge variant="secondary" className="w-fit">Proceso protegido</Badge>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">Registra tu perfil una sola vez y postúlate a múltiples vacantes.</h1>
          <p className="text-lg leading-8 text-slate-600">
            La CURP se valida y se guarda de forma protegida mediante hash para evitar duplicados sin exponer el dato directamente.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Cuenta de postulante", "Psicométrico inicial", "Vacantes por módulo", "Seguimiento del resultado"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/70 bg-white/80 p-4 font-semibold text-slate-800 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
