# Matriz de resultados — Corte 6B

**Fecha:** 2026-10-22
**Sesión:** 6B-S1 — Ejecución funcional real

---

## Tabla consolidada de resultados

| ID | Nombre | Tipo | Estado | HTTP | Evidencia | RF relacionado | Discrepancia |
|---|---|---|---|---|---|---|---|
| CP-01 | Registro de candidato | Funcional | **APROBADO** | 201 | EV-6B-01 | RF-01 | — |
| CP-02a | Registro CURP duplicada | Funcional | **APROBADO** | 400 | EV-6B-02 | RF-01 | — |
| CP-02b | Login exitoso | Funcional | **APROBADO** | — | EV-6B-03 | RF-02 | — |
| CP-03 | Protección admin vs candidato | Seguridad | **APROBADO** | 403 | EV-6B-04 | RF-16 | — |
| CP-04 | Estado panel candidato | Funcional | **PARCIAL** | — | — | RF-04 | — |
| CP-05 | Catálogo de vacantes | Funcional | **PARCIAL** | — | — | RF-05 | — |
| CP-06 | Detalle de vacante | Funcional | **PARCIAL** | — | — | RF-06 | — |
| CP-07 | Guard psicométrico — bloqueo | Funcional | **APROBADO** | 403 | EV-6B-05 | RF-03, RF-07 | D-01 (parcial) |
| CP-08 | Guard psicométrico — permiso | Funcional | **APROBADO** | 200 | EV-6B-08 | RF-07 | D-01 (confirmada) |
| CP-09 | Idempotencia de postulación | Funcional | **APROBADO** | 200 | EV-6B-09 | RF-09 | — |
| CP-10 | Evaluación — envío de respuestas | Funcional | **APROBADO PARCIAL** | 200/400 | EV-6B-10, EV-6B-11 | RF-10 | INC-6B-01 |
| CP-11 | Timeout — envío automático | Funcional | **BLOQUEADO** | — | — | RF-11 | D-03 (no prob.) |
| CP-12 | Subida de evidencia | Funcional | **APROBADO** | — | EV-6B-12 | RF-12 | — |
| CP-13 | Submit de evaluación | Funcional | **APROBADO** | 200 | EV-6B-13 | RF-10 | — |
| CP-14 | Psicométrico completo | Funcional | **APROBADO** | 200 | EV-6B-06, EV-6B-07 | RF-03 | — |
| CP-15 | Panel admin — módulos | Funcional | **APROBADO** | 200 | EV-6B-14 | RF-13 | — |
| CP-16 | Panel admin — vacantes | Funcional | **APROBADO** | 200 | EV-6B-15 | RF-14 | — |
| CP-17 | Panel admin — evaluaciones | Funcional | **APROBADO** | 200 | EV-6B-16 | RF-14, RF-15 | — |
| CP-18 | Stats de vacante | Funcional | **APROBADO** | 200 | EV-6B-17 | RF-17 | D-03 (confirmada) |
| CP-19 | Detalle de intento admin | Funcional | **APROBADO** | 200 | EV-6B-18 | RF-15 | — |
| CP-20 | Decisión admin | Funcional | **APROBADO PARCIAL** | 200 | EV-6B-19 | RF-18 | D-02 (confirmada/INC-6B-02) |
| CP-21 | Descarga de evidencia | Funcional | **APROBADO** | — | EV-6B-20 | RF-12 | — |
| CP-22 | Seguridad token inválido | Seguridad | **APROBADO** | 401 | EV-6B-21 | RF-16 | — |

---

## Resumen por estado

| Estado | Cantidad | % |
|---|---|---|
| APROBADO | 16 | 72.7% |
| APROBADO PARCIAL | 2 | 9.1% |
| PARCIAL (sin endpoint) | 3 | 13.6% |
| BLOQUEADO | 1 | 4.5% |
| FALLIDO | 0 | 0% |
| **Total** | **22** | **100%** |

> **Corrección C6-01 (2026-10-23):** El conteo original reportaba APROBADO=14. La conciliación (`07-conciliacion-pruebas.md`) identificó que CP-18 y CP-19 —ambos APROBADO con evidencias EV-6B-17 y EV-6B-18— fueron omitidos del conteo de resumen. El conteo corregido es APROBADO=16 (16+2+3+1=22).

---

## Estado de verificación de discrepancias

| Discrepancia | Verificación estática | Verificación empírica | Estado final |
|---|---|---|---|
| D-01 — Guard completitud no score | EE-08 (CONFIRMADA) | CP-07/CP-08 | **CONFIRMADA** (código + comportamiento) |
| D-02 — `reviews` como almacén primario | EE-09 (CONFIRMADA) | CP-20 — `decision_source:"attempts"` | **CONFIRMADA CON MATIZ** (INC-6B-02) |
| D-03 — Stats endpoint reducido | Lectura de endpoint | CP-18 — 2 métricas | **CONFIRMADA EMPÍRICAMENTE** |
| D-04 — Rol reviewer inoperativo | EE-05 (CONFIRMADA) | Sin CP directo | **CONFIRMADA ESTÁTICAMENTE** |
| D-05 — Lista de exclusión | Schema sin tabla | Sin CP directo | **CONFIRMADA ESTÁTICAMENTE** |

---

## Incidencias funcionales detectadas

| ID | CP | Severidad | Descripción | Estado |
|---|---|---|---|---|
| INC-6B-01 | CP-10 | Baja | UPSERT respuestas falla al cambiar opción (missing `onConflict`) | DOCUMENTADA |
| INC-6B-02 | CP-20 | Media | `upsertReview` falla por schema mismatch; usa fallback `attempts.decision` | DOCUMENTADA |

---

## Casos PARCIAL — justificación

Los casos CP-04, CP-05 y CP-06 se marcan PARCIAL porque no tienen endpoints REST propios:

- **CP-04 (panel):** La página `/panel` es un Server Component que accede a Supabase directamente. Los datos de estado (psicométrico completado, módulos activos) se confirman indirectamente vía DB queries y CP-14.
- **CP-05 (catálogo):** La página `/vacantes` accede a Supabase client-side. Los datos de vacantes se confirman vía query directa a DB (5 vacantes `open` encontradas).
- **CP-06 (detalle vacante):** Similarmente sin endpoint; los datos se confirman en DB.

Estos casos corresponden a RF implementados mediante acceso directo desde componentes React, no mediante API routes — un patrón válido en Next.js App Router.
