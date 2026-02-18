"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRoleForSession } from "@/lib/auth";
import { supabaseBrowser } from "@/lib/supabaseClient";

type Module = { id: string; name: string; description: string | null; is_active?: boolean; sort_order?: number | null };
type Vacancy = { id: string; module_id: string | null; title: string; description: string | null; is_active?: boolean; deadline?: string | null; modules?: { name: string | null } | null };
type Assessment = { id: string; vacancy_id: string | null; title: string | null; duration_minutes: number | null; vacancies?: { title: string | null } | null };
type Question = { id: string; prompt: string; options: Record<string, string | number | boolean>; correct_option: string | null };
type Attempt = { id: string; status: string | null; started_at: string | null; submitted_at: string | null; theory_score: number | null; application?: { user_id: string; vacancy_id: string; vacancy?: { title: string | null } | null; profile?: { name: string | null; email: string | null } | null } | null };

const tabs = ["modulos", "vacantes", "evaluaciones", "intentos"] as const;
type Tab = (typeof tabs)[number];

export default function AdminPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("modulos");

  const [modules, setModules] = useState<Module[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string>("");
  const [assessmentQuestions, setAssessmentQuestions] = useState<Question[]>([]);
  const [vacancyFilter, setVacancyFilter] = useState<string>("");
  const [selectedAttemptId, setSelectedAttemptId] = useState<string>("");
  const [attemptDetail, setAttemptDetail] = useState<Record<string, unknown> | null>(null);

  const [moduleSearch, setModuleSearch] = useState("");

  const [moduleForm, setModuleForm] = useState({ id: "", name: "", description: "", is_active: true, sort_order: "" });
  const [vacancyForm, setVacancyForm] = useState({ id: "", module_id: "", title: "", description: "", is_active: true, deadline: "" });
  const [assessmentForm, setAssessmentForm] = useState({ id: "", vacancy_id: "", title: "", duration_minutes: "30" });
  const [questionForm, setQuestionForm] = useState({ id: "", prompt: "", type: "multiple_choice", optionA: "", optionB: "", optionC: "", optionD: "", correct_option: "A" });
  const [reviewForm, setReviewForm] = useState({ score_final: "", review_notes: "", status: "reviewed" });

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

    const json = (await response.json()) as T & { error?: string };
    if (!response.ok) {
      throw new Error(json.error ?? "Error inesperado");
    }
    return json;
  };

  const loadModules = async () => {
    const query = moduleSearch.trim() ? `?search=${encodeURIComponent(moduleSearch.trim())}` : "";
    const result = await callAdmin<{ data: Module[] }>(`/api/admin/modules${query}`);
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

  const loadAttempts = async () => {
    const result = await callAdmin<{ data: Attempt[] }>("/api/admin/attempts");
    setAttempts(result.data);
  };

  const loadAssessmentDetail = async (assessmentId: string) => {
    if (!assessmentId) return;
    const result = await callAdmin<{ data: { questions: Question[] } }>(`/api/admin/assessments/${assessmentId}`);
    setAssessmentQuestions(result.data.questions ?? []);
  };

  const loadAttemptDetail = async (attemptId: string) => {
    if (!attemptId) return;
    const result = await callAdmin<{ data: Record<string, unknown> }>(`/api/admin/attempts/${attemptId}`);
    setAttemptDetail(result.data);
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
    Promise.all([loadModules(), loadVacancies(), loadAssessments(), loadAttempts()]).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!token) return;
    loadAssessmentDetail(selectedAssessmentId).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAssessmentId]);

  useEffect(() => {
    if (!token) return;
    loadAttemptDetail(selectedAttemptId).catch(() => undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttemptId]);

  if (loading) return <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">Validando permisos...</main>;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[240px_1fr]">
        <Card className="h-fit border-slate-100 shadow-sm">
          <CardHeader><CardTitle>Admin</CardTitle><CardDescription>Operaciones administrativas</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {tabs.map((tab) => (
              <Button key={tab} className="w-full justify-start" variant={activeTab === tab ? "default" : "outline"} onClick={() => setActiveTab(tab)}>
                {tab[0].toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </CardContent>
        </Card>

        <section className="space-y-4">
          {activeTab === "modulos" && (
            <Card className="border-slate-100 shadow-sm">
              <CardHeader><CardTitle>Módulos</CardTitle><CardDescription>CRUD + búsqueda</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2"><input className="w-full rounded border p-2" value={moduleSearch} onChange={(e) => setModuleSearch(e.target.value)} placeholder="Buscar por nombre" /><Button onClick={() => loadModules()}>Buscar</Button></div>
                <div className="grid gap-2 md:grid-cols-2">
                  <input className="rounded border p-2" placeholder="Nombre" value={moduleForm.name} onChange={(e) => setModuleForm((s) => ({ ...s, name: e.target.value }))} />
                  <input className="rounded border p-2" placeholder="Sort order (opcional)" value={moduleForm.sort_order} onChange={(e) => setModuleForm((s) => ({ ...s, sort_order: e.target.value }))} />
                  <textarea className="rounded border p-2 md:col-span-2" placeholder="Descripción" value={moduleForm.description} onChange={(e) => setModuleForm((s) => ({ ...s, description: e.target.value }))} />
                </div>
                <div className="flex gap-2">
                  <Button onClick={async () => { const payload = { name: moduleForm.name, description: moduleForm.description, is_active: moduleForm.is_active, sort_order: moduleForm.sort_order || null }; if (moduleForm.id) await callAdmin(`/api/admin/modules/${moduleForm.id}`, { method: "PATCH", body: JSON.stringify(payload) }); else await callAdmin("/api/admin/modules", { method: "POST", body: JSON.stringify(payload) }); setModuleForm({ id: "", name: "", description: "", is_active: true, sort_order: "" }); await loadModules(); }}>Guardar módulo</Button>
                </div>
                <div className="space-y-2">{modules.map((m) => <div key={m.id} className="flex items-center justify-between rounded border bg-white p-3"><div><p className="font-medium">{m.name}</p><p className="text-sm text-slate-600">{m.description}</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => setModuleForm({ id: m.id, name: m.name, description: m.description ?? "", is_active: m.is_active ?? true, sort_order: m.sort_order?.toString() ?? "" })}>Editar</Button><Button variant="outline" onClick={async () => { await callAdmin(`/api/admin/modules/${m.id}`, { method: "DELETE" }); await loadModules(); }}>Eliminar</Button></div></div>)}</div>
              </CardContent>
            </Card>
          )}

          {activeTab === "vacantes" && (
            <Card className="border-slate-100 shadow-sm">
              <CardHeader><CardTitle>Vacantes</CardTitle><CardDescription>CRUD por módulo + stats</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <select className="rounded border p-2" value={vacancyFilter} onChange={(e) => setVacancyFilter(e.target.value)}>
                    <option value="">Filtrar por módulo (todos)</option>
                    {modules.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                  <Button variant="outline" onClick={() => loadVacancies()}>Aplicar filtro</Button>
                </div>
                <div className="grid gap-2 md:grid-cols-2"><select className="rounded border p-2" value={vacancyForm.module_id} onChange={(e) => setVacancyForm((s) => ({ ...s, module_id: e.target.value }))}><option value="">Selecciona módulo</option>{modules.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}</select><input className="rounded border p-2" placeholder="Título" value={vacancyForm.title} onChange={(e) => setVacancyForm((s) => ({ ...s, title: e.target.value }))} /><input className="rounded border p-2" placeholder="Deadline (opcional)" value={vacancyForm.deadline} onChange={(e) => setVacancyForm((s) => ({ ...s, deadline: e.target.value }))} /><textarea className="rounded border p-2 md:col-span-2" placeholder="Descripción" value={vacancyForm.description} onChange={(e) => setVacancyForm((s) => ({ ...s, description: e.target.value }))} /></div>
                <Button onClick={async () => { const payload = { module_id: vacancyForm.module_id, title: vacancyForm.title, description: vacancyForm.description, is_active: vacancyForm.is_active, deadline: vacancyForm.deadline || null }; if (vacancyForm.id) await callAdmin(`/api/admin/vacancies/${vacancyForm.id}`, { method: "PATCH", body: JSON.stringify(payload) }); else await callAdmin("/api/admin/vacancies", { method: "POST", body: JSON.stringify(payload) }); setVacancyForm({ id: "", module_id: "", title: "", description: "", is_active: true, deadline: "" }); await loadVacancies(); }}>Guardar vacante</Button>
                <div className="space-y-2">{vacancies.map((v) => <div key={v.id} className="rounded border bg-white p-3"><div className="flex items-center justify-between"><div><p className="font-medium">{v.title}</p><p className="text-sm text-slate-600">{v.modules?.name ?? "Sin módulo"}</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => setVacancyForm({ id: v.id, module_id: v.module_id ?? "", title: v.title, description: v.description ?? "", is_active: v.is_active ?? true, deadline: v.deadline ?? "" })}>Editar</Button><Button variant="outline" onClick={async () => { await callAdmin(`/api/admin/vacancies/${v.id}`, { method: "DELETE" }); await loadVacancies(); }}>Eliminar</Button></div></div><Button className="mt-2" variant="outline" onClick={async () => { const stats = await callAdmin<{ data: { applicationsCount: number; attemptsCount: number } }>(`/api/admin/vacancies/${v.id}/stats`); alert(`Postulaciones: ${stats.data.applicationsCount} | Intentos: ${stats.data.attemptsCount}`); }}>Ver estadísticas</Button></div>)}</div>
              </CardContent>
            </Card>
          )}

          {activeTab === "evaluaciones" && (
            <Card className="border-slate-100 shadow-sm">
              <CardHeader><CardTitle>Evaluaciones y preguntas</CardTitle><CardDescription>Crear evaluación por vacante y preguntas</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 md:grid-cols-3"><select className="rounded border p-2" value={assessmentForm.vacancy_id} onChange={(e) => setAssessmentForm((s) => ({ ...s, vacancy_id: e.target.value }))}><option value="">Vacante</option>{vacancies.map((v) => <option key={v.id} value={v.id}>{v.title}</option>)}</select><input className="rounded border p-2" placeholder="Título" value={assessmentForm.title} onChange={(e) => setAssessmentForm((s) => ({ ...s, title: e.target.value }))} /><input className="rounded border p-2" placeholder="Duración (min)" value={assessmentForm.duration_minutes} onChange={(e) => setAssessmentForm((s) => ({ ...s, duration_minutes: e.target.value }))} /></div>
                <Button onClick={async () => { const payload = { vacancy_id: assessmentForm.vacancy_id, title: assessmentForm.title, duration_minutes: Number(assessmentForm.duration_minutes) || 30 }; if (assessmentForm.id) await callAdmin(`/api/admin/assessments/${assessmentForm.id}`, { method: "PATCH", body: JSON.stringify(payload) }); else await callAdmin("/api/admin/assessments", { method: "POST", body: JSON.stringify(payload) }); setAssessmentForm({ id: "", vacancy_id: "", title: "", duration_minutes: "30" }); await loadAssessments(); }}>Guardar evaluación</Button>
                <div className="space-y-2">{assessments.map((a) => <div key={a.id} className="flex items-center justify-between rounded border bg-white p-3"><div><p className="font-medium">{a.title ?? "Sin título"}</p><p className="text-sm text-slate-600">Vacante: {a.vacancies?.title}</p></div><div className="flex gap-2"><Button variant="outline" onClick={() => { setSelectedAssessmentId(a.id); setAssessmentForm({ id: a.id, vacancy_id: a.vacancy_id ?? "", title: a.title ?? "", duration_minutes: String(a.duration_minutes ?? 30) }); }}>Editar</Button><Button variant="outline" onClick={async () => { await callAdmin(`/api/admin/assessments/${a.id}`, { method: "DELETE" }); if (selectedAssessmentId === a.id) setSelectedAssessmentId(""); await loadAssessments(); }}>Eliminar</Button></div></div>)}</div>
                <div className="rounded border bg-white p-3"><p className="mb-2 font-medium">Preguntas ({assessmentQuestions.length})</p><div className="grid gap-2 md:grid-cols-2"><select className="rounded border p-2" value={questionForm.type} onChange={(e) => setQuestionForm((s) => ({ ...s, type: e.target.value }))}><option value="multiple_choice">multiple_choice</option><option value="open_text">open_text</option></select><input className="rounded border p-2" placeholder="Respuesta correcta (A/B/C/D)" value={questionForm.correct_option} onChange={(e) => setQuestionForm((s) => ({ ...s, correct_option: e.target.value }))} /><textarea className="rounded border p-2 md:col-span-2" placeholder="Pregunta" value={questionForm.prompt} onChange={(e) => setQuestionForm((s) => ({ ...s, prompt: e.target.value }))} />{questionForm.type === "multiple_choice" ? <><input className="rounded border p-2" placeholder="Opción A" value={questionForm.optionA} onChange={(e) => setQuestionForm((s) => ({ ...s, optionA: e.target.value }))} /><input className="rounded border p-2" placeholder="Opción B" value={questionForm.optionB} onChange={(e) => setQuestionForm((s) => ({ ...s, optionB: e.target.value }))} /><input className="rounded border p-2" placeholder="Opción C" value={questionForm.optionC} onChange={(e) => setQuestionForm((s) => ({ ...s, optionC: e.target.value }))} /><input className="rounded border p-2" placeholder="Opción D" value={questionForm.optionD} onChange={(e) => setQuestionForm((s) => ({ ...s, optionD: e.target.value }))} /></> : null}</div><div className="mt-2 flex gap-2"><Button disabled={!selectedAssessmentId} onClick={async () => { if (!selectedAssessmentId) return; const payload = { prompt: questionForm.prompt, type: questionForm.type, options: { A: questionForm.optionA, B: questionForm.optionB, C: questionForm.optionC, D: questionForm.optionD }, correct_option: questionForm.correct_option }; if (questionForm.id) await callAdmin(`/api/admin/questions/${questionForm.id}`, { method: "PATCH", body: JSON.stringify(payload) }); else await callAdmin(`/api/admin/assessments/${selectedAssessmentId}/questions`, { method: "POST", body: JSON.stringify(payload) }); setQuestionForm({ id: "", prompt: "", type: "multiple_choice", optionA: "", optionB: "", optionC: "", optionD: "", correct_option: "A" }); await loadAssessmentDetail(selectedAssessmentId); }}>Guardar pregunta</Button></div><div className="mt-3 space-y-2">{assessmentQuestions.map((q) => <div key={q.id} className="flex items-center justify-between rounded border p-2"><p className="text-sm">{q.prompt}</p><div className="flex gap-2"><Button variant="outline" onClick={() => setQuestionForm({ id: q.id, prompt: q.prompt, type: q.options?.type === "open_text" ? "open_text" : "multiple_choice", optionA: String(q.options?.A ?? ""), optionB: String(q.options?.B ?? ""), optionC: String(q.options?.C ?? ""), optionD: String(q.options?.D ?? ""), correct_option: q.correct_option ?? "A" })}>Editar</Button><Button variant="outline" onClick={async () => { await callAdmin(`/api/admin/questions/${q.id}`, { method: "DELETE" }); await loadAssessmentDetail(selectedAssessmentId); }}>Eliminar</Button></div></div>)}</div></div>
              </CardContent>
            </Card>
          )}

          {activeTab === "intentos" && (
            <Card className="border-slate-100 shadow-sm">
              <CardHeader><CardTitle>Intentos / revisiones</CardTitle><CardDescription>Listado y marcado de revisión</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" onClick={() => loadAttempts()}>Refrescar</Button>
                <div className="space-y-2">{attempts.map((a) => <div key={a.id} className="flex items-center justify-between rounded border bg-white p-3"><div><p className="font-medium">{a.application?.vacancy?.title ?? "Vacante"}</p><p className="text-xs text-slate-600">{a.application?.profile?.email ?? a.application?.user_id}</p></div><div className="flex items-center gap-2"><Badge variant="secondary">{a.status}</Badge><Button variant="outline" onClick={() => setSelectedAttemptId(a.id)}>Ver</Button></div></div>)}</div>
                {attemptDetail ? <div className="rounded border bg-white p-3"><pre className="max-h-80 overflow-auto text-xs text-slate-700">{JSON.stringify(attemptDetail, null, 2)}</pre><div className="mt-3 grid gap-2 md:grid-cols-3"><input className="rounded border p-2" placeholder="score_final" value={reviewForm.score_final} onChange={(e) => setReviewForm((s) => ({ ...s, score_final: e.target.value }))} /><input className="rounded border p-2" placeholder="status (reviewed)" value={reviewForm.status} onChange={(e) => setReviewForm((s) => ({ ...s, status: e.target.value }))} /><textarea className="rounded border p-2 md:col-span-3" placeholder="review_notes" value={reviewForm.review_notes} onChange={(e) => setReviewForm((s) => ({ ...s, review_notes: e.target.value }))} /></div><Button className="mt-2" onClick={async () => { if (!selectedAttemptId) return; await callAdmin(`/api/admin/attempts/${selectedAttemptId}`, { method: "PATCH", body: JSON.stringify(reviewForm) }); await loadAttempts(); await loadAttemptDetail(selectedAttemptId); }}>Marcar revisado</Button></div> : null}
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}
