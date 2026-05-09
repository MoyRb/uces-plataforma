import Link from "next/link";
import { ArrowRight, BadgeCheck, ClipboardList, ShieldCheck, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  {
    icon: ClipboardList,
    title: "Evaluaciones estructuradas",
    description: "Pruebas técnicas, psicométricas y evidencias prácticas en un solo flujo.",
  },
  {
    icon: Users,
    title: "Seguimiento de candidatos",
    description: "Los postulantes pueden consultar avances, resultados y comentarios del equipo revisor.",
  },
  {
    icon: ShieldCheck,
    title: "Gestión por roles",
    description: "Panel administrativo protegido y experiencia separada para candidatos.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <Badge className="w-fit border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50">
              UCES Plataforma de Talento
            </Badge>

            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Reclutamiento universitario más claro, medible y profesional.
            </h1>

            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Administra vacantes, evaluaciones, evidencias y revisiones desde una plataforma pensada para conectar a la universidad con candidatos calificados.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/login">
                Iniciar sesión
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/register">Crear cuenta de postulante</Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="bg-white/80 backdrop-blur">
                  <CardContent className="space-y-3 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-bold text-slate-950">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <Card className="overflow-hidden border-white/60 bg-white/90 shadow-xl shadow-slate-300/40 backdrop-blur">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 font-black">
                  UC
                </div>

                <div>
                  <p className="text-sm text-slate-300">Panel institucional</p>
                  <p className="text-lg font-bold">Proceso activo</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-black">12</p>
                  <p className="text-xs text-slate-300">Vacantes</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-black">38</p>
                  <p className="text-xs text-slate-300">Postulantes</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-2xl font-black">9</p>
                  <p className="text-xs text-slate-300">En revisión</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {["Registro del candidato", "Evaluación psicométrica", "Prueba técnica", "Revisión administrativa"].map(
                (step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-blue-700 shadow-sm">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900">{step}</p>
                      <p className="text-xs text-slate-500">Etapa del proceso de reclutamiento</p>
                    </div>

                    <Badge variant={index < 2 ? "default" : "secondary"}>
                      {index < 2 ? "Listo" : "Pendiente"}
                    </Badge>
                  </div>
                )
              )}
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
              <BadgeCheck className="mt-0.5 h-5 w-5" />
              <p>Diseñado para que candidatos y administradores vean solamente lo necesario según su rol.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}