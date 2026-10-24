# Matriz de incrementos — Requisitos por iteración

**Proyecto:** UCES Plataforma de Talento
**Fecha:** 2026-10-22
**Fuente:** Análisis del historial Git + matriz de requisitos del Trabajo A

---

## Tabla 1. Incrementos funcionales por iteración

| Iteración | Período | Funcionalidad implementada | RF relacionados | Archivos principales |
|---|---|---|---|---|
| 1 — Andamiaje | Dic 2025 | Proyecto base, esquema DB, RLS inicial, libs base | — (infraestructura) | `schema.sql`, `rls.sql`, `lib/curp.ts`, `supabaseClient.ts`, `supabaseServer.ts` |
| 2 — Flujo candidato | Dic 2025 | Login, registro con CURP, vacantes, evaluación con timer, evidencia, envío, resultado | RF-01, RF-02, RF-03, RF-04, RF-05, RF-07, RF-08, RF-09, RF-10, RF-11 | `app/register/`, `app/login/`, `app/evaluacion/`, `app/resultado/`, 3 API routes |
| 3 — Roles reales | Feb 2026 | user_roles, get_my_role() SECURITY DEFINER, acceso admin por BD | RF-03 (mejora) | `supabase/roles.sql`, `lib/auth.ts` |
| 4 — Panel admin | Feb 2026 | CRUD módulos/vacantes/assessments/preguntas/intentos, requireAdmin() | RF-13, RF-14, RF-15, RF-16, RF-17 (parcial) | 13 archivos `app/api/admin/**` |
| 5 — Estabilización | Feb 2026 | Correcciones Next.js async params, /perfil, markup, imports | RF-12 (/perfil) | Correcciones en múltiples rutas |
| 6 — Revisión admin | Feb 2026 | Detalle de intento, decisión APPROVED/REJECTED, notificaciones en /perfil | RF-17, RF-18, RF-12 (mejora) | `admin/attempts/[id]/`, `perfil/page.tsx`, migración `decision` columns |
| 7 — Psicométrico | Mar 2026 | Cuestionario Big Five, /psicometrico, scoring, resumen admin, prerequisito de postulación | RF-06, RF-07 (mejora), RF-11 (mejora), RF-17 (mejora) | `app/psicometrico/`, `lib/psicometricoResults.ts`, `lib/psicometrico.ts`, seed psicométrico, migración `psychometric_summary` |
| 8 — Ajuste final | May 2026 | Instrumento 20 ítems definitivo, migración roles, rediseño UI, types TS | RF-06 (ajuste), RF-03 (corrección) | `seed.sql`, `lib/reviewDecision.ts`, `supabase/migrations/` |

---

## Tabla 2. RF por iteración en que fue implementado

| RF | Descripción abreviada | Iteración inicial | Iteración de ajuste |
|---|---|---|---|
| RF-01 | Registro con CURP | 2 | 8 (register route, email_confirm) |
| RF-02 | Hash HMAC-SHA256 de CURP | 2 | — |
| RF-03 | Autenticación y rol | 2 | 3 (user_roles), 8 (RPC fix) |
| RF-04 | Módulos disponibles | 2 | — |
| RF-05 | Detalle de vacantes | 2 | — |
| RF-06 | Cuestionario psicométrico | 7 | 8 (20 ítems definitivos) |
| RF-07 | Postulación con prerrequisitos | 2 | 7 (verificación psicométrico) |
| RF-08 | Responder evaluación | 2 | — |
| RF-09 | Control de tiempo | 2 | — |
| RF-10 | Carga de evidencias | 2 | — |
| RF-11 | Envío y cálculo de resultados | 2 | 7 (summary JSONB) |
| RF-12 | Seguimiento en perfil | 5 | 6 (decisión visible) |
| RF-13 | Admin: gestión de módulos | 4 | — |
| RF-14 | Admin: gestión de vacantes | 4 | — |
| RF-15 | Admin: configurar evaluaciones | 4 | — |
| RF-16 | Admin: CRUD preguntas | 4 | 5 (normalización opciones) |
| RF-17 | Admin: consulta revisión | 4 | 6 (detalle), 7 (Big Five) |
| RF-18 | Admin: registrar valoración | 6 | 6 (fallback decision) |

---

## Tabla 3. Problemas técnicos documentados

| ID | Problema | Iteración detectado | Commits de solución | RF afectados |
|---|---|---|---|---|
| T-01 | Parámetros async en Next.js App Router | 5 | `c77284d`, `518e343`, `9563ccc`, `0905c1c`, `4075114` | RF-04, RF-05, RF-08, RF-09 |
| T-02 | Circularidad en políticas RLS al verificar rol | 3 | `4d9f058`, `ca422c8` | RF-03, todos los admin |
| T-03 | Tipado de relaciones anidadas en Supabase SDK | 8 | `4075114` | RF-11 |
| T-04 | Columna psychometric_summary ausente en producción | 7 | `d7c0824` (incluye fallback) | RF-11 |
| T-05 | Enumerado de decisiones sin tipo centralizado | 8 | `0b84137` | RF-18 |

---

## Tabla 4. Relación entre RF del Trabajo A e incrementos del Trabajo B

Esta tabla confirma que no existe ningún RF del Trabajo A que haya quedado sin implementación al término del proyecto.

| RF | Estado final | Observación de implementación |
|---|---|---|
| RF-01 | COMPLETO | Registro transaccional con rollback |
| RF-02 | COMPLETO | HMAC-SHA256 con UNIQUE index |
| RF-03 | COMPLETO | user_roles + fallback + RPC corregido |
| RF-04 | COMPLETO | Server Component con query directa |
| RF-05 | COMPLETO | Detalle completo con async params |
| RF-06 | COMPLETO | 20 ítems Big Five, UUID fijo |
| RF-07 | COMPLETO* | *Ver discrepancia D-01: verifica `completed`, no score |
| RF-08 | COMPLETO | Upsert por pregunta, deadline_at validado |
| RF-09 | COMPLETO | Timer cliente + validación servidor |
| RF-10 | COMPLETO | Bucket privado, signed URLs |
| RF-11 | COMPLETO | Summary JSONB + theory_score |
| RF-12 | COMPLETO | /perfil con historial y decisión |
| RF-13 | COMPLETO | CRUD con RLS admin |
| RF-14 | COMPLETO | Assessment auto-creado, DELETE bloqueado |
| RF-15 | COMPLETO | PATCH título y duración |
| RF-16 | COMPLETO | Opciones JSONB normalizadas |
| RF-17 | COMPLETO | Detalle + signed URL + Big Five |
| RF-18 | COMPLETO* | *Ver discrepancia D-02: reviews es primario, no respaldo |

---

## Notas metodológicas

- Las iteraciones no tienen duraciones exactas documentadas más allá de las fechas de commit.
- No se asume que cada commit corresponde a una sesión de trabajo independiente.
- La distinción entre "iteración inicial" e "iteración de ajuste" refleja cuándo se implementó la funcionalidad base y cuándo se realizó el ajuste más significativo.
- Las iteraciones 5, 6 y parte de la 4 ocurrieron en la misma fecha calendario (2026-02-18), lo que sugiere una sesión de trabajo continua de alta productividad o múltiples sesiones en el mismo día.
