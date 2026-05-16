"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  FileQuestion,
  LayoutDashboard,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRoleForSession } from "@/lib/auth";
import { supabaseBrowser } from "@/lib/supabaseClient";

type Module = { id: string; name: string; description: string | null };
type Vacancy = {
  id: string;
  module_id: string | null;
  title: string;
  schedule: string | null;
  location: string | null;
  description: string | null;
  requirements: string | null;
  status: "open" | "closed" | "draft";
  modules?: { name: string | null } | null;
};
type Assessment = { id: string; vacancy_id: string | null; title: string | null; duration_minutes: number | null; vacancies?: { title: string | null } | null };
type Question = { id: string; prompt: string; options: unknown; correct_option: string | null };
type Attempt = {
  id: string;
  status: string | null;
  started_at?: string | null;
  submitted_at?: string | null;
  theory_score?: number | null;
  application?: { profile?: { email: string | null } | null; vacancy?: { title: string | null } | null } | null;
};

const tabs = ["resumen", "modulos", "vacantes", "evaluaciones", "intentos"] as const;
type Tab = (typeof tabs)[number];

const tabLabels: Record<Tab, string> = {
  resumen: "Resumen",
  modulos: "Módulos",
  vacantes: "Vacantes",
  evaluaciones: "Evaluaciones",
  intentos: "Intentos",
};

const emptyVacancyForm = {
  id: "",
  module_id: "",
  title: "",
  schedule: "",
  location: "",
  description: "",
  requirements: "",
  status: "open" as "open" | "closed" | "draft",
};

const emptyQuestionForm = { id: "", prompt: "", optionsText: "", correct_option: "" };

const normalizeOptions = (raw: unknown): string[] => {
  if (Array.isArray(raw)) return raw.filter((value): value is string => typeof value === "string");

  if (typeof raw === "string") {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.filter((value): value is string => typeof value === "string");
    } catch {
      return [raw];
    }
  }

  if (raw && typeof raw === "object") return Object.values(raw).filter((value): value is string => typeof value === "string");
  return [];
};

const parseOptionsInput = (text: string): string[] => text.split(/[\n,]/).map((option) => option.trim()).filter(Boolean);

const getVacancyStatus = (status: Vacancy["status"] | string | null | undefined) => {
  if (status === "open") return { label: "Abierta", variant: "success" as const };
  if (status === "draft") return { label: "Borrador", variant: "warning" as const };
  return { label: "Cerrada", variant: "secondary" as const };
};

const getAttemptStatus = (status: string | null | undefined) => {
  const labels: Record<string, string> = {
    IN_PROGRESS: "En progreso",
    SUBMITTED: "Enviada",
    UNDER_REVIEW: "En revisión",
    COMPLETED: "Finalizada",
  };
  return labels[status ?? ""] ?? status ?? "Sin estado";
};

export default function AdminPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("resumen");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [modules, setModules] = useState<Module[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  const [vacancyFilter, setVacancyFilter] = useState("");
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>("");
  const [assessmentQuestions, setAssessmentQuestions] = useState<Question[]>([]);

  const [moduleForm, setModuleForm] = useState({ id: "", name: "", description: "" });
  const [vacancyForm, setVacancyForm] = useState(emptyVacancyForm);
  const [assessmentForm, setAssessmentForm] = useState({ id: "", vacancy_id: "", title: "", duration_minutes: "30" });
  const [questionForm, setQuestionForm] = useState(emptyQuestionForm);

  const openVacancies = vacancies.filter((vacancy) => vacancy.status === "open").length;
  const reviewAttempts = attempts.filter((attempt) => attempt.status === "UNDER_REVIEW" || attempt.status === "SUBMITTED").length;
  const completedAttempts = attempts.filter((attempt) => attempt.status === "COMPLETED").length;

  const callAdmin = async <T,>(path: string, init?: RequestInit): Promise<T> => {
    if (!token) throw new Error("Sin sesión");
    const response = await fetch(path, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        ...(init?.headers ?? {}),
      },
    });

    const json = (await response.json().catch(() => ({}))) as T & { error?: string };
    if (!response.ok) throw new Error(json.error ?? "Error inesperado");
    return json;
  };

  const safeCall = async (fn: () => Promise<void>, success?: string) => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await fn();
      if (success) setSuccessMessage(success);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Error inesperado");
    }
  };

  const loadModules = async () => {
    const result = await callAdmin<{ data: Module[] }>("/api/admin/modules");
    setModules(result.data);
  };

  const loadVacancies = async () => {
    const query = vacancyFilter ? `?module_id=${encodeURIComponent(vacancyFilter)}` : "";
    const result = await callAdmin<{ data: Vacancy[] }>(`/api/admin/vacancies${query}`);
    setVacancies(result.data);
  };

  const loadAssessments = async () => {
    const result = await callAdmin<{ data: Assessment[] }>("/api/admin/assessments");
    setAssessments(result.data);
  };

  const loadAssessmentDetail = async (assessmentId: string) => {
    if (!assessmentId) return;
    const result = await callAdmin<{ data: Question[] }>(`/api/admin/assessments/${assessmentId}/questions`);
    setAssessmentQuestions((result.data ?? []).map((question) => ({ ...question, options: normalizeOptions(question.options) })));
  };

  const loadAttempts = async () => {
    const result = await callAdmin<{ data: Attempt[] }>("/api/admin/attempts");
    setAttempts(result.data);
  };

  const refreshAll = async () => {
    await Promise.all([loadModules(), loadVacancies(), loadAssessments(), loadAttempts()]);
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/login");
        return;
      }

      const role = await getRoleForSession(supabase);
      if (role !== "admin") {
        router.replace("/panel");
        return;
      }

      setToken(data.session.access_token);
      setLoading(false);
    });
  }, [router, supabase]);

  useEffect(() => {
    if (!token) return;
    void safeCall(refreshAll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!token || !selectedAssessmentId) return;
    void safeCall(async () => {
      await loadAssessmentDetail(selectedAssessmentId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssessmentId, token]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <main className="uces-page flex items-center justify-center p-6">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 text-sm text-slate-600">Validando acceso administrativo...</CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="uces-page">
      <div className="uces-container space-y-6">
        <header className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-300/40">
          <div className="grid gap-6 p-6 md:grid-cols-[1.4fr_0.9fr] md:p-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 font-black">AD</div>
                <div>
                  <p className="text-sm font-semibold text-blue-200">UCES Plataforma de Talento</p>
                  <h1 className="text-3xl font-black tracking-tight">Panel administrativo</h1>
                </div>
                <Badge variant="warning">Acceso admin</Badge>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                Publica vacantes, configura evaluaciones, administra preguntas y revisa evidencias de candidatos desde un solo espacio.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="secondary">
                  <a href="/panel">Volver al panel</a>
                </Button>
                <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950" onClick={() => safeCall(refreshAll, "Información actualizada")}> 
                  <RefreshCw className="h-4 w-4" />
                  Actualizar
                </Button>
                <Button variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Salir
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-sm text-slate-300">Vacantes abiertas</p><p className="mt-1 text-3xl font-black">{openVacancies}</p></div>
              <div className="rounded-2xl bg-white/10 p-4"><p className="text-sm text-slate-300">Intentos por revisar</p><p className="mt-1 text-3xl font-black">{reviewAttempts}</p></div>
            </div>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2 rounded-2xl border border-white/70 bg-white/80 p-2 shadow-sm backdrop-blur">
          {tabs.map((tab) => (
            <Button key={tab} variant={activeTab === tab ? "default" : "ghost"} onClick={() => setActiveTab(tab)}>
              {tabLabels[tab]}
            </Button>
          ))}
        </nav>

        {errorMessage ? <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</div> : null}
        {successMessage ? <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">{successMessage}</div> : null}

        {activeTab === "resumen" && (
          <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card><CardContent className="flex items-center gap-4 p-5"><Building2 className="h-7 w-7 text-blue-700" /><div><p className="text-sm text-slate-500">Módulos</p><p className="text-3xl font-black">{modules.length}</p></div></CardContent></Card>
              <Card><CardContent className="flex items-center gap-4 p-5"><BriefcaseBusiness className="h-7 w-7 text-orange-700" /><div><p className="text-sm text-slate-500">Vacantes</p><p className="text-3xl font-black">{vacancies.length}</p></div></CardContent></Card>
              <Card><CardContent className="flex items-center gap-4 p-5"><ClipboardList className="h-7 w-7 text-emerald-700" /><div><p className="text-sm text-slate-500">Evaluaciones</p><p className="text-3xl font-black">{assessments.length}</p></div></CardContent></Card>
              <Card><CardContent className="flex items-center gap-4 p-5"><UsersRound className="h-7 w-7 text-violet-700" /><div><p className="text-sm text-slate-500">Intentos</p><p className="text-3xl font-black">{attempts.length}</p></div></CardContent></Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad reciente</CardTitle>
                  <CardDescription>Últimos intentos recibidos.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {attempts.slice(0, 5).map((attempt) => (
                    <div key={attempt.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-slate-950">{attempt.application?.vacancy?.title ?? "Vacante"}</p>
                        <p className="truncate text-xs text-slate-500">{attempt.application?.profile?.email ?? "Sin email"}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Badge variant="secondary">{getAttemptStatus(attempt.status)}</Badge>
                        <Button size="sm" variant="outline" onClick={() => router.push(`/admin/attempts/${attempt.id}`)}>Ver</Button>
                      </div>
                    </div>
                  ))}
                  {attempts.length === 0 ? <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-slate-600">Sin intentos registrados.</p> : null}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Acciones rápidas</CardTitle>
                  <CardDescription>Atajos para continuar configurando el sistema.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <Button variant="outline" className="justify-start" onClick={() => setActiveTab("modulos")}><Building2 className="h-4 w-4" />Crear o editar módulos</Button>
                  <Button variant="outline" className="justify-start" onClick={() => setActiveTab("vacantes")}><BriefcaseBusiness className="h-4 w-4" />Publicar vacantes</Button>
                  <Button variant="outline" className="justify-start" onClick={() => setActiveTab("evaluaciones")}><FileQuestion className="h-4 w-4" />Configurar preguntas</Button>
                  <Button variant="outline" className="justify-start" onClick={() => setActiveTab("intentos")}><ShieldCheck className="h-4 w-4" />Revisar candidatos</Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {activeTab === "modulos" && (
          <Card>
            <CardHeader>
              <CardTitle>Módulos</CardTitle>
              <CardDescription>Organiza las vacantes por áreas, departamentos o perfiles de contratación.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 md:grid-cols-[1fr_1.5fr_auto]">
                <input className="uces-input" placeholder="Nombre del módulo" value={moduleForm.name} onChange={(e) => setModuleForm((s) => ({ ...s, name: e.target.value }))} />
                <textarea className="uces-input min-h-11" placeholder="Descripción" value={moduleForm.description} onChange={(e) => setModuleForm((s) => ({ ...s, description: e.target.value }))} />
                <Button
                  onClick={() =>
                    safeCall(async () => {
                      const payload = { name: moduleForm.name, description: moduleForm.description || null };
                      if (moduleForm.id) await callAdmin(`/api/admin/modules/${moduleForm.id}`, { method: "PATCH", body: JSON.stringify(payload) });
                      else await callAdmin("/api/admin/modules", { method: "POST", body: JSON.stringify(payload) });
                      setModuleForm({ id: "", name: "", description: "" });
                      await loadModules();
                    }, moduleForm.id ? "Módulo actualizado" : "Módulo creado")
                  }
                >
                  <Plus className="h-4 w-4" />
                  Guardar
                </Button>
              </div>

              <div className="grid gap-3">
                {modules.map((module) => (
                  <div key={module.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold text-slate-950">{module.name}</p>
                      <p className="text-sm leading-6 text-slate-600">{module.description ?? "Sin descripción"}</p>
                    </div>
                    <Button variant="outline" onClick={() => setModuleForm({ id: module.id, name: module.name, description: module.description ?? "" })}>
                      <Pencil className="h-4 w-4" />
                      Editar
                    </Button>
                  </div>
                ))}
                {modules.length === 0 ? <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-slate-600">Aún no hay módulos creados.</p> : null}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "vacantes" && (
          <Card>
            <CardHeader>
              <CardTitle>Vacantes</CardTitle>
              <CardDescription>Crea convocatorias completas y genera su evaluación base automáticamente.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 md:grid-cols-2">
                <select className="uces-input" value={vacancyForm.module_id} onChange={(e) => setVacancyForm((s) => ({ ...s, module_id: e.target.value }))}>
                  <option value="">Sin módulo</option>
                  {modules.map((module) => <option key={module.id} value={module.id}>{module.name}</option>)}
                </select>
                <input className="uces-input" placeholder="Título de la vacante" value={vacancyForm.title} onChange={(e) => setVacancyForm((s) => ({ ...s, title: e.target.value }))} />
                <input className="uces-input" placeholder="Horario" value={vacancyForm.schedule} onChange={(e) => setVacancyForm((s) => ({ ...s, schedule: e.target.value }))} />
                <input className="uces-input" placeholder="Ubicación" value={vacancyForm.location} onChange={(e) => setVacancyForm((s) => ({ ...s, location: e.target.value }))} />
                <select className="uces-input" value={vacancyForm.status} onChange={(e) => setVacancyForm((s) => ({ ...s, status: e.target.value as Vacancy["status"] }))}>
                  <option value="open">Abierta</option>
                  <option value="closed">Cerrada</option>
                  <option value="draft">Borrador</option>
                </select>
                <div className="hidden md:block" />
                <textarea className="uces-input min-h-24 md:col-span-2" placeholder="Descripción" value={vacancyForm.description} onChange={(e) => setVacancyForm((s) => ({ ...s, description: e.target.value }))} />
                <textarea className="uces-input min-h-24 md:col-span-2" placeholder="Requisitos separados por coma o salto de línea" value={vacancyForm.requirements} onChange={(e) => setVacancyForm((s) => ({ ...s, requirements: e.target.value }))} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() =>
                    safeCall(async () => {
                      const payload = {
                        module_id: vacancyForm.module_id || null,
                        title: vacancyForm.title,
                        schedule: vacancyForm.schedule || null,
                        location: vacancyForm.location || null,
                        description: vacancyForm.description || null,
                        requirements: vacancyForm.requirements || null,
                        status: vacancyForm.status,
                      };
                      if (vacancyForm.id) await callAdmin(`/api/admin/vacancies/${vacancyForm.id}`, { method: "PATCH", body: JSON.stringify(payload) });
                      else await callAdmin("/api/admin/vacancies", { method: "POST", body: JSON.stringify(payload) });
                      setVacancyForm(emptyVacancyForm);
                      await Promise.all([loadVacancies(), loadAssessments()]);
                    }, vacancyForm.id ? "Vacante actualizada" : "Vacante creada")
                  }
                >
                  <Plus className="h-4 w-4" />
                  Guardar vacante
                </Button>
                {vacancyForm.id ? <Button variant="outline" onClick={() => setVacancyForm(emptyVacancyForm)}>Cancelar edición</Button> : null}
              </div>

              <div className="flex flex-col gap-2 rounded-2xl bg-slate-50 p-3 sm:flex-row sm:items-center">
                <Search className="h-4 w-4 text-slate-400" />
                <select className="uces-input bg-white sm:max-w-xs" value={vacancyFilter} onChange={(e) => setVacancyFilter(e.target.value)}>
                  <option value="">Todos los módulos</option>
                  {modules.map((module) => <option key={module.id} value={module.id}>{module.name}</option>)}
                </select>
                <Button variant="outline" onClick={() => safeCall(loadVacancies, "Filtro aplicado")}>Filtrar</Button>
              </div>

              <div className="grid gap-3">
                {vacancies.map((vacancy) => {
                  const status = getVacancyStatus(vacancy.status);
                  return (
                    <div key={vacancy.id} className="rounded-2xl border border-slate-100 bg-white p-4">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-slate-950">{vacancy.title}</p>
                            <Badge variant={status.variant}>{status.label}</Badge>
                          </div>
                          <p className="text-sm text-slate-600">{vacancy.modules?.name ?? "Sin módulo"}</p>
                          <p className="text-xs text-slate-500">{vacancy.schedule ?? "Sin horario"} · {vacancy.location ?? "Sin ubicación"}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" onClick={() => setVacancyForm({ id: vacancy.id, module_id: vacancy.module_id ?? "", title: vacancy.title, schedule: vacancy.schedule ?? "", location: vacancy.location ?? "", description: vacancy.description ?? "", requirements: vacancy.requirements ?? "", status: vacancy.status ?? "open" })}><Pencil className="h-4 w-4" />Editar</Button>
                          <Button variant="outline" onClick={() => safeCall(async () => { await callAdmin(`/api/admin/vacancies/${vacancy.id}`, { method: "PATCH", body: JSON.stringify({ ...vacancy, status: "closed" }) }); await loadVacancies(); }, "Vacante cerrada")}>Cerrar</Button>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              safeCall(async () => {
                                const result = await callAdmin<{ data: Assessment | null }>(`/api/admin/vacancies/${vacancy.id}/assessment`);
                                let assessment = result.data;
                                if (!assessment) {
                                  const created = await callAdmin<{ data: Assessment }>(`/api/admin/vacancies/${vacancy.id}/assessment`, { method: "POST" });
                                  assessment = created.data;
                                  await loadAssessments();
                                }
                                if (assessment) {
                                  setSelectedAssessmentId(assessment.id);
                                  setAssessmentForm({ id: assessment.id, vacancy_id: assessment.vacancy_id ?? vacancy.id, title: assessment.title ?? `Evaluación - ${vacancy.title}`, duration_minutes: String(assessment.duration_minutes ?? 30) });
                                  setActiveTab("evaluaciones");
                                }
                              })
                            }
                          >
                            Evaluación <ArrowRight className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" onClick={() => safeCall(async () => { if (!confirm("¿Eliminar esta vacante?")) return; await callAdmin(`/api/admin/vacancies/${vacancy.id}`, { method: "DELETE" }); await Promise.all([loadVacancies(), loadAssessments()]); }, "Vacante eliminada")}><Trash2 className="h-4 w-4" />Eliminar</Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {vacancies.length === 0 ? <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-slate-600">No hay vacantes para mostrar.</p> : null}
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "evaluaciones" && (
          <Card>
            <CardHeader>
              <CardTitle>Evaluaciones</CardTitle>
              <CardDescription>Edita duración, preguntas y respuestas correctas por vacante.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3 md:grid-cols-[1fr_220px_auto]">
                <input className="uces-input" placeholder="Título" value={assessmentForm.title} onChange={(e) => setAssessmentForm((s) => ({ ...s, title: e.target.value }))} />
                <input className="uces-input" placeholder="Duración" value={assessmentForm.duration_minutes} onChange={(e) => setAssessmentForm((s) => ({ ...s, duration_minutes: e.target.value }))} />
                <Button
                  disabled={!assessmentForm.id}
                  onClick={() =>
                    safeCall(async () => {
                      if (!assessmentForm.id) return;
                      await callAdmin(`/api/admin/assessments/${assessmentForm.id}`, { method: "PATCH", body: JSON.stringify({ title: assessmentForm.title || null, duration_minutes: Number(assessmentForm.duration_minutes) || 30 }) });
                      await loadAssessments();
                    }, "Evaluación actualizada")
                  }
                >
                  Guardar
                </Button>
              </div>

              <div className="grid gap-3 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="space-y-3">
                  {assessments.map((assessment) => (
                    <div key={assessment.id} className={`rounded-2xl border p-4 ${selectedAssessmentId === assessment.id ? "border-blue-200 bg-blue-50" : "border-slate-100 bg-white"}`}>
                      <p className="font-bold text-slate-950">{assessment.title ?? "Sin título"}</p>
                      <p className="text-sm text-slate-600">Vacante: {assessment.vacancies?.title ?? "Sin vacante"}</p>
                      <p className="text-xs text-slate-500">Duración: {assessment.duration_minutes ?? 30} min</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => { setSelectedAssessmentId(assessment.id); setAssessmentForm({ id: assessment.id, vacancy_id: assessment.vacancy_id ?? "", title: assessment.title ?? "", duration_minutes: String(assessment.duration_minutes ?? 30) }); }}><Pencil className="h-4 w-4" />Editar</Button>
                        <Button size="sm" variant="destructive" onClick={() => safeCall(async () => { if (!confirm("¿Eliminar esta evaluación?")) return; await callAdmin(`/api/admin/assessments/${assessment.id}`, { method: "DELETE" }); if (selectedAssessmentId === assessment.id) { setSelectedAssessmentId(""); setAssessmentQuestions([]); } await loadAssessments(); }, "Evaluación eliminada")}><Trash2 className="h-4 w-4" />Eliminar</Button>
                      </div>
                    </div>
                  ))}
                  {assessments.length === 0 ? <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-slate-600">Sin evaluaciones creadas.</p> : null}
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-950">Preguntas</p>
                      <p className="text-sm text-slate-600">{assessmentQuestions.length} preguntas configuradas</p>
                    </div>
                    <Badge variant={selectedAssessmentId ? "info" : "secondary"}>{selectedAssessmentId ? "Evaluación seleccionada" : "Selecciona evaluación"}</Badge>
                  </div>

                  <div className="grid gap-3">
                    <textarea className="uces-input min-h-24" placeholder="Texto de la pregunta" value={questionForm.prompt} onChange={(e) => setQuestionForm((s) => ({ ...s, prompt: e.target.value }))} />
                    <textarea className="uces-input min-h-20" placeholder="Opciones separadas por coma o salto de línea" value={questionForm.optionsText} onChange={(e) => setQuestionForm((s) => ({ ...s, optionsText: e.target.value }))} />
                    <input className="uces-input" placeholder="Opción correcta" value={questionForm.correct_option} onChange={(e) => setQuestionForm((s) => ({ ...s, correct_option: e.target.value }))} />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        disabled={!selectedAssessmentId}
                        onClick={() =>
                          safeCall(async () => {
                            if (!selectedAssessmentId) return;
                            const payload = { prompt: questionForm.prompt, options: parseOptionsInput(questionForm.optionsText), correct_option: questionForm.correct_option || null };
                            if (questionForm.id) await callAdmin(`/api/admin/questions/${questionForm.id}`, { method: "PATCH", body: JSON.stringify(payload) });
                            else await callAdmin(`/api/admin/assessments/${selectedAssessmentId}/questions`, { method: "POST", body: JSON.stringify(payload) });
                            setQuestionForm(emptyQuestionForm);
                            await loadAssessmentDetail(selectedAssessmentId);
                          }, questionForm.id ? "Pregunta actualizada" : "Pregunta creada")
                        }
                      >
                        <Plus className="h-4 w-4" />
                        Guardar pregunta
                      </Button>
                      {questionForm.id ? <Button variant="outline" onClick={() => setQuestionForm(emptyQuestionForm)}>Cancelar edición</Button> : null}
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {assessmentQuestions.map((question, index) => (
                      <div key={question.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <p className="font-semibold text-slate-950">{index + 1}. {question.prompt}</p>
                            <p className="mt-1 text-xs text-slate-500">Opciones: {normalizeOptions(question.options).join(" · ")}</p>
                            <p className="text-xs font-semibold text-blue-700">Correcta: {question.correct_option ?? "Sin definir"}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setQuestionForm({ id: question.id, prompt: question.prompt, optionsText: normalizeOptions(question.options).join(", "), correct_option: question.correct_option ?? "" })}>Editar</Button>
                            <Button size="sm" variant="destructive" onClick={() => safeCall(async () => { if (!selectedAssessmentId) return; await callAdmin(`/api/admin/questions/${question.id}`, { method: "DELETE" }); await loadAssessmentDetail(selectedAssessmentId); }, "Pregunta eliminada")}>Eliminar</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {selectedAssessmentId && assessmentQuestions.length === 0 ? <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-slate-600">Esta evaluación aún no tiene preguntas.</p> : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "intentos" && (
          <Card>
            <CardHeader>
              <CardTitle>Intentos y postulaciones</CardTitle>
              <CardDescription>Revisa respuestas, evidencias, puntajes y toma decisiones finales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Por revisar</p><p className="text-2xl font-black">{reviewAttempts}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Finalizados</p><p className="text-2xl font-black">{completedAttempts}</p></div>
                <div className="rounded-2xl bg-slate-50 p-4"><p className="text-sm text-slate-500">Total</p><p className="text-2xl font-black">{attempts.length}</p></div>
              </div>

              {attempts.map((attempt) => (
                <div key={attempt.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-950">{attempt.application?.vacancy?.title ?? "Vacante"}</p>
                    <p className="truncate text-sm text-slate-600">{attempt.application?.profile?.email ?? "Sin email"}</p>
                    {typeof attempt.theory_score === "number" ? <p className="text-xs text-slate-500">Puntaje: {attempt.theory_score}</p> : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{getAttemptStatus(attempt.status)}</Badge>
                    <Button variant="outline" onClick={() => router.push(`/admin/attempts/${attempt.id}`)}>
                      Ver revisión
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {attempts.length === 0 ? <p className="rounded-2xl border border-dashed p-6 text-center text-sm text-slate-600">No hay intentos registrados.</p> : null}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
