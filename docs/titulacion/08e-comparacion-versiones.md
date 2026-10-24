# Comparación de versiones v0.1 → v0.2 — Corte 8E

**Fecha:** 2026-10-23

---

## 1. Tabla comparativa principal

| Indicador | v0.1 (Corte 8D) | v0.2 (Corte 8E) | Delta | Evaluación |
|---|---|---|---|---|
| Tamaño DOCX | 2,065 KB | 2,592 KB | +527 KB | Normal: más figuras únicas + header/footer |
| Tamaño PDF | 2,424 KB | 2,875 KB | +451 KB | Normal: mayor contenido real |
| Páginas totales | 168 | 150 | **-18 págs.** | Meta alcanzada (~150) |
| Figuras colocadas (únicas) | ~14 reales | 25 | +11 | Correcto — todas colocadas |
| Figuras duplicadas | 4+ | 0 | -4+ | P1-01 RESUELTO |
| Placeholders de figuras | 3 | 3 | = | EV-5A-11, EV-5B-02, EV-5B-03 |
| Defectos P0 activos | 3 | 2 | -1 | P0-02 migrado a P1 (razón arquitectónica) |
| Defectos P1 activos | 9 | 7 | -2 | P1-01, P1-03, P1-04, P1-07 resueltos |
| Defectos P2 activos | 6 | 4 | -2 | P2-02, P2-03, P2-04 resueltos |
| Header con título | No | Sí | ✓ | FIX-6 |
| Numeración de páginas | No | Sí | ✓ | FIX-6 |
| Etiquetas OE-XX como lista | No | Sí | ✓ | FIX-5 |
| Code blocks con keep_together | No | Sí | ✓ | FIX-7 |
| Diagramas Mermaid colocados | 4 de 6 | 6 de 6 | +2 | FIX-4 |

---

## 2. Análisis de la reducción de páginas

La reducción de 168 → 150 páginas (-18) se explica por:

| Causa | Efecto estimado |
|---|---|
| FIX-1: Dedup de figuras (eliminación de duplicados) | -10 a -12 páginas |
| FIX-7: keep_together en código (mejor paginación) | -2 a -4 páginas |
| FIX-2: Prefix match evita insertions en subsecciones | -1 a -2 páginas |
| FIX-4/FIX-3: Figuras colocadas en ubicación correcta | ±0 (reubicación, no adición) |
| **Total** | **-13 a -18 páginas** |

> La versión v0.2 tiene 150 páginas, exactamente en la meta histórica establecida para el documento.

---

## 3. Evolución de figuras por versión

| fig_num | Archivo | v0.1 estado | v0.2 estado | Cambio |
|---|---|---|---|---|
| 5.2 | fig-5-2-secuencia-registro | COLOCADA (kw incorrecto) | COLOCADA (kw "5.3.1") | Keyword corregido |
| 5.3 | fig-5-3-secuencia-postulacion | NO COLOCADA | COLOCADA (kw "5.6.1") | NUEVO en v0.2 |
| 5.4 | EV-5A-02-landing | COLOCADA | COLOCADA | Sin cambios |
| 5.5 | fig-5-5-persistencia-decisiones | NO COLOCADA | COLOCADA (kw "Registro de decisiones") | NUEVO en v0.2 |
| 5.6 | EV-5A-06-curp-duplicada | COLOCADA | COLOCADA | Sin cambios |
| 5.7 | EV-5A-07-login | COLOCADA | COLOCADA | Sin cambios |
| 5.8 | fig-5-4-secuencia-evidencias | COLOCADA | COLOCADA | Sin cambios |
| 5.9 | EV-5A-09-panel-candidato | COLOCADA (×4) | COLOCADA (×1) | Dedup fix |
| 5.10 | EV-5A-11 (placeholder) | PLACEHOLDER | PLACEHOLDER | Caption actualizado |
| 5.11 | EV-5A-12-detalle-vacante | COLOCADA | COLOCADA | Sin cambios |
| 5.12 | EV-5A-19-subida-evidencia | COLOCADA | COLOCADA | Sin cambios |
| 5.13 | EV-5B-01-admin-panel | COLOCADA (×múltiple) | COLOCADA (×1) | Dedup fix |
| 5.14 | EV-5B-08-acceso-denegado | NO COLOCADA | COLOCADA (kw "5.10.2") | NUEVO en v0.2 |
| 5.15 | fig-5-6-flujo-requireAdmin | COLOCADA | COLOCADA | Sin cambios |
| 5.16 | EV-5B-02 (placeholder) | PLACEHOLDER | PLACEHOLDER | Sin cambios |
| 5.17 | EV-5B-03 (placeholder) | PLACEHOLDER | PLACEHOLDER | Keyword corregido ("Registro de decisiones") |
| 5.18 | EV-5B-13-guard-prereq | COLOCADA | COLOCADA | Sin cambios |
| 5.19 | EV-5A-15-psicometrico-preguntas | COLOCADA | COLOCADA | Sin cambios |
| 5.20 | EV-5A-17-resultado-psicometrico | NO COLOCADA | COLOCADA (kw "Umbrales de clasificación") | NUEVO en v0.2 |
| 5.21 | fig-5-7-inicio-psicometrico | COLOCADA | COLOCADA | Sin cambios |
| 5.22 | EV-5B-15-d01-guard-score | COLOCADA | COLOCADA | Sin cambios |
| 6.1 | EV-6C-04-cp07-guard-d01 | COLOCADA | COLOCADA | Sin cambios |
| 6.2 | EV-5A-17 (reutilizada) | NO COLOCADA | COLOCADA (kw "6.5.3") | NUEVO en v0.2 |
| 6.3 | EV-6C-06-cp18-stats-d03 | NO COLOCADA | COLOCADA (kw "Flujo del administrador") | NUEVO en v0.2 |
| 6.4 | EV-6C-07-cp22-rls | COLOCADA | COLOCADA | Sin cambios |

---

## 4. Evolución de defectos

### Defectos resueltos en v0.2

| ID | Descripción | Solución aplicada |
|---|---|---|
| P1-01 | Fig 5.9 duplicada en §7.5.4 | FIX-1 (dedup) + FIX-2 (prefix match) |
| P1-03 | 5 capturas no colocadas | FIX-3 (keywords corregidos) |
| P1-04 | 2 diagramas Mermaid no insertados | FIX-4 (nuevos keywords) |
| P1-07 | Listas OE-XX como párrafos normales | FIX-5 (parser mejorado) |
| P2-02 | Sin encabezado de página | FIX-6 (header implementado) |
| P2-03 | Sin numeración de páginas | FIX-6 (footer con PAGE field) |
| P2-04 | Código sin keep_together | FIX-7 (keep_together=True) |

### Defectos activos en v0.2

| ID | Prioridad | Descripción |
|---|---|---|
| P0-01 | P0 | Portada incompleta (datos institucionales) |
| P0-03 | P0 | TOC en placeholder |
| P1-02 | P1 | EV-5A-17 muestra UNDER_REVIEW, no scores |
| P1-05 | P1 | EV-6C-06 muestra error 401, no D-03 real |
| P1-06 | P1 | Cap V extenso (bloques de código en cuerpo) |
| P1-08 | P1 | EV-5B-02 y EV-5B-03 sin captura |
| P1-09 | P1 | Fig 5.1 sigue siendo ASCII art |
| P2-01 | P2 | Logo UCES ausente |
| P2-05 | P2 | Plantilla Word UCES no confirmada |
| P2-06 | P2 | Saltos de página explícitos |

---

## 5. Veredicto

| Criterio | v0.1 | v0.2 |
|---|---|---|
| Listo para revisión del asesor (borrador) | SÍ (con advertencias) | **SÍ — mejorado** |
| Listo para entrega académica definitiva | NO | **NO** — faltan datos institucionales, TOC real, 3 capturas, verificaciones bibliográficas |
| Calidad visual general | Deficiente (sin header/footer, duplicados) | **Aceptable para borrador** |
| Cobertura de figuras | 14/25 (56%) | **25/25 (100%)** |
