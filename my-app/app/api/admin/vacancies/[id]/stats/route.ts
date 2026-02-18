import { NextResponse } from "next/server";

import { requireAdmin } from "../../../utils";

type Params = { params: { id: string } };

export async function GET(request: Request, { params }: Params) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const [{ count: applicationsCount, error: applicationsError }, { count: attemptsCount, error: attemptsError }] = await Promise.all([
    admin.supabase.from("applications").select("id", { count: "exact", head: true }).eq("vacancy_id", params.id),
    admin.supabase
      .from("attempts")
      .select("id, applications!inner(vacancy_id)", { count: "exact", head: true })
      .eq("applications.vacancy_id", params.id),
  ]);

  if (applicationsError || attemptsError) {
    return NextResponse.json({ error: "No se pudieron cargar estadísticas" }, { status: 400 });
  }

  return NextResponse.json({
    data: {
      applicationsCount: applicationsCount ?? 0,
      attemptsCount: attemptsCount ?? 0,
    },
  });
}
