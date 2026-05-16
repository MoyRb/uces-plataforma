import Link from "next/link";
import { ArrowLeft, ClipboardList, Clock3, FileUp, MapPin, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabaseServer";

import { ApplyButton } from "./postular";

type VacancyPageProps = {
  params: Promise<{ id: string }>;
};

type VacancyDetail = {
  id: string;
  title: string;
  description: string | null;
  requirements: string | null;
  schedule: string | null;
  location: string | null;
  status: string | null;
  module_id: string | null;
  modules?: { name: string | null } | null;
  assessments?: { id: string; duration_minutes: number | null } | null;
};

const getStatusBadge = (status: string | null) => {
  if (status === "open") return { label: "Abierta", variant: "success" as const };
  if (status === "draft") return { label: "Borrador", variant: "warning" as const };
  return { label: "Cerrada", variant: "secondary" as const };
};

export default async function VacancyDetailPage({ params }: VacancyPageProps) {
  const { id } = await params;
  const supabase = supabaseServer();

  const { data: vacancy } = await supabase
    .from("vacancies")
    .select("id, title, description, requirements, schedule, location, status, module_id, modules(name), assessments(id, duration_minutes)")
    .eq("id", id)
    .maybeSingle<VacancyDetail>();

  if (!vacancy) {
    return (
      <main className="uces-page">
        <div className="uces-container flex min-h-screen flex-col items-center justify-center gap-6 text-center">
          <h1 className="text-3xl font-black text-slate-950">Vacante no encontrada</h1>
          <p className="max-w-md text-slate-600">La vacante que buscas no está disponible.</p>
          <Button asChild>
            <Link href="/panel">Volver al panel</Link>
          </Button>
        </div>
      </main>
    );
  }

  const status = getStatusBadge(vacancy.status);
  const moduleName = vacancy.modules?.name ?? "Módulo";
  const durationText = vacancy.assessments?.duration_minutes ?? 30;
  const requirementsList = vacancy.requirements?.split(/\n|,/).map((req) => req.trim()).filter(Boolean) ?? [];
  const isOpen = vacancy.status === "open";

  return (
    <main className="uces-page">
      <div className="uces-container space-y-8">
        <header className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="info">{moduleName}</Badge>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
              <div>
                <h1 className="max-w-3xl text-3xl font-black tracking-tight md:text-4xl">{vacancy.title}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                  {vacancy.description ?? "Revisa la información de esta oportunidad antes de postularte."}
                </p>
              </div>
            </div>
            {vacancy.module_id ? (
              <Button asChild variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950">
                <Link href={`/modulos/${vacancy.module_id}`}>
                  <ArrowLeft className="h-4 w-4" />
                  Otras vacantes
                </Link>
              </Button>
            ) : null}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información de la vacante</CardTitle>
                <CardDescription>Datos principales de la convocatoria.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500"><Clock3 className="h-4 w-4" />Horario</div>
                  <p className="mt-2 font-bold text-slate-950">{vacancy.schedule || "Por definir"}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-slate-500"><MapPin className="h-4 w-4" />Ubicación</div>
                  <p className="mt-2 font-bold text-slate-950">{vacancy.location || "Por definir"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
                <CardDescription>Conoce lo que necesitas para aplicar.</CardDescription>
              </CardHeader>
              <CardContent>
                {requirementsList.length > 0 ? (
                  <ul className="grid gap-3 text-sm text-slate-700">
                    {requirementsList.map((req) => (
                      <li key={req} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">No hay requisitos adicionales publicados.</p>
                )}
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <Card>
              <CardHeader>
                <CardTitle>Proceso de evaluación</CardTitle>
                <CardDescription>Resumen de lo que ocurrirá al postularte.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex gap-3 rounded-2xl bg-blue-50 p-4 text-sm text-blue-900">
                    <ClipboardList className="mt-0.5 h-5 w-5" />
                    <div><p className="font-bold">Evaluación teórica</p><p>{durationText} minutos para responder las preguntas.</p></div>
                  </div>
                  <div className="flex gap-3 rounded-2xl bg-orange-50 p-4 text-sm text-orange-900">
                    <FileUp className="mt-0.5 h-5 w-5" />
                    <div><p className="font-bold">Evidencia práctica</p><p>Podrás subir archivo en PDF o imagen si la vacante lo requiere.</p></div>
                  </div>
                </div>

                {!isOpen ? (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    Esta vacante no está abierta para nuevas postulaciones.
                  </div>
                ) : null}

                <ApplyButton vacancyId={vacancy.id} disabled={!isOpen} />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
