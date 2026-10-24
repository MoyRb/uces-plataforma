# Control de evidencias — Capítulo VI (Corte 6A)

**Fecha:** 2026-10-22
**Alcance:** Evidencias para los 22 casos de prueba del Capítulo VI
**Estado:** Corte 6A — Sin evidencias obtenidas aún (pendiente sesión funcional 6B)

---

## 1. Evidencias estáticas obtenidas en Corte 6A

Las siguientes evidencias provienen de inspección estática del código fuente y están disponibles sin necesidad de servidor activo:

| ID | Tipo | Descripción | Fuente | Estado |
|---|---|---|---|---|
| EV-EST-01 | Salida de herramienta | TypeScript sin errores (`tsc --noEmit`) | Ejecución de comando | **OBTENIDA** |
| EV-EST-02 | Salida de herramienta | ESLint — 1 advertencia menor (import no usado) | Ejecución de comando | **OBTENIDA** |
| EV-EST-03 | Lectura de código | `calculatePsicometricoSummary` — lógica de acumulación MINI_BIG_FIVE | `lib/psicometricoResults.ts:72-85` | **OBTENIDA** |
| EV-EST-04 | Lectura de código | `theory_score` — cálculo de porcentaje de completitud | `submit/route.ts:71` | **OBTENIDA** |
| EV-EST-05 | Lectura de código | `requireAdmin` — 4 verificaciones secuenciales | `api/admin/utils.ts:15-57` | **OBTENIDA** |
| EV-EST-06 | Lectura de código | Guard psicométrico verifica completitud, no puntaje (D-01) | `apply/route.ts` (consulta `psicometricoState.completed`) | **OBTENIDA** |
| EV-EST-07 | Lectura de código | `upsertReview` como almacén primario de decisiones (D-02) | `attempts/[id]/route.ts` | **OBTENIDA** |
| EV-EST-08 | Lectura de código | `resolveRole("reviewer")` retorna `"user"` (D-04) | `lib/auth.ts:5-11` | **OBTENIDA** |
| EV-EST-09 | Listado de archivos | 13 route handlers en `app/api/admin/` | Sistema de archivos | **OBTENIDA** |

---

## 2. Evidencias funcionales requeridas — Capítulo V (pendientes desde Corte 5A/5B)

Estas capturas pertenecen al Capítulo V y deben obtenerse durante las pruebas del Capítulo VI:

### 2.1 Capturas pendientes del Corte 5A (secciones 5.1–5.8)

*Referencia completa: `docs/titulacion/evidencias/05a-capturas-pendientes.md`*

| ID captura | Sección | Descripción breve | Prioridad |
|---|---|---|---|
| fig-5-1a-landing.png | §5.1 | Landing page principal | Baja |
| fig-5-1b-estructura-directorios.png | §5.1 | Estructura en IDE | Baja |
| fig-5-2a-supabase-users.png | §5.2 | Auth users en Supabase | Media |
| fig-5-2b-supabase-profiles.png | §5.2 | Tabla profiles | Media |
| fig-5-3a-registro-vacio.png | §5.3 | Formulario registro vacío | Alta (CP-01) |
| fig-5-3b-registro-con-datos.png | §5.3 | Formulario con datos | Alta (CP-01) |
| fig-5-3c-registro-error-curp.png | §5.3 | Error CURP duplicada | Alta (CP-02a) |
| fig-5-3d-login.png | §5.3 | Formulario login | Alta (CP-02b) |
| fig-5-3e-login-exitoso-panel.png | §5.3 | Panel tras login | Alta (CP-02b) |
| fig-5-4a-panel-sin-psicometrico.png | §5.4 | Panel estado pendiente | Media (CP-04) |
| fig-5-4b-panel-con-modulos.png | §5.4 | Panel con módulos visibles | Media |
| fig-5-5a-catalogo-vacantes.png | §5.5 | Catálogo sin draft | Media (CP-05) |
| fig-5-5b-detalle-vacante.png | §5.5 | Detalle vacante | Media (CP-06) |
| fig-5-6a-bloqueo-psicometrico.png | §5.6 | Error 403 sin psicométrico | Alta (CP-07) |
| fig-5-6b-postulacion-exitosa.png | §5.6 | Postulación exitosa | Alta |
| fig-5-6c-vacante-cerrada-error.png | §5.6 | Error vacante cerrada | Media |
| fig-5-7a-evaluacion-activa-temporizador.png | §5.7 | Evaluación con timer | Alta (CP-10) |
| fig-5-7b-preguntas-lista.png | §5.7 | Lista de preguntas | Alta (CP-10) |
| fig-5-7c-respuesta-seleccionada.png | §5.7 | Respuesta seleccionada | Media |
| fig-5-7d-tiempo-agotado.png | §5.7 | Timer en rojo (tiempo < 1 min) | Media |
| fig-5-7e-envio-automatico-expirado.png | §5.7 | Envío automático | Media (CP-11) |
| fig-5-7f-resultado-enviado.png | §5.7 | Página /resultado | Baja (CP-13) |
| fig-5-8a-boton-subir-evidencia.png | §5.8 | Botón subir evidencia | Media |
| fig-5-8b-selector-archivo.png | §5.8 | Selector de archivo | Media |
| fig-5-8c-subida-en-progreso.png | §5.8 | Subida en progreso | Baja |
| fig-5-8d-carga-evidencia.png | §5.8 | Evidencia subida OK | Alta (CP-12) |
| fig-5-8e-evidencia-subida.png | §5.8 | Confirmación subida | Alta (CP-12) |

**Subtotal pendientes 5A:** 27 capturas (incluyendo opcionales de la lista original)

### 2.2 Capturas pendientes del Corte 5B (secciones 5.9–5.13)

*Referencia completa: `docs/titulacion/evidencias/05b-capturas-pendientes.md`*

| ID captura | Sección | Descripción breve | Prioridad |
|---|---|---|---|
| fig-5-9a-admin-resumen.png | §5.9 | Panel admin resumen | Media (CP-15) |
| fig-5-9b-admin-modulos.png | §5.9 | Panel admin módulos | Media (CP-15) |
| fig-5-9c-admin-vacantes.png | §5.9 | Panel admin vacantes | Media (CP-16) |
| fig-5-9d-admin-evaluaciones-preguntas.png | §5.9 | Panel admin evaluaciones | Media (CP-17) |
| fig-5-9e-admin-intentos.png | §5.9 | Panel admin intentos | Media (CP-18) |
| fig-5-9f-admin-detalle-resumen.png | §5.9 | Detalle intento resumen | Alta (CP-19) |
| fig-5-9g-admin-acciones-revision.png | §5.9 | Sección revisión admin | Alta (CP-20) |
| fig-5-9h-admin-respuestas.png | §5.9 | Respuestas del candidato | Media |
| fig-5-9i-admin-evidencias-descarga.png | §5.9 | Evidencias con descarga | Baja (CP-21) |
| fig-5-10a-acceso-denegado-admin.png | §5.10 | Error acceso candidato | Alta (CP-03) |
| fig-5-10b-bearer-token-devtools.png | §5.10 | Token Bearer en DevTools | Baja (CP-22) |
| fig-5-10c-curp-hashes-tabla.png | §5.10 | Tabla curp_hashes | Media |
| fig-5-11a-psicometrico-evaluacion.png | §5.11 | Evaluación psicométrica | Alta (CP-14) |
| fig-5-11b-psicometrico-resultado.png | §5.11 | Resultado psicométrico | Alta (CP-14) |
| fig-5-11c-admin-resumen-bigfive.png | §5.11 | Resumen Big Five admin | Alta (CP-19) |
| fig-5-11d-admin-extroversion-indicador.png | §5.11 | Extroversión indicador | Alta (CP-19) |
| fig-5-12a-decision-aprobado.png | §5.12 | Decisión aprobada | Alta (CP-20) |
| fig-5-12b-d01-postulacion-riesgo.png | §5.12 | Postulación con Riesgo | Alta (CP-08) |

**Subtotal pendientes 5B:** 18 capturas

---

## 3. Evidencias específicas del Capítulo VI

Adicionalmente a las capturas del Capítulo V, el Capítulo VI requiere las siguientes evidencias propias:

| ID | Tipo | Descripción | Caso | Estado |
|---|---|---|---|---|
| EV-VI-01 | Captura Supabase | Tabla `curp_hashes` — sin CURP en claro, solo hashes | CP-01 | PENDIENTE |
| EV-VI-02 | Captura Supabase | Registros en `auth.users`, `profiles`, `user_roles` tras registro | CP-01 | PENDIENTE |
| EV-VI-03 | Captura Supabase | Tabla `assessments` con assessment auto-creado tras vacante | CP-16 | PENDIENTE |
| EV-VI-04 | Captura Supabase | Tabla `reviews` con decisión APPROVED — confirma D-02 | CP-20 | PENDIENTE |
| EV-VI-05 | Captura Supabase | Tabla `answers` — UPSERT (no duplicados) | CP-10 | PENDIENTE |
| EV-VI-06 | Captura Supabase | Tabla `applications` — solo 1 registro para misma vacante | CP-09 | PENDIENTE |
| EV-VI-07 | Captura Supabase | Bucket `evidences` — archivo PDF subido | CP-12 | PENDIENTE |
| EV-VI-08 | Captura pantalla | `/perfil` — estado APPROVED con nota tras CP-20 | Posterior a CP-20 | PENDIENTE |

---

## 4. Evidencias API obtenidas en Corte 6B

Las siguientes evidencias de respuestas de API se obtuvieron durante la sesión 6B-S1. Equivalen documentalmente a capturas de pantalla para la verificación de RF.

| ID | CP | Descripción | Estado |
|---|---|---|---|
| EV-6B-01 | CP-01 | POST /register → HTTP 201 `{message:"Usuario creado"}` | **OBTENIDA** |
| EV-6B-02 | CP-02a | CURP duplicada → HTTP 400 | **OBTENIDA** |
| EV-6B-03 | CP-02b | JWT obtenido, USER_ID confirmado | **OBTENIDA** |
| EV-6B-04 | CP-03 | Admin con candidato-token → HTTP 403 | **OBTENIDA** |
| EV-6B-05 | CP-07 | Apply sin psicométrico → HTTP 403 requiresPsychometric | **OBTENIDA** |
| EV-6B-06 | CP-14 | POST psicometrico/start → attemptId | **OBTENIDA** |
| EV-6B-07 | CP-14 | Submit psicométrico → theoryScore:100, rasgos Alta | **OBTENIDA** |
| EV-6B-08 | CP-08 | Apply con psicométrico → HTTP 200 attemptId | **OBTENIDA** |
| EV-6B-09 | CP-09 | Segunda apply → mismo attemptId (idempotente) | **OBTENIDA** |
| EV-6B-10 | CP-10 | 5 respuestas enviadas → HTTP 200 `{saved:true}` | **OBTENIDA** |
| EV-6B-11 | CP-10 | UPSERT re-answer → HTTP 400 (INC-6B-01) | **OBTENIDA** |
| EV-6B-12 | CP-12 | Evidencia subida a bucket evidences | **OBTENIDA** |
| EV-6B-13 | CP-13 | Submit evaluación → theoryScore:0 (conocimientos) | **OBTENIDA** |
| EV-6B-14 | CP-15 | GET /admin/modules → HTTP 200 | **OBTENIDA** |
| EV-6B-15 | CP-16 | GET /admin/vacancies → HTTP 200 | **OBTENIDA** |
| EV-6B-16 | CP-17 | GET /admin/assessments → HTTP 200 | **OBTENIDA** |
| EV-6B-17 | CP-18 | Stats → `{applicationsCount:1, attemptsCount:1}` (D-03) | **OBTENIDA** |
| EV-6B-18 | CP-19 | Detalle intento admin → HTTP 200 completo | **OBTENIDA** |
| EV-6B-19 | CP-20 | Decisión APPROVED, decision_source:"attempts" (D-02) | **OBTENIDA** |
| EV-6B-20 | CP-21 | signedUrl presente en evidencias admin | **OBTENIDA** |
| EV-6B-21 | CP-22 | Token inválido → HTTP 401 | **OBTENIDA** |

---

## 5. Resumen de estado de evidencias

| Categoría | Total | Obtenidas | Pendientes |
|---|---|---|---|
| Estáticas (código/herramientas) | 9 | 9 | 0 |
| Respuestas API — Corte 6B | 21 | 21 | 0 |
| Capturas Capítulo V (5A) | 27 | 0 | 27 |
| Capturas Capítulo V (5B) | 18 | 0 | 18 |
| Evidencias propias Capítulo VI (Supabase) | 8 | 0 | 8 |
| **Total** | **83** | **30** | **53** |

> Las capturas de pantalla de la interfaz web (fig-5-* y fig-6-*) siguen pendientes — requieren navegador interactivo. Las evidencias EV-6B-* (respuestas de API) cubren funcionalmente los mismos RF.

---

## 5. Convenciones de nombrado

- Formato: PNG, resolución mínima 1280 × 800 px
- Nombre: `fig-5-[sección][letra]-descripcion.png` para Cap. V; `fig-6-[número]-descripcion.png` para Cap. VI
- Censura de datos: Usar datos de prueba ficticios visibles; censurar emails/nombres reales con [censurado]
- Anotaciones: Solo si lo requiere el asesor o el formato universitario
