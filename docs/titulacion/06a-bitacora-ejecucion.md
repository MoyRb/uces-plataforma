# Bitácora de ejecución — Corte 6A

**Fecha de inicio:** 2026-10-22
**Responsable:** Elaborador del trabajo de titulación
**Entorno:** Windows 11 / Node.js 22.22.2 / Next.js 16.1.1

---

## Sesión 6A-S1 — Verificaciones estáticas

**Fecha:** 2026-10-22
**Tipo:** Inspección estática (sin servidor activo)

### EE-01 — Verificación de tipos TypeScript

| Campo | Detalle |
|---|---|
| **Comando** | `npx tsc --noEmit` |
| **Directorio** | `/c/uces-plataforma/my-app` |
| **Fecha** | 2026-10-22 |
| **Duración** | ~8 segundos |
| **Resultado** | **PASA** — Sin errores de tipo |
| **Salida** | Sin output (código de salida 0) |
| **Interpretación** | El código fuente compila sin errores de tipo. Todos los tipos de las relaciones Supabase, funciones de utilidad y componentes están correctamente declarados. |

---

### EE-02 — Análisis estático ESLint

| Campo | Detalle |
|---|---|
| **Comando** | `npx eslint . --max-warnings=0` |
| **Directorio** | `/c/uces-plataforma/my-app` |
| **Fecha** | 2026-10-22 |
| **Resultado** | **ADVERTENCIA** (no bloqueante) |
| **Aviso detectado** | `app/admin/page.tsx:11:3` — `'LayoutDashboard' is defined but never used` (@typescript-eslint/no-unused-vars) |
| **Interpretación** | El import de `LayoutDashboard` de `lucide-react` fue incluido pero no se usa en el componente. No afecta la funcionalidad en tiempo de ejecución. |
| **Impacto** | Ninguno sobre las pruebas funcionales. Import dead code. |

---

### EE-03 — Conteo y verificación de rutas de admin

| Campo | Detalle |
|---|---|
| **Método** | Listado de archivos `route.ts` bajo `app/api/admin/` |
| **Fecha** | 2026-10-22 |
| **Resultado** | **CONFIRMADO** — 13 route handlers |
| **Archivos encontrados** | `assessments/[id]/questions/route.ts`, `assessments/[id]/route.ts`, `assessments/route.ts`, `attempts/[id]/detail/route.ts`, `attempts/[id]/route.ts`, `attempts/route.ts`, `modules/[id]/route.ts`, `modules/route.ts`, `questions/[id]/route.ts`, `vacancies/[id]/assessment/route.ts`, `vacancies/[id]/route.ts`, `vacancies/[id]/stats/route.ts`, `vacancies/route.ts` |
| **Interpretación** | El Capítulo V documenta "13 endpoints protegidos" — confirmado por inspección de sistema de archivos. |

---

### EE-04 — Verificación de `calculatePsicometricoSummary`

| Campo | Detalle |
|---|---|
| **Método** | Lectura directa de `lib/psicometricoResults.ts` y `app/api/attempts/[attemptId]/submit/route.ts` |
| **Fecha** | 2026-10-22 |
| **Resultado** | **CONFIRMADO** — Comportamiento de `theory_score` documentado correctamente en §5.7.5 |
| **Evidencia** | `theory_score = Math.round((summary.totals.likertAnswered / Math.max(summary.totals.likertQuestions, 1)) * 100)` donde `likertQuestions = 20` fijo. Para evaluaciones sin prefijo `MINI_BIG_FIVE`, `likertAnswered = 0` → `theory_score = 0`. |
| **Relevancia** | Confirma corrección C5C-04 aplicada en el Corte 5C. |

---

### EE-05 — Verificación de `resolveRole`

| Campo | Detalle |
|---|---|
| **Método** | Lectura de `lib/auth.ts` |
| **Fecha** | 2026-10-22 |
| **Resultado** | **CONFIRMADO** — `resolveRole("reviewer")` retorna `"user"` |
| **Evidencia** | `if (role === "admin" \|\| role === "user") { return role; } return "user";` — "reviewer" cae al `return "user"` |
| **Relevancia** | Confirma D-04: el rol `reviewer` es inoperativo en la lógica de negocio actual. |

---

### EE-06 — Verificación de conteo de RF (corrección C5C-07)

| Campo | Detalle |
|---|---|
| **Método** | Revisión de `05-matriz-integral-trazabilidad.md` para todos los RF-01 a RF-18 |
| **Fecha** | 2026-10-22 |
| **Resultado** | **CONFIRMADO** — RF-13 marcado IMPLEMENTADO en la matriz |
| **Corrección aplicada** | C5C-07: conteo 13 → 14 en documentación de validación de trazabilidad y §5.13.2 |
| **Estado final** | 14 implementados sin discrepancia + 4 con discrepancia (RF-07, RF-11, RF-17, RF-18) = 18 ✓ |

---

## Sesión 6A-S2 — Inspección de lógica de control de acceso

**Fecha:** 2026-10-22
**Tipo:** Inspección estática — seguimiento de rutas de código

### EE-07 — Verificación de `requireAdmin` (4 verificaciones)

| Campo | Detalle |
|---|---|
| **Archivo** | `app/api/admin/utils.ts` |
| **Resultado** | **CONFIRMADO** — 4 verificaciones secuenciales |
| **Verificación 1** | `!authHeader?.startsWith("Bearer ")` → HTTP 401 |
| **Verificación 2** | `!token` (token vacío tras quitar "Bearer ") → HTTP 401 |
| **Verificación 3** | `userError \|\| !userData.user` (JWT inválido) → HTTP 401 |
| **Verificación 4** | `roleError \|\| roleData !== "admin"` → HTTP 403 |
| **Relevancia** | Confirma descripción en §5.10 y Fig. 5.6. |

---

### EE-08 — Verificación de ruta de postulación sin psicométrico

| Campo | Detalle |
|---|---|
| **Archivo** | `app/api/vacancies/[id]/apply/route.ts` |
| **Resultado** | **CONFIRMADO** — Guard verifica completitud, no puntaje |
| **Evidencia** | `if (!psicometricoState.completed) { return ... 403 ... requiresPsychometric: true }` — no existe condición sobre scores o clasificaciones en ese archivo |
| **Relevancia** | Confirma D-01. CP-08 verificará esto empíricamente. |

---

### EE-09 — Verificación de persistencia de decisión en reviews

| Campo | Detalle |
|---|---|
| **Archivo** | `app/api/admin/attempts/[id]/route.ts` |
| **Resultado** | **CONFIRMADO** — `upsertReview` es la ruta primaria |
| **Evidencia** | `const reviewResult = await upsertReview(admin, id, notes, decision)` — intento de fallback a `attempts.decision` solo ante error específico |
| **Relevancia** | Confirma D-02. CP-20 verificará esto empíricamente. |

---

## Resumen de sesión 6A

| Verificación | Tipo | Resultado |
|---|---|---|
| EE-01 TypeScript | Estática | PASA |
| EE-02 ESLint | Estática | ADVERTENCIA (no bloqueante) |
| EE-03 Conteo rutas admin | Estática | CONFIRMADO (13 routes) |
| EE-04 `calculatePsicometricoSummary` | Estática | CONFIRMADO |
| EE-05 `resolveRole` D-04 | Estática | CONFIRMADO |
| EE-06 Conteo RF C5C-07 | Estática | CONFIRMADO |
| EE-07 `requireAdmin` | Estática | CONFIRMADO (4 checks) |
| EE-08 Guard psicométrico D-01 | Estática | CONFIRMADO |
| EE-09 Decisión en reviews D-02 | Estática | CONFIRMADO |

**CP-01 a CP-22:** BLOQUEADO → Ejecutados en Sesión 6B-S1 (ver abajo).

---

## Sesión 6B-S1 — Ejecución funcional

**Fecha:** 2026-10-22
**Tipo:** Ejecución funcional real — entorno activo localhost:3000 + Supabase remoto
**Herramientas:** curl, Node.js scripts (@supabase/supabase-js)

Ver detalle completo en `06b-reporte-ejecucion.md`.

**Resumen de resultados:**

| CP | Estado | Nota |
|---|---|---|
| CP-01 | **APROBADO** | POST /register → HTTP 201 |
| CP-02a | **APROBADO** | CURP duplicada → HTTP 400 |
| CP-02b | **APROBADO** | Login → JWT obtenido |
| CP-03 | **APROBADO** | Admin con candidato-token → HTTP 403 |
| CP-04 | **PARCIAL** | Sin endpoint API |
| CP-05 | **PARCIAL** | Sin endpoint API |
| CP-06 | **PARCIAL** | Sin endpoint API |
| CP-07 | **APROBADO** | Apply sin psicométrico → HTTP 403 |
| CP-08 | **APROBADO** | Apply con psicométrico → HTTP 200 (D-01) |
| CP-09 | **APROBADO** | Segunda apply → mismo attemptId (idempotente) |
| CP-10 | **APROBADO PARCIAL** | 5 respuestas OK; UPSERT re-answer falla (INC-6B-01) |
| CP-11 | **BLOQUEADO** | Timeout no probado |
| CP-12 | **APROBADO** | Evidencia subida a storage |
| CP-13 | **APROBADO** | Submit → theoryScore:0 (conocimientos) |
| CP-14 | **APROBADO** | Psicométrico completo, theoryScore:100, rasgos Alta |
| CP-15 | **APROBADO** | GET /admin/modules → HTTP 200 |
| CP-16 | **APROBADO** | GET /admin/vacancies → HTTP 200 |
| CP-17 | **APROBADO** | GET /admin/assessments → HTTP 200 |
| CP-18 | **APROBADO** | Stats → {applicationsCount:1, attemptsCount:1} (D-03) |
| CP-19 | **APROBADO** | Detalle intento admin → HTTP 200 |
| CP-20 | **APROBADO PARCIAL** | Decisión APPROVED, decision_source:"attempts" (INC-6B-02, D-02) |
| CP-21 | **APROBADO** | signedUrl presente |
| CP-22 | **APROBADO** | Token inválido → HTTP 401 |

---

## Plantilla para sesión 6B (ejecución funcional)

Cada caso de prueba funcional se documentará con la siguiente estructura al ejecutarse:

```
### CP-XX — [Nombre]

**Fecha de ejecución:** YYYY-MM-DD
**Entorno:** [local/producción]
**Ejecutado por:** [nombre]

**Pasos realizados:**
1. ...

**Resultado esperado:** ...
**Resultado observado:** ...
**Estado:** PASA / FALLA / BLOQUEADO

**Evidencia:**
- Captura: [nombre-archivo.png]
- URL / endpoint: [si aplica]
- Registro en BD: [descripción si se verificó]

**Incidencias detectadas:**
- [Ninguna / descripción]
```
