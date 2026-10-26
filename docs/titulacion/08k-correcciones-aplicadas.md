# 08k-correcciones-aplicadas.md
# Corte 8K — Correcciones aplicadas en v0.8
**Fecha:** 2026-10-25 | **Generador:** `generar-docx-v08.py`

---

## Resumen de correcciones

| ID | Hallazgo | Tipo | Archivo modificado | Estado |
|----|----------|------|--------------------|--------|
| K01 | H-01: Portada — fecha con corchetes editoriales | Generador | `generar-docx-v08.py` | ✓ Aplicado |
| K02 | H-08 (parcial): Nota roja de auditoría en bibliografía | Generador | `generar-docx-v08.py` | ✓ Aplicado |
| K03 | H-09: fig_num "5.5" duplicado en FIGURE_PLACEMENTS | Generador | `generar-docx-v08.py` | ✓ Aplicado |
| K04 | H-05: Tablas T-03/T-04/T-05 con columnas fragmentadas | Generador | `generar-docx-v08.py` | ✓ Aplicado |
| K05 | H-06 + H-07: §1.7 descripción Cap IV y anuncio de Anexos | Fuente | `01-introduccion-generalidades.md` | ✓ Aplicado |
| K06 | H-02 + H-03: Marcadores [EV-01] y [EV-06] en cap02 | Fuente | `02-contexto-organizacional.md` | ✓ Aplicado |
| K07 | H-04: Referencia interna a "versión v0.4 del reporte" | Fuente | `05-desarrollo-implementacion.md` | ✓ Aplicado |
| K08 | H-10: "D-01 y D-02" → "INC-6B-01 e INC-6B-02" en Resumen | Fuente | `preliminares/resumen.md` | ✓ Aplicado |
| K09 | H-08: Metadatos de compilación y marcas PENDIENTE en bibliografía | Fuente | `referencias/bibliografia-final.md` | ✓ Aplicado |

---

## Detalle de cada corrección

### K01 — Portada: nota de fecha sin corchetes

**Antes:** `[Fecha de presentación pendiente de confirmación institucional]` (en gris con corchetes de placeholder editorial)

**Después:** `Fecha de presentación: pendiente de confirmación institucional` (en gris, sin corchetes)

**Fundamento:** Los corchetes son convención editorial interna; el lector los percibe como placeholder sin resolver.

---

### K02 — Bibliografía: nota roja de auditoría eliminada

**Antes:** Párrafo rojo al inicio de Referencias con texto "NOTA: Las referencias marcadas como (PENDIENTE) requieren verificación manual."

**Después:** La sección Referencias abre directamente con la primera entrada bibliográfica.

---

### K03 — FIGURE_PLACEMENTS: duplicado "5.5" resuelto

**Situación:** Dos entradas con `fig_num = "5.5"` en FIGURE_PLACEMENTS:
1. `("5.3", "5.5", EV-5A-05-registro-formulario.png, ...)` — colocada correctamente.
2. `("Registro de decisiones", "5.5", fig-5-5-persistencia-decisiones.png, ...)` — nunca colocada (bloqueada por `placed_fig_nums`).

**Corrección:** La segunda entrada (diagrama de persistencia) fue eliminada de FIGURE_PLACEMENTS. El documento mantiene 29 figuras reales como en v0.7; la mejora es que el índice de figuras ya no puede contener un duplicado potencial.

---

### K04 — Tablas T-03 a T-05: ancho de columnas explícito

**Situación:** `parse_md_table` creaba tablas sin definir anchos de columna. Word distribuía el ancho de texto (16.09 cm) en partes iguales. Para las tablas de 2 columnas con encabezados "Elemento" y "Detalle", la columna izquierda recibía 8 cm siendo innecesariamente ancha, y la columna derecha con contenido largo resultaba fragmentada.

**Corrección:** Después de crear la tabla, si `ncols == 2`, se asigna:
- Columna 0 ("Elemento"): **3.5 cm**
- Columna 1 ("Detalle"): **12.59 cm**

Para tablas de 3 y 4 columnas se distribuye equitativamente el ancho disponible.

**Tablas beneficiadas:** T-01 a T-05 del Capítulo IV (todas 2-columna "Elemento|Detalle").

---

### K05 — §1.7: descripción de Cap. IV y anuncio de Anexos

**Cap. IV (antes):**
> "El Capítulo IV presenta el análisis y diseño del sistema. Incluye la descripción de la metodología de desarrollo empleada, el análisis de requerimientos funcionales y no funcionales, los diagramas de casos de uso, el modelo entidad-relación completo con sus trece tablas, el diseño de la arquitectura de componentes, el diseño de seguridad y el diseño del módulo psicométrico."

**Cap. IV (después):**
> "El Capítulo IV documenta el proceso de desarrollo del sistema mediante el modelo de prototipado evolutivo. Describe las ocho iteraciones de construcción identificadas en el historial del repositorio, las herramientas de desarrollo y control de versiones empleadas, los cinco problemas técnicos resueltos durante el proceso, y la relación entre el marco metodológico y las actividades concretas del proyecto."

**Cierre del documento (antes):**
> "El documento cierra con la sección de **Referencias bibliográficas** y los **Anexos**, que incluyen el esquema completo de la base de datos, el listado de endpoints de la API con descripción, los reactivos del cuestionario psicométrico, el manual de configuración y despliegue, un resumen de capturas de pantalla del sistema y el historial de commits relevantes del repositorio."

**Cierre del documento (después):**
> "El documento cierra con la sección de **Referencias bibliográficas**, que consigna las fuentes académicas, técnicas e institucionales consultadas durante el desarrollo del proyecto."

---

### K06 — cap02: marcadores editoriales eliminados

Cuatro instancias eliminadas:

| Ubicación | Marcador eliminado |
|-----------|--------------------|
| §2.1 (línea 9) | Blockquote completo `> **[Evidencia pendiente EV-01]** La adscripción formal...` |
| §2.4 (línea 51) | ` **[EV-06]** *La incorporación de este instrumento al expediente...* Sin embargo,` → reemplazado por `La` |
| §2.5 (línea 63) | ` **[EV-01, EV-06]** *La documentación formal de esta participación...*` |
| §2.5 (línea 67) | ` **[EV-01]** *Los datos formales de los asesores...*` |

---

### K07 — cap05: referencia interna a "versión v0.4"

**Antes (línea 62):**
```
*(Véase la Figura 5.1 — diagrama vectorial generado para la versión v0.4 del reporte.)*
```

**Después:** Línea eliminada. La Figura 5.1 ya es introducida por su cross_ref en FIGURE_PLACEMENTS con texto académico apropiado.

---

### K08 — resumen.md: terminología de incidencias

**Antes:** "los dos restantes se cumplen con matices documentados en las discrepancias D-01 y D-02."

**Después:** "los dos restantes se cumplen con matices documentados en las incidencias INC-6B-01 e INC-6B-02."

**Fundamento:** D-01 y D-02 son discrepancias de diseño (guard de score, tabla reviews). INC-6B-01 e INC-6B-02 son las incidencias de ejecución que afectan OE-04 y OE-05. El Capítulo VII usa INC-6B-01/02 correctamente; el Resumen usaba la terminología equivocada.

---

### K09 — bibliografia-final.md: metadatos y PENDIENTE

**Eliminados del archivo fuente:**
- `**Fecha de compilación:** 2026-10-23`
- `**Total de referencias:** 33 entradas (...)`
- Blockquote `> **Nota de verificación:** Las referencias marcadas con *(PENDIENTE)*...`
- 5 anotaciones `*(PENDIENTE — ...)*` inline en entradas de Arciniega Robles, Clariana & Wallace, Meta React 19, Nielsen Norman Group y SEGOB.

**Resultado:** Las 33 referencias quedan limpias en formato APA 7 sin anotaciones de auditoría.

---

## Métricas de v0.8

| Métrica | v0.7 | v0.8 |
|---------|------|------|
| DOCX | ~4,200 KB (estimado) | 3,711 KB |
| PDF | ~4,000 KB (estimado) | 3,524 KB |
| Figuras reales | 29 | 29 |
| Marcadores editoriales visibles | 5+ | 0 |
| fig_num duplicados | 1 ("5.5") | 0 |
| COM update | OK | OK |
| TOC actualizados | 3 | 3 |
