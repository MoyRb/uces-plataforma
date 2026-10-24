# Hallazgos e incidencias — Capítulo VI (Corte 6A)

**Fecha:** 2026-10-22
**Tipo:** Hallazgos de inspección estática + correcciones de documentación

---

## 1. Hallazgos de inspección estática

Los siguientes hallazgos se identificaron durante la revisión estática del Corte 6A. No representan defectos de ejecución (el sistema no fue arrancado), sino observaciones sobre el código y la documentación.

---

### H-6A-01 — Corrección de conteo de RF (documentación)

| Campo | Detalle |
|---|---|
| **Tipo** | Error de documentación |
| **Severidad** | Media (afecta coherencia académica) |
| **Identificado en** | Fase 1 del Corte 6A — revisión de documentos del Corte 5C |
| **Descripción** | RF-13 (Gestión de módulos admin, `GET/POST /api/admin/modules`) aparece marcado como `IMPLEMENTADO` en la matriz integral (`05-matriz-integral-trazabilidad.md`) pero fue omitido de la lista de "implementados sin discrepancia" en `05c-validacion-trazabilidad.md`. Esto hizo que el conteo apareciera como 13 cuando debería ser 14. La §5.13.2 del Capítulo V decía "Trece requisitos" y debería decir "Catorce". |
| **Impacto** | Sin impacto funcional. La suma total de RF era correcta (18), pero la distribución interna era inexacta. |
| **Corrección aplicada** | C5C-07 — actualizado conteo 13 → 14 en `05c-validacion-trazabilidad.md`, `capitulos/05-desarrollo-implementacion.md` §5.13.2, y `05c-cierre-ejecutivo.md`. |
| **Estado** | **RESUELTO** |

---

### H-6A-02 — D-04/D-05 presentados como "requisitos fuera de alcance" (documentación)

| Campo | Detalle |
|---|---|
| **Tipo** | Imprecisión académica en documentación |
| **Severidad** | Baja |
| **Descripción** | La §5.13.2 del Capítulo V mencionaba "Dos requisitos relativos a funcionalidades no implementadas" refiriéndose a D-04 (rol reviewer) y D-05 (lista de exclusión). Esto podía interpretarse como que Trabajo A tenía 20 RF (18 + 2), generando ambigüedad en el conteo total. D-04 y D-05 son discrepancias arquitectónicas —aspectos del diseño no implementados— no RF numerados del Trabajo A. |
| **Corrección aplicada** | C5C-07 — §5.13.2 clarificado: "Adicionalmente, se identificaron dos funcionalidades del diseño original que no se implementaron en el MVP... No corresponden a RF numerados del Trabajo A sino a aspectos de diseño." |
| **Estado** | **RESUELTO** |

---

### H-6A-03 — Import no utilizado en `admin/page.tsx`

| Campo | Detalle |
|---|---|
| **Tipo** | Code smell / dead code |
| **Severidad** | Muy baja (advertencia de linter) |
| **Archivo** | `my-app/app/admin/page.tsx:11` |
| **Descripción** | `LayoutDashboard` importado de `lucide-react` pero no referenciado en ningún lugar del componente. |
| **Impacto** | Sin impacto funcional. Aumenta levemente el bundle size pero no produce errores. |
| **Corrección sugerida** | Eliminar la línea `import { LayoutDashboard } from 'lucide-react'` (o la parte correspondiente del import) en una iteración de limpieza. |
| **Estado** | **PENDIENTE** — No se corrige en el Corte 6A por restricción "no modificar funcionalidades". Se documenta para limpieza futura. |

---

### H-6A-04 — Sin framework de pruebas automatizadas

| Campo | Detalle |
|---|---|
| **Tipo** | Limitación de proyecto |
| **Severidad** | Media (limita cobertura de pruebas) |
| **Descripción** | El repositorio no incluye frameworks de prueba automatizadas (Vitest, Jest, Playwright, Cypress). Los scripts disponibles son únicamente `dev`, `build`, `start` y `lint`. |
| **Impacto** | Todas las pruebas funcionales del Capítulo VI deben realizarse manualmente. Aumenta el tiempo de ejecución y el riesgo de error humano. |
| **Recomendación** | Incorporar Playwright para pruebas E2E o Vitest para pruebas unitarias de `lib/` como trabajo futuro. |
| **Estado** | **DOCUMENTADO** — sin corrección en este trabajo (fuera del alcance del MVP). |

---

### H-6A-05 — Verificación de D-01 pendiente de evidencia empírica

| Campo | Detalle |
|---|---|
| **Tipo** | Pendiente de verificación funcional |
| **Severidad** | Media (afecta argumento académico de D-01) |
| **Descripción** | La discrepancia D-01 (verificación por completitud, no por puntaje psicométrico) fue confirmada por inspección del código de `apply/route.ts`. Sin embargo, la evidencia empírica (ejecutar el flujo con un candidato que tenga clasificación "Riesgo" y confirmar que puede postularse) todavía no ha sido obtenida. |
| **Caso de prueba** | CP-08 — actualmente BLOQUEADO |
| **Estado** | **PENDIENTE** — se verifica en Corte 6B. |

---

### H-6A-06 — Verificación de D-02 pendiente de evidencia empírica

| Campo | Detalle |
|---|---|
| **Tipo** | Pendiente de verificación funcional |
| **Descripción** | La discrepancia D-02 (tabla `reviews` como almacén primario) fue confirmada por código pero requiere evidencia funcional de que la decisión persiste en `reviews` y no solo en `attempts.decision`. |
| **Caso de prueba** | CP-20 — actualmente BLOQUEADO |
| **Estado** | **PENDIENTE** — se verifica en Corte 6B. |

---

## 2. Incidencias de ejecución — Corte 6B

Las siguientes incidencias se detectaron durante la sesión de ejecución funcional 6B-S1 (2026-10-22).

### INC-6B-01 — UPSERT de respuestas falla al cambiar opción

| Campo | Detalle |
|---|---|
| **Caso de prueba** | CP-10 |
| **Fecha** | 2026-10-22 |
| **Descripción** | Al intentar cambiar la respuesta de una pregunta ya respondida (Q1: "A" → "C"), el endpoint `/api/attempts/{id}/answers` retorna HTTP 400 `{"error":"No se pudo guardar"}`. |
| **Resultado esperado** | HTTP 200 `{saved:true}` con respuesta actualizada. |
| **Resultado observado** | HTTP 400 — el UPSERT falla con constraint violation. |
| **Causa raíz** | La tabla `answers` tiene `unique(attempt_id, question_id)`. El código usa `.upsert({attempt_id, question_id, selected_option})` sin especificar `onConflict`. Supabase interpreta el UPSERT sobre el PK (`id`), no sobre el constraint compuesto. La segunda llamada intenta INSERT y falla por violación de unicidad. |
| **Archivo** | `app/api/attempts/[attemptId]/answers/route.ts:74` |
| **Corrección sugerida** | `.upsert({...}, {onConflict: "attempt_id,question_id"})` |
| **Impacto** | Bajo — el candidato no puede corregir una respuesta ya enviada. Primera respuesta queda registrada. No bloquea el flujo principal. |
| **Estado** | **DOCUMENTADA** |

---

### INC-6B-02 — `upsertReview` falla silenciosamente; usa fallback `attempts.decision`

| Campo | Detalle |
|---|---|
| **Caso de prueba** | CP-20 |
| **Fecha** | 2026-10-22 |
| **Descripción** | La función `upsertReview` en `app/api/admin/attempts/[id]/route.ts` intenta insertar en la tabla `reviews` con tres intentos fallidos, retorna `{usedReviews: false}` y el sistema cae al fallback `attempts.decision`. |
| **Schema real de `reviews`** | Columnas: `id, attempt_id, reviewer_id, rubric, decision, comments, created_at`. Sin columna `notes`, sin columna `updated_at`. |
| **Flujo de fallo:** | (1) `writeReview("notes")` → PGRST204 "notes column not found"; (2) retry `writeReview("comments", true)` → PGRST204 "updated_at column not found"; (3) retry `writeReview("notes", false)` → PGRST204 mensaje incluye "reviews" → `isMissingReviewsTable()=true` → `{usedReviews:false}`; (4) fallback a `attempts.update({decision, reviewer_notes})`. |
| **Resultado esperado** | `decision_source:"reviews"`, registro en tabla `reviews`. |
| **Resultado observado** | `decision_source:"attempts"`, tabla `reviews` vacía. |
| **Corrección sugerida** | Agregar el intento `writeReview("comments", false)` (sin `updated_at`) en el flujo. |
| **Relación con D-02** | Confirma D-02 en comportamiento real: la decisión se almacena en `attempts.decision`, no en `reviews`, aunque el código intenta `reviews` primero. |
| **Impacto** | Medio — la decisión se guarda correctamente (en `attempts.decision`), pero no en la tabla diseñada (`reviews`). El flujo de negocio funciona; la auditoría de revisiones es incompleta. |
| **Estado** | **DOCUMENTADA** |

---

## 3. Tabla resumen de hallazgos

| ID | Tipo | Descripción resumida | Severidad | Estado |
|---|---|---|---|---|
| H-6A-01 | Error documentación | RF-13 omitido del conteo → corregido 13→14 | Media | RESUELTO |
| H-6A-02 | Imprecisión académica | D-04/D-05 como "requisitos" → aclarado como "funcionalidades" | Baja | RESUELTO |
| H-6A-03 | Dead code | `LayoutDashboard` importado sin uso en `admin/page.tsx` | Muy baja | PENDIENTE |
| H-6A-04 | Limitación de proyecto | Sin framework de pruebas automatizadas | Media | DOCUMENTADO |
| H-6A-05 | Verificación pendiente | D-01 confirmada en código, sin evidencia empírica de CP-08 | Media | **RESUELTO** (CP-08 APROBADO) |
| H-6A-06 | Verificación pendiente | D-02 confirmada en código, sin evidencia empírica de CP-20 | Media | **RESUELTO** (CP-20 + INC-6B-02) |
| INC-6B-01 | Defecto funcional | UPSERT respuestas falla al cambiar opción (missing onConflict) | Baja | DOCUMENTADA |
| INC-6B-02 | Defecto funcional | `upsertReview` falla por schema mismatch; fallback a attempts.decision | Media | DOCUMENTADA |

---

## 4. Plantilla para incidencias en Corte 6B

Cada incidencia descubierta durante la ejecución funcional se registrará con la siguiente estructura:

```
### INC-6B-XX — [Título]

| Campo | Detalle |
|---|---|
| **Caso de prueba** | CP-XX |
| **Fecha** | YYYY-MM-DD |
| **Descripción** | Descripción del comportamiento observado |
| **Resultado esperado** | ... |
| **Resultado observado** | ... |
| **Evidencia** | Nombre de captura o URL |
| **Posible causa** | ... |
| **Impacto** | [Bajo/Medio/Alto] |
| **Acción** | [Documentar como defecto / Documentar como discrepancia / Sin acción] |
```
