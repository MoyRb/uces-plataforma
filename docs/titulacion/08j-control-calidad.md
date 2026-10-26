# 08j-control-calidad.md
# Corte 8J — Control de calidad v0.7
**Fecha:** 2026-10-25

---

## 1. Métricas estimadas

| Métrica | v0.6 | v0.7 estimado |
|---------|------|---------------|
| Tamaño DOCX | 3,712 KB | ~4,200 KB (+2 capturas admin) |
| Tamaño PDF | 3,535 KB | ~4,000 KB |
| Figuras totales | 30 | 29 (eliminada Fig 5.10) |
| Figuras reales | 27 (90%) | 29 (100%) |
| Marcadores (placeholder) | 3 | 0 |
| Tablas | 33 | 33 |
| Páginas estimadas | ~165 | ~165-167 |

---

## 2. Verificaciones de correcciones J01–J04

### J01 — EV-5B-02 como Fig 5.15

| Verificación | Estado |
|-------------|--------|
| Ruta en FIGURE_PLACEMENTS | `IMGS_8J / "EV-5B-02-admin-detalle-candidato.png"` |
| Archivo esperado | `evidencias/08j/administrador/EV-5B-02-admin-detalle-candidato.png` |
| Caption actualizado | "Figura 5.15. Vista de detalle de candidato..." |
| Cross-ref text actualizado | "La Figura 5.15 muestra..." |
| Script de captura | `captura-v3.js` listo |

### J02 — EV-5B-03 como Fig 5.16

| Verificación | Estado |
|-------------|--------|
| Ruta en FIGURE_PLACEMENTS | `IMGS_8J / "EV-5B-03-admin-decision.png"` |
| Archivo esperado | `evidencias/08j/administrador/EV-5B-03-admin-decision.png` |
| Caption actualizado | "Figura 5.16. Formulario de decisión..." |
| Cross-ref text actualizado | "La Figura 5.16 muestra..." |
| Script de captura | `captura-v3.js` listo |

### J03 — Regla de Cierre EV-5A-11

| Verificación | Estado |
|-------------|--------|
| Fig 5.10 (EV-5A-11) eliminada de FIGURE_PLACEMENTS | ✓ |
| Nota arquitectónica en §5.5.1 de Cap V | ✓ |
| Fig 5.11 (EV-5A-12) renumerada → 5.10 | ✓ |
| Fig 5.12 (EV-5A-19) renumerada → 5.11 | ✓ |
| Fig 5.13 (EV-5B-01) renumerada → 5.12 | ✓ |
| Fig 5.14 (EV-5B-08) renumerada → 5.13 | ✓ |
| Fig 5.15 (requireAdmin diagram) renumerada → 5.14 | ✓ |
| Fig 5.18 (EV-5B-13) renumerada → 5.17 | ✓ |
| Fig 5.19 (EV-5A-15) renumerada → 5.18 | ✓ |
| Fig 5.20 (EV-5A-17) renumerada → 5.19 | ✓ |
| Fig 5.21 (psico diagram) renumerada → 5.20 | ✓ |
| Fig 5.22 (EV-5B-15) renumerada → 5.21 | ✓ |

### J04 — Referencias Supabase Studio en Cap V

| Párrafo | Antes | Después | Estado |
|---------|-------|---------|--------|
| §5.2.2 | "La Figura 5.24 ilustra..." | "La Figura 5.23 ilustra..." | ✓ |
| §5.9.6 | "La Figura 5.23 muestra..." | "La Figura 5.22 muestra..." | ✓ |
| §5.10.1 | "La Figura 5.25 muestra..." | "La Figura 5.24 muestra..." | ✓ |
| §5.10.9 | "La Figura 5.26 presenta..." | "La Figura 5.25 presenta..." | ✓ |

---

## 3. Correcciones heredadas (v0.5 → v0.6 → v0.7)

| Corrección | Versión | Estado en v0.7 |
|-----------|---------|----------------|
| MATRÍCULA: 22010350 en portada (H01) | v0.5 | ✓ Conservada |
| Header sin "Reporte de Titulación" (H02) | v0.5 | ✓ Conservada |
| Abstract eliminado (H03) | v0.5 | ✓ Conservada |
| Fig 5.19→5.18 keyword "5.11.1" (H04) | v0.5 | ✓ Conservada (renumerada) |
| Fig 5.21→5.20 keyword "5.11.3" (H05) | v0.5 | ✓ Conservada (renumerada) |
| 4 capturas Supabase Studio (I01) | v0.6 | ✓ Conservadas (renumeradas 5.22-5.25) |
| Párrafos académicos Cap V (I02) | v0.6 | ✓ Conservados (refs actualizadas) |

---

## 4. Lista de verificación visual (abrir v0.7 en Word)

- [ ] Portada: "MATRÍCULA: 22010350" visible
- [ ] Header: "ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES" (sin "Reporte de Titulación")
- [ ] NO existe sección ABSTRACT
- [ ] Fig 5.10: detalle de vacante con botón de postulación (EV-5A-12, real)
- [ ] §5.5.1: nota arquitectónica sobre ausencia de `/vacantes` visible como blockquote
- [ ] Fig 5.15: vista de detalle de candidato en panel admin (EV-5B-02, real)
- [ ] Fig 5.16: formulario de decisión con selector y botones (EV-5B-03, real)
- [ ] **0 marcadores rojos/amarillos** — todas las figuras son capturas reales
- [ ] Figs 5.22-5.25: capturas de Supabase Studio legibles
- [ ] TOC, TOF, TOT actualizados (Ctrl+A → F9 en Word)
- [ ] ~165-167 páginas

---

## 5. Defectos activos post-Corte 8J

| ID | Severidad | Descripción | Para versión |
|----|-----------|-------------|-------------|
| P0-01 | P0 | Fecha de presentación pendiente de confirmación institucional | v1.0 |
| P0-02 | P0 | Aprobación del asesor Dr. Francisco Rodríguez | v1.0 |
| P0-03 | P0 | TOC placeholder hasta apertura en Word | Instrucción usuario |
| P2-01 | P2 | Fig 5.19 (EV-5A-17): verificar que scores sean > 0 | Verificar |
| P2-02 | P2 | Logo ITESZ no incluido | v1.0 |
| P2-03 | P2 | Bibliografía: fechas de acceso en entradas web | Verificar |
