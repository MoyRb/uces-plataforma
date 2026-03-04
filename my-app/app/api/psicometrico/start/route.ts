import { NextResponse } from "next/server";

import { ensurePsicometricoAttempt } from "@/lib/psicometrico";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(request: Request) {
  const supabase = supabaseServer();
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    return NextResponse.json({ error: "Sesión inválida" }, { status: 401 });
  }

  const result = await ensurePsicometricoAttempt(supabase, userData.user.id);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  if (result.completed) {
    return NextResponse.json({ completed: true });
  }

  return NextResponse.json({ completed: false, attemptId: result.attemptId });
}
