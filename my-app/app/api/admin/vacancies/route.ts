import { NextResponse } from "next/server";

import { requireAdmin, toNullableText, toOptionalBoolean } from "../utils";

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

  const moduleId = toNullableText(body?.module_id);
  const title = toNullableText(body?.title);
  if (!moduleId || !title) return NextResponse.json({ error: "Módulo y título son obligatorios" }, { status: 400 });

  const payload: Record<string, unknown> = { module_id: moduleId, title, description: toNullableText(body?.description), status: toNullableText(body?.status) ?? "open" };
  const payloadBase = { ...payload };

  if (body && Object.prototype.hasOwnProperty.call(body, "is_active")) payload.is_active = toOptionalBoolean(body.is_active, true);
  if (body && Object.prototype.hasOwnProperty.call(body, "deadline")) payload.deadline = toNullableText(body.deadline);

  let response = await admin.supabase.from("vacancies").insert(payload).select("*").single();

  if (response.error && /column/i.test(response.error.message)) {
    response = await admin.supabase.from("vacancies").insert(payloadBase).select("*").single();
  }

  if (response.error) return NextResponse.json({ error: response.error.message || "No se pudo crear la vacante" }, { status: 400 });

  return NextResponse.json({ data: response.data }, { status: 201 });
}
