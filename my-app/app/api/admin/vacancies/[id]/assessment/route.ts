import { NextResponse } from "next/server";

import { requireAdmin } from "../../../utils";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { data, error } = await admin.supabase
    .from("assessments")
    .select("id, vacancy_id, title, duration_minutes")
    .eq("vacancy_id", id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo cargar la evaluación" }, { status: 400 });
  }

  return NextResponse.json({ data: data ?? null });
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { data: vacancy, error: vacancyError } = await admin.supabase.from("vacancies").select("id, title").eq("id", id).maybeSingle();
  if (vacancyError || !vacancy) {
    return NextResponse.json({ error: "Vacante no encontrada" }, { status: 404 });
  }

  const { data: existing, error: existingError } = await admin.supabase
    .from("assessments")
    .select("id, vacancy_id, title, duration_minutes")
    .eq("vacancy_id", id)
    .maybeSingle();

  if (existingError) {
    return NextResponse.json({ error: existingError.message || "No se pudo validar la evaluación" }, { status: 400 });
  }

  if (existing) {
    return NextResponse.json({ data: existing });
  }

  const { data, error } = await admin.supabase
    .from("assessments")
    .insert({
      vacancy_id: id,
      title: `Evaluación - ${vacancy.title}`,
      duration_minutes: 30,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message || "No se pudo crear la evaluación" }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
