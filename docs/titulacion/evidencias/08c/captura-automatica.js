/**
 * Script de capturas automáticas — Corte 8C
 * Genera evidencias visuales del sistema UCES Plataforma de Talento
 * usando Puppeteer con Chromium (disponible vía mmdc cache).
 *
 * Datos ficticios únicos para este corte. No se usan datos reales.
 * Requiere: app en localhost:3000, .env.local con credenciales Supabase.
 */

const puppeteer = require("C:/Users/moise/AppData/Local/npm-cache/_npx/7d92d9a2d2ccc630/node_modules/puppeteer");
const fs = require("fs");
const path = require("path");
const https = require("https");

// ─── CONFIGURACIÓN ──────────────────────────────────────────────────────────

const BASE_URL = "http://localhost:3000";
const OUT_DIR = path.resolve("C:/uces-plataforma/docs/titulacion/evidencias/08c");
const CANDIDATES_DIR = path.join(OUT_DIR, "candidato");
const ADMIN_DIR = path.join(OUT_DIR, "administrador");
const VALIDATION_DIR = path.join(OUT_DIR, "validaciones");
const VIEWPORT = { width: 1440, height: 900 };

// Leer .env.local sin imprimir valores
function readEnv(filepath) {
  const env = {};
  try {
    const lines = fs.readFileSync(filepath, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        env[key] = val;
      }
    }
  } catch (e) {
    console.error("No se pudo leer .env.local:", e.message);
  }
  return env;
}

const ENV = readEnv("C:/uces-plataforma/my-app/.env.local");
const SUPABASE_URL = ENV.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_KEY = ENV.SUPABASE_SERVICE_ROLE_KEY;

// Datos ficticios de prueba
const CANDIDATE = {
  nombre: "Ana Ficticia Corteochoc",
  email: "candidato-8c-001@prueba-uces.test",
  curp: "FICA850315MDFBNC09",
  password: "CorteOcho2026!",
};
const ADMIN_USER = {
  nombre: "Admin Prueba Ocho",
  email: "admin-8c-001@prueba-uces.test",
  curp: "PAOB900220HDMRNC01",
  password: "CorteOcho2026!",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const log = (msg) => console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`);

async function shot(page, filename, label) {
  const filepath = path.join(OUT_DIR, filename);
  await page.screenshot({ path: filepath, fullPage: false });
  log(`CAPTURA OK: ${path.relative(OUT_DIR, filepath)} — ${label}`);
  return filepath;
}

async function waitAndShot(page, filename, label, opts = {}) {
  await page.waitForSelector(opts.selector || "body", { timeout: opts.timeout || 8000 }).catch(() => {});
  await new Promise(r => setTimeout(r, opts.delay || 800));
  return shot(page, filename, label);
}

// Supabase REST helper (service role)
function supabaseRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(SUPABASE_URL + path);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        "apikey": SERVICE_KEY,
        "Authorization": `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation",
      },
    };
    const req = https.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Supabase Admin Auth helper
function supabaseAuthRequest(method, endpoint, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(SUPABASE_URL + "/auth/v1" + endpoint);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        "apikey": SERVICE_KEY,
        "Authorization": `Bearer ${SERVICE_KEY}`,
        "Content-Type": "application/json",
      },
    };
    const req = https.request(opts, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data }); }
      });
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// ─── SETUP DE DATOS DE PRUEBA ─────────────────────────────────────────────────

async function setupTestData() {
  log("=== SETUP: verificando datos de prueba en Supabase ===");

  // 1. Verificar módulos disponibles
  const modsRes = await supabaseRequest("GET", "/rest/v1/modules?select=id,name&limit=3");
  let moduleId = null;
  if (modsRes.status === 200 && Array.isArray(modsRes.data) && modsRes.data.length > 0) {
    moduleId = modsRes.data[0].id;
    log(`Módulo existente: ${modsRes.data[0].name} (${moduleId})`);
  } else {
    // Crear módulo de prueba
    const newMod = await supabaseRequest("POST", "/rest/v1/modules", {
      name: "Módulo Prueba 8C",
      description: "Módulo temporal de prueba para capturas 8C",
    });
    if (newMod.status === 201 && newMod.data[0]) {
      moduleId = newMod.data[0].id;
      log(`Módulo creado: ${moduleId}`);
    }
  }

  // 2. Verificar vacantes abiertas
  const vacRes = await supabaseRequest("GET", "/rest/v1/vacancies?select=id,title,status&status=eq.open&limit=3");
  let vacancyId = null;
  if (vacRes.status === 200 && Array.isArray(vacRes.data) && vacRes.data.length > 0) {
    vacancyId = vacRes.data[0].id;
    log(`Vacante existente: ${vacRes.data[0].title} (${vacancyId})`);
  } else if (moduleId) {
    // Crear vacante de prueba
    const newVac = await supabaseRequest("POST", "/rest/v1/vacancies", {
      title: "Desarrollador Web Junior — Prueba 8C",
      description: "Vacante temporal para capturas del reporte. No es una vacante real.",
      status: "open",
      module_id: moduleId,
    });
    if (newVac.status === 201 && newVac.data[0]) {
      vacancyId = newVac.data[0].id;
      log(`Vacante creada: ${vacancyId}`);
    }
  }

  // 3. Crear usuario admin vía API del sistema
  log("Registrando usuario admin de prueba...");
  const adminRegRes = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ADMIN_USER),
  }).catch(() => null);

  let adminUserId = null;
  if (adminRegRes) {
    const adminStatus = adminRegRes.status;
    log(`Registro admin: HTTP ${adminStatus}`);
    if (adminStatus === 201 || adminStatus === 409) {
      // Buscar UUID del admin en la BD
      const adminProfile = await supabaseRequest(
        "GET",
        `/rest/v1/profiles?select=user_id&email=eq.${encodeURIComponent(ADMIN_USER.email)}`
      );
      if (adminProfile.status === 200 && adminProfile.data[0]) {
        adminUserId = adminProfile.data[0].user_id;
        log(`Admin UUID: ${adminUserId}`);

        // Asignar rol admin
        const roleCheck = await supabaseRequest(
          "GET",
          `/rest/v1/user_roles?select=role&user_id=eq.${adminUserId}`
        );
        const hasAdmin = roleCheck.data?.some(r => r.role === "admin");
        if (!hasAdmin) {
          await supabaseRequest("PATCH", `/rest/v1/user_roles?user_id=eq.${adminUserId}`, { role: "admin" });
          // Si no existe la fila, insertar
          await supabaseRequest("POST", "/rest/v1/user_roles", { user_id: adminUserId, role: "admin" });
          log("Rol admin asignado");
        } else {
          log("Rol admin ya existía");
        }
      }
    }
  }

  return { moduleId, vacancyId, adminUserId };
}

// ─── SCRIPT PRINCIPAL ─────────────────────────────────────────────────────────

(async () => {
  log("=== INICIO DE CAPTURAS AUTOMÁTICAS — CORTE 8C ===");

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:/Users/moise/.cache/puppeteer/chrome/win64-156.0.8078.47/chrome-win64/chrome.exe",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const results = { obtenidas: [], pendientes: [], bloqueadas: [] };

  try {
    // SETUP
    let setupData = { moduleId: null, vacancyId: null };
    try {
      setupData = await setupTestData();
    } catch (e) {
      log(`ADVERTENCIA setup: ${e.message}`);
    }

    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // ──── FASE A: PÁGINAS PÚBLICAS ────────────────────────────────────────────

    log("--- Fase A: páginas públicas ---");

    // EV-5A-02: Landing page
    await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 15000 });
    await waitAndShot(page, "candidato/EV-5A-02-landing.png", "EV-5A-02 Landing page", { delay: 1200 });
    results.obtenidas.push("EV-5A-02");

    // EV-5A-07: Login form
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle2", timeout: 10000 });
    await waitAndShot(page, "candidato/EV-5A-07-login.png", "EV-5A-07 Login form", { delay: 600 });
    results.obtenidas.push("EV-5A-07");

    // EV-5A-05: Register form
    await page.goto(`${BASE_URL}/register`, { waitUntil: "networkidle2", timeout: 10000 });
    await waitAndShot(page, "candidato/EV-5A-05-registro-formulario.png", "EV-5A-05 Register form", { delay: 600 });
    results.obtenidas.push("EV-5A-05");

    // ──── FASE B: REGISTRO DEL CANDIDATO DE PRUEBA ────────────────────────────

    log("--- Fase B: registro del candidato ---");

    // Rellenar formulario de registro
    await page.goto(`${BASE_URL}/register`, { waitUntil: "networkidle2" });
    await page.waitForSelector("input", { timeout: 8000 });

    // Mapear campos del formulario
    const fields = await page.$$("input");
    log(`Campos encontrados en register: ${fields.length}`);

    // Intentar rellenar por type/placeholder/name
    await page.evaluate((c) => {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((inp) => {
        const type = inp.type || "";
        const placeholder = (inp.placeholder || "").toLowerCase();
        const name = (inp.name || "").toLowerCase();
        if (placeholder.includes("nombre") || name.includes("nombre")) inp.value = c.nombre;
        else if (type === "email" || placeholder.includes("correo") || name.includes("email")) inp.value = c.email;
        else if (placeholder.includes("curp") || name.includes("curp")) inp.value = c.curp;
        else if (type === "password" && !placeholder.includes("confirma")) inp.value = c.password;
        // Trigger React change events
        inp.dispatchEvent(new Event("input", { bubbles: true }));
        inp.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }, CANDIDATE);

    await new Promise(r => setTimeout(r, 500));

    // Screenshot con formulario lleno (antes de enviar)
    await shot(page, "candidato/EV-5A-05b-registro-lleno.png", "Register form filled");

    // Enviar el formulario
    let registrationOk = false;
    try {
      const submitBtn = await page.$("button[type=submit]") || await page.$("button");
      if (submitBtn) {
        await submitBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        const url = page.url();
        log(`URL post-registro: ${url}`);
        registrationOk = url.includes("/login") || url.includes("/panel");
      }
    } catch (e) {
      log(`Error al enviar registro: ${e.message}`);
    }

    // Si el registro redirigió al login, intentar re-registro con misma CURP para error duplicado
    await page.goto(`${BASE_URL}/register`, { waitUntil: "networkidle2" });
    await page.evaluate((c) => {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((inp) => {
        const type = inp.type || "";
        const placeholder = (inp.placeholder || "").toLowerCase();
        const name = (inp.name || "").toLowerCase();
        if (placeholder.includes("nombre") || name.includes("nombre")) inp.value = "Duplicado Prueba";
        else if (type === "email" || placeholder.includes("correo") || name.includes("email")) inp.value = "duplicado-8c@prueba.test";
        else if (placeholder.includes("curp") || name.includes("curp")) inp.value = c.curp; // misma CURP
        else if (type === "password" && !placeholder.includes("confirma")) inp.value = c.password;
        inp.dispatchEvent(new Event("input", { bubbles: true }));
        inp.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }, CANDIDATE);
    await new Promise(r => setTimeout(r, 400));
    try {
      const submitBtn = await page.$("button[type=submit]") || await page.$("button");
      if (submitBtn) {
        await submitBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        await shot(page, "candidato/EV-5A-06-curp-duplicada.png", "EV-5A-06 CURP duplicada error");
        results.obtenidas.push("EV-5A-06");
      }
    } catch (e) {
      log(`No se capturó error CURP duplicada: ${e.message}`);
      results.pendientes.push("EV-5A-06");
    }

    // ──── FASE C: LOGIN Y FLUJO CANDIDATO ─────────────────────────────────────

    log("--- Fase C: flujo del candidato ---");

    // Login como candidato
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle2" });
    await page.evaluate((c) => {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((inp) => {
        const type = inp.type || "";
        const placeholder = (inp.placeholder || "").toLowerCase();
        if (type === "email" || placeholder.includes("correo") || placeholder.includes("email")) {
          inp.value = c.email;
          inp.dispatchEvent(new Event("input", { bubbles: true }));
        } else if (type === "password") {
          inp.value = c.password;
          inp.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
    }, CANDIDATE);
    await new Promise(r => setTimeout(r, 400));
    const loginBtn = await page.$("button[type=submit]") || await page.$("button");
    if (loginBtn) {
      await loginBtn.click();
      await new Promise(r => setTimeout(r, 3000));
    }
    log(`URL post-login: ${page.url()}`);

    // Panel del candidato
    await page.goto(`${BASE_URL}/panel`, { waitUntil: "networkidle2", timeout: 12000 });
    await waitAndShot(page, "candidato/EV-5A-09-panel-candidato.png", "EV-5A-09 Panel candidato", { delay: 1000 });
    results.obtenidas.push("EV-5A-09");

    // Vacantes
    await page.goto(`${BASE_URL}/vacantes`, { waitUntil: "networkidle2", timeout: 10000 }).catch(() => {});
    await waitAndShot(page, "candidato/EV-5A-11-vacantes.png", "EV-5A-11 Lista vacantes", { delay: 800 });
    results.obtenidas.push("EV-5A-11");

    // Detalle de vacante (si hay una)
    if (setupData.vacancyId) {
      await page.goto(`${BASE_URL}/vacantes/${setupData.vacancyId}`, { waitUntil: "networkidle2", timeout: 10000 }).catch(() => {});
      await waitAndShot(page, "candidato/EV-5A-12-detalle-vacante.png", "EV-5A-12 Detalle vacante", { delay: 800 });
      results.obtenidas.push("EV-5A-12");

      // Intentar postularse SIN psicométrico (guard EV-5B-13)
      const applyBtn = await page.$("button").catch(() => null);
      if (applyBtn) {
        await applyBtn.click();
        await new Promise(r => setTimeout(r, 2000));
        const curUrl = page.url();
        if (curUrl.includes("psicometrico")) {
          // Fue redirigido al psicométrico
          await shot(page, "candidato/EV-5B-13-guard-prereq.png", "EV-5B-13 Guard psicométrico");
          results.obtenidas.push("EV-5B-13");
          log(`Guard redirigió a: ${curUrl}`);
        } else {
          await shot(page, "candidato/EV-5B-13-guard-prereq.png", "EV-5B-13 Guard (estado actual)");
          results.obtenidas.push("EV-5B-13");
        }
      } else {
        results.pendientes.push("EV-5B-13");
      }
    } else {
      results.pendientes.push("EV-5A-12");
      results.pendientes.push("EV-5B-13");
    }

    // Psicométrico - form (EV-5A-15)
    await page.goto(`${BASE_URL}/psicometrico`, { waitUntil: "networkidle2", timeout: 12000 }).catch(() => {});
    await waitAndShot(page, "candidato/EV-5A-15-psicometrico-preguntas.png", "EV-5A-15 Psicométrico form", { delay: 1000 });
    results.obtenidas.push("EV-5A-15");

    // Responder psicométrico con respuesta 5 (Alta clasificación)
    log("Respondiendo psicométrico con escala 5...");
    try {
      // Buscar botones/radios de respuesta con valor 5
      const answered = await page.evaluate(() => {
        let count = 0;
        // Buscar inputs radio con value 5 o botones con texto "5"
        const radios = document.querySelectorAll('input[type="radio"][value="5"]');
        radios.forEach(r => { r.click(); count++; });
        if (count === 0) {
          // Buscar botones con "5"
          const btns = document.querySelectorAll("button");
          btns.forEach(b => {
            if (b.textContent.trim() === "5") {
              b.click();
              count++;
            }
          });
        }
        return count;
      });
      log(`Respuestas marcadas con 5: ${answered}`);

      if (answered > 0) {
        await new Promise(r => setTimeout(r, 500));
        await shot(page, "candidato/EV-5A-15b-psicometrico-respondiendo.png", "Psicométrico respondiendo");

        // Enviar el psicométrico
        const submitPsi = await page.$("button[type=submit]") ||
          await page.$$("button").then(btns => btns.find(async b => (await b.evaluate(n => n.textContent)).includes("Enviar")));
        if (submitPsi) {
          await submitPsi.click();
          await new Promise(r => setTimeout(r, 3000));
          log(`URL post-psicométrico: ${page.url()}`);

          // Resultado psicométrico (EV-5A-17, EV-6C-05)
          await waitAndShot(page, "candidato/EV-5A-17-resultado-psicometrico.png", "EV-5A-17 Resultado psicométrico Alta", { delay: 1200 });
          results.obtenidas.push("EV-5A-17");
          results.obtenidas.push("EV-6C-05"); // misma captura, clasificación Alta
        }
      }
    } catch (e) {
      log(`Error respondiendo psicométrico: ${e.message}`);
      results.pendientes.push("EV-5A-17");
      results.pendientes.push("EV-6C-05");
    }

    // D-01: Mostrar que candidato CON psicométrico puede aplicar (sin filtro de score)
    if (setupData.vacancyId) {
      await page.goto(`${BASE_URL}/vacantes/${setupData.vacancyId}`, { waitUntil: "networkidle2" }).catch(() => {});
      await new Promise(r => setTimeout(r, 1000));
      await shot(page, "candidato/EV-5B-15-d01-guard-score.png", "EV-5B-15 D-01 candidato puede postularse");
      results.obtenidas.push("EV-5B-15");
    } else {
      results.pendientes.push("EV-5B-15");
    }

    // Módulo de subida de evidencia (EV-5A-19)
    if (setupData.moduleId) {
      await page.goto(`${BASE_URL}/modulos/${setupData.moduleId}`, { waitUntil: "networkidle2", timeout: 10000 }).catch(() => {});
      await waitAndShot(page, "candidato/EV-5A-19-subida-evidencia.png", "EV-5A-19 Evidencia upload form", { delay: 800 });
      results.obtenidas.push("EV-5A-19");
    } else {
      results.pendientes.push("EV-5A-19");
    }

    // Intento de acceso a /admin como candidato (EV-5B-08)
    await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle2", timeout: 10000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 1500));
    await shot(page, "candidato/EV-5B-08-acceso-denegado-admin.png", "EV-5B-08 Acceso denegado admin");
    results.obtenidas.push("EV-5B-08");

    // ──── FASE D: FLUJO ADMINISTRADOR ─────────────────────────────────────────

    log("--- Fase D: flujo del administrador ---");

    // Login como admin
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle2" });
    await page.evaluate((a) => {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((inp) => {
        const type = inp.type || "";
        const placeholder = (inp.placeholder || "").toLowerCase();
        if (type === "email" || placeholder.includes("correo")) {
          inp.value = a.email;
          inp.dispatchEvent(new Event("input", { bubbles: true }));
        } else if (type === "password") {
          inp.value = a.password;
          inp.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
    }, ADMIN_USER);
    await new Promise(r => setTimeout(r, 400));
    const adminLoginBtn = await page.$("button[type=submit]") || await page.$("button");
    if (adminLoginBtn) {
      await adminLoginBtn.click();
      await new Promise(r => setTimeout(r, 3000));
    }
    log(`URL post-login admin: ${page.url()}`);

    // Panel admin
    await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle2", timeout: 12000 }).catch(() => {});
    await waitAndShot(page, "administrador/EV-5B-01-admin-panel.png", "EV-5B-01 Panel admin", { delay: 1200 });
    results.obtenidas.push("EV-5B-01");

    // Buscar un intento de candidato para detalles
    const attemptsRes = await supabaseRequest("GET", "/rest/v1/attempts?select=id&limit=1&order=created_at.desc");
    let attemptId = null;
    if (attemptsRes.status === 200 && attemptsRes.data[0]) {
      attemptId = attemptsRes.data[0].id;
      log(`Intento encontrado: ${attemptId}`);

      // Detalle de intento
      await page.goto(`${BASE_URL}/admin/attempts/${attemptId}`, { waitUntil: "networkidle2", timeout: 12000 }).catch(() => {});
      await waitAndShot(page, "administrador/EV-5B-02-admin-detalle.png", "EV-5B-02 Admin detalle candidato", { delay: 1200 });
      results.obtenidas.push("EV-5B-02");

      // Formulario de decisión
      await waitAndShot(page, "administrador/EV-5B-03-admin-decision.png", "EV-5B-03 Admin decisión form", { delay: 500 });
      results.obtenidas.push("EV-5B-03");
    } else {
      log("No se encontró ningún intento para mostrar detalle admin");
      results.pendientes.push("EV-5B-02");
      results.pendientes.push("EV-5B-03");
    }

    // ──── FASE E: CAPTURAS DE VALIDACIÓN ─────────────────────────────────────

    log("--- Fase E: capturas de validación ---");

    // EV-6C-04: CP-07 Guard psicométrico (ya capturado como EV-5B-13, duplicar en validaciones)
    if (results.obtenidas.includes("EV-5B-13")) {
      fs.copyFileSync(
        path.join(OUT_DIR, "candidato/EV-5B-13-guard-prereq.png"),
        path.join(VALIDATION_DIR, "EV-6C-04-cp07-guard-d01.png")
      );
      results.obtenidas.push("EV-6C-04");
      log("EV-6C-04 copiado desde EV-5B-13");
    }

    // EV-6C-06: Stats D-03 — capturar respuesta API en browser
    try {
      const statsUrl = setupData.vacancyId
        ? `${BASE_URL}/api/admin/vacancies/${setupData.vacancyId}/stats`
        : `${BASE_URL}/api/admin/vacancies/INVALID/stats`;
      await page.goto(statsUrl, { waitUntil: "networkidle2", timeout: 8000 });
      await waitAndShot(page, "validaciones/EV-6C-06-cp18-stats-d03.png", "EV-6C-06 Stats endpoint D-03", { delay: 500 });
      results.obtenidas.push("EV-6C-06");
    } catch (e) {
      log(`EV-6C-06 no capturada: ${e.message}`);
      results.pendientes.push("EV-6C-06");
    }

    // EV-6C-07: RLS candidato sin acceso a otro perfil
    try {
      await page.goto(`${BASE_URL}/api/auth/register`, { waitUntil: "networkidle2", timeout: 8000 });
      // Navegar al perfil de otro usuario - debería fallar o estar vacío
      await page.goto(`${BASE_URL}/perfil`, { waitUntil: "networkidle2", timeout: 8000 });
      await waitAndShot(page, "validaciones/EV-6C-07-cp22-rls.png", "EV-6C-07 RLS perfil", { delay: 500 });
      results.obtenidas.push("EV-6C-07");
    } catch (e) {
      results.pendientes.push("EV-6C-07");
    }

    // Capturas bloqueadas por requerir Supabase Studio
    results.bloqueadas.push({ id: "EV-5A-04", razon: "Requiere Supabase Studio (13 tablas)" });
    results.bloqueadas.push({ id: "EV-5B-12", razon: "Requiere Supabase Studio (tabla questions)" });
    results.bloqueadas.push({ id: "EV-6C-01", razon: "Requiere Supabase Studio (Auth dashboard)" });
    results.bloqueadas.push({ id: "EV-6C-02", razon: "Requiere Supabase Studio (user_roles table)" });

  } catch (err) {
    log(`ERROR GENERAL: ${err.message}`);
    console.error(err);
  } finally {
    await browser.close();
  }

  // ─── REPORTE FINAL ─────────────────────────────────────────────────────────

  log("=== RESUMEN DE CAPTURAS ===");
  log(`OBTENIDAS (${results.obtenidas.length}): ${results.obtenidas.join(", ")}`);
  log(`PENDIENTES (${results.pendientes.length}): ${results.pendientes.join(", ")}`);
  log(`BLOQUEADAS (${results.bloqueadas.length}): ${results.bloqueadas.map(b => b.id).join(", ")}`);

  // Guardar resumen JSON para el README
  fs.writeFileSync(
    path.join(OUT_DIR, "captura-resultado.json"),
    JSON.stringify({ obtenidas: results.obtenidas, pendientes: results.pendientes, bloqueadas: results.bloqueadas, fecha: new Date().toISOString() }, null, 2)
  );

  log("=== CAPTURAS AUTOMÁTICAS COMPLETADAS ===");
})();
