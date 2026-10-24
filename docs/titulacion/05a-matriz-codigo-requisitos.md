# Matriz código-requisitos — Capítulo V Corte 5A

**Proyecto:** UCES Plataforma de Talento
**Fecha:** 2026-10-22
**Alcance:** Secciones 5.1 a 5.8 del Capítulo V

Esta matriz registra la correspondencia exacta entre cada requisito documentado en el Corte 5A y los archivos de código que lo implementan, indicando las funciones o fragmentos específicos relevantes.

---

## Tabla 1. Requisitos funcionales documentados en 5A

| RF | Descripción | Archivo(s) principales | Función / fragmento clave | Sección del capítulo |
|---|---|---|---|---|
| RF-01 | Registro con CURP | `app/api/auth/register/route.ts` | `POST handler`, patrón de rollback | 5.3.1 |
| RF-02 | Hash HMAC-SHA256 de CURP | `lib/curp.ts`, `register/route.ts:40` | `hashCurpHmac()`, `normalizeCurp()` | 5.3.1 |
| RF-03 | Autenticación y rol | `app/login/page.tsx`, `lib/auth.ts` | `signInWithPassword`, `getRoleForSession()`, `resolveRole()` | 5.3.2 |
| RF-04 | Consultar módulos | `app/panel/page.tsx`, `app/modulos/[moduleId]/page.tsx` | `supabase.from("modules").select(...)` | 5.4, 5.5 |
| RF-05 | Detalle de vacantes | `app/vacantes/[id]/page.tsx`, `app/modulos/[moduleId]/page.tsx` | Query con relación modules → vacancies | 5.5 |
| RF-07 | Postulación con verificaciones | `app/api/vacancies/[id]/apply/route.ts`, `app/vacantes/[id]/postular.tsx` | `POST handler` 6 pasos, `ApplyButton` | 5.6 |
| RF-08 | Guardar respuestas (upsert) | `app/api/attempts/[attemptId]/answers/route.ts` | `supabase.from("answers").upsert(...)` | 5.7.3 |
| RF-09 | Control de tiempo | `app/evaluacion/[attemptId]/cliente.tsx` | `setInterval` + `autoSubmitTriggeredRef`, `deadline_at` en servidor | 5.7.2 |
| RF-10 | Carga de evidencias | `app/evaluacion/[attemptId]/cliente.tsx` | `handleUpload()`, `supabase.storage.upload()` | 5.8 |
| RF-11 | Envío y cálculo de resultados | `app/api/attempts/[attemptId]/submit/route.ts` | `calculatePsicometricoSummary()`, actualización de `attempts` | 5.7.5 |

---

## Tabla 2. Archivos de código y RF que implementan

| Archivo | RF implementados | Función principal |
|---|---|---|
| `app/api/auth/register/route.ts` | RF-01, RF-02 | Registro transaccional con HMAC y rollback |
| `app/login/page.tsx` | RF-03 | `signInWithPassword`, redirección a /panel |
| `lib/auth.ts` | RF-03 | `getRoleForSession()`, `resolveRole()` |
| `lib/curp.ts` | RF-02 | `hashCurpHmac()`, `normalizeCurp()` |
| `app/panel/page.tsx` | RF-03, RF-04 | Sesión, rol, módulos, estado psicométrico |
| `app/modulos/[moduleId]/page.tsx` | RF-04, RF-05 | Lista de vacantes por módulo |
| `app/vacantes/[id]/page.tsx` | RF-05 | Detalle de vacante, disponibilidad |
| `app/vacantes/[id]/postular.tsx` | RF-07 | `ApplyButton`, manejo de respuesta 403 con redirect |
| `app/api/vacancies/[id]/apply/route.ts` | RF-06 (verificación), RF-07 | 6 validaciones + creación de intento |
| `lib/psicometrico.ts` | RF-06 (prerequisito) | `getPsicometricoAttemptState()`, `ensurePsicometricoAttempt()` |
| `app/evaluacion/[attemptId]/page.tsx` | RF-08, RF-09, RF-10, RF-11 | Server Component: carga preguntas + respuestas previas |
| `app/evaluacion/[attemptId]/cliente.tsx` | RF-08, RF-09, RF-10 | Timer, guardado de respuestas, upload de evidencia, envío |
| `app/api/attempts/[attemptId]/answers/route.ts` | RF-08, RF-09 | POST con validación de deadline y upsert |
| `app/api/attempts/[attemptId]/submit/route.ts` | RF-11 | Cálculo de summary, actualización de intento |
| `supabase/schema.sql` | Todos | Tablas: profiles, curp_hashes, applications, attempts, answers, evidence_uploads |

---

## Tabla 3. Validaciones del servidor por módulo

| Módulo | Validación en servidor | Archivo | Línea aprox. |
|---|---|---|---|
| Registro | Formato CURP (regex) | `register/route.ts` | 29-30 |
| Registro | CURP duplicada (HMAC query) | `register/route.ts` | 42-54 |
| Registro | Rollback si falla perfil | `register/route.ts` | 73-76 |
| Registro | Rollback si falla curp_hashes | `register/route.ts` | 83-86 |
| Registro | Rollback si falla user_roles | `register/route.ts` | 93-96 |
| Postulación | JWT válido | `apply/route.ts` | 18-21 |
| Postulación | Psicométrico completado | `apply/route.ts` | 27-41 |
| Postulación | Vacante status="open" | `apply/route.ts` | 53-55 |
| Postulación | Assessment existe | `apply/route.ts` | 57-65 |
| Respuestas | JWT válido + pertenencia intento | `answers/route.ts` | 32-58 |
| Respuestas | Intento no enviado | `answers/route.ts` | 60-62 |
| Respuestas | Tiempo no expirado | `answers/route.ts` | 64-66 |
| Respuestas | Pregunta pertenece al assessment | `answers/route.ts` | 68-72 |
| Envío | JWT válido + pertenencia | `submit/route.ts` | 33-53 |
| Envío | Intento no enviado previamente | `submit/route.ts` | 55-57 |
| Envío | Detección de timeout | `submit/route.ts` | 72 |

---

## Tabla 4. Tablas de base de datos por módulo documentado

| Módulo | Tablas leídas | Tablas escritas |
|---|---|---|
| Registro | `curp_hashes` (lectura previa) | `auth.users` (Auth), `profiles`, `curp_hashes`, `user_roles` |
| Autenticación | `auth.users` (Auth), `user_roles`, `profiles` | — (solo lectura) |
| Panel candidato | `profiles`, `modules`, `attempts` (psicométrico) | — (solo lectura) |
| Vacantes | `modules`, `vacancies`, `assessments` | — (solo lectura) |
| Postulación | `attempts`, `vacancies`, `assessments`, `applications` | `applications`, `attempts` |
| Evaluación (respuestas) | `attempts`, `applications`, `questions` | `answers` (upsert) |
| Evaluación (envío) | `attempts`, `questions`, `answers` | `attempts` (update), `reviews` (fallback) |
| Evidencias | `evidence_uploads` | `evidence_uploads` + Storage bucket |

---

## Tabla 5. Discrepancias documentadas en 5A

| ID | Descripción | Sección donde se documenta | Estado académico |
|---|---|---|---|
| D-01 | Guard de postulación verifica `completed`, no score psicométrico | 5.6.1 (explícito) | DOCUMENTADA — no se presenta como error sino como decisión de implementación |

Las discrepancias D-02, D-03, D-04 y D-05 serán documentadas en el Corte 5B (panel admin, seguridad y diferencias).
