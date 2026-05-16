import Link from "next/link";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, MapPin, Timer } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabaseServer";

type ModulePageProps = {
  params: Promise<{ moduleId: string }>;
};

type Vacancy = {
  id: string;
  title: string;
  schedule: string | null;
  location: string | null;
  status: string | null;
};

type Module = {
  id: string;
  name: string;
  description: string | null;
};

const getStatusBadge = (status: string | null) => {
  if (status === "open") return { label: "Abierta", variant: "success" as const };
  if (status === "draft") return { label: "Borrador", variant: "warning" as const };
  return { label: "Cerrada", variant: "secondary" as const };
};

export default async function ModuleVacanciesPage({ params }: ModulePageProps) {
  const { moduleId } = await params;
  const supabase = supabaseServer();

  const [{ data: module, error: moduleError }, { data: vacanciesData }] = await Promise.all([
    supabase.from("modules").select("id, name, description").eq("id", moduleId).maybeSingle<Module>(),
    supabase.from("vacancies").select("id, title, schedule, location, status").eq("module_id", moduleId).order("title"),
  ]);

  const vacancies = ((vacanciesData as Vacancy[] | null) ?? []).filter((vacancy) => vacancy.status !== "draft");

  if (moduleError || !module) {
    return (
      <main className="uces-page">
        <div className="uces-container flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-3xl font-black text-slate-950">Módulo no encontrado</h1>
          <p className="max-w-md text-slate-600">No pudimos encontrar la información solicitada.</p>
          <Button asChild>
            <Link href="/panel">Volver al panel</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="uces-page">
      <div className="uces-container space-y-8">
        <header className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <Badge variant="info" className="w-fit">Módulo de reclutamiento</Badge>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">{module.name}</h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                {module.description || "Consulta las vacantes disponibles para esta área y revisa los requisitos antes de postularte."}
              </p>
            </div>
            <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950">
              <Link href="/panel">
                <ArrowLeft className="h-4 w-4" />
                Volver al panel
              </Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Convocatorias</p>
              <h2 className="uces-section-title">Vacantes disponibles</h2>
            </div>
            <Badge variant="secondary" className="w-fit">{vacancies.length} vacantes</Badge>
          </div>

          {vacancies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {vacancies.map((vacancy) => {
                const status = getStatusBadge(vacancy.status);
                const isOpen = vacancy.status === "open";
                return (
                  <Card key={vacancy.id} className="group overflow-hidden bg-white/95 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-300/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                            <BriefcaseBusiness className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle>{vacancy.title}</CardTitle>
                            <CardDescription>Revisa el detalle de la convocatoria y sus requisitos.</CardDescription>
                          </div>
                        </div>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-3 text-sm sm:grid-cols-2">
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-slate-700">
                          <Timer className="h-4 w-4 text-blue-700" />
                          {vacancy.schedule || "Horario por definir"}
                        </div>
                        <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-slate-700">
                          <MapPin className="h-4 w-4 text-blue-700" />
                          {vacancy.location || "Ubicación por definir"}
                        </div>
                      </div>
                      <Button asChild className="w-full" variant={isOpen ? "default" : "outline"}>
                        <Link href={`/vacantes/${vacancy.id}`}>
                          Ver detalle
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-dashed bg-white/80">
              <CardContent className="p-8 text-center text-sm text-slate-600">No hay vacantes activas en este módulo.</CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}
