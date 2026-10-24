# Matriz de Trazabilidad — UCES Plataforma

**Proyecto:** UCES Plataforma de Talento (MVP)
**Fecha:** 2026-10-21 (actualizado post-contraste con código fuente)

Cada funcionalidad identificada se registra con su evidencia en el código fuente, tablas involucradas, estado de implementación y capítulo del reporte donde debe describirse.

**Estados de implementación:**
- `IMPLEMENTADO` — funcional y verificable en el código fuente
- `PARCIAL` — existe infraestructura pero la funcionalidad está incompleta
- `PROPUESTO` — referenciado en la interfaz o comentarios pero sin implementación backend

**Clasificación de afirmaciones (post-contraste):**
- `CONFIRMADO POR CÓDIGO` — verificado directamente en el código fuente; coherente con la descripción
- `DECLARADO POR DESARROLLADOR` — plausible y no contradecido, pero sin evidencia documental adicional
- `PENDIENTE DE EVIDENCIA` — requiere documento externo, prueba funcional o confirmación institucional
- `DISCREPANCIA DETECTADA` — la declaración del desarrollador no coincide con el comportamiento real del código

---

## F-01 | Registro de candidatos con validación de CURP

| Campo | Detalle |
|---|---|
| **Descripción** | Creación de cuenta de postulante con correo, contraseña y CURP. La CURP se valida con expresión regular y se almacena como hash HMAC-SHA256. |
| **Archivos** | `my-app/app/register/page.tsx`, `my-app/app/api/auth/register/route.ts`, `my-app/lib/curp.ts` |
| **Tablas** | `auth.users` (Supabase), `public.profiles`, `public.user_roles`, `public.curp_hashes` |
| **Servicios** | Supabase Auth (admin.createUser), Supabase DB, Node.js crypto (HMAC) |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | Regex `/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/`; `hashCurpHmac` con sha256; inserción transaccional con rollback vía `admin.deleteUser` en caso de fallo |
| **Clasificación** | CONFIRMADO POR CÓDIGO |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo de autenticación y registro) |

---

## F-02 | Autenticación de sesión por correo y contraseña

| Campo | Detalle |
|---|---|
| **Descripción** | Inicio de sesión con email y password usando Supabase Auth. Redirección automática si ya existe sesión activa. |
| **Archivos** | `my-app/app/login/page.tsx`, `my-app/lib/supabaseClient.ts` |
| **Tablas** | `auth.users` (Supabase) |
| **Servicios** | Supabase Auth (signInWithPassword, getSession) |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `supabase.auth.signInWithPassword({email, password})`; manejo de error con mensajes amigables en español; redirección a `/panel` tras autenticación exitosa |
| **Clasificación** | CONFIRMADO POR CÓDIGO |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo de autenticación y registro) |

---

## F-03 | Control de acceso basado en roles (user / admin)

| Campo | Detalle |
|---|---|
| **Descripción** | Sistema de roles binario (user/admin) implementado mediante tabla `user_roles` y función RPC `get_my_role()`. Las APIs de administración verifican el rol antes de ejecutar operaciones. |
| **Archivos** | `my-app/lib/auth.ts`, `my-app/app/api/admin/utils.ts`, `supabase/roles.sql`, `supabase/rls.sql` |
| **Tablas** | `public.user_roles`, `public.profiles` |
| **Servicios** | Supabase RPC (`get_my_role`), Supabase RLS |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `requireAdmin()` en todos los endpoints `/api/admin/**`; función `get_my_role()` con `security definer`; políticas RLS para operaciones admin que evalúan `public.get_my_role() = 'admin'`; fallback a `profiles.role` para retrocompatibilidad |
| **Clasificación** | CONFIRMADO POR CÓDIGO |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (seguridad y control de acceso) |

---

## F-04 | Gestión de módulos por el administrador

| Campo | Detalle |
|---|---|
| **Descripción** | CRUD de módulos (áreas de reclutamiento) desde el panel administrativo. Los módulos agrupan las vacantes. |
| **Archivos** | `my-app/app/admin/page.tsx` (pestaña "módulos"), `my-app/app/api/admin/modules/route.ts`, `my-app/app/api/admin/modules/[id]/route.ts` |
| **Tablas** | `public.modules` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | Endpoints GET/POST en `/api/admin/modules`; PATCH/DELETE en `/api/admin/modules/[id]`; formulario con nombre y descripción en `admin/page.tsx` |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (panel administrativo) |

---

## F-05 | Gestión de vacantes por el administrador

| Campo | Detalle |
|---|---|
| **Descripción** | CRUD completo de vacantes con campos título, módulo, horario, ubicación, descripción, requisitos y estado (open/closed/draft). Filtrado por módulo. |
| **Archivos** | `my-app/app/admin/page.tsx` (pestaña "vacantes"), `my-app/app/api/admin/vacancies/route.ts`, `my-app/app/api/admin/vacancies/[id]/route.ts` |
| **Tablas** | `public.vacancies`, `public.modules` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | GET con filtro `?module_id=`; POST crea vacante y genera evaluación base automáticamente; PATCH para edición/cierre; DELETE con validación de FK; estados open/closed/draft con badge visual |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (panel administrativo) |

---

## F-06 | Gestión de evaluaciones y preguntas

| Campo | Detalle |
|---|---|
| **Descripción** | CRUD de evaluaciones (título, duración) y de sus preguntas de opción múltiple (prompt, opciones en JSON, opción correcta). Cada vacante tiene máximo una evaluación. |
| **Archivos** | `my-app/app/admin/page.tsx` (pestaña "evaluaciones"), `my-app/app/api/admin/assessments/`, `my-app/app/api/admin/assessments/[id]/questions/route.ts`, `my-app/app/api/admin/questions/[id]/route.ts` |
| **Tablas** | `public.assessments`, `public.questions` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | Al crear vacante, el endpoint `POST /api/admin/vacancies/[id]/assessment` genera la evaluación base; preguntas almacenan opciones como JSONB; normalización de opciones en `normalizeOptions()` maneja string, array y objeto |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (panel administrativo) |

---

## F-07 | Catálogo de módulos y vacantes para el candidato

| Campo | Detalle |
|---|---|
| **Descripción** | El candidato autenticado visualiza módulos disponibles en `/panel`, accede al listado de vacantes de un módulo en `/modulos/[moduleId]`, y ve el detalle de una vacante en `/vacantes/[id]`. |
| **Archivos** | `my-app/app/panel/page.tsx`, `my-app/app/modulos/[moduleId]/page.tsx`, `my-app/app/vacantes/[id]/page.tsx` |
| **Tablas** | `public.modules`, `public.vacancies`, `public.assessments` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `/modulos/[moduleId]` usa `supabaseServer` (Server Component); filtra vacantes con `status !== 'draft'`; `/vacantes/[id]` muestra requisitos parseados de texto separado por coma/salto de línea |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo candidato) |

---

## F-08 | Test psicométrico obligatorio (Mini Big Five)

| Campo | Detalle |
|---|---|
| **Descripción** | Evaluación psicométrica basada en el modelo Mini Big Five de 20 ítems en escala Likert 1-5. Es un requisito previo a cualquier postulación a vacante. Mide cinco rasgos: Estabilidad Emocional, Amabilidad, Responsabilidad, Apertura y Extroversión. |
| **Archivos** | `my-app/app/psicometrico/page.tsx`, `my-app/lib/psicometrico.ts`, `my-app/lib/psicometricoResults.ts`, `my-app/lib/assessmentConstants.ts`, `my-app/app/api/psicometrico/start/route.ts`, `supabase/seed_psicometrico_base.sql` |
| **Tablas** | `public.assessments`, `public.questions`, `public.applications`, `public.attempts`, `public.answers` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | 20 preguntas con prefijo `MINI_BIG_FIVE | [RASGO] |` en el campo `prompt`; UUID fijo `f2000000-0000-0000-0000-000000000001`; vacancy interna `[INTERNAL] Psicométrico base` con status `draft`; duración: 10 minutos; el score de cada rasgo va de 4 (min) a 20 (max) con 4 ítems por rasgo |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo psicométrico) |

---

## F-09 | Cálculo automático del resumen psicométrico

| Campo | Detalle |
|---|---|
| **Descripción** | Al enviar el psicométrico, el servidor calcula automáticamente los scores por rasgo, su clasificación cualitativa y un `theory_score` general. El resultado se almacena como JSONB en `attempts.psychometric_summary`. |
| **Archivos** | `my-app/lib/psicometricoResults.ts`, `my-app/app/api/attempts/[attemptId]/submit/route.ts` |
| **Tablas** | `public.attempts`, `public.questions`, `public.answers` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `calculatePsicometricoSummary()` parsea el prompt por separador `\|`; clasificaciones: ≥16="Alta", ≥11="Adecuada", <11="Riesgo"; `theoryScore = round(likertAnswered / 20 * 100)`; extroversión no se clasifica por diseño |
| **Clasificación** | CONFIRMADO POR CÓDIGO — umbrales y lógica verificados en `lib/psicometricoResults.ts`. Los umbrales en sí (≥16/11/<11) son criterios institucionales sin validación publicada (PENDIENTE DE EVIDENCIA EV-07). |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo psicométrico) |

---

## F-10 | Postulación a vacante con guard de psicométrico

| Campo | Detalle |
|---|---|
| **Descripción** | El candidato se postula a una vacante abierta. El sistema verifica que el psicométrico esté completado antes de crear la postulación y el intento de evaluación. |
| **Archivos** | `my-app/app/vacantes/[id]/postular.tsx`, `my-app/app/api/vacancies/[id]/apply/route.ts`, `my-app/lib/psicometrico.ts` |
| **Tablas** | `public.applications`, `public.attempts`, `public.assessments`, `public.vacancies` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `getPsicometricoAttemptState()` verificado antes de crear application; si psicométrico incompleto retorna HTTP 403 con `requiresPsychometric: true, redirectTo: '/psicometrico'`; si ya existe application activa sin submit, retorna el attemptId existente |
| **Clasificación** | DISCREPANCIA DETECTADA — el guard verifica únicamente `psicometricoState.completed` (líneas 27-41 de `apply/route.ts`). No evalúa el score ni la clasificación del resultado. Un candidato con clasificación "Riesgo" puede postularse sin restricción. El bloqueo por score **no está implementado** en el MVP actual. Ver D-01 en `00-preguntas-pendientes.md`. |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo candidato); limitación a documentar en Cap. 7 |

---

## F-11 | Evaluación con temporizador y guardado automático

| Campo | Detalle |
|---|---|
| **Descripción** | Interfaz de evaluación con contador regresivo, guardado de respuestas por selección individual, barra de progreso y envío automático al agotar el tiempo. |
| **Archivos** | `my-app/app/evaluacion/[attemptId]/page.tsx`, `my-app/app/evaluacion/[attemptId]/cliente.tsx`, `my-app/app/api/attempts/[attemptId]/answers/route.ts` |
| **Tablas** | `public.attempts`, `public.questions`, `public.answers`, `public.evidence_uploads` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `setInterval` de 1000ms en `EvaluationClient`; `autoSubmitTriggeredRef` previene envíos duplicados; respuestas upsert en tiempo real; `deadline_at` calculado al crear el attempt; el psicométrico no muestra sección práctica (`showPracticalSection={!isPsicometricoBase}`) |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo de evaluación) |

---

## F-12 | Carga de evidencia práctica

| Campo | Detalle |
|---|---|
| **Descripción** | Durante la evaluación, el candidato puede subir un archivo (imagen o PDF) como evidencia de la tarea práctica. El archivo se almacena en el bucket `evidences` de Supabase Storage. |
| **Archivos** | `my-app/app/evaluacion/[attemptId]/cliente.tsx`, `supabase/rls.sql` |
| **Tablas** | `public.evidence_uploads`, Storage bucket `evidences` |
| **Servicios** | Supabase Storage |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `supabase.storage.from("evidences").upload(storagePath, file)`; path generado: `{attemptId}/{timestamp}-{random}.{ext}`; registro en `evidence_uploads` con path, mime_type, size; políticas de storage: upload propio, lectura para owner o admin |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo de evaluación) |

---

## F-13 | Página de resultado del candidato

| Campo | Detalle |
|---|---|
| **Descripción** | Tras el envío, el candidato ve una página de confirmación con el folio del intento, el estado actual, información de la evidencia subida y un enlace firmado para visualizarla. |
| **Archivos** | `my-app/app/resultado/[attemptId]/page.tsx` |
| **Tablas** | `public.attempts`, `public.evidence_uploads` |
| **Servicios** | Supabase DB, Supabase Storage (signed URL 1 hora) |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `createSignedUrl(evidence.path, 60*60)`; muestra folio del intento, estado y mensaje de tiempo estimado de revisión (2-3 días hábiles) |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo candidato) |

---

## F-14 | Perfil del candidato con seguimiento de postulaciones

| Campo | Detalle |
|---|---|
| **Descripción** | Página de perfil donde el candidato consulta el historial de todos sus intentos, con estado del proceso, decisión del administrador, notas del revisor y estadísticas de sus postulaciones. Detecta cambios nuevos en la decisión usando localStorage. |
| **Archivos** | `my-app/app/perfil/page.tsx` |
| **Tablas** | `public.profiles`, `public.attempts`, `public.applications`, `public.vacancies`, `public.modules`, `public.reviews` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | Consulta `attempts.decision` y fallback a `reviews.decision`; notificación de "Actualización nueva" usando localStorage con clave `lastSeenDecision:{userId}:{attemptId}`; mensajes de estado amigables en español por cada combinación status/decision |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo candidato) |

---

## F-15 | Panel administrativo con resumen operativo

| Campo | Detalle |
|---|---|
| **Descripción** | Vista de resumen para administradores con contadores de módulos, vacantes, evaluaciones e intentos. Muestra últimos 5 intentos recibidos y acciones rápidas de navegación. |
| **Archivos** | `my-app/app/admin/page.tsx` (pestaña "resumen") |
| **Tablas** | `public.modules`, `public.vacancies`, `public.assessments`, `public.attempts`, `public.applications`, `public.profiles` |
| **Servicios** | Supabase DB (vía API admin endpoints) |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | Carga paralela de módulos/vacantes/evaluaciones/intentos al montar; resumen numérico + lista de intentos recientes + panel de acciones rápidas |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (panel administrativo) |

---

## F-16 | Revisión y decisión de intentos por el administrador

| Campo | Detalle |
|---|---|
| **Descripción** | El administrador accede al detalle de un intento: datos del candidato, vacante, respuestas con opciones correctas, evidencia descargable y resumen psicométrico. Puede marcar el intento en revisión, aprobarlo o rechazarlo, y agregar notas. |
| **Archivos** | `my-app/app/admin/attempts/[id]/page.tsx`, `my-app/app/api/admin/attempts/[id]/detail/route.ts`, `my-app/app/api/admin/attempts/[id]/route.ts` |
| **Tablas** | `public.attempts`, `public.answers`, `public.questions`, `public.evidence_uploads`, `public.applications`, `public.profiles`, `public.vacancies`, `public.modules`, `public.reviews` |
| **Servicios** | Supabase DB, Supabase Storage (signed URL) |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | Signed URLs para archivos de evidencia generadas en `/detail`; acciones: "Marcar en revisión" (UNDER_REVIEW), "Aprobar" (COMPLETED + APPROVED), "Rechazar" (COMPLETED + REJECTED); confirmación si el intento ya está COMPLETED |
| **Clasificación** | DISCREPANCIA DETECTADA — la tabla `reviews` es el almacén **primario** de escritura y lectura de decisiones (función `persistDecisionAndNotes` en `route.ts` PATCH; función `readDecisionState` en `detail/route.ts` GET). El fallback hacia `attempts.decision` y `attempts.reviewer_notes` ocurre únicamente si `reviews` genera error 42P01 o PGRST205 (tabla inexistente). En producción con `reviews` existente, todas las decisiones se almacenan ahí. Ver D-02 en `00-preguntas-pendientes.md`. |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (panel administrativo) |

---

## F-17 | Visualización del resumen psicométrico en panel admin

| Campo | Detalle |
|---|---|
| **Descripción** | En la vista de detalle del intento, el administrador ve el resumen Mini Big Five con scores por rasgo, clasificación y las respuestas individuales de cada ítem. Esta información es solo interna. |
| **Archivos** | `my-app/app/admin/attempts/[id]/page.tsx` |
| **Tablas** | `public.attempts` (columna `psychometric_summary`), `public.answers`, `public.questions` |
| **Servicios** | Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | Mapeo de 5 rasgos con etiquetas en español; score/20, clasificación y lista de respuestas Likert individuales por rasgo; la extroversión muestra un indicador diferenciado |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (módulo psicométrico) |

---

## F-18 | Política de unicidad de CURP entre candidatos

| Campo | Detalle |
|---|---|
| **Descripción** | El sistema previene el registro de dos cuentas con la misma CURP almacenando un hash HMAC-SHA256. La verificación ocurre antes de crear el usuario en Supabase Auth. |
| **Archivos** | `my-app/app/api/auth/register/route.ts`, `my-app/lib/curp.ts`, `supabase/schema.sql` |
| **Tablas** | `public.curp_hashes` |
| **Servicios** | Node.js crypto, Supabase DB |
| **Estado** | IMPLEMENTADO |
| **Evidencia** | `UNIQUE INDEX curp_hash_unique_idx`; consulta `.eq("curp_hash", curpHash).maybeSingle()` antes del signup; retorna HTTP 400 "Esta CURP ya está registrada" si existe |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (seguridad y control de acceso) |

---

## F-19 | Gestión de tareas prácticas (practical_tasks)

| Campo | Detalle |
|---|---|
| **Descripción** | Las evaluaciones pueden tener tareas prácticas con instrucciones, entrega esperada y puntuación máxima. El candidato ve la tarea durante la evaluación y puede subir evidencia como respuesta. |
| **Archivos** | `supabase/schema.sql`, `supabase/seed.sql`, `my-app/app/evaluacion/[attemptId]/page.tsx`, `my-app/app/evaluacion/[attemptId]/cliente.tsx` |
| **Tablas** | `public.practical_tasks` |
| **Servicios** | Supabase DB |
| **Estado** | PARCIAL |
| **Evidencia** | Tabla definida y datos de prueba en seed; se muestra en la UI de evaluación; **no existe CRUD en el panel administrativo** — las tareas prácticas solo se pueden crear/editar por SQL directo |
| **Capítulo** | Cap. 5 — Desarrollo del sistema (limitaciones y trabajo futuro) |

---

## F-20 | Rol de revisor (reviewer)

| Campo | Detalle |
|---|---|
| **Descripción** | El schema original de `profiles` incluye el valor `reviewer` en el CHECK de la columna `role`. Implica la intención de un tercer rol con acceso de revisión sin privilegios de administración completa. |
| **Archivos** | `supabase/schema.sql` |
| **Tablas** | `public.profiles` |
| **Servicios** | — |
| **Estado** | PROPUESTO |
| **Evidencia** | `check (role in ('user','admin','reviewer'))` en schema.sql; no existe en `user_roles`; no hay políticas RLS ni rutas que distingan al reviewer del usuario regular |
| **Capítulo** | Cap. 5 — Trabajo futuro |

---

## F-21 | Estadísticas de vacante

| Campo | Detalle |
|---|---|
| **Descripción** | Endpoint para consultar estadísticas de una vacante específica: número de postulantes y número de intentos. |
| **Archivos** | `my-app/app/api/admin/vacancies/[id]/stats/route.ts` |
| **Tablas** | `public.applications`, `public.attempts` |
| **Servicios** | Supabase DB |
| **Estado** | PARCIAL |
| **Evidencia** | El endpoint existe, está protegido con `requireAdmin()` y retorna exactamente dos métricas: `applicationsCount` y `attemptsCount` (obtenidas mediante consultas paralelas con `count: "exact"`). No se consume desde ninguna vista del panel administrativo actual. |
| **Clasificación** | DISCREPANCIA DETECTADA — el desarrollador describió el endpoint como capaz de retornar 6+ métricas (candidatos por estado, tiempo promedio, etc.). El código real retorna únicamente `applicationsCount` y `attemptsCount`. Las métricas adicionales no están implementadas; son una propuesta. |
| **Capítulo** | Cap. 5 — Trabajo futuro (integración en UI del panel admin) |

---

## F-22 | Middleware de protección de rutas (servidor)

| Campo | Detalle |
|---|---|
| **Descripción** | Protección de rutas autenticadas a nivel de servidor usando middleware de Next.js, para evitar que el contenido se renderice antes de verificar la sesión. |
| **Archivos** | — (no existe `middleware.ts`) |
| **Tablas** | — |
| **Servicios** | — |
| **Estado** | PROPUESTO |
| **Evidencia** | La protección actual es client-side mediante `useEffect + getSession()`. No existe `middleware.ts` en el directorio `my-app/`. |
| **Clasificación** | CONFIRMADO POR CÓDIGO — ausencia de middleware.ts confirmada. La seguridad de datos está garantizada por RLS (capa de base de datos) y `requireAdmin()` (capa de API). La ausencia de middleware impacta únicamente la experiencia de navegación (UX), no la exposición de datos. Documentar como limitación de arquitectura conocida. |
| **Capítulo** | Cap. 5 — Trabajo futuro |
