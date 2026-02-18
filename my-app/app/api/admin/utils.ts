import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import { supabaseServer } from "@/lib/supabaseServer";

type AdminContext = {
  supabase: ReturnType<typeof supabaseServer>;
  userId: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function requireAdmin(request: Request): Promise<AdminContext | NextResponse> {
  const supabase = supabaseServer();
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "").trim();

  if (!token) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
  }

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json({ error: "Faltan variables de entorno de Supabase" }, { status: 500 });
  }

  const supabaseAsUser = createClient(supabaseUrl, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data: roleData, error: roleError } = await supabaseAsUser.rpc("get_my_role");

  if (roleError || roleData !== "admin") {
    return NextResponse.json({ error: "Acceso restringido" }, { status: 403 });
  }

  return { supabase, userId: userData.user.id };
}

export const toNullableText = (value: unknown) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const toOptionalBoolean = (value: unknown, fallback = true) => {
  if (typeof value === "boolean") return value;
  return fallback;
};

export const toOptionalNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

export const normalizedAttemptStatus = (value: unknown) => {
  if (typeof value !== "string") return null;
  const normalized = value.toUpperCase();
  if (["IN_PROGRESS", "SUBMITTED", "UNDER_REVIEW", "COMPLETED", "REVIEWED"].includes(normalized)) {
    return normalized === "REVIEWED" ? "COMPLETED" : normalized;
  }
  return null;
};
