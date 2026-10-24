# Matriz de casos de prueba — Corte 6A

**Fecha:** 2026-10-22
**Total de casos:** 22
**Base:** `06-plan-pruebas.md` (Corte 5C) + verificación de código fuente (Corte 6A)
**Estado general:** BLOQUEADO — requiere entorno activo para ejecución funcional

---

## Grupo A — Registro y autenticación

### CP-01 — Registro de candidato nuevo

| Campo | Detalle |
|---|---|
| **ID** | CP-01 |
| **RF cubierto** | RF-01 (Registro de candidatos con validación de CURP) |
| **Prioridad** | Alta |
| **Objetivo** | Verificar que el registro crea correctamente al usuario en 4 tablas con validación de CURP |
| **Precondiciones** | CURP no registrada en `curp_hashes`, email no utilizado en `auth.users` |
| **Datos necesarios** | email: `candidato.prueba.01@test.com`, password: `Prueba1234!`, nombre: `Candidato Prueba Uno`, CURP: `GOMC900101HDFRRL09` |
| **Procedimiento** | 1. Navegar a `/register`. 2. Ingresar email, password, nombre y CURP. 3. Enviar formulario. 4. Verificar redirección a `/login`. 5. Verificar en Supabase Dashboard que existen registros en `auth.users`, `profiles`, `curp_hashes` y `user_roles` con `role = 'user'`. |
| **Resultado esperado** | HTTP 201. Redirección a `/login`. Registros en las 4 tablas. El campo `curp_hashes.curp_hash` contiene un hash hexadecimal (no la CURP en claro). |
| **Criterio de aceptación** | Registro exitoso Y los 4 registros existen Y la CURP no está en claro en la BD |
| **Evidencia requerida** | `fig-5-3a-registro-vacio.png`, `fig-5-3b-registro-con-datos.png`, captura Supabase con los 4 registros |
| **Resultado observado** | — |
| **Estado** | **BLOQUEADO** — requiere servidor activo + credenciales Supabase |

---

### CP-02 — Registro rechazado por CURP duplicada

| Campo | Detalle |
|---|---|
| **ID** | CP-02a |
| **RF cubierto** | RF-01, RF-02 (validación de unicidad CURP) |
| **Prioridad** | Alta |
| **Objetivo** | Verificar que una CURP ya registrada es rechazada con error 400 |
| **Precondiciones** | CP-01 ejecutado exitosamente; misma CURP ya en `curp_hashes` |
| **Datos necesarios** | email diferente (ej. `candidato.prueba.02@test.com`), misma CURP `GOMC900101HDFRRL09` |
| **Procedimiento** | 1. Navegar a `/register`. 2. Ingresar nuevo email, mismo CURP. 3. Enviar. |
| **Resultado esperado** | HTTP 400 con mensaje "Esta CURP ya está registrada". Sin nuevo registro en `auth.users`. |
| **Criterio de aceptación** | Error 400 visible en la interfaz y sin usuario huérfano en `auth.users` |
| **Evidencia requerida** | `fig-5-3c-registro-error-curp.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-02b — Autenticación de candidato

| Campo | Detalle |
|---|---|
| **ID** | CP-02b |
| **RF cubierto** | RF-03 (Autenticación y resolución de rol) |
| **Prioridad** | Alta |
| **Objetivo** | Verificar que el inicio de sesión genera sesión activa y redirige al panel |
| **Precondiciones** | CP-01 ejecutado; candidato registrado con email y password conocidos |
| **Datos necesarios** | email: `candidato.prueba.01@test.com`, password: `Prueba1234!` |
| **Procedimiento** | 1. Navegar a `/login`. 2. Ingresar email y password. 3. Enviar. 4. Verificar redirección a `/panel`. 5. Verificar que el nombre del candidato aparece en el panel. |
| **Resultado esperado** | Sesión activa. Redirección a `/panel`. El panel muestra el nombre del candidato. |
| **Criterio de aceptación** | Sesión activa + `/panel` cargado con datos del candidato |
| **Evidencia requerida** | `fig-5-3d-login.png`, `fig-5-3e-login-exitoso-panel.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-03 — Protección de ruta admin desde candidato

| Campo | Detalle |
|---|---|
| **ID** | CP-03 |
| **RF cubierto** | RF-03 (§5.10 control de acceso) |
| **Prioridad** | Alta |
| **Objetivo** | Verificar que un candidato no puede acceder al área administrativa |
| **Precondiciones** | Sesión activa de candidato (CP-02b completado) |
| **Datos necesarios** | Sesión de `candidato.prueba.01@test.com` |
| **Procedimiento** | 1. Con sesión de candidato activa, navegar directamente a `/admin`. 2. Verificar redirección a `/panel`. 3. (Adicional) Usar DevTools para hacer `GET /api/admin/modules` con token de candidato en el encabezado Authorization. |
| **Resultado esperado** | Redirección a `/panel` (protección client-side). HTTP 403 desde la API con token de candidato. |
| **Criterio de aceptación** | No se muestra contenido del panel admin al candidato; API retorna 403 |
| **Evidencia requerida** | `fig-5-10a-acceso-denegado-admin.png` |
| **Estado** | **BLOQUEADO** |

---

## Grupo B — Panel y catálogo de vacantes

### CP-04 — Panel del candidato con 5 efectos

| Campo | Detalle |
|---|---|
| **ID** | CP-04 |
| **RF cubierto** | RF-03 (Panel del candidato) |
| **Prioridad** | Media |
| **Objetivo** | Verificar que el panel carga correctamente: sesión, perfil, rol, módulos y estado psicométrico |
| **Precondiciones** | Sesión candidato activa; al menos 1 módulo y 1 vacante open creados |
| **Procedimiento** | 1. Iniciar sesión como candidato. 2. Observar que el panel carga nombre, lista de módulos disponibles y estado del psicométrico como "pendiente". |
| **Resultado esperado** | Panel muestra: nombre del candidato, módulos activos, estado psicométrico = pendiente. |
| **Criterio de aceptación** | Los 5 efectos se ejecutan sin error visible; datos correctos mostrados |
| **Evidencia requerida** | `fig-5-4a-panel-sin-psicometrico.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-05 — Catálogo excluye vacantes en draft

| Campo | Detalle |
|---|---|
| **ID** | CP-05 |
| **RF cubierto** | RF-04 (Catálogo de módulos y vacantes) |
| **Prioridad** | Media |
| **Objetivo** | Verificar que las vacantes con `status = 'draft'` no aparecen para los candidatos |
| **Precondiciones** | Al menos 1 vacante open y 1 vacante draft creadas; sesión de candidato |
| **Procedimiento** | 1. Navegar a `/panel`. 2. Hacer clic en el módulo que contiene ambas vacantes. 3. Verificar que solo aparece la vacante open. |
| **Resultado esperado** | Solo vacantes con `status = 'open'` visibles. La vacante draft no aparece. |
| **Criterio de aceptación** | Vacante draft ausente del catálogo |
| **Evidencia requerida** | `fig-5-5a-catalogo-vacantes.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-06 — Detalle de vacante

| Campo | Detalle |
|---|---|
| **ID** | CP-06 |
| **RF cubierto** | RF-05 (Detalle de vacante y disponibilidad) |
| **Prioridad** | Media |
| **Objetivo** | Verificar que el detalle de vacante muestra información completa y el botón de postulación |
| **Precondiciones** | Vacante open con módulo asignado |
| **Procedimiento** | 1. Desde `/modulos/[id]`, hacer clic en una vacante open. 2. Verificar la página de detalle. |
| **Resultado esperado** | Página muestra título, descripción, módulo, horario y botón "Postularme" activo. |
| **Criterio de aceptación** | Botón activo en vacante open; botón deshabilitado en vacante closed |
| **Evidencia requerida** | `fig-5-5b-detalle-vacante.png` |
| **Estado** | **BLOQUEADO** |

---

## Grupo C — Evaluación psicométrica

### CP-07 — Bloqueo por psicométrico no completado

| Campo | Detalle |
|---|---|
| **ID** | CP-07 |
| **RF cubierto** | RF-06 (Verificación de psicométrico previo a postulación) |
| **Prioridad** | Alta |
| **Objetivo** | Verificar que intentar postularse sin psicométrico retorna 403 con redirección |
| **Precondiciones** | `candidato-prueba` sin psicométrico completado; vacante open con assessment |
| **Datos necesarios** | Sesión de candidato sin psicométrico; ID de vacante open |
| **Procedimiento** | 1. Iniciar sesión como `candidato-prueba`. 2. Navegar a detalle de vacante open. 3. Hacer clic en "Postularme". 4. Verificar respuesta y redirección. |
| **Resultado esperado** | HTTP 403. Payload contiene `requiresPsychometric: true` y `redirectTo: "/psicometrico"`. El navegador redirige a `/psicometrico`. |
| **Criterio de aceptación** | Redirección a `/psicometrico` visible en el navegador |
| **Evidencia requerida** | `fig-5-6a-bloqueo-psicometrico.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-08 — Verificación empírica de D-01 (Riesgo puede postularse)

| Campo | Detalle |
|---|---|
| **ID** | CP-08 |
| **RF cubierto** | RF-07 (Discrepancia D-01) |
| **Prioridad** | Alta |
| **Objetivo** | Confirmar empíricamente que D-01 es real: un candidato con clasificación "Riesgo" puede postularse |
| **Precondiciones** | `candidato-psi` con psicométrico completado y al menos 1 rasgo en clasificación "Riesgo"; vacante open |
| **Método de obtención de precondición** | Responder todos los ítems de un rasgo con valor 1 o 2 (puntaje < 11) al completar el psicométrico |
| **Procedimiento** | 1. Verificar en panel admin que el candidato tiene algún rasgo clasificado como Riesgo. 2. Con sesión del candidato, navegar a detalle de vacante open. 3. Hacer clic en "Postularme". |
| **Resultado esperado** | HTTP 200. Redirección a `/evaluacion/[attemptId]`. Sin bloqueo por puntaje. |
| **Criterio de aceptación** | Postulación exitosa a pesar del rasgo en Riesgo — confirma D-01 |
| **Evidencia requerida** | `fig-5-12b-d01-postulacion-riesgo.png` (captura que muestre candidato con rasgo Riesgo Y postulación exitosa) |
| **Estado** | **BLOQUEADO** |

---

### CP-14 — Flujo completo del cuestionario psicométrico

| Campo | Detalle |
|---|---|
| **ID** | CP-14 |
| **RF cubierto** | RF-06, RF-09, RF-11 |
| **Prioridad** | Alta |
| **Objetivo** | Verificar el flujo completo: iniciar psicométrico → responder 20 ítems → enviar → verificar resultado |
| **Precondiciones** | Candidato sin psicométrico previo; 20 preguntas con prefijo `MINI_BIG_FIVE` en el assessment |
| **Procedimiento** | 1. Navegar a `/psicometrico`. 2. Verificar redirección a `/evaluacion/[id]`. 3. Responder los 20 reactivos con escala Likert 1-5. 4. Enviar. 5. Verificar en Supabase: `theory_score = 100`, `psychometric_summary` no nulo. |
| **Resultado esperado** | `theory_score = 100` (todos respondidos). `psychometric_summary` con 5 rasgos, scores y clasificaciones. Redirección a `/panel`. En `/panel`, estado psicométrico = completado. |
| **Criterio de aceptación** | `theory_score = 100` Y `psychometric_summary` no nulo con 5 rasgos |
| **Evidencia requerida** | `fig-5-11a-psicometrico-evaluacion.png`, `fig-5-11b-psicometrico-resultado.png`, captura Supabase del registro |
| **Estado** | **BLOQUEADO** |

---

## Grupo D — Postulación y evaluación

### CP-09 — Reutilización de postulación existente (FE-03)

| Campo | Detalle |
|---|---|
| **ID** | CP-09 |
| **RF cubierto** | RF-08, FE-03 |
| **Prioridad** | Media |
| **Objetivo** | Verificar que postularse dos veces a la misma vacante no crea duplicados en `applications` |
| **Precondiciones** | `candidato-psi` que ya se postuló a la vacante; intento no enviado (puede estar en progreso) |
| **Procedimiento** | 1. Postularse a la misma vacante por segunda vez. 2. Verificar en Supabase que existe solo 1 `application` para ese par (user, vacancy). 3. Verificar que retorna el `attemptId` existente. |
| **Resultado esperado** | HTTP 200. `attemptId` = mismo ID del intento existente. Solo 1 registro en `applications`. |
| **Criterio de aceptación** | Sin duplicados en `applications` ni en `attempts` |
| **Evidencia requerida** | Captura Supabase de tabla `applications` (1 registro) |
| **Estado** | **BLOQUEADO** |

---

### CP-10 — Evaluación con temporizador

| Campo | Detalle |
|---|---|
| **ID** | CP-10 |
| **RF cubierto** | RF-09 |
| **Prioridad** | Alta |
| **Objetivo** | Verificar que el temporizador decrementa y que las respuestas se guardan con UPSERT |
| **Precondiciones** | Intento activo con `deadline_at` en el futuro |
| **Procedimiento** | 1. Abrir `/evaluacion/[attemptId]`. 2. Verificar temporizador visible y decreciente. 3. Responder 3 preguntas. 4. Verificar en Supabase que existen 3 registros en `answers` para el intento. 5. Cambiar la respuesta de 1 pregunta. 6. Verificar que no aumenta el número de registros (UPSERT). |
| **Resultado esperado** | Temporizador visible. Respuestas guardadas. UPSERT no duplica. |
| **Criterio de aceptación** | N respuestas cambiadas = N registros en `answers` (no duplicados) |
| **Evidencia requerida** | `fig-5-7a-evaluacion-activa-temporizador.png`, `fig-5-7b-preguntas-lista.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-11 — Envío automático al expirar (FE-04)

| Campo | Detalle |
|---|---|
| **ID** | CP-11 |
| **RF cubierto** | RF-09, FE-04 |
| **Prioridad** | Media |
| **Objetivo** | Verificar que el intento se envía automáticamente cuando el temporizador llega a 0 |
| **Nota de preparación** | Crear vacante de prueba con assessment de duración = 1 minuto para acelerar la expiración |
| **Procedimiento** | 1. Postularse a vacante con evaluación de 1 minuto. 2. Abrir evaluación. 3. No hacer clic en Enviar. 4. Esperar 60 segundos. 5. Verificar en Supabase: `attempts.status = 'UNDER_REVIEW'`, `psychometric_summary.submitMeta.timedOutBeforeSubmit = true`. |
| **Resultado esperado** | Envío automático. `timedOutBeforeSubmit = true` en el JSON. |
| **Criterio de aceptación** | `status = 'UNDER_REVIEW'` AND `timedOutBeforeSubmit = true` |
| **Evidencia requerida** | `fig-5-7e-envio-automatico-expirado.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-12 — Carga de evidencia

| Campo | Detalle |
|---|---|
| **ID** | CP-12 |
| **RF cubierto** | RF-10 |
| **Prioridad** | Alta |
| **Objetivo** | Verificar que una evidencia (PDF) se sube al bucket y queda registrada en `evidence_uploads` |
| **Precondiciones** | Intento activo con tiempo vigente |
| **Datos necesarios** | Archivo PDF de prueba ≤ 5 MB (sin datos personales) |
| **Procedimiento** | 1. Abrir `/evaluacion/[attemptId]`. 2. Hacer clic en "Subir evidencia". 3. Seleccionar un PDF. 4. Verificar mensaje "Evidencia subida correctamente". 5. Verificar en Supabase Dashboard → Storage → `evidences` que el archivo existe. 6. Verificar registro en tabla `evidence_uploads`. |
| **Resultado esperado** | Archivo en Storage. Registro en `evidence_uploads` con `path`, `mime_type = 'application/pdf'`, `size`. |
| **Criterio de aceptación** | Archivo en Storage Y registro en BD |
| **Evidencia requerida** | `fig-5-8d-carga-evidencia.png`, `fig-5-8e-evidencia-subida.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-13 — Visualización de resultado tras envío

| Campo | Detalle |
|---|---|
| **ID** | CP-13 |
| **RF cubierto** | RF-12 |
| **Prioridad** | Baja |
| **Objetivo** | Verificar que `/resultado/[attemptId]` muestra estado correcto tras el envío |
| **Precondiciones** | Intento enviado |
| **Procedimiento** | 1. Tras enviar, navegar a `/resultado/[attemptId]`. 2. Verificar que muestra estado del intento. |
| **Resultado esperado** | Página carga con estado = "UNDER_REVIEW" o similar. |
| **Estado** | **BLOQUEADO** |

---

## Grupo E — Panel administrativo

### CP-15 — Creación y edición de módulo

| Campo | Detalle |
|---|---|
| **ID** | CP-15 |
| **RF cubierto** | RF-13 |
| **Prioridad** | Media |
| **Objetivo** | Verificar CRUD de módulos en el panel administrativo |
| **Precondiciones** | Sesión de administrador activa |
| **Procedimiento** | 1. Ir a `/admin` → pestaña "Módulos". 2. Crear módulo con nombre "Módulo de Prueba 6A". 3. Verificar que aparece en la lista. 4. Editar el nombre a "Módulo de Prueba 6A (editado)". 5. Verificar actualización. |
| **Resultado esperado** | Módulo creado y visible. Edición persistida. |
| **Criterio de aceptación** | Módulo aparece en lista tras creación; cambio de nombre reflejado tras edición |
| **Evidencia requerida** | `fig-5-9b-admin-modulos.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-16 — Creación de vacante con assessment automático (FE-02)

| Campo | Detalle |
|---|---|
| **ID** | CP-16 |
| **RF cubierto** | RF-14, FE-02 |
| **Prioridad** | Media |
| **Objetivo** | Verificar que al crear una vacante se crea automáticamente un assessment asociado |
| **Precondiciones** | Al menos un módulo creado; sesión de admin |
| **Procedimiento** | 1. Crear vacante con título "Vacante de Prueba 6A" asignando módulo. 2. Verificar en Supabase Dashboard tabla `assessments`: debe existir registro con `vacancy_id` = ID de la nueva vacante. |
| **Resultado esperado** | 1 vacante creada + 1 assessment con título `"Evaluación - Vacante de Prueba 6A"` en `assessments`. |
| **Criterio de aceptación** | Assessment auto-creado con FK correcta |
| **Evidencia requerida** | `fig-5-9c-admin-vacantes.png`, captura Supabase del assessment |
| **Estado** | **BLOQUEADO** |

---

### CP-17 — Configuración de evaluación y preguntas

| Campo | Detalle |
|---|---|
| **ID** | CP-17 |
| **RF cubierto** | RF-15, RF-16 |
| **Prioridad** | Media |
| **Objetivo** | Verificar edición de duración del assessment y CRUD de preguntas |
| **Precondiciones** | Vacante y assessment creados (CP-16) |
| **Procedimiento** | 1. Ir a pestaña "Evaluaciones". 2. Seleccionar el assessment creado. 3. Cambiar duración a 45 minutos. 4. Agregar pregunta con texto "¿Pregunta de prueba?", opciones "A, B, C", opción correcta "A". 5. Verificar que la pregunta aparece en la lista. |
| **Resultado esperado** | Duración actualizada. Pregunta visible en la lista con opciones correctamente formateadas. |
| **Criterio de aceptación** | Duración persistida + pregunta creada con opciones como array JSON |
| **Evidencia requerida** | `fig-5-9d-admin-evaluaciones-preguntas.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-18 — Lista de intentos con filtros

| Campo | Detalle |
|---|---|
| **ID** | CP-18 |
| **RF cubierto** | RF-17 (con D-03 documentada) |
| **Prioridad** | Media |
| **Objetivo** | Verificar que la lista de intentos funciona con filtros |
| **Precondiciones** | Al menos 1 intento enviado en el sistema |
| **Procedimiento** | 1. Ir a `/admin` → pestaña "Intentos". 2. Verificar lista de intentos. 3. Aplicar filtro por vacante. 4. Verificar resultado filtrado. |
| **Resultado esperado** | Lista filtrada muestra solo intentos de la vacante seleccionada. `theory_score` visible. |
| **Nota D-03** | El endpoint `/api/admin/vacancies/[id]/stats` devuelve solo 2 métricas y no es consumido por ninguna vista actual |
| **Estado** | **BLOQUEADO** |

---

### CP-19 — Detalle de intento psicométrico con Big Five

| Campo | Detalle |
|---|---|
| **ID** | CP-19 |
| **RF cubierto** | RF-17 |
| **Prioridad** | Alta |
| **Objetivo** | Verificar que el panel admin muestra el resumen psicométrico con scores por rasgo |
| **Precondiciones** | Intento psicométrico enviado con `psychometric_summary` no nulo |
| **Procedimiento** | 1. Ir a `/admin/attempts/[id]` del intento psicométrico. 2. Verificar sección Big Five. 3. Verificar que Extroversión muestra "No es filtro de contratación, solo indicador de integración." |
| **Resultado esperado** | 5 rasgos con scores numéricos y clasificaciones. Extroversión con indicador diferenciado. |
| **Criterio de aceptación** | Los 5 rasgos visibles + clasificación de Extroversión = indicador |
| **Evidencia requerida** | `fig-5-11c-admin-resumen-bigfive.png`, `fig-5-11d-admin-extroversion-indicador.png` |
| **Estado** | **BLOQUEADO** |

---

### CP-20 — Verificación empírica de D-02 (decisión en reviews)

| Campo | Detalle |
|---|---|
| **ID** | CP-20 |
| **RF cubierto** | RF-18 (Discrepancia D-02) |
| **Prioridad** | Alta |
| **Objetivo** | Confirmar empíricamente que la decisión APPROVED se persiste en `reviews`, no solo en `attempts` |
| **Precondiciones** | Intento en estado `UNDER_REVIEW`; sesión de administrador activa |
| **Procedimiento** | 1. Ir a `/admin/attempts/[id]`. 2. Seleccionar decisión "APPROVED". 3. Escribir nota: "Candidato aprobado — prueba D-02". 4. Guardar. 5. Verificar en Supabase Dashboard → tabla `reviews`: debe existir registro con `attempt_id` = ID del intento, `decision = "APPROVED"` (dentro del JSONB o campo directo). 6. Verificar también `attempts.decision` como campo de respaldo. |
| **Resultado esperado** | Estado intento = COMPLETED. Registro en `reviews` con la decisión. `attempts.decision` = "APPROVED" como fallback. |
| **Criterio de aceptación** | Registro en `reviews` existe con la decisión — confirma D-02 |
| **Evidencia requerida** | `fig-5-9g-admin-acciones-revision.png`, `fig-5-12a-decision-aprobado.png`, captura tabla `reviews` en Supabase |
| **Estado** | **BLOQUEADO** |

---

### CP-21 — Acceso a evidencia desde admin con signed URL

| Campo | Detalle |
|---|---|
| **ID** | CP-21 |
| **RF cubierto** | RF-17 |
| **Prioridad** | Baja |
| **Objetivo** | Verificar que el admin puede descargar evidencias mediante URL firmada (60 min) |
| **Precondiciones** | Intento con evidencia subida (CP-12 ejecutado); sesión de admin |
| **Procedimiento** | 1. Ir a `/admin/attempts/[id]`. 2. Sección Evidencias → clic en "Descargar". 3. Verificar que el enlace es una URL firmada de Supabase Storage. 4. Verificar que el archivo se descarga o previsualiza. |
| **Resultado esperado** | URL con parámetro de firma (`?token=...`). Archivo accesible durante 60 min. |
| **Estado** | **BLOQUEADO** |

---

### CP-22 — Seguridad: Bearer token en API admin

| Campo | Detalle |
|---|---|
| **ID** | CP-22 |
| **RF cubierto** | §5.10 (seguridad) |
| **Prioridad** | Baja |
| **Objetivo** | Verificar visualmente que las solicitudes admin incluyen encabezado Authorization Bearer |
| **Precondiciones** | Sesión de admin activa; DevTools del navegador abierto |
| **Procedimiento** | 1. Ir a `/admin` con DevTools → Network. 2. Cargar pestaña "Módulos". 3. Inspeccionar la solicitud a `/api/admin/modules`. 4. Verificar encabezado `Authorization: Bearer [token]`. |
| **Resultado esperado** | Encabezado `Authorization: Bearer [JWT]` visible en la solicitud. |
| **Evidencia requerida** | `fig-5-10b-bearer-token-devtools.png` (opcional) |
| **Estado** | **BLOQUEADO** |

---

## Resumen de estados

| Estado | Cantidad |
|---|---|
| PASA | 0 |
| FALLA | 0 |
| BLOQUEADO | 22 |
| NO EJECUTADO | 0 |
| **Total** | **22** |

**Bloqueo general:** Todos los casos requieren servidor Next.js activo (`npm run dev`) y conexión a Supabase con credenciales válidas. Estos requisitos no están disponibles en el entorno de elaboración de esta documentación.
