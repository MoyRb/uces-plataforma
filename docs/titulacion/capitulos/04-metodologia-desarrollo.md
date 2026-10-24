# Capítulo IV. Metodología de desarrollo

---

## 4.1 Selección y justificación de la metodología

La elección de una metodología de desarrollo no es un requisito burocrático: es la decisión que define cómo se distribuyen el esfuerzo, el riesgo y la capacidad de respuesta ante lo que se descubre durante la construcción. Para UCES Plataforma de Talento, el modelo seleccionado fue el **prototipado evolutivo**, identificado formalmente en el Trabajo A de análisis y diseño como la metodología más adecuada para el contexto del proyecto (Arciniega Robles, 2026).

El prototipado evolutivo es un modelo de ciclo de vida del software en el que la primera versión del sistema —el prototipo inicial— no es un artefacto desechable, sino la base real sobre la que se construyen todas las versiones posteriores (Pressman & Maxim, 2015). Cada iteración incorpora nuevas funcionalidades, corrige deficiencias de la versión anterior y refina el comportamiento del sistema a partir de la verificación con requisitos y con los resultados observados. A diferencia del modelo en cascada, donde cada fase debe completarse antes de avanzar a la siguiente, el prototipado evolutivo acepta que los requisitos se clarifican y se estabilizan de manera progresiva conforme el sistema toma forma.

Para el proyecto de UCES, tres características del contexto hacen pertinente esta metodología:

**Naturaleza progresiva de los requisitos.** Si bien el Trabajo A formalizó 18 requisitos funcionales y 14 casos de uso antes de iniciar el desarrollo, varios aspectos del comportamiento del sistema —particularmente del módulo psicométrico y del flujo de revisión administrativa— no quedaron completamente especificados hasta que se construyó una primera versión funcional. La estructura del instrumento psicométrico fue proporcionada por el área de Recursos Humanos durante el desarrollo; no existía al momento de iniciar la implementación.

**Necesidad de verificación mediante software funcional.** En un sistema de evaluación digital, la validez de decisiones como la estructura del formulario psicométrico, el mecanismo de control de tiempo o la presentación de resultados al administrador no puede determinarse completamente con diagramas. Se necesita software ejecutable para verificar que el comportamiento se corresponde con lo esperado. El prototipado evolutivo facilita esta verificación en ciclos cortos.

**Equipo reducido y alcance de MVP.** El desarrollo fue realizado por un único desarrollador en el marco de residencias profesionales. En este contexto, los modelos de proceso con alta carga administrativa —como Scrum con sus ceremonias formales, roles definidos y artefactos de planificación— habrían generado más carga que valor. El prototipado evolutivo provee estructura suficiente sin exigir un equipo multi-rol.

---

## 4.2 Organización general del desarrollo

El proceso de desarrollo se organizó en torno a las siguientes actividades técnicas, que se repitieron de manera cíclica a medida que el sistema crecía en funcionalidades:

1. **Comprensión de los requisitos del incremento.** Antes de implementar cada grupo de funcionalidades, se revisaban los requisitos correspondientes del Trabajo A, se identificaban las tablas de base de datos involucradas y se determinaban los endpoints de API necesarios.

2. **Diseño de los componentes del incremento.** Se definían las rutas de Next.js que se crearían o modificarían, los tipos TypeScript necesarios para las estructuras de datos, y las consultas o mutaciones a Supabase que cada operación requería.

3. **Construcción de las funcionalidades.** Se implementaban los Server Components, Client Components y Route Handlers correspondientes, junto con los ajustes necesarios al esquema de base de datos si el incremento requería nuevas tablas o columnas.

4. **Integración con Supabase.** Se verificaba que las políticas de RLS aplicaran correctamente al nuevo código, que los clientes de Supabase (browser vs. server) se usaran en el contexto adecuado, y que las relaciones entre tablas funcionaran según el esquema.

5. **Verificación funcional.** Se ejecutaba el sistema localmente y se recorría el flujo completo del incremento para confirmar que el comportamiento visible coincidía con lo esperado.

6. **Identificación de ajustes.** Los problemas detectados durante la verificación —errores de tipos TypeScript, comportamientos inesperados de RLS, incompatibilidades de versión con las APIs de Next.js— se diagnosticaban y se incorporaban como trabajo del mismo incremento o del siguiente.

7. **Registro en Git.** Los cambios verificados se registraban con un mensaje descriptivo que identificaba el incremento. El historial de commits es el registro primario de cómo evolucionó el sistema.

**Sobre la reconstrucción del proceso.** La descripción de este capítulo combina dos tipos de información: lo que el historial de Git evidencia directamente (qué archivos se crearon o modificaron, en qué fecha y con qué propósito según el mensaje del commit) y lo que el desarrollador puede reconstruir con base en el conocimiento de las decisiones tomadas. Cuando la reconstrucción se basa únicamente en el historial, se indica explícitamente.

---

## 4.3 Preparación del entorno de desarrollo

El entorno de desarrollo se configuró como un monorepo con dos directorios principales: `my-app/`, que contiene la aplicación Next.js completa, y `supabase/`, que concentra los archivos de definición de la base de datos (esquema, roles, políticas, datos de prueba y migraciones). Esta separación mantiene los artefactos de cada capa independientes y facilita el rastreo de cambios en base de datos de forma separada al código de la aplicación.

Las herramientas principales del entorno fueron:

- **Node.js** (versión ^20 según `package.json`) como entorno de ejecución de JavaScript y gestor del servidor de desarrollo de Next.js.
- **npm** como gestor de paquetes. El archivo `package-lock.json` registra las versiones exactas de todas las dependencias instaladas.
- **TypeScript 5** como lenguaje de programación, con configuración en `tsconfig.json`.
- **Next.js 16.1.1** con modo desarrollo activado mediante `npm run dev`, que incluye recarga en caliente y compilación incremental.
- **Turbopack**, habilitado con `root: __dirname` en `next.config.ts`, como compilador experimental de alta velocidad para el entorno de desarrollo.
- **Supabase CLI** para gestionar el proyecto de base de datos, aplicar migraciones y sincronizar el esquema con la instancia remota del proyecto UcesCap.
- **Git** para el control de versiones local.
- **GitHub** (repositorio `github.com/MoyRb/uces-plataforma`) para el alojamiento del repositorio remoto y el registro de ramas de trabajo.

Las variables de entorno del proyecto —`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` y `CURP_HASH_SECRET`— se gestionaron mediante un archivo `.env.local` excluido del repositorio. Su estructura se documenta en el `README.md` del proyecto.

---

## 4.4 Construcción incremental del sistema

A partir del análisis del historial de Git, el desarrollo del sistema puede reconstruirse en ocho iteraciones funcionales, organizadas cronológicamente desde el inicio del proyecto (diciembre de 2025) hasta la estabilización final (mayo de 2026).

### Iteración 1 — Andamiaje del proyecto (2025-12-30)

**Commits de referencia:** `2183d58`, `355a0cf`, `f562cea`, `c83fb06`

La primera iteración estableció la base técnica completa del sistema. Se creó el proyecto Next.js con su configuración de TypeScript, Tailwind CSS y shadcn/ui; se definió el esquema completo de la base de datos en `supabase/schema.sql` con las 13 tablas y sus relaciones; se escribieron las políticas iniciales de Row Level Security en `supabase/rls.sql`; y se implementaron las bibliotecas base de `lib/curp.ts`, `lib/supabaseClient.ts` y `lib/supabaseServer.ts`.

La decisión de definir el esquema completo de la base de datos en la primera iteración —en lugar de ir agregando tablas incrementalmente— responde al diseño previo del Trabajo A: el modelo de datos de 13 tablas ya existía documentado, por lo que podía implementarse desde el inicio sin necesidad de migraciones destructivas posteriores. Esta decisión redujo la cantidad de cambios estructurales necesarios en etapas avanzadas del desarrollo.

### Iteración 2 — Autenticación, perfil candidato y flujo principal (2025-12-31)

**Commits de referencia:** `c3ddc61`, `24adf91`

En una sola jornada de trabajo intensa, se implementaron las funcionalidades fundamentales del flujo del candidato:

- Las páginas `/login`, `/register`, `/panel`, con sus lógicas de autenticación vía Supabase Auth.
- El Route Handler `POST /api/auth/register` con validación de CURP, generación de HMAC-SHA256 y creación transaccional del usuario.
- Una primera versión del panel `/admin`.
- Los módulos de evaluación: `/vacantes/[id]`, `/modulos/[moduleId]`, `/evaluacion/[attemptId]` (con `cliente.tsx`, `page.tsx` y `utils.ts`), y `/resultado/[attemptId]`.
- Los Route Handlers de candidato: `POST /api/vacancies/[id]/apply`, `POST /api/attempts/[attemptId]/answers` y `POST /api/attempts/[attemptId]/submit`.

Esta iteración produjo un sistema funcional de extremo a extremo en la ruta del candidato: era posible registrarse, autenticarse, ver una vacante, postularse, responder preguntas con temporizador, cargar evidencia y recibir un resultado. El commit `24adf91` que registra estos cambios muestra la adición de 1,170 líneas de código en 12 archivos nuevos, lo que refleja la magnitud del esfuerzo concentrado en esta etapa.

### Iteración 3 — Roles reales con Supabase (2026-02-17)

**Commits de referencia:** `4d9f058`, `ac9c552`

La primera versión del sistema gestionaba el rol del usuario usando únicamente la columna `role` de la tabla `profiles`. Esta aproximación presentaba un problema de arquitectura: las políticas de RLS que necesitaban verificar el rol del usuario debían consultar `profiles` directamente, lo que generaba dependencias circulares al intentar aplicar la política sobre la propia tabla.

En esta iteración se introdujo la tabla `user_roles` como mecanismo principal de gestión de roles, junto con la función `get_my_role()` con cláusula `SECURITY DEFINER` que resuelve el rol consultando primero `user_roles` y luego cayendo al valor de `profiles.role`. El archivo `supabase/roles.sql` formalizó esta lógica y estableció también la migración de backfill para copiar los roles existentes en `profiles` hacia `user_roles`.

### Iteración 4 — Panel administrativo completo (2026-02-18)

**Commits de referencia:** `ff2657f`, `6c30675`

Se implementó el panel administrativo con su conjunto completo de endpoints de API protegidos. El commit `ff2657f` creó 13 archivos nuevos:

- CRUD de módulos (`/api/admin/modules`, `/api/admin/modules/[id]`)
- CRUD de vacantes y su evaluación asociada (`/api/admin/vacancies`, `/api/admin/vacancies/[id]`, `/api/admin/vacancies/[id]/assessment`, `/api/admin/vacancies/[id]/stats`)
- CRUD de evaluaciones y preguntas (`/api/admin/assessments`, `/api/admin/assessments/[id]`, `/api/admin/assessments/[id]/questions`, `/api/admin/questions/[id]`)
- Gestión de intentos desde el panel admin (`/api/admin/attempts`, `/api/admin/attempts/[id]`)
- La función `requireAdmin()` en `app/api/admin/utils.ts`, que desde ese momento protege todos los endpoints administrativos verificando el JWT y el rol antes de ejecutar cualquier operación.

### Iteración 5 — Estabilización de la compatibilidad con Next.js (2026-02-18)

**Commits de referencia:** `4f9ca47`, `c77284d`, `518e343`, `9563ccc`, `065f8d1`, `0905c1c`, `a25f08d`, `9fd7193`, `694d53c`

La migración al App Router de Next.js introdujo un cambio significativo en la forma en que las rutas dinámicas acceden a sus parámetros: a partir de ciertas versiones, el objeto `params` de los Route Handlers y las páginas dinámicas es una promesa que debe resolverse con `await`. Esta diferencia con respecto al comportamiento esperado generó una serie de errores de tiempo de ejecución y advertencias del compilador que se corrigieron en múltiples commits de esta iteración.

Adicionalmente, se corrigieron: la normalización de opciones de preguntas en el panel admin (`9fd7193`), un problema con la importación del helper `formatBytes` que impedía la compilación de la página de resultados (`a25f08d`), marcado HTML incorrecto con etiquetas `<p>` anidadas que generaban advertencias de hidratación (`065f8d1`), y la adición de la ruta `/perfil` que se había omitido en la iteración anterior (`694d53c`).

### Iteración 6 — Flujo de revisión administrativa y decisiones (2026-02-18)

**Commits de referencia:** `9350275`, `022692f`, `58fa9d3`, `bfe4088`

Se completó el flujo de revisión: el administrador puede ahora ver el detalle completo de un intento —respuestas, evidencias con URL firmada, perfil del candidato— y registrar una decisión (APPROVED, REJECTED, UNDER_REVIEW) con notas. La decisión queda visible para el candidato en su página `/perfil`.

En esta iteración surgió también la necesidad de añadir columnas `decision` y `reviewer_notes` a la tabla `attempts` para soportar un mecanismo de respaldo cuando la tabla `reviews` no está disponible. Esto se formalizó en el archivo de migración `supabase/migration_attempts_decision_columns.sql`. La coexistencia de dos mecanismos de almacenamiento de decisiones —`reviews` como primario, `attempts.decision` como respaldo— constituye la discrepancia D-02 documentada en la matriz de requisitos.

### Iteración 7 — Módulo psicométrico (2026-03-04)

**Commits de referencia:** `07fca11`, `c9188af`, `d7c0824`, `5870d26`

El módulo psicométrico se construyó en cuatro commits secuenciales que reflejan el proceso de clarificación de requisitos propio del prototipado evolutivo:

1. `07fca11`: Se crearon los datos iniciales del cuestionario psicométrico en `supabase/seed.sql` y `supabase/seed_psicometrico_base.sql`. El cuestionario se sembró con su estructura de 20 ítems codificados con el prefijo `MINI_BIG_FIVE|RASGO|` en el campo `prompt` de la tabla `questions`, lo que permite a la función de cálculo identificar el rasgo sin una columna adicional.

2. `c9188af`: Se implementaron la ruta `/psicometrico`, el Route Handler `POST /api/psicometrico/start` y la biblioteca `lib/psicometrico.ts`. Se agregó la verificación en `POST /api/vacancies/[id]/apply` que requiere que el psicométrico esté completado antes de permitir la postulación.

3. `d7c0824`: Se implementó `lib/psicometricoResults.ts` con la lógica completa de cálculo del puntaje por rasgo y la clasificación por umbrales. El campo `psychometric_summary` se añadió a la tabla `attempts` mediante la migración `migration_attempts_psychometric_summary.sql`. La función de submit se actualizó para calcular y almacenar el resumen al enviar.

4. `5870d26`: Se ajustó la página de resultados para ocultar los puntajes numéricos al candidato y mostrar únicamente clasificaciones textuales. El panel admin recibió la sección de resumen psicométrico con los cinco rasgos.

### Iteración 8 — Ajuste del instrumento y mejoras de diseño (2026-05-08 a 2026-05-20)

**Commits de referencia:** `dd26d9a`, `d00ba8b`, `46027cb`, `0b84137`, `4075114`, `ca422c8`

La última iteración agrupó ajustes de fondo que surgieron de la revisión del sistema completo:

- El cuestionario psicométrico se reescribió para ajustar los ítems a la versión definitiva del instrumento proporcionado por UCES (`dd26d9a`). El número de ítems se confirmó en 20 (4 por rasgo) y el nombre del instrumento cambió a "TEST MINI BIG FIVE".
- Se creó una migración idempotente en `supabase/migrations/20260509_fix_admin_roles.sql` para garantizar que los roles de administrador existentes en `profiles` se migraran correctamente a `user_roles` (`d00ba8b`).
- Se realizó una revisión general del diseño visual de la interfaz, actualizando 22 archivos de la carpeta `app/` para mejorar la apariencia y consistencia de todas las vistas (`46027cb`).
- Se introdujo el tipo exportado `ReviewDecision` en `lib/reviewDecision.ts` para resolver un error de tipos TypeScript que impedía la construcción del proyecto en producción (`0b84137`).
- Se corrigieron incompatibilidades de tipos en las respuestas de Supabase que relacionan tablas anidadas (`application.user_id` en submit route), desbloqueando la compilación limpia del proyecto (`4075114`).
- Se corrigió el orden de los `grant` y `revoke` en `supabase/rls.sql` para garantizar que la función `get_my_role()` fuera visible para los roles correctos, junto con ajustes en `lib/auth.ts` para mejorar el manejo de errores del RPC (`ca422c8`).

---

## 4.5 Integración y revisión de incrementos

La integración del sistema se produjo de forma continua: cada incremento se construía sobre el estado existente del repositorio, y los componentes que dependen unos de otros se conectaban en el mismo ciclo. La relación entre el frontend, los Route Handlers y Supabase sigue un patrón consistente en toda la aplicación:

1. Un componente de interfaz (Client Component) recopila la entrada del usuario y envía una solicitud HTTP al Route Handler correspondiente adjuntando el JWT en el encabezado `Authorization`.
2. El Route Handler valida el JWT (mediante `supabase.auth.getUser(token)` o `requireAdmin()`), ejecuta la lógica de negocio y realiza las operaciones sobre Supabase usando el cliente de servidor.
3. Supabase evalúa las políticas de RLS y ejecuta las consultas SQL.
4. La respuesta regresa al componente de interfaz, que actualiza el estado local y re-renderiza la vista correspondiente.

Este patrón tiene una consecuencia que es importante registrar: la verificación de permisos ocurre en dos capas independientes. La capa de API rechaza solicitudes sin token válido o sin rol suficiente; la capa de base de datos rechaza operaciones que las políticas de RLS no permitan. Ambas capas actúan de forma independiente, de manera que un fallo en una no compromete la otra.

La distinción entre **pruebas de desarrollo** y **pruebas formales de aceptación** es relevante para este reporte. Las pruebas realizadas durante el desarrollo fueron pruebas funcionales manuales: el desarrollador ejecutaba el sistema localmente, recorría los flujos completos y verificaba que el comportamiento coincidiera con los requisitos. No se realizaron pruebas automatizadas (unitarias ni de integración) dentro del alcance de este MVP. Las pruebas formales de aceptación —verificación sistemática con casos documentados y condiciones de pasa/falla— se documentan en el Capítulo VI.

---

## 4.6 Gestión de modificaciones y resolución de problemas técnicos

El historial de Git registra al menos cinco categorías de problemas técnicos que requirieron modificaciones sustanciales al código o a la base de datos durante el desarrollo.

### Problema T-01 — Acceso asíncrono a parámetros dinámicos en Next.js App Router

| Elemento | Detalle |
|---|---|
| Situación técnica | En Next.js con App Router, el objeto `params` que reciben los Server Components y los Route Handlers de rutas dinámicas es una promesa a partir de ciertas versiones. El acceso directo como `params.id` produce una advertencia en desarrollo y puede causar errores en producción. |
| Componentes afectados | `app/modulos/[moduleId]/page.tsx`, `app/vacantes/[id]/page.tsx`, `app/api/attempts/[attemptId]/answers/route.ts`, `app/api/attempts/[attemptId]/submit/route.ts`, y otras rutas dinámicas. |
| Modificación realizada | Acceso mediante `const { id } = await params` en lugar de `const { id } = params` en todos los componentes y handlers dinámicos. |
| Evidencia en Git | Commits `c77284d`, `518e343`, `9563ccc`, `0905c1c`, `4075114` (2026-02-18 y 2026-05-15). |
| Resultado observable | Eliminación de advertencias de compilación y comportamiento correcto en rutas dinámicas. |
| Aprendizaje técnico | La documentación de Next.js sobre el modelo de parámetros en App Router especifica el comportamiento asíncrono. Leer las notas de versión antes de comenzar cada incremento previene este tipo de correcciones en cascada. |

### Problema T-02 — Circularidad en las políticas de RLS al verificar el rol

| Elemento | Detalle |
|---|---|
| Situación técnica | Las políticas de RLS sobre `user_roles` necesitaban verificar si el usuario era administrador para determinar quién podía leer o modificar esa tabla. Si la verificación del rol consultaba `user_roles` directamente, se producía una recursión: la política intentaba evaluar la condición que dependía de la misma tabla que estaba siendo evaluada. |
| Componentes afectados | `supabase/rls.sql`, función `get_my_role()`. |
| Modificación realizada | La función `get_my_role()` se declaró con `SECURITY DEFINER`, lo que la hace ejecutarse con los permisos del propietario (el rol administrador de la base de datos) en lugar del usuario que la invoca. Esto le permite consultar `user_roles` sin activar sus propias políticas. |
| Evidencia en Git | Commit `4d9f058` (2026-02-17), `ca422c8` (2026-05-20). El segundo commit corrigió adicionalmente el orden de los `REVOKE`/`GRANT` sobre la función, que impedía que ciertos roles la invocaran correctamente. |
| Resultado observable | Políticas de RLS funcionales sin circularidad; el rol se resuelve correctamente en todas las consultas. |
| Aprendizaje técnico | Al diseñar funciones que se usan dentro de políticas de RLS, la cláusula `SECURITY DEFINER` es la herramienta estándar de PostgreSQL para este patrón. Debe usarse con precaución y con `SET search_path = public` para evitar que el cambio de contexto de seguridad permita inyecciones mediante objetos homónimos en esquemas no controlados. |

### Problema T-03 — Tipado de relaciones anidadas en respuestas de Supabase

| Elemento | Detalle |
|---|---|
| Situación técnica | Al usar el cliente de Supabase para consultas con relaciones (`select("..., application:applications!inner(user_id)")`), el SDK infería el tipo de la relación como un tipo de unión que incluía tanto el objeto como un arreglo del objeto. TypeScript rechazaba el acceso directo a `attempt.application.user_id` porque el tipo inferido era `{user_id: string} | {user_id: string}[] | null`. |
| Componentes afectados | `app/api/attempts/[attemptId]/submit/route.ts`, `app/api/attempts/[attemptId]/answers/route.ts`. |
| Modificación realizada | Se agregó la normalización explícita `const application = Array.isArray(attempt.application) ? attempt.application[0] : attempt.application` antes de acceder a sus propiedades, junto con la declaración del tipo esperado mediante el genérico `.maybeSingle<AttemptWithApplication>()`. |
| Evidencia en Git | Commit `4075114` (2026-05-15). |
| Resultado observable | Compilación limpia del proyecto; el campo `user_id` es accesible sin errores de tipos. |
| Aprendizaje técnico | Los tipos generados automáticamente por el SDK de Supabase para relaciones anidadas no siempre coinciden con el comportamiento real de la consulta. El uso de tipos genéricos explícitos en combinación con la normalización del resultado es el patrón recomendado. |

### Problema T-04 — Almacenamiento del resumen psicométrico: columna ausente en producción

| Elemento | Detalle |
|---|---|
| Situación técnica | La columna `psychometric_summary jsonb` se agregó a la tabla `attempts` mediante migración (`migration_attempts_psychometric_summary.sql`), pero si la migración no se había aplicado en el entorno de producción al momento del despliegue, el intento de actualizar esa columna producía un error de base de datos que impedía el envío del intento por parte del candidato. |
| Componentes afectados | `app/api/attempts/[attemptId]/submit/route.ts`. |
| Modificación realizada | Se implementó un mecanismo de respaldo: si el error devuelto por Supabase contiene el mensaje `"column"` y `"psychometric_summary"`, el Route Handler reintenta la actualización sin ese campo y guarda el resumen en la tabla `reviews` como alternativa. El marcador `isMissingColumnError()` detecta esta condición. |
| Evidencia en Git | Commit `d7c0824` (2026-03-04). |
| Resultado observable | El sistema puede funcionar en ambos escenarios: con la columna presente (ruta principal) o sin ella (ruta de respaldo). |
| Aprendizaje técnico | Las migraciones de base de datos deben aplicarse al entorno de producción antes de desplegar el código que las usa. El mecanismo de respaldo es una solución de compatibilidad que no debe mantenerse indefinidamente; una vez confirmada la migración en producción, puede simplificarse. Este patrón es también el origen de la discrepancia D-02 documentada en el Trabajo B. |

### Problema T-05 — Tipado del enumerado de decisiones de revisión

| Elemento | Detalle |
|---|---|
| Situación técnica | Las decisiones administrativas (APPROVED, REJECTED, INFO_REQUIRED) se validaban mediante comprobaciones de cadena de texto en varios lugares del código. La ausencia de un tipo centralizado hacía que TypeScript no pudiera verificar que todos los usos fueran consistentes, y un error en un valor de cadena solo aparecería en tiempo de ejecución. Al compilar el proyecto para producción, TypeScript detectó inconsistencias que no eran evidentes durante el desarrollo local. |
| Componentes afectados | `app/api/admin/attempts/[id]/route.ts`, `app/admin/attempts/[id]/page.tsx`, `app/api/admin/utils.ts`. |
| Modificación realizada | Se creó el archivo `lib/reviewDecision.ts` que exporta el tipo unión `ReviewDecision = "APPROVED" | "REJECTED" | "INFO_REQUIRED"` y la función de guardia `isReviewDecision(value)`. Todos los usos del valor de decisión en el código fueron actualizados para usar este tipo. |
| Evidencia en Git | Commit `0b84137` (2026-05-15). |
| Resultado observable | Compilación limpia; cualquier valor de decisión no reconocido es detectado por TypeScript en tiempo de compilación. |
| Aprendizaje técnico | Los valores de enumerado que se usan en múltiples partes de la aplicación deben centralizarse en un único módulo de tipos desde el inicio del desarrollo. TypeScript solo puede verificar la consistencia de tipos si el tipo está declarado explícitamente. |

---

## 4.7 Herramientas para el control de versiones

El sistema de control de versiones utilizado fue **Git**, con el repositorio remoto alojado en **GitHub** bajo la cuenta `MoyRb`. El historial del repositorio al cierre del desarrollo registra 56 commits distribuidos a lo largo de seis meses, desde el 30 de diciembre de 2025 hasta el 20 de mayo de 2026.

La estrategia de trabajo visible en el historial combina commits directos a la rama `main` para el trabajo de desarrollo individual, con ramas de trabajo que se integran mediante *pull requests*. Los nombres de las ramas siguen un patrón consistente con el prefijo `codex/` seguido de una descripción del cambio (por ejemplo, `codex/fix-typescript-build-errors`, `codex/implement-assessment-completion-requirement`). Esta convención facilita identificar el propósito de cada integración al revisar el historial.

No existen en el repositorio evidencias de configuración de CI/CD (integración y despliegue continuos), revisiones de código formales ni reglas de protección de ramas. El flujo de trabajo registrado es el de un desarrollador individual que usa las ramas de GitHub como mecanismo de organización del trabajo, no como pipeline de revisión grupal.

El archivo `.gitignore` excluye correctamente los archivos `.env.local` y `.env*.local` que contienen las variables de entorno con credenciales sensibles, garantizando que éstas no queden expuestas en el historial del repositorio.

---

## 4.8 Relación con el proceso de prototipado evolutivo

La siguiente tabla vincula las fases del modelo de prototipado evolutivo, tal como se describe en el Trabajo A (Arciniega Robles, 2026, sección 3.1), con las actividades técnicas del Trabajo B:

| Fase del modelo (Trabajo A) | Actividad técnica (Trabajo B) | Iteración | Evidencia |
|---|---|---|---|
| Definición de requisitos iniciales | Lectura del catálogo de RF, RNF y CU del Trabajo A; identificación de tablas y endpoints necesarios | Previa a cada iteración | `docs/titulacion/02-matriz-requisitos-implementacion.md` |
| Diseño rápido del prototipo | Definición de rutas Next.js, tipos TypeScript y consultas Supabase antes de implementar | Iteraciones 1-8 | Arquitectura visible en `app/` y `supabase/` |
| Construcción del prototipo | Implementación de Server Components, Client Components y Route Handlers | Iteraciones 1-8 | Commits en Git (ver sección 4.4) |
| Evaluación del prototipo | Verificación funcional manual del flujo completo de cada incremento | Tras cada iteración | Correcciones en la misma o siguiente iteración |
| Refinamiento | Corrección de errores, ajuste de comportamiento, mejoras de interfaz | Iteraciones 5, 7, 8 | Commits de fix y ajuste (T-01 a T-05) |
| Entrega de la versión funcional | Sistema completo con 18 RF implementados, ejecutable localmente | Iteración 8 | Estado final del repositorio `main` |

El modelo de prototipado evolutivo aplicado en este proyecto tuvo una variante práctica: dado que el Trabajo A había formalizado los requisitos antes del inicio del desarrollo, las primeras iteraciones avanzaron con más confianza que en un proyecto donde los requisitos se descubren durante la construcción. Sin embargo, el carácter evolutivo se manifestó claramente en el módulo psicométrico —cuya estructura final no estaba completamente definida al inicio— y en la gestión de roles, que requirió dos iteraciones para alcanzar la arquitectura definitiva.

---

## 4.9 Evaluación de la metodología

### Ventajas observadas en el contexto del proyecto

**Flexibilidad ante requisitos emergentes.** La estructura del instrumento psicométrico y los detalles del flujo de decisión administrativa no estaban completamente especificados al inicio. El prototipado evolutivo permitió construir versiones iniciales funcionales y ajustarlas cuando los requisitos se clarificaron, sin necesidad de rediseñar la arquitectura desde cero.

**Verificación temprana del comportamiento.** Tener un sistema ejecutable desde la primera semana de desarrollo permitió detectar incompatibilidades de la plataforma —el problema de los parámetros asíncronos en Next.js App Router (T-01)— antes de que afectaran a múltiples módulos. En un modelo secuencial, estos problemas podrían no haberse descubierto hasta etapas avanzadas.

**Adaptabilidad del equipo reducido.** Para un desarrollador individual, la capacidad de decidir en cada ciclo qué funcionalidad implementar a continuación —sin overhead de planificación formal— fue una ventaja operativa real.

### Limitaciones observadas

**Ausencia de pruebas automatizadas.** El prototipado evolutivo no prescribe mecanismos de verificación específicos, y en este proyecto no se implementaron pruebas automatizadas. Como resultado, algunas correcciones en iteraciones tardías (T-01 a T-05) podrían haberse detectado antes con una suite de pruebas básica.

**Acumulación de mecanismos de compatibilidad.** El mecanismo de respaldo para `psychometric_summary` (T-04) y el doble almacenamiento de decisiones administrativas (D-02) son ejemplos de código que acumula soluciones de compatibilidad que en un ciclo de refactorización posterior deberían simplificarse.

**Dependencia del historial de Git como documentación.** En ausencia de bitácoras de desarrollo o diarios de iteración, el historial de commits es la única evidencia ordenada del proceso. Los mensajes de algunos commits —particularmente `b42b10b` con el mensaje "si"— no aportan información sobre el propósito del cambio, lo que reduce la trazabilidad en esos puntos.

### Adecuación al proyecto

En balance, el prototipado evolutivo fue adecuado para las condiciones reales del proyecto: un desarrollador individual, un alcance de MVP bien definido por el Trabajo A, y un contexto donde los requisitos eran mayoritariamente conocidos pero algunos detalles de implementación solo se clarificaron durante la construcción. El resultado es un sistema funcional que implementa los 18 RF documentados, con un historial verificable que reconstruye el proceso de desarrollo.

---

## 4.10 Conclusiones del capítulo

El Capítulo IV documentó el proceso mediante el cual UCES Plataforma de Talento pasó de ser un conjunto de requisitos formalizados a un sistema de software funcional. El prototipado evolutivo proveyó el marco para organizar ese trayecto en iteraciones identificables, cada una con un conjunto de funcionalidades nuevas y un ciclo de verificación y ajuste.

El análisis del historial de Git permitió reconstruir ocho iteraciones de desarrollo, distribuidas entre diciembre de 2025 y mayo de 2026. Cada iteración produjo software ejecutable que se integraba directamente sobre la versión anterior. Los cinco problemas técnicos documentados en la sección 4.6 ilustran cómo el refinamiento iterativo no se limita a añadir funcionalidades, sino también a corregir incompatibilidades, reforzar la arquitectura de seguridad y resolver problemas de tipos que solo se manifiestan al compilar para producción.

La comprensión de este proceso es el prerequisito para el Capítulo V, donde se describe la implementación técnica de cada módulo del sistema con el nivel de detalle que permite entender las decisiones de código, las diferencias respecto al diseño del Trabajo A y la forma en que los fundamentos del Capítulo III se materializaron en código funcional.
