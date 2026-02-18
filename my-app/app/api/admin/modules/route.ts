import { NextResponse } from "next/server";

import { requireAdmin, toNullableText, toOptionalBoolean, toOptionalNumber } from "../utils";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const url = new URL(request.url);
  const search = url.searchParams.get("search")?.trim();

  let query = admin.supabase.from("modules").select("*").order("name");
  if (search) query = query.ilike("name", `%${search}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: "No se pudieron cargar módulos" }, { status: 400 });

  return NextResponse.json({ data: data ?? [] });
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;

  const name = toNullableText(body?.name);
  if (!name) return NextResponse.json({ error: "El nombre es obligatorio" }, { status: 400 });

  const payload: Record<string, unknown> = { name, description: toNullableText(body?.description) };
  const payloadBase = { ...payload };

  if (body && Object.prototype.hasOwnProperty.call(body, "is_active")) payload.is_active = toOptionalBoolean(body.is_active, true);
  if (body && Object.prototype.hasOwnProperty.call(body, "sort_order")) payload.sort_order = toOptionalNumber(body.sort_order);

  let response = await admin.supabase.from("modules").insert(payload).select("*").single();

  if (response.error && /column/i.test(response.error.message)) {
    response = await admin.supabase.from("modules").insert(payloadBase).select("*").single();
  }

  if (response.error) return NextResponse.json({ error: response.error.message || "No se pudo crear el módulo" }, { status: 400 });

  return NextResponse.json({ data: response.data }, { status: 201 });
}
