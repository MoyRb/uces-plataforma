# Control de evidencias — Corte 8E

**Fecha:** 2026-10-23
**Versión:** v0.2

---

## 1. Inventario completo de figuras en v0.2

| # | ID | fig_num | Archivo | Estado en v0.2 | Página v0.2 | Observaciones |
|---|---|---|---|---|---|---|
| 1 | — | 5.2 | fig-5-2-secuencia-registro.png | INSERTADA | 74 | Diagrama Mermaid — registro candidato |
| 2 | — | 5.3 | fig-5-3-secuencia-postulacion.png | INSERTADA | 81 | Diagrama Mermaid — NUEVO en v0.2 |
| 3 | EV-5A-02 | 5.4 | EV-5A-02-landing.png | INSERTADA | 70 | Landing page |
| 4 | — | 5.5 | fig-5-5-persistencia-decisiones.png | INSERTADA | 72 | Diagrama Mermaid — NUEVO en v0.2 |
| 5 | EV-5A-06 | 5.6 | EV-5A-06-curp-duplicada.png | INSERTADA | 72 | Error CURP |
| 6 | EV-5A-07 | 5.7 | EV-5A-07-login.png | INSERTADA | 73 | Login form |
| 7 | EV-5A-04 | 5.8 | fig-5-4-secuencia-evidencias.png | INSERTADA | 88 | Diagrama Mermaid — evidencias |
| 8 | EV-5A-09 | 5.9 | EV-5A-09-panel-candidato.png | INSERTADA | 77 | Panel candidato — SIN duplicado |
| 9 | EV-5A-11 | 5.10 | — | PLACEHOLDER | 78 | Ruta /vacantes no existe; caption actualizado |
| 10 | EV-5A-12 | 5.11 | EV-5A-12-detalle-vacante.png | INSERTADA | 79 | Detalle vacante |
| 11 | EV-5A-19 | 5.12 | EV-5A-19-subida-evidencia.png | INSERTADA | 81 | Subida evidencia |
| 12 | EV-5B-01 | 5.13 | EV-5B-01-admin-panel.png | INSERTADA | 91 | Panel admin |
| 13 | EV-5B-08 | 5.14 | EV-5B-08-acceso-denegado.png | INSERTADA | 98 | Acceso denegado — NUEVO en v0.2 |
| 14 | — | 5.15 | fig-5-6-flujo-requireAdmin.png | INSERTADA | 100 | Diagrama flujo requireAdmin |
| 15 | EV-5B-02 | 5.16 | — | PLACEHOLDER | 97 | Admin detalle — pendiente de captura |
| 16 | EV-5B-03 | 5.17 | — | PLACEHOLDER | 95 | Formulario decisión — pendiente de captura |
| 17 | EV-5B-13 | 5.18 | EV-5B-13-guard-prereq.png | INSERTADA | 106 | Guard prerequisito |
| 18 | EV-5A-15 | 5.19 | EV-5A-15-psicometrico-preguntas.png | INSERTADA | 38* | Likert preguntas |
| 19 | EV-5A-17 | 5.20 | EV-5A-17-resultado-psicometrico.png | INSERTADA | 109 | Confirmación envío — NUEVO en v0.2 |
| 20 | — | 5.21 | fig-5-7-inicio-psicometrico.png | INSERTADA | 54* | Diagrama inicio psicométrico |
| 21 | EV-5B-15 | 5.22 | EV-5B-15-d01-guard-score.png | INSERTADA | 118 | Discrepancia D-01 |
| 22 | EV-6C-04 | 6.1 | EV-6C-04-cp07-guard-d01.png | INSERTADA | 128 | CP-07 guard |
| 23 | EV-6C-05 | 6.2 | EV-5A-17-resultado-psicometrico.png | INSERTADA | 133 | CP-20 evidencia — NUEVO en v0.2 |
| 24 | EV-6C-06 | 6.3 | EV-6C-06-cp18-stats-d03.png | INSERTADA | 131 | CP-18 estadísticas — NUEVO en v0.2 |
| 25 | EV-6C-07 | 6.4 | EV-6C-07-cp22-rls.png | INSERTADA | 131 | CP-22 RLS |

> \* Los números de página para Fig 5.19 (p.38) y Fig 5.21 (p.54) sugieren que los marcadores de estas figuras aparecen en texto de capítulos anteriores (probablemente cross-references o en el resumen). La extracción de texto por pypdf detecta el texto "Figura 5.19" en ese contexto, no la imagen real. Las imágenes están posicionadas correctamente en §5.11 y §5.11 respectivamente.

---

## 2. Comparativa de estado v0.1 → v0.2

| Categoría | v0.1 | v0.2 | Cambio |
|---|---|---|---|
| Insertadas (imagen real) | 14 | 22 | +8 nuevas |
| Placeholders (sin imagen) | 3 | 3 | Sin cambio (EV-5A-11, EV-5B-02, EV-5B-03) |
| No colocadas | 8 | 0 | -8 (todas colocadas) |
| Figuras duplicadas | Múltiples (P1-01) | 0 | Resuelto |
| **Total entradas FIGURE_PLACEMENTS** | **23** | **25** | +2 (fig-5-3, fig-5-5) |

---

## 3. Capturas pendientes de re-obtención

Las siguientes capturas siguen siendo válidas como evidencias pero tienen limitaciones documentadas:

| ID | fig_num | Limitación documentada | Acción para v0.3 |
|---|---|---|---|
| EV-5A-11 | 5.10 | Ruta /vacantes no existe en la app | Caption actualizado explicando la decisión arquitectónica |
| EV-5A-17 | 5.20 | Muestra UNDER_REVIEW, no scores individuales | Re-capturar con candidato que haya completado 20 ítems |
| EV-5B-02 | 5.16 | No capturada — placeholder | Requiere candidato con intento completo en BD |
| EV-5B-03 | 5.17 | No capturada — placeholder | Requiere misma sesión que EV-5B-02 |
| EV-6C-06 | 6.3 | Muestra error 401 (sin sesión), no D-03 real | Re-capturar con sesión admin activa vía Postman |

---

## 4. Capturas de Supabase Studio (pendientes manuales)

| ID | Descripción | Dónde capturar |
|---|---|---|
| EV-5A-04 | 13 tablas en Table Editor | https://supabase.com/dashboard/project/uilqwyrslwrkeubaayoi |
| EV-5B-12 | Tabla questions con 20 ítems | Supabase Studio → Table Editor → questions |
| EV-6C-01 | Auth dashboard con usuarios | Supabase Studio → Authentication |
| EV-6C-02 | Tabla user_roles | Supabase Studio → Table Editor → user_roles |

Estas 4 capturas requieren acceso manual al dashboard de Supabase. No han sido incorporadas en v0.2.

---

## 5. Estado de evidencias API (Cap VI)

Las evidencias del Cap VI provienen del Corte 6B (sesión 6B-S1). Ver `evidencias/06b/README.md`.

| Tipo | Cantidad | Estado |
|---|---|---|
| Evidencias API (JSON) en Corte 6B | 21 | VÁLIDAS — incorporadas en texto del Cap VI |
| Capturas de pantalla Cap VI | 3 | INSERTADAS en v0.2 (EV-6C-04, EV-6C-06, EV-6C-07) |
| Capturas de pantalla CP-18 (real) | 0 | EV-6C-06 muestra error 401, no resultado real de D-03 |
