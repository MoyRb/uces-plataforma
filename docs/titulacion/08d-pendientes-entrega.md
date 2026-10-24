# Pendientes de entrega — post-Corte 8D

**Fecha:** 2026-10-23
**Estado:** Versión v0.1 generada — pendientes antes de versión definitiva (v1.0)

---

## Acciones requeridas para versión v0.2 (próxima revisión)

### Grupo 1 — Correcciones al script `generar-docx.py`

| # | Corrección | Prioridad | Defecto que corrige |
|---|---|---|---|
| 1 | Cambiar keyword `"5.4"` por `"Panel del candidato"` o `"§5.4"` para evitar que Fig. 5.9 se inserte en §7.5.4 de Cap VII | ALTA | P1-01 |
| 2 | Agregar keywords exactos para: EV-5A-17, EV-5B-08, EV-6C-05, EV-6C-06 | ALTA | P1-03 |
| 3 | Agregar keywords para fig-5-3-secuencia-postulacion y fig-5-5-persistencia-decisiones | MEDIA | P1-04 |
| 4 | Mejorar el parser para líneas `**XX-NN.** texto...` → lista con sangría | MEDIA | P1-07 |
| 5 | Agregar header con título abreviado y footer con número de página | MEDIA | P2-02, P2-03 |
| 6 | Agregar `keep_together=True` en párrafos de código para evitar cortes entre páginas | BAJA | P2-04 |
| 7 | Reemplazar saltos de página explícitos al final de capítulo por saltos de sección | BAJA | P2-06 |

### Grupo 2 — Datos institucionales a confirmar

| # | Dato | Dónde confirmar |
|---|---|---|
| 8 | Nombre completo del autor | Con el autor |
| 9 | Número de matrícula del autor | Con el autor |
| 10 | Nombre completo del asesor designado | Con la institución |
| 11 | Plantilla Word oficial de UCES (o confirmación de que no existe) | Con coordinación de residencias |
| 12 | Logo institucional UCES en formato PNG o SVG | Con la institución |
| 13 | Ciudad y fecha exacta de entrega | Con el autor |

### Grupo 3 — Capturas pendientes de obtención

| # | ID | Descripción | Cómo obtener |
|---|---|---|---|
| 14 | EV-5A-11 | Re-captura de `/vacantes` con vacantes activas | Ejecutar `captura-v2.js` con datos actualizados (verificar que la vacante exista y la ruta no devuelva 404) |
| 15 | EV-5B-02 | Panel admin — detalle candidato con intento completo | Candidato debe responder los 20 ítems psicométricos; luego admin accede a `/admin/attempts/[id]` |
| 16 | EV-5B-03 | Panel admin — formulario de decisión | Capturar en misma sesión que EV-5B-02 |
| 17 | EV-5A-17 (nueva) | Resultado psicométrico con scores por rasgo visibles | Re-capturar con candidato que haya respondido los 20 ítems; la imagen actual muestra "0 contestadas" |
| 18 | EV-5A-04 | Supabase Studio — 13 tablas en Table Editor | Captura manual en https://supabase.com/dashboard/project/uilqwyrslwrkeubaayoi |
| 19 | EV-5B-12 | Supabase Studio — tabla questions con 20 ítems | Captura manual |
| 20 | EV-6C-01 | Supabase Studio — Auth dashboard | Captura manual |
| 21 | EV-6C-02 | Supabase Studio — tabla user_roles | Captura manual |
| 22 | EV-6C-06 (nueva) | Endpoint `/api/admin/stats` con sesión admin — respuesta JSON real | Re-capturar con sesión admin activa (inyectar sesión vía localStorage o usar Postman) |

### Grupo 4 — Verificaciones bibliográficas manuales

| # | Ref. | Acción |
|---|---|---|
| 23 | B-04 | Abrir https://react.dev/blog y confirmar fecha exacta del post de React 19 |
| 24 | B-15 | Determinar la cita correcta para CURP (DOF 1996, gob.mx o circular SEGOB 2024) |
| 25 | B-20 | Leer §3.7 de Cap III y confirmar que Clariana & Wallace (2002) respalda la afirmación |
| 26 | B-26 | Identificar artículo específico de Nielsen Norman Group (ej. "10 Usability Heuristics") |
| 27 | B-33 | Abrir `referencias/analisis-diseno-uces.pdf` y confirmar: título, nombre, programa, año |

### Grupo 5 — Correcciones editoriales directas en DOCX

| # | Tarea | Dónde |
|---|---|---|
| 28 | Actualizar el índice general en Word (Referencias → Tabla de contenido → Actualizar) | p.6 |
| 29 | Insertar índice de figuras (Referencias → Insertar tabla de ilustraciones) | Tras TOC |
| 30 | Insertar índice de tablas (ídem, tipo Tabla) | Tras índice de figuras |
| 31 | Verificar y eliminar la Fig. 5.9 duplicada en §7.5.4 de Cap VII | ~p.160 |
| 32 | Agregar leyendas "Tabla X.Y." encima de cada tabla en el cuerpo | Caps III–VII |
| 33 | Verificar que referencias cruzadas "Ver Figura X.Y" coincidan con numeración real | Caps V–VI |
| 34 | Reemplazar Fig. 5.1 (ASCII art) por imagen vectorial de arquitectura | §5.2 ~p.66 |
| 35 | Agregar fechas de acceso ("Recuperado el…") en las 8 referencias PENDIENTE de bibliografía | pp.166–168 |

---

## Checklist de condición para versión definitiva (v1.0)

| Condición | Estado |
|---|---|
| Datos institucionales de portada completos | PENDIENTE |
| Plantilla Word UCES aplicada (o parámetros confirmados) | PENDIENTE |
| EV-5A-11 re-capturada (sin 404) | PENDIENTE |
| EV-5B-02 y EV-5B-03 obtenidas | PENDIENTE |
| EV-5A-17 muestra scores psicométricos reales | PENDIENTE |
| 4 capturas de Supabase Studio incluidas | PENDIENTE |
| Bug P1-01 (Fig. 5.9 en §7.5.4) corregido | PENDIENTE |
| Fig. 5.1 ASCII art reemplazada por imagen | PENDIENTE |
| Fig. 5-3 y 5-5 (Mermaid) insertadas | PENDIENTE |
| TOC real generado y actualizado | PENDIENTE |
| Índices de figuras y tablas generados | PENDIENTE |
| Leyendas "Tabla X.Y." encima de cada tabla | PENDIENTE |
| Verificación manual de 5 referencias bibliográficas | PENDIENTE |
| Fechas de acceso en URLs de bibliografía | PENDIENTE |
| Inspección visual completa página por página | PENDIENTE |
| Aprobación por el asesor | PENDIENTE |
| Logo institucional en portada | PENDIENTE |

---

## Resumen de estado al cierre del Corte 8D

| Indicador | Valor |
|---|---|
| Versión generada | v0.1 |
| DOCX generado | SÍ — `entregables/UCES_Trabajo_B_Revision_v01.docx` (2,065 KB) |
| PDF generado | SÍ — `entregables/UCES_Trabajo_B_Revision_v01.pdf` (2,424 KB) |
| Páginas reales | **168** |
| Figuras en cuerpo del documento | **14 reales + 3 marcadores** |
| Tablas integradas | **33** |
| Capturas pendientes para v0.2 | **9 correcciones o re-capturas** |
| Referencias pendientes de verificación | **8 de 33** |
| Defectos totales identificados | **3 P0 + 9 P1 + 6 P2** |
| Listo para revisión del asesor (borrador) | **SÍ — con advertencia de P0-01 (portada incompleta)** |
| Listo para entrega académica definitiva | **NO — ver checklist arriba** |
