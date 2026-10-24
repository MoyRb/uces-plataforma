# Reporte de integración institucional — Corte 8F

**Fecha:** 2026-10-23
**Versión generada:** v0.3
**Script:** `docs/titulacion/entregables/generar-docx-v03.py`
**Archivos:** `UCES_Trabajo_B_Revision_v03.docx` (2,593 KB) + `UCES_Trabajo_B_Revision_v03.pdf` (3,020 KB, **163 páginas**)

---

## 1. Datos institucionales integrados

| Campo | Valor confirmado | Fuente de confirmación |
|---|---|---|
| Institución | Instituto Tecnológico de Estudios Superiores de Zamora | Trabajo A (portada) + usuario |
| Carrera | Ingeniería en Sistemas Computacionales | Trabajo A + usuario |
| Autor | Moisés Medina Moreno | Confirmado directamente por el usuario |
| Asesor | Dr. Francisco Rodríguez | Confirmado directamente por el usuario |
| Institución beneficiaria | Universidad Capital de Estudios Superiores (UCES) | Contexto del proyecto |
| Título del proyecto | Desarrollo e implementación de un sistema web de reclutamiento... | Confirmado por el usuario |
| Modalidad | Proyecto innovador | Trabajo A + usuario |
| Lugar | Zamora, Michoacán, México | Confirmado por el usuario |

**Datos NO incluidos (pendientes de confirmación):**
- Matrícula del autor — se incluye nota en portada indicando que está pendiente
- Fecha de presentación — se omite; se incluirá cuando sea confirmada
- Segundo apellido del asesor — el Trabajo A muestra "Francisco Rodríguez Díaz" pero el usuario pidió usar solo "Dr. Francisco Rodríguez" hasta confirmar

---

## 2. Estructura de portada v0.3

La portada sigue el formato del Trabajo A (analizado vía pypdf):

```
INSTITUTO TECNOLÓGICO DE ESTUDIOS SUPERIORES DE ZAMORA

INGENIERÍA EN SISTEMAS COMPUTACIONALES

DESARROLLO E IMPLEMENTACIÓN DE UN SISTEMA WEB DE RECLUTAMIENTO
DE PERSONAL PARA LA UNIVERSIDAD CAPITAL DE ESTUDIOS SUPERIORES

Reporte de titulación que para obtener el título de
Ingeniero en Sistemas Computacionales

Presenta
Moisés Medina Moreno

Asesor
Dr. Francisco Rodríguez

Modalidad de titulación: Proyecto innovador

Zamora, Michoacán, México

[Matrícula y fecha de presentación pendientes de confirmación con el autor]
```

**Verificación en PDF:** Todos los campos confirmados aparecen correctamente en p.1 del PDF v0.3.

---

## 3. Mejoras implementadas en v0.3

| ID | Mejora | Estado |
|---|---|---|
| F01 | Portada ITESZ con datos institucionales confirmados | IMPLEMENTADO |
| F02 | Estilos FigureCaption / TableCaption para pies de figura y tabla | IMPLEMENTADO |
| F03 | Campos TOC reales para índice general, figuras y tablas | IMPLEMENTADO |
| F04 | Captions de tabla auto-numerados por capítulo (33 tablas) | IMPLEMENTADO |
| F05 | Actualización de campos vía Word COM automática | IMPLEMENTADO |
| F06 | Header ITESZ + footer con número de página (heredado de v0.2) | ACTIVO |

---

## 4. Resultados de la generación

| Indicador | Valor |
|---|---|
| Figuras colocadas (únicas) | 25 de 25 (100%) |
| Tablas con caption | 33 de 33 (100%) |
| COM update: TablesOfContents | 3 (main + figuras + tablas) |
| COM update: TablesOfFigures | 0 (correcto — todos son TOC \t) |
| DOCX tamaño | 2,593 KB |
| PDF tamaño | 3,020 KB |
| Páginas PDF | 163 |

---

## 5. Nota sobre el logo institucional

No se encontró ningún logotipo de ITESZ (en formato PNG, SVG o JPG) en los recursos disponibles del proyecto (`docs/titulacion/`, `evidencias/`, `diagramas/`). La portada se generó sin logo.

**Acción requerida:** El autor debe proporcionar el logotipo oficial del ITESZ para insertarlo en la portada en versión v0.4 o superior.
