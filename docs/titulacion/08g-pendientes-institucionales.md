# Pendientes institucionales — Corte 8G

**Fecha:** 2026-10-23
**Versión actual:** v0.4 — 162 páginas
**Próxima versión objetivo:** v1.0 (entrega académica definitiva)

---

## Checklist para versión v1.0

| # | Condición | Responsable | Estado |
|---|---|---|---|
| 1 | Matrícula del autor confirmada e incluida en portada | El autor → actualizar en `generar-docx-v04.py` → `DATOS["matricula"]` | PENDIENTE |
| 2 | Fecha de presentación confirmada e incluida | El autor → actualizar en `generar-docx-v04.py` → `DATOS["fecha"]` | PENDIENTE |
| 3 | Logo institucional ITESZ incorporado en portada | El autor (proporcionar PNG/SVG) | PENDIENTE |
| 4 | Plantilla Word ITESZ aplicada (si existe oficialmente) | El autor / coordinación de residencias | PENDIENTE |
| 5 | EV-5B-02 capturada (detalle admin /admin/attempts/[id]) | El autor (requiere candidato con intento completo) | PENDIENTE |
| 6 | EV-5B-03 capturada (formulario de decisión admin) | El autor (misma sesión que EV-5B-02) | PENDIENTE |
| 7 | EV-5A-17 re-capturada con scores por rasgo visibles | El autor (candidato con 20 ítems respondidos y procesados) | PENDIENTE |
| 8 | EV-6C-06 re-capturada con sesión admin activa | El autor (Postman con Bearer token de admin) | PENDIENTE |
| 9 | 4 capturas Supabase Studio | El autor (acceso manual al dashboard) | PENDIENTE |
| 10 | Fechas de acceso en URLs de bibliografía (5+ entradas) | El autor | PENDIENTE |
| 11 | B-26 (NN/g): identificar artículo específico de 10 heurísticas | El autor / asesor | PENDIENTE |
| 12 | B-04 (React 19): verificar URL accesible | El autor | PENDIENTE |
| 13 | Arciniega Robles: confirmar título, nombre y año en PDF | El autor | PENDIENTE |
| 14 | TOC actualizado tras cualquier edición manual en Word | El autor (Ctrl+A → F9) | AL REGENERAR |
| 15 | Inspección visual página por página | El autor en Word/Acrobat | PENDIENTE |
| 16 | Aprobación del asesor Dr. Francisco Rodríguez | El asesor | PENDIENTE |

---

## Grupo 1 — Datos institucionales

| # | Dato | Cómo actualizar en el generador |
|---|---|---|
| 1 | Matrícula del autor | En `generar-docx-v04.py` → `DATOS` → agregar campo `"matricula"` → insertar en `add_cover()` |
| 2 | Fecha de presentación | En `generar-docx-v04.py` → `DATOS` → agregar campo `"fecha"` → insertar en `add_cover()` bajo "Zamora, Michoacán..." |
| 3 | Logo ITESZ | Proporcionar `logo-itesz.png`; insertar en `add_cover()` con `doc.add_picture()` arriba de la institución |

---

## Grupo 2 — Capturas pendientes

| # | ID | fig_num | Descripción | Cómo obtener |
|---|---|---|---|---|
| 4 | EV-5B-02 | 5.16 | Vista de detalle de candidato en /admin/attempts/[id] | Candidato responde 20 ítems → admin accede a la URL con el attemptId |
| 5 | EV-5B-03 | 5.17 | Formulario de decisión de aprobación/rechazo | Misma sesión que EV-5B-02, hacer clic en "Revisar" |
| 6 | EV-5A-17 | 5.20 | Resultado psicométrico con scores por rasgo | Candidato completa 20 ítems → ver /resultado/[attemptId] |
| 7 | EV-6C-06 | 6.3 | GET /api/admin/vacancies/[id]/stats con sesión admin activa | Postman: `Authorization: Bearer <admin_jwt>` |
| 8 | EV-5A-04 | — | Supabase Studio — 13 tablas en Table Editor | https://supabase.com/dashboard/project/uilqwyrslwrkeubaayoi |
| 9 | EV-5B-12 | — | Supabase Studio — tabla questions con 20 ítems | Supabase Studio → Table Editor → questions |
| 10 | EV-6C-01 | — | Supabase Studio — Auth dashboard | Supabase Studio → Authentication |
| 11 | EV-6C-02 | — | Supabase Studio — tabla user_roles | Supabase Studio → Table Editor → user_roles |

---

## Grupo 3 — Verificaciones bibliográficas manuales

| # | Ref | Acción pendiente |
|---|---|---|
| 12 | B-26 (NN/g) | Verificar si §3.9 cita las 10 heurísticas originales (Nielsen 1994) o la versión actualizada de NN/g. Identificar URL específica: https://www.nngroup.com/articles/ten-usability-heuristics/ |
| 13 | Vercel 2024a,b | Confirmar URLs de Next.js y Vercel docs y agregar "Recuperado el [fecha] de [URL]" |
| 14 | Supabase 2024a–d | Agregar "Recuperado el [fecha] de [URL]" a las 4 entradas |
| 15 | Meta OS 2024b | Verificar accesibilidad de https://react.dev/blog/2024/12/05/react-19 y agregar fecha de acceso |
| 16 | Arciniega Robles 2026 | Confirmar título exacto, nombre completo (¿Francisco Daniel o Daniel Francisco?) y año en portada del PDF `analisis-diseno-uces.pdf` |

---

## Grupo 4 — Mejoras editoriales opcionales para v1.0

| # | Tarea | Impacto |
|---|---|---|
| 17 | Corregir keyword de Figs 5.19 y 5.21 (de "Evaluación psicométrica"/"psicométrico" a "5.11") | Mover las figuras al capítulo correcto (~p.118) |
| 18 | Implementar referencias cruzadas REF de Word (campos vinculados a bookmarks) | Profesionalismo editorial — referencias actualizables automáticamente |
| 19 | Mover bloques de código >30 líneas de Cap V a Anexo A | Reducción de ~6–8 páginas en Cap V |
| 20 | Agregar Glosario | Requerido si el asesor lo solicita |
| 21 | Agregar Anexos (A, B, C) | Optativo |

---

## Resumen del estado por versión

| Versión | Páginas | Figuras | Tablas | Portada | Refs cruzadas | Estado |
|---|---|---|---|---|---|---|
| v0.1 (8D) | 168 | 14/25 | 33 sin caption | Incompleta | 0 | Borrador inicial |
| v0.2 (8E) | 150 | 25/25 | 33 sin caption | Incompleta | 0 | Figuras completas |
| v0.3 (8F) | 163 | 25/25 | 33 con caption | Datos confirmados | 5/25 | Borrador avanzado |
| **v0.4 (8G)** | **162** | **26/26** | **33 con caption** | **Sin frase innecesaria** | **26/26** | **Borrador avanzado+** |
| v1.0 (meta) | ~165–175 | 26+8 | 33 | Completa con logo | 26/26 | Entrega definitiva |

> v1.0 requerirá las 8 capturas pendientes, los datos faltantes (matrícula, fecha, logo) y la verificación del asesor.
