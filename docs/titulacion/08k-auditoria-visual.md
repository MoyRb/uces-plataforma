# 08k-auditoria-visual.md
# Corte 8K — Auditoría visual del PDF v0.7 (164 páginas)
**Fecha:** 2026-10-25 | **Auditor:** Editor académico senior

---

## Metodología

Revisión página a página del PDF v0.7 (164 páginas), examinando:
- Marcadores editoriales y texto interno visible al lector
- Coherencia entre §1.7 y el contenido real de cada capítulo
- Consistencia del índice de figuras (duplicados, marcadores)
- Tablas con celdas fragmentadas o contenido cortado
- Inconsistencias entre el Resumen y las conclusiones

---

## Hallazgos confirmados

| ID | Página(s) | Severidad | Descripción | Archivo fuente |
|----|-----------|-----------|-------------|----------------|
| H-01 | P.1 | P1 | Nota de fecha entre corchetes editoriales `[...]` | `generar-docx-v08.py` |
| H-02 | P.26 | P1 | Texto `[Evidencia pendiente EV-01]` visible al lector | `02-contexto-organizacional.md` |
| H-03 | P.26 | P1 | Texto `[EV-06]` y notas editoriales en §2.4 y §2.5 | `02-contexto-organizacional.md` |
| H-04 | P.73 | P1 | Nota interna: "diagrama vectorial generado para la versión v0.4 del reporte" | `05-desarrollo-implementacion.md` |
| H-05 | PP.64–66 | P1 | Tablas T-03, T-04, T-05: columnas iguales para "Elemento" y "Detalle"; texto fragmentado | `generar-docx-v08.py` (parse_md_table) |
| H-06 | §1.7 | P1 | Cap. IV descrito como "análisis y diseño, CU, ER" en lugar de "metodología de desarrollo" | `01-introduccion-generalidades.md` |
| H-07 | §1.7 | P1 | Anuncio de Anexos inexistentes (6 anexos declarados, ninguno existe) | `01-introduccion-generalidades.md` |
| H-08 | PP.162–164 | P1 | Metadata de auditoría en bibliografía: "Fecha de compilación", "Nota de verificación", marcas `*(PENDIENTE)*` | `referencias/bibliografia-final.md` + `generar-docx-v08.py` |
| H-09 | TOF | P1 | Fig_num "5.5" duplicado en FIGURE_PLACEMENTS; diagrama de persistencia nunca colocado | `generar-docx-v08.py` |
| H-10 | Resumen | P1 | "matices documentados en las discrepancias D-01 y D-02" debería ser INC-6B-01 e INC-6B-02 | `preliminares/resumen.md` |

---

## Hallazgos adicionales observados (solo de fuente)

| ID | Descripción | Estado |
|----|-------------|--------|
| H-A1 | §1.7 anuncio de Abstract eliminado pero abstract sigue en la descripción del documento | No aplicable — Abstract ya eliminado en H03 de v0.5 |
| H-A2 | cap05 línea 60: heading "**Figura 5.1 — Diagrama de arquitectura implementada**" visible como texto en el cuerpo | Heredado desde v0.1; la Figura 5.1 se coloca vía FIGURE_PLACEMENTS (§5.1.2), este heading queda como texto bold. Impacto menor. |

---

## Métricas del PDF auditado (v0.7)

| Métrica | Valor |
|---------|-------|
| Páginas | 164 |
| Figuras reales | 29 |
| Marcadores editoriales visibles | 5 (H-02, H-03 × 3, H-04) |
| Tablas con fragmentación detectada | 3 (T-03, T-04, T-05) |
| Inconsistencias de índice | 1 (H-09) |
| Inconsistencias de texto | 2 (H-06, H-07) |
| Referencias incorrectas | 1 (H-10) |
