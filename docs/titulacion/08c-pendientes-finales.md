# Pendientes finales — post-Corte 8C

**Fecha:** 2026-10-23
**Propósito:** Lista consolidada de todo lo que resta antes de poder generar el documento Word y PDF definitivos.

---

## Prioridad ALTA — Bloquean la entrega del documento

| # | Tarea | Detalles | Responsable |
|---|---|---|---|
| 1 | Confirmar plantilla Word institucional UCES | Solicitar al asesor el formato oficial (.dotx o .docx base) para Ingeniería en Sistemas. Si no existe plantilla, usar parámetros de `08c-preparacion-maquetacion.md` | Autor |
| 2 | Obtener EV-5B-02 — detalle de candidato en admin | Ejecutar el sistema con un candidato que haya completado el psicométrico con 20 respuestas válidas; navegar a `/admin/attempts/[id]` y capturar | Autor + script |
| 3 | Obtener EV-5B-03 — formulario de decisión admin | Capturar junto con EV-5B-02 en la misma sesión | Autor + script |
| 4 | Verificar visualmente EV-5A-17 | Abrir `evidencias/08c/candidato/EV-5A-17-resultado-psicometrico.png` y confirmar que muestra puntuaciones > 0 y clasificación visible. Si muestra 0s, re-capturar | Autor |
| 5 | Maquetar documento Word completo | Seguir el orden de ensamblaje en `08c-preparacion-maquetacion.md` §4; insertar todos los textos, figuras y tablas | Autor |

---

## Prioridad ALTA — No bloquean el Word pero sí la versión impresa final

| # | Tarea | Detalles | Responsable |
|---|---|---|---|
| 6 | Obtener 4 capturas de Supabase Studio | Captura manual en https://supabase.com/dashboard/project/uilqwyrslwrkeubaayoi de: (a) Table Editor con 13 tablas, (b) tabla questions con 20 ítems, (c) Auth dashboard con usuarios, (d) tabla user_roles | Autor |
| 7 | Reemplazar ASCII art Fig. 5.1 con imagen vectorial (E-09) | Crear diagrama de arquitectura de capas como imagen real (puede ser Mermaid, Draw.io o similar); reemplazar el bloque de texto en §5.2 | Autor |
| 8 | Generar índices automáticos en Word | Una vez ensamblado el cuerpo, insertar Índice general, Índice de figuras e Índice de tablas usando los campos automáticos de Word | Autor |
| 9 | Exportar PDF final | Usar "Exportar a PDF" de Word o impresora PDF; verificar que los hipervínculos del índice funcionen en el PDF | Autor |

---

## Prioridad MEDIA — Mejoran la calidad académica

| # | Tarea | Detalles | Responsable |
|---|---|---|---|
| 10 | Verificar referencia B-04 (React 19 blog post) | Abrir https://react.dev/blog y confirmar la fecha exacta del post de lanzamiento de React 19; actualizar en `referencias/bibliografia-final.md` | Autor |
| 11 | Verificar referencia B-15 (SEGOB CURP) | Determinar si la cita correcta es el DOF (Acuerdo Secretarial de 1996), la página gob.mx, o la circular SEGOB 2024; actualizar la entrada | Autor |
| 12 | Verificar referencia B-20 (Clariana & Wallace 2002) | Leer §3.7 del Cap. III y confirmar que la afirmación sobre evaluaciones digitales está correctamente respaldada por este artículo | Autor |
| 13 | Identificar artículo específico de Nielsen Norman Group (B-26) | Sustituir la referencia general al sitio por un artículo específico (ej. "10 Usability Heuristics for User Interface Design") | Autor |
| 14 | Verificar datos de B-33 (Arciniega Robles 2026) | Abrir `referencias/analisis-diseno-uces.pdf` y confirmar: título exacto, nombre completo del autor, programa, institución, año en portada | Autor |
| 15 | Agregar fechas de acceso a todas las URLs en bibliografía | Para cada entrada con URL, agregar "Recuperado el [fecha de último acceso]" — formato APA 7 | Autor |

---

## Prioridad BAJA — Para versión de defensa (no afectan aprobación)

| # | Tarea | Detalles |
|---|---|---|
| 16 | Normalizar uso de "instrumento" vs. "cuestionario" (IM-05) | Revisión extensiva opcional; el asesor puede solicitarla; no urgente |
| 17 | Agregar nota al pie sobre RFC 2616 obsoleto (BIB-03) | Indicar que RFC 9110 (2022) es el sucesor; agregar solo si el asesor lo requiere |
| 18 | Revisar pertinencia de Kleppmann (2017) en §3.10 | Confirmar que la cita sobre datos en escala respalda exactamente la afirmación del texto |
| 19 | Considerar agregar glosario de siglas | Útil para lectores no técnicos; no es obligatorio según la plantilla estándar |
| 20 | Revisar coherencia de tiempos verbales en Cap. VII | Asegurar que las conclusiones usan pasado (implementación completada) de forma consistente |

---

## Resumen del estado post-Corte 8C

| Indicador | Valor |
|---|---|
| Capítulos redactados y corregidos | **7/7** |
| Palabras totales (7 capítulos) | **36,478** |
| Diagramas exportados | **6 PNG + 6 SVG** |
| Capturas Categoría A obtenidas | **15/21** |
| Capturas Categoría A pendientes | **6** (2 con datos + 4 Supabase Studio) |
| Referencias APA 7 verificadas | **25/33** |
| Resumen y Abstract | **Sí** |
| Listo para iniciar maquetación Word | **SÍ** — con marcadores de posición para figuras pendientes |
| Listo para entrega académica definitiva | **NO** — pending EV-5B-02, EV-5B-03, plantilla Word, EV-5A-17 verificación |

---

## Archivos entregables generados en el Corte 8C

| Archivo | Estado |
|---|---|
| `evidencias/08c/README.md` | CREADO |
| `evidencias/08c/candidato/` — 14 PNG | CREADOS (13 aceptados, 1 a verificar) |
| `evidencias/08c/administrador/` — 1 PNG | CREADO |
| `evidencias/08c/validaciones/` — 3 PNG | CREADOS |
| `evidencias/08c/captura-v2.js` | CREADO |
| `evidencias/08c/captura-resultado-v2.json` | CREADO |
| `08c-reporte-evidencias.md` | CREADO |
| `08c-matriz-capturas.md` | CREADO |
| `08c-control-calidad-visual.md` | CREADO |
| `08c-plan-integracion-figuras.md` | CREADO |
| `08c-preparacion-maquetacion.md` | CREADO |
| `08c-pendientes-finales.md` | Este archivo |
