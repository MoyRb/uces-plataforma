# Auditoría final — Capítulo V (Corte 5C)

**Fecha:** 2026-10-22
**Alcance:** Secciones 5.1 a 5.13 de `docs/titulacion/capitulos/05-desarrollo-implementacion.md`
**Estado al cierre:** AUDITADO Y CORREGIDO

---

## 1. Correcciones aplicadas en este corte

| ID | Sección | Tipo | Descripción |
|---|---|---|---|
| C5C-01 | Nota inicial (línea 3) | Error numérico | "5.9 a 5.12" → "5.9 a 5.13" |
| C5C-02 | §5.4.1 | Error de conteo | "cuatro efectos" → "cinco efectos" (el pseudocódigo mostraba Efecto 1…5) |
| C5C-03 | §5.6.1 | Error de conteo | "ocho pasos" → "seis pasos" (solo Paso 1…6 están documentados) |
| C5C-04 | §5.7.5 | Inconsistencia crítica | Eliminada afirmación incorrecta sobre cálculo de respuestas correctas en evaluaciones de conocimientos; sustituida por descripción precisa de `calculatePsicometricoSummary()` con `theory_score = 0` para conocimientos |
| C5C-05 | §5.13.2 | Inconsistencia de conteo | "Doce completos + Cuatro con discrepancia" no era coherente con la matriz integral; corregido a "Trece sin discrepancia + Tres discrepancias (D-01, D-02, D-03) + dos fuera de alcance" |
| C5C-06 | §5.12.4 | Snippet de código inexacto | Snippet de `resolveRole()` mostraba versión simplificada (`if (role === "admin") return "admin"`) que no coincide con el código real; corregido para mostrar la firma real `(role: string | null | undefined)` con condición `role === "admin" || role === "user"` |
| C5C-07 | §5.13.2 y validación | Conteo de RF incorrecto | RF-13 (gestión de módulos admin) marcado IMPLEMENTADO en la matriz pero omitido del conteo "sin discrepancia"; conteo corregido de 13 → **14**; §5.13.2 actualizado de "Trece" a "Catorce"; D-04/D-05 clarificados como aspectos de diseño, no RF del Trabajo A |

---

## 2. Resultado de la auditoría por sección

### Sección 5.1 — Arquitectura y estructura de directorios
- **Estado:** SIN OBSERVACIONES
- **Verificado:** Árbol de directorios coherente con el repositorio real.

### Sección 5.2 — Registro de usuarios
- **Estado:** SIN OBSERVACIONES
- **Verificado:** Diagrama de secuencia (Fig. 5.2) correcto. Rollback transaccional en tres puntos confirmado contra `register/route.ts`. HMAC-SHA256 para CURP descrito correctamente.

### Sección 5.3 — Autenticación y sesión
- **Estado:** SIN OBSERVACIONES
- **Verificado:** `getSession()` y `getRoleForSession()` descritos correctamente. `resolveRole()` con política mínimo privilegio confirmada.

### Sección 5.4 — Panel del candidato
- **Estado:** CORREGIDO (C5C-02)
- **Verificado:** Cinco efectos condicionados (Efecto 1…5) correctamente documentados tras la corrección. Comportamiento por rol (`isAdmin`) correcto.

### Sección 5.5 — Catálogo de vacantes y módulos
- **Estado:** SIN OBSERVACIONES
- **Verificado:** Consulta a `vacancies` y `modules` con RLS. Estado `draft` excluye vacantes del catálogo.

### Sección 5.6 — Postulación
- **Estado:** CORREGIDO (C5C-03)
- **Verificado:** Seis pasos secuenciales documentados tras la corrección. Confirmada descripción de verificación por completitud (no puntaje), coherente con D-01.

### Sección 5.7 — Evaluación con temporizador
- **Estado:** CORREGIDO (C5C-04)
- **Verificado:** `theory_score` para psicométrico (0–100, porcentaje de completitud) correcto. Para conocimientos, confirmado que `theory_score = 0` por ausencia de prefijo `MINI_BIG_FIVE`. Limitación funcional documentada.

### Sección 5.8 — Evidencias prácticas
- **Estado:** SIN OBSERVACIONES
- **Verificado:** Flujo de carga directo al bucket. Signed URLs de 60 min en admin. Limitación de `getPublicUrl()` en bucket privado correctamente reconocida.

### Sección 5.9 — Panel administrativo
- **Estado:** SIN OBSERVACIONES
- **Verificado:** 5 pestañas, 13 endpoints, helper `callAdmin`, CRUD de módulos/vacantes/evaluaciones/preguntas/intentos. Rollback en creación de vacante confirmado. Fig. 5.5 (persistencia de decisiones) coherente con código.

### Sección 5.10 — Seguridad
- **Estado:** SIN OBSERVACIONES
- **Verificado:** Fig. 5.6 (`requireAdmin()`) correcto. Triple capa de defensa de roles documentada. `SECURITY DEFINER` en `get_my_role()` explicado correctamente. Variables de entorno sin exposición de claves sensibles.

### Sección 5.11 — Módulo psicométrico
- **Estado:** SIN OBSERVACIONES
- **Verificado:** Fig. 5.7 (`ensurePsicometricoAttempt()`) correcto. Algoritmo de acumulación por prefijo `MINI_BIG_FIVE` descrito correctamente. Extroversión como indicador sin filtro (`withFilter = false`) documentado. Umbrales institucionales (≥16/≥11/<11) distinguidos de validación científica.

### Sección 5.12 — Evolución técnica y discrepancias
- **Estado:** CORREGIDO (C5C-06)
- **Verificado:** D-01 a D-05 con fragmentos de código fuente verificados. T-01 a T-05 con commits de evidencia. Nota sobre numeración RN pendiente de verificación contra PDF del Trabajo A. Snippet de `resolveRole()` en §5.12.4 corregido para coincidir con `lib/auth.ts` real.

### Sección 5.13 — Conclusiones
- **Estado:** CORREGIDO (C5C-05)
- **Verificado:** Conteo de RF alineado con la matriz integral de trazabilidad. Transición al Capítulo VI con referencia a capturas de evidencia pendientes.

---

## 3. Verificación de fragmentos de código

| # | Fragmento | Archivo fuente | Verificado |
|---|---|---|---|
| 0 | `resolveRole()` — firma real con `null \| undefined` y condición dual | `lib/auth.ts:5-11` | Sí (C5C-06) |
| 1 | Árbol de directorios | `ls my-app/`, `ls supabase/` | Sí |
| 2 | Diagrama Fig. 5.2 (registro) | `register/route.ts` | Sí |
| 3 | `hashCurpHmac()` | `lib/curp.ts` | Sí |
| 4 | Panel candidato — 5 efectos | `panel/page.tsx` | Sí |
| 5 | `apply/route.ts` — `getPsicometricoAttemptState` | `vacancies/[id]/apply/route.ts` | Sí |
| 6 | `calculatePsicometricoSummary()` — acumulación por rasgo | `lib/psicometricoResults.ts` | Sí |
| 7 | `theory_score = Math.round(likertAnswered/likertQuestions*100)` | `lib/psicometricoResults.ts` | Sí |
| 8 | `callAdmin` helper | `admin/page.tsx` | Sí |
| 9 | `persistDecisionAndNotes` / `upsertReview` | `api/admin/attempts/[id]/route.ts` | Sí |
| 10 | `requireAdmin()` — 4 verificaciones | `api/admin/utils.ts` | Sí |
| 11 | `get_my_role()` SECURITY DEFINER | `supabase/rls.sql` | Sí |
| 12 | `resolveRole()` mínimo privilegio | `lib/auth.ts` | Sí |
| 13 | `getRoleForSession()` fallback a "user" | `lib/auth.ts` | Sí |
| 14 | `createSignedUrl(path, 3600)` | `api/admin/attempts/[id]/detail/route.ts` | Sí |
| 15 | `buildTraitResult(…, false, "No es filtro…")` — extroversión | `lib/psicometricoResults.ts` | Sí |
| 16 | `isReviewDecision()` | `lib/reviewDecision.ts` | Sí |
| 17 | `parseOptionsInput()` | `admin/page.tsx` | Sí |
| 18 | Rollback vacante → assessment | `api/admin/vacancies/route.ts` | Sí |
| 19 | `normalizeOptions()` | `admin/page.tsx` | Sí |
| 20 | `isMissingColumnError()` — fallback T-04 | `attempts/[attemptId]/submit/route.ts` | Sí |

---

## 4. Verificación de figuras

| Figura | Descripción | Tipo | Ubicación en capítulo | Archivo .mmd | Coherencia |
|---|---|---|---|---|---|
| Fig. 5.1 | Arquitectura de tres capas | Diagrama de arquitectura (texto/tabla) | §5.1 | — | OK |
| Fig. 5.2 | Secuencia de registro con rollback | sequenceDiagram Mermaid | §5.3 | `diagramas/05a/fig-5-2-secuencia-registro.mmd` | OK |
| Fig. 5.3 | Secuencia de postulación (6 pasos) | sequenceDiagram Mermaid | §5.6 | `diagramas/05a/fig-5-3-secuencia-postulacion.mmd` | OK |
| Fig. 5.4 | Secuencia de carga de evidencias | sequenceDiagram Mermaid | §5.8 | `diagramas/05a/fig-5-4-secuencia-evidencias.mmd` | OK |
| Fig. 5.5 | Persistencia de decisiones (PATCH admin) | sequenceDiagram Mermaid | §5.9 | `diagramas/05b/fig-5-5-persistencia-decisiones.mmd` | OK |
| Fig. 5.6 | Flujo `requireAdmin()` | flowchart Mermaid | §5.10 | `diagramas/05b/fig-5-6-flujo-requireAdmin.mmd` | OK |
| Fig. 5.7 | Flujo `ensurePsicometricoAttempt()` | flowchart Mermaid | §5.11 | `diagramas/05b/fig-5-7-inicio-psicometrico.mmd` | OK |

**Resultado:** 7 figuras verificadas, 0 inconsistencias.

---

## 5. Consistencia con capítulos anteriores

| Aspecto | Verificado |
|---|---|
| Stack tecnológico (Cap. II) coherente con implementación (Cap. V) | Sí — Next.js, Supabase, TypeScript, Tailwind |
| Arquitectura de tres capas (Cap. III) presente en §5.13.1 | Sí |
| 8 iteraciones de prototipado (Cap. IV) mencionadas como contexto de T-02, T-04, T-05 | Sí |
| Sin contradicción con síntesis Cap. I sobre contexto institucional | Sí |

---

## 6. Terminología académica

Se verificó que el capítulo:
- Usa consistentemente "candidato" para el usuario no administrador
- Usa "intento" para `attempt`, "postulación" para `application`, "reactivo" para ítem psicométrico
- No usa anglicismos sin aclarar (todos los términos técnicos en inglés van acompañados de su explicación)
- Diferencia correctamente "completar el cuestionario" (requisito de acceso) de "resultado psicométrico" (información para el administrador)

---

## 7. Pendientes no resueltos en este corte

| Pendiente | Motivo |
|---|---|
| Verificar número exacto de RN (reglas de negocio) en §5.12.5 | PDF del Trabajo A no legible; requiere acceso manual al documento |
| Asignar números formales a tablas del capítulo | Necesario para la maquetación final en Word |
| Obtener 42 capturas de pantalla | Pendientes hasta pruebas del Capítulo VI |
