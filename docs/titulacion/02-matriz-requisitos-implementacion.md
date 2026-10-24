# Matriz de requisitos vs. implementación

**Proyecto:** UCES Plataforma de Talento — Trabajo B (Desarrollo e implementación)
**Fuente de requisitos:** Análisis y Diseño — Arciniega Robles Francisco Daniel (Trabajo A)
**Fecha:** 2026-10-22

Esta matriz cruza cada requisito funcional del Trabajo A con su implementación verificada en el repositorio del Trabajo B.

---

## 1. Requisitos funcionales (RF-01 a RF-18)

| ID | Descripción (Trabajo A) | Pág. PDF | Archivos de implementación | Tablas involucradas | Estado | Observaciones |
|---|---|---|---|---|---|---|
| RF-01 | Registrar cuenta con correo, contraseña y CURP | 46 | `app/register/page.tsx`, `app/api/auth/register/route.ts` | `auth.users`, `profiles`, `user_roles` | **IMPLEMENTADO** | Validación de CURP con regex. Inserción transaccional con rollback vía `admin.deleteUser`. |
| RF-02 | Controlar duplicación de CURP mediante huella HMAC | 46 | `lib/curp.ts`, `app/api/auth/register/route.ts` | `curp_hashes` | **IMPLEMENTADO** | HMAC-SHA256 con clave de entorno `CURP_HASH_SECRET`. UNIQUE index en `curp_hash`. |
| RF-03 | Gestionar acceso (autenticación, consultar rol, cerrar sesión) | 46 | `app/login/page.tsx`, `lib/auth.ts`, `supabase/roles.sql` | `auth.users`, `user_roles`, `profiles` | **IMPLEMENTADO** | `signInWithPassword`. Rol consultado mediante RPC `get_my_role()` con fallback a `profiles.role`. |
| RF-04 | Consultar módulos disponibles | 46 | `app/panel/page.tsx`, `app/modulos/[moduleId]/page.tsx` | `modules`, `vacancies` | **IMPLEMENTADO** | Módulos cargados como Server Component. Filtro `status !== 'draft'` en vacantes. |
| RF-05 | Consultar listado y detalle de vacantes | 46 | `app/modulos/[moduleId]/page.tsx`, `app/vacantes/[id]/page.tsx` | `modules`, `vacancies`, `assessments` | **IMPLEMENTADO** | Detalle incluye descripción, requisitos, horario, ubicación. |
| RF-06 | Completar cuestionario base (iniciar o recuperar intento) | 46 | `app/psicometrico/page.tsx`, `app/api/psicometrico/start/route.ts`, `lib/psicometrico.ts` | `applications`, `attempts`, `assessments` | **IMPLEMENTADO** | UUID fijo `f2000000-0000-0000-0000-000000000001`. Vacante interna `[INTERNAL]`. Reanuda intento existente si no fue enviado. |
| RF-07 | Iniciar postulación (verificar sesión, cuestionario, vacante abierta) | 46 | `app/vacantes/[id]/postular.tsx`, `app/api/vacancies/[id]/apply/route.ts` | `applications`, `attempts`, `vacancies`, `assessments` | **IMPLEMENTADO** | Verifica `psicometricoState.completed`. **Nota D-01:** NO verifica clasificación del resultado, solo que esté completado. |
| RF-08 | Responder evaluación (guardar o actualizar opción por pregunta) | 46 | `app/evaluacion/[attemptId]/cliente.tsx`, `app/api/attempts/[attemptId]/answers/route.ts` | `answers`, `attempts`, `questions` | **IMPLEMENTADO** | Upsert individual por selección. Verifica pertenencia del intento y del question al assessment correcto. |
| RF-09 | Controlar tiempo (conservar inicio y límite, mostrar restante, limitar guardado) | 46 | `app/evaluacion/[attemptId]/cliente.tsx`, `app/api/attempts/[attemptId]/answers/route.ts` | `attempts` | **IMPLEMENTADO** | `setInterval` 1000ms para countdown. `deadline_at` validado en el servidor antes de cada upsert. |
| RF-10 | Cargar evidencias (imágenes y PDF, registrar referencia) | 46 | `app/evaluacion/[attemptId]/cliente.tsx`, `supabase/rls.sql` | `evidence_uploads`, Storage bucket `evidences` | **IMPLEMENTADO** | `supabase.storage.from("evidences").upload(...)`. Path: `{attemptId}/{timestamp}-{random}.{ext}`. Registro en `evidence_uploads`. |
| RF-11 | Enviar intento (registrar envío, generar indicadores, colocar en UNDER_REVIEW) | 47 | `app/api/attempts/[attemptId]/submit/route.ts`, `lib/psicometricoResults.ts` | `attempts`, `answers`, `questions` | **IMPLEMENTADO** | Calcula `psychometric_summary` (Big Five) y `theory_score`. Actualiza `status = UNDER_REVIEW`, `submitted_at`. Anti-duplicado: rechaza si ya existe `submitted_at`. |
| RF-12 | Consultar seguimiento desde el perfil | 47 | `app/perfil/page.tsx` | `attempts`, `applications`, `vacancies`, `modules`, `reviews` | **IMPLEMENTADO** | Muestra vacante, módulo, fechas, estado, decisión y notas. Notificación de cambio mediante localStorage. |
| RF-13 | Administrar módulos (crear y editar) | 47 | `app/admin/page.tsx`, `app/api/admin/modules/route.ts`, `app/api/admin/modules/[id]/route.ts` | `modules` | **IMPLEMENTADO** | GET/POST en `/api/admin/modules`; PATCH/DELETE en `/api/admin/modules/[id]`. |
| RF-14 | Administrar vacantes (crear, editar, generar evaluación asociada, controlar eliminación) | 47 | `app/api/admin/vacancies/route.ts`, `app/api/admin/vacancies/[id]/route.ts`, `app/api/admin/vacancies/[id]/assessment/route.ts` | `vacancies`, `modules`, `assessments` | **IMPLEMENTADO** | POST crea vacante y genera evaluación base automáticamente (30 min por defecto, RN-10). DELETE bloqueado si hay intentos (RN-12). |
| RF-15 | Configurar evaluaciones (título, duración) | 47 | `app/api/admin/assessments/route.ts`, `app/api/admin/assessments/[id]/route.ts` | `assessments` | **IMPLEMENTADO** | PATCH para título y duración. Eliminación bloqueada si hay intentos asociados. |
| RF-16 | Administrar preguntas (CRUD con opciones y respuesta de referencia) | 47 | `app/api/admin/assessments/[id]/questions/route.ts`, `app/api/admin/questions/[id]/route.ts` | `questions`, `assessments` | **IMPLEMENTADO** | Opciones almacenadas como JSONB. `normalizeOptions()` maneja string, array y objeto. `correct_option` almacenado cuando se indica. |
| RF-17 | Consultar revisión administrativa (intentos, candidato, respuestas, evidencias, indicadores) | 47 | `app/admin/attempts/[id]/page.tsx`, `app/api/admin/attempts/[id]/detail/route.ts`, `app/api/admin/attempts/route.ts` | `attempts`, `answers`, `questions`, `evidence_uploads`, `applications`, `profiles`, `vacancies`, `modules` | **IMPLEMENTADO** | URL firmada (60 min) para evidencia. Resumen Big Five con 5 rasgos en detalle. |
| RF-18 | Registrar valoración (decisión y notas; aprobar, rechazar o marcar en revisión) | 47 | `app/api/admin/attempts/[id]/route.ts` (PATCH) | `reviews`, `attempts` | **IMPLEMENTADO** | `reviews` es el almacén **primario** (D-02). Fallback a `attempts.decision` solo si tabla `reviews` no existe (errores 42P01/PGRST205). Tres acciones: UNDER_REVIEW, COMPLETED+APPROVED, COMPLETED+REJECTED. |

---

## 2. Requisitos no funcionales (RNF-01 a RNF-07)

| ID | Criterio | Estado | Evidencia en implementación |
|---|---|---|---|
| RNF-01 | Claridad de interacción | **CUMPLIDO** | Sistema de badges con variantes `success`/`warning`/`destructive`. Mensajes de error en español. Barra de progreso y temporizador visibles. |
| RNF-02 | Control de acceso | **CUMPLIDO** | RLS en todas las tablas. `requireAdmin()` en todos los endpoints `/api/admin/**`. JWT validado en endpoints del candidato. |
| RNF-03 | Integridad de información | **CUMPLIDO** | Claves foráneas con CASCADE definidas en `schema.sql`. Restricciones CHECK en `applications.status` y `attempts.status`. UNIQUE en `answers(attempt_id, question_id)`. |
| RNF-04 | Persistencia y seguimiento | **CUMPLIDO** | Upsert individual por respuesta. `submitted_at` y `psychometric_summary` almacenados al enviar. `evidence_uploads` con path, mime_type, size. |
| RNF-05 | Acceso mediante navegador | **CUMPLIDO** | Aplicación web estándar (Next.js/React). Sin componentes nativos. Acceso remoto vía HTTPS en Vercel. |
| RNF-06 | Mantenibilidad documental | **CUMPLIDO** | TypeScript con tipos explícitos. Separación de responsabilidades: lib/, app/api/, app/(pages). README con instrucciones de configuración. |
| RNF-07 | Tratamiento de datos e identificadores | **CUMPLIDO** | CURP almacenada solo como hash (`curp_hashes`). Bucket `evidences` privado. URLs firmadas con vigencia de 60 minutos. UUIDs en todas las PKs. |

---

## 3. Reglas de negocio (RN-01 a RN-12)

| ID | Descripción | Estado | Verificación en código |
|---|---|---|---|
| RN-01 | Registro: formato CURP + huella antes de crear cuenta | **CUMPLIDO** | Regex en `register/page.tsx`. Consulta `curp_hashes` antes de `admin.createUser`. |
| RN-02 | Cuenta asignada a rol `user`; sin confirmación de correo | **CUMPLIDO** | `insertUserRole(userId, 'user')` en `register/route.ts`. `emailConfirm: false` en `admin.createUser`. |
| RN-03 | Postulación requiere sesión válida y cuestionario base completado | **CUMPLIDO PARCIALMENTE** | Verifica `psicometricoState.completed`. **Discrepancia D-01:** No verifica la clasificación del resultado. Completar el psicométrico es suficiente sin importar el score. |
| RN-04 | Postulación verifica vacante `open` y evaluación disponible | **CUMPLIDO** | `apply/route.ts` verifica `vacancy.status === 'open'` y obtiene `assessment_id`. |
| RN-05 | Reutilizar postulación/intento existente; crear nuevo solo si no hay | **CUMPLIDO** | `apply/route.ts` consulta aplicación existente antes de crear. Recupera intento no enviado antes de crear uno nuevo. |
| RN-06 | Servidor rechaza guardado de respuestas después del vencimiento o post-envío | **CUMPLIDO** | `answers/route.ts` valida `deadline_at > now()` y `status !== SUBMITTED`. |
| RN-07 | Auto-envío al vencer el tiempo con página abierta | **CUMPLIDO** | `autoSubmitTriggeredRef` en `cliente.tsx`. `setInterval` detecta `timeLeft <= 0` y llama `handleSubmit()`. |
| RN-08 | Selector de evidencia: imágenes y PDF; registra en Storage y `evidence_uploads` | **CUMPLIDO** | `accept="image/*,.pdf"` en input. `supabase.storage.upload`. INSERT en `evidence_uploads`. |
| RN-09 | Envío coloca en UNDER_REVIEW; aprobación/rechazo por revisión admin | **CUMPLIDO** | `submit/route.ts` actualiza `status = 'UNDER_REVIEW'`. Admin cambia a COMPLETED+decision. |
| RN-10 | Vacante genera evaluación con 30 minutos por defecto | **CUMPLIDO** | `POST /api/admin/vacancies/[id]/assessment` crea con `duration_minutes: 30`. |
| RN-11 | Vacante admite estados open/closed/draft; cierre impide nuevas postulaciones | **CUMPLIDO** | `apply/route.ts` verifica `status === 'open'`. Admin puede cambiar estado. |
| RN-12 | Eliminación bloqueada cuando existen intentos | **CUMPLIDO** | DELETE en vacancies y assessments consulta `attempts` asociados antes de permitir la eliminación. |

---

## 4. Casos de uso — estado de implementación

| ID | Caso de uso | Estado | Rutas implementadas |
|---|---|---|---|
| CU-01 | Registrar cuenta | IMPLEMENTADO | `/register`, `POST /api/auth/register` |
| CU-02 | Iniciar y cerrar sesión | IMPLEMENTADO | `/login`, `supabase.auth.signInWithPassword`, `signOut` |
| CU-03 | Consultar módulos y vacantes | IMPLEMENTADO | `/panel`, `/modulos/[moduleId]`, `/vacantes/[id]` |
| CU-04 | Completar cuestionario base | IMPLEMENTADO | `/psicometrico`, `POST /api/psicometrico/start`, `/evaluacion/[id]` |
| CU-05 | Postularse a una vacante | IMPLEMENTADO | `POST /api/vacancies/[id]/apply` |
| CU-06 | Responder una evaluación | IMPLEMENTADO | `/evaluacion/[id]` (cliente.tsx), `POST /api/attempts/[id]/answers` |
| CU-07 | Cargar evidencia | IMPLEMENTADO | `supabase.storage.upload` dentro de `cliente.tsx` |
| CU-08 | Enviar evaluación | IMPLEMENTADO | `POST /api/attempts/[id]/submit` |
| CU-09 | Consultar perfil y seguimiento | IMPLEMENTADO | `/perfil`, `/resultado/[id]` |
| CU-10 | Administrar módulos | IMPLEMENTADO | `/admin` (pestaña módulos), `GET/POST/PATCH/DELETE /api/admin/modules/` |
| CU-11 | Administrar vacantes | IMPLEMENTADO | `/admin` (pestaña vacantes), `GET/POST/PATCH/DELETE /api/admin/vacancies/` |
| CU-12 | Configurar evaluaciones y preguntas | IMPLEMENTADO | `/admin` (pestaña evaluaciones), `api/admin/assessments/`, `api/admin/questions/` |
| CU-13 | Consultar intentos y evidencias | IMPLEMENTADO | `/admin` (pestaña intentos), `/admin/attempts/[id]`, `GET /api/admin/attempts/[id]/detail` |
| CU-14 | Registrar decisión y observaciones | IMPLEMENTADO | `PATCH /api/admin/attempts/[id]`, tabla `reviews` (primaria) |

**Todos los 14 casos de uso están implementados en el repositorio.**

---

## 5. Diferencias entre diseño y implementación

Las siguientes diferencias entre el documento de análisis y la implementación real no representan incumplimientos sino evolución técnica durante el desarrollo:

| Elemento | Diseño (Trabajo A) | Implementación (Trabajo B) | Relevancia |
|---|---|---|---|
| Tabla `reviews` vs. `attempts` para decisiones | Documenta ambas como alternativas de persistencia | `reviews` es el almacén **primario**; `attempts.decision` es fallback solo si `reviews` no existe | Aclaración D-02. Ambos documentos son consistentes al describir las dos estructuras; la distinción de cuál es primaria corresponde al Trabajo B. |
| Indicadores del cuestionario base | Documenta clasificación etiquetada (Alta, Cooperativo, etc.) y `theory_score` como porcentaje de respuestas Likert reconocidas | Implementado en `lib/psicometricoResults.ts`; `theory_score = round(likertAnswered/20*100)`; clasificaciones exactas de la Tabla 34 del compañero | Coherentes. |
| Calificación de evaluaciones de conocimientos | `theory_score` NO compara con `correct_option`; se propone como trabajo futuro | Confirmado: `submit/route.ts` aplica el mismo cálculo psicométrico a todos los intentos; no calcula % aciertos | Coherentes. El Trabajo B debe aclarar esta limitación en Cap. V y Cap. VII. |
| UUID fijo del cuestionario base | El compañero describe el mecanismo de vacante interna pero no menciona el UUID hardcoded | `PSICOMETRICO_BASE_ASSESSMENT_ID = "f2000000-0000-0000-0000-000000000001"` en `assessmentConstants.ts` | Detalle de implementación propio del Trabajo B. No hay contradicción. |
| Restricción de unicidad usuario-vacante | El compañero la identifica como limitación y trabajo futuro (punto 8) | No implementada en el MVP. El esquema permite múltiples postulaciones del mismo usuario a la misma vacante | Coherentes. Ambos reportes coinciden en que es trabajo futuro. |
| `middleware.ts` de Next.js | El diseño describe protección de rutas como requerimiento de seguridad | No existe `middleware.ts`. Protección de rutas es client-side; seguridad de datos recae en RLS + JWT en APIs | El Trabajo B debe documentar esto como limitación de arquitectura (ver 00-preguntas-pendientes.md, P-09). |
| Nombre del sistema | "Plataforma de reclutamiento UCES" (Trabajo A) | "UCES Plataforma de Talento" (Trabajo B, README) | Diferencia menor de denominación. Ambos refieren al mismo sistema. Unificar en la presentación. |
| Estadísticas de vacante | No mencionadas en los requisitos del Trabajo A | Endpoint `GET /api/admin/vacancies/[id]/stats` implementado pero no integrado en UI | Característica adicional de implementación no solicitada en el análisis. Documentar como capacidad técnica disponible. |
| `practical_tasks` sin CRUD admin | El análisis documenta la tabla y su uso en evaluaciones | Tabla implementada y presente en seed; sin panel admin para CRUD | Trabajo futuro coincidente (punto 5 del compañero sobre "coherencia entre instrucciones y archivos"). |
| Rol `reviewer` | El compañero no menciona el rol `reviewer` en ningún requisito | Existe como CHECK en `profiles.role` pero no en `user_roles`; no implementado | Elemento heredado del esquema, no derivado del análisis. Documentar en limitaciones. |

---

## 6. Funcionalidades implementadas sin requisito explícito en el Trabajo A

| Funcionalidad | Descripción | Sección del Trabajo B |
|---|---|---|
| Separación Server/Client Components | Arquitectura Next.js App Router con Server Components para carga de datos y Client Components para interactividad | Cap. V — Entorno de desarrollo |
| Row Level Security (RLS) con `get_my_role()` | Función `security definer` con fallback a `profiles.role` para retrocompatibilidad | Cap. V — Base de datos |
| Hash CURP con variable de entorno | El Trabajo A especifica HMAC; el Trabajo B detalla el uso de `CURP_HASH_SECRET` como secreto de entorno | Cap. V — Autenticación |
| `requireAdmin()` como capa de seguridad de API | Función centralizada en `api/admin/utils.ts` que valida JWT + rol antes de cada operación administrativa | Cap. V — Panel administrativo |
| Psychometric summary como JSONB estructurado | Estructura específica de `psychometric_summary` con `miniBigFive`, `totals` y `submitMeta` | Cap. V — Módulo psicométrico |
| Auto-envío con `autoSubmitTriggeredRef` | Mecanismo de prevención de doble envío al agotar el tiempo | Cap. V — Módulo de evaluación |
| URLs firmadas con vigencia 1 hora | Implementación específica de `createSignedUrl(path, 3600)` | Cap. V — Storage |
| Endpoint de estadísticas no integrado | `GET /api/admin/vacancies/[id]/stats` retorna `applicationsCount` y `attemptsCount` | Cap. V/VII |
