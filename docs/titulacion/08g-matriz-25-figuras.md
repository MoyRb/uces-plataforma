# Matriz de 26 figuras con referencias cruzadas — Corte 8G

**Fecha:** 2026-10-23
**Versión:** v0.4
**Total figuras:** 26 (25 del cuerpo + Fig 5.1 nueva en §5.1.2)

---

## 1. Inventario completo con estado de referencia cruzada

| fig_num | Sección | Keyword | Pág. v0.3 | Pág. v0.4 | Ref. cruzada v0.3 | Ref. cruzada v0.4 | Imagen |
|---|---|---|---|---|---|---|---|
| 5.1 | §5.1.2 | "5.1.2" | — | 77 | NO | SÍ (G03+G04) | PNG generado |
| 5.2 | §5.3.1 | "5.3.1" | 81 | ~81 | SÍ (preexistente) | SÍ (G03) | diagrama |
| 5.3 | §5.6.1 | "5.6.1" | 92 | ~92 | SÍ (preexistente) | SÍ (G03) | diagrama |
| 5.4 | §5.2 | "5.2" | 79 | ~79 | NO | SÍ (G03) | captura |
| 5.5 | §5.9.8 | "Registro de decisiones" | 84 | ~84 | SÍ (preexistente) | SÍ (G03) | diagrama |
| 5.6 | §5.3 | "Registro y autenticación" | 84 | ~84 | NO | SÍ (G03) | captura |
| 5.7 | §5.3 | "5.3" | 84 | ~84 | NO | SÍ (G03) | captura |
| 5.8 | §5.8 | "5.8" | 100 | ~100 | SÍ (preexistente) | SÍ (G03) | diagrama |
| 5.9 | §5.4 | "Panel del candidato" | 89 | ~89 | NO | SÍ (G03) | captura |
| 5.10 | §5.5 | "5.5" | 91 | ~91 | NO | SÍ (G03) | placeholder |
| 5.11 | §5.5 | "5.5" | 91 | ~91 | NO | SÍ (G03) | captura |
| 5.12 | §5.6 | "5.6" | 92 | ~92 | NO | SÍ (G03) | captura |
| 5.13 | §5.9 | "5.9" | 104 | ~104 | NO | SÍ (G03) | captura |
| 5.14 | §5.10.2 | "5.10.2" | 111 | ~111 | NO | SÍ (G03) | captura |
| 5.15 | §5.10.2 | "requireAdmin" | 111 | ~112 | NO | SÍ (G03) | diagrama |
| 5.16 | §5.10 | "5.10" | 110 | ~110 | NO | SÍ (G03) | placeholder |
| 5.17 | §5.9.8 | "Registro de decisiones" | 108 | ~108 | NO | SÍ (G03) | placeholder |
| 5.18 | §5.11 | "5.11" | 118 | ~118 | NO | SÍ (G03) | captura |
| 5.19 | §5.11 | "Evaluación psicométrica" | 50 | ~49 | NO | SÍ (G03) | captura |
| 5.20 | §5.11.5 | "Umbrales de clasificación" | 122 | ~122 | NO | SÍ (G03) | captura |
| 5.21 | §5.11 | "psicométrico" | 66 | ~64 | NO | SÍ (G03) | diagrama |
| 5.22 | §5.13 | "5.13" | 131 | ~131 | SÍ (preexistente) | SÍ (G03) | captura |
| 6.1 | §6.5 | "6.5" | 142 | ~141 | NO | SÍ (G03) | captura |
| 6.2 | §6.5.3 | "6.5.3" | 147 | ~145 | NO | SÍ (G03) | captura |
| 6.3 | §6.5 | "Flujo del administrador" | 143 | ~143 | NO | SÍ (G03) | captura |
| 6.4 | §6.5 | "CP-22" | 143 | ~144 | NO | SÍ (G03) | captura |

**Notas:**
- Pág. v0.4 aproximadas — variarán ±1 respecto a v0.3 por la reducción de 1 página (ASCII art eliminado)
- Figs 5.5 y 5.17 comparten keyword "Registro de decisiones" — se colocan en la primera y segunda ocurrencia respectivamente; el dedup por `placed_fig_nums` asegura que no se dupliquen

---

## 2. Texto de referencias cruzadas implementadas en v0.4

| fig_num | Texto de referencia cruzada insertado antes de la figura |
|---|---|
| 5.1 | "En la Figura 5.1 se ilustra la arquitectura de tres capas implementada: la capa de presentación en el navegador mediante Client Components de React, la capa de lógica de negocio en el servidor Next.js mediante Server Components y Route Handlers, y la capa de datos provista por Supabase a través de Supabase Auth, PostgreSQL 16 y Storage." |
| 5.2 | "El diagrama de secuencia correspondiente al flujo de registro se muestra en la Figura 5.2, donde se detalla la interacción entre el cliente, el Route Handler de registro y Supabase Auth." |
| 5.3 | "El flujo completo del proceso de postulación se ilustra en la Figura 5.3, donde se muestra la validación de prerequisito psicométrico previa a la creación del intento." |
| 5.4 | "En la Figura 5.4 se muestra la página de inicio pública del sistema, accesible sin autenticación desde la ruta raíz (/)." |
| 5.5 | "El flujo de persistencia de decisiones administrativas se muestra en la Figura 5.5, ilustrando la actualización del campo decision en la tabla attempts." |
| 5.6 | "En la Figura 5.6 se observa el mensaje de error generado al intentar registrar una CURP que ya existe en la base de datos, validando el cumplimiento de RF-02." |
| 5.7 | "En la Figura 5.7 se muestra el formulario de inicio de sesión, implementado mediante Supabase Auth con credenciales de correo y contraseña." |
| 5.8 | "El diagrama de secuencia de la subida de evidencia se presenta en la Figura 5.8, describiendo la interacción entre el cliente, el Route Handler y el bucket privado en Supabase Storage." |
| 5.9 | "En la Figura 5.9 se muestra el panel principal del candidato autenticado, desde donde puede visualizar su estado psicométrico y las vacantes disponibles." |
| 5.10 | "La Figura 5.10 documenta una decisión de diseño: el sistema no implementa una ruta de listado general de vacantes (/vacantes), sino que accede directamente al detalle por identificador." |
| 5.11 | "En la Figura 5.11 se presenta la vista de detalle de vacante, que muestra la descripción del puesto y el botón de postulación para candidatos elegibles." |
| 5.12 | "En la Figura 5.12 se observa la interfaz de subida de archivo de evidencia, disponible únicamente cuando el módulo del candidato se encuentra en estado activo." |
| 5.13 | "En la Figura 5.13 se muestra el panel de administración, que presenta la lista de candidatos con sus postulaciones y el estado de revisión correspondiente." |
| 5.14 | "En la Figura 5.14 se observa la redirección que recibe el usuario sin privilegios al intentar acceder a una ruta protegida por la función requireAdmin()." |
| 5.15 | "El diagrama de flujo de requireAdmin() se ilustra en la Figura 5.15, mostrando la cadena de validación: verificación de sesión, consulta de rol y respuesta 401 en caso de fallo." |
| 5.16 | "La Figura 5.16 mostrará la vista de detalle de candidato en el panel administrativo (/admin/attempts/[id]), que incluye el historial de respuestas y la herramienta de decisión (captura pendiente de obtención)." |
| 5.17 | "La Figura 5.17 corresponde al formulario de decisión del administrador, que permite aprobar o rechazar la postulación de un candidato (captura pendiente de obtención)." |
| 5.18 | "En la Figura 5.18 se muestra la pantalla de bloqueo que el sistema presenta al candidato que intenta postularse a una vacante sin haber completado la evaluación psicométrica." |
| 5.19 | "En la Figura 5.19 se muestra la pantalla del TEST MINI BIG FIVE, que presenta los 20 ítems Likert en escala 1–5 junto con el temporizador de sesión." |
| 5.20 | "En la Figura 5.20 se presenta la pantalla de confirmación de envío de la evaluación psicométrica, que muestra el estado UNDER_REVIEW mientras el sistema procesa los resultados." |
| 5.21 | "El diagrama de inicio del flujo psicométrico se presenta en la Figura 5.21, describiendo la verificación de prerequisito y la creación del intento de evaluación." |
| 5.22 | "En la Figura 5.22 se observa la evidencia de la discrepancia D-01, donde el guard de prerequisito permite el acceso a candidatos cuyo intento tiene completed=true independientemente de los scores obtenidos por rasgo." |
| 6.1 | "La Figura 6.1 muestra la evidencia obtenida durante la ejecución del caso de prueba CP-07, que confirma empíricamente el comportamiento de la Discrepancia D-01." |
| 6.2 | "En la Figura 6.2 se presenta la evidencia del CP-20, que verifica el flujo completo de envío de la evaluación psicométrica hasta el estado UNDER_REVIEW." |
| 6.3 | "La Figura 6.3 muestra la respuesta de la API al ejecutar el CP-18, confirmando la Discrepancia D-03: el endpoint de estadísticas devuelve un error 401 en lugar de las métricas esperadas." |
| 6.4 | "En la Figura 6.4 se muestra la evidencia del CP-22, que confirma el funcionamiento de las políticas de Row Level Security (RLS) al intentar acceder a registros de otro usuario." |

---

## 3. Clasificación por origen de imagen

| Origen | Cantidad | fig_nums |
|---|---|---|
| Captura propia del sistema (UCES Plataforma de Talento) | 14 | 5.4, 5.6, 5.7, 5.9, 5.11, 5.12, 5.13, 5.14, 5.18, 5.19, 5.20, 5.22, 6.1, 6.2, 6.3, 6.4 |
| Diagrama de elaboración propia | 7 | 5.1 (nuevo), 5.2, 5.3, 5.5, 5.8, 5.15, 5.21 |
| Placeholder / captura pendiente | 3 | 5.10 (arquitectónico), 5.16, 5.17 |

---

## 4. Referencias cruzadas implementadas vs. texto plano (estado Word)

En v0.4, las 26 referencias cruzadas son **párrafos de texto plano** insertados programáticamente antes de cada figura. No son campos `REF` de Word vinculados a marcadores. Esto es suficiente para la presentación académica; la numeración de figuras no cambiará al regenerar el documento porque es fija en el código.

Para implementar campos `REF` completos (bookmarks) se requeriría post-procesado del DOCX con marcadores en cada figura — tarea registrada como mejora opcional post-v1.0.
