# Evidencias Corte 6B — Ejecución funcional

**Fecha de ejecución:** 2026-10-22
**Entorno:** localhost:3000 (Next.js 16.1.1 dev) + Supabase UcesCap (remoto)

## Evidencias API obtenidas

Las siguientes evidencias se obtuvieron vía llamadas curl y scripts Node.js durante la sesión 6B-S1.
Las respuestas completas están documentadas en `06b-bitacora-ejecucion.md`.

| ID | Tipo | CP | Descripción | Estado |
|---|---|---|---|---|
| EV-6B-01 | Respuesta API | CP-01 | POST /api/auth/register → HTTP 201 `{message:"Usuario creado"}` | OBTENIDA |
| EV-6B-02 | Respuesta API | CP-02a | POST register con CURP duplicada → HTTP 400 `{error:"Esta CURP ya está registrada"}` | OBTENIDA |
| EV-6B-03 | Token JWT | CP-02b | Login exitoso → JWT obtenido, USER_ID confirmado | OBTENIDA |
| EV-6B-04 | Respuesta API | CP-03 | Admin con token candidato → HTTP 403 `{error:"Acceso restringido"}` | OBTENIDA |
| EV-6B-05 | Respuesta API | CP-07 | Apply sin psicométrico → HTTP 403 `{requiresPsychometric:true}` | OBTENIDA |
| EV-6B-06 | Respuesta API | CP-14 | POST psicometrico/start → HTTP 200 `{completed:false,attemptId:"97c98264-..."}` | OBTENIDA |
| EV-6B-07 | Respuesta API | CP-14 | Submit psicométrico → HTTP 200 theoryScore:100, todos rasgos "Alta" | OBTENIDA |
| EV-6B-08 | Respuesta API | CP-08 | Apply con psicométrico completado → HTTP 200 `{attemptId:"96a257b4-..."}` | OBTENIDA |
| EV-6B-09 | Respuesta API | CP-09 | Segunda postulación → HTTP 200 mismo attemptId (idempotente) | OBTENIDA |
| EV-6B-10 | Respuesta API | CP-10 | Respuestas Q1-Q5 → HTTP 200 `{saved:true}` × 5 | OBTENIDA |
| EV-6B-11 | Respuesta API | CP-10 | UPSERT re-answer falla → HTTP 400 `{error:"No se pudo guardar"}` | OBTENIDA |
| EV-6B-12 | Storage | CP-12 | Archivo PDF subido a bucket evidences → ID confirmado | OBTENIDA |
| EV-6B-13 | Respuesta API | CP-13 | Submit attempt → HTTP 200 theoryScore:0 (eval. conocimientos) | OBTENIDA |
| EV-6B-14 | Respuesta API | CP-15 | GET /api/admin/modules → HTTP 200, 7+ módulos listados | OBTENIDA |
| EV-6B-15 | Respuesta API | CP-16 | GET /api/admin/vacancies → HTTP 200, vacantes listadas | OBTENIDA |
| EV-6B-16 | Respuesta API | CP-17 | GET /api/admin/assessments → HTTP 200, assessments listados | OBTENIDA |
| EV-6B-17 | Respuesta API | CP-18 | GET /api/admin/vacancies/{id}/stats → HTTP 200 `{applicationsCount:1,attemptsCount:1}` (D-03) | OBTENIDA |
| EV-6B-18 | Respuesta API | CP-19 | GET /api/admin/attempts/{id}/detail → HTTP 200, detalle completo | OBTENIDA |
| EV-6B-19 | Respuesta API | CP-20 | PATCH decision → HTTP 200, status:COMPLETED, decision_source:"attempts" (D-02) | OBTENIDA |
| EV-6B-20 | Respuesta API | CP-21 | Signed URL presente en evidence_uploads del detalle admin | OBTENIDA |
| EV-6B-21 | Respuesta API | CP-22 | Token inválido → HTTP 401; sin header → HTTP 401 | OBTENIDA |

## Notas

- Las capturas de pantalla de la interfaz web (fig-5-* y fig-6-*) permanecen PENDIENTES (requieren navegador interactivo).
- Las evidencias EV-6B-* son transcripciones de respuestas de API, equivalentes documentales de las capturas.
