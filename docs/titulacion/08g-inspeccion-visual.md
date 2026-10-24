# Inspección visual — Corte 8G

**Fecha:** 2026-10-23
**Versión:** v0.4
**Archivo:** `UCES_Trabajo_B_Revision_v04.pdf` (3,103 KB, **162 páginas**)

---

## 1. Lista de verificación (portada y estructura)

| # | Verificación | Resultado | Observaciones |
|---|---|---|---|
| 1 | Portada sin frase "Reporte de titulación que para obtener el título de..." | OK — G01 | Frase eliminada, confirmado en extracción PDF p.1 |
| 2 | "Moisés Medina Moreno" en portada | OK | Bajo etiqueta PRESENTA |
| 3 | "Dr. Francisco Rodríguez" en portada | OK | Bajo etiqueta ASESOR |
| 4 | "INSTITUTO TECNOLÓGICO DE ESTUDIOS SUPERIORES DE ZAMORA" | OK | Primera línea de portada |
| 5 | "Modalidad de titulación: Proyecto innovador" | OK | Conservado (es dato institucional) |
| 6 | Sin header/footer en portada (p.1) | OK | `different_first_page_header_footer = True` |
| 7 | Header activo desde p.2 | OK | "ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES \| Reporte de Titulación" |
| 8 | Footer con número de página desde p.2 | OK | Formato "— N —" |
| 9 | Matrícula y fecha — nota gris | OK (nota) | "[Matrícula y fecha de presentación pendientes de confirmación]" |

---

## 2. Lista de verificación (índices)

| # | Verificación | Resultado | Observaciones |
|---|---|---|---|
| 10 | Índice general con números de página reales | OK | pp.7–13 (TOC campo Word actualizado vía COM) |
| 11 | Índice de figuras con 26 entradas | OK | pp.14–15 (incluye Fig 5.1) |
| 12 | Índice de tablas con 33 entradas | OK | pp.16–17 |
| 13 | Todos los capítulos I–VII en TOC | OK | Verificado en TOC extraído |
| 14 | Sin "Error! Reference source not found" | OK | COM actualizó los 3 TOC correctamente |

---

## 3. Lista de verificación (figuras)

| # | Verificación | Resultado | Observaciones |
|---|---|---|---|
| 15 | Fig 5.1 presente en documento | OK — G02 | p.77, diagrama vectorial PNG |
| 16 | Fig 5.1 en índice de figuras | OK | Entrada visible en p.14 del PDF |
| 17 | ASCII art eliminado de §5.1.2 | OK | Reemplazado por nota "*(Véase la Figura 5.1...)*" |
| 18 | 26 figuras colocadas (sin duplicados) | OK | `placed_fig_nums` = 26, ADVERTENCIA ausente |
| 19 | Referencias cruzadas antes de cada figura | OK — G03 | 26 párrafos de introducción |
| 20 | Placeholders EV-5B-02 y EV-5B-03 visibles | OK (nota) | Fondo ámbar con texto explicativo |
| 21 | Fig 5.9 en §5.4 (p.89), no duplicada | OK | Confirmado en v0.3; sin cambio en v0.4 |

---

## 4. Distribución de capítulos en v0.4

| Sección | Pág. (aprox.) | Observaciones |
|---|---|---|
| Portada | 1 | Sin header/footer |
| Resumen | 2–4 | |
| Abstract | 5–6 | |
| Índice General | 7–13 | TOC real, 3 niveles |
| Índice de Figuras | 14–15 | 26 entradas (nueva Fig 5.1) |
| Índice de Tablas | 16–17 | 33 entradas |
| Capítulo I | ~18 | |
| Capítulo II | ~26 | |
| Capítulo III | ~33 | |
| Capítulo IV | ~54 | |
| Capítulo V | ~74 | §5.1.2 Fig 5.1 en p.77 |
| Capítulo VI | ~130 | |
| Capítulo VII | ~147 | |
| Referencias | ~160 | 33 entradas |
| **Total** | **162** | -1 vs v0.3 (ASCII art eliminado) |

---

## 5. Defectos residuales en v0.4

| ID | Prioridad | Descripción |
|---|---|---|
| P0-01 | P0 | Matrícula y fecha no confirmadas — nota gris en portada |
| P0-03 | P0 | Logo institucional ITESZ ausente |
| P1-02 | P1 | EV-5A-17 muestra UNDER_REVIEW, no scores psicométricos con valores numéricos |
| P1-05 | P1 | EV-6C-06 muestra error 401 (confirma D-03; no es captura del endpoint funcionando) |
| P1-06 | P1 | Cap V extenso (~56 páginas) — bloques de código en cuerpo sin Anexo A |
| P1-08 | P1 | EV-5B-02 y EV-5B-03 sin captura (placeholders en §5.10 y §5.9.8) |
| P1-10 | P1 | Referencias cruzadas son párrafos de texto plano, no campos REF de Word |
| P1-11 | P1 (nuevo) | Figs 5.19 y 5.21 colocadas en Cap III (~pp.49 y 64) en lugar de §5.11 (keyword match temprano) |
| P2-01 | P2 | Plantilla Word ITESZ no aplicada (parámetros provisionales) |

---

## 6. Mejoras confirmadas vs. v0.3

| Mejora | v0.3 | v0.4 |
|---|---|---|
| Portada — frase innecesaria | Presente | Eliminada (G01) |
| Portada — etiquetas | "Presenta / Asesor" (mixto) | "PRESENTA / ASESOR" (mayúsculas, uniforme) |
| Fig 5.1 | Ausente | Presente (diagrama vectorial PNG, G02+G04) |
| ASCII art en §5.1.2 | Presente como bloque de código | Eliminado (G02) |
| Referencias cruzadas a figuras | 5 de 25 | 26 de 26 (G03) |
| Páginas | 163 | 162 (-1) |

---

## 7. Recomendación para inspección manual adicional

Se recomienda abrir `UCES_Trabajo_B_Revision_v04.pdf` y verificar:

1. **p.1** — Portada sin frase innecesaria, con PRESENTA/ASESOR
2. **pp.7–13** — Índice general (26 entradas de figuras, 33 de tablas)
3. **pp.14–15** — Índice de figuras (confirmar Figura 5.1 presente al inicio)
4. **p.77** — Figura 5.1 (diagrama de arquitectura vectorial)
5. **p.89** — Figura 5.9 (panel candidato, sin duplicado)
6. **pp.130+** — Cap VI con evidencias CP-07, CP-18, CP-20, CP-22
7. **pp.160+** — Referencias bibliográficas (33 entradas)
