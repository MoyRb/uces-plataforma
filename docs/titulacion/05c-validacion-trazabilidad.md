# Validación de trazabilidad — Corte 5C

**Fecha:** 2026-10-22
**Fuente:** `05-matriz-integral-trazabilidad.md`
**Verificado contra:** código fuente en `my-app/`

---

## 1. Estado de cobertura RF — resumen ejecutivo

| Categoría | Cantidad | RF |
|---|---|---|
| Implementados sin discrepancia | **14** | RF-01 al RF-06, RF-08, RF-09, RF-10, RF-12, **RF-13**, RF-14, RF-15, RF-16 |
| Implementados con discrepancia documentada | 3 discrepancias → 4 RF afectados | D-01→RF-07, D-02→RF-11/RF-18, D-03→RF-17 |
| **Total cubiertos** | **18** | 14 + 4 = 18 ✓ |

> **Nota sobre D-04 y D-05:** El rol reviewer (D-04) y la lista de exclusión (D-05) son funcionalidades del diseño original no implementadas en el MVP. No corresponden a RF numerados del Trabajo A; se documentan como discrepancias arquitectónicas separadas, no como RF adicionales.
>
> **Corrección aplicada (C5C-07):** RF-13 (Gestión de módulos admin) figuraba como IMPLEMENTADO en la matriz integral pero fue omitido del conteo de "sin discrepancia". La corrección cambia el conteo de 13 a **14** y elimina la categoría "Parciales / fuera de alcance MVP" como fila de RF, ya que D-04 y D-05 no son RF del Trabajo A.

---

## 2. Tabla de validación RF por RF

### RF-01 — Registro de candidato

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/register/page.tsx`, `app/api/register/route.ts` |
| Tablas | `profiles`, `curp_hashes`, `user_roles`, Supabase Auth |
| Funciones clave | `hashCurpHmac()`, `admin.createUser()`, rollback manual |
| Prueba propuesta (Cap. VI) | CP-01: Registrar candidato con CURP nueva → 201 |
| Evidencia | Fig. 5.2, §5.3 |

### RF-02 — Autenticación

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/login/page.tsx`, `lib/auth.ts`, `lib/supabaseClient.ts` |
| Funciones clave | `signInWithPassword()`, `getRoleForSession()`, `resolveRole()` |
| Prueba propuesta (Cap. VI) | CP-02: Login con credenciales válidas → sesión activa + redirección a /panel |
| Evidencia | §5.3 |

### RF-03 — Panel del candidato

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/panel/page.tsx` |
| Funciones clave | 5 efectos condicionados, `getRoleForSession()` |
| Prueba propuesta (Cap. VI) | CP-03: Acceso a /panel con sesión → carga módulos, vacantes y estado psicométrico |
| Evidencia | §5.4 |

### RF-04 — Catálogo de vacantes

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/vacantes/[id]/page.tsx`, RLS en `vacancies` |
| Prueba propuesta (Cap. VI) | CP-04: Catálogo excluye vacantes con `status = draft` |
| Evidencia | §5.5 |

### RF-05 — Detalle de vacante

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/vacantes/[id]/page.tsx` |
| Prueba propuesta (Cap. VI) | CP-05: Detalle muestra módulo, descripción y botón Postular |
| Evidencia | §5.5 |

### RF-06 — Verificación de psicométrico previo a postulación

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/api/vacancies/[id]/apply/route.ts`, `lib/psicometrico.ts` |
| Funciones clave | `getPsicometricoAttemptState()` |
| Prueba propuesta (Cap. VI) | CP-06: Candidato sin psicométrico → 403 con `requiresPsychometric: true` |
| Evidencia | §5.6.1, Paso 2 |

### RF-07 — Verificación de postulación por completitud (D-01)

| Campo | Valor |
|---|---|
| Estado | Implementado con discrepancia D-01 |
| Discrepancia | El Trabajo A indicaba bloqueo por puntaje de riesgo; la implementación solo verifica completitud |
| Código verificado | `if (!psicometricoState.completed)` en `apply/route.ts` |
| Prueba propuesta (Cap. VI) | CP-07: Candidato con clasificación Riesgo pero cuestionario enviado → puede postularse |
| Evidencia | §5.12.1, D-01 |

### RF-08 — Creación de aplicación e intento

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `apply/route.ts` — Pasos 5 y 6 |
| Prueba propuesta (Cap. VI) | CP-08: Segunda postulación a la misma vacante → reutiliza `application` existente |
| Evidencia | §5.6.1, Pasos 5-6 |

### RF-09 — Evaluación con temporizador

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/evaluacion/[attemptId]/cliente.tsx`, `app/api/attempts/[attemptId]/answers/route.ts` |
| Prueba propuesta (Cap. VI) | CP-09: Temporizador visible; envío automático al expirar |
| Evidencia | §5.7 |

### RF-10 — Carga de evidencias

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/evaluacion/[attemptId]/cliente.tsx`, bucket `evidences` |
| Tablas | `evidence_uploads` |
| Prueba propuesta (Cap. VI) | CP-10: Subir PDF de menos de 5 MB → aparece en lista de evidencias |
| Evidencia | §5.8, Fig. 5.4 |

### RF-11 — Envío del intento (D-02 indirecto)

| Campo | Valor |
|---|---|
| Estado | Implementado; afectado por D-02 en el almacenamiento del resumen |
| Componentes verificados | `app/api/attempts/[attemptId]/submit/route.ts` |
| Funciones clave | `calculatePsicometricoSummary()`, `isMissingColumnError()` |
| Nota `theory_score` | Para psicométrico: porcentaje de completitud 0–100. Para conocimientos: siempre 0 (limitación documentada). |
| Prueba propuesta (Cap. VI) | CP-11: Enviar intento psicométrico con 20 respuestas → `theory_score = 100`, `psychometric_summary` no nulo |
| Evidencia | §5.7.5 (corregido en C5C-04) |

### RF-12 — Visualización de resultado

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/resultado/[attemptId]/page.tsx` |
| Prueba propuesta (Cap. VI) | CP-12: Acceso a /resultado/[id] tras envío → muestra estado |
| Evidencia | §5.7 |

### RF-13 — Gestión de módulos (admin)

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/api/admin/modules/route.ts` |
| Prueba propuesta (Cap. VI) | CP-13: Crear módulo → aparece en lista; editar → cambios persistidos |
| Evidencia | §5.9.3 |

### RF-14 — Gestión de vacantes (admin)

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/api/admin/vacancies/route.ts`, `vacancies/[id]/route.ts` |
| Funciones clave | Auto-creación de assessment con rollback |
| Prueba propuesta (Cap. VI) | CP-14: Crear vacante → se crea assessment automáticamente; eliminar vacante → rollback si assessment falla |
| Evidencia | §5.9.4, FE-02 |

### RF-15 — Configuración de evaluación (admin)

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/api/admin/assessments/[id]/route.ts` |
| Prueba propuesta (Cap. VI) | CP-15: Editar título y duración de assessment → cambios reflejados al postularse |
| Evidencia | §5.9.5 |

### RF-16 — Gestión de preguntas (admin)

| Campo | Valor |
|---|---|
| Estado | Implementado sin discrepancia |
| Componentes verificados | `app/api/admin/assessments/[id]/questions/route.ts`, `app/api/admin/questions/[id]/route.ts` |
| Prueba propuesta (Cap. VI) | CP-16: Crear pregunta con prompt `MINI_BIG_FIVE | RASGO | texto` → aparece en evaluación psicométrica |
| Evidencia | §5.9.5 |

### RF-17 — Consulta de intentos (admin) (D-03)

| Campo | Valor |
|---|---|
| Estado | Implementado con discrepancia D-03 |
| Discrepancia | Endpoint de estadísticas devuelve solo 2 métricas; no se consume desde ninguna vista |
| Componentes verificados | `app/api/admin/attempts/route.ts`, `app/api/admin/vacancies/[id]/stats/route.ts` |
| Prueba propuesta (Cap. VI) | CP-17a: Lista de intentos con filtros → devuelve resultados. CP-17b: Detalle de intento → muestra resumen psicométrico si aplica |
| Evidencia | §5.9.6, §5.9.7, §5.12.3 |

### RF-18 — Registro de decisiones (admin) (D-02)

| Campo | Valor |
|---|---|
| Estado | Implementado con discrepancia D-02 |
| Discrepancia | Decisiones persisten en `reviews` como almacén primario; `attempts.decision` es fallback |
| Código verificado | `persistDecisionAndNotes()` en `api/admin/attempts/[id]/route.ts` |
| Prueba propuesta (Cap. VI) | CP-18: Aprobar intento → registro aparece en tabla `reviews`; campo `decision` de `attempts` como respaldo |
| Evidencia | §5.9.8, §5.12.2, Fig. 5.5 |

---

## 3. Funcionalidades emergentes (FE)

| FE | Descripción | RF relacionado | Estado |
|---|---|---|---|
| FE-01 | Rollback transaccional en registro | RF-01 | Implementado, supera diseño |
| FE-02 | Auto-creación de assessment al crear vacante | RF-14 | Implementado, supera diseño |
| FE-03 | Reutilización de intento existente al postular | RF-08 | Implementado, supera diseño |
| FE-04 | Envío automático al expirar el temporizador | RF-09 | Implementado, supera diseño |
| FE-05 | Detección de cambios de pestaña (`localStorage`) | RF-09 | Implementado, supera diseño |

---

## 4. Discrepancias — tabla resumen

| D | Descripción | RF afectados | Estado académico |
|---|---|---|---|
| D-01 | Verificación por completitud, no por puntaje psicométrico | RF-07 | Documentada; bloqueo automático por puntaje es trabajo futuro |
| D-02 | Tabla `reviews` como almacén primario de decisiones | RF-11, RF-18 | Documentada; evolución justificada |
| D-03 | Endpoint de estadísticas con alcance reducido | RF-17 | Documentada; integración con vista es trabajo futuro |
| D-04 | Rol `reviewer` definido en esquema, no operativo | — | Documentada; funcionalidad de revisión intermedia es trabajo futuro |
| D-05 | Lista de exclusión sin implementación | — | Documentada; requiere decisión institucional |

---

## 5. Conclusión de validación

Todos los 18 RF del Trabajo A tienen cobertura documentada en el Capítulo V. Las 5 discrepancias están formalmente descritas con código verificado, justificación de implementación y estado académico explícito. Las 5 funcionalidades emergentes están documentadas como mejoras sobre el diseño original. La trazabilidad es completa para la entrega académica.
