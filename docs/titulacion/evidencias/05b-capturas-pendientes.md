# Capturas de pantalla pendientes — Corte 5B

**Capítulo:** V — Desarrollo e implementación
**Secciones:** 5.9 a 5.13
**Fecha de elaboración:** 2026-10-22

Este documento lista las capturas de pantalla necesarias para ilustrar las secciones del Corte 5B en la versión maquetada en Word. Complementa la lista del Corte 5A en `docs/titulacion/evidencias/05a-capturas-pendientes.md`.

---

## Instrucciones generales

- Resolución mínima: 1280 × 800 px
- Formato: PNG
- Todas las capturas del panel admin requieren sesión de administrador activa
- Censurar datos personales reales si los hay; usar datos de prueba visibles

---

## Sección 5.9 — Panel administrativo

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.9a | Panel administrativo — pestaña Resumen con contadores y últimos intentos | `/admin` sesión administrador | `fig-5-9a-admin-resumen.png` |
| Fig. 5.9b | Panel administrativo — pestaña Módulos con formulario y lista | `/admin` → pestaña "Módulos" | `fig-5-9b-admin-modulos.png` |
| Fig. 5.9c | Panel administrativo — pestaña Vacantes con formulario y lista filtrable | `/admin` → pestaña "Vacantes" | `fig-5-9c-admin-vacantes.png` |
| Fig. 5.9d | Panel administrativo — pestaña Evaluaciones con lista de assessments y preguntas | `/admin` → pestaña "Evaluaciones" → seleccionar assessment | `fig-5-9d-admin-evaluaciones-preguntas.png` |
| Fig. 5.9e | Panel administrativo — pestaña Intentos con lista de postulaciones recibidas | `/admin` → pestaña "Intentos" | `fig-5-9e-admin-intentos.png` |
| Fig. 5.9f | Detalle de intento — sección de datos generales y resumen del candidato | `/admin/attempts/[id]` | `fig-5-9f-admin-detalle-resumen.png` |
| Fig. 5.9g | Detalle de intento — sección acciones de revisión (selector de decisión + notas) | `/admin/attempts/[id]` → sección acciones | `fig-5-9g-admin-acciones-revision.png` |
| Fig. 5.9h | Detalle de intento — sección de respuestas con opciones y respuesta correcta | `/admin/attempts/[id]` → sección respuestas | `fig-5-9h-admin-respuestas.png` |
| Fig. 5.9i | Detalle de intento — sección de evidencias con botón "Descargar" activo | `/admin/attempts/[id]` → sección evidencias | `fig-5-9i-admin-evidencias-descarga.png` |

---

## Sección 5.10 — Seguridad

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.10a | Mensaje de error 403 al intentar acceder a `/admin` con sesión de candidato (resultado visible en red o pantalla) | `/admin` sesión candidato | `fig-5-10a-acceso-denegado-admin.png` |
| Fig. 5.10b | Pestaña Network del navegador mostrando el encabezado `Authorization: Bearer` en una solicitud a `/api/admin/modules` | DevTools → Network → request a admin API | `fig-5-10b-bearer-token-devtools.png` |
| Fig. 5.10c | Tabla `curp_hashes` en Supabase mostrando hashes sin CURPs en claro | Supabase Dashboard → Table Editor → curp_hashes | `fig-5-10c-curp-hashes-tabla.png` |

---

## Sección 5.11 — Módulo psicométrico

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.11a | Evaluación psicométrica activa — pregunta con escala Likert 1-5 visible | `/evaluacion/[attemptId]` — intento psicométrico | `fig-5-11a-psicometrico-evaluacion.png` |
| Fig. 5.11b | Resultado del psicométrico — página de resultado tras el envío | `/resultado/[attemptId]` — intento psicométrico enviado | `fig-5-11b-psicometrico-resultado.png` |
| Fig. 5.11c | Panel admin — detalle de intento psicométrico con resumen Big Five (scores por rasgo y clasificaciones) | `/admin/attempts/[id]` — intento psicométrico con psychometric_summary | `fig-5-11c-admin-resumen-bigfive.png` |
| Fig. 5.11d | Panel admin — detalle de extroversión mostrando "Indicador sin filtro" (diferenciado del resto de rasgos) | `/admin/attempts/[id]` → sección psicométrica | `fig-5-11d-admin-extroversion-indicador.png` |

---

## Sección 5.12 — Diferencias frente al diseño

| Fig. | Descripción | Ruta de navegación | Nombre de archivo sugerido |
|---|---|---|---|
| Fig. 5.12a | Intento con decisión APPROVED visible — confirmar que la decisión proviene de `reviews` (verificar campo `decision_source` en respuesta API o mensaje en pantalla) | `/admin/attempts/[id]` — decisión registrada | `fig-5-12a-decision-aprobado.png` |
| Fig. 5.12b | Candidato con psicométrico completado pero clasificación "Riesgo" — puede postularse normalmente (evidencia de D-01) | `/vacantes/[id]` — candidato con riesgo en algún rasgo | `fig-5-12b-d01-postulacion-riesgo.png` |

---

## Resumen de capturas requeridas en 5B

| Sección | Capturas requeridas | Capturas opcionales |
|---|---|---|
| 5.9 — Panel admin | 9 | — |
| 5.10 — Seguridad | 2 | 1 (DevTools) |
| 5.11 — Psicométrico | 4 | — |
| 5.12 — Diferencias | 2 | — |
| **Total 5B** | **17** | **1** |

**Total acumulado del Capítulo V (5A + 5B):** 42 capturas requeridas + 2 opcionales

---

## Estado de capturas

| Captura | Estado |
|---|---|
| Todas las anteriores | PENDIENTE |

Actualizar esta tabla conforme se obtengan las capturas durante las pruebas del Capítulo VI.
