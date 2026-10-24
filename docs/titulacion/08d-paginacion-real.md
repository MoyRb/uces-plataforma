# Paginación real — Corte 8D

**Fecha:** 2026-10-23
**Versión:** v0.1
**Documento:** `entregables/UCES_Trabajo_B_Revision_v01.pdf`
**Total de páginas verificadas:** 168

> La paginación fue obtenida mediante inspección programática con pypdf 5.x sobre el PDF generado con Microsoft Word COM via docx2pdf. Los números de página son los del PDF físico (p.1 = portada), no la numeración interna del documento (que comenzaría en el Cap. I).

---

## Tabla de paginación por sección

| Sección | Pág. inicial | Pág. final | N.º de páginas | Observaciones |
|---|---|---|---|---|
| Portada institucional provisional | 1 | 1 | 1 | Metadatos pendientes (autor, matrícula, asesor) |
| Resumen (español) | 2 | 3 | 2 | Correcto, ~290 palabras |
| Abstract (inglés) | 4 | 5 | 2 | Correcto, ~290 palabras |
| Marcadores de índices (TOC / Figuras / Tablas) | 6 | 6 | 1 | Placeholder — generar en Word tras correcciones |
| Capítulo I — Introducción y generalidades | 7 | 15 | 9 | §§1.1–1.7 completos |
| Capítulo II — Contexto organizacional | 16 | 24 | 9 | §§2.1–2.7 completos |
| Capítulo III — Marco teórico y fundamentos | 25 | 44 | 20 | §§3.1–3.11 con tablas |
| Capítulo IV — Metodología de desarrollo | 45 | 64 | 20 | §§4.1–4.7 con iteraciones |
| Capítulo V — Desarrollo e implementación | 65 | 134 | 70 | §§5.1–5.13 con figuras y diagramas |
| Capítulo VI — Pruebas y resultados | 135 | 151 | 17 | §§6.1–6.6 con evidencias |
| Capítulo VII — Conclusiones y trabajo futuro | 152 | 165 | 14 | §§7.1–7.9 |
| Referencias bibliográficas | 166 | 168 | 3 | 33 entradas APA 7 |
| **TOTAL** | **1** | **168** | **168** | |

---

## Análisis de distribución por capítulo

| Capítulo | Páginas v0.1 | Meta estimada (08a) | Diferencia | Causa |
|---|---|---|---|---|
| Cap I | 9 | 11 | -2 | Normal; sin imágenes en Cap I |
| Cap II | 9 | 11 | -2 | Normal |
| Cap III | 20 | 22 | -2 | Normal |
| Cap IV | 20 | 17 | +3 | Tablas de iteraciones con espacio adicional |
| Cap V | 70 | 55–60 | +10–15 | Figuras y diagramas, código extenso, 13 subsecciones |
| Cap VI | 17 | 18–20 | -1–3 | Normal |
| Cap VII | 14 | 8 | +6 | Tablas de objetivos/recomendaciones expandidas |
| Referencias | 3 | 5–6 | -2–3 | La sección no incluye glosario aún |
| Preliminares | 6 | 8–10 | -2–4 | TOC placeholder toma solo 1 página vs. ~3 del real |
| **Total** | **168** | **150–165** | **+3–18** | Dentro del rango aceptable para versión con figuras |

---

## Observaciones de paginación

### Cap V — 70 páginas (extenso)
Cap V es el más largo del documento (41.7 % del total). Las causas son:
1. 13 subsecciones (§5.1–5.13) con contenido técnico extenso
2. 14 imágenes reales + 3 placeholders embebidos
3. 4 diagramas Mermaid
4. Bloques de código TypeScript/SQL
5. Múltiples tablas de trazabilidad

**Evaluación:** No se recomienda recortar contenido académico. El tamaño es proporcional a la complejidad de la implementación. Para versión final, mover los bloques de código más extensos (>30 líneas) a Anexo A reducirá ~8–12 páginas.

### Cap VII — 14 páginas (más largo de lo esperado)
El capítulo VII supera la estimación original de 8 páginas. Las causas:
1. §7.5 incluye una tabla de verificación de objetivos detallada
2. §7.5.4 recibió inadvertidamente una figura duplicada (Fig. 5.9 — bug P1-01)
3. §7.7 (recomendaciones) generó múltiples párrafos con tablas

### Índices — solo 1 página (subestimado)
El TOC actual es solo un placeholder en azul. Una vez generado el TOC automático en Word, se espera:
- Índice general: ~3 páginas (7 caps × ~10 secciones)
- Índice de figuras: ~1–2 páginas
- Índice de tablas: ~1 página
- Total índices: ~5–6 páginas adicionales

### Proyección para versión final (v1.0)

| Ajuste | Efecto |
|---|---|
| TOC real (reemplaza placeholder de 1 pág) | +4 páginas |
| Mover código extenso a Anexo A | -8 a -12 páginas de Cap V |
| Agregar Anexo A (código seleccionado) | +10–15 páginas |
| Agregar Anexo B (capturas adicionales) | +2–3 páginas |
| Agregar Anexo C (SVG diagramas) | +3–4 páginas |
| Agregar Anexo D (Supabase Studio) | +2 páginas |
| Corrección de portada, numeración, encabezados | ~0 páginas neto |
| **Total estimado v1.0** | **~169–180 páginas** |

---

## Veredicto sobre la meta de 150 páginas

El documento en v0.1 tiene **168 páginas**, 18 por encima de la meta histórica de ~150. Este exceso es atribuible principalmente a:
- Cap V con figuras expandidas (+10–15 respecto a texto solo)
- Cap VII más desarrollado de lo previsto (+6)
- TOC aún sin generar (ahorrará ~0 páginas; el placeholder ocupa 1 ya)

**Recomendación:** No eliminar contenido académico. Al mover bloques de código a Anexo A se recuperarán ~10 páginas en Cap V, llevando el cuerpo a ~156–160 páginas — dentro del margen aceptable.
