import { NextResponse } from "next/server";

import { hashCurpHmac, normalizeCurp } from "@/lib/curp";
import { supabaseServer } from "@/lib/supabaseServer";

type RegisterPayload = {
  email?: string;
  password?: string;
  curp?: string;
};

const curpPattern = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as RegisterPayload | null;

  if (!body) {
    return NextResponse.json({ error: "Cuerpo de solicitud inválido" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();
  const curp = body.curp ? normalizeCurp(body.curp) : "";

  if (!email || !password || !curp) {
    return NextResponse.json({ error: "Email, contraseña y CURP son obligatorios" }, { status: 400 });
  }

  if (!curpPattern.test(curp)) {
    return NextResponse.json({ error: "CURP inválida. Verifica el formato" }, { status: 400 });
  }

  const curpSecret = process.env.CURP_HASH_SECRET;

  if (!curpSecret) {
    return NextResponse.json({ error: "Configuración de CURP incompleta" }, { status: 500 });
  }

  const supabase = supabaseServer();
  const curpHash = hashCurpHmac(curpSecret, curp);

  const { data: existingCurp, error: curpQueryError } = await supabase
    .from("curp_hashes")
    .select("user_id")
    .eq("curp_hash", curpHash)
    .maybeSingle();

  if (curpQueryError) {
    return NextResponse.json({ error: "No se pudo validar la CURP" }, { status: 500 });
  }

  if (existingCurp) {
    return NextResponse.json({ error: "Esta CURP ya está registrada" }, { status: 400 });
  }

  const { data: userResult, error: createUserError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createUserError || !userResult.user) {
    return NextResponse.json({ error: createUserError?.message ?? "No se pudo crear la cuenta" }, { status: 400 });
  }

  const userId = userResult.user.id;

  const { error: profileError } = await supabase.from("profiles").insert({
    user_id: userId,
    email,
  });

  if (profileError) {
    await supabase.auth.admin.deleteUser(userId);
    return NextResponse.json({ error: "No se pudo guardar el perfil" }, { status: 500 });
  }

  const { error: curpInsertError } = await supabase.from("curp_hashes").insert({
    user_id: userId,
    curp_hash: curpHash,
  });

  if (curpInsertError) {
    await supabase.auth.admin.deleteUser(userId);
    return NextResponse.json({ error: "Esta CURP ya está registrada" }, { status: 400 });
  }

  return NextResponse.json({ message: "Usuario creado" }, { status: 201 });
}
