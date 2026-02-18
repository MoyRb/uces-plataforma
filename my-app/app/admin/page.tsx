"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
type Attempt = { id: string; status: string | null; application?: { profile?: { email: string | null } | null; vacancy?: { title: string | null } | null } | null };

const tabs = ["modulos", "vacantes", "evaluaciones", "intentos"] as const;
type Tab = (typeof tabs)[number];

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
  if (Array.isArray(raw)) {
    return raw.filter((value): value is string => typeof value === "string");
  }

  if (typeof raw === "string") {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((value): value is string => typeof value === "string");
      }
    } catch {
      // fall through and use raw string
    }
    return [raw];
  }

  if (raw && typeof raw === "object") {
    return Object.values(raw).filter((value): value is string => typeof value === "string");
  }

  return [];
};

const parseOptionsInput = (text: string): string[] => text.split(/[\n,]/).map((option) => option.trim()).filter(Boolean);

export default function AdminPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("vacantes");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    if (!response.ok) {
      throw new Error(json.error ?? "Error inesperado");
    }
    return json;
  };

  const safeCall = async (fn: () => Promise<void>) => {
    setErrorMessage("");
    try {
      await fn();
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
    safeCall(async () => {
      await Promise.all([loadModules(), loadVacancies(), loadAssessments(), loadAttempts()]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!token || !selectedAssessmentId) return;
    safeCall(async () => {
      await loadAssessmentDetail(selectedAssessmentId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssessmentId, token]);

  if (loading) return <main className="p-6">Cargando…</main>;

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Administración</h1>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button key={tab} variant={activeTab === tab ? "default" : "outline"} onClick={() => setActiveTab(tab)}>
                {tab}
              </Button>
            ))}
          </div>
        </header>

        {errorMessage ? <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">{errorMessage}</div> : null}

        {activeTab === "modulos" && (
          <Card>
            <CardHeader>
              <CardTitle>Módulos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 md:grid-cols-2">
                <input className="rounded border p-2" placeholder="Nombre" value={moduleForm.name} onChange={(e) => setModuleForm((s) => ({ ...s, name: e.target.value }))} />
                <textarea className="rounded border p-2" placeholder="Descripción" value={moduleForm.description} onChange={(e) => setModuleForm((s) => ({ ...s, description: e.target.value }))} />
              </div>
              <Button
                onClick={() =>
                  safeCall(async () => {
                    const payload = { name: moduleForm.name, description: moduleForm.description || null };
                    if (moduleForm.id) await callAdmin(`/api/admin/modules/${moduleForm.id}`, { method: "PATCH", body: JSON.stringify(payload) });
                    else await callAdmin("/api/admin/modules", { method: "POST", body: JSON.stringify(payload) });
                    setModuleForm({ id: "", name: "", description: "" });
                    await loadModules();
                  })
                }
              >
                Guardar módulo
              </Button>
              {modules.map((module) => (
                <div key={module.id} className="flex items-center justify-between rounded border bg-white p-3">
                  <div>
                    <p className="font-medium">{module.name}</p>
                    <p className="text-sm text-slate-600">{module.description ?? "Sin descripción"}</p>
                  </div>
                  <Button variant="outline" onClick={() => setModuleForm({ id: module.id, name: module.name, description: module.description ?? "" })}>
                    Editar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === "vacantes" && (
          <Card>
            <CardHeader>
              <CardTitle>Vacantes</CardTitle>
              <CardDescription>Formulario completo + gestión de evaluación y preguntas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2 md:grid-cols-2">
                <select className="rounded border p-2" value={vacancyForm.module_id} onChange={(e) => setVacancyForm((s) => ({ ...s, module_id: e.target.value }))}>
                  <option value="">Sin módulo</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  ))}
                </select>
                <input className="rounded border p-2" placeholder="Título (requerido)" value={vacancyForm.title} onChange={(e) => setVacancyForm((s) => ({ ...s, title: e.target.value }))} />
                <input className="rounded border p-2" placeholder="Horario" value={vacancyForm.schedule} onChange={(e) => setVacancyForm((s) => ({ ...s, schedule: e.target.value }))} />
                <input className="rounded border p-2" placeholder="Ubicación" value={vacancyForm.location} onChange={(e) => setVacancyForm((s) => ({ ...s, location: e.target.value }))} />
                <select className="rounded border p-2" value={vacancyForm.status} onChange={(e) => setVacancyForm((s) => ({ ...s, status: e.target.value as Vacancy["status"] }))}>
                  <option value="open">open</option>
                  <option value="closed">closed</option>
                  <option value="draft">draft</option>
                </select>
                <textarea className="rounded border p-2 md:col-span-2" placeholder="Descripción" value={vacancyForm.description} onChange={(e) => setVacancyForm((s) => ({ ...s, description: e.target.value }))} />
                <textarea className="rounded border p-2 md:col-span-2" placeholder="Requisitos" value={vacancyForm.requirements} onChange={(e) => setVacancyForm((s) => ({ ...s, requirements: e.target.value }))} />
              </div>
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
                  })
                }
              >
                Guardar vacante
              </Button>

              <div className="flex items-center gap-2">
                <select className="rounded border p-2" value={vacancyFilter} onChange={(e) => setVacancyFilter(e.target.value)}>
                  <option value="">Todos los módulos</option>
                  {modules.map((module) => (
                    <option key={module.id} value={module.id}>
                      {module.name}
                    </option>
                  ))}
                </select>
                <Button variant="outline" onClick={() => safeCall(loadVacancies)}>
                  Filtrar
                </Button>
              </div>

              {vacancies.map((vacancy) => (
                <div key={vacancy.id} className="space-y-2 rounded border bg-white p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{vacancy.title}</p>
                      <p className="text-sm text-slate-600">{vacancy.modules?.name ?? "Sin módulo"}</p>
                      <p className="text-xs text-slate-500">{vacancy.schedule ?? "Sin horario"} · {vacancy.location ?? "Sin ubicación"}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{vacancy.status}</Badge>
                      <Button variant="outline" onClick={() => setVacancyForm({ id: vacancy.id, module_id: vacancy.module_id ?? "", title: vacancy.title, schedule: vacancy.schedule ?? "", location: vacancy.location ?? "", description: vacancy.description ?? "", requirements: vacancy.requirements ?? "", status: vacancy.status ?? "open" })}>Editar</Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          safeCall(async () => {
                            await callAdmin(`/api/admin/vacancies/${vacancy.id}`, { method: "PATCH", body: JSON.stringify({ ...vacancy, status: "closed" }) });
                            await loadVacancies();
                          })
                        }
                      >
                        Cerrar vacante
                      </Button>
                      <Button
                        variant="outline"
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
                              setAssessmentForm({
                                id: assessment.id,
                                vacancy_id: assessment.vacancy_id ?? vacancy.id,
                                title: assessment.title ?? `Evaluación - ${vacancy.title}`,
                                duration_minutes: String(assessment.duration_minutes ?? 30),
                              });
                              setActiveTab("evaluaciones");
                            }
                          })
                        }
                      >
                        Ver/Editar evaluación
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          safeCall(async () => {
                            await callAdmin(`/api/admin/vacancies/${vacancy.id}`, { method: "DELETE" });
                            await Promise.all([loadVacancies(), loadAssessments()]);
                          })
                        }
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === "evaluaciones" && (
          <Card>
            <CardHeader>
              <CardTitle>Evaluaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 md:grid-cols-2">
                <input className="rounded border p-2" placeholder="Título" value={assessmentForm.title} onChange={(e) => setAssessmentForm((s) => ({ ...s, title: e.target.value }))} />
                <input className="rounded border p-2" placeholder="Duración (minutos)" value={assessmentForm.duration_minutes} onChange={(e) => setAssessmentForm((s) => ({ ...s, duration_minutes: e.target.value }))} />
              </div>
              <Button
                disabled={!assessmentForm.id}
                onClick={() =>
                  safeCall(async () => {
                    if (!assessmentForm.id) return;
                    await callAdmin(`/api/admin/assessments/${assessmentForm.id}`, {
                      method: "PATCH",
                      body: JSON.stringify({ title: assessmentForm.title || null, duration_minutes: Number(assessmentForm.duration_minutes) || 30 }),
                    });
                    await loadAssessments();
                  })
                }
              >
                Guardar evaluación
              </Button>

              <div className="space-y-2">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between rounded border bg-white p-3">
                    <div>
                      <p className="font-medium">{assessment.title ?? "Sin título"}</p>
                      <p className="text-sm text-slate-600">Vacante: {assessment.vacancies?.title ?? "Sin vacante"}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedAssessmentId(assessment.id);
                          setAssessmentForm({
                            id: assessment.id,
                            vacancy_id: assessment.vacancy_id ?? "",
                            title: assessment.title ?? "",
                            duration_minutes: String(assessment.duration_minutes ?? 30),
                          });
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          safeCall(async () => {
                            await callAdmin(`/api/admin/assessments/${assessment.id}`, { method: "DELETE" });
                            if (selectedAssessmentId === assessment.id) {
                              setSelectedAssessmentId("");
                              setAssessmentQuestions([]);
                            }
                            await loadAssessments();
                          })
                        }
                      >
                        Eliminar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded border bg-white p-3">
                <p className="mb-2 font-medium">Preguntas ({assessmentQuestions.length})</p>
                <div className="grid gap-2">
                  <textarea className="rounded border p-2" placeholder="Pregunta" value={questionForm.prompt} onChange={(e) => setQuestionForm((s) => ({ ...s, prompt: e.target.value }))} />
                  <textarea
                    className="rounded border p-2"
                    placeholder="Opciones (separadas por coma)"
                    value={questionForm.optionsText}
                    onChange={(e) => setQuestionForm((s) => ({ ...s, optionsText: e.target.value }))}
                  />
                  <input className="rounded border p-2" placeholder="Opción correcta" value={questionForm.correct_option} onChange={(e) => setQuestionForm((s) => ({ ...s, correct_option: e.target.value }))} />
                </div>
                <div className="mt-2 flex gap-2">
                  <Button
                    disabled={!selectedAssessmentId}
                    onClick={() =>
                      safeCall(async () => {
                        if (!selectedAssessmentId) return;
                        const payload = {
                          prompt: questionForm.prompt,
                          options: parseOptionsInput(questionForm.optionsText),
                          correct_option: questionForm.correct_option || null,
                        };
                        if (questionForm.id) await callAdmin(`/api/admin/questions/${questionForm.id}`, { method: "PATCH", body: JSON.stringify(payload) });
                        else await callAdmin(`/api/admin/assessments/${selectedAssessmentId}/questions`, { method: "POST", body: JSON.stringify(payload) });
                        setQuestionForm(emptyQuestionForm);
                        await loadAssessmentDetail(selectedAssessmentId);
                      })
                    }
                  >
                    Guardar pregunta
                  </Button>
                </div>

                <div className="mt-3 space-y-2">
                  {assessmentQuestions.map((question) => (
                    <div key={question.id} className="flex items-center justify-between rounded border p-2">
                      <div>
                        <p className="text-sm font-medium">{question.prompt}</p>
                        <p className="text-xs text-slate-500">Opciones: {normalizeOptions(question.options).join(", ")}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            setQuestionForm({
                              id: question.id,
                              prompt: question.prompt,
                              optionsText: normalizeOptions(question.options).join(", "),
                              correct_option: question.correct_option ?? "",
                            })
                          }
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() =>
                            safeCall(async () => {
                              await callAdmin(`/api/admin/questions/${question.id}`, { method: "DELETE" });
                              await loadAssessmentDetail(selectedAssessmentId);
                            })
                          }
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "intentos" && (
          <Card>
            <CardHeader>
              <CardTitle>Intentos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {attempts.map((attempt) => (
                <div key={attempt.id} className="flex items-center justify-between rounded border bg-white p-3">
                  <div>
                    <p className="font-medium">{attempt.application?.vacancy?.title ?? "Vacante"}</p>
                    <p className="text-xs text-slate-600">{attempt.application?.profile?.email ?? "Sin email"}</p>
                  </div>
                  <Badge variant="secondary">{attempt.status ?? "-"}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
