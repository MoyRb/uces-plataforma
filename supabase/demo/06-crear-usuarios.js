/**
 * 06-crear-usuarios.js
 * UCES — Crear usuarios de prueba mediante Supabase Auth Admin API
 * y poblar profiles, user_roles y curp_hashes.
 *
 * REQUISITOS:
 *   - Node.js 18+
 *   - @supabase/supabase-js instalado (npm install @supabase/supabase-js)
 *   - Archivo .env.local con:
 *       NEXT_PUBLIC_SUPABASE_URL=https://<proyecto>.supabase.co
 *       SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
 *       CURP_HMAC_SECRET=<secreto>
 *
 * USO:
 *   node supabase/demo/06-crear-usuarios.js
 *
 * SALIDA:
 *   - Crea usuarios en auth.users
 *   - Inserta profiles, user_roles, curp_hashes
 *   - Imprime tabla con UUIDs asignados para referencia
 *   - Guarda UUIDs en supabase/demo/.demo-uuids.json (NO subir a Git)
 */

import { createClient } from "@supabase/supabase-js";
import { createHmac } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// ─── Cargar .env.local ────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const lines = readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx < 0) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      if (key && val) process.env[key] = val;
    }
  } catch {
    console.error("ERROR: No se encontró .env.local en la raíz del proyecto.");
    process.exit(1);
  }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const CURP_SECRET  = process.env.CURP_HMAC_SECRET;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("ERROR: Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  process.exit(1);
}

if (!CURP_SECRET) {
  console.error("ERROR: Falta CURP_HMAC_SECRET en .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

function hashCurp(secret, curp) {
  return createHmac("sha256", secret).update(curp.trim().toUpperCase()).digest("hex");
}

// ─── Definición de usuarios de prueba ─────────────────────────────────────────
const DEMO_PASSWORD = "Uces2026#Prueba!";

const USERS = [
  // ── Administrador ──────────────────────────────────────────────────────────
  {
    email: "c.mendoza@itesz.edu.mx",
    name: "Carlos Mendoza Herrera",
    role_profile: "admin",
    role_table: "admin",
    curp: null,
  },
  // ── Revisor ────────────────────────────────────────────────────────────────
  {
    email: "a.villanueva@itesz.edu.mx",
    name: "Ana Patricia Villanueva Torres",
    role_profile: "reviewer",
    role_table: "user",
    curp: null,
  },
  // ── Candidatos ─────────────────────────────────────────────────────────────
  {
    email: "luis.ramirez98@correo.uces.edu.mx",
    name: "Luis Ángel Ramírez Flores",
    role_profile: "user",
    role_table: "user",
    curp: "RAFL980315HMCRMR01",
  },
  {
    email: "sofia.martinez99@correo.uces.edu.mx",
    name: "Sofía Guadalupe Martínez Cruz",
    role_profile: "user",
    role_table: "user",
    curp: "MACS990722MDFRTF02",
  },
  {
    email: "roberto.jimenez@correo.uces.edu.mx",
    name: "Roberto Carlos Jiménez Vega",
    role_profile: "user",
    role_table: "user",
    curp: "JIVR971108HGJMRB03",
  },
  {
    email: "mf.lopez@correo.uces.edu.mx",
    name: "María Fernanda López Reyes",
    role_profile: "user",
    role_table: "user",
    curp: "LORF000130MMCPYM04",
  },
  {
    email: "diego.sanchez@correo.uces.edu.mx",
    name: "Diego Alejandro Sánchez Morales",
    role_profile: "user",
    role_table: "user",
    curp: "SAMD980905HJCNLG05",
  },
  {
    email: "valeria.gomez@correo.uces.edu.mx",
    name: "Valeria Itzel Gómez Ruiz",
    role_profile: "user",
    role_table: "user",
    curp: "GORV990417MMCMZL06",
  },
  {
    email: "oscar.hernandez@correo.uces.edu.mx",
    name: "Óscar Ernesto Hernández Medina",
    role_profile: "user",
    role_table: "user",
    curp: "HEMO970623HMCRNC07",
  },
  {
    email: "daniela.pena@correo.uces.edu.mx",
    name: "Daniela Monserrat Peña Castro",
    role_profile: "user",
    role_table: "user",
    curp: "PECD010214MMCXNN08",
  },
  {
    email: "javier.torres@correo.uces.edu.mx",
    name: "Javier Eduardo Torres Ríos",
    role_profile: "user",
    role_table: "user",
    curp: "TORJ960819HMCRRV09",
  },
  {
    email: "karla.delgado@correo.uces.edu.mx",
    name: "Karla Berenice Delgado Fuentes",
    role_profile: "user",
    role_table: "user",
    curp: "DEFK001103MMCLRN10",
  },
];

// ─── Crear usuarios ───────────────────────────────────────────────────────────
async function main() {
  console.log("=== UCES — Creación de usuarios de prueba ===");
  console.log(`Proyecto: ${SUPABASE_URL}`);
  console.log(`Usuarios a crear: ${USERS.length}\n`);

  const created = [];

  for (const u of USERS) {
    console.log(`Procesando: ${u.email} ...`);

    // 1. Crear en auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: u.email,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { name: u.name },
    });

    if (authError) {
      if (
        authError.message?.includes("already registered") ||
        authError.message?.includes("already exists")
      ) {
        console.warn(`  SKIP: ${u.email} ya existe.`);
        const { data: listData } = await supabase.auth.admin.listUsers();
        const existing = listData?.users?.find((x) => x.email === u.email);
        if (existing) {
          created.push({ ...u, uuid: existing.id });
          console.log(`  UUID existente: ${existing.id}`);
        }
        continue;
      }
      console.error(`  ERROR auth: ${authError.message}`);
      continue;
    }

    const uuid = authData.user.id;
    console.log(`  UUID creado: ${uuid}`);

    // 2. Insertar profile
    const { error: profileError } = await supabase.from("profiles").upsert({
      user_id: uuid,
      name: u.name,
      email: u.email,
      role: u.role_profile,
    });
    if (profileError) console.error(`  ERROR profile: ${profileError.message}`);
    else console.log(`  Profile: OK`);

    // 3. Insertar user_role
    const { error: roleError } = await supabase.from("user_roles").upsert({
      user_id: uuid,
      role: u.role_table,
    });
    if (roleError) console.error(`  ERROR user_role: ${roleError.message}`);
    else console.log(`  user_role(${u.role_table}): OK`);

    // 4. Insertar curp_hash si aplica
    if (u.curp) {
      const h = hashCurp(CURP_SECRET, u.curp);
      const { error: curpError } = await supabase.from("curp_hashes").upsert({
        user_id: uuid,
        curp_hash: h,
      });
      if (curpError) console.error(`  ERROR curp_hash: ${curpError.message}`);
      else console.log(`  curp_hash: OK`);
    }

    created.push({ ...u, uuid });
    console.log();
  }

  // ─── Resumen ────────────────────────────────────────────────────────────────
  console.log("\n=== USUARIOS CREADOS ===");
  console.log("Email                                      | UUID                                 | Rol");
  console.log("-------------------------------------------|--------------------------------------|-------");
  for (const u of created) {
    console.log(`${u.email.padEnd(43)}| ${u.uuid} | ${u.role_table}`);
  }

  // Guardar UUIDs para referencia en 03-seed-flujos.sql
  const uuidMap = Object.fromEntries(created.map((u) => [u.email, u.uuid]));
  const outPath = resolve(process.cwd(), "supabase/demo/.demo-uuids.json");
  writeFileSync(outPath, JSON.stringify(uuidMap, null, 2));
  console.log(`\nUUIDs guardados en: ${outPath}`);
  console.log("NOTA: .demo-uuids.json contiene UUIDs de prueba — NO subir a Git.");
  console.log("\nSiguiente paso: ejecutar 03-seed-flujos.sql sustituyendo los UUIDs del JSON.");
}

main().catch((e) => { console.error(e); process.exit(1); });
