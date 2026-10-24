# Plan de integración de figuras — Corte 8C

**Fecha:** 2026-10-23
**Propósito:** Especificar la ubicación exacta de cada figura (captura de pantalla + diagrama Mermaid) dentro del documento Word, con numeración oficial según convención X.Y y leyenda propuesta.

---

## Convención de numeración

- Formato: `Figura X.Y.` donde X = número de capítulo, Y = número correlativo dentro del capítulo
- Las figuras se numeran en orden de aparición en el texto, no por ID de evidencia
- La leyenda aparece **debajo** de la figura, centrada, en estilo "Pie de figura" (Arial 9pt, cursiva)
- Formato de leyenda: `Figura X.Y. Descripción breve. Fuente: elaboración propia, [año].`

---

## Capítulo I — Introducción y generalidades

No se insertan figuras de evidencia en este capítulo. Las figuras de arquitectura de alto nivel son opcionales y se tratarán en el Cap. V.

---

## Capítulo II — Contexto organizacional

No se insertan capturas de pantalla. Puede incluir organigrama si el autor lo provee, pero no está en el alcance del Corte 8C.

---

## Capítulo III — Marco teórico

No se insertan capturas de pantalla. Los diagramas conceptuales del Big Five o del modelo MVC no son necesarios para la versión actual.

---

## Capítulo IV — Metodología de desarrollo

No se insertan capturas de pantalla. Si el autor desea ilustrar el ciclo de prototipado evolutivo, puede insertar una figura conceptual en §4.3, pero no es un requerimiento del Corte 8C.

---

## Capítulo V — Desarrollo e implementación

### §5.2 Arquitectura del sistema

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.1 | Diagrama de arquitectura de capas | ASCII art actual — **reemplazar con imagen** | — | `Figura 5.1. Arquitectura de capas del sistema UCES Plataforma de Talento. Fuente: elaboración propia, 2026.` |
| Fig. 5.2 | Diagrama de secuencia: registro de candidato | `diagramas/exportados/fig-5-2-secuencia-registro.png` | — | `Figura 5.2. Diagrama de secuencia: registro de candidato. Fuente: elaboración propia, 2026.` |
| Fig. 5.3 | Diagrama de secuencia: flujo de postulación | `diagramas/exportados/fig-5-3-secuencia-postulacion.png` | — | `Figura 5.3. Diagrama de secuencia: flujo de postulación del candidato. Fuente: elaboración propia, 2026.` |
| Fig. 5.4 | Landing page pública | `evidencias/08c/candidato/EV-5A-02-landing.png` | EV-5A-02 | `Figura 5.4. Vista de la página de inicio pública del sistema. Fuente: captura de pantalla propia, 2026.` |

### §5.3 Módulo de registro y autenticación

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.5 | Formulario de registro | `candidato/EV-5A-05-registro-formulario.png` | EV-5A-05 | `Figura 5.5. Formulario de registro de candidato (/register). Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.6 | Error de CURP duplicada | `candidato/EV-5A-06-curp-duplicada.png` | EV-5A-06 | `Figura 5.6. Mensaje de error por CURP ya registrada en el sistema (CP-02a). Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.7 | Formulario de inicio de sesión | `candidato/EV-5A-07-login.png` | EV-5A-07 | `Figura 5.7. Formulario de inicio de sesión (/login). Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.8 | Diagrama de secuencia: subida de evidencias | `diagramas/exportados/fig-5-4-secuencia-evidencias.png` | — | `Figura 5.8. Diagrama de secuencia: subida de archivo de evidencia. Fuente: elaboración propia, 2026.` |

### §5.4 Panel del candidato

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.9 | Panel del candidato | `candidato/EV-5A-09-panel-candidato.png` | EV-5A-09 | `Figura 5.9. Panel principal del candidato autenticado (/panel). Fuente: captura de pantalla propia, 2026.` |

### §5.5 Módulo de vacantes

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.10 | Lista de vacantes | `candidato/EV-5A-11-vacantes.png` | EV-5A-11 | `Figura 5.10. Lista de vacantes disponibles (/vacantes). Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.11 | Detalle de vacante | `candidato/EV-5A-12-detalle-vacante.png` | EV-5A-12 | `Figura 5.11. Detalle de vacante con descripción y requisitos. Fuente: captura de pantalla propia, 2026.` |

### §5.6 Módulo de evidencias

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.12 | Subida de evidencia | `candidato/EV-5A-19-subida-evidencia.png` | EV-5A-19 | `Figura 5.12. Interfaz de subida de archivo de evidencia en módulo activo. Fuente: captura de pantalla propia, 2026.` |

### §5.9 Panel de administración

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.13 | Panel de administración | `administrador/EV-5B-01-admin-panel.png` | EV-5B-01 | `Figura 5.13. Panel de administración (/admin) — lista de candidatos y postulaciones. Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.14 | Acceso denegado | `candidato/EV-5B-08-acceso-denegado.png` | EV-5B-08 | `Figura 5.14. Redirección de acceso no autorizado al intentar acceder a /admin como candidato. Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.15 | Diagrama de flujo requireAdmin | `diagramas/exportados/fig-5-6-flujo-requireAdmin.png` | — | `Figura 5.15. Diagrama de flujo de la función requireAdmin(). Fuente: elaboración propia, 2026.` |

### §5.10 Módulo de revisión y decisión

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.16 | Detalle de candidato en admin | `administrador/EV-5B-02-admin-detalle.png` | EV-5B-02 | `Figura 5.16. Vista de detalle del candidato en el panel de administración. Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.17 | Formulario de decisión | `administrador/EV-5B-03-admin-decision.png` | EV-5B-03 | `Figura 5.17. Formulario de decisión de aprobación o rechazo. Fuente: captura de pantalla propia, 2026.` |

> Figuras 5.16 y 5.17: **PENDIENTES**. Insertar texto provisional `[Figura pendiente de captura]` en el Word hasta obtener las capturas.

### §5.11 Módulo psicométrico

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.18 | Guard de prerequisito | `candidato/EV-5B-13-guard-prereq.png` | EV-5B-13 | `Figura 5.18. Guard de prerequisito activo: el candidato no puede acceder al psicométrico sin postulación vigente. Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.19 | Preguntas Likert | `candidato/EV-5A-15-psicometrico-preguntas.png` | EV-5A-15 | `Figura 5.19. Pantalla de evaluación psicométrica con ítems Likert 1–5. Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.20 | Resultado psicométrico | `candidato/EV-5A-17-resultado-psicometrico.png` | EV-5A-17 | `Figura 5.20. Resultado de la evaluación psicométrica con puntuaciones por rasgo y clasificación. Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.21 | Diagrama de inicio psicométrico | `diagramas/exportados/fig-5-7-inicio-psicometrico.png` | — | `Figura 5.21. Diagrama de inicio del flujo psicométrico con verificación de prerequisito. Fuente: elaboración propia, 2026.` |

### §5.13 Discrepancias entre diseño e implementación

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 5.22 | Discrepancia D-01 guard score | `candidato/EV-5B-15-d01-guard-score.png` | EV-5B-15 | `Figura 5.22. Discrepancia D-01: el guard verifica el campo completed, no el score numérico del resultado psicométrico. Fuente: captura de pantalla propia, 2026.` |
| Fig. 5.23 | Diagrama persistencia de decisiones | `diagramas/exportados/fig-5-5-persistencia-decisiones.png` | — | `Figura 5.23. Diagrama de persistencia de decisiones administrativas. Fuente: elaboración propia, 2026.` |

---

## Capítulo VI — Pruebas y resultados

| # | Figura propuesta | Fuente | ID evidencia | Leyenda |
|---|---|---|---|---|
| Fig. 6.1 | CP-07 guard D-01 | `validaciones/EV-6C-04-cp07-guard-d01.png` | EV-6C-04 | `Figura 6.1. Evidencia del CP-07: comportamiento del guard de prerequisito (Discrepancia D-01). Fuente: captura de pantalla propia, 2026.` |
| Fig. 6.2 | CP-20 resultado psicométrico | `candidato/EV-5A-17-resultado-psicometrico.png` | EV-6C-05 | `Figura 6.2. Evidencia del CP-20: pantalla de resultado psicométrico tras la evaluación. Fuente: captura de pantalla propia, 2026.` |
| Fig. 6.3 | CP-18 estadísticas D-03 | `validaciones/EV-6C-06-cp18-stats-d03.png` | EV-6C-06 | `Figura 6.3. Evidencia del CP-18: respuesta de la API de estadísticas con solo 2 métricas (Discrepancia D-03). Fuente: captura de pantalla propia, 2026.` |
| Fig. 6.4 | CP-22 RLS | `validaciones/EV-6C-07-cp22-rls.png` | EV-6C-07 | `Figura 6.4. Evidencia del CP-22: acceso restringido por Row Level Security activo en Supabase. Fuente: captura de pantalla propia, 2026.` |

---

## Capítulo VII — Conclusiones y trabajo futuro

No requiere figuras de evidencia.

---

## Figuras en Anexos

| Anexo | Figura | Fuente | Descripción |
|---|---|---|---|
| Anexo A (Código fuente) | — | — | Sin figuras de pantalla |
| Anexo B (Capturas adicionales) | Fig. B.1 | `candidato/EV-5A-05b-registro-completo.png` | Formulario de registro con datos completos |
| Anexo C (Diagramas Mermaid) | Fig. C.1–C.6 | `diagramas/exportados/*.svg` | Versiones vectoriales de los 6 diagramas |
| Anexo D (Supabase Studio) | Fig. D.1–D.4 | EV-5A-04, EV-5B-12, EV-6C-01, EV-6C-02 | Capturas manuales pendientes del dashboard de Supabase |

---

## Conteo de figuras por capítulo

| Capítulo | Figuras de capturas | Figuras de diagramas | Total |
|---|---|---|---|
| Cap. I | 0 | 0 | 0 |
| Cap. II | 0 | 0 | 0 |
| Cap. III | 0 | 0 | 0 |
| Cap. IV | 0 | 0 | 0 |
| Cap. V | 17 (2 pendientes) | 6 | 23 |
| Cap. VI | 4 | 0 | 4 |
| Cap. VII | 0 | 0 | 0 |
| **Total cuerpo** | **21 (2 pendientes)** | **6** | **27** |
| Anexos | 5 (4 pendientes Studio) | 0 | 5 |
| **Total documento** | **26 (6 pendientes)** | **6** | **32** |
