# Pendientes de entrega — post-Corte 8E

**Fecha:** 2026-10-23
**Estado:** Versión v0.2 generada — pendientes antes de versión definitiva (v1.0)

---

## Checklist de condición para versión definitiva (v1.0)

| # | Condición | Estado |
|---|---|---|
| 1 | Datos institucionales de portada completos | PENDIENTE |
| 2 | Plantilla Word UCES aplicada (o parámetros confirmados) | PENDIENTE |
| 3 | TOC real generado y actualizado | PENDIENTE — abrir DOCX en Word y actualizar |
| 4 | Índices de figuras y tablas generados | PENDIENTE |
| 5 | EV-5B-02 (detalle admin) capturada | PENDIENTE |
| 6 | EV-5B-03 (formulario decisión) capturada | PENDIENTE |
| 7 | EV-5A-17 re-capturada con scores reales | PENDIENTE |
| 8 | EV-6C-06 re-capturada con sesión admin activa | PENDIENTE |
| 9 | 4 capturas de Supabase Studio incluidas | PENDIENTE |
| 10 | Fig 5.1 (ASCII art) reemplazada por imagen | PENDIENTE |
| 11 | 5 referencias bibliográficas verificadas | PENDIENTE |
| 12 | Fechas de acceso en URLs de bibliografía | PENDIENTE |
| 13 | Leyendas "Tabla X.Y." encima de cada tabla | PENDIENTE |
| 14 | Logo institucional en portada | PENDIENTE |
| 15 | Inspección visual completa página por página | PENDIENTE |
| 16 | Aprobación por el asesor | PENDIENTE |

---

## Grupo 1 — Datos institucionales (BLOQUEANTE para v1.0)

| # | Dato | Quién confirma |
|---|---|---|
| 1 | Nombre completo del autor | El autor |
| 2 | Número de matrícula | El autor |
| 3 | Nombre completo del asesor designado | La institución |
| 4 | Plantilla Word oficial UCES | Coordinación de residencias |
| 5 | Logo institucional UCES (PNG/SVG) | La institución |
| 6 | Ciudad y fecha exacta de entrega | El autor |

---

## Grupo 2 — Acciones manuales en Word (post-generación DOCX)

| # | Tarea | Instrucción | Dónde |
|---|---|---|---|
| 7 | Actualizar TOC | Referencias → Tabla de contenido → Actualizar tabla | p.6 |
| 8 | Insertar índice de figuras | Referencias → Insertar tabla de ilustraciones | Tras TOC |
| 9 | Insertar índice de tablas | Referencias → Insertar tabla de ilustraciones → Tipo: Tabla | Tras índice de figuras |
| 10 | Agregar leyendas "Tabla X.Y." | Insertar encima de cada tabla en Word: "Tabla X.Y. Descripción." en negrita | Caps III–VII |
| 11 | Verificar referencias cruzadas | Confirmar que "Ver Figura X.Y" coincide con numeración real | Caps V–VI |

---

## Grupo 3 — Capturas pendientes de obtención

| # | ID | fig_num | Descripción | Cómo obtener |
|---|---|---|---|---|
| 12 | EV-5B-02 | 5.16 | Admin: detalle de intento con 20 ítems respondidos | Candidato debe responder 20 ítems psicométricos; admin accede a /admin/attempts/[id] |
| 13 | EV-5B-03 | 5.17 | Admin: formulario de decisión | Capturar en misma sesión que EV-5B-02 |
| 14 | EV-5A-17 | 5.20 | Resultado psicométrico con scores por rasgo | Re-capturar con candidato que haya completado 20 ítems; la imagen actual muestra UNDER_REVIEW |
| 15 | EV-6C-06 | 6.3 | Endpoint /api/admin/stats con sesión admin | Inyectar sesión admin en localStorage o usar Postman con Authorization header |
| 16 | EV-5A-04 | — | Supabase Studio — 13 tablas en Table Editor | https://supabase.com/dashboard/project/uilqwyrslwrkeubaayoi → Table Editor |
| 17 | EV-5B-12 | — | Supabase Studio — tabla questions con 20 ítems | Supabase Studio → Table Editor → questions |
| 18 | EV-6C-01 | — | Supabase Studio — Auth dashboard | Supabase Studio → Authentication |
| 19 | EV-6C-02 | — | Supabase Studio — tabla user_roles | Supabase Studio → Table Editor → user_roles |

---

## Grupo 4 — Correcciones editoriales directas en DOCX

| # | Tarea | Dónde |
|---|---|---|
| 20 | Reemplazar Fig 5.1 (ASCII art de arquitectura) por imagen vectorial | §5.1.2 ~p.66 |
| 21 | Verificar y eliminar placeholder EV-5A-11 o actualizar con captura alternativa | §5.5 ~p.78 |
| 22 | Mover bloques de código >30 líneas de Cap V a Anexo A | pp.63–115 |
| 23 | Agregar Anexo A (código seleccionado) si se implementa | Tras referencias |

---

## Grupo 5 — Verificaciones bibliográficas manuales

| # | Ref | Acción |
|---|---|---|
| 24 | B-26 | Revisar §3.x del Cap III y confirmar si cita CHI'90 o NN/g heurísticas actuales |
| 25 | B-07 | Confirmar URL exacta de Vercel documentation y agregar fecha de acceso |
| 26 | B-12 | Confirmar URL exacta de Supabase documentation y agregar fecha de acceso |
| 27 | B-28 | Confirmar URL exacta de Next.js documentation y agregar fecha de acceso |
| 28 | B-04 | Abrir https://react.dev/blog/2024/12/05/react-19 y confirmar accesibilidad |
| 29 | Todos con URL | Agregar "Recuperado el [fecha] de [URL]" a las 5 referencias con URL sin DOI |

---

## Estado al cierre del Corte 8E

| Indicador | Valor |
|---|---|
| Versión generada | v0.2 |
| DOCX generado | SÍ — `entregables/UCES_Trabajo_B_Revision_v02.docx` (2,592 KB) |
| PDF generado | SÍ — `entregables/UCES_Trabajo_B_Revision_v02.pdf` (2,875 KB, 150 páginas) |
| Páginas reales | **150** (meta alcanzada) |
| Figuras colocadas (únicas) | **25 de 25 (100%)** |
| Figuras duplicadas | **0** (P1-01 resuelto) |
| Header / footer | **Implementados** |
| Defectos P0 activos | **2** (portada + TOC) |
| Defectos P1 activos | **7** |
| Defectos P2 activos | **3** |
| Pendientes totales para v1.0 | **29 ítems** |
| Listo para revisión del asesor (borrador v0.2) | **SÍ — calidad notablemente superior a v0.1** |
| Listo para entrega académica definitiva | **NO — ver checklist arriba** |
