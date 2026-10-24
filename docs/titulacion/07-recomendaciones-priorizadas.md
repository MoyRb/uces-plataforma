# Recomendaciones priorizadas para trabajo futuro — Capítulo VII

**Fecha:** 2026-10-23
**Fuente:** Discrepancias D-01..D-05, incidencias INC-6B-01/02, limitaciones documentadas en §1.6, y las 11 líneas de trabajo futuro del Trabajo A (Arciniega Robles, 2026).

---

## Criterios de priorización

Cada recomendación se clasifica en dos dimensiones:

- **Impacto:** Bajo / Medio / Alto — efecto sobre la utilidad operativa o la seguridad del sistema.
- **Complejidad:** Baja / Media / Alta — esfuerzo técnico estimado para implementarla.

La prioridad resultante (P1/P2/P3) pondera impacto alto con complejidad baja como las primeras a abordar.

---

## 1. Correcciones de defectos documentados (Prioridad P1)

### R-01 — Corregir UPSERT de respuestas (INC-6B-01)

| Campo | Detalle |
|---|---|
| **Origen** | INC-6B-01; CP-10 APROBADO PARCIAL |
| **Archivo** | `app/api/attempts/[attemptId]/answers/route.ts:74` |
| **Cambio requerido** | `.upsert({...}, { onConflict: "attempt_id,question_id" })` |
| **Impacto** | Medio — el candidato actualmente no puede cambiar una respuesta ya enviada |
| **Complejidad** | Baja — cambio de una línea |
| **Prioridad** | **P1** |

### R-02 — Corregir `upsertReview` para usar la tabla `reviews` (INC-6B-02)

| Campo | Detalle |
|---|---|
| **Origen** | INC-6B-02; CP-20 APROBADO PARCIAL; D-02 |
| **Archivo** | `app/api/admin/attempts/[id]/route.ts:146-199` |
| **Cambio requerido** | Agregar intento `writeReview("comments", false)` (sin `updated_at`) en el flujo de reintentos. El orden correcto: (1) `notes` → (2) `comments`+`updated_at` → (3) **`comments` sin `updated_at`** → (4) fallback |
| **Impacto** | Medio — las decisiones se persisten en `attempts.decision` en lugar de `reviews`; la auditoría de revisiones queda incompleta |
| **Complejidad** | Baja — agregar una rama al flujo de reintentos existente |
| **Prioridad** | **P1** |

---

## 2. Mejoras de seguridad y robustez (Prioridad P1-P2)

### R-03 — Implementar middleware de protección de rutas (`middleware.ts`)

| Campo | Detalle |
|---|---|
| **Origen** | Limitación declarada en §1.6 |
| **Descripción** | Agregar `middleware.ts` de Next.js para redirigir en el servidor a usuarios no autenticados que intenten acceder a `/panel`, `/admin` o `/evaluacion/`. La protección actual es client-side (useEffect), lo que implica que el HTML de la página se entrega antes de la verificación. |
| **Impacto** | Alto — elimina una categoría de ataque de recolección de información y mejora la experiencia de usuario |
| **Complejidad** | Baja-Media — Next.js App Router tiene soporte nativo |
| **Prioridad** | **P1** |

### R-04 — Eliminar import no utilizado `LayoutDashboard` (H-6A-03)

| Campo | Detalle |
|---|---|
| **Archivo** | `app/admin/page.tsx:11` |
| **Cambio** | Eliminar `LayoutDashboard` del import de `lucide-react` |
| **Impacto** | Muy bajo — advertencia de linter; sin impacto funcional |
| **Complejidad** | Muy baja |
| **Prioridad** | **P1** (limpieza de código) |

---

## 3. Funcionalidades de diseño no implementadas en el MVP (Prioridad P2)

### R-05 — Implementar filtro de postulación por clasificación psicométrica (D-01)

| Campo | Detalle |
|---|---|
| **Origen** | D-01; §1.6 |
| **Descripción** | Agregar condición en `apply/route.ts` para bloquear candidatos con clasificación "Riesgo" en rasgos relevantes. Requiere decisión institucional sobre qué rasgos son filtros de contratación. |
| **Impacto** | Alto para el proceso de RR. HH. — alinea el comportamiento del sistema con el diseño del Trabajo A |
| **Complejidad** | Media — la lógica de scoring ya existe; falta la condición de bloqueo y la configuración por vacante |
| **Prioridad** | **P2** |

### R-06 — Operacionalizar el rol `reviewer` (D-04)

| Campo | Detalle |
|---|---|
| **Origen** | D-04; §1.6 |
| **Descripción** | `resolveRole("reviewer")` retorna `"user"`. Para activar el rol: (1) agregar `"reviewer"` a la lógica de `resolveRole()`; (2) crear endpoints de revisión con nivel de acceso intermedio; (3) definir las políticas RLS correspondientes en la BD. |
| **Impacto** | Medio — permite delegar revisiones sin otorgar privilegios administrativos completos |
| **Complejidad** | Media-Alta |
| **Prioridad** | **P2** |

### R-07 — Implementar lista de exclusión de candidatos (D-05)

| Campo | Detalle |
|---|---|
| **Origen** | D-05 |
| **Descripción** | Crear tabla `exclusion_list` con hashes de CURP de candidatos excluidos. Verificar en `apply/route.ts` antes de permitir postulación. Requiere interfaz admin para gestionar la lista. |
| **Impacto** | Alto para el proceso de RR. HH. — control sobre candidatos que no deben ser readmitidos |
| **Complejidad** | Media |
| **Prioridad** | **P2** |

### R-08 — Integrar vista de estadísticas en el panel admin (D-03)

| Campo | Detalle |
|---|---|
| **Origen** | D-03 |
| **Descripción** | El endpoint `GET /api/admin/vacancies/[id]/stats` ya existe y retorna `applicationsCount` y `attemptsCount`. Falta una vista en el panel que consuma estos datos y los presente gráficamente. Extender el endpoint con métricas adicionales (conversión, tiempo promedio, distribución de scores). |
| **Impacto** | Medio — visible operativamente para el área de RR. HH. |
| **Complejidad** | Media |
| **Prioridad** | **P2** |

---

## 4. Extensiones funcionales (Prioridad P3)

### R-09 — Incorporar pruebas automatizadas (H-6A-04)

| Campo | Detalle |
|---|---|
| **Herramientas sugeridas** | Playwright (E2E), Vitest (unitarias para `lib/`) |
| **Alcance inicial** | Pruebas unitarias de `calculatePsicometricoSummary()`, `hashCurpHmac()`, `resolveRole()`. Pruebas E2E para flujo registro → psicométrico → postulación. |
| **Impacto** | Alto para mantenibilidad; previene regresiones |
| **Complejidad** | Media-Alta |
| **Prioridad** | **P3** |

### R-10 — Implementar notificaciones automáticas por correo

| Campo | Detalle |
|---|---|
| **Origen** | Limitación declarada en §1.6; trabajo futuro del Trabajo A |
| **Descripción** | Notificar al candidato cuando su evaluación sea revisada y cuando se emita una decisión. Supabase Database Webhooks + servicio de envío de correo (Resend, SendGrid). |
| **Impacto** | Alto para la experiencia del candidato |
| **Complejidad** | Media |
| **Prioridad** | **P3** |

### R-11 — Validación psicométrica formal del instrumento

| Campo | Detalle |
|---|---|
| **Origen** | Limitación declarada en §1.6 |
| **Descripción** | Someter el instrumento de 20 ítems a un proceso de validación con análisis de consistencia interna (alfa de Cronbach), análisis factorial confirmatorio y revisión de la procedencia del cuestionario institucional. |
| **Impacto** | Alto para la validez académica y operativa del módulo psicométrico |
| **Complejidad** | Alta — requiere muestra, metodología y experto en psicometría |
| **Prioridad** | **P3** |

### R-12 — Interfaz administrativa para tareas prácticas (`practical_tasks`)

| Campo | Detalle |
|---|---|
| **Origen** | Limitación declarada en §1.6 |
| **Descripción** | La tabla `practical_tasks` existe en el schema pero no tiene formulario en el panel admin. Agregar CRUD en `/api/admin/assessments/[id]/tasks` con vista correspondiente. |
| **Impacto** | Medio — permite configurar tareas sin acceso directo a SQL |
| **Complejidad** | Media |
| **Prioridad** | **P3** |

---

## 5. Tabla resumen de recomendaciones

| ID | Descripción | Impacto | Complejidad | Prioridad |
|---|---|---|---|---|
| R-01 | Corregir UPSERT respuestas (`onConflict`) | Medio | Baja | **P1** |
| R-02 | Corregir `upsertReview` schema mismatch | Medio | Baja | **P1** |
| R-03 | Middleware de protección de rutas | Alto | Media | **P1** |
| R-04 | Eliminar import `LayoutDashboard` | Muy bajo | Muy baja | **P1** |
| R-05 | Filtro de postulación por clasificación (D-01) | Alto | Media | **P2** |
| R-06 | Operacionalizar rol `reviewer` (D-04) | Medio | Media-Alta | **P2** |
| R-07 | Lista de exclusión (D-05) | Alto | Media | **P2** |
| R-08 | Vista de estadísticas en panel (D-03) | Medio | Media | **P2** |
| R-09 | Pruebas automatizadas (Playwright/Vitest) | Alto | Media-Alta | **P3** |
| R-10 | Notificaciones por correo | Alto | Media | **P3** |
| R-11 | Validación psicométrica formal | Alto | Alta | **P3** |
| R-12 | CRUD de `practical_tasks` en admin | Medio | Media | **P3** |
