import { NextResponse } from "next/server";

import { requireAdmin, toNullableText } from "../utils";

const normalizeStatus = (value: unknown): "open" | "closed" | "draft" => {
  if (value === "closed" || value === "draft") return value;
  return "open";
};

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const url = new URL(request.url);
  const moduleId = url.searchParams.get("module_id");

  let query = admin.supabase.from("vacancies").select("*, modules(name)").order("title");

  if (moduleId) query = query.eq("module_id", moduleId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: "No se pudieron cargar vacantes" }, { status: 400 });

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  const title = toNullableText(body?.title);
  if (!title) return NextResponse.json({ error: "El título es obligatorio" }, { status: 400 });

  const payload = {
    module_id: toNullableText(body?.module_id),
    title,
    schedule: toNullableText(body?.schedule),
    location: toNullableText(body?.location),
    description: toNullableText(body?.description),
    requirements: toNullableText(body?.requirements),
    status: normalizeStatus(body?.status),
  };

  const vacancyResponse = await admin.supabase.from("vacancies").insert(payload).select("*").single();
  if (vacancyResponse.error || !vacancyResponse.data) {
    return NextResponse.json({ error: vacancyResponse.error?.message || "No se pudo crear la vacante" }, { status: 400 });
  }

  const assessmentResponse = await admin.supabase
    .from("assessments")
    .insert({
      vacancy_id: vacancyResponse.data.id,
      title: `Evaluación - ${vacancyResponse.data.title}`,
      duration_minutes: 30,
    })
    .select("*")
    .single();

  if (assessmentResponse.error) {
    await admin.supabase.from("vacancies").delete().eq("id", vacancyResponse.data.id);
    return NextResponse.json({ error: assessmentResponse.error.message || "No se pudo crear la evaluación automática" }, { status: 400 });
  }

  return NextResponse.json({ data: vacancyResponse.data, assessment: assessmentResponse.data }, { status: 201 });
}
