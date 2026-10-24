# Capítulo VII. Conclusiones, discusión y trabajo futuro

---

## 7.1 Síntesis del proyecto

UCES Plataforma de Talento es una aplicación web de tipo MVP que digitaliza el proceso de reclutamiento y preselección de candidatos del área de Recursos Humanos de la Universidad Capital de Estudios Superiores. El sistema fue construido sobre el stack Next.js 16.1.1 con App Router y TypeScript, utilizando Supabase como servicio de backend administrado para la base de datos PostgreSQL, la autenticación mediante JSON Web Tokens y el almacenamiento de archivos. La interfaz de usuario se desarrolló con Tailwind CSS y la biblioteca de componentes shadcn/ui.

El alcance implementado comprende seis módulos funcionales: registro de candidatos con protección criptográfica de la identidad mediante HMAC-SHA256, evaluación psicométrica basada en el modelo de los Cinco Grandes factores de personalidad, catálogo de módulos y vacantes con control de visibilidad, postulación con verificación de prerrequisito, evaluación de conocimientos con temporizador y carga de evidencia práctica, y panel administrativo con capacidades de gestión, revisión y toma de decisiones. Cada módulo está respaldado por políticas de Row Level Security en la base de datos y la verificación de autorización en los endpoints de la API.

El desarrollo se realizó en ocho iteraciones identificables en el historial del repositorio, desde la configuración del andamiaje inicial en diciembre de 2025 hasta los ajustes finales de mayo de 2026. El resultado es un sistema desplegado en producción mediante Vercel, con la infraestructura de datos en el proyecto Supabase denominado UcesCap.

---

## 7.2 Evaluación del objetivo general

El objetivo general del proyecto establecía el desarrollo de una plataforma web funcional que centralizara y digitalizara las actividades del proceso de reclutamiento de UCES, con módulos de registro, evaluación psicométrica, evaluación de conocimientos con temporizador, carga de evidencia práctica y revisión administrativa, todo ello protegido por mecanismos de autenticación, autorización por roles y seguridad a nivel de base de datos.

Al término del proceso de desarrollo y verificación, este objetivo puede declararse **cumplido en sus componentes esenciales**, con dos matices documentados que no afectan la funcionalidad principal del sistema.

Los cinco módulos funcionales indicados en el objetivo están presentes y fueron verificados empíricamente durante la sesión de ejecución del Capítulo VI. El módulo de registro fue probado exitosamente (CP-01, evidencia EV-6B-01). El módulo psicométrico fue ejecutado de forma completa con 20 ítems, scoring automático y resumen por rasgo persistido en la base de datos (CP-14, evidencias EV-6B-06 y EV-6B-07). La evaluación de conocimientos con temporizador y la carga de evidencia funcionaron correctamente en sus flujos principales (CP-10 y CP-12). El panel administrativo procesó solicitudes reales de gestión, revisión y decisión con resultados correctos (CP-15 a CP-21). Los mecanismos de autenticación y autorización operaron conforme a lo especificado: los accesos no autorizados fueron rechazados con los códigos HTTP correspondientes en todos los casos de prueba de seguridad (CP-03, CP-22).

Los dos matices mencionados corresponden a defectos de implementación de severidad baja y media documentados como incidencias INC-6B-01 e INC-6B-02. En el primer caso, el guardado de respuestas con UPSERT falla al intentar cambiar una opción ya registrada, debido a la ausencia del parámetro `onConflict` en la llamada a la biblioteca del cliente Supabase. La primera respuesta queda guardada y el flujo principal no se interrumpe. En el segundo caso, la función `upsertReview` no logra insertar en la tabla `reviews` por una discrepancia entre las columnas que el código intenta escribir y las columnas que el schema define, por lo que la decisión administrativa se persiste en la tabla de respaldo `attempts.decision`. El flujo de negocio opera correctamente; la auditoría de revisiones es incompleta. Ambos defectos tienen corrección técnica conocida y de complejidad baja, documentada en el Capítulo VI y en las recomendaciones de trabajo futuro.

---

## 7.3 Evaluación de los objetivos específicos

La verificación de cada objetivo específico se apoya en la matriz de cumplimiento desarrollada en el documento de referencia `07-matriz-cumplimiento-objetivos.md`. A continuación se presenta el resumen:

| ID | Objetivo específico | Nivel de cumplimiento |
|---|---|---|
| OE-01 | Modelo de datos relacional con RLS en 13 tablas | Cumplido |
| OE-02 | Módulo de registro con CURP criptográfica (HMAC-SHA256) | Cumplido |
| OE-03 | Módulo psicométrico Big Five con scoring automático | Cumplido |
| OE-04 | Evaluación con temporizador, envío automático y evidencia | Cumplido con matices |
| OE-05 | Panel administrativo con CRUD y revisión | Cumplido con matices |
| OE-06 | Control de acceso con roles, JWT y RLS | Cumplido |
| OE-07 | Despliegue en Vercel con infraestructura Supabase | Cumplido |

Los cinco objetivos marcados como "Cumplido" sin calificación presentan evidencia directa y sin observaciones en los casos de prueba correspondientes. Los dos objetivos marcados como "Cumplido con matices" corresponden a las incidencias INC-6B-01 y INC-6B-02 descritas en la sección anterior. Ningún objetivo fue incumplido.

### OE-03 — Nota sobre el instrumento psicométrico

El módulo psicométrico cumple el objetivo en términos de implementación técnica: los veinte reactivos se presentan con escala Likert de cinco niveles, el scoring por rasgo se calcula automáticamente al enviar, y el resumen queda almacenado como dato estructurado en la base de datos para consulta administrativa. Sin embargo, el objetivo no incluía la validación formal del instrumento. El cuestionario empleado fue proporcionado por personal de la institución; sus propiedades psicométricas —consistencia interna, estructura factorial, baremación— no fueron documentadas ni verificadas durante el desarrollo. Los umbrales de clasificación (≥16 Alta, 11 a 15 Adecuada, <11 Riesgo) corresponden a criterios institucionales internos. Esta limitación es inherente al alcance del proyecto y está declarada explícitamente en el Capítulo I; su tratamiento formal constituye una línea de trabajo futuro relevante.

---

## 7.4 Resultados de la implementación

### 7.4.1 Cobertura de requisitos funcionales

El análisis de trazabilidad documentado en el Capítulo V identificó dieciocho requisitos funcionales en el Trabajo A de referencia (Arciniega Robles, 2026). Al término del desarrollo, los dieciocho requisitos tienen cobertura en el código del sistema, distribuidos de la siguiente manera:

- **Catorce requisitos implementados sin discrepancia:** RF-01 a RF-06, RF-08, RF-09, RF-10, RF-12, RF-13, RF-14, RF-15 y RF-16. El comportamiento del sistema es consistente con la especificación del Trabajo A en todos estos casos.
- **Cuatro requisitos implementados con discrepancia documentada:** RF-07 (D-01), RF-11 y RF-18 (D-02), y RF-17 (D-03). Las discrepancias están descritas con detalle en §5.12 del Capítulo V y verificadas empíricamente en el Capítulo VI.

### 7.4.2 Funcionalidades emergentes

Durante la implementación se desarrollaron cinco funcionalidades que superan la especificación del Trabajo A:

- **FE-01** — Rollback transaccional en el registro de candidatos: si la creación del perfil o la asignación de rol falla tras crear al usuario en Supabase Auth, el proceso de registro se deshace manualmente para evitar usuarios huérfanos en el sistema de autenticación.
- **FE-02** — Creación automática de assessment al crear una vacante: el endpoint de creación de vacantes crea simultáneamente un registro en la tabla `assessments` vinculado a la vacante, con rollback si la segunda operación falla.
- **FE-03** — Reutilización de intento existente al postularse: si el candidato intenta postularse a una vacante a la que ya se postuló, el sistema retorna el intento existente en lugar de crear un duplicado, garantizando idempotencia.
- **FE-04** — Envío automático al expirar el temporizador: cuando el temporizador llega a cero en la interfaz de evaluación, el intento se envía automáticamente sin intervención del candidato, con la marca `timedOutBeforeSubmit: true` en el resumen persistido.
- **FE-05** — Detección de cambio de pestaña mediante `localStorage`: el sistema detecta cuando el candidato abandona la pestaña de evaluación y registra el evento en el estado local del navegador.

### 7.4.3 Discrepancias entre el diseño y la implementación

Se identificaron cinco discrepancias entre el diseño del Trabajo A y el comportamiento implementado en el MVP. Todas están documentadas en el Capítulo V y verificadas en el Capítulo VI:

- **D-01** — El guard de postulación verifica únicamente que el psicométrico haya sido *completado*, sin evaluar la clasificación obtenida (Alta, Adecuada o Riesgo). Un candidato con clasificación "Riesgo" puede postularse si ha enviado el cuestionario. Esta discrepancia fue confirmada por inspección de código (EE-08) y verificada empíricamente (CP-07 y CP-08).
- **D-02** — Las decisiones administrativas se almacenan en `attempts.decision` como registro efectivo, en lugar de la tabla `reviews` que el diseño designaba como almacén primario. La causa raíz es una discrepancia entre las columnas que el código intenta escribir y las que el schema define (INC-6B-02). La decisión queda persistida correctamente, aunque en la tabla de respaldo.
- **D-03** — El endpoint de estadísticas por vacante (`GET /api/admin/vacancies/[id]/stats`) devuelve únicamente dos métricas (conteo de postulaciones e intentos), en lugar de las métricas completas del diseño original. El endpoint funciona pero no está integrado en ninguna vista del panel. Confirmado empíricamente en CP-18.
- **D-04** — El rol `reviewer` está definido en el esquema de la base de datos, pero la función `resolveRole("reviewer")` retorna `"user"`, lo que lo hace inoperativo en la lógica de negocio. Confirmado estáticamente (EE-05).
- **D-05** — La lista de exclusión de candidatos descrita en el diseño original no tiene implementación; la tabla correspondiente no existe en el schema. Confirmado por inspección del schema SQL.

Las cinco discrepancias fueron presentadas al jurado académico como diferencias entre el diseño de referencia y el MVP entregado, no como defectos no conocidos. Su documentación sistemática es parte del valor técnico del proceso de validación realizado.

---

## 7.5 Resultados de las pruebas

### 7.5.1 Plan de pruebas

El Capítulo VI diseñó un plan de 22 casos de prueba distribuidos en seis grupos: acceso y autenticación (A), panel del candidato (B), evaluación psicométrica (C), postulación y evaluación de conocimientos (D), panel administrativo (E) y seguridad (F). Los casos cubrieron los 18 requisitos funcionales, las cinco discrepancias y las cinco funcionalidades emergentes.

### 7.5.2 Ejecución

Las pruebas se ejecutaron en dos etapas. La primera etapa (Corte 6A) consistió en nueve verificaciones estáticas sobre el código fuente sin servidor activo: compilación TypeScript sin errores, análisis ESLint, conteo de rutas de la API, verificación de lógica de cálculo psicométrico, comprobación de la función `resolveRole`, conteo de requisitos funcionales y verificación de las rutas de control de acceso. Todas las verificaciones estáticas pasaron o fueron documentadas correctamente.

La segunda etapa (Corte 6B, sesión 6B-S1) ejecutó los 22 casos de prueba en un entorno activo compuesto por el servidor de desarrollo Next.js en localhost:3000 y el proyecto Supabase remoto. Las pruebas se realizaron mediante herramientas de línea de comandos (curl) y scripts Node.js que utilizaron directamente el cliente `@supabase/supabase-js`, lo que permitió documentar las respuestas completas de cada endpoint como evidencias textuales.

### 7.5.3 Resultados

El conteo definitivo, conciliado en el documento `07-conciliacion-pruebas.md`, es el siguiente:

| Estado | Cantidad | Porcentaje | Casos |
|---|---|---|---|
| APROBADO | 16 | 72.7 % | CP-01..03, CP-07..09, CP-12..19, CP-21..22 |
| APROBADO PARCIAL | 2 | 9.1 % | CP-10 (INC-6B-01), CP-20 (INC-6B-02) |
| PARCIAL (sin endpoint REST) | 3 | 13.6 % | CP-04, CP-05, CP-06 |
| BLOQUEADO | 1 | 4.5 % | CP-11 |
| FALLIDO | 0 | 0 % | — |
| **Total** | **22** | **100 %** | |

Los tres casos marcados como PARCIAL (CP-04, CP-05 y CP-06) corresponden a funcionalidades implementadas mediante acceso directo desde componentes React a la base de datos, sin un endpoint REST dedicado. Este es un patrón arquitectónico válido en Next.js App Router con Server Components. La ausencia de endpoint REST no implica que la funcionalidad no exista; implica que la prueba mediante llamada HTTP directa no es el método de verificación apropiado. El estado de los datos fue confirmado mediante consultas directas a la base de datos.

El caso bloqueado (CP-11, envío automático al expirar) requería esperar la expiración natural de un intento, configurado con un mínimo de 35 minutos en el entorno de prueba. No fue posible ejecutarlo en la sesión disponible. La lógica de envío automático está verificada estáticamente en el componente `evaluacion/[attemptId]/cliente.tsx` y constituye la única funcionalidad del plan no probada empíricamente.

### 7.5.4 Incidencias detectadas

Dos incidencias funcionales se detectaron durante la ejecución y fueron documentadas en el Capítulo VI:

- **INC-6B-01** (severidad baja): El UPSERT de respuestas falla al intentar cambiar una opción ya registrada. El impacto es que el candidato no puede corregir una respuesta enviada; la primera respuesta queda guardada y el proceso de evaluación continúa sin interrupciones.
- **INC-6B-02** (severidad media): La función `upsertReview` no logra escribir en la tabla `reviews` por incompatibilidad entre las columnas que el código intenta utilizar y las que el schema define. El sistema cae al fallback y persiste la decisión en `attempts.decision`. La decisión se guarda correctamente; la trazabilidad de revisiones por tabla dedicada queda incompleta.

Ninguna de las incidencias constituye un fallo crítico que impida el uso del sistema. El flujo principal de reclutamiento —registro, evaluación psicométrica, postulación, evaluación de conocimientos y decisión administrativa— opera de forma continua.

---

## 7.6 Limitaciones

El presente trabajo tiene las siguientes limitaciones, algunas de ellas declaradas desde el alcance inicial y otras identificadas durante el proceso de validación:

**Limitaciones de alcance del MVP.** El sistema no implementa notificaciones automáticas al candidato, filtro de postulación por clasificación psicométrica, gestión de tareas prácticas desde el panel administrativo, ni la operación del rol `reviewer`. Estas funcionalidades fueron identificadas como fuera del alcance del MVP desde la etapa de diseño y están documentadas en el Capítulo I.

**Limitación de las pruebas.** La verificación funcional se realizó mediante respuestas de API (evidencias textuales), sin capturas de pantalla de la interfaz de usuario. Las 53 capturas de interfaz requeridas por el plan de evidencias del Capítulo V permanecen pendientes, ya que su obtención requiere un navegador web interactivo en sesión activa. Para propósitos académicos, las evidencias textuales de respuestas HTTP cubren los mismos requisitos funcionales y son verificables de forma reproducible.

**Ausencia de pruebas automatizadas.** El repositorio no incluye un framework de pruebas automatizadas. La ausencia de pruebas unitarias y de integración automatizadas impide verificar de forma sistemática que modificaciones futuras no introduzcan regresiones. Esto es una limitación operativa relevante para la evolución del sistema.

**Protección de rutas del lado del cliente.** La redirección de usuarios no autenticados se maneja mediante verificación en el cliente (hooks de React), no mediante un archivo `middleware.ts` de Next.js en el servidor. La seguridad efectiva de los datos no se ve comprometida porque las políticas RLS y la verificación de JWT en los endpoints de la API son mecanismos independientes de la navegación en el cliente.

**Validación formal del instrumento psicométrico.** El cuestionario de veinte reactivos empleado en el módulo psicométrico fue proporcionado por personal de la institución. No se realizó un proceso de validación con análisis de consistencia interna ni verificación factorial. Los resultados del módulo deben interpretarse como indicadores orientativos, siempre en el contexto de un proceso de selección más amplio conducido por personal especializado.

**Medición cuantitativa del impacto.** No se dispone de indicadores cuantitativos del proceso de reclutamiento anterior a la plataforma (tiempo promedio por candidato, número de entrevistas por vacante, tasa de conversión). En consecuencia, no es posible comparar métricas de eficiencia antes y después de la implementación del sistema. Esta ausencia no invalida los resultados técnicos del proyecto; refleja la naturaleza del alcance definido como MVP técnico.

---

## 7.7 Competencias profesionales desarrolladas

El desarrollo de UCES Plataforma de Talento requirió la aplicación de competencias propias de la ingeniería en sistemas computacionales en varios niveles de abstracción:

**Análisis y diseño de sistemas.** La construcción del modelo entidad-relación de trece tablas con restricciones de integridad referencial, la definición de políticas de Row Level Security por tabla y la arquitectura de los flujos de negocio implicaron la aplicación de principios de diseño de bases de datos relacionales y de análisis de requerimientos. La identificación de discrepancias entre el diseño de referencia y la implementación real —y su documentación sistemática— es un ejercicio de trazabilidad de requisitos aplicado en condiciones reales.

**Desarrollo de software.** La implementación en TypeScript sobre Next.js App Router involucró el manejo de componentes del servidor y del cliente, la tipificación estática de datos provenientes de la API de Supabase, el diseño de endpoints REST con manejo de errores estructurado, y la integración de múltiples servicios externos bajo una arquitectura coherente. El historial de ocho iteraciones en el repositorio documenta el proceso de construcción incremental y los ajustes realizados para resolver problemas de compatibilidad de tipos, errores de construcción en producción y comportamientos inesperados de la API de Supabase.

**Seguridad informática aplicada.** La implementación de HMAC-SHA256 para la protección de la CURP, el diseño del sistema de autenticación con JWT, la configuración de políticas RLS en la base de datos y la generación de URLs firmadas para el acceso temporal a archivos privados son aplicaciones directas de principios de seguridad web que van más allá de la configuración superficial de frameworks.

**Documentación técnica.** La elaboración de un reporte de residencias de aproximadamente 150 páginas que incluye análisis de requisitos, diseño de arquitectura, descripción de implementación módulo por módulo, plan de pruebas con 22 casos, ejecución documentada con evidencias y análisis de resultados con trazabilidad completa desarrolla la competencia de comunicación técnica estructurada, indispensable en el ejercicio profesional de la ingeniería de software.

**Gestión de incertidumbre técnica.** La detección de las incidencias INC-6B-01 e INC-6B-02 durante la ejecución de las pruebas, su análisis de causa raíz hasta el nivel de la llamada específica a la biblioteca del cliente Supabase, y la formulación de correcciones técnicas precisas demuestran la capacidad de diagnosticar comportamientos inesperados en sistemas con múltiples capas de abstracción.

---

## 7.8 Trabajo futuro

Las recomendaciones que se presentan a continuación están clasificadas por prioridad, conforme al análisis detallado en el documento de referencia `07-recomendaciones-priorizadas.md`. La clasificación considera el impacto sobre la operación del sistema y la complejidad técnica estimada para su implementación.

### 7.8.1 Correcciones de prioridad inmediata (P1)

Cuatro mejoras pueden aplicarse con bajo esfuerzo y tienen impacto directo sobre la calidad del sistema:

La corrección del UPSERT de respuestas (INC-6B-01) requiere agregar el parámetro `onConflict: "attempt_id,question_id"` a la llamada `.upsert()` en `app/api/attempts/[attemptId]/answers/route.ts`. Este cambio de una línea resuelve el defecto que impide al candidato modificar una respuesta ya registrada.

La corrección de `upsertReview` (INC-6B-02) requiere agregar un intento de escritura con la columna `comments` sin el campo `updated_at` en el flujo de reintentos de la función. Con esta modificación, las decisiones administrativas quedarán persistidas en la tabla `reviews` conforme al diseño original, en lugar de usar el fallback en `attempts.decision`.

La implementación de un archivo `middleware.ts` de Next.js para la protección de rutas en el servidor eliminaría la dependencia de la redirección del lado del cliente y reforzaría la postura de seguridad del sistema sin requerir cambios en las políticas RLS existentes.

La eliminación del import no utilizado `LayoutDashboard` en `app/admin/page.tsx` resuelve la advertencia del linter documentada en el Corte 6A.

### 7.8.2 Funcionalidades de diseño pendientes (P2)

Cuatro funcionalidades del diseño original no se implementaron en el MVP y constituyen la extensión natural del sistema:

El **filtro de postulación por clasificación psicométrica** (D-01) permitiría condicionar la postulación a vacantes según el resultado del instrumento. Su implementación requiere una decisión institucional sobre qué rasgos funcionan como filtros de contratación y con qué umbrales, además de una modificación en `apply/route.ts` para incorporar la verificación.

La **operacionalización del rol `reviewer`** (D-04) permitiría asignar a personal de recursos humanos la capacidad de revisar evaluaciones sin necesidad de otorgar privilegios administrativos completos. Implica modificar `resolveRole()`, crear endpoints con nivel de acceso intermedio y definir políticas RLS adicionales.

La **lista de exclusión de candidatos** (D-05) requiere la creación de una tabla con hashes de CURP de candidatos excluidos y la verificación correspondiente en el flujo de postulación.

La **integración de la vista de estadísticas por vacante** (D-03) aprovecharía el endpoint ya implementado (`GET /api/admin/vacancies/[id]/stats`) para presentar métricas de conversión al administrador, posiblemente con datos adicionales sobre distribución de puntajes y tiempos de respuesta.

### 7.8.3 Extensiones de mediano plazo (P3)

Cuatro extensiones adicionales representan mejoras de mayor alcance que requieren mayor inversión técnica:

La **incorporación de un framework de pruebas automatizadas** (Playwright para pruebas E2E, Vitest para unitarias de los módulos `lib/`) es la inversión que mayor impacto tendría sobre la mantenibilidad del sistema a largo plazo. Sin pruebas automatizadas, cada modificación al código requiere verificación manual de los flujos principales.

El desarrollo de un **módulo de notificaciones automáticas por correo electrónico** mejoraría la experiencia del candidato al comunicar cambios de estado en su proceso sin requerir que acceda activamente a la plataforma.

La **validación psicométrica formal del instrumento de veinte ítems** aportaría respaldo metodológico a los resultados del módulo psicométrico y permitiría a la institución utilizar los datos del sistema con mayor rigor en sus decisiones de selección.

La **implementación del CRUD de tareas prácticas** en el panel administrativo completaría la gestión de la tabla `practical_tasks`, actualmente configurada solo mediante SQL directo.

---

## 7.9 Reflexión final

El desarrollo de UCES Plataforma de Talento permitió construir, desplegar y verificar un sistema de software con requisitos reales, un usuario institucional identificado y un proceso de evaluación técnica documentado. El resultado es un MVP funcional que cubre la totalidad de los dieciocho requisitos funcionales del Trabajo A de referencia, implementa cinco funcionalidades que superan la especificación original, y registra con transparencia las discrepancias identificadas entre el diseño y la realidad del sistema construido.

La experiencia técnica más significativa del proyecto no fue la construcción de las funcionalidades, sino el proceso de verificación. La ejecución de veintidós casos de prueba contra un sistema en producción real —con herramientas de línea de comandos, scripts de automatización y consultas directas a la base de datos— puso de manifiesto comportamientos inesperados que no eran visibles desde la lectura del código: una tabla `reviews` con un schema que no coincide con las columnas que el código intenta escribir, un UPSERT que falla ante la reenvío de respuestas por no especificar el constraint de conflicto. Estos hallazgos tienen corrección técnica conocida y de baja complejidad; su valor está en ilustrar que la verificación empírica y la inspección estática son actividades complementarias, no intercambiables.

El proyecto también dejó claro el peso de las decisiones arquitectónicas tempranas. La elección de Supabase como plataforma unificada de datos, autenticación y almacenamiento simplificó la infraestructura operativa y concentró la complejidad en el diseño de las políticas de acceso, que resultó ser la dimensión más minuciosa del desarrollo. La elección de TypeScript y el App Router de Next.js permitió construir un sistema con tipos verificados estáticamente y un modelo de renderizado híbrido que separa con claridad las responsabilidades del servidor y del cliente.

El sistema entregado no es perfecto. Es funcional, verificado, documentado y extensible. Esas cuatro características, en el contexto de un proyecto de residencias profesionales con tiempo y recursos acotados, representan el resultado apropiado para el alcance definido. El trabajo futuro identificado en este capítulo constituye la hoja de ruta para convertir el MVP en un sistema de producción más robusto, siempre que la institución decida continuar con su desarrollo.
