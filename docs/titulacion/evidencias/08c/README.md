# Evidencias Corte 8C — Índice central

**Fecha de captura:** 2026-10-23
**Herramienta:** Puppeteer 25.16.0 vía `captura-v2.js`
**Aplicación objetivo:** https://uces-plataforma.vercel.app
**Supabase proyecto:** UcesCap (ref: uilqwyrslwrkeubaayoi)

---

## Resumen de resultados

| Estado | Cantidad | Detalles |
|---|---|---|
| OBTENIDAS | 18 | 15 Categoría A + 3 suplementarias/validación |
| PENDIENTES | 2 | EV-5B-02, EV-5B-03 (require datos de revisión admin) |
| BLOQUEADAS | 4 | Requieren Supabase Studio (acceso manual) |
| **Cobertura Cat. A** | **15/21** | 71.4 % automatizable |

---

## Subcarpeta: `candidato/`

| Archivo | ID | Descripción | Capítulo |
|---|---|---|---|
| `EV-5A-02-landing.png` | EV-5A-02 | Landing page (/) — página de inicio pública | Cap. V §5.2 |
| `EV-5A-05-registro-formulario.png` | EV-5A-05 | Formulario /register vacío | Cap. V §5.3 |
| `EV-5A-05b-registro-completo.png` | EV-5A-05b | Formulario /register con datos (suplementaria) | Cap. V §5.3 |
| `EV-5A-05b-registro-lleno.png` | — | Captura auxiliar del formulario de registro | — |
| `EV-5A-06-curp-duplicada.png` | EV-5A-06 | Error CURP duplicada — validación CP-02a | Cap. V §5.3 / Cap. VI §6.5.3 |
| `EV-5A-07-login.png` | EV-5A-07 | Formulario /login | Cap. V §5.3 |
| `EV-5A-09-panel-candidato.png` | EV-5A-09 | Panel candidato /panel — módulos disponibles | Cap. V §5.4 |
| `EV-5A-11-vacantes.png` | EV-5A-11 | Lista de vacantes /vacantes | Cap. V §5.5 |
| `EV-5A-12-detalle-vacante.png` | EV-5A-12 | Detalle de vacante /vacantes/[id] | Cap. V §5.5 |
| `EV-5A-15-psicometrico-preguntas.png` | EV-5A-15 | Pantalla de preguntas psicométricas Likert | Cap. V §5.11 |
| `EV-5A-17-resultado-psicometrico.png` | EV-5A-17 / EV-6C-05 | Resultado psicométrico /resultado/[id] | Cap. V §5.11 / Cap. VI §6.5 |
| `EV-5A-19-subida-evidencia.png` | EV-5A-19 | Subida de archivo de evidencia (módulo) | Cap. V §5.6 |
| `EV-5B-08-acceso-denegado.png` | EV-5B-08 | Acceso denegado desde candidato a /admin | Cap. V §5.9 |
| `EV-5B-08-acceso-denegado-admin.png` | — | Variante acceso denegado (suplementaria) | Cap. V §5.9 |
| `EV-5B-13-guard-prereq.png` | EV-5B-13 | Guard prerequisito psicométrico activo | Cap. V §5.11 |
| `EV-5B-15-d01-guard-score.png` | EV-5B-15 | Discrepancia D-01: guard verifica `completed` no score | Cap. V §5.11 |

---

## Subcarpeta: `administrador/`

| Archivo | ID | Descripción | Capítulo |
|---|---|---|---|
| `EV-5B-01-admin-panel.png` | EV-5B-01 | Panel de administración /admin | Cap. V §5.9 |

---

## Subcarpeta: `validaciones/`

| Archivo | ID | Descripción | Capítulo / Caso de prueba |
|---|---|---|---|
| `EV-6C-04-cp07-guard-d01.png` | EV-6C-04 | CP-07 — Guard D-01 (verifica `completed`, no score) | Cap. VI §6.5.3 CP-07 |
| `EV-6C-06-cp18-stats-d03.png` | EV-6C-06 | CP-18 — Estadísticas D-03 (solo 2 métricas) | Cap. VI §6.5.3 CP-18 |
| `EV-6C-07-cp22-rls.png` | EV-6C-07 | CP-22 — RLS policies activas (API test) | Cap. VI §6.5.3 CP-22 |

---

## Capturas PENDIENTES

| ID | Descripción | Razón | Acción requerida |
|---|---|---|---|
| EV-5B-02 | Panel admin — detalle candidato específico | El intento psicométrico del candidato de prueba no tenía respuestas (API devolvió 0 preguntas) | Ejecutar con candidato que haya completado el flujo completo; capturar /admin/attempts/[id] |
| EV-5B-03 | Panel admin — formulario de decisión | Bloqueada por EV-5B-02 | Capturar junto con EV-5B-02 |

---

## Capturas BLOQUEADAS (requieren Supabase Studio)

| ID | Descripción | Razón | Alternativa sugerida |
|---|---|---|---|
| EV-5A-04 | Vista de 13 tablas en Supabase Studio | Requiere sesión autenticada en supabase.com | Captura manual en https://supabase.com/dashboard |
| EV-5B-12 | Tabla `questions` con 20 ítems en Supabase Studio | Ídem | Captura manual |
| EV-6C-01 | Auth dashboard — lista de usuarios registrados | Ídem | Captura manual |
| EV-6C-02 | Tabla `user_roles` — rol admin asignado | Ídem | Captura manual |

---

## Datos de prueba creados en Supabase (UcesCap)

| Rol | Email | UUID |
|---|---|---|
| admin | admin-8c-001@prueba-uces.test | 77452eac-fb7e-4838-8a05-c9ca074abbf3 |
| candidato | candidato-8c-002@prueba-uces.test | 6285a348-... |

> **Nota:** Estos usuarios fueron creados en el proyecto Supabase de producción UcesCap durante la automatización del Corte 8C. No deben eliminarse hasta que el documento final esté aprobado por el asesor.

---

## Scripts de automatización

| Archivo | Descripción |
|---|---|
| `captura-v2.js` | Script Puppeteer v2 — versión funcional con inyección de sesión vía localStorage |
| `captura-automatica.js` | Script v1 — versión descartada (falló con inputs React controlados) |
| `captura-resultado.json` | Resultado del script v1 |
| `captura-resultado-v2.json` | Resultado del script v2 — fuente de verdad |
