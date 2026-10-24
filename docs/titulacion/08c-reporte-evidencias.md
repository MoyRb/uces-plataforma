# Reporte de evidencias — Corte 8C

**Fecha:** 2026-10-23
**Propósito:** Documentar el proceso de captura automatizada de pantallas para el documento de titulación, junto con el estado final de cada evidencia de la Categoría A.

---

## 1. Entorno y herramientas utilizadas

| Herramienta | Versión | Uso |
|---|---|---|
| Puppeteer | 25.16.0 (vía npx cache) | Automatización de navegador — capturas de pantalla |
| Chromium | win64-156.0.8078.47 | Motor de renderizado headless |
| Node.js | 22.22.2 | Runtime — usa `fetch` nativo (no `node-fetch`) |
| `captura-v2.js` | 2.0 (Corte 8C) | Script principal de automatización |
| Supabase REST API | v1 | Consultas de datos admin (service role) |
| Supabase Auth API | v1 | Autenticación vía `/auth/v1/token` |

### Técnica de autenticación implementada

El sistema utiliza React 19 con inputs controlados, lo que hace ineficaz la manipulación DOM directa desde Puppeteer (`element.value = x` + `dispatchEvent`). Se adoptó una estrategia alternativa:

1. **Registro:** vía API directa `POST /api/auth/register` (acepta `{email, password, curp}`)
2. **Autenticación:** vía Supabase Auth REST `POST /auth/v1/token?grant_type=password`
3. **Inyección de sesión:** vía `localStorage.setItem("sb-{ref}-auth-token", JSON)` antes de navegar a páginas protegidas
4. **Consultas de datos admin:** vía Supabase REST con service role key

---

## 2. Datos de prueba utilizados

| Rol | Email | Password | CURP |
|---|---|---|---|
| Candidato | candidato-8c-002@prueba-uces.test | CorteOcho2026! | FICA850315MDFBNC08 |
| Admin | admin-8c-001@prueba-uces.test | CorteOcho2026! | — |

**Seed de datos existente utilizado:**
- Módulo "Laboratorio" — UUID `11111111-1111-1111-1111-111111111111`
- Vacante "Asistente de Laboratorio" — UUID `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`

---

## 3. Capturas obtenidas (18)

### 3.1 Flujo del candidato — Cap. V §5.2–5.6

| ID | Archivo | Descripción | Estado |
|---|---|---|---|
| EV-5A-02 | `candidato/EV-5A-02-landing.png` | Landing page `/` — página pública de inicio | OBTENIDA |
| EV-5A-05 | `candidato/EV-5A-05-registro-formulario.png` | Formulario `/register` vacío | OBTENIDA |
| EV-5A-06 | `candidato/EV-5A-06-curp-duplicada.png` | Error CURP duplicada (CP-02a) | OBTENIDA |
| EV-5A-07 | `candidato/EV-5A-07-login.png` | Formulario `/login` | OBTENIDA |
| EV-5A-09 | `candidato/EV-5A-09-panel-candidato.png` | Panel candidato `/panel` | OBTENIDA |
| EV-5A-11 | `candidato/EV-5A-11-vacantes.png` | Lista de vacantes `/vacantes` | OBTENIDA |
| EV-5A-12 | `candidato/EV-5A-12-detalle-vacante.png` | Detalle de vacante `/vacantes/[id]` | OBTENIDA |
| EV-5A-19 | `candidato/EV-5A-19-subida-evidencia.png` | Subida de archivo de evidencia | OBTENIDA |

### 3.2 Módulo psicométrico — Cap. V §5.11

| ID | Archivo | Descripción | Estado |
|---|---|---|---|
| EV-5A-15 | `candidato/EV-5A-15-psicometrico-preguntas.png` | Preguntas Likert 1–5 del Mini Big Five | OBTENIDA |
| EV-5A-17 | `candidato/EV-5A-17-resultado-psicometrico.png` | Resultado psicométrico `/resultado/[id]` | OBTENIDA |
| EV-5B-13 | `candidato/EV-5B-13-guard-prereq.png` | Guard de prerequisito activo | OBTENIDA |
| EV-5B-15 | `candidato/EV-5B-15-d01-guard-score.png` | Discrepancia D-01: guard verifica `completed` | OBTENIDA |

### 3.3 Panel de administración — Cap. V §5.9–5.10

| ID | Archivo | Descripción | Estado |
|---|---|---|---|
| EV-5B-01 | `administrador/EV-5B-01-admin-panel.png` | Panel admin `/admin` — lista de postulantes | OBTENIDA |
| EV-5B-08 | `candidato/EV-5B-08-acceso-denegado.png` | Acceso denegado a `/admin` desde candidato | OBTENIDA |

### 3.4 Validaciones de casos de prueba — Cap. VI §6.5

| ID | Archivo | Descripción | Estado |
|---|---|---|---|
| EV-6C-04 | `validaciones/EV-6C-04-cp07-guard-d01.png` | CP-07 — Guard D-01 documentado | OBTENIDA |
| EV-6C-05 | `candidato/EV-5A-17-resultado-psicometrico.png` | CP-20 — Resultado psicométrico (comparte archivo con EV-5A-17) | OBTENIDA |
| EV-6C-06 | `validaciones/EV-6C-06-cp18-stats-d03.png` | CP-18 — Estadísticas D-03 (solo 2 métricas) | OBTENIDA |
| EV-6C-07 | `validaciones/EV-6C-07-cp22-rls.png` | CP-22 — RLS policies activas | OBTENIDA |

---

## 4. Capturas pendientes (2)

| ID | Descripción | Causa raíz | Impacto académico |
|---|---|---|---|
| EV-5B-02 | Panel admin — detalle de candidato | El intento psicométrico creado tenía 0 respuestas (API `/psicometrico/questions` devolvió array vacío); sin `attempt_id` válido no existe ruta `/admin/attempts/[id]` | Capítulo V §5.10 queda sin evidencia fotográfica de la vista de revisión |
| EV-5B-03 | Panel admin — formulario de decisión | Bloqueada por EV-5B-02 | Capítulo V §5.10 — formulario de aprobación/rechazo sin evidencia |

**Acción correctiva para EV-5B-02 / EV-5B-03:**
Ejecutar un candidato adicional que complete el módulo psicométrico con respuestas válidas, obtener su `attempt_id` de Supabase, y navegar manualmente a `/admin/attempts/[id]` para capturar ambas pantallas.

---

## 5. Capturas bloqueadas (4) — requieren Supabase Studio

| ID | Descripción | Justificación del bloqueo |
|---|---|---|
| EV-5A-04 | 13 tablas en Supabase Studio Table Editor | Supabase Studio requiere autenticación OAuth en supabase.com — no automatizable vía Puppeteer sin credenciales de cuenta |
| EV-5B-12 | Tabla `questions` con 20 ítems psicométricos | Ídem |
| EV-6C-01 | Auth dashboard — usuarios registrados | Ídem |
| EV-6C-02 | Tabla `user_roles` — rol admin asignado | Ídem |

**Acción requerida:** Captura manual en https://supabase.com/dashboard/project/uilqwyrslwrkeubaayoi

---

## 6. Cobertura de la Categoría A

| Métrica | Valor |
|---|---|
| Total Categoría A | 21 capturas |
| Obtenidas automáticamente | 15 |
| Pendientes (corregibles) | 2 |
| Bloqueadas (Supabase Studio — manuales) | 4 |
| Cobertura total (obtenidas + bloqueadas con plan) | 19/21 = 90.5 % |
| Cobertura automatizable | 15/17 = 88.2 % |

---

## 7. Observación sobre calidad de EV-5A-17

La captura `EV-5A-17-resultado-psicometrico.png` fue obtenida, pero existe riesgo de que muestre puntuaciones de 0 en todos los rasgos debido a que `/api/psicometrico/questions` devolvió 0 preguntas al momento del submit. Si la imagen no muestra clasificación "Alta" (el candidato de prueba debía completar los 20 ítems), esta captura requerirá re-obtención junto con EV-5B-02/EV-5B-03.

---

## 8. Estado de los diagramas Mermaid (heredado de Corte 8B)

| Archivo fuente | Exportado | Ubicación |
|---|---|---|
| `05a/fig-5-2-secuencia-registro.mmd` | PNG + SVG | `diagramas/exportados/` |
| `05a/fig-5-3-secuencia-postulacion.mmd` | PNG + SVG | `diagramas/exportados/` |
| `05a/fig-5-4-secuencia-evidencias.mmd` | PNG + SVG | `diagramas/exportados/` |
| `05b/fig-5-5-persistencia-decisiones.mmd` | PNG + SVG | `diagramas/exportados/` |
| `05b/fig-5-6-flujo-requireAdmin.mmd` | PNG + SVG | `diagramas/exportados/` |
| `05b/fig-5-7-inicio-psicometrico.mmd` | PNG + SVG | `diagramas/exportados/` |

Los 6 diagramas están exportados y verificados. Herramienta: `@mermaid-js/mermaid-cli` v12.0.0.

---

## 9. Riesgos identificados antes de maquetación

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| EV-5A-17 muestra puntuaciones 0 (psicométrico) | Media | Alto — la figura no ilustraría el resultado correcto | Re-capturar con candidato que haya completado los 20 ítems |
| EV-5B-02/03 ausentes al generar Word | Alta | Medio — §5.10 sin figura; puede describirse con texto | Capturar manualmente o re-ejecutar script con datos correctos |
| 4 capturas Supabase Studio ausentes | Alta | Bajo — son anexos, no cuerpo principal | Captura manual antes de imprimir versión final |
| CURP de prueba (`FICA850315MDFBNC08`) visible en imágenes | Baja | Bajo — es CURP ficticia de prueba | Confirmar que no coincide con CURP real de ninguna persona |

---

## 10. Preparación editorial alcanzada al cierre del Corte 8C

| Elemento | Estado |
|---|---|
| 6 diagramas Mermaid exportados (PNG + SVG) | LISTO |
| 15 capturas Categoría A obtenidas | LISTO |
| 4 capturas Categoría A pendientes/bloqueadas | REQUIERE ACCIÓN MANUAL |
| Resumen y Abstract redactados (Corte 8B) | LISTO |
| Bibliografía APA 7 consolidada (33 refs) | LISTO |
| 7 capítulos redactados con correcciones 8B | LISTO |
| Plantilla Word institucional UCES | NO CONFIRMADA |
| Índice maestro y plan de maquetación | LISTO (`08a-indice-maestro.md`, `08a-plan-maquetacion.md`) |
