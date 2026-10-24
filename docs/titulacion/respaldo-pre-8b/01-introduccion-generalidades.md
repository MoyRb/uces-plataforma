# Capítulo I. Introducción y generalidades del proyecto

---

## 1.1 Antecedentes del proyecto

El reclutamiento y la selección de personal son actividades que inciden directamente en la calidad del trabajo dentro de cualquier organización. La capacidad de identificar candidatos adecuados para una vacante, evaluar sus competencias de manera estructurada y tomar decisiones de preselección con información organizada no es un problema exclusivo de las grandes empresas: también se presenta en instituciones educativas, organismos públicos y organizaciones de tamaño mediano que deben gestionar procesos de incorporación de personal de forma periódica.

En la Universidad Capital de Estudios Superiores (UCES), el proceso de reclutamiento del área de Recursos Humanos se desarrollaba mediante actividades principalmente manuales. Cuando surgía la necesidad de cubrir una vacante, el personal responsable elaboraba y difundía la convocatoria a través de los canales de comunicación disponibles. Los candidatos interesados enviaban su currículum vitae, y el área asumía entonces la tarea de recibirlo, revisar la información de cada aspirante y determinar quiénes serían convocados a entrevista.

Una de las dificultades más concretas de este procedimiento era la ausencia de una etapa de evaluación estructurada previa a la entrevista presencial. Sin un filtro técnico o de perfil, parte del tiempo del personal se destinaba a entrevistar candidatos que resultaban incompatibles con los requisitos de la vacante. A medida que el número de postulaciones aumentaba para un mismo cargo, la revisión individual de documentos se convertía también en una carga administrativa de gestión difícil sin herramientas específicas.

Ante esta situación surgió la propuesta de desarrollar una plataforma web que incorporara evaluaciones estructuradas como parte del flujo de reclutamiento, antes de la entrevista presencial. El planteamiento contemplaba cuatro componentes fundamentales: la publicación de vacantes organizadas por área funcional, el registro de candidatos con verificación de identidad, la aplicación de una evaluación psicométrica preliminar, y la realización de evaluaciones de conocimientos específicos vinculadas a cada vacante. El propósito era proporcionar al personal de Recursos Humanos información organizada y comparables sobre los candidatos, de forma que la entrevista pudiera concentrarse en los aspectos que los instrumentos digitales no permiten evaluar.

El proyecto se denominó UCES Plataforma de Talento y se desarrolló en el contexto de las residencias profesionales de la carrera de Ingeniería en Sistemas Computacionales. Desde su concepción fue definido como un MVP, sigla del término inglés *Minimum Viable Product*, que describe una versión funcional de un sistema que implementa los flujos esenciales sin pretender abarcar la totalidad de funcionalidades posibles. Esta delimitación fue deliberada: facilitó concentrar los esfuerzos de diseño e implementación en construir una base técnica sólida, funcional y extensible, en lugar de abordar un alcance excesivo que comprometiera la calidad del producto entregable.

El desarrollo implicó aplicar conocimientos de análisis de sistemas, diseño de bases de datos relacionales, desarrollo web con tecnologías modernas, autenticación y autorización, seguridad informática y administración de servicios en la nube. La naturaleza técnica del proyecto se sitúa, por tanto, en la intersección entre la ingeniería de software y la gestión de procesos organizacionales.

---

## 1.2 Descripción general del sistema

UCES Plataforma de Talento es una aplicación web orientada a apoyar el proceso de reclutamiento y preselección de candidatos mediante la digitalización de sus actividades principales. El sistema permite a los candidatos registrarse, completar una evaluación psicométrica, explorar vacantes disponibles, postularse a una de ellas, realizar la evaluación de conocimientos correspondiente con un temporizador activo y cargar un archivo de evidencia práctica. Por su parte, el administrador gestiona el catálogo de módulos, vacantes, evaluaciones y preguntas; revisa los intentos enviados por los candidatos; consulta el resumen psicométrico de cada postulante, y emite una decisión de aprobación o rechazo con notas opcionales. El historial de cada proceso queda disponible para el candidato en su perfil dentro de la plataforma.

El sistema está construido sobre un stack tecnológico moderno del ecosistema JavaScript. El frontend y las rutas de API se implementaron con Next.js 16.1.1, haciendo uso del App Router que permite combinar componentes del servidor (Server Components) con componentes del cliente (Client Components) según los requerimientos de cada vista. El lenguaje de programación elegido fue TypeScript, cuyo sistema de tipos estáticos permite detectar errores antes de la ejecución y documentar explícitamente las estructuras de datos que circulan por la aplicación. La interfaz de usuario se construyó con Tailwind CSS y la biblioteca de componentes shadcn/ui, que provee elementos accesibles y estilizados basados en Radix UI.

La persistencia de datos, la autenticación y el almacenamiento de archivos se delegan a Supabase, un servicio de tipo Backend como Servicio (BaaS) que proporciona una instancia administrada de PostgreSQL, un servicio de autenticación mediante JSON Web Tokens (JWT) y un sistema de almacenamiento de objetos con control de acceso por políticas. Esta arquitectura elimina la necesidad de administrar infraestructura de servidor propia, y traslada responsabilidades operativas —copias de seguridad, escalabilidad de la base de datos, renovación de certificados TLS— al proveedor del servicio.

La seguridad del sistema opera en capas diferenciadas. A nivel de base de datos, PostgreSQL tiene habilitado el mecanismo de Row Level Security (RLS) en todas las tablas de la aplicación, con políticas que garantizan que cada usuario autenticado solo pueda acceder a sus propios registros. A nivel de API, todos los endpoints del área administrativa requieren la presentación de un token JWT válido y la verificación de que el usuario tiene el rol `admin` mediante la función de base de datos `get_my_role()`, invocada a través del mecanismo de llamada a procedimientos remotos (RPC) de Supabase. La información de identidad de los candidatos se protege adicionalmente mediante criptografía: la CURP no se almacena en texto claro, sino que se transforma con HMAC-SHA256 usando una clave de entorno antes de persistirse en la base de datos.

El módulo de evaluación psicométrica utiliza un cuestionario de veinte reactivos organizado con base en las dimensiones del modelo de los Cinco Grandes factores de personalidad. Los reactivos emplean una escala de respuesta tipo Likert de cinco niveles y están agrupados en cinco rasgos: estabilidad emocional, amabilidad, responsabilidad, apertura y extroversión. El instrumento fue proporcionado por personal de la institución y digitalizado en el sistema; sus propiedades psicométricas formales no fueron documentadas durante el desarrollo del proyecto. El sistema calcula automáticamente un resumen de resultados por rasgo al concluir la evaluación y lo almacena como dato estructurado para consulta del administrador.

La aplicación se desplegó en Vercel, plataforma con soporte nativo para proyectos Next.js, que gestiona la construcción, el despliegue continuo desde el repositorio y la administración de variables de entorno para el entorno de producción. Los datos del proyecto residen en el proyecto Supabase identificado como UcesCap.

---

## 1.3 Objetivo general

Desarrollar una plataforma web funcional que centralice y digitalice las actividades del proceso de reclutamiento y preselección de candidatos del área de Recursos Humanos de UCES, mediante la implementación de módulos de registro de candidatos, evaluación psicométrica, evaluación de conocimientos con temporizador, carga de evidencia práctica y revisión administrativa de resultados, con mecanismos de autenticación, autorización por roles y seguridad a nivel de base de datos.

---

## 1.4 Objetivos específicos

**OE-01.** Diseñar un modelo de datos relacional en PostgreSQL que soporte los flujos de registro de usuarios, gestión de vacantes, aplicación de evaluaciones y almacenamiento de resultados, con restricciones de integridad referencial y políticas de Row Level Security que garanticen el acceso diferenciado según el rol del usuario.

**OE-02.** Implementar un módulo de registro que valide el formato de la CURP mediante expresión regular, almacene únicamente su representación criptográfica mediante HMAC-SHA256 y garantice la unicidad de cada candidato en el sistema mediante restricción de clave única en la tabla de hashes.

**OE-03.** Desarrollar el módulo de evaluación psicométrica que permita presentar el cuestionario institucional basado en el modelo Big Five, registrar las respuestas con escala Likert, calcular automáticamente los scores por rasgo y generar un resumen estructurado persistente disponible para revisión administrativa.

**OE-04.** Construir el módulo de evaluación de conocimientos con temporizador regresivo configurable, guardado automático de respuestas por selección, envío automático al expirar el tiempo sin posibilidad de doble envío, carga de archivo de evidencia práctica hacia almacenamiento privado en la nube y procesamiento del intento al momento del envío.

**OE-05.** Implementar el panel administrativo con operaciones CRUD sobre módulos, vacantes, evaluaciones y preguntas, así como las funciones de revisión de intentos individuales, consulta del resumen psicométrico, acceso a evidencia mediante URLs firmadas y registro de decisiones de aprobación o rechazo.

**OE-06.** Aplicar un modelo de control de acceso con dos roles operativos diferenciados —usuario y administrador— respaldado por políticas RLS en la base de datos y verificación de JWT en los endpoints de la API, de forma que las operaciones privilegiadas no puedan ejecutarse sin autenticación y autorización verificadas en el servidor.

**OE-07.** Desplegar el sistema en un entorno accesible públicamente mediante Vercel, con las variables de entorno sensibles correctamente configuradas en la plataforma y la infraestructura de Supabase vinculada al proyecto.

---

## 1.5 Justificación

El problema que motiva el desarrollo de este proyecto no es ajeno al funcionamiento de la mayoría de las organizaciones: los procesos de selección de personal son costosos en tiempo cuando carecen de una etapa de filtrado preliminar. Recibir currículum vitae, revisar su contenido manualmente y convocar a entrevista sin información previa sobre las competencias del candidato implica que la entrevista carga con una responsabilidad diagnóstica que podría haberse reducido con antelación.

La literatura de gestión de recursos humanos documenta extensamente la utilidad de las evaluaciones estructuradas en los procesos de selección. Una evaluación de conocimientos permite verificar, antes de la entrevista, que el candidato posee los fundamentos técnicos o conceptuales requeridos para la vacante. Una evaluación psicométrica puede aportar indicadores sobre dimensiones de personalidad que tienen correlatos con el desempeño en determinados contextos laborales, aunque la interpretación de estos resultados siempre debe realizarse con criterio profesional y en conjunto con otros elementos del proceso. Estas herramientas no eliminan la entrevista ni sustituyen la valoración del personal especializado; la complementan con información que de otro modo sería difícil de obtener de forma estandarizada para cada candidato.

Desde la perspectiva del desarrollo de software, el proyecto tiene un valor técnico concreto e independiente de sus resultados operativos en producción. El sistema implementa decisiones de ingeniería no triviales: el diseño de un modelo relacional de trece tablas con control de acceso a nivel de fila, la arquitectura de un módulo de evaluación con restricciones de tiempo e idempotencia ante envíos duplicados, la integración del almacenamiento de archivos con políticas de acceso granular, y la construcción de una capa de seguridad de API que verifica identidad y rol sin depender de la interfaz de usuario. Cada uno de estos componentes requirió decisiones de diseño justificadas, iteraciones de depuración documentadas en el historial del repositorio, y la integración coherente de tecnologías distintas bajo una arquitectura unificada.

El carácter de MVP del proyecto es, además, una elección técnica justificable. Construir un sistema de reclutamiento completo —con notificaciones automáticas, analítica avanzada, soporte multiinstrumento psicométrico y gestión documental— habría excedido los recursos y el tiempo disponibles en el contexto de las residencias profesionales, además de comprometer la profundidad con que podrían tratarse los aspectos centrales del sistema. La delimitación deliberada del alcance permitió entregar un producto funcional, evaluable y extensible, que cumple el propósito de digitalizar el flujo principal del proceso.

Es necesario delimitar también lo que este proyecto no pretende demostrar. No se dispone de indicadores cuantitativos sobre el proceso de reclutamiento anterior que permitan medir el impacto de la plataforma en términos de tiempo ahorrado o candidatos procesados. El sistema se presenta como un MVP funcional validado técnicamente; su evaluación en condiciones de operación institucional sostenida constituye una actividad posterior que depende de las decisiones del área de Recursos Humanos.

---

## 1.6 Alcance y limitaciones del proyecto

### Funcionalidades dentro del alcance

**Módulo de registro y autenticación.** El sistema permite el registro de nuevos candidatos con validación del formato de CURP mediante expresión regular, almacenamiento de su representación criptográfica con HMAC-SHA256 y garantía de unicidad entre registros. La autenticación de sesión se gestiona mediante Supabase Auth con tokens JWT. El sistema protege el registro contra duplicados por CURP sin almacenar el dato en texto claro.

**Módulo de evaluación psicométrica.** El candidato completa un cuestionario de veinte reactivos basado en el modelo Big Five antes de poder postularse a cualquier vacante. El sistema calcula y almacena automáticamente el resumen de resultados por rasgo al momento del envío. La evaluación es obligatoria como requisito previo a la postulación y tiene un tiempo límite de diez minutos.

**Módulo del candidato.** Incluye la exploración de módulos y vacantes, la postulación a vacantes abiertas, la realización de la evaluación de conocimientos con temporizador, la carga de evidencia práctica hacia almacenamiento privado y la consulta del historial de intentos y decisiones en el perfil.

**Panel administrativo.** El administrador dispone de operaciones CRUD sobre módulos, vacantes, evaluaciones y preguntas. Puede revisar los intentos enviados, consultar las respuestas individuales, el archivo de evidencia descargable y el resumen psicométrico de cada candidato, y registrar una decisión de aprobación o rechazo con notas opcionales.

**Infraestructura de seguridad.** Row Level Security habilitado en todas las tablas de la base de datos. Verificación de JWT y confirmación de rol mediante RPC en todos los endpoints del área administrativa. Almacenamiento privado de archivos con URLs firmadas de acceso temporal de una hora.

**Despliegue.** La aplicación está configurada para desplegarse en Vercel con gestión de variables de entorno en la plataforma y la base de datos administrada por Supabase.

### Funcionalidades fuera del alcance del MVP

**Restricción de postulación por clasificación psicométrica.** El endpoint `POST /api/vacancies/[id]/apply` verifica únicamente que el psicométrico haya sido completado; no evalúa la clasificación obtenida (Alta, Adecuada o Riesgo) para condicionar el acceso a la postulación. La implementación de un bloqueo automático basado en el resultado del instrumento se identifica como trabajo futuro.

**Interfaz administrativa para tareas prácticas.** La tabla `practical_tasks` está definida en el modelo de datos y las evaluaciones de prueba incluyen ejemplos funcionales, pero no existe un formulario en el panel administrativo para administrar estas tareas. Su configuración requiere intervención directa en la base de datos mediante SQL.

**Rol de revisor.** El esquema original contempló un tercer rol (`reviewer`) para usuarios que pudieran revisar evaluaciones sin privilegios administrativos completos. Este rol no está implementado operativamente; las funciones de revisión están asociadas exclusivamente al rol de administrador.

**Módulo de estadísticas en la interfaz.** El sistema incluye un endpoint funcional `GET /api/admin/vacancies/[id]/stats` que retorna el conteo de postulaciones e intentos por vacante, pero no existe una vista en el panel que consuma estos datos. Su integración se propone como trabajo futuro.

**Middleware de protección de rutas en el servidor.** El proyecto no incluye un archivo `middleware.ts` de Next.js. La redirección de usuarios no autenticados se maneja mediante verificación del lado del cliente. La seguridad efectiva de los datos recae en las políticas RLS y la verificación de JWT en los endpoints de la API, que son mecanismos independientes de la navegación del cliente y no se ven afectados por esta limitación.

**Notificaciones automáticas.** El sistema no envía correos electrónicos ni genera notificaciones en tiempo real. Los cambios en el estado de un intento son consultables por el candidato en su perfil; la detección de actualizaciones nuevas se implementa mediante comparación con el estado almacenado localmente en el navegador.

**Validación psicométrica formal.** El instrumento utilizado fue proporcionado por personal de la institución. La procedencia exacta del cuestionario, las condiciones de su elaboración y las propiedades psicométricas de la adaptación específica empleada no fueron documentadas formalmente durante el desarrollo del proyecto. Los umbrales de clasificación (≥16 Alta, 11-15 Adecuada, <11 Riesgo) corresponden a criterios institucionales y no derivan de un proceso de validación psicométrica publicado.

---

## 1.7 Organización del documento

El presente reporte documenta el proceso completo de análisis, diseño, desarrollo y evaluación de UCES Plataforma de Talento. Se organiza en siete capítulos que avanzan del contexto institucional hacia los detalles técnicos de la implementación y concluyen con una reflexión sobre los resultados obtenidos.

El **Capítulo II** describe el contexto organizacional del proyecto: la institución receptora de las residencias, el área de adscripción, la problemática identificada en el proceso de reclutamiento y los requerimientos generales que orientaron el desarrollo.

El **Capítulo III** desarrolla el marco teórico. Aborda el modelo de renderizado híbrido de Next.js, el paradigma de Backend como Servicio representado por Supabase, el sistema de autenticación con JWT, el mecanismo de Row Level Security en PostgreSQL, el control de tipos con TypeScript, el modelo de componentes de interfaz con shadcn/ui y Radix UI, los fundamentos de seguridad web aplicados al proyecto, y los conceptos del modelo Big Five de personalidad que sustentan el módulo psicométrico.

El **Capítulo IV** presenta el análisis y diseño del sistema. Incluye la descripción de la metodología de desarrollo empleada, el análisis de requerimientos funcionales y no funcionales, los diagramas de casos de uso, el modelo entidad-relación completo con sus trece tablas, el diseño de la arquitectura de componentes, el diseño de seguridad y el diseño del módulo psicométrico.

El **Capítulo V** documenta el desarrollo del sistema módulo por módulo: configuración del entorno, base de datos y migraciones, módulo de autenticación, módulo del candidato, módulo de evaluación, módulo psicométrico, panel administrativo e integración con el almacenamiento. Cada sección referencia los archivos del repositorio relevantes, cita fragmentos de código representativos y explica las decisiones de diseño adoptadas durante la construcción.

El **Capítulo VI** registra las pruebas realizadas sobre el sistema. Documenta la estrategia de verificación, los resultados del checklist de extremo a extremo definido en el repositorio, los casos de prueba por módulo, la verificación de las restricciones de seguridad y las incidencias técnicas resueltas durante el desarrollo.

El **Capítulo VII** presenta las conclusiones del proyecto: el análisis del cumplimiento de los objetivos específicos, las competencias adquiridas durante las residencias, las limitaciones del MVP actual y las recomendaciones para etapas futuras del sistema.

El documento cierra con la sección de **Referencias bibliográficas** y los **Anexos**, que incluyen el esquema completo de la base de datos, el listado de endpoints de la API con descripción, los reactivos del cuestionario psicométrico, el manual de configuración y despliegue, un resumen de capturas de pantalla del sistema y el historial de commits relevantes del repositorio.
