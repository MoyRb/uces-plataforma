/**
 * captura-v3.js — Corte 8J
 * Capturas focalizadas: EV-5B-02 (detalle candidato admin) y EV-5B-03 (formulario de decisión).
 *
 * Prerrequisitos:
 *   - App corriendo en http://localhost:3000
 *   - Usuario c.mendoza@itesz.edu.mx con rol admin en producción
 *   - Al menos un attempt en la BD (ejecutar 03-seed-flujos.sql si no hay ninguno)
 *
 * Uso:
 *   node docs/titulacion/evidencias/08j/captura-v3.js
 */

const puppeteer = require("C:/Users/moise/AppData/Local/npm-cache/_npx/7d92d9a2d2ccc630/node_modules/puppeteer");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3000";
const OUT_DIR  = "C:/uces-plataforma/docs/titulacion/evidencias/08j/administrador";
const VIEWPORT = { width: 1440, height: 900 };

const ADMIN = { email: "c.mendoza@itesz.edu.mx", password: "Uces2026#Prueba!" };

const log = m => console.log(`[${new Date().toISOString().slice(11, 19)}] ${m}`);

// ── Leer .env.local ────────────────────────────────────────────────────────────
function readEnv(filepath) {
  const env = {};
  try {
    fs.readFileSync(filepath, "utf8").split("\n").forEach(line => {
      const t = line.trim();
      if (!t || t.startsWith("#")) return;
      const i = t.indexOf("=");
      if (i < 1) return;
      env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    });
  } catch {}
  return env;
}

const ENV = readEnv("C:/uces-plataforma/my-app/.env.local");
const SUPABASE_URL = ENV.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY    = ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SVC_KEY     = ENV.SUPABASE_SERVICE_ROLE_KEY;

// ── Supabase REST (service key) ────────────────────────────────────────────────
async function sbRest(endpoint) {
  const r = await fetch(SUPABASE_URL + endpoint, {
    headers: {
      apikey: SVC_KEY,
      Authorization: `Bearer ${SVC_KEY}`,
      "Content-Type": "application/json",
    },
  });
  return r.json().catch(() => null);
}

// ── Supabase Auth sign-in ──────────────────────────────────────────────────────
async function sbSignIn(email, password) {
  const r = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return r.json();
}

// ── Inyectar sesión en localStorage del navegador ─────────────────────────────
async function setSupabaseSession(page, session) {
  const ref = new URL(SUPABASE_URL).hostname.split(".")[0];
  const key = `sb-${ref}-auth-token`;
  const val = JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: session.expires_in,
    expires_at: session.expires_at,
    token_type: "bearer",
    user: session.user,
  });
  await page.evaluate((k, v) => localStorage.setItem(k, v), key, val);
}

// ── Esperar a que desaparezca "Cargando…" ────────────────────────────────────
async function waitForReady(page) {
  try {
    await page.waitForFunction(
      () => {
        const main = document.querySelector("main");
        return main && !main.innerText.includes("Cargando");
      },
      { timeout: 8000 }
    );
  } catch {
    log("Timeout esperando contenido — continuando de todas formas.");
  }
  await new Promise(r => setTimeout(r, 1500));
}

// ── Screenshot ────────────────────────────────────────────────────────────────
async function shot(page, filename, label) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const filepath = path.join(OUT_DIR, filename);
  await page.screenshot({ path: filepath });
  const sizeKB = Math.round(fs.statSync(filepath).size / 1024);
  log(`CAPTURA: ${filename} — ${label} (${sizeKB} KB)`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  log("=== Corte 8J — captura-v3.js ===");

  if (!SUPABASE_URL || !ANON_KEY || !SVC_KEY) {
    log("ERROR: .env.local no encontrado o faltan variables.");
    log("  Esperado: C:/uces-plataforma/my-app/.env.local");
    process.exit(1);
  }

  // 1. Autenticar admin
  log(`Autenticando: ${ADMIN.email}`);
  const session = await sbSignIn(ADMIN.email, ADMIN.password);
  if (session.error || !session.access_token) {
    log(`ERROR de autenticación: ${JSON.stringify(session.error ?? session)}`);
    log("Verifica que el usuario exista en producción con contraseña 'Uces2026#Prueba!'");
    process.exit(1);
  }
  log(`Sesión obtenida — user_id: ${session.user?.id?.slice(0, 8)}...`);

  // 2. Buscar attempt ideal en la BD
  let attemptId = null;

  // Prioridad 1: intento demo COMPLETED (prefijo d2200 del seed 03-seed-flujos.sql)
  const demoCOMPLETED = await sbRest(
    "/rest/v1/attempts?select=id,status&id=like.d2200*&status=eq.COMPLETED&order=created_at.desc&limit=1"
  );
  if (Array.isArray(demoCOMPLETED) && demoCOMPLETED[0]?.id) {
    attemptId = demoCOMPLETED[0].id;
    log(`Usando intento demo COMPLETED: ${attemptId}`);
  }

  // Prioridad 2: cualquier intento COMPLETED
  if (!attemptId) {
    const anyCOMPLETED = await sbRest(
      "/rest/v1/attempts?select=id,status&status=eq.COMPLETED&order=created_at.desc&limit=1"
    );
    if (Array.isArray(anyCOMPLETED) && anyCOMPLETED[0]?.id) {
      attemptId = anyCOMPLETED[0].id;
      log(`Usando intento COMPLETED: ${attemptId}`);
    }
  }

  // Prioridad 3: cualquier intento SUBMITTED
  if (!attemptId) {
    const anySUBMITTED = await sbRest(
      "/rest/v1/attempts?select=id,status&status=eq.SUBMITTED&order=created_at.desc&limit=1"
    );
    if (Array.isArray(anySUBMITTED) && anySUBMITTED[0]?.id) {
      attemptId = anySUBMITTED[0].id;
      log(`Usando intento SUBMITTED: ${attemptId}`);
    }
  }

  // Prioridad 4: cualquier intento (último creado)
  if (!attemptId) {
    const anyAttempt = await sbRest(
      "/rest/v1/attempts?select=id,status&order=created_at.desc&limit=1"
    );
    if (Array.isArray(anyAttempt) && anyAttempt[0]?.id) {
      attemptId = anyAttempt[0].id;
      log(`Usando intento más reciente: ${attemptId} (status: ${anyAttempt[0].status})`);
    }
  }

  if (!attemptId) {
    log("ERROR: No hay ningún intento en la BD.");
    log("  Opciones:");
    log("  1. Ejecuta supabase/demo/03-seed-flujos.sql en el SQL Editor de Supabase.");
    log("  2. O crea un intento completando la evaluación psicométrica en la app.");
    process.exit(1);
  }

  // 3. Iniciar Puppeteer
  log("Iniciando navegador...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:/Users/moise/.cache/puppeteer/chrome/win64-156.0.8078.47/chrome-win64/chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // 4. Cargar la raíz primero (para que localStorage esté disponible en el dominio correcto)
    await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 15000 });
    log("Inyectando sesión admin en localStorage...");
    await setSupabaseSession(page, session);

    // 5. Navegar a la página de detalle del intento
    const url = `${BASE_URL}/admin/attempts/${attemptId}`;
    log(`Navegando a: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
    await waitForReady(page);

    // Verificar que no hubo redirección a /login
    const currentUrl = page.url();
    if (currentUrl.includes("/login") || currentUrl.includes("/panel")) {
      log(`ADVERTENCIA: redirigido a ${currentUrl} — re-inyectando sesión...`);
      await setSupabaseSession(page, session);
      await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
      await waitForReady(page);
    }

    log(`URL actual: ${page.url()}`);

    // 6. EV-5B-02: captura completa de la página (vista de Resumen + Resumen psicométrico)
    await shot(page, "EV-5B-02-admin-detalle-candidato.png",
      "EV-5B-02 Vista de detalle de candidato en panel admin");

    // 7. Scroll para revelar la tarjeta "Acciones de revisión"
    log("Scrolling a sección Acciones de revisión...");
    await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
    await new Promise(r => setTimeout(r, 800));

    // 8. EV-5B-03: formulario de decisión (select + textarea + botones)
    await shot(page, "EV-5B-03-admin-decision.png",
      "EV-5B-03 Formulario de decisión del administrador");

    log("=== Capturas EV-5B-02 y EV-5B-03 completadas ===");
    log(`Archivos guardados en: ${OUT_DIR}`);

  } finally {
    await browser.close();
  }
}

main().catch(e => {
  console.error("Error fatal:", e.message);
  process.exit(1);
});
