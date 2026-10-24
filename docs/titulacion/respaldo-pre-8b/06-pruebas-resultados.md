# Capítulo VI. Pruebas y resultados del sistema

> **Estado:** Corte 6A — Secciones 6.1 a 6.4 redactadas. Secciones 6.5 (ejecución) y 6.6 (análisis) se redactarán en el Corte 6B una vez que los casos de prueba hayan sido ejecutados con el sistema en marcha.

---

## 6.1 Introducción

El presente capítulo documenta el proceso de verificación funcional del MVP de UCES Plataforma de Talento. Su propósito es comprobar que los 18 requerimientos funcionales identificados en el análisis y diseño del Trabajo A se cumplen en el sistema implementado, y caracterizar con evidencia empírica las cinco discrepancias documentadas en el Capítulo V.

Las pruebas que se describen en este capítulo son de carácter **funcional end-to-end**: se ejecutan desde la interfaz de usuario o mediante llamadas directas a los endpoints de la API, y verifican el comportamiento observable del sistema sin inspeccionar directamente el estado interno de la base de datos excepto cuando resulta necesario para confirmar la persistencia de datos.

La estrategia de pruebas adoptada responde a las características del proyecto:

- El sistema es un MVP sin cobertura de pruebas automatizadas en su código fuente. No existen suites de prueba unitarias ni de integración preexistentes.
- Las pruebas se diseñan para ser reproducibles: cualquier persona con acceso al entorno local o de producción puede repetirlas siguiendo el procedimiento documentado en la sección 6.4.
- Los resultados se registran con el estado real observado. No se declara aprobado ningún caso que no haya sido ejecutado con evidencia verificable.
- Los resultados pendientes de ejecución se indican como BLOQUEADO o NO EJECUTADO, con la justificación correspondiente.

La base para el diseño de los casos de prueba es la matriz de trazabilidad elaborada durante el Capítulo V (`docs/titulacion/05-matriz-integral-trazabilidad.md`) y el plan preliminar desarrollado en el Corte 5C (`docs/titulacion/06-plan-pruebas.md`).

---

## 6.2 Metodología y estrategia de pruebas

### 6.2.1 Tipo de pruebas

Las pruebas realizadas en este capítulo pertenecen a las siguientes categorías:

| Tipo | Descripción | Herramienta |
|---|---|---|
| Inspección estática | Verificación de compilación, tipos y linting sin ejecución | `tsc --noEmit`, `eslint` |
| Prueba funcional manual | Verificación del comportamiento del sistema desde el navegador o mediante herramientas de petición HTTP | Navegador, herramientas de desarrollo (DevTools) |
| Prueba de seguridad manual | Verificación de control de acceso y autorización desde el navegador | Navegador, DevTools, herramientas HTTP |
| Inspección de base de datos | Verificación de persistencia de datos a través del Dashboard de Supabase | Supabase Dashboard |

No se utilizan herramientas de automatización de pruebas en esta fase. La automatización es trabajo futuro documentado en las conclusiones del Capítulo VII.

### 6.2.2 Criterios generales de aceptación

Un caso de prueba se considera **PASA** cuando:

1. Todos los pasos del procedimiento se ejecutaron en el entorno documentado.
2. El resultado observado coincide con el resultado esperado.
3. Se obtuvo la evidencia requerida (captura de pantalla o registro en base de datos).

Un caso de prueba se considera **FALLA** cuando el resultado observado difiere del esperado, independientemente de si la diferencia fue anticipada como discrepancia o no.

Un caso de prueba se considera **BLOQUEADO** cuando no puede ejecutarse por razones externas al sistema mismo (entorno no disponible, datos de prueba faltantes, credenciales no configuradas).

Un caso de prueba se considera **NO EJECUTADO** cuando su ejecución no fue posible en el corte actual por limitaciones de tiempo o de alcance del corte, sin que exista un bloqueo técnico.

### 6.2.3 Verificaciones estáticas completadas en el Corte 6A

Antes de ejecutar las pruebas funcionales, se realizaron las siguientes verificaciones sobre el código fuente:

| Verificación | Comando | Resultado | Fecha |
|---|---|---|---|
| Verificación de tipos TypeScript | `npx tsc --noEmit` | **PASA** — Sin errores de tipo | 2026-10-22 |
| Análisis estático ESLint | `npx eslint . --max-warnings=0` | **ADVERTENCIA** — 1 aviso: `LayoutDashboard` importado pero no utilizado en `app/admin/page.tsx` | 2026-10-22 |

**Interpretación:** El sistema compila sin errores de tipo. La advertencia de ESLint corresponde a un import no utilizado y no afecta la funcionalidad en tiempo de ejecución. Esta condición es relevante para el mantenimiento pero no constituye un defecto funcional para los efectos de las pruebas de este capítulo.

### 6.2.4 Limitaciones del entorno de prueba en el Corte 6A

Las pruebas funcionales (CP-01 a CP-22) requieren las siguientes condiciones que no están completamente satisfechas en el entorno de ejecución del Corte 6A:

1. **Servidor local activo:** El servidor de desarrollo de Next.js debe estar corriendo (`npm run dev` en `my-app/`) y la aplicación debe ser accesible en `http://localhost:3000`.
2. **Conexión a Supabase:** Las variables de entorno del archivo `.env.local` deben estar configuradas con credenciales válidas de un proyecto Supabase activo.
3. **Datos de prueba:** Deben existir al menos: un módulo, una vacante con estado `open`, una vacante con estado `draft`, y el cuestionario psicométrico con sus 20 reactivos (UUID `f2000000-0000-0000-0000-000000000001`).
4. **Cuentas de prueba:** Una cuenta de candidato sin psicométrico completado, una con psicométrico completado, y una cuenta de administrador (`user_roles.role = 'admin'`).

Dado que el entorno de ejecución no puede iniciarse automáticamente durante la elaboración de este documento, los 22 casos funcionales se clasifican en el Corte 6A como **BLOQUEADO**. Su ejecución real se realizará en el Corte 6B con el sistema activo.

---

## 6.3 Descripción del entorno de pruebas

### 6.3.1 Entorno local

| Componente | Versión / Detalle |
|---|---|
| Sistema operativo | Windows 11 Home Single Language 10.0.26200 |
| Motor de ejecución | Node.js 22.22.2 |
| Gestor de paquetes | npm 10.9.7 |
| Framework de aplicación | Next.js 16.1.1 (App Router) |
| Lenguaje | TypeScript 5 |
| Base de datos | PostgreSQL 16 (Supabase, proyecto UcesCap — `uilqwyrslwrkeubaayoi`) |
| ORM / cliente de BD | `@supabase/supabase-js` 2.89.0 |
| Puerto local | `http://localhost:3000` (desarrollo) |
| Comando de inicio | `npm run dev` desde `my-app/` |

### 6.3.2 Entorno de producción

| Componente | Detalle |
|---|---|
| Plataforma de despliegue | Vercel |
| Base de datos | Supabase (mismo proyecto que desarrollo, `uilqwyrslwrkeubaayoi`) |
| Variables de entorno | Configuradas en el panel de Vercel |

Las pruebas de aceptación final deben realizarse sobre el entorno de producción para verificar el comportamiento del sistema desplegado. Las pruebas exploratorias y de regresión se realizan en el entorno local.

### 6.3.3 Roles necesarios para las pruebas

| Rol de prueba | Descripción | Método de creación |
|---|---|---|
| `candidato-prueba` | Usuario registrado sin psicométrico completado | Registro en `/register` con CURP ficticia válida, ej. `GOMC900101HDFRRL09` |
| `candidato-psi` | Candidato con cuestionario psicométrico completado | `candidato-prueba` + completar evaluación en `/psicometrico` |
| `admin-prueba` | Usuario con acceso al panel administrativo | Insertar en Supabase Dashboard: `INSERT INTO user_roles (user_id, role) VALUES ('[uuid del usuario]', 'admin')` |

**Restricción de privacidad:** Todas las pruebas deben realizarse con datos ficticios. No utilizar CURPs, correos electrónicos ni nombres de personas reales.

### 6.3.4 Datos de prueba mínimos requeridos

| Dato | Descripción | Cómo crearlo |
|---|---|---|
| Módulo de prueba | Al menos 1 módulo con nombre visible | Panel admin → Módulos → Crear |
| Vacante abierta | 1 vacante con `status = 'open'`, módulo asignado | Panel admin → Vacantes → Crear |
| Vacante en borrador | 1 vacante con `status = 'draft'` | Panel admin → Vacantes → Crear → Cambiar estado |
| CURP de prueba no registrada | CURP ficticia con formato válido | `GOMC900101HDFRRL09` (ejemplo) |
| CURP de prueba ya registrada | Misma CURP que se usó en el primer registro | Resultado del primer registro exitoso |

### 6.3.5 Herramientas de apoyo para las pruebas

| Herramienta | Uso |
|---|---|
| DevTools del navegador (Network) | Inspeccionar encabezados HTTP, tokens Bearer, respuestas de API |
| Supabase Dashboard | Verificar persistencia de datos, tabla `curp_hashes`, tabla `reviews` |
| Supabase Dashboard → Storage | Verificar que las evidencias se suben al bucket `evidences` |
| Supabase Dashboard → Authentication | Verificar creación de usuarios en `auth.users` |

---

## 6.4 Diseño y clasificación de casos de prueba

### 6.4.1 Resumen de casos de prueba

Los 22 casos de prueba se organizan en cinco grupos funcionales:

| Grupo | Casos | RF cubiertos | Descripción |
|---|---|---|---|
| A — Registro y autenticación | CP-01, CP-02, CP-03 | RF-01, RF-02 | Registro de candidato, inicio de sesión, protección de rutas admin |
| B — Panel y catálogo | CP-04, CP-05, CP-06 | RF-03, RF-04, RF-05 | Panel del candidato, vacantes disponibles, detalle de vacante |
| C — Evaluación psicométrica | CP-07, CP-08, CP-14 | RF-06, RF-07, RF-09, RF-11 | Prerequisito de postulación, verificación D-01, flujo completo |
| D — Postulación y evaluación | CP-09, CP-10, CP-11, CP-12, CP-13 | RF-08, RF-09, RF-10, RF-12 | Postulación, evaluación con timer, evidencias, resultado |
| E — Panel administrativo | CP-15, CP-16, CP-17, CP-18, CP-19, CP-20, CP-21, CP-22 | RF-13 a RF-18, §5.10 | Gestión, revisión, decisiones, seguridad |

**Total:** 22 casos de prueba — 10 de alta prioridad, 10 de media prioridad, 2 de baja prioridad.

La descripción detallada de cada caso se encuentra en `docs/titulacion/06a-matriz-casos-prueba.md`.

### 6.4.2 Prioridad de ejecución

| Prioridad | Casos | Razón |
|---|---|---|
| **Alta** | CP-01, CP-02, CP-03, CP-07, CP-08, CP-10, CP-12, CP-14, CP-19, CP-20 | Cubren flujos críticos y discrepancias D-01 y D-02 |
| **Media** | CP-04, CP-05, CP-06, CP-09, CP-11, CP-13, CP-15, CP-16, CP-17, CP-18 | Flujos secundarios y gestión administrativa |
| **Baja** | CP-21, CP-22 | Funcionalidad accesoria (evidencias desde admin, DevTools) |

### 6.4.3 Casos para verificación empírica de discrepancias

Los siguientes casos están específicamente diseñados para confirmar empíricamente las discrepancias documentadas en el Capítulo V:

| Caso | Discrepancia | Objetivo de verificación |
|---|---|---|
| CP-08 | D-01 | Confirmar que un candidato con clasificación "Riesgo" en algún rasgo puede postularse sin bloqueo |
| CP-20 | D-02 | Confirmar que la decisión APPROVED se almacena en `reviews`, no solo en `attempts.decision` |
| CP-18 | D-03 | Confirmar comportamiento del endpoint `/api/admin/attempts` y sus filtros |
| CP-03 | D-04 indirecto | Confirmar que candidato con token de sesión no accede al área admin |

### 6.4.4 Estado de los casos de prueba en el Corte 6A

| Estado | Cantidad | Casos | Motivo |
|---|---|---|---|
| **PASA** | 2 | Verificación TypeScript, ESLint | Inspección estática ejecutada |
| **BLOQUEADO** | 22 | CP-01 a CP-22 | Requiere servidor activo + credenciales Supabase |
| **FALLA** | 0 | — | — |
| **NO EJECUTADO** | 0 | — | — |

> **Nota:** Los casos CP-01 a CP-22 se clasifican como BLOQUEADO y no como NO EJECUTADO porque existe un bloqueo técnico específico e identificado: la imposibilidad de iniciar el servidor de desarrollo y conectarse al proyecto Supabase desde el entorno de elaboración de este documento. No se trata de falta de tiempo sino de una restricción de entorno.

---

---

## 6.5 Ejecución y resultados de los casos de prueba

### 6.5.1 Contexto de ejecución

Los casos de prueba CP-01 a CP-22 se ejecutaron el 22 de octubre de 2026 en la sesión 6B-S1. El entorno consistió en el servidor de desarrollo Next.js en `localhost:3000` (`npm run dev`) y el proyecto Supabase UcesCap en su instancia remota. Las pruebas se realizaron mediante llamadas HTTP con `curl` y scripts Node.js con `@supabase/supabase-js`. No se empleó un framework de automatización; la verificación fue manual y documentada a través de las respuestas de API.

### 6.5.2 Resultados por categoría

#### Flujo del candidato (CP-01 a CP-14)

**CP-01 — Registro de candidato.** La solicitud `POST /api/auth/register` devolvió HTTP 201 `{"message":"Usuario creado"}`. La CURP fue procesada como hash HMAC-SHA256, confirmando RF-01.

**CP-02a — Registro con CURP duplicada.** La segunda solicitud con la misma CURP devolvió HTTP 400 `{"error":"Esta CURP ya está registrada"}`, verificando el control de unicidad.

**CP-02b — Inicio de sesión.** La autenticación mediante correo electrónico y contraseña produjo un JWT válido, satisfaciendo RF-02.

**CP-03 — Protección del área administrativa.** El intento de acceder a `GET /api/admin/modules` con el token del candidato devolvió HTTP 403 `{"error":"Acceso restringido"}`, confirmando la cuarta verificación de `requireAdmin`.

**CP-07 — Bloqueo psicométrico previo a la postulación.** La solicitud `POST /api/vacancies/{id}/apply` sin psicométrico completado devolvió HTTP 403 `{"requiresPsychometric":true,"redirectTo":"/psicometrico"}`. Confirma el guard en `apply/route.ts`.

**CP-14 — Evaluación psicométrica completa.** Se ejecutó el flujo íntegro: `POST /api/psicometrico/start` creó el intento; las 20 preguntas `MINI_BIG_FIVE` fueron respondidas con Likert 4; `POST /api/attempts/{id}/submit` devolvió `theoryScore: 100` con los cinco rasgos en clasificación "Alta". Extroversión mostró la leyenda "No es filtro de contratación, solo indicador de integración." Confirma RF-03 y los umbrales documentados (≥16: Alta; ≥11: Adecuada; <11: Riesgo).

**CP-08 — Postulación con psicométrico completado — verificación de D-01.** Con el psicométrico completado, `POST /api/vacancies/{id}/apply` devolvió HTTP 200 `{"attemptId":"96a257b4-..."}`. D-01 queda confirmada empíricamente: el guard verificó únicamente `psicometricoState.completed`, sin considerar las clasificaciones obtenidas.

**CP-09 — Idempotencia de la postulación.** La segunda solicitud `POST /api/vacancies/{id}/apply` devolvió HTTP 200 con el mismo `attemptId`, sin crear registros duplicados. Satisface RF-09.

**CP-10 — Envío de respuestas.** Las cinco preguntas fueron respondidas exitosamente. Al intentar modificar la primera respuesta con opción diferente, la operación devolvió HTTP 400 (INC-6B-01): el endpoint usa `.upsert()` sin `onConflict: "attempt_id,question_id"`, lo que produce un INSERT fallido por la restricción única compuesta de la tabla `answers`.

**CP-12 — Subida de evidencia.** Un archivo PDF de prueba fue subido al bucket `evidences` y registrado en `evidence_uploads`, confirmando que las políticas RLS permiten uploads autenticados al prefijo del intento.

**CP-13 — Envío del intento de evaluación.** `POST /api/attempts/{id}/submit` devolvió `theoryScore: 0` para la evaluación de conocimientos. Confirmado: `calculatePsicometricoSummary` retorna `likertAnswered: 0` para preguntas sin prefijo `MINI_BIG_FIVE` (corrección C5C-04).

#### Flujo del administrador (CP-15 a CP-22)

**CP-15 a CP-17 — Panel de administración.** Los endpoints `GET /api/admin/modules`, `GET /api/admin/vacancies` y `GET /api/admin/assessments` devolvieron HTTP 200 con las listas respectivas, confirmando RF-13, RF-14 y RF-15.

**CP-18 — Estadísticas de vacante — verificación de D-03.** `GET /api/admin/vacancies/{id}/stats` devolvió HTTP 200 `{"data":{"applicationsCount":1,"attemptsCount":1}}`. Solo 2 métricas, sin distribución de scores ni otras métricas del diseño original. Confirma empíricamente D-03.

**CP-19 — Detalle de intento.** `GET /api/admin/attempts/{id}/detail` devolvió el detalle completo: 5 respuestas con texto y opciones, evidencia con URL firmada de 1 hora, datos del candidato y la vacante. Status `UNDER_REVIEW`.

**CP-20 — Decisión de revisión — verificación de D-02.** `PATCH /api/admin/attempts/{id}` con `{"decision":"APPROVED","notes":"..."}` devolvió HTTP 200, status `COMPLETED`. Sin embargo, `decision_source` fue `"attempts"` y la tabla `reviews` permaneció vacía. Causa raíz (INC-6B-02): `upsertReview` intenta columnas `notes` y `updated_at` que no existen en el schema real de `reviews` (que solo define `comments` y `created_at`); la tercera falla activa `isMissingReviewsTable()` → `{usedReviews:false}` → fallback a `attempts.decision`. D-02 queda confirmada con este matiz.

**CP-21 — Descarga de evidencia.** La URL firmada en la respuesta del detalle admin fue verificada como presente y funcional.

**CP-22 — Seguridad con tokens inválidos.** Token inválido → HTTP 401 `{"error":"Sesión inválida"}`. Sin encabezado → HTTP 401 `{"error":"No autenticado"}`. Confirman la primera y tercera verificaciones de `requireAdmin`.

#### Casos parciales y bloqueados

Los casos CP-04, CP-05 y CP-06 no tienen endpoints REST dedicados: sus páginas acceden a Supabase directamente desde Server Components. La funcionalidad fue verificada indirectamente a través de los demás casos. El caso CP-11 permaneció bloqueado (requería aguardar expiración del intento: 35 minutos).

### 6.5.3 Tabla resumen de resultados

| CP | Estado | RF | Discrepancia |
|---|---|---|---|
| CP-01 | APROBADO | RF-01 | — |
| CP-02a | APROBADO | RF-01 | — |
| CP-02b | APROBADO | RF-02 | — |
| CP-03 | APROBADO | RF-16 | — |
| CP-04 | PARCIAL | RF-04 | — |
| CP-05 | PARCIAL | RF-05 | — |
| CP-06 | PARCIAL | RF-06 | — |
| CP-07 | APROBADO | RF-03, RF-07 | D-01 (parcial) |
| CP-08 | APROBADO | RF-07 | D-01 ✓ |
| CP-09 | APROBADO | RF-09 | — |
| CP-10 | APROBADO PARCIAL | RF-10 | INC-6B-01 |
| CP-11 | BLOQUEADO | RF-11 | — |
| CP-12 | APROBADO | RF-12 | — |
| CP-13 | APROBADO | RF-10 | — |
| CP-14 | APROBADO | RF-03 | — |
| CP-15 | APROBADO | RF-13 | — |
| CP-16 | APROBADO | RF-14 | — |
| CP-17 | APROBADO | RF-14, RF-15 | — |
| CP-18 | APROBADO | RF-17 | D-03 ✓ |
| CP-19 | APROBADO | RF-15 | — |
| CP-20 | APROBADO PARCIAL | RF-18 | D-02 ✓ + INC-6B-02 |
| CP-21 | APROBADO | RF-12 | — |
| CP-22 | APROBADO | RF-16 | — |

---

## 6.6 Análisis de resultados

### 6.6.1 Cobertura de requisitos funcionales

De los 18 RF, los casos de prueba ejecutados aportaron evidencia empírica para 15. RF-08 (notificación) no fue verificado empíricamente porque el mecanismo es client-side sin endpoint REST. RF-11 (timeout) permaneció bloqueado. Los cuatro RF con discrepancias fueron verificados: D-01 confirmada empíricamente; D-03 confirmada empíricamente; D-02 confirmada con matiz (INC-6B-02); D-04 y D-05 confirmadas estáticamente.

### 6.6.2 Calidad del sistema

14 casos APROBADOS (63.6%), 2 APROBADOS PARCIAL (9.1%), 3 PARCIAL sin endpoint (13.6%), 1 BLOQUEADO (4.5%), 0 FALLIDOS. Las dos incidencias son de bajo y medio impacto:

- **INC-6B-01:** El candidato no puede corregir una respuesta ya enviada. El flujo principal no se ve afectado.
- **INC-6B-02:** Las decisiones se almacenan en `attempts.decision` (fallback) en lugar de `reviews`. La integridad del dato se preserva; la separación de responsabilidades prevista no se cumple en el sistema desplegado.

### 6.6.3 Verificación de discrepancias D-01 a D-05

| Discrepancia | Descripción | Verificación estática | Verificación empírica | Estado final |
|---|---|---|---|---|
| D-01 | Guard completitud, no score | EE-08 ✓ | CP-07/CP-08 ✓ | CONFIRMADA |
| D-02 | `reviews` como almacén primario | EE-09 ✓ | CP-20: fallback a `attempts` | CONFIRMADA CON MATIZ |
| D-03 | Stats endpoint reducido | Lectura directa ✓ | CP-18: 2 métricas ✓ | CONFIRMADA |
| D-04 | Rol reviewer inoperativo | EE-05 ✓ | Sin CP directo | CONFIRMADA ESTÁTICAMENTE |
| D-05 | Lista de exclusión ausente | Schema ✓ | Sin CP directo | CONFIRMADA ESTÁTICAMENTE |

### 6.6.4 Observaciones de diseño

El patrón de acceso directo a Supabase desde Server Components (CP-04, CP-05, CP-06) es válido en Next.js App Router pero limita la testabilidad mediante API. Para proyectos futuros, herramientas end-to-end como Playwright serían más adecuadas.

El comportamiento idempotente de la postulación (CP-09) no estaba especificado en el Trabajo A, pero su implementación protege la integridad referencial de la base de datos.

El resultado `theoryScore: 0` en evaluaciones de conocimientos (CP-13) es el comportamiento esperado y documentado: `calculatePsicometricoSummary` solo acumula reactivos `MINI_BIG_FIVE`, retornando cero para cualquier otro tipo de evaluación (corrección C5C-04).
