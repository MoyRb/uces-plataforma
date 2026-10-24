# Capítulo II. Contexto organizacional

---

## 2.1 Descripción general de UCES y su contexto institucional

La Universidad Capital de Estudios Superiores (UCES) es una institución educativa en cuya estructura organizacional el área de Recursos Humanos desempeña funciones relacionadas con la gestión del personal y los procesos de incorporación de colaboradores. Como parte de sus actividades ordinarias, el departamento atiende requerimientos de contratación, organiza los procedimientos necesarios para identificar candidatos y administra las etapas que llevan desde la identificación de una vacante hasta la toma de una decisión de selección.

> **[Evidencia pendiente EV-01]** La adscripción formal del presente proyecto de residencias profesionales a esta institución y al área de Recursos Humanos deberá acreditarse mediante la carta de adscripción institucional correspondiente, cuya obtención se encuentra en proceso. Hasta su incorporación al expediente, la información del contexto institucional proviene de la declaración del desarrollador responsable del proyecto y se presenta con esa atribución.

La información disponible sitúa al área de Recursos Humanos como el ámbito de aplicación de la solución tecnológica desarrollada. Esta área fue identificada por el desarrollador como la principal beneficiaria operativa del sistema, tanto en la gestión de las evaluaciones como en la consulta de los resultados generados. La relación entre la problemática organizacional descrita en las siguientes secciones y las decisiones técnicas adoptadas durante el desarrollo del proyecto tiene su origen en el análisis de las condiciones de trabajo de este departamento.

No se dispone de información institucional formal sobre la misión, la visión, la estructura orgánica completa ni la historia de la institución. Tampoco se cuenta con estadísticas internas sobre el volumen histórico de contrataciones, el número de vacantes gestionadas por periodo o los indicadores de desempeño del área. La descripción que se presenta a continuación se limita, en consecuencia, al proceso de reclutamiento tal como fue caracterizado durante el desarrollo del proyecto, sin extrapolar información que no haya sido declarada o verificada.

---

## 2.2 Función del departamento de Recursos Humanos

Dentro de una organización educativa, el área de Recursos Humanos cumple funciones que van más allá de la administración del personal activo. Una de sus responsabilidades centrales consiste en gestionar los procesos mediante los cuales nuevos colaboradores se identifican, evalúan y eventualmente se incorporan a la institución. Este proceso, conocido comúnmente como reclutamiento y selección, implica una secuencia de actividades que demandan tiempo del personal del área, coordinación con otras dependencias y criterios de evaluación que deben aplicarse de forma razonablemente consistente entre los distintos candidatos.

En el contexto de UCES, el área de Recursos Humanos era la responsable operativa de este proceso en su conjunto. Sus funciones incluían la definición del perfil requerido para cada vacante, la difusión de las convocatorias, la recepción y organización de las postulaciones, la revisión de los perfiles de los candidatos y la conducción de las entrevistas de selección. El resultado esperado de este proceso era identificar, entre los aspirantes que se habían postulado, a aquellos que reunían las condiciones para ocupar el cargo disponible.

La capacidad del área para cumplir estas funciones de manera eficiente está condicionada, entre otros factores, por el volumen de postulaciones recibidas y por los instrumentos disponibles para evaluarlas. Cuando el número de candidatos es reducido y el perfil del puesto es sencillo de verificar mediante el currículum vitae, el proceso manual puede ser suficiente. Sin embargo, cuando las vacantes generan un mayor número de postulantes o cuando los requisitos del puesto incluyen competencias que no se reflejan directamente en el historial declarado, la revisión individual de documentos se vuelve un cuello de botella que puede afectar tanto la velocidad como la consistencia del proceso de selección.

Esta situación no es exclusiva de UCES ni de las instituciones educativas en general. Es un desafío estructural de cualquier proceso de selección que opere sin el apoyo de herramientas de evaluación previas a la entrevista. La particularidad del contexto de este proyecto radica en que el área disponía de un instrumento psicométrico institucional que no había sido integrado al flujo digital y que tampoco existía una plataforma centralizada para gestionar las postulaciones. Ambos elementos representaron oportunidades concretas de mejora que orientaron el diseño del sistema.

---

## 2.3 Procedimiento de reclutamiento previo a la plataforma

El procedimiento de reclutamiento que el área de Recursos Humanos llevaba a cabo antes de la implementación de UCES Plataforma de Talento seguía una secuencia de pasos mayoritariamente manuales, según la descripción proporcionada por el desarrollador del proyecto a partir del análisis del proceso realizado durante la etapa de definición del sistema.

Cuando se identificaba la necesidad de cubrir una vacante, el personal responsable elaboraba la descripción del puesto con sus requisitos y características principales, y difundía la convocatoria a través de los canales de comunicación disponibles en la institución. Los candidatos interesados respondían enviando su currículum vitae por los medios habilitados para ello.

El área de Recursos Humanos recibía los documentos de cada postulante y asumía la tarea de revisarlos. Esta revisión consistía en leer la información declarada por cada aspirante, verificar si su historial correspondía al perfil solicitado y decidir cuáles candidatos serían convocados a la siguiente etapa. El criterio principal disponible en este punto del proceso era el propio currículum vitae: un documento que informa sobre la trayectoria del candidato pero que no permite verificar directamente sus conocimientos actuales ni explorar dimensiones de su perfil que podrían ser relevantes para el desempeño en el puesto.

La siguiente etapa era la entrevista presencial. En este momento el equipo del área establecía contacto directo con los candidatos preseleccionados y realizaba la conversación de evaluación. El problema central identificado en esta estructura consiste en que, hasta este punto del proceso, el área no contaba con información objetiva sobre las competencias concretas de los candidatos. La entrevista absorbía entonces una doble función: conocer a la persona y verificar sus conocimientos o aptitudes, dos objetivos que requieren enfoques distintos y que compiten por el tiempo disponible en una sola sesión.

Esta dinámica generaba una consecuencia práctica frecuente en los procesos de selección sin filtro técnico previo: el personal de Recursos Humanos invertía tiempo en entrevistar a candidatos que, al ser evaluados con mayor detalle, resultaban incompatibles con los requisitos del puesto. No porque la revisión inicial fuera descuidada, sino porque los instrumentos disponibles en esa etapa —fundamentalmente el currículum vitae— no permitían identificar esa incompatibilidad antes del contacto directo.

Un segundo aspecto del proceso que representaba una oportunidad de mejora era la organización y el seguimiento de las postulaciones. Sin un sistema de registro centralizado, el estado de cada candidato —quién había sido contactado, cuál era el resultado preliminar de la revisión, qué observaciones había dejado el evaluador— dependía de los registros propios del personal responsable. Esta situación puede derivar en inconsistencias cuando varias personas participan en el proceso o cuando el seguimiento de múltiples vacantes activas se realiza simultáneamente.

---

## 2.4 Identificación de necesidades y oportunidades de mejora

El análisis del procedimiento anterior permite identificar necesidades concretas que orientaron el diseño de UCES Plataforma de Talento. Estas necesidades no surgen de un diagnóstico formal documentado, sino del análisis funcional del proceso realizado durante la etapa de definición del sistema, y se presentan como la base que justifica las decisiones de diseño adoptadas.

La primera necesidad identificada es contar con un mecanismo de evaluación preliminar que aporte información objetiva antes de la entrevista presencial. Si los candidatos completan una evaluación de conocimientos vinculada a la vacante específica a la que se postulan, el personal de Recursos Humanos recibe datos comparables que complementan el currículum vitae. Esta información permite priorizar a quienes cumplen los requisitos mínimos del puesto, identificar con mayor precisión a los candidatos que ameritan ser convocados a entrevista, y preparar esa conversación con elementos más específicos sobre cada perfil.

La segunda necesidad es la incorporación de la evaluación psicométrica al flujo digital de reclutamiento. El área de Recursos Humanos disponía de un cuestionario institucional basado en dimensiones del modelo de los Cinco Grandes factores de personalidad, proporcionado por personal de la institución. **[EV-06]** *La incorporación de este instrumento al expediente del proyecto requiere obtener el cuestionario original para documentar su procedencia.* Sin embargo, la existencia del instrumento y su uso como parte del proceso de evaluación fue declarado por el desarrollador como información de contexto. Su digitalización y automatización dentro de la plataforma representaba la oportunidad de generar, de forma sistemática, un perfil psicométrico de cada candidato accesible para el evaluador al momento de la revisión.

La tercera necesidad es la centralización del registro y el seguimiento de postulaciones. Un sistema donde cada candidato tiene un perfil registrado, cada postulación tiene un estado actualizable y cada decisión del administrador queda vinculada a un registro específico, reduce la dependencia del seguimiento informal y facilita la consulta del historial del proceso. Esta centralización es particularmente útil cuando el área gestiona varias vacantes simultáneamente o cuando más de una persona del equipo participa en la revisión de los candidatos.

Estas tres necesidades están interrelacionadas. Una evaluación de conocimientos es más útil cuando su resultado aparece junto al perfil psicométrico del mismo candidato y ambos están asociados a la vacante correspondiente. El seguimiento centralizado pierde valor si no hay datos estructurados que registrar. Por esa razón, la propuesta no consistió en digitalizar un instrumento de forma aislada, sino en construir un flujo completo que integrara registro, evaluación y revisión administrativa en una misma plataforma.

---

## 2.5 Participación de los actores institucionales y técnicos

En el desarrollo de UCES Plataforma de Talento intervinieron actores con roles distintos. Identificar la contribución específica de cada uno es importante tanto para la comprensión del proyecto como para distinguir con claridad la información que proviene de declaraciones del desarrollador de aquella que cuenta con respaldo documental.

El área de Recursos Humanos de UCES participó como el ámbito organizacional de referencia del proyecto. La descripción de su proceso de reclutamiento, la identificación de sus necesidades y la definición inicial de los requerimientos funcionales del sistema derivaron de la relación entre el desarrollador y el personal del área durante la etapa de análisis. Adicionalmente, el personal del área proporcionó el cuestionario institucional que sirvió de base para el módulo psicométrico, según declaración del desarrollador. **[EV-01, EV-06]** *La documentación formal de esta participación, incluyendo la carta de adscripción de las residencias y el cuestionario original, se encuentra en proceso de obtención y deberá incorporarse al expediente antes de la defensa del reporte.*

El desarrollador, en su calidad de estudiante de residencias profesionales de Ingeniería en Sistemas Computacionales, participó como responsable técnico del proyecto. Sus funciones comprendieron el análisis de los requerimientos organizacionales, el diseño del modelo de datos, la implementación de todos los módulos del sistema, la configuración del entorno de despliegue y la elaboración del presente reporte. La residencia profesional constituyó el marco institucional bajo el cual se realizó este trabajo.

La asesoría externa al proyecto correspondió al área institucional receptora, que orientó el proceso en los aspectos relacionados con el reclutamiento y los requerimientos funcionales del sistema. La asesoría interna, vinculada al seguimiento académico del proceso de residencias, está a cargo del personal docente del programa. **[EV-01]** *Los datos formales de los asesores —nombres, cargos y firmas— se incorporarán en la página de firmas del documento una vez disponible la carta de adscripción.*

---

## 2.6 Propuesta de transformación del proceso de reclutamiento

UCES Plataforma de Talento propone incorporar etapas digitales de evaluación en el flujo de reclutamiento, antes de la entrevista presencial, de modo que el personal de Recursos Humanos disponga de información organizada sobre cada candidato cuando llegue el momento de revisarlos y tomar decisiones.

La transformación que el sistema introduce en el proceso puede describirse comparando la secuencia anterior con la secuencia propuesta. En el proceso anterior, el flujo era: difundir vacante → recibir currículum → revisar manualmente → entrevistar → decidir. En el proceso propuesto con la plataforma, el flujo se convierte en: publicar vacante en el sistema → candidato se registra y completa psicométrico → candidato se postula → candidato realiza evaluación de conocimientos → administrador revisa resultados estructurados → administrador registra decisión.

El cambio sustantivo no es la eliminación de la entrevista, que permanece como actividad del área de Recursos Humanos, sino la incorporación de dos instrumentos de evaluación —psicométrico y de conocimientos— que generan información estructurada antes de que el evaluador humano intervenga. Cuando el administrador accede al panel de revisión, dispone del resultado de la evaluación de conocimientos del candidato, con sus respuestas individuales y el indicador de aciertos; del archivo de evidencia práctica que el candidato adjuntó; y del resumen psicométrico organizado por rasgo con clasificación.

Esta información no sustituye el juicio del evaluador ni constituye por sí sola una decisión de selección. Su valor consiste en enfocar la atención del personal de Recursos Humanos en los aspectos más relevantes de cada perfil y en permitirle preparar la entrevista con elementos más específicos. Un candidato con buenas respuestas en la evaluación técnica pero con notas bajas en algún rasgo del psicométrico puede merecer una exploración particular en ese aspecto durante la entrevista; un candidato con perfil psicométrico favorable pero con resultados bajos en la evaluación de conocimientos puede requerir aclaraciones sobre su experiencia práctica. La plataforma no interpreta estos datos: los presenta y deja la interpretación al criterio del evaluador.

Es importante precisar que el MVP desarrollado no implementa ningún mecanismo de descarte automático de candidatos basado en su clasificación psicométrica. El requisito vigente en el sistema es que la evaluación psicométrica haya sido completada antes de postularse; el contenido del resultado no condiciona automáticamente el acceso del candidato a las vacantes disponibles. Esta decisión de diseño refleja la postura de que la información psicométrica debe ser un insumo para el juicio profesional, no un filtro automático sin supervisión humana.

---

## 2.7 Alcance organizacional y consideraciones de implementación

El alcance organizacional del sistema se circunscribe al proceso de preselección de candidatos: las etapas que van desde la publicación de la vacante hasta la revisión de los resultados de evaluación y el registro de una decisión preliminar por parte del administrador. Las etapas posteriores del proceso de selección —entrevistas presenciales, verificación de referencias, contratación formal y trámites administrativos asociados— no están contempladas en la plataforma y permanecen como actividades del área de Recursos Humanos.

Esta delimitación tiene implicaciones prácticas. La plataforma no es un sistema de gestión de recursos humanos completo: no administra contratos, no gestiona nóminas, no registra desempeño del personal activo ni integra información de otras áreas de la institución. Es una herramienta específica para el proceso de preselección, construida con el propósito declarado de digitalizar las etapas de evaluación y organizar la información que el área necesita para tomar decisiones informadas antes de la entrevista.

Desde el punto de vista de la implementación organizacional, el funcionamiento efectivo del sistema requiere que se cumplan algunas condiciones que van más allá de la disponibilidad técnica de la plataforma. Los candidatos deben contar con acceso a un dispositivo con conexión a internet para completar su registro y sus evaluaciones. El personal administrativo debe conocer el panel de gestión para crear vacantes, configurar evaluaciones, revisar los intentos enviados y registrar decisiones. La configuración inicial de las evaluaciones —preguntas, opciones de respuesta, tiempo límite— debe realizarse por el administrador antes de que la vacante esté disponible para los postulantes.

Ninguno de estos requerimientos es inusual en el contexto de una institución educativa con infraestructura tecnológica básica, pero su cumplimiento es una condición necesaria para la operación del sistema. Adicionalmente, la transición de un proceso manual a un proceso con apoyo digital requiere un periodo de adaptación. Las primeras operaciones del sistema con usuarios reales generarán aprendizajes sobre aspectos que no son evidentes en la fase de desarrollo: la claridad de las instrucciones para los candidatos, la usabilidad del panel de administración en condiciones de uso real, la pertinencia de las preguntas configuradas para cada vacante.

Una consideración adicional relevante tiene que ver con los datos gestionados por el sistema. La plataforma registra información de identidad, respuestas a evaluaciones y perfiles psicométricos de los candidatos. El tratamiento responsable de esta información exige que el área institucional establezca criterios claros sobre su uso, los periodos de retención de los datos y las condiciones de acceso por parte del personal. Desde el punto de vista técnico, el sistema implementa controles de acceso y mecanismos de seguridad apropiados para el alcance del MVP; sin embargo, la definición de las políticas institucionales de gestión de datos personales es una responsabilidad que corresponde al área receptora, no al sistema mismo.

---

## 2.8 Conclusiones del capítulo

El análisis del contexto organizacional de UCES revela un proceso de reclutamiento con una estructura funcional que operaba sin herramientas digitales de evaluación previas a la entrevista. Las consecuencias de esta estructura —tiempo invertido en entrevistar candidatos sin información previa sobre sus competencias y seguimiento informal del estado de las postulaciones— configuraron las necesidades concretas que orientaron el diseño del sistema.

Las tres necesidades identificadas en la sección 2.4 —evaluación de conocimientos preliminar, evaluación psicométrica integrada al flujo digital, y centralización del registro de postulaciones— tienen una correspondencia directa con los módulos implementados en UCES Plataforma de Talento. El módulo de evaluación con temporizador responde a la primera necesidad; el módulo psicométrico responde a la segunda; la estructura de postulaciones, intentos y panel administrativo responde a la tercera. Esta correspondencia no es casual: refleja que las decisiones de diseño del sistema partieron de un análisis del proceso que se buscaba apoyar, no de una selección arbitraria de funcionalidades.

La propuesta de transformación descrita en la sección 2.6 no elimina la función del evaluador humano ni pretende que la tecnología tome decisiones de selección. Introduce etapas de evaluación estructurada que generan información útil y comparable para quien finalmente emite la decisión. Este posicionamiento es coherente con el alcance declarado del MVP y con las limitaciones reconocidas del instrumento psicométrico utilizado, cuyas propiedades formales no han sido documentadas.

Los capítulos siguientes describirán las tecnologías empleadas para construir esta solución, las decisiones de diseño adoptadas en el proceso de análisis y la implementación técnica de cada uno de los módulos que componen el sistema. La comprensión del contexto organizacional presentado en este capítulo es el punto de referencia desde el cual esas decisiones técnicas adquieren su sentido.
