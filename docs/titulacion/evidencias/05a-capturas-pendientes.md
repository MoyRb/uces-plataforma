# Capturas de pantalla pendientes — Corte 5A

**Capítulo:** V — Desarrollo e implementación
**Secciones:** 5.1 a 5.8
**Fecha de elaboración:** 2026-10-22

Este documento lista todas las capturas de pantalla que deben obtenerse del sistema en ejecución para acompañar las figuras del Capítulo V en la versión maquetada en Word. Las capturas deben tomarse con el sistema corriendo localmente (`npm run dev`) o en el entorno de producción verificado.

---

## Instrucciones generales

- Resolución mínima recomendada: 1280 × 800 px
- Formato: PNG (sin compresión con pérdida)
- Nombre de archivo: usar el identificador de la figura (ej. `fig-5-5-panel-candidato.png`)
- Anotaciones (flechas, recuadros): agregar solo si el asesor o el formato universitario lo requiere
- Para vistas que requieren sesión, usar una cuenta de candidato de prueba y una de administrador de prueba

---

## Sección 5.1 — Arquitectura general

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.1a | Pantalla de inicio (landing page `/`) — mostrar las tarjetas de estadísticas estáticas | Acceso sin sesión → `/` | `fig-5-1a-landing.png` |
| Fig. 5.1b | Estructura de directorios del proyecto en el IDE (VS Code) abierta en `my-app/app/` | VS Code → explorador de archivos | `fig-5-1b-estructura-directorios.png` |

**Nota:** La Fig. 5.1 del diagrama de arquitectura ya está representada mediante ASCII art en el capítulo; la captura es complementaria y opcional.

---

## Sección 5.2 — Configuración de Supabase

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.2a | Panel de Supabase — sección Authentication → Users mostrando usuarios registrados | Supabase Dashboard → proyecto UcesCap → Authentication → Users | `fig-5-2a-supabase-users.png` |
| Fig. 5.2b | Panel de Supabase — sección Table Editor con la tabla `profiles` abierta | Supabase Dashboard → Table Editor → profiles | `fig-5-2b-supabase-profiles.png` |

**Nota:** Censurar correos electrónicos reales si los hay; reemplazar con datos de prueba visibles.

---

## Sección 5.3 — Registro y autenticación

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.3a | Formulario de registro vacío (`/register`) | `/register` sin sesión | `fig-5-3a-registro-vacio.png` |
| Fig. 5.3b | Formulario de registro con datos de prueba ingresados (antes de envío) | `/register` con datos en campos | `fig-5-3b-registro-con-datos.png` |
| Fig. 5.3c | Mensaje de error de validación por CURP mal formada | `/register` → ingresar CURP inválida → Submit | `fig-5-3c-registro-error-curp.png` |
| Fig. 5.3d | Formulario de inicio de sesión (`/login`) | `/login` sin sesión | `fig-5-3d-login.png` |
| Fig. 5.3e | Redirección a `/panel` tras inicio de sesión exitoso | `/login` → credenciales válidas → Enter | `fig-5-3e-login-exitoso-panel.png` |

---

## Sección 5.4 — Panel del candidato

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.4a | Panel del candidato completo (`/panel`) — estado sin psicométrico completado (botón "Iniciar evaluación psicométrica" visible) | `/panel` sesión candidato sin psicométrico | `fig-5-4a-panel-sin-psicometrico.png` |
| Fig. 5.4b | Panel del candidato con psicométrico completado — sección de módulos disponibles visible | `/panel` sesión candidato con psicométrico completado | `fig-5-4b-panel-con-modulos.png` |
| Fig. 5.4c | Vista del panel en sesión de administrador — diferencia en UI (acceso admin visible) | `/panel` sesión administrador | `fig-5-4c-panel-admin.png` |

---

## Sección 5.5 — Módulos y vacantes

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.5a | Lista de vacantes dentro de un módulo (`/modulos/[moduleId]`) | `/panel` → clic en un módulo | `fig-5-5a-modulo-vacantes.png` |
| Fig. 5.5b | Página de detalle de una vacante (`/vacantes/[id]`) con el botón "Postularme" visible | `/vacantes/[id]` — vacante con status `open` | `fig-5-5b-vacante-detalle.png` |
| Fig. 5.5c | Página de detalle de una vacante con el botón "Postularme" deshabilitado (vacante no disponible o ya postulado) | `/vacantes/[id]` — vacante con status distinto a `open` o ya postulado | `fig-5-5c-vacante-no-disponible.png` |

---

## Sección 5.6 — Módulo de postulación

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.6a | Clic en "Postularme" — redirección inmediata a evaluación (sin psicométrico pendiente) | `/vacantes/[id]` → clic en "Postularme" → redirección | `fig-5-6a-postulacion-exitosa.png` |
| Fig. 5.6b | Mensaje de error al intentar postularse sin psicométrico completado — redirección a `/psicometrico` | `/vacantes/[id]` → clic en "Postularme" sin psicométrico | `fig-5-6b-postulacion-requiere-psicometrico.png` |

**Nota:** El flujo de postulación exitosa redirige directamente a la evaluación; capturar la URL de destino en la barra de dirección para evidenciar la redirección.

---

## Sección 5.7 — Módulo de evaluación

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.7a | Página de evaluación activa (`/evaluacion/[attemptId]`) con el timer visible y preguntas mostradas | `/evaluacion/[attemptId]` — intento activo | `fig-5-7a-evaluacion-timer.png` |
| Fig. 5.7b | Selección de una opción de respuesta — estado visual de selección activa | `/evaluacion/[attemptId]` → clic en opción | `fig-5-7b-evaluacion-respuesta-seleccionada.png` |
| Fig. 5.7c | Timer con tiempo bajo (menos de 1 minuto restante) — si hay cambio visual de urgencia | `/evaluacion/[attemptId]` — esperar a menos de 60 segundos | `fig-5-7c-evaluacion-timer-critico.png` |
| Fig. 5.7d | Botón "Enviar evaluación" antes del clic | `/evaluacion/[attemptId]` — scroll al final | `fig-5-7d-evaluacion-boton-enviar.png` |
| Fig. 5.7e | Página de resultados (`/resultado/[attemptId]`) tras el envío | `/resultado/[attemptId]` tras envío exitoso | `fig-5-7e-resultado.png` |

---

## Sección 5.8 — Carga de evidencias

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.8a | Sección de carga de evidencia dentro de la evaluación activa — campo de archivo vacío | `/evaluacion/[attemptId]` → sección de evidencia | `fig-5-8a-evidencia-vacia.png` |
| Fig. 5.8b | Evidencia cargada exitosamente — nombre de archivo o enlace "Ver evidencia" visible | `/evaluacion/[attemptId]` → subir archivo → confirmación | `fig-5-8b-evidencia-cargada.png` |
| Fig. 5.8c | Panel de Supabase — Storage → bucket `evidences` con al menos un archivo almacenado | Supabase Dashboard → Storage → evidences | `fig-5-8c-supabase-storage-evidences.png` |
| Fig. 5.8d | Vista de administrador del detalle de intento con el enlace de evidencia (signed URL) | `/admin/attempts/[id]` → enlace de evidencia | `fig-5-8d-admin-evidencia-signed-url.png` |

---

## Resumen de capturas requeridas

| Sección | Capturas requeridas | Capturas opcionales |
|---|---|---|
| 5.1 — Arquitectura | 1 (landing) | 1 (estructura IDE) |
| 5.2 — Supabase config | 2 | — |
| 5.3 — Registro y auth | 5 | — |
| 5.4 — Panel candidato | 3 | — |
| 5.5 — Módulos y vacantes | 3 | — |
| 5.6 — Postulación | 2 | — |
| 5.7 — Evaluación | 5 | — |
| 5.8 — Evidencias | 4 | — |
| **Total** | **25** | **1** |

---

## Estado de capturas

| Captura | Estado |
|---|---|
| Todas las anteriores | PENDIENTE |

Actualizar esta tabla conforme se obtengan las capturas durante las pruebas del Capítulo VI.
