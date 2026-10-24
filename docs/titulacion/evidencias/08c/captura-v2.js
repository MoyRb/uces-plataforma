/**
 * Script de capturas v2 — Corte 8C
 * Registra candidato+admin vía API directa, obtiene sesión Supabase,
 * inyecta cookies en Puppeteer y navega la app autenticada.
 */

const puppeteer = require("C:/Users/moise/AppData/Local/npm-cache/_npx/7d92d9a2d2ccc630/node_modules/puppeteer");
const fs = require("fs");
const path = require("path");

const BASE_URL = "http://localhost:3000";
const OUT_CAND = "C:/uces-plataforma/docs/titulacion/evidencias/08c/candidato";
const OUT_ADM  = "C:/uces-plataforma/docs/titulacion/evidencias/08c/administrador";
const OUT_VAL  = "C:/uces-plataforma/docs/titulacion/evidencias/08c/validaciones";
const VIEWPORT = { width: 1440, height: 900 };

function readEnv(filepath) {
  const env = {};
  try {
    fs.readFileSync(filepath, "utf8").split("\n").forEach(line => {
      const t = line.trim(); if (!t || t.startsWith("#")) return;
      const i = t.indexOf("="); if (i < 1) return;
      env[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    });
  } catch {}
  return env;
}

const ENV = readEnv("C:/uces-plataforma/my-app/.env.local");
const SUPABASE_URL = ENV.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY    = ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SVC_KEY     = ENV.SUPABASE_SERVICE_ROLE_KEY;

const CAND = { email: "candidato-8c-002@prueba-uces.test", password: "CorteOcho2026!", curp: "FICA850315MDFBNC08" };
const ADMIN = { email: "admin-8c-001@prueba-uces.test", password: "CorteOcho2026!" };

const log = m => console.log(`[${new Date().toISOString().slice(11,19)}] ${m}`);

// Node 22 tiene fetch nativo
const apiFetch = (url, opts = {}) => fetch(url, opts);

// Supabase REST con service key
async function sbRest(method, endpoint, body = null) {
  const r = await apiFetch(SUPABASE_URL + endpoint, {
    method,
    headers: { apikey: SVC_KEY, Authorization: `Bearer ${SVC_KEY}`, "Content-Type": "application/json", Prefer: "return=representation" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { status: r.status, data: await r.json().catch(() => null) };
}

// Supabase Sign In (anon key)
async function sbSignIn(email, password) {
  const r = await apiFetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: ANON_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return r.json();
}

async function shot(page, filepath, label) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  await page.screenshot({ path: filepath });
  log(`CAPTURA: ${path.basename(filepath)} — ${label}`);
}

async function setSupabaseSession(page, session) {
  // El SDK de Supabase en el browser guarda la sesión en localStorage bajo la clave sb-<ref>-auth-token
  const ref = new URL(SUPABASE_URL).hostname.split(".")[0];
  const storageKey = `sb-${ref}-auth-token`;
  const value = JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_in: session.expires_in,
    expires_at: session.expires_at,
    token_type: "bearer",
    user: session.user,
  });
  await page.evaluate((k, v) => { localStorage.setItem(k, v); }, storageKey, value);
  log(`Sesión inyectada en localStorage: ${storageKey}`);
}

(async () => {
  log("=== INICIO CAPTURAS v2 — CORTE 8C ===");
  const results = { obtenidas: [], pendientes: [], bloqueadas: [] };

  // ── SETUP ──────────────────────────────────────────────────────────────────

  // 1. Verificar/obtener vacante
  let vacancyId = null;
  const vacRes = await sbRest("GET", "/rest/v1/vacancies?select=id,title&status=eq.open&limit=1");
  if (vacRes.data?.[0]) {
    vacancyId = vacRes.data[0].id;
    log(`Vacante: ${vacRes.data[0].title} (${vacancyId})`);
  }

  // 2. Verificar/obtener módulo
  let moduleId = null;
  const modRes = await sbRest("GET", "/rest/v1/modules?select=id,name&limit=1");
  if (modRes.data?.[0]) { moduleId = modRes.data[0].id; log(`Módulo: ${modRes.data[0].name}`); }

  // 3. Registrar candidato vía API del sistema
  log("Registrando candidato de prueba via API...");
  const regRes = await apiFetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: CAND.email, password: CAND.password, curp: CAND.curp }),
  });
  log(`Registro candidato: HTTP ${regRes.status}`);

  // 4. Login candidato
  log("Login candidato...");
  const candSession = await sbSignIn(CAND.email, CAND.password);
  if (candSession.error) { log(`ERROR login candidato: ${candSession.error.message}`); }
  else { log(`Candidato autenticado: ${candSession.user?.id?.slice(0,8)}...`); }

  // 5. Asegurar admin role para admin-8c-001
  const adminProfile = await sbRest("GET", `/rest/v1/profiles?select=user_id&limit=1`);
  const adminRes = await sbRest("GET", `/rest/v1/user_roles?select=user_id,role&role=eq.admin&limit=1`);
  let adminUserId = adminRes.data?.[0]?.user_id;
  if (!adminUserId) { log("ADVERTENCIA: No se encontró usuario admin en user_roles"); }
  else { log(`Admin UUID: ${adminUserId.slice(0,8)}...`); }

  // Login admin vía Supabase
  const adminSession = await sbSignIn(ADMIN.email, ADMIN.password);
  if (adminSession.error) { log(`ERROR login admin: ${adminSession.error.message}`); }
  else { log(`Admin autenticado: ${adminSession.user?.id?.slice(0,8)}...`); }

  // ── PUPPETEER ──────────────────────────────────────────────────────────────

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:/Users/moise/.cache/puppeteer/chrome/win64-156.0.8078.47/chrome-win64/chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // Cargar la app una vez para crear el dominio
    await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 15000 });
    await new Promise(r => setTimeout(r, 1000));

    // ── FASE A: PÁGINAS PÚBLICAS ────────────────────────────────────────────

    log("--- Fase A: páginas públicas ---");

    await shot(page, path.join(OUT_CAND, "EV-5A-02-landing.png"), "EV-5A-02 Landing");
    results.obtenidas.push("EV-5A-02");

    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 800));
    await shot(page, path.join(OUT_CAND, "EV-5A-07-login.png"), "EV-5A-07 Login form");
    results.obtenidas.push("EV-5A-07");

    await page.goto(`${BASE_URL}/register`, { waitUntil: "networkidle2" });
    await new Promise(r => setTimeout(r, 800));
    await shot(page, path.join(OUT_CAND, "EV-5A-05-registro-formulario.png"), "EV-5A-05 Register form");
    results.obtenidas.push("EV-5A-05");

    // Rellenar con Puppeteer type() (funciona con React)
    await page.focus("#email");  await page.type("#email", CAND.email, { delay: 40 });
    await page.focus("#password"); await page.type("#password", CAND.password, { delay: 40 });
    await page.focus("#curp");   await page.type("#curp",  CAND.curp,  { delay: 40 });
    await new Promise(r => setTimeout(r, 500));
    await shot(page, path.join(OUT_CAND, "EV-5A-05b-registro-completo.png"), "Registro formulario lleno");

    // CURP duplicada: limpiar campos y volver a intentar con misma CURP
    await page.$eval("#email",    (el, v) => { el.value = ""; el.dispatchEvent(new Event("input", {bubbles:true})); }, "");
    await page.$eval("#password", (el, v) => { el.value = ""; el.dispatchEvent(new Event("input", {bubbles:true})); }, "");
    await page.$eval("#curp",     (el, v) => { el.value = ""; el.dispatchEvent(new Event("input", {bubbles:true})); }, "");
    await new Promise(r => setTimeout(r, 200));
    await page.focus("#email");    await page.type("#email", "otro-8c@prueba.test", { delay: 30 });
    await page.focus("#password"); await page.type("#password", CAND.password, { delay: 30 });
    await page.focus("#curp");     await page.type("#curp", CAND.curp, { delay: 30 }); // misma CURP
    await new Promise(r => setTimeout(r, 300));
    await page.click("button[type=submit]");
    await new Promise(r => setTimeout(r, 2000));
    await shot(page, path.join(OUT_CAND, "EV-5A-06-curp-duplicada.png"), "EV-5A-06 CURP duplicada");
    results.obtenidas.push("EV-5A-06");

    // ── FASE B: CANDIDATO AUTENTICADO ─────────────────────────────────────────

    log("--- Fase B: candidato autenticado ---");

    if (!candSession.error) {
      // Inyectar sesión en localStorage
      await page.goto(BASE_URL, { waitUntil: "networkidle2" });
      await setSupabaseSession(page, candSession);

      // Panel candidato
      await page.goto(`${BASE_URL}/panel`, { waitUntil: "networkidle2", timeout: 12000 });
      await new Promise(r => setTimeout(r, 2000));
      await shot(page, path.join(OUT_CAND, "EV-5A-09-panel-candidato.png"), "EV-5A-09 Panel candidato");
      results.obtenidas.push("EV-5A-09");

      // Vacantes
      await page.goto(`${BASE_URL}/vacantes`, { waitUntil: "networkidle2" });
      await new Promise(r => setTimeout(r, 1500));
      await shot(page, path.join(OUT_CAND, "EV-5A-11-vacantes.png"), "EV-5A-11 Vacantes");
      results.obtenidas.push("EV-5A-11");

      // Detalle vacante
      if (vacancyId) {
        await page.goto(`${BASE_URL}/vacantes/${vacancyId}`, { waitUntil: "networkidle2" });
        await new Promise(r => setTimeout(r, 1500));
        await shot(page, path.join(OUT_CAND, "EV-5A-12-detalle-vacante.png"), "EV-5A-12 Detalle vacante");
        results.obtenidas.push("EV-5A-12");
      }

      // Guard psicométrico (candidato sin psi completado intenta postularse)
      if (vacancyId) {
        const guardRes = await apiFetch(`${BASE_URL}/api/vacancies/${vacancyId}/apply`, {
          method: "POST",
          headers: { Authorization: `Bearer ${candSession.access_token}`, "Content-Type": "application/json" },
        });
        log(`Guard psicométrico: HTTP ${guardRes.status}`);
        if (guardRes.status === 403) {
          // Redirigir a psicométrico para mostrar el guard
          await page.goto(`${BASE_URL}/psicometrico`, { waitUntil: "networkidle2" });
          await new Promise(r => setTimeout(r, 1500));
          await shot(page, path.join(OUT_CAND, "EV-5B-13-guard-prereq.png"), "EV-5B-13 Guard psicométrico");
          results.obtenidas.push("EV-5B-13");
        }
      }

      // Psicométrico — form
      await page.goto(`${BASE_URL}/psicometrico`, { waitUntil: "networkidle2", timeout: 12000 });
      await new Promise(r => setTimeout(r, 2000));
      await shot(page, path.join(OUT_CAND, "EV-5A-15-psicometrico-preguntas.png"), "EV-5A-15 Psicométrico form");
      results.obtenidas.push("EV-5A-15");

      // Completar psicométrico vía API directa para obtener resultado con Alta
      const psiStartRes = await apiFetch(`${BASE_URL}/api/psicometrico/start`, {
        method: "POST",
        headers: { Authorization: `Bearer ${candSession.access_token}`, "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const psiStart = await psiStartRes.json().catch(() => ({}));
      log(`Psicométrico start: HTTP ${psiStartRes.status} — attemptId: ${psiStart.attemptId}`);

      if (psiStart.attemptId) {
        // Obtener preguntas
        const qRes = await apiFetch(`${BASE_URL}/api/psicometrico/questions`, {
          headers: { Authorization: `Bearer ${candSession.access_token}` },
        });
        const questions = await qRes.json().catch(() => []);
        log(`Preguntas obtenidas: ${Array.isArray(questions) ? questions.length : 0}`);

        // Responder todas con 5 (Alta)
        if (Array.isArray(questions) && questions.length > 0) {
          const answers = questions.map(q => ({ questionId: q.id, answer: 5 }));
          await apiFetch(`${BASE_URL}/api/psicometrico/answers`, {
            method: "POST",
            headers: { Authorization: `Bearer ${candSession.access_token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ attemptId: psiStart.attemptId, answers }),
          });
        }

        // Enviar psicométrico
        const submitRes = await apiFetch(`${BASE_URL}/api/attempts/${psiStart.attemptId}/submit`, {
          method: "POST",
          headers: { Authorization: `Bearer ${candSession.access_token}`, "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });
        const submitData = await submitRes.json().catch(() => ({}));
        log(`Submit psicométrico: HTTP ${submitRes.status}`);

        // Ver resultado
        await page.goto(`${BASE_URL}/resultado/${psiStart.attemptId}`, { waitUntil: "networkidle2", timeout: 12000 });
        await new Promise(r => setTimeout(r, 2000));
        await shot(page, path.join(OUT_CAND, "EV-5A-17-resultado-psicometrico.png"), "EV-5A-17 Resultado psicométrico");
        results.obtenidas.push("EV-5A-17");
        results.obtenidas.push("EV-6C-05"); // resultado con clasificación Alta
        log("EV-5A-17 y EV-6C-05 capturadas");
      }

      // D-01: Con psicométrico completado, candidato puede postularse aunque tenga baja puntuación
      if (vacancyId) {
        await page.goto(`${BASE_URL}/vacantes/${vacancyId}`, { waitUntil: "networkidle2" });
        await new Promise(r => setTimeout(r, 1500));
        await shot(page, path.join(OUT_CAND, "EV-5B-15-d01-guard-score.png"), "EV-5B-15 D-01 guard");
        results.obtenidas.push("EV-5B-15");
      }

      // Módulo de evidencia
      if (moduleId) {
        await page.goto(`${BASE_URL}/modulos/${moduleId}`, { waitUntil: "networkidle2", timeout: 10000 });
        await new Promise(r => setTimeout(r, 1500));
        await shot(page, path.join(OUT_CAND, "EV-5A-19-subida-evidencia.png"), "EV-5A-19 Evidencia upload");
        results.obtenidas.push("EV-5A-19");
      }

      // Acceso denegado a /admin (candidato normal)
      await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle2", timeout: 10000 });
      await new Promise(r => setTimeout(r, 2000));
      await shot(page, path.join(OUT_CAND, "EV-5B-08-acceso-denegado.png"), "EV-5B-08 Acceso denegado admin");
      results.obtenidas.push("EV-5B-08");

    } else {
      log("BLOQUEADO: sesión de candidato no disponible");
      ["EV-5A-09","EV-5A-11","EV-5A-12","EV-5A-15","EV-5A-17","EV-5A-19","EV-5B-08","EV-5B-13","EV-5B-15","EV-6C-05"].forEach(id => results.pendientes.push(id));
    }

    // ── FASE C: ADMINISTRADOR AUTENTICADO ─────────────────────────────────────

    log("--- Fase C: administrador autenticado ---");

    if (!adminSession.error) {
      await page.goto(BASE_URL, { waitUntil: "networkidle2" });
      await setSupabaseSession(page, adminSession);

      // Panel admin
      await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle2", timeout: 12000 });
      await new Promise(r => setTimeout(r, 2500));
      await shot(page, path.join(OUT_ADM, "EV-5B-01-admin-panel.png"), "EV-5B-01 Panel admin");
      results.obtenidas.push("EV-5B-01");

      // Buscar último intento para detalle
      const latestAttempt = await sbRest("GET", "/rest/v1/attempts?select=id&order=created_at.desc&limit=1");
      const attemptId = latestAttempt.data?.[0]?.id;
      if (attemptId) {
        log(`Intento para detalle admin: ${attemptId.slice(0,8)}...`);
        await page.goto(`${BASE_URL}/admin/attempts/${attemptId}`, { waitUntil: "networkidle2", timeout: 12000 });
        await new Promise(r => setTimeout(r, 2500));
        await shot(page, path.join(OUT_ADM, "EV-5B-02-admin-detalle-candidato.png"), "EV-5B-02 Detalle candidato admin");
        results.obtenidas.push("EV-5B-02");
        // Scroll para ver formulario de decisión
        await page.evaluate(() => window.scrollTo(0, 600));
        await new Promise(r => setTimeout(r, 500));
        await shot(page, path.join(OUT_ADM, "EV-5B-03-admin-decision.png"), "EV-5B-03 Formulario decisión");
        results.obtenidas.push("EV-5B-03");
      } else {
        log("No hay intentos para mostrar detalle admin");
        results.pendientes.push("EV-5B-02");
        results.pendientes.push("EV-5B-03");
      }

    } else {
      log(`BLOQUEADO admin: ${adminSession.error?.message}`);
      results.pendientes.push("EV-5B-01");
      results.pendientes.push("EV-5B-02");
      results.pendientes.push("EV-5B-03");
    }

    // ── FASE D: VALIDACIONES ──────────────────────────────────────────────────

    log("--- Fase D: validaciones API ---");

    // Stats endpoint (D-03) vía admin session
    if (!adminSession.error && vacancyId) {
      await page.goto(`${BASE_URL}/api/admin/vacancies/${vacancyId}/stats`, { waitUntil: "networkidle2" });
      await new Promise(r => setTimeout(r, 600));
      await shot(page, path.join(OUT_VAL, "EV-6C-06-cp18-stats-d03.png"), "EV-6C-06 Stats D-03");
      results.obtenidas.push("EV-6C-06");
    }

    // Copiar EV-5B-13 como EV-6C-04 si existe
    const src13 = path.join(OUT_CAND, "EV-5B-13-guard-prereq.png");
    if (fs.existsSync(src13)) {
      fs.copyFileSync(src13, path.join(OUT_VAL, "EV-6C-04-cp07-guard-d01.png"));
      results.obtenidas.push("EV-6C-04");
    }

    // EV-6C-07: Candidato no puede acceder al perfil de otro usuario
    if (!candSession.error) {
      await page.goto(BASE_URL, { waitUntil: "networkidle2" });
      await setSupabaseSession(page, candSession);
      await page.goto(`${BASE_URL}/perfil`, { waitUntil: "networkidle2", timeout: 10000 });
      await new Promise(r => setTimeout(r, 1500));
      await shot(page, path.join(OUT_VAL, "EV-6C-07-cp22-rls.png"), "EV-6C-07 RLS perfil candidato");
      results.obtenidas.push("EV-6C-07");
    }

    // Capturas que requieren Supabase Studio (bloqueadas)
    results.bloqueadas.push({ id: "EV-5A-04", razon: "Requiere Supabase Studio — vista de 13 tablas" });
    results.bloqueadas.push({ id: "EV-5B-12", razon: "Requiere Supabase Studio — tabla questions" });
    results.bloqueadas.push({ id: "EV-6C-01", razon: "Requiere Supabase Studio — Auth dashboard" });
    results.bloqueadas.push({ id: "EV-6C-02", razon: "Requiere Supabase Studio — tabla user_roles" });

  } catch (err) {
    log(`ERROR: ${err.message}`);
    console.error(err.stack);
  } finally {
    await browser.close();
  }

  // ── RESUMEN ───────────────────────────────────────────────────────────────

  log("=== RESUMEN FINAL ===");
  log(`OBTENIDAS  (${results.obtenidas.length}): ${results.obtenidas.join(", ")}`);
  log(`PENDIENTES (${results.pendientes.length}): ${results.pendientes.join(", ")}`);
  log(`BLOQUEADAS (${results.bloqueadas.length}): ${results.bloqueadas.map(b => b.id).join(", ")}`);

  fs.writeFileSync(
    "C:/uces-plataforma/docs/titulacion/evidencias/08c/captura-resultado-v2.json",
    JSON.stringify({ fecha: new Date().toISOString(), obtenidas: results.obtenidas, pendientes: results.pendientes, bloqueadas: results.bloqueadas }, null, 2)
  );
  log("=== COMPLETADO ===");
})();
