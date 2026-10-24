# Validación de índices — Corte 8F

**Fecha:** 2026-10-23
**Versión:** v0.3 — `UCES_Trabajo_B_Revision_v03.pdf` (163 páginas)

---

## 1. Índice general

| Indicador | Resultado |
|---|---|
| Campo TOC real | SÍ — campo `TOC \o "1-3" \h \z \u` actualizado vía COM |
| Actualización por Word COM | SÍ — TablesOfContents(1) actualizado |
| Página del índice | p.7 |
| Niveles incluidos | H1 (Capítulos), H2 (secciones), H3 (subsecciones) |
| Tiene números de página reales | SÍ — verificado programáticamente |
| Estado | FUNCIONAL |

### Extracto del índice general (verificado en PDF p.7-14)

```
RESUMEN ..............  3
ABSTRACT ..............  5
ÍNDICE GENERAL ..............  7
ÍNDICE DE FIGURAS ..............  15
ÍNDICE DE TABLAS ..............  17
Capítulo I. Introducción y generalidades del proyecto ..............  19
Capítulo II. Contexto organizacional ..............  27
Capítulo III. Marco teórico y fundamentos ..............  34
Capítulo IV. Metodología de desarrollo ..............  55
Capítulo V. Desarrollo e implementación del sistema ..............  75
Capítulo VI. Pruebas y resultados del sistema ..............  131
Capítulo VII. Conclusiones, discusión y trabajo futuro ..............  148
REFERENCIAS BIBLIOGRÁFICAS ..............  161
```

*(Numeración aproximada — la exacta aparece en el documento)*

---

## 2. Índice de figuras

| Indicador | Resultado |
|---|---|
| Campo TOC real | SÍ — campo `TOC \h \z \t "FigureCaption,1"` actualizado vía COM |
| Actualización por Word COM | SÍ — TablesOfContents(2) actualizado |
| Página del índice | pp.15–16 |
| Total de entradas | 25 figuras |
| Tiene números de página reales | SÍ |
| Estado | FUNCIONAL |

### Técnica utilizada

Se creó el estilo personalizado `FigureCaption` (basado en Caption). Todos los pies de figura se formatean con este estilo. El campo TOC usa `\t "FigureCaption,1"` para recolectar todos los párrafos con ese estilo.

Esta técnica se eligió sobre `\c "Figura"` porque esta última requiere campos `SEQ Figura` en cada pie, lo que entraría en conflicto con el esquema de numeración por capítulo (5.4, 5.5, etc.) del documento.

---

## 3. Índice de tablas

| Indicador | Resultado |
|---|---|
| Campo TOC real | SÍ — campo `TOC \h \z \t "TableCaption,1"` actualizado vía COM |
| Actualización por Word COM | SÍ — TablesOfContents(3) actualizado |
| Página del índice | pp.17–18 |
| Total de entradas | 33 tablas |
| Tiene números de página reales | SÍ |
| Estado | FUNCIONAL |

### Extracto del índice de tablas (verificado en PDF p.17-18)

```
Tabla 4.1. Solución técnica T-01: acceso asíncrono en parámetros dinámicos de Next.js App Router. ... 68
Tabla 4.2. Solución técnica T-02: circularidad en políticas de RLS al verificar roles .............. 69
...
Tabla 6.12. Tabla resumen de resultados de ejecución. ........................................................ 141
Tabla 6.13. Verificación del estado final de discrepancias D-01 a D-05. ................................ 148
Tabla 7.1. Evaluación del cumplimiento de los objetivos específicos. ..................................... 150
Tabla 7.2. Resultados consolidados y trabajo futuro. ............................................................ 152
```

---

## 4. Distribución de capítulos en v0.3

| Sección | Pág. inicial (aprox.) | Observaciones |
|---|---|---|
| Portada | 1 | Sin header/footer (first page different) |
| Resumen | 2–4 | 2 páginas |
| Abstract | 5–6 | 2 páginas |
| Índice General | 7–14 | 8 páginas (TOC real, 3 niveles) |
| Índice de Figuras | 15–16 | 2 páginas |
| Índice de Tablas | 17–18 | 2 páginas |
| Capítulo I | 19 | |
| Capítulo II | ~27 | |
| Capítulo III | ~34 | |
| Capítulo IV | ~55 | |
| Capítulo V | ~75 | |
| Capítulo VI | ~131 | |
| Capítulo VII | ~148 | |
| Referencias | ~161 | |
| **Total** | **163** | |

> Los índices reales (pp.7–18) ocupan 12 páginas en v0.3 vs. 1 página de placeholder en v0.1.

---

## 5. Instrucciones para regenerar los índices en Word

Si el autor edita el DOCX manualmente y desea regenerar los índices:

1. Abrir `UCES_Trabajo_B_Revision_v03.docx` en Microsoft Word
2. Seleccionar todo: **Ctrl+A**
3. Actualizar campos: **F9**
4. Confirmar "Actualizar toda la tabla" en cada cuadro de diálogo
5. Guardar

O bien ejecutar `generar-docx-v03.py` que hace esto automáticamente vía COM.
