# Reporte de correcciones — Corte 8E

**Fecha:** 2026-10-23
**Versión anterior:** v0.1 (`UCES_Trabajo_B_Revision_v01.docx`)
**Versión generada:** v0.2 (`UCES_Trabajo_B_Revision_v02.docx`)
**Script:** `docs/titulacion/entregables/generar-docx-v02.py`

---

## 1. Resumen de correcciones aplicadas

| ID | Fix | Defecto corregido | Estado |
|---|---|---|---|
| FIX-1 | Deduplicación de figuras por `fig_num` | P1-01, múltiples duplicados | APLICADO |
| FIX-2 | Keyword matching con prefijo exacto para secciones | P1-01 (§7.5.4) | APLICADO |
| FIX-3 | Keywords corregidos: EV-5A-17, EV-5B-08, EV-6C-05, EV-6C-06 | P1-03 | APLICADO |
| FIX-4 | Keywords agregados: fig-5-3, fig-5-5 | P1-04 | APLICADO |
| FIX-5 | Parser `**XX-NN.**` → lista con sangría y etiqueta negrita | P1-07 | APLICADO |
| FIX-6 | Header con título + footer con número de página automático | P2-02, P2-03 | APLICADO |
| FIX-7 | `keep_together=True` en bloques de código | P2-04 | APLICADO |

---

## 2. Detalle de cada corrección

### FIX-1 — Deduplicación por `fig_num`

**Problema (v0.1):** La variable `used_figures` se llenaba con `ev_id` (p.ej. "EV-5A-09") pero la verificación de dedup usaba `fp[1]` que es `fig_num` (p.ej. "5.9"). Los dos conjuntos nunca se intersectaban → todas las figuras se insertaban múltiples veces cada vez que cualquier encabezado posterior disparaba un keyword ya usado.

**Solución:** Se creó un set separado `placed_fig_nums` que almacena el `fig_num` en el momento de la inserción. El check de dedup ahora es `fig_num not in placed_fig_nums`.

**Impacto medido:**
- v0.1: Fig 5.9 aparecía en pp. 78, 97, 99, 160 (4 veces)
- v0.2: Fig 5.9 aparece solo en p. 77 (1 vez)
- Reducción total de páginas: 168 → 150 (-18 páginas)
- Figuras únicas colocadas: 25 (vs. aprox. 14 reales + múltiples duplicados en v0.1)

### FIX-2 — Keyword prefix matching para números de sección

**Problema (v0.1):** `kw.lower() in heading_text.lower()` con keyword `"5.4"` coincide con:
- "5.4 Desarrollo del panel del candidato" ✓ (correcto)
- "5.4.1 Arquitectura del panel" ✗ (no deseado)
- "7.5.4 Incidencias detectadas" ✗ (causa de P1-01)

**Solución:** La función `matches_heading(kw, heading_text)` detecta si `kw` es un número de sección (regex `^\d+(\.\d+)+$`) y en ese caso usa `re.match(r'^' + re.escape(kw) + r'(\s|$)', heading_text)`, que exige que el heading COMIENCE con ese número exacto seguido de espacio o fin de línea.

**Impacto:** "5.4" ahora solo dispara en "5.4 Desarrollo del panel…" y NO en "7.5.4 Incidencias detectadas". El keyword de EV-5A-09 fue también cambiado a "Panel del candidato" (texto) como defensa adicional.

### FIX-3 — Keywords corregidos para figuras no colocadas

| Figura | Keyword v0.1 | Motivo de fallo | Keyword v0.2 | Heading destino |
|---|---|---|---|---|
| EV-5A-17 (5.20) | "Resultado psicométrico" | No existe como heading | "Umbrales de clasificación" | §5.11.5 Umbrales de clasificación por rasgo |
| EV-5B-08 (5.14) | "Acceso denegado" | No existe como heading | "5.10.2" | §5.10.2 Función requireAdmin() y protección... |
| EV-6C-05 (6.2) | "CP-20" | No existe como heading | "6.5.3" | §6.5.3 Tabla resumen de resultados |
| EV-6C-06 (6.3) | "CP-18" | No existe como heading | "Flujo del administrador" | #### Flujo del administrador (CP-15 a CP-22) |

**Resultado:** Todas las figuras anteriormente no colocadas fueron insertadas en v0.2.

### FIX-4 — Keywords para diagramas Mermaid faltantes

| Diagrama | Keyword v0.1 | Motivo de fallo | Keyword v0.2 | Heading destino |
|---|---|---|---|---|
| fig-5-3 (5.3) | No existía entrada | Sin entrada en FIGURE_PLACEMENTS | "5.6.1" | §5.6.1 Flujo completo del endpoint de postulación |
| fig-5-5 (5.5) | No existía entrada | Sin entrada en FIGURE_PLACEMENTS | "Registro de decisiones" | §5.9.8 Registro de decisiones y observaciones |

Corrección adicional: fig-5-2 tenía keyword "Diagramas de secuencia" que tampoco existe como heading. Corregido a "5.3.1" → §5.3.1 Flujo de registro.

### FIX-5 — Parser para etiquetas `**XX-NN.**`

**Problema (v0.1):** Líneas como `**OE-01.** Implementar flujo de registro…` se convertían como párrafo normal, perdiendo la estructura visual de lista numerada con etiqueta.

**Solución:** Se agregó detección con regex `^\*\*([A-Z]{1,4}-\d{1,3}[\.\:]?)\*\*\s*(.*)` antes del procesamiento de párrafo normal. Las líneas que coinciden se formatean con:
- Sangría izquierda 1.0 cm + sangría de primera línea -0.5 cm (efecto de lista colgante)
- Etiqueta en **negrita** (OE-01. RF-01. etc.)
- Texto del ítem con `parse_inline()` para mantener formato inline

**Aplica a:** Objetivos específicos (OE-01..OE-07) en Cap I, y cualquier otra lista de requisitos con este patrón en todo el documento.

### FIX-6 — Header y footer con numeración de página

**Implementación:**
- `section.different_first_page_header_footer = True` — omite header/footer en la portada
- Header: alineado a la derecha, Arial 8pt gris: `"UCES — Plataforma de Talento | Reporte de Residencias Profesionales"`
- Footer: centrado, numeral de página automático con campo `{ PAGE }` en formato `— N —`

**Verificación:** El texto extraído de p.142 del PDF v0.2 confirma:
```
UCES — Plataforma de Talento | Reporte de Residencias Profesionales
— 142 —
```

### FIX-7 — `keep_together` en bloques de código

**Implementación:**
- `code_style.paragraph_format.keep_together = True` en el estilo "Code Block"
- `p.paragraph_format.keep_together = True` también aplicado por párrafo para garantizar efecto

**Efecto esperado:** Los bloques de código no deberían partirse entre páginas. Word respetará `keep_together` al paginar.

---

## 3. Figuras no corregidas en 8E (pendientes para v0.3)

| Figura | Estado | Motivo |
|---|---|---|
| EV-5A-11 (5.10) | PLACEHOLDER actualizado | No existe ruta /vacantes en la app (diseño arquitectónico); explicado en caption |
| EV-5B-02 (5.16) | PLACEHOLDER | Requiere candidato con intento completo para captura |
| EV-5B-03 (5.17) | PLACEHOLDER | Requiere misma sesión que EV-5B-02 |

---

## 4. Resultado de la generación

| Indicador | v0.1 | v0.2 | Cambio |
|---|---|---|---|
| DOCX tamaño | 2,065 KB | 2,592 KB | +527 KB (header/footer + más figuras únicas) |
| PDF tamaño | 2,424 KB | 2,875 KB | +451 KB |
| Páginas PDF | 168 | 150 | -18 páginas |
| Figuras colocadas (únicas) | ~14 reales | 25 | +11 |
| Figuras duplicadas (P1-01) | 4 instancias de Fig 5.9 | 1 instancia | Resuelto |
| Header/footer | No | Sí | Implementado |
| Etiquetas XX-NN como lista | No | Sí | Implementado |
