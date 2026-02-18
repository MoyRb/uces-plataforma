import { NextResponse } from "next/server";

import { requireAdmin, toNullableText, toOptionalNumber } from "../utils";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const url = new URL(request.url);
  const vacancyId = url.searchParams.get("vacancy_id");

  let query = admin.supabase
    .from("assessments")
    .select("id, vacancy_id, title, duration_minutes, vacancies(title)")
    .order("title", { ascending: true });

  if (vacancyId) {
    query = query.eq("vacancy_id", vacancyId);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "No se pudieron cargar evaluaciones" }, { status: 400 });
  }

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const vacancyId = toNullableText(body?.vacancy_id);

  if (!vacancyId) {
    return NextResponse.json({ error: "vacancy_id es obligatorio" }, { status: 400 });
  }

  const payload = {
    vacancy_id: vacancyId,
    title: toNullableText(body?.title),
    duration_minutes: toOptionalNumber(body?.duration_minutes) ?? 30,
  };

  const { data, error } = await admin.supabase.from("assessments").insert(payload).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo crear la evaluación" }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
