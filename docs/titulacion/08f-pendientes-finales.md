# Pendientes finales — post-Corte 8F

**Fecha:** 2026-10-23
**Versión actual:** v0.3 — 163 páginas
**Próxima versión objetivo:** v1.0 (entrega académica definitiva)

---

## Checklist para versión v1.0

| # | Condición | Responsable | Estado |
|---|---|---|---|
| 1 | Matrícula del autor confirmada e incluida en portada | El autor → actualizar en generar-docx-v03.py | PENDIENTE |
| 2 | Fecha de presentación confirmada e incluida | El autor → actualizar en generar-docx-v03.py | PENDIENTE |
| 3 | Logo institucional ITESZ incorporado en portada | El autor (proporcionar PNG/SVG) | PENDIENTE |
| 4 | Plantilla Word ITESZ aplicada (si existe oficialmente) | El autor / coordinación de residencias | PENDIENTE |
| 5 | EV-5B-02 capturada (detalle admin /admin/attempts/[id]) | El autor (requiere candidato con intento completo) | PENDIENTE |
| 6 | EV-5B-03 capturada (formulario de decisión admin) | El autor (misma sesión que EV-5B-02) | PENDIENTE |
| 7 | EV-5A-17 re-capturada con scores por rasgo visibles | El autor (candidato con 20 ítems respondidos) | PENDIENTE |
| 8 | EV-6C-06 re-capturada con sesión admin activa | El autor (Postman o localStorage injection) | PENDIENTE |
| 9 | 4 capturas Supabase Studio | El autor (acceso manual al dashboard) | PENDIENTE |
| 10 | Fig 5.1 (ASCII art) reemplazada por imagen vectorial | Generar con Draw.io o Mermaid | PENDIENTE |
| 11 | 5 referencias bibliográficas verificadas manualmente | El autor / asesor | PENDIENTE |
| 12 | Fechas de acceso en URLs de bibliografía | El autor | PENDIENTE |
| 13 | TOC actualizado tras cualquier edición manual en Word | El autor (Ctrl+A → F9) | PENDIENTE |
| 14 | Inspección visual página por página | El autor en Word/Acrobat | PENDIENTE |
| 15 | Aprobación del asesor Dr. Francisco Rodríguez | El asesor | PENDIENTE |

---

## Grupo 1 — Datos institucionales aún pendientes

| # | Dato | Cómo actualizar |
|---|---|---|
| 1 | Matrícula del autor | En `generar-docx-v03.py` → `DATOS["matricula"]` → agregar campo |
| 2 | Fecha de presentación | En `generar-docx-v03.py` → `DATOS["fecha"]` → agregar campo en portada |
| 3 | Logo ITESZ | Proporcionar `logo-itesz.png`; insertar en portada con `add_picture()` |

---

## Grupo 2 — Capturas pendientes

| # | ID | fig_num | Descripción | Cómo obtener |
|---|---|---|---|---|
| 4 | EV-5B-02 | 5.16 | Vista de detalle de candidato en panel admin | Candidato responde 20 ítems; admin accede a /admin/attempts/[id] |
| 5 | EV-5B-03 | 5.17 | Formulario de decisión de aprobación/rechazo | Misma sesión que EV-5B-02 |
| 6 | EV-5A-17 | 5.20 | Resultado psicométrico con scores por rasgo | Candidato completa 20 ítems Likert; navegar a /resultado/[attemptId] |
| 7 | EV-6C-06 | 6.3 | GET /api/admin/vacancies/[id]/stats con sesión admin | Postman con Bearer token de admin, o inyectar sesión via localStorage |
| 8 | EV-5A-04 | — | Supabase Studio — 13 tablas en Table Editor | https://supabase.com/dashboard/project/uilqwyrslwrkeubaayoi |
| 9 | EV-5B-12 | — | Supabase Studio — tabla questions con 20 ítems | Supabase Studio → Table Editor → questions |
| 10 | EV-6C-01 | — | Supabase Studio — Auth dashboard | Supabase Studio → Authentication |
| 11 | EV-6C-02 | — | Supabase Studio — tabla user_roles | Supabase Studio → Table Editor → user_roles |

---

## Grupo 3 — Verificaciones bibliográficas manuales

| # | Ref | Acción pendiente |
|---|---|---|
| 12 | B-26 | Revisar Cap III §3.x y confirmar si cita CHI'90 o NN/g (10 heurísticas actuales) |
| 13 | B-07 | Confirmar URL de documentación Vercel y agregar fecha de acceso |
| 14 | B-12 | Confirmar URL de documentación Supabase y agregar fecha de acceso |
| 15 | B-28 | Confirmar URL de documentación Next.js y agregar fecha de acceso |
| 16 | B-04 | Verificar accesibilidad de https://react.dev/blog/2024/12/05/react-19 |
| 17 | Todos con URL | Agregar "Recuperado el [fecha] de [URL]" a las 5 referencias con URL sin DOI |

---

## Grupo 4 — Mejoras editoriales pendientes para v0.4 (opcionales antes de v1.0)

| # | Tarea | Impacto |
|---|---|---|
| 18 | Implementar referencias cruzadas REF de Word (campos vinculados a bookmarks) | Profesionalismo editorial — sin impacto en contenido |
| 19 | Mover bloques de código >30 líneas de Cap V a Anexo A | Reducción de ~8–10 páginas en Cap V |
| 20 | Agregar Glosario | Requerido si el asesor lo solicita |
| 21 | Agregar Anexos (A, B, C) | Optativo — ver recomendación en 08d-paginacion-real.md |

---

## Resumen del estado por versión

| Versión | Páginas | Figuras | Tablas | Índices | Portada | Estado |
|---|---|---|---|---|---|---|
| v0.1 (8D) | 168 | 14/25 | 33 sin caption | Placeholders | Incompleta | Borrador inicial |
| v0.2 (8E) | 150 | 25/25 | 33 sin caption | Placeholders | Incompleta | Figuras completas |
| **v0.3 (8F)** | **163** | **25/25** | **33 con caption** | **Reales (TOC+TOF+TOT)** | **Datos confirmados** | **Borrador avanzado** |
| v1.0 (meta) | ~165–175 | 25+8 | 33 | Reales | Completa con logo | Entrega definitiva |

> v1.0 requerirá las 8 capturas pendientes, los datos faltantes (matrícula, fecha, logo) y la verificación del asesor.
