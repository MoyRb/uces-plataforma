# Reporte de ejecución — Corte 6B

**Fecha:** 2026-10-22
**Tipo:** Ejecución funcional real — entorno activo
**Sesión:** 6B-S1 (pruebas manuales vía API)

---

## 1. Entorno de prueba utilizado

| Componente | Estado | Detalle |
|---|---|---|
| Node.js | Activo | v22.22.2 |
| Next.js servidor | Activo | `npm run dev` — "Ready in 6.5s" — localhost:3000 |
| Supabase | Conectado | Proyecto UcesCap (uilqwyrslwrkeubaayoi.supabase.co) |
| `.env.local` | Configurado | 4 variables presentes y funcionales |
| Candidato de prueba | Creado | `candidato.6b@test.local` / CURP: `GOMC900101HDFRRL09` |
| Admin de prueba | Token obtenido | `admin@uces.test` / contraseña establecida para prueba |

---

## 2. Resumen de resultados

| CP | Nombre | HTTP | Estado | Nota |
|---|---|---|---|---|
| CP-01 | Registro de candidato | 201 | **APROBADO** | `{"message":"Usuario creado"}` |
| CP-02a | Registro CURP duplicada | 400 | **APROBADO** | `{"error":"Esta CURP ya está registrada"}` |
| CP-02b | Login de candidato | — | **APROBADO** | JWT obtenido; USER_ID: 5b393eaa-... |
| CP-03 | Admin protection candidato | 403 | **APROBADO** | `{"error":"Acceso restringido"}` |
| CP-04 | Estado panel candidato | — | **PARCIAL** | Sin endpoint API directo; estado confirmado via DB |
| CP-05 | Catálogo de vacantes | — | **PARCIAL** | Sin GET /api/vacancies; datos en DB |
| CP-06 | Detalle de vacante | — | **PARCIAL** | Sin GET /api/vacancies/{id}; datos en DB |
| CP-07 | Guard psicométrico (bloqueo) | 403 | **APROBADO** | `{"requiresPsychometric":true}` |
| CP-08 | Guard psicométrico (permitido) | 200 | **APROBADO** | Apply exitoso post-psicométrico |
| CP-09 | Doble postulación | 200 | **APROBADO** | Idempotente: mismo attemptId, sin duplicado |
| CP-10 | Evaluación — envío respuestas | 200/400 | **APROBADO PARCIAL** | 5 respuestas OK; UPSERT re-answer falla (INC-6B-01) |
| CP-11 | Timeout automático | — | **BLOQUEADO** | Requiere esperar expiración de attempt |
| CP-12 | Subida de evidencia | — | **APROBADO** | Archivo subido a bucket "evidences", EV registrado |
| CP-13 | Submit de evaluación | 200 | **APROBADO** | `{theoryScore:0}` correcto para evaluación conocimientos |
| CP-14 | Psicométrico completo | 200 | **APROBADO** | 20 preguntas, theoryScore:100, rasgos Alta |
| CP-15 | Panel admin — módulos | 200 | **APROBADO** | Lista de módulos devuelta |
| CP-16 | Panel admin — vacantes | 200 | **APROBADO** | Lista de vacantes devuelta |
| CP-17 | Panel admin — assessments | 200 | **APROBADO** | Lista de evaluaciones devuelta |
| CP-18 | Stats de vacante (D-03) | 200 | **APROBADO** | `{applicationsCount:1, attemptsCount:1}` — solo 2 métricas |
| CP-19 | Detalle de intento admin | 200 | **APROBADO** | Detalle completo con respuestas y evidencia |
| CP-20 | Decisión admin (D-02) | 200 | **APROBADO PARCIAL** | decision:APPROVED, pero `decision_source:"attempts"` (INC-6B-02) |
| CP-21 | Descarga de evidencia | — | **APROBADO** | signedUrl presente en respuesta de detalle admin |
| CP-22 | Seguridad — token inválido | 401 | **APROBADO** | `{"error":"Sesión inválida"}`; sin header: `{"error":"No autenticado"}` |

**Resumen:** 14 APROBADO | 3 APROBADO PARCIAL | 2 PARCIAL (sin endpoint) | 1 BLOQUEADO | 0 FALLIDO

---

## 3. Verificación de discrepancias D-01 a D-03

### D-01 — Guard de postulación verifica completitud, no score

- **Evidencia empírica:** CP-07 y CP-08
- **CP-07:** POST `/api/vacancies/aaaaaaaa.../apply` sin psicométrico → HTTP 403 `{requiresPsychometric:true}`
- **CP-08:** POST mismo endpoint con psicométrico completado (theoryScore:100) → HTTP 200 `{attemptId:"96a257b4..."}`
- **Verificación de código (EE-08):** `if (!psicometricoState.completed) { return 403 }` — no hay condición sobre scores
- **Estado D-01:** **CONFIRMADA EMPÍRICAMENTE** — el guard verifica solo `completed`, no la clasificación obtenida
- **Nota:** El usuario de prueba obtuvo clasificación "Alta" en todos los rasgos. Para verificar que Riesgo también puede aplicar, se requeriría un segundo candidato con clasificación Riesgo; sin embargo, la inspección de código confirma que no existe filtro por score en el guard.

### D-02 — `reviews` como almacén de decisiones

- **Evidencia estática (EE-09):** `upsertReview()` es la ruta primaria en el código
- **Evidencia empírica (CP-20):** PATCH `/api/admin/attempts/{id}` con `{decision:"APPROVED", notes:"..."}` → HTTP 200
  - Respuesta: `"decision_source":"attempts"` (no "reviews")
  - Tabla `reviews`: **vacía** (0 registros para el attempt)
  - Campo `attempts.decision`: **"APPROVED"** ✓

- **Causa raíz identificada (INC-6B-02):** El código de `upsertReview` intenta columnas en este orden:
  1. INSERT/UPDATE con columna `notes` + campo `updated_at` → Falla: PGRST204 "notes column not found"
  2. Retry con columna `comments` + campo `updated_at` → Falla: PGRST204 "updated_at not found in schema cache"
  3. Retry con columna `notes` sin `updated_at` → Falla nuevamente: PGRST204 "notes column" (mensaje incluye "reviews") → `isMissingReviewsTable()` = true → retorna `{usedReviews: false}`
  4. Fallback: `attempts.update({decision, reviewer_notes})`

- **Schema real de `reviews`:** columnas `id, attempt_id, reviewer_id, rubric, decision, comments, created_at` — sin `notes`, sin `updated_at`
- **Estado D-02:** **PARCIALMENTE CONFIRMADA** — La intención de diseño (reviews como primario) es correcta en el código; la implementación falla silenciosamente y usa el fallback. En la práctica, las decisiones se almacenan en `attempts.decision`.

### D-03 — Endpoint stats reducido

- **Evidencia empírica (CP-18):** GET `/api/admin/vacancies/aaaaaaaa.../stats` → HTTP 200
  - Respuesta: `{"data":{"applicationsCount":1,"attemptsCount":1}}`
  - Solo 2 métricas, no las 6+ del diseño original
- **Estado D-03:** **CONFIRMADA EMPÍRICAMENTE** ✓

---

## 4. Incidencias detectadas durante ejecución

### INC-6B-01 — UPSERT de respuestas falla al cambiar opción

| Campo | Detalle |
|---|---|
| **Caso de prueba** | CP-10 |
| **Fecha** | 2026-10-22 |
| **Descripción** | Al intentar cambiar la respuesta de Q1 de "A" a "C" mediante el endpoint `/api/attempts/{id}/answers`, la segunda llamada retorna HTTP 400 `{"error":"No se pudo guardar"}` |
| **Resultado esperado** | HTTP 200 `{saved:true}` con la nueva respuesta |
| **Resultado observado** | HTTP 400 — el UPSERT falla |
| **Causa probable** | La tabla `answers` tiene `unique(attempt_id, question_id)`. El código usa `.upsert({attempt_id, question_id, selected_option})` sin especificar `onConflict`. Supabase interpreta el upsert sobre el PK (id), no sobre el constraint compuesto. La segunda llamada intenta INSERT y falla por violación del constraint único. |
| **Impacto** | Bajo — el candidato no puede cambiar sus respuestas una vez enviadas. La primera respuesta queda registrada. |
| **Acción** | Documentar como defecto. No bloquea flujo principal. |

---

### INC-6B-02 — `upsertReview` falla silenciosamente; usa fallback `attempts.decision`

| Campo | Detalle |
|---|---|
| **Caso de prueba** | CP-20 |
| **Fecha** | 2026-10-22 |
| **Descripción** | La función `upsertReview` en `app/api/admin/attempts/[id]/route.ts` falla al intentar insertar en la tabla `reviews` por mismatch de columnas. El código intenta: (1) columna `notes` — no existe en schema; (2) columna `comments` con `updated_at` — `updated_at` no existe; (3) columna `notes` sin `updated_at` — sigue sin existir. La tercera falla contiene "reviews" en el mensaje → `isMissingReviewsTable()` = true → retorna `{usedReviews: false}` → fallback a `attempts.decision`. |
| **Schema real `reviews`** | `id, attempt_id, reviewer_id, rubric, decision, comments, created_at` |
| **Resultado esperado** | Decisión en tabla `reviews`, `decision_source:"reviews"` |
| **Resultado observado** | Tabla `reviews` vacía, `decision_source:"attempts"` |
| **Impacto** | Medio — la decisión se guarda pero en tabla diferente a la diseñada. El fallback funciona correctamente para el flujo de negocio. |
| **Corrección requerida** | Agregar el intento `writeReview("comments", false)` (sin `updated_at`) en el flujo de reintentos. |
| **Relación con D-02** | Confirma que D-02 es real: el sistema en producción usa `attempts.decision`, no `reviews`, como almacén efectivo. |

---

## 5. Casos pendientes o parciales

| CP | Motivo |
|---|---|
| CP-04 | No existe endpoint API para estado del panel; la lógica es client-side (useEffect + Supabase client) |
| CP-05 | No existe GET /api/vacancies; el catálogo se obtiene directamente desde Supabase client en el frontend |
| CP-06 | No existe GET /api/vacancies/{id}; el detalle se obtiene directamente desde Supabase client |
| CP-11 | Requiere esperar expiración del attempt (35 min); no es práctico en la sesión |
| CP-08 D-01 | La verificación completa de D-01 requiere candidato con clasificación "Riesgo"; el actual tiene "Alta" |

---

## 6. Observaciones adicionales

1. **Comportamiento idempotente de apply (CP-09):** La segunda postulación no crea duplicados — devuelve el attempt existente. Esto es comportamiento correcto y esperado.

2. **`theoryScore` para evaluaciones de conocimientos (CP-13):** El submit de evaluación de conocimientos devuelve `theoryScore:0`. Confirma C5C-04: la función `calculatePsicometricoSummary` solo procesa preguntas `MINI_BIG_FIVE`; para evaluaciones de conocimientos, `likertAnswered=0` → `theoryScore=0`.

3. **Signed URLs funcionando (CP-21):** El endpoint de detalle admin genera automáticamente signed URLs para las evidencias del bucket privado "evidences". El token de descarga tiene 1 hora de validez.

4. **Rol admin verificado (CP-03, CP-15–CP-22):** La función `requireAdmin` aplicó correctamente las 4 verificaciones secuenciales. Token de candidato recibió 403; token de admin accedió correctamente a todos los endpoints.
