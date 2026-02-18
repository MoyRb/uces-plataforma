import { NextResponse } from "next/server";

import { normalizedAttemptStatus, requireAdmin } from "../utils";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const url = new URL(request.url);
  const vacancyId = url.searchParams.get("vacancy_id");
  const userId = url.searchParams.get("user_id");
  const status = normalizedAttemptStatus(url.searchParams.get("status"));

  let query = admin.supabase
    .from("attempts")
    .select(
      "id, status, started_at, submitted_at, theory_score, application:applications!inner(id, user_id, vacancy_id, vacancy:vacancies(title), profile:profiles!applications_user_id_fkey(name, email))"
    )
    .order("started_at", { ascending: false });

  if (vacancyId) {
    query = query.eq("applications.vacancy_id", vacancyId);
  }

  if (userId) {
    query = query.eq("applications.user_id", userId);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: "No se pudieron cargar intentos" }, { status: 400 });
  }

  return NextResponse.json({ data: data ?? [] });
}
