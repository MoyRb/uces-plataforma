# Matriz integral de trazabilidad — Capítulo V

**Proyecto:** UCES Plataforma de Talento
**Fecha:** 2026-10-22
**Alcance:** 18 RF del Trabajo A + funcionalidades emergentes del desarrollo

Esta matriz relaciona cada requisito funcional con su caso de uso de referencia, los componentes que lo implementan, los endpoints involucrados, las tablas de base de datos, una prueba propuesta para el Capítulo VI, y la evidencia de implementación.

**Leyenda de estado:**
- `IMPLEMENTADO` — verificado en código fuente, funcional
- `PARCIAL` — infraestructura presente, funcionalidad incompleta
- `PROPUESTO` — mencionado en diseño o interfaz, sin implementación backend
- `DISCREPANCIA` — implementado con diferencia documentada respecto al diseño

---

## RF-01 — Registro de candidatos con validación de CURP

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-01: Registrar candidato |
| **Componente(s)** | `app/register/page.tsx` (formulario), `app/api/auth/register/route.ts` (lógica) |
| **Endpoint** | `POST /api/auth/register` |
| **Tablas** | `auth.users`, `profiles`, `user_roles`, `curp_hashes` |
| **Funciones clave** | `hashCurpHmac()`, `normalizeCurp()`, rollback con `admin.deleteUser()` |
| **Prueba propuesta** | Registrar candidato con CURP válida → verificar registros en 4 tablas; registrar con CURP duplicada → verificar 400; registrar con CURP inválida → verificar rechazo en regex |
| **Evidencia** | Patrón regex `/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/`; `hashCurpHmac` con HMAC-SHA256; 3 rollbacks en `register/route.ts` |

---

## RF-02 — Protección de CURP mediante HMAC-SHA256

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-01 (aspecto de seguridad) |
| **Componente(s)** | `lib/curp.ts`, `app/api/auth/register/route.ts` |
| **Endpoint** | `POST /api/auth/register` (usa hash internamente) |
| **Tablas** | `curp_hashes` |
| **Funciones clave** | `hashCurpHmac(secret, curp)`, `normalizeCurp(curp)` |
| **Prueba propuesta** | Verificar que la tabla `curp_hashes` no contiene CURP en claro; verificar que dos CURPs distintas producen hashes distintos; verificar que registrar la misma CURP dos veces produce error 400 |
| **Evidencia** | `crypto.createHmac("sha256", secret).update(normalizeCurp(curp)).digest("hex")`; UNIQUE INDEX en `curp_hashes` |

---

## RF-03 — Autenticación por correo/contraseña y resolución de rol

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-02: Iniciar sesión |
| **Componente(s)** | `app/login/page.tsx`, `lib/auth.ts`, `supabase/rls.sql` |
| **Endpoint** | Supabase Auth `signInWithPassword` (directo al cliente) |
| **Tablas** | `auth.users`, `user_roles`, `profiles` |
| **Funciones clave** | `signInWithPassword()`, `getRoleForSession()`, `resolveRole()`, `get_my_role()` RPC |
| **Prueba propuesta** | Login con credenciales válidas → verificar redirección a /panel y token JWT; login con contraseña incorrecta → verificar error; login como admin → verificar `role = "admin"` y acceso a /admin |
| **Evidencia** | `getRoleForSession` → RPC `get_my_role()` → `resolveRole()` (triple defensa) |

---

## RF-04 — Catálogo de módulos disponibles para el candidato

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-03: Consultar módulos |
| **Componente(s)** | `app/panel/page.tsx` (lista de módulos), `app/modulos/[moduleId]/page.tsx` (detalle) |
| **Endpoint** | Supabase client directo desde el panel; `supabaseServer()` en modulos/[moduleId] |
| **Tablas** | `modules`, `vacancies` |
| **Funciones clave** | `supabase.from("modules").select(...)`, relación `modules → vacancies` |
| **Prueba propuesta** | Navegar a /panel como candidato → verificar lista de módulos activos; navegar a /modulos/[id] → verificar lista de vacantes del módulo |
| **Evidencia** | Panel carga módulos en useEffect #4; modulos/[moduleId] usa Server Component con supabaseServer |

---

## RF-05 — Detalle de vacante y disponibilidad

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-04: Consultar vacante |
| **Componente(s)** | `app/vacantes/[id]/page.tsx`, `app/vacantes/[id]/postular.tsx` |
| **Endpoint** | `supabaseServer()` directo en Server Component |
| **Tablas** | `vacancies`, `assessments` |
| **Funciones clave** | `supabase.from("vacancies").select(...).eq("id", vacancyId)` |
| **Prueba propuesta** | Navegar a /vacantes/[id] con vacante open → verificar botón "Postularme" activo; navegar a vacante closed → verificar botón deshabilitado |
| **Evidencia** | `isOpen = vacancy.status === "open"` → `<ApplyButton disabled={!isOpen} />` |

---

## RF-06 — Cuestionario psicométrico Mini Big Five

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-05: Completar cuestionario psicométrico |
| **Componente(s)** | `app/psicometrico/page.tsx`, `lib/psicometrico.ts`, `app/evaluacion/[attemptId]/` |
| **Endpoint** | `POST /api/psicometrico/start` |
| **Tablas** | `assessments`, `questions`, `applications`, `attempts`, `answers` |
| **Funciones clave** | `ensurePsicometricoAttempt()`, `getPsicometricoAttemptState()` |
| **Prueba propuesta** | Navegar a /psicometrico → verificar redirección a /evaluacion/[attemptId]; completar 20 ítems → verificar envío y redirect a /panel; volver a /psicometrico tras completar → verificar redirect a /panel sin crear intento nuevo |
| **Evidencia** | UUID fijo `f2000000-0000-0000-0000-000000000001`; vacante interna status draft; 20 preguntas con prefijo MINI_BIG_FIVE |

---

## RF-07 — Postulación a vacante con verificaciones previas

| Campo | Detalle |
|---|---|
| **Estado** | DISCREPANCIA D-01 |
| **Caso de uso** | CU-06: Postularse a vacante |
| **Componente(s)** | `app/vacantes/[id]/postular.tsx`, `app/api/vacancies/[id]/apply/route.ts` |
| **Endpoint** | `POST /api/vacancies/[id]/apply` |
| **Tablas** | `applications`, `attempts`, `assessments`, `vacancies` |
| **Funciones clave** | `getPsicometricoAttemptState()`, 6 pasos de validación en route handler |
| **Prueba propuesta** | Postularse sin psicométrico → verificar HTTP 403 con `requiresPsychometric: true`; postularse con psicométrico completado → verificar 200 y redirect a /evaluacion; postularse a vacante cerrada → verificar 400 |
| **Evidencia** | Discrepancia D-01: guard verifica `completed`, no score psicométrico |

---

## RF-08 — Guardado de respuestas durante la evaluación

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-07: Responder evaluación |
| **Componente(s)** | `app/evaluacion/[attemptId]/cliente.tsx`, `app/api/attempts/[attemptId]/answers/route.ts` |
| **Endpoint** | `POST /api/attempts/[attemptId]/answers` |
| **Tablas** | `answers`, `attempts`, `questions` |
| **Funciones clave** | `handleSelect()`, `saveAnswer()`, `supabase.from("answers").upsert(...)` |
| **Prueba propuesta** | Seleccionar respuesta → verificar guardado en `answers` con UPSERT; seleccionar misma pregunta dos veces → verificar que solo existe un registro (no duplicado); intentar guardar con tiempo expirado → verificar HTTP 400 del servidor |
| **Evidencia** | UPSERT en `answers/route.ts:74-78`; validación `Date.now() > deadline_at` en servidor |

---

## RF-09 — Control de tiempo en la evaluación

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-07 (aspecto temporal) |
| **Componente(s)** | `app/evaluacion/[attemptId]/cliente.tsx` (timer), `app/api/attempts/[attemptId]/answers/route.ts` (validación) |
| **Endpoint** | `POST /api/attempts/[attemptId]/answers` (valida deadline_at) |
| **Tablas** | `attempts` (campo `deadline_at`) |
| **Funciones clave** | `setInterval` 1000ms, `autoSubmitTriggeredRef`, `Date.now() > deadline_at` |
| **Prueba propuesta** | Crear intento con duración mínima → esperar expiración → verificar envío automático; verificar que el servidor rechaza respuestas tras el deadline |
| **Evidencia** | `autoSubmitTriggeredRef.current = true` en `cliente.tsx:215`; validación servidor en `answers/route.ts:64` |

---

## RF-10 — Carga de evidencia práctica

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-08: Subir evidencia |
| **Componente(s)** | `app/evaluacion/[attemptId]/cliente.tsx` |
| **Endpoint** | Supabase Storage directo + INSERT a `evidence_uploads` |
| **Tablas** | `evidence_uploads`, Storage bucket `evidences` |
| **Funciones clave** | `handleUpload()`, `supabase.storage.from("evidences").upload(...)` |
| **Prueba propuesta** | Subir imagen durante evaluación → verificar registro en `evidence_uploads` y archivo en Storage; subir archivo no admitido mediante manipulación del DOM → verificar que se almacena (limitación documentada) |
| **Evidencia** | Path `{attemptId}/{timestamp}-{random}.{ext}`; `accept="image/*,application/pdf"` en input |

---

## RF-11 — Envío del intento y cálculo de resultados

| Campo | Detalle |
|---|---|
| **Estado** | DISCREPANCIA D-02 |
| **Caso de uso** | CU-09: Enviar evaluación |
| **Componente(s)** | `app/evaluacion/[attemptId]/cliente.tsx`, `app/api/attempts/[attemptId]/submit/route.ts` |
| **Endpoint** | `POST /api/attempts/[attemptId]/submit` |
| **Tablas** | `attempts`, `questions`, `answers`, `reviews` (fallback) |
| **Funciones clave** | `calculatePsicometricoSummary()`, `isMissingColumnError()` |
| **Prueba propuesta** | Enviar intento psicométrico → verificar `psychometric_summary` en `attempts`; verificar `theory_score = 100` cuando todos respondidos; enviar intento ya enviado → verificar error 400 |
| **Evidencia** | `theory_score = Math.round(likertAnswered / likertQuestions * 100)`; fallback a reviews si columna ausente |

---

## RF-12 — Seguimiento de postulaciones en el perfil

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-10: Consultar perfil y decisiones |
| **Componente(s)** | `app/perfil/page.tsx` |
| **Endpoint** | Supabase client directo (consulta attempts + applications + vacancies + reviews) |
| **Tablas** | `profiles`, `attempts`, `applications`, `vacancies`, `modules`, `reviews` |
| **Funciones clave** | Lectura de `attempts.decision` con fallback a `reviews.decision`; detección de cambios con localStorage |
| **Prueba propuesta** | Navegar a /perfil → verificar listado de intentos; aprobar un intento desde admin → verificar "Actualización nueva" en perfil del candidato |
| **Evidencia** | F-14 en `00-matriz-trazabilidad.md`; localStorage con clave `lastSeenDecision:{userId}:{attemptId}` |

---

## RF-13 — Gestión de módulos por el administrador

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-11: Administrar módulos |
| **Componente(s)** | `app/admin/page.tsx` (pestaña módulos), `app/api/admin/modules/route.ts`, `app/api/admin/modules/[id]/route.ts` |
| **Endpoint** | `GET /api/admin/modules`, `POST /api/admin/modules`, `PATCH /api/admin/modules/[id]` |
| **Tablas** | `modules` |
| **Funciones clave** | `requireAdmin()`, `toNullableText()` |
| **Prueba propuesta** | Crear módulo → verificar en BD; editar nombre → verificar actualización; acceder sin token → verificar 401; acceder con token de candidato → verificar 403 |
| **Evidencia** | Endpoints protegidos con `requireAdmin()`; GET acepta `?search=` con ILIKE |

---

## RF-14 — Gestión de vacantes por el administrador

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-12: Administrar vacantes |
| **Componente(s)** | `app/admin/page.tsx` (pestaña vacantes), `app/api/admin/vacancies/route.ts`, `app/api/admin/vacancies/[id]/route.ts` |
| **Endpoint** | `GET/POST /api/admin/vacancies`, `PATCH/DELETE /api/admin/vacancies/[id]` |
| **Tablas** | `vacancies`, `assessments` |
| **Funciones clave** | POST crea assessment base automáticamente con rollback |
| **Prueba propuesta** | Crear vacante → verificar creación simultánea de assessment; eliminar vacante con postulaciones activas → verificar comportamiento de FK; cerrar vacante → verificar `status = "closed"` |
| **Evidencia** | Rollback manual si falla assessment en `vacancies/route.ts:90-94` |

---

## RF-15 — Configuración de evaluaciones por el administrador

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-13: Configurar evaluación |
| **Componente(s)** | `app/admin/page.tsx` (pestaña evaluaciones), `app/api/admin/assessments/[id]/route.ts` |
| **Endpoint** | `PATCH /api/admin/assessments/[id]` |
| **Tablas** | `assessments` |
| **Funciones clave** | `requireAdmin()`, validación de `duration_minutes` |
| **Prueba propuesta** | Cambiar duración de evaluación → verificar que nuevos intentos usan la duración actualizada; acceder sin rol admin → verificar 403 |
| **Evidencia** | Endpoint PATCH con `title` y `duration_minutes` en `assessments/[id]/route.ts` |

---

## RF-16 — Administración de preguntas de evaluaciones

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-14: Gestionar preguntas |
| **Componente(s)** | `app/admin/page.tsx` (pestaña evaluaciones), `app/api/admin/assessments/[id]/questions/route.ts`, `app/api/admin/questions/[id]/route.ts` |
| **Endpoint** | `GET/POST /api/admin/assessments/[id]/questions`, `PATCH/DELETE /api/admin/questions/[id]` |
| **Tablas** | `questions` |
| **Funciones clave** | `normalizeOptions()`, `parseOptionsInput()`, `requireAdmin()` |
| **Prueba propuesta** | Agregar pregunta con opciones separadas por coma → verificar almacenamiento como JSONB; editar opción correcta → verificar actualización; eliminar pregunta → verificar que respuestas existentes no se corrompan |
| **Evidencia** | Opciones almacenadas como JSONB; normalización en `normalizeOptions()` |

---

## RF-17 — Consulta de intentos y revisión por el administrador

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Caso de uso** | CU-15: Revisar intentos |
| **Componente(s)** | `app/admin/page.tsx` (pestaña intentos), `app/admin/attempts/[id]/page.tsx`, `app/api/admin/attempts/route.ts`, `app/api/admin/attempts/[id]/detail/route.ts` |
| **Endpoint** | `GET /api/admin/attempts`, `GET /api/admin/attempts/[id]/detail` |
| **Tablas** | `attempts`, `answers`, `questions`, `evidence_uploads`, `applications`, `profiles`, `vacancies`, `modules` |
| **Funciones clave** | Consulta con relaciones anidadas; signed URLs para evidencias; lectura de psychometric_summary |
| **Prueba propuesta** | Abrir detalle de intento psicométrico → verificar scores por rasgo; verificar que signed URL de evidencia es funcional; filtrar intentos por vacante → verificar resultado |
| **Evidencia** | Signed URL con vigencia 3600s; psychometric_summary visible solo para admin |

---

## RF-18 — Registro de decisión del administrador

| Campo | Detalle |
|---|---|
| **Estado** | DISCREPANCIA D-02 |
| **Caso de uso** | CU-16: Registrar decisión |
| **Componente(s)** | `app/admin/attempts/[id]/page.tsx`, `app/api/admin/attempts/[id]/route.ts` |
| **Endpoint** | `PATCH /api/admin/attempts/[id]` |
| **Tablas** | `reviews` (primario), `attempts` (fallback: `decision`, `reviewer_notes`) |
| **Funciones clave** | `persistDecisionAndNotes()`, `upsertReview()`, `isReviewDecision()` |
| **Prueba propuesta** | Aprobar intento → verificar `decision = "APPROVED"` en `reviews`; rechazar con notas → verificar registro en `reviews.notes`; verificar que decisión APPROVED aparece en /perfil del candidato |
| **Evidencia** | `reviews` es almacén primario (D-02); `ReviewDecision = "APPROVED" \| "REJECTED"` |

---

## Funcionalidades emergentes (sin RF explícito en el Trabajo A)

### FE-01 — Rollback transaccional en registro

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Origen** | Decisión de implementación para garantizar consistencia de datos |
| **Componente(s)** | `app/api/auth/register/route.ts` |
| **Tablas** | `auth.users`, `profiles`, `curp_hashes`, `user_roles` |
| **Prueba propuesta** | Simular fallo en INSERT profiles → verificar que usuario en auth.users es eliminado |

### FE-02 — Auto-creación de assessment al publicar vacante

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Origen** | Simplificación del flujo administrativo |
| **Componente(s)** | `app/api/admin/vacancies/route.ts` |
| **Tablas** | `assessments` |
| **Prueba propuesta** | Crear vacante → verificar existencia de assessment en BD; confirmar título `"Evaluación - [título vacante]"` |

### FE-03 — Reutilización de intento activo en postulación

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Origen** | Decisión de UX para permitir retomar una evaluación interrumpida |
| **Componente(s)** | `app/api/vacancies/[id]/apply/route.ts` |
| **Tablas** | `attempts` |
| **Prueba propuesta** | Iniciar evaluación → cerrar navegador → volver a postularse → verificar que retoma el mismo intento sin duplicar |

### FE-04 — Envío automático al expirar el tiempo

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Origen** | Garantía de que el tiempo límite se cumple sin intervención del candidato |
| **Componente(s)** | `app/evaluacion/[attemptId]/cliente.tsx` |
| **Tablas** | `attempts` |
| **Prueba propuesta** | Crear intento con duración de 1 minuto → no enviar manualmente → verificar envío automático al expirar |

### FE-05 — Detección de cambios nuevos en /perfil con localStorage

| Campo | Detalle |
|---|---|
| **Estado** | IMPLEMENTADO |
| **Origen** | Mejora de UX para que el candidato sepa que hay una decisión nueva |
| **Componente(s)** | `app/perfil/page.tsx` |
| **Tablas** | — (solo localStorage) |
| **Prueba propuesta** | Cambiar decisión de intento desde admin → navegar a /perfil → verificar indicador "Actualización nueva" |

---

## Resumen de cobertura

| Categoría | Cantidad |
|---|---|
| RF del Trabajo A: implementados sin discrepancia | 13 |
| RF del Trabajo A: implementados con discrepancia documentada | 3 (D-01, D-02, D-02) |
| RF del Trabajo A: parciales o propuestos | 2 (reviewer, lista negra) |
| Funcionalidades emergentes implementadas | 5 |
| **Total RF del Trabajo A cubiertos** | **18 / 18** |
