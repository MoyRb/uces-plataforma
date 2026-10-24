# Reporte final — Corte 8G

**Fecha:** 2026-10-23
**Versión generada:** v0.4
**Archivo:** `UCES_Trabajo_B_Revision_v04.docx` / `_v04.pdf`
**Páginas PDF:** 162
**Figuras:** 26 (25 previas + Fig 5.1 nueva)
**COM update:** OK (3 TOC actualizados)

---

## 1. Resumen de cambios aplicados en Corte 8G

| ID | Cambio | Estado |
|---|---|---|
| G01 | Portada: eliminada frase "Reporte de titulación que para obtener el título de Ingeniero en Sistemas Computacionales" | APLICADO |
| G01 | Portada: espaciado rebalanceado (bloques PRESENTA / ASESOR / Modalidad separados uniformemente) | APLICADO |
| G01 | Portada: etiquetas en mayúsculas (PRESENTA, ASESOR) con tipografía coherente | APLICADO |
| G02 | Fig 5.1: diagrama de arquitectura PNG generado con Pillow | APLICADO |
| G02 | Fig 5.1: fuente editable Mermaid en `diagramas/fig-5-1-arquitectura.mmd` | APLICADO |
| G02 | ASCII art de §5.1.2 eliminado del DOCX (reemplazado por referencia al vectorial) | APLICADO |
| G03 | 25 referencias cruzadas añadidas (una por figura) antes de cada inserción | APLICADO |
| G04 | Fig 5.1 añadida a FIGURE_PLACEMENTS (keyword "5.1.2") | APLICADO |

---

## 2. Inspección de portada v0.4

### Extracto PDF p.1 verificado:
```
INSTITUTO TECNOLÓGICO DE ESTUDIOS SUPERIORES DE ZAMORA

INGENIERÍA EN SISTEMAS COMPUTACIONALES

DESARROLLO E IMPLEMENTACIÓN DE UN SISTEMA WEB DE
RECLUTAMIENTO DE PERSONAL PARA LA UNIVERSIDAD
CAPITAL DE ESTUDIOS SUPERIORES

PRESENTA
Moisés Medina Moreno

ASESOR
Dr. Francisco Rodríguez

Modalidad de titulación: Proyecto innovador

Zamora, Michoacán, México
[Matrícula y fecha de presentación pendientes de confirmación]
```

**Frase eliminada:** "Reporte de titulación que para obtener el título de Ingeniero en Sistemas Computacionales" — CONFIRMADO AUSENTE.
**Header en portada:** AUSENTE (first page different = true) — CORRECTO.
**Footer en portada:** AUSENTE — CORRECTO.

---

## 3. Figura 5.1 — resultado

| Aspecto | Resultado |
|---|---|
| Archivo generado | `diagramas/exportados/fig-5-1-arquitectura.png` (86 KB) |
| Fuente editable | `diagramas/fig-5-1-arquitectura.mmd` (Mermaid) |
| Página en v0.4 | p.77 |
| Caption en índice de figuras | SÍ — p.14 del PDF |
| ASCII art en DOCX | ELIMINADO (reemplazado por nota en markdown) |
| 3 capas representadas | Navegador (Client Components), Next.js Server (Server Components + Route Handlers), Supabase (Auth + PostgreSQL 16 + Storage) |

---

## 4. Estado de figuras con placeholders (sin cambio en 8G)

| fig_num | ID | Estado | Razón |
|---|---|---|---|
| 5.16 | EV-5B-02 | PLACEHOLDER | Requiere candidato con intento completo en /admin/attempts/[id] |
| 5.17 | EV-5B-03 | PLACEHOLDER | Requiere misma sesión que EV-5B-02 |
| 5.10 | EV-5A-11 | PLACEHOLDER permanente | Ruta /vacantes devuelve 404 por diseño arquitectónico |
| 5.20 | EV-5A-17 | CAPTURA PRESENTE | Estado: UNDER_REVIEW visible; scores por rasgo no visibles |
| 6.3  | EV-6C-06 | CAPTURA PRESENTE | Estado: 401 visible (confirma D-03 empíricamente) |

---

## 5. Colocación de figuras — análisis de keywords

Dos figuras (5.19 y 5.21) se colocan en secciones de Cap III (~pp.49 y 64) porque las keywords "Evaluación psicométrica" y "psicométrico" coinciden con encabezados del Marco Teórico antes que con los de §5.11. Este comportamiento es heredado de v0.3. Las figuras aparecen en el índice de figuras con esos números de página. Impacto: figuras del módulo psicométrico aparecen en Cap III, no en §5.11. Corrección futura requiere ajuste de keywords a sección específica ("5.11").

---

## 6. Comparación v0.3 → v0.4

| Indicador | v0.3 | v0.4 | Delta |
|---|---|---|---|
| Páginas PDF | 163 | 162 | -1 (ASCII art eliminado) |
| Figuras colocadas | 25 | 26 | +1 (Fig 5.1) |
| Entradas en índice de figuras | 25 | 26 | +1 |
| Frase eliminada de portada | NO | SÍ | G01 |
| ASCII art en §5.1.2 | SÍ | NO | G02 |
| Referencias cruzadas por figura | 5/25 | 25/26 | +20 G03 |
| COM update | OK | OK | sin cambio |
| DOCX tamaño | 2,593 KB | 2,673 KB | +80 KB (PNG fig 5.1) |
| PDF tamaño | 3,020 KB | 3,103 KB | +83 KB |

---

## 7. Pendientes NO resueltos en Corte 8G

| # | Pendiente | Motivo |
|---|---|---|
| 1 | Matrícula del autor | Dato institucional: requiere confirmación del autor |
| 2 | Fecha de presentación | Dato institucional: requiere confirmación del autor |
| 3 | Logo ITESZ | Archivo PNG/SVG no disponible: requiere proporcionarlo |
| 4 | EV-5B-02 y EV-5B-03 | Requieren candidato con intento completo en producción |
| 5 | EV-5A-17 con scores visibles | Requiere candidato que haya respondido 20 ítems y procesado |
| 6 | 4 capturas Supabase Studio | Requieren acceso manual al dashboard |
| 7 | Verificación bibliográfica manual | 5 referencias con URLs sin fecha de acceso |
| 8 | Aprobación del asesor | Depende del Dr. Francisco Rodríguez |

---

## 8. Instrucción para regenerar en caso de edición manual

1. Realizar ediciones en los archivos `.md` de `capitulos/`
2. Ejecutar: `python docs/titulacion/entregables/generar-docx-v04.py`
3. Abrir el DOCX resultante → Ctrl+A → F9 (si COM falla)
4. Verificar páginas y figuras antes de entregar
