import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabaseServer } from "@/lib/supabaseServer";

type ModulePageProps = {
  params: { moduleId: string };
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

export default async function ModuleVacanciesPage({ params }: ModulePageProps) {
  const supabase = supabaseServer();

  const [{ data: module, error: moduleError }, { data: vacanciesData }] = await Promise.all([
    supabase.from("modules").select("id, name, description").eq("id", params.moduleId).maybeSingle<Module>(),
    supabase
      .from("vacancies")
      .select("id, title, schedule, location, status")
      .eq("module_id", params.moduleId)
      .order("title"),
  ]);

  const vacancies = (vacanciesData as Vacancy[] | null) ?? [];

  if (moduleError || !module) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Módulo no encontrado</h1>
          <p className="text-slate-600">No pudimos encontrar la información solicitada.</p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/panel">Volver al panel</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-blue-700">Módulo</p>
            <h1 className="text-3xl font-bold text-slate-900">{module.name}</h1>
            {module.description ? <p className="text-slate-600">{module.description}</p> : null}
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/panel">Volver al panel</Link>
            </Button>
          </div>
        </header>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Vacantes disponibles</h2>
            <Badge variant="secondary">{vacancies?.length ?? 0} vacantes</Badge>
          </div>

          {vacancies && vacancies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {vacancies.map((vacancy) => (
                <Card key={vacancy.id} className="border-slate-100 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-slate-900">
                      <span>{vacancy.title}</span>
                      <Badge variant={vacancy.status === "open" ? "outline" : "secondary"} className="text-xs uppercase">
                        {vacancy.status ?? ""}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="space-y-1 text-slate-700">
                      <p className="font-medium text-slate-800">Horario: {vacancy.schedule || "Por definir"}</p>
                      <p className="text-sm">Ubicación: {vacancy.location || "Por definir"}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full bg-orange-500 text-white hover:bg-orange-600">
                      <Link href={`/vacantes/${vacancy.id}`}>Ver detalle</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-600">
              No hay vacantes activas en este módulo.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
