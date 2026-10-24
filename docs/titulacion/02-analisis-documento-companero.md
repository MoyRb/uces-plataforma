# Análisis del documento de análisis y diseño — Trabajo A

**Título del documento:** Análisis y Diseño de un Sistema Web de Reclutamiento de Personal para la Universidad Capital de Estudios Superiores
**Autor:** Arciniega Robles Francisco Daniel
**Institución:** Instituto Tecnológico de Estudios Superiores de Zamora
**Modalidad:** Proyecto innovador — Ingeniería en Sistemas Computacionales
**Asesor:** Francisco Rodríguez Díaz
**Fecha del documento:** Zamora, Michoacán, diciembre 2026
**Extensión:** 114 páginas
**Elaborado por:** Auditoría documental — Trabajo B (desarrollo)

---

## 1. Datos institucionales confirmados

El documento del compañero revela información institucional precisa que no estaba disponible en las respuestas del desarrollador ni en el repositorio:

| Dato | Valor confirmado |
|---|---|
| Nombre completo de la institución | Universidad Capital de Estudios Superiores |
| Sigla | UCES |
| Ubicación | Zamora, Michoacán, México |
| Área receptora | Recursos Humanos |
| Responsable del área (en el proceso previo) | Una persona que concentraba todas las actividades |
| Origen del proyecto | Solicitud directa de la responsable de RH al autor de Trabajo A |

**Implicación para el Trabajo B:** Los capítulos I y II ya redactados refieren a "UCES" sin definir el acrónimo. Deben actualizarse para incluir el nombre completo "Universidad Capital de Estudios Superiores" en la primera mención de cada capítulo. El marcador `[EV-01]` puede reducirse en intensidad: el compañero documenta formalmente la institución con tabla de áreas académicas y fuente atribuida a RH.

---

## 2. Estructura del documento

El documento se organiza en cuatro capítulos principales y secciones complementarias:

| Sección | Contenido | Páginas estimadas |
|---|---|---|
| Resumen | Síntesis del proyecto, metodología y resultado | 1 |
| Introducción general | Propósito, estructura del documento | 2 |
| Cap. I — Generalidades | Institución, antecedentes, problema, objetivos, justificación, hipótesis, alcance | 6 |
| Cap. II — Marco teórico | Reclutamiento, sistemas de información, aplicaciones web, metodologías, análisis/diseño, UML, BD, UX, seguridad | ~14 |
| Cap. III — Desarrollo | Metodología (prototipado evolutivo), factibilidad, IEEE 1362, IEEE 830 (18 RF, 7 RNF, 12 RN), 14 CU, modelos UML, arquitectura, 15 interfaces, 9 salidas, Big Five labels, 13 tablas con diccionario, matriz de trazabilidad | ~64 |
| Cap. IV — Resultados | Sistema definido, resultados por OE, verificación de hipótesis (I-1 cumplido, I-2/I-3 pendientes) | ~4 |
| Conclusiones generales | Resumen del trabajo | 2 |
| Trabajo futuro | 11 propuestas | 1 |
| Competencias desarrolladas | 8 competencias | 1 |
| Fuentes de información | Referencias en APA | 4 |
| Glosario | 22 términos | 2 |
| Anexo A | Necesidades iniciales vs. alcance documentado | 1 |
| Anexo B | Cuestionario de satisfacción para RH (10 ítems Likert) | 1 |

---

## 3. Contenido del proceso previo (fuente verificada)

La sección 1.2 del documento describe el proceso anterior con más detalle que las respuestas del desarrollador (P-04):

- Vacantes publicadas en **Facebook y otras redes sociales**
- Candidatos contactaban por **teléfono** o acudían presencialmente
- Se entregaba el currículum y se realizaba una entrevista breve
- La revisión recaía en **una sola persona** del área de RH que atendía otras responsabilidades
- En ocasiones esa persona consultaba la opinión de alguien más
- Los datos de cada candidatura se conservaban en **archivos y mensajes dispersos**

La Tabla 2 del compañero identifica cinco necesidades del proceso previo:

| Situación identificada | Necesidad resultante |
|---|---|
| Difusión y contacto por redes, llamadas y visitas | Catálogo consultable en línea |
| Información en archivos y mensajes | Relacionar persona, vacante, evaluación y resultado |
| Revisión concentrada en RH | Obtener respuestas y evidencias antes de la revisión |
| Seguimiento dependiente del contacto individual | Consultar estados y notas desde el perfil |
| Cambios en necesidades de contratación | Configuración de módulos, vacantes y evaluaciones |

---

## 4. Metodología documentada

**Prototipado evolutivo** (sección 3.1, Figura 1). El compañero documenta formalmente el ciclo:

1. Reunión con RH → recopilación de necesidades
2. Construcción del prototipo
3. Revisión con RH → observaciones
4. Refinamiento → siguiente iteración

En las reuniones se solicitó incorporar:
- Valoración manual en algunas evaluaciones
- Respeto de los colores institucionales
- Cuestionarios ya aplicados por el área (origen del instrumento psicométrico)

**Implicación para el Trabajo B:** La mención de "cuestionarios que el área ya aplicaba" confirma el origen del instrumento psicométrico (EV-06). Aunque sin documento formal, el compañero lo documenta como parte del proceso de prototipado. Ambos reportes son consistentes al describir el instrumento como institucional.

---

## 5. Contenido del Capítulo II — Marco teórico del Trabajo A

El compañero desarrolla el siguiente marco teórico (no debe duplicarse en el Trabajo B):

| Sección | Tema | Fuentes principales |
|---|---|---|
| 2.1 | Reclutamiento y selección: definición, etapas, tipos, reclutamiento en línea, plataformas | Chiavenato (2011), Dessler (2015), CIPD (2026) |
| 2.2 | Sistemas de información: definición, componentes, datos e información | Laudon y Laudon (2016) |
| 2.3 | Aplicaciones web: definición, funcionamiento, historia | MDN contributors (2026) |
| 2.4 | Metodologías: cascada, espiral, prototipos, incremental, comparación | Royce (1970), Boehm (1988), Pressman (2021) |
| 2.5 | Análisis de software: definición, requisitos, pasos, técnicas, trazabilidad | Kendall (2011), Sommerville (2011) |
| 2.6 | UML: modelos, diagramas utilizados | OMG UML 2.5.1 |
| 2.7 | Diseño de software: arquitectura, interfaz, datos, salidas | Bass et al. (2012) |
| 2.8 | Bases de datos relacionales: ER, relacional, diccionario | Codd (1970), Chen (1976), Elmasri y Navathe (2007) |
| 2.9 | UX: definición, métodos, accesibilidad, importancia | Nielsen (1994), Norman (2013) |
| 2.10 | Seguridad y control de acceso: autenticación, RBAC, HMAC | OWASP, Krawczyk et al. RFC 2104 |

**Implicación:** El Trabajo B no debe duplicar estas secciones. Su marco teórico debe cubrir los temas tecnológicos específicos de la implementación: Next.js/App Router, Supabase (Auth/PostgreSQL/Storage), TypeScript, RLS, JWT, Tailwind/shadcn, y Big Five (que el compañero menciona como "cuestionario base" sin desarrollar el marco teórico del modelo).

---

## 6. Catálogo completo de requisitos funcionales (18)

| ID | Función | Página PDF |
|---|---|---|
| RF-01 | Registrar cuenta (correo, contraseña, CURP) | 46 |
| RF-02 | Controlar duplicación de CURP (HMAC) | 46 |
| RF-03 | Gestionar acceso (autenticación, rol, cierre de sesión) | 46 |
| RF-04 | Consultar módulos | 46 |
| RF-05 | Consultar vacantes (listado y detalle) | 46 |
| RF-06 | Completar cuestionario base | 46 |
| RF-07 | Iniciar postulación | 46 |
| RF-08 | Responder evaluación (guardar respuesta individual) | 46 |
| RF-09 | Controlar tiempo (deadline_at, tiempo restante) | 46 |
| RF-10 | Cargar evidencias (imagen/PDF) | 46 |
| RF-11 | Enviar intento (generar indicadores, colocar en UNDER_REVIEW) | 47 |
| RF-12 | Consultar seguimiento desde el perfil | 47 |
| RF-13 | Administrar módulos (CRUD) | 47 |
| RF-14 | Administrar vacantes (CRUD, generar evaluación asociada) | 47 |
| RF-15 | Configurar evaluaciones (título, duración) | 47 |
| RF-16 | Administrar preguntas (CRUD con opciones) | 47 |
| RF-17 | Consultar revisión administrativa (intentos con respuestas, evidencias, indicadores) | 47 |
| RF-18 | Registrar valoración (decisión y notas) | 47 |

---

## 7. Requisitos no funcionales (7)

| ID | Criterio |
|---|---|
| RNF-01 | Claridad de interacción |
| RNF-02 | Control de acceso |
| RNF-03 | Integridad de información |
| RNF-04 | Persistencia y seguimiento |
| RNF-05 | Acceso mediante navegador |
| RNF-06 | Mantenibilidad documental |
| RNF-07 | Tratamiento de datos e identificadores |

---

## 8. Reglas de negocio (12)

| ID | Descripción |
|---|---|
| RN-01 | Registro requiere correo, contraseña y CURP; comprueba formato y huella antes de crear la cuenta |
| RN-02 | Cuenta asignada al rol `user`; sin confirmación de correo |
| RN-03 | Postulación requiere sesión válida y cuestionario base completado; completarlo no implica aprobación |
| RN-04 | Postulación verifica que la vacante exista con estado `open` y tenga evaluación asociada |
| RN-05 | Si existe postulación, se utiliza; si existe intento no enviado, se recupera; si no, se crea uno nuevo |
| RN-06 | Servidor rechaza guardado de respuestas después del vencimiento o cuando el intento ya fue enviado |
| RN-07 | Al vencer el tiempo, la interfaz envía automáticamente mientras la página permanezca abierta |
| RN-08 | Selector de evidencia contempla imágenes y PDF; carga registra archivo en Storage y referencia en evidence_uploads |
| RN-09 | Envío coloca el intento en UNDER_REVIEW; aprobación/rechazo se registra mediante revisión administrativa |
| RN-10 | Creación de vacante genera evaluación asociada con duración inicial de 30 minutos |
| RN-11 | Vacante admite edición y estados open, closed y draft; el cierre impide nuevas postulaciones |
| RN-12 | Eliminación de vacante o evaluación se bloquea cuando existen intentos asociados |

---

## 9. Catálogo de casos de uso (14)

| ID | Caso de uso | Actor |
|---|---|---|
| CU-01 | Registrar cuenta | Postulante |
| CU-02 | Iniciar y cerrar sesión | Postulante o administrador |
| CU-03 | Consultar módulos y vacantes | Postulante |
| CU-04 | Completar cuestionario base | Postulante |
| CU-05 | Postularse a una vacante | Postulante |
| CU-06 | Responder una evaluación | Postulante |
| CU-07 | Cargar evidencia | Postulante |
| CU-08 | Enviar evaluación | Postulante |
| CU-09 | Consultar perfil y seguimiento | Postulante |
| CU-10 | Administrar módulos | Administrador |
| CU-11 | Administrar vacantes | Administrador |
| CU-12 | Configurar evaluaciones y preguntas | Administrador |
| CU-13 | Consultar intentos y evidencias | Administrador |
| CU-14 | Registrar decisión y observaciones | Administrador |

Relaciones UML: `<<include>>` entre CU-05 y CU-04 (cuestionario base como prerrequisito); `<<extend>>` de CU-07 hacia CU-06 (carga de evidencia como extensión opcional).

---

## 10. Interfaces diseñadas (15) y salidas (9)

**Interfaces:** UI-01 (inicio), UI-02 (login), UI-03 (registro), UI-04 (panel), UI-05 (vacantes del módulo), UI-06 (detalle vacante), UI-07 (evaluación — psicométrico y conocimientos), UI-08 (confirmación), UI-09 (perfil), UI-10 (resumen administrativo), UI-11 (módulos), UI-12 (vacantes admin), UI-13 (evaluaciones y preguntas), UI-14 (listado de intentos), UI-15 (revisión del intento)

**Salidas:** S-01 a S-09 (listado de vacantes, detalle de convocatoria, progreso de evaluación, confirmación de envío, seguimiento personal, resumen administrativo, listado de intentos, detalle de revisión, resumen del instrumento base)

El compañero incluye capturas del sistema real en funcionamiento (Figuras 10-31).

---

## 11. Modelo de datos documentado

El compañero documenta formalmente:
- **Diagrama ER** (notación Chen, Figura 32, p. 88)
- **Diagrama relacional** (notación pata de gallo, Figura 33, p. 89)
- **Diccionario de datos** completo: 13 tablas, 72 campos, 17 claves foráneas (Tablas 38-50, pp. 91-96)
- **Restricciones** de unicidad y CHECK para todos los campos relevantes (Tabla 37)

**Importante:** El compañero aclara explícitamente (p. 96) que `reviews` contiene `comments` (no `notes`), y que `attempts` tiene campos alternativos `decision` y `reviewer_notes`. Esta confirmación es consistente con la discrepancia D-02 documentada en nuestro archivo `00-preguntas-pendientes.md`.

---

## 12. Diagramas UML producidos

| Figura | Tipo | Descripción |
|---|---|---|
| Figura 1 | Ciclo de proceso | Prototipado evolutivo aplicado al proyecto |
| Figura 2 | Casos de uso | Sistema completo con 2 actores y Supabase Auth |
| Figura 3 | Actividad | Recorrido principal del postulante |
| Figura 4 | Estados | Estados del intento de evaluación |
| Figura 5 | Arquitectura lógica | Capas: presentación, aplicación, servicios de datos |
| Figura 6 | Despliegue | Next.js en Node.js, Supabase, navegador |
| Figura 7 | Secuencia | Iniciar una postulación |
| Figura 8 | Secuencia | Enviar y revisar una evaluación |
| Figura 9 | Mapa de navegación | Rutas del sistema con restricciones por rol |

---

## 13. Hipótesis e indicadores

La hipótesis del compañero (H1) plantea que el sistema centraliza la información Y reduce el tiempo de revisión inicial.

| Indicador | Método | Estado |
|---|---|---|
| I-1: Centralización | Lista de verificación de 5 datos por candidatura desde UI-15 | **Cumplido** (verificado por el diseño) |
| I-2: Tiempo de revisión | Comparación cronometrada antes/después | **Pendiente de medición** (requiere implementación con candidaturas reales) |
| I-3: Satisfacción de RH | Cuestionario Likert 10 ítems (Anexo B) | **Pendiente de medición** |

**Implicación para el Trabajo B:** Los indicadores I-2 e I-3 son mediciones que el compañero propone realizar durante o después de la implementación. El Trabajo B es quien debe reportar estos resultados si se obtienen. Si no se midieron formalmente, deben presentarse como trabajo futuro, no como resultados confirmados.

---

## 14. Trabajo futuro del Trabajo A (11 propuestas)

El compañero lista las siguientes funciones no incluidas en el alcance del MVP:

1. Programación de entrevistas
2. Carga de currículum
3. Recuperación de contraseña por correo
4. Calificación de evaluaciones de conocimientos (% de aciertos vs. respuesta de referencia)
5. Coherencia entre instrucciones y archivos admitidos por actividad
6. Versiones de evaluaciones (conservar contenido respondido si se modifican preguntas)
7. Etiquetas en español y contadores claros
8. Una postulación activa por vacante (restricción de unicidad usuario-vacante)
9. Reportes exportables (PDF/Excel)
10. Notificaciones por correo electrónico
11. Evaluación de usabilidad con postulantes reales

**Implicación para el Trabajo B:** El trabajo futuro del Cap. VII de nuestro reporte debe ser consistente con esta lista. Podemos añadir los puntos específicos de la implementación (middleware de servidor, CRUD de tareas prácticas, rol revisor, estadísticas en UI) y hacer referencia a los del compañero que también aplican.

---

## 15. Referencias del Trabajo A (selección relevante para el Trabajo B)

Las siguientes referencias del compañero pueden ser útiles para el Trabajo B o establecen precedente sobre las fuentes usadas en el proyecto:

- Krawczyk et al. (1997) — RFC 2104 para HMAC (directamente aplicable al Cap. III de seguridad)
- OWASP Foundation — Authorization Cheat Sheet
- PostgreSQL Global Development Group — documentación de restricciones
- Chiavenato (2011), Dessler (2015) — reclutamiento y selección (ya referenciados en el contexto organizacional)
- Nielsen (1994) — heurísticas de usabilidad
- Bass et al. (2012) — arquitectura de software
