# Respuestas de aclaraciones técnicas e institucionales

**Proyecto:** Desarrollo e implementación de una plataforma web para la gestión de reclutamiento y evaluación de candidatos en UCES.
**Tipo de documento:** Respuestas para la elaboración del reporte de residencias profesionales.
**Fecha de elaboración:** Octubre de 2026.

---

# I. Contexto institucional y problemática

## P-01. Área o departamento donde se desarrolló el proyecto

El proyecto UCES Plataforma de Talento se desarrolló tomando como principal área de referencia al departamento de Recursos Humanos (RH) de la institución educativa UCES.

Esta área constituye uno de los componentes fundamentales dentro de la administración institucional, debido a su responsabilidad en los procedimientos relacionados con la identificación, evaluación y selección de candidatos para cubrir necesidades de personal.

Durante el análisis del proceso de reclutamiento se identificó una oportunidad de mejora relacionada con la manera en que se recibían, organizaban y evaluaban las solicitudes de los aspirantes.

En respuesta a esta necesidad, se planteó el desarrollo de una plataforma web capaz de centralizar diferentes actividades del proceso de selección, desde la publicación de vacantes hasta la evaluación de conocimientos y el seguimiento de los candidatos.

Desde una perspectiva técnica, el proyecto implicó aplicar conocimientos de análisis de sistemas, desarrollo web, diseño de bases de datos, autenticación, seguridad informática y administración de servicios en la nube.

El área de Recursos Humanos se consideró el principal beneficiario operativo de la solución, mientras que el desarrollo tecnológico se orientó a proporcionar una herramienta que facilitara la gestión y consulta de información.

## P-02. Existencia de documentación formal del proyecto

Durante el desarrollo tecnológico se establecieron los objetivos funcionales y las características generales que debía cumplir la plataforma, tomando como referencia las necesidades identificadas en el proceso de reclutamiento.

La documentación institucional formal de la iniciativa se encuentra en proceso de elaboración por parte del equipo involucrado.

Para efectos del reporte de residencias profesionales, se preparará un documento preliminar de definición del proyecto que permita organizar los antecedentes, la problemática, los objetivos, los alcances y los entregables previstos.

Este documento servirá como base de trabajo para su posterior revisión por los responsables institucionales y los asesores académicos correspondientes.

Debe distinguirse entre la documentación técnica generada durante el desarrollo y la aprobación institucional formal, la cual deberá acreditarse con los documentos correspondientes.

## P-03. Estado de implementación y utilización del sistema

UCES Plataforma de Talento alcanzó un estado funcional en el que se integraron los principales componentes necesarios para realizar el recorrido de reclutamiento y evaluación de candidatos.

La solución contempla el registro de usuarios, la aplicación de una evaluación psicométrica, la consulta de vacantes, la postulación, la realización de evaluaciones y la revisión de resultados por parte del administrador.

Asimismo, se preparó una versión desplegable mediante Vercel y una infraestructura de persistencia de datos gestionada mediante Supabase.

El proyecto se encuentra en una etapa inicial de operación y validación funcional. Para documentar formalmente su utilización institucional será necesario incorporar evidencias del despliegue, registros de actividad y, cuando corresponda, confirmación del área de Recursos Humanos.

Dado que el sistema fue concebido como una solución de alcance progresivo, su evaluación inicial se centró en comprobar que los principales procesos pudieran realizarse correctamente.

No se dispone todavía de información consolidada para establecer indicadores de uso, cantidad de candidatos atendidos o mejoras cuantitativas en los tiempos de reclutamiento.

## P-04. Proceso manual de reclutamiento anterior

Antes del planteamiento de UCES Plataforma de Talento, el procedimiento de reclutamiento se desarrollaba mediante actividades principalmente manuales.

Cuando se identificaba la necesidad de cubrir una vacante, el personal responsable elaboraba y difundía una publicación a través de los canales de comunicación disponibles.

Los interesados enviaban su currículum vitae para participar en el proceso. Posteriormente, el área responsable debía recibir los documentos, revisar la información de los candidatos y organizar las entrevistas correspondientes.

Una de las principales dificultades de este procedimiento era la ausencia de un mecanismo de evaluación preliminar que permitiera identificar, antes de la entrevista, qué aspirantes reunían determinados conocimientos o requisitos relacionados con la vacante.

En consecuencia, parte del tiempo del personal se destinaba a entrevistar candidatos que posteriormente podían resultar incompatibles con las necesidades del puesto.

La revisión individual de documentos también representaba una carga administrativa, especialmente cuando se recibían varias postulaciones para una misma vacante.

Ante esta situación surgió la propuesta de desarrollar una plataforma que permitiera incorporar evaluaciones estructuradas antes de la entrevista presencial.

El propósito fue facilitar la identificación de candidatos que cumplieran los requisitos establecidos y proporcionar al personal de Recursos Humanos información organizada para apoyar sus decisiones.

Es importante precisar que la plataforma no reemplaza la valoración profesional realizada durante la entrevista, sino que incorpora una etapa tecnológica de apoyo a la preselección.

---

# II. Decisiones de arquitectura y desarrollo

## P-05. Metodología de análisis y diseño

El desarrollo de UCES Plataforma de Talento contempló una fase inicial de análisis y diseño, seguida de un proceso de construcción y adaptación progresiva.

Durante la etapa de análisis se identificaron las principales necesidades relacionadas con la gestión de vacantes, el registro de usuarios, las evaluaciones y el seguimiento de postulaciones.

A partir de estos requerimientos se estableció una estructura funcional inicial y se determinaron las tecnologías necesarias para construir la solución.

Sin embargo, el proyecto no se desarrolló bajo un modelo completamente rígido o secuencial.

Conforme avanzó la implementación, surgieron nuevas necesidades funcionales y técnicas que hicieron necesario modificar componentes, ampliar determinadas características y ajustar decisiones de diseño.

Este comportamiento corresponde a un enfoque de desarrollo incremental, en el cual el sistema evoluciona mediante la construcción y revisión continua de funcionalidades.

La combinación de una planificación inicial con ajustes durante la implementación permitió conservar una dirección general del proyecto sin limitar la capacidad de responder a nuevas necesidades.

Por esta razón, el reporte describirá un proceso de desarrollo incremental e iterativo, sin atribuir ceremonias formales de Scrum que no cuenten con documentación comprobable.

## P-06. Justificación de la función get_my_role()

La función `get_my_role()` constituye un mecanismo de consulta centralizada del rol de los usuarios autenticados.

Durante la evolución de la estructura de datos se incorporó la tabla `user_roles`, destinada a concentrar la información de autorización asociada a cada cuenta.

Sin embargo, las versiones anteriores del esquema utilizaban el atributo `role` de la tabla `profiles`.

Para conservar la compatibilidad con esta estructura previa se diseñó una estrategia de consulta alternativa o fallback.

El procedimiento consulta inicialmente la tabla `user_roles`. Cuando no encuentra un registro asociado al usuario, revisa el rol almacenado en `profiles`.

Esta decisión permite mantener compatibilidad entre versiones del modelo de datos y reducir el riesgo de que los usuarios previamente registrados pierdan inesperadamente su identificación funcional después de una modificación del esquema.

Desde una perspectiva de ingeniería, este mecanismo representa una estrategia de transición que facilita la evolución progresiva de los datos.

No obstante, la compatibilidad debe conservar reglas claras de autorización y no debe interpretarse como un sustituto de las políticas de seguridad de la base de datos.

## P-07. Identificador fijo del instrumento psicométrico

Durante el diseño del módulo de evaluación psicométrica se incorporó un identificador único predefinido para localizar el instrumento base dentro de la estructura de evaluaciones.

Esta solución permite que los distintos componentes de la aplicación hagan referencia al mismo instrumento sin depender de una búsqueda por nombre, la cual podría verse afectada por cambios en las denominaciones de los registros.

El identificador funciona como una referencia estable dentro del modelo de datos y simplifica la asociación entre el módulo psicométrico y sus registros correspondientes.

Para el alcance del MVP, esta estrategia resultó suficiente al contemplarse un instrumento principal de evaluación.

Como consideración de escalabilidad, una evolución posterior podría incorporar una tabla de configuración que permitiera administrar varios instrumentos de manera dinámica, sin requerir referencias fijas dentro del código.

Esta explicación describe la función técnica del identificador en la implementación actual; no constituye evidencia de que existiera una justificación formal documentada al momento de su creación.

## P-08. Función de la tabla reviews

La tabla `reviews` forma parte del diseño de persistencia relacionado con los procesos de revisión administrativa de las evaluaciones.

Inicialmente, esta estructura permitía almacenar información como el identificador del revisor, la decisión emitida, los comentarios y los datos de una posible rúbrica de evaluación.

Posteriormente, el modelo incorporó los campos `decision` y `reviewer_notes` directamente en la tabla `attempts`.

Esta modificación permitió asociar determinados resultados de revisión con el intento de evaluación correspondiente y facilitar su consulta desde los componentes actuales.

La tabla `reviews` se conserva como un mecanismo alternativo de compatibilidad dentro de la estructura de datos.

Además, su diseño ofrece posibilidades para una evolución futura hacia un historial más detallado de revisiones, en el cual se pudieran registrar múltiples evaluaciones administrativas sobre un mismo intento.

No obstante, para el alcance actual es importante diferenciar las funcionalidades efectivamente utilizadas de las posibilidades que ofrece la estructura de datos.

## P-09. Ausencia de middleware en Next.js

El sistema se desarrolló sin incorporar un archivo de middleware global como mecanismo principal de protección de rutas.

En su lugar, se utilizaron mecanismos de autenticación mediante Supabase Auth y validación de permisos asociados a los roles establecidos en la aplicación.

La arquitectura de autorización contempla el uso de Row Level Security (RLS) en PostgreSQL, con el propósito de restringir determinadas operaciones sobre los registros según la identidad y los permisos del usuario.

En la interfaz, los componentes relacionados con las áreas administrativas también realizan comprobaciones del estado de autenticación y del rol correspondiente.

Esta organización permitió concentrar parte importante de la seguridad de los datos en la base de datos y desarrollar una experiencia de navegación acorde con el tipo de usuario.

Sin embargo, es necesario distinguir la protección visual o de navegación del control de autorización efectivo.

Las validaciones realizadas únicamente en el navegador no constituyen una barrera de seguridad suficiente. Las operaciones privilegiadas también deben comprobar la identidad y los permisos del solicitante en el servidor y en las políticas de acceso a datos.

Por ello, la ausencia de middleware debe explicarse como una decisión de estructura de la aplicación, no como una superioridad de seguridad.

Una mejora posterior consistirá en fortalecer la verificación del acceso a rutas y endpoints administrativos desde el lado del servidor, manteniendo RLS como una capa adicional de protección.

---

# III. Evaluación psicométrica

## P-10. Procedencia del cuestionario Mini Big Five

El instrumento utilizado como base para la evaluación psicométrica fue proporcionado al equipo de desarrollo por Ale Fraga, integrante del personal responsable de UCES.

A partir de este material se realizó su incorporación al sistema digital, organizando los reactivos dentro de una estructura que permitiera mostrar las preguntas, registrar respuestas y procesar resultados.

El módulo fue diseñado para presentar veinte reactivos con una escala de respuesta de tipo Likert.

La implementación tecnológica permitió trasladar un procedimiento basado en un cuestionario a una experiencia de evaluación digital integrada con el proceso de reclutamiento.

Desde el punto de vista académico, es necesario aclarar que la fuente exacta y las propiedades psicométricas del instrumento deben verificarse con la documentación original proporcionada por la institución.

Por lo tanto, el reporte describirá el instrumento como un cuestionario institucional basado en dimensiones del modelo de los Cinco Grandes factores de personalidad, sin atribuirle validación científica específica hasta disponer de la referencia correspondiente.

La contribución tecnológica del proyecto consistió en su digitalización, integración y procesamiento dentro del sistema de evaluación.

## P-11. Definición de los umbrales de clasificación

Los criterios utilizados para interpretar las puntuaciones del cuestionario fueron establecidos a partir de los lineamientos proporcionados por la institución.

La implementación contempla tres categorías de interpretación:

- **Alta:** puntuación igual o superior a 16.
- **Adecuada:** puntuación entre 11 y 15.
- **Riesgo:** puntuación inferior a 11.

Estas categorías permiten organizar los resultados de acuerdo con los criterios configurados para el instrumento.

Es importante precisar que dichos umbrales corresponden a criterios institucionales de interpretación y no deben presentarse automáticamente como puntos de corte derivados de una validación psicométrica publicada.

En términos de desarrollo de software, el sistema procesa las respuestas y aplica reglas definidas para generar una clasificación interpretable por el personal responsable.

La validación de estos criterios para decisiones de selección constituye una actividad distinta de la implementación informática y requiere revisión especializada.

En consecuencia, el reporte distinguirá el funcionamiento del algoritmo de clasificación de la validez científica o predictiva del instrumento.

## P-12. Efecto de los resultados psicométricos

El módulo psicométrico fue integrado como un componente de evaluación preliminar dentro del proceso de postulación.

A partir de las respuestas proporcionadas por el candidato, el sistema calcula un resultado siguiendo las reglas definidas para el instrumento.

De acuerdo con los criterios establecidos para el flujo de trabajo, el resultado puede utilizarse para identificar una condición de no aptitud respecto de una vacante determinada.

El comportamiento previsto contempla impedir una nueva postulación a esa misma vacante cuando exista una condición restrictiva asociada al resultado o decisión correspondiente.

Dicho comportamiento debe comprobarse en el código y mediante pruebas funcionales antes de describirlo como una restricción plenamente implementada.

La finalidad operativa es evitar postulaciones repetidas que no cumplan los criterios configurados y facilitar el seguimiento del proceso por parte del personal administrativo.

Sin embargo, por tratarse de información vinculada con características personales, es recomendable mantener supervisión humana, criterios transparentes y procedimientos de revisión.

No se debe presentar la puntuación psicométrica como una medida definitiva de aptitud profesional sin evidencia suficiente que respalde ese uso.

---

# IV. Alcance funcional y evolución del sistema

## P-13. Configuración de tareas prácticas

El sistema contempla una estructura de datos denominada `practical_tasks`, destinada a almacenar actividades prácticas asociadas a determinadas evaluaciones.

Estas actividades permiten complementar los reactivos teóricos mediante instrucciones que requieren la elaboración o presentación de evidencias.

En el alcance actual, la configuración de las tareas prácticas se realiza mediante la administración directa de los registros correspondientes en Supabase.

Esta estrategia permite definir las instrucciones, las características esperadas y los criterios disponibles en el modelo de datos sin incorporar un módulo adicional de administración visual.

La decisión respondió al alcance funcional establecido para el MVP y permitió priorizar los flujos esenciales de registro, postulación y evaluación.

Como trabajo futuro se propone desarrollar una interfaz administrativa que permita crear, modificar y desactivar tareas prácticas sin necesidad de intervenir directamente en la base de datos.

## P-14. Existencia del rol reviewer

En la estructura inicial de perfiles se contempló la posibilidad de manejar un rol adicional denominado `reviewer`.

Este rol permitiría distinguir entre los usuarios responsables de la administración general del sistema y aquellos dedicados específicamente a revisar evaluaciones.

Sin embargo, durante la delimitación funcional del MVP se consolidó un modelo de dos roles principales: administrador y usuario.

Las actividades de revisión quedaron asociadas a las capacidades administrativas.

El valor `reviewer` permanece como un elemento heredado de una versión anterior del esquema y no corresponde a un perfil operativo implementado dentro del sistema actual.

Para una futura expansión podría evaluarse la incorporación de un rol especializado que permita distribuir responsabilidades, evitando otorgar privilegios administrativos completos a quienes solamente deban revisar resultados.

## P-15. Finalidad del endpoint de estadísticas de vacantes

El endpoint `GET /api/admin/vacancies/[id]/stats` constituye una base técnica para recuperar información estadística relacionada con una vacante.

Su finalidad dentro de una evolución del sistema sería permitir al personal administrativo consultar indicadores de seguimiento sin realizar consultas manuales sobre los registros de postulaciones.

Entre las métricas que podría presentar se encuentran:

- Número total de postulaciones por vacante.
- Cantidad de candidatos con evaluaciones iniciadas y finalizadas.
- Distribución de resultados de evaluación.
- Cantidad de postulaciones aprobadas y rechazadas.
- Evolución temporal de las postulaciones.
- Relación entre candidatos registrados y evaluaciones completadas.

Esta funcionalidad permitiría construir un tablero de indicadores para Recursos Humanos, facilitando el seguimiento de vacantes y la identificación de puntos del proceso que requieren atención.

En la implementación revisada, el endpoint existe, pero no se encuentra integrado con una vista gráfica del panel administrativo.

Por tanto, el reporte lo presentará como una capacidad técnica parcialmente integrada y propondrá su incorporación a un módulo de analítica administrativa como trabajo futuro.

---

# V. Despliegue y gestión de configuración

## P-16. Plataforma de despliegue

Para la publicación de UCES Plataforma de Talento se seleccionó Vercel como plataforma de alojamiento y ejecución de la aplicación web.

La elección de esta tecnología permite aprovechar su compatibilidad con Next.js y sus capacidades de construcción, despliegue y administración de aplicaciones modernas.

El proyecto se encuentra asociado al entorno de Vercel utilizado por el desarrollador, identificado como `MoyRb`.

La persistencia de información y los servicios relacionados con autenticación y almacenamiento de archivos se gestionan de manera independiente mediante Supabase.

Esta distribución responde a una arquitectura basada en servicios administrados, en la cual la aplicación web y la infraestructura de datos mantienen responsabilidades diferenciadas.

Para el documento definitivo se incorporarán evidencias del despliegue realizado, el dominio público, la fecha de publicación y las comprobaciones de funcionamiento correspondientes.

El despliegue en una plataforma pública no implica, por sí mismo, que exista adopción institucional demostrada ni tráfico de usuarios reales; ambos aspectos deben documentarse por separado.

## P-17. Administración de variables de entorno

Durante el desarrollo se utilizó el archivo `.env.local` para almacenar valores de configuración necesarios para establecer la comunicación con Supabase y ejecutar determinadas funciones del servidor.

Entre las variables utilizadas se encuentran la URL del proyecto de Supabase, las claves de acceso correspondientes y el secreto empleado en el procesamiento criptográfico relacionado con la CURP.

Esta estrategia permite separar información de configuración del código fuente, reduciendo la necesidad de incorporar directamente credenciales en los archivos del proyecto.

La información sensible debe mantenerse fuera del repositorio público y utilizarse únicamente en los contextos donde resulte necesaria.

En un entorno de despliegue, las variables correspondientes deben configurarse mediante los mecanismos de administración de secretos proporcionados por la plataforma.

En particular, las claves privadas de Supabase y los secretos criptográficos no deben exponerse mediante variables accesibles desde el navegador.

Como parte de las medidas de mantenimiento se considera importante conservar la confidencialidad de las credenciales, establecer procedimientos de rotación y evitar su publicación accidental.

---

# VI. Pruebas, validación y depuración

## P-18. Ejecución del checklist de pruebas

Durante el proceso de desarrollo se utilizó un conjunto de verificaciones funcionales orientadas a comprobar el comportamiento de los principales módulos de la aplicación.

El repositorio incluye una lista de comprobaciones de extremo a extremo que contempla operaciones administrativas y acciones realizadas por usuarios candidatos.

Entre los escenarios considerados se encuentran el acceso al sistema, la gestión de módulos y vacantes, la postulación, la realización de evaluaciones, el registro de evidencias y la consulta de resultados.

Estas actividades formaron parte de la revisión informal del funcionamiento del MVP.

Sin embargo, no se dispone actualmente de un expediente completo que registre para cada ejecución la fecha, la versión probada, las condiciones de prueba, los resultados observados y las evidencias asociadas.

Por este motivo, el reporte distinguirá las comprobaciones realizadas durante el desarrollo de una campaña formal de pruebas de software.

Como complemento, se elaborará una matriz de casos de prueba reproducibles que permita validar nuevamente el sistema y documentar los resultados de manera estructurada.

## P-19. Pruebas con usuarios de la institución

El proceso de validación del proyecto contempló la revisión del funcionamiento de los módulos desarrollados y su correspondencia con las necesidades del proceso de reclutamiento institucional.

De acuerdo con la información proporcionada por el desarrollador, se realizaron pruebas con usuarios vinculados con UCES.

No obstante, actualmente no se cuenta con un registro consolidado que permita determinar el número de participantes, las fechas de ejecución, los escenarios probados y los resultados individuales.

Para que estas actividades puedan presentarse formalmente como pruebas de aceptación de usuario será necesario recuperar o generar evidencia verificable.

El reporte podrá documentar la experiencia de validación informada por el desarrollador como antecedente del proyecto, diferenciándola de los resultados comprobados mediante nuevas pruebas estructuradas.

La ausencia de incidencias reportadas durante una demostración no equivale necesariamente a una validación exhaustiva del sistema.

Por ello, se recomienda complementar esta experiencia con pruebas documentadas del flujo administrativo y del flujo de candidatos.

## P-20. Incidencias técnicas y actividades de depuración

Durante el desarrollo de UCES Plataforma de Talento se presentaron situaciones técnicas relacionadas con la integración de componentes, el tipado de datos y la evolución de la estructura de persistencia.

El historial del repositorio permite identificar ajustes relacionados con TypeScript, reglas de acceso a datos, funciones de autorización y modificaciones en determinadas columnas del modelo relacional.

Estas situaciones son representativas de los desafíos que surgen cuando una aplicación evoluciona de manera incremental y diferentes componentes deben conservar compatibilidad.

Entre los aspectos que requieren especial atención se encuentran la correspondencia entre las estructuras de datos y los tipos utilizados por la aplicación, la correcta aplicación de las políticas RLS y la sincronización de los cambios del esquema de base de datos.

La resolución de estas situaciones implicó revisar la relación entre los componentes afectados y realizar ajustes sobre la implementación.

Para el reporte se seleccionarán incidencias respaldadas por commits, cambios de código o registros técnicos, y se documentará para cada una el problema observado, su causa identificada, la modificación realizada y el resultado verificable.

Cuando el historial no permita determinar fechas o secuencias exactas, se presentará el análisis técnico sin construir una cronología ficticia.

---

# VII. Consideraciones finales para la redacción

Las respuestas anteriores constituyen una base narrativa para desarrollar los capítulos de contexto institucional, análisis, diseño, implementación, pruebas y conclusiones.

El documento deberá utilizar una redacción académica natural, consistente con el trabajo de un estudiante de ingeniería que participó directamente en la construcción del sistema.

Las explicaciones técnicas deben conservar precisión conceptual, relacionar las decisiones con las necesidades del proyecto y reconocer las limitaciones existentes.

Los resultados de implementación deberán estar respaldados por el repositorio, mientras que las afirmaciones sobre operación institucional, usuarios reales, pruebas de aceptación y efectividad del proceso requerirán evidencia adicional.

El objetivo es presentar un trabajo profesional que permita comprender no solamente qué funcionalidades contiene UCES Plataforma de Talento, sino también cómo fueron construidas, qué necesidades buscan resolver y qué conocimientos de ingeniería fueron necesarios para desarrollarlas.
