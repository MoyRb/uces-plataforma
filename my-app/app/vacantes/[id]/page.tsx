import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabaseServer";

import { ApplyButton } from "./postular";

type VacancyPageProps = {
  params: { id: string };
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

export default async function VacancyDetailPage({ params }: VacancyPageProps) {
  const supabase = supabaseServer();

  const { data: vacancy } = await supabase
    .from("vacancies")
    .select("id, title, description, requirements, schedule, location, status, module_id, modules(name), assessments(id, duration_minutes)")
    .eq("id", params.id)
    .maybeSingle<VacancyDetail>();

  if (!vacancy) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Vacante no encontrada</h1>
          <p className="text-slate-600">La vacante que buscas no está disponible.</p>
          <div className="flex justify-center gap-3">
            <Button asChild>
              <Link href="/panel">Volver al panel</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const moduleName = vacancy.modules?.name ?? "Módulo";
  const durationText = vacancy.assessments?.duration_minutes ?? 30;
  const requirementsList = vacancy.requirements?.split(/\n|,/).map((req) => req.trim()).filter(Boolean) ?? [];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="uppercase">{moduleName}</Badge>
            <Badge variant={vacancy.status === "open" ? "outline" : "secondary"}>{vacancy.status ?? ""}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">{vacancy.title}</h1>
          <p className="text-slate-700">{vacancy.description ?? "Revisa la información de esta oportunidad."}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-slate-100 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900">Requisitos</CardTitle>
              <CardDescription>Conoce lo que necesitas para aplicar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-800">
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs uppercase text-slate-500">Horario</p>
                  <p className="font-semibold text-slate-900">{vacancy.schedule || "Por definir"}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs uppercase text-slate-500">Ubicación</p>
                  <p className="font-semibold text-slate-900">{vacancy.location || "Por definir"}</p>
                </div>
              </div>

              {requirementsList.length > 0 ? (
                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                  {requirementsList.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-600">No hay requisitos adicionales publicados.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Proceso de evaluación</CardTitle>
              <CardDescription>Incluye evaluación teórica y práctica.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-700">Al postularte deberás completar una evaluación de {durationText} minutos.</p>
              <div className="rounded-lg bg-orange-50 p-4 text-sm text-orange-800">
                <p className="font-semibold">Aviso</p>
                <p>Necesitarás responder preguntas teóricas y subir evidencia práctica.</p>
              </div>
              <div className="space-y-2">
                <ApplyButton vacancyId={vacancy.id} />
                {vacancy.module_id ? (
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/modulos/${vacancy.module_id}`}>Ver otras vacantes</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/panel">Volver al panel</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
