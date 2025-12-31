"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseBrowser } from "@/lib/supabaseClient";

const inputClassName =
  "w-full rounded-lg border border-slate-200 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

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
      if (data.session) {
        router.replace("/panel");
      } else {
        setCheckingSession(false);
      }
    });
  }, [router, supabase]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace("/panel");
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-600">Verificando sesión...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-16">
        <header className="text-center">
          <p className="text-sm font-semibold text-blue-600">UCES Plataforma de Talento</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Bienvenido de nuevo</h1>
          <p className="mt-2 text-slate-600">Accede a tu cuenta para continuar con tus evaluaciones y registros.</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Iniciar sesión</CardTitle>
              <CardDescription>Usa tus credenciales para entrar al panel.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="email">
                    Correo institucional
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={inputClassName}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    placeholder="nombre@uces.mx"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={inputClassName}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <Button className="w-full" type="submit" disabled={loading}>
                  {loading ? "Accediendo..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-blue-100 bg-blue-50/50 shadow-md">
            <CardHeader>
              <CardTitle className="text-blue-800">¿Aún no tienes cuenta?</CardTitle>
              <CardDescription className="text-blue-700">
                Regístrate para postularte a vacantes y completar evaluaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                Al crear tu cuenta podrás acceder a tu panel personalizado, subir evidencias y seguir el progreso de tus
                evaluaciones.
              </p>
              <Button asChild variant="secondary">
                <Link href="/register">Crear cuenta</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
