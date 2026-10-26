# 08h-control-calidad-v05.md
# Corte 8H — Control de calidad v0.5
**Fecha:** 2026-10-24

---

## 1. Métricas generadas

| Métrica | v0.4 | v0.5 | Delta |
|---------|------|------|-------|
| Tamaño DOCX | — | 2,671 KB | — |
| Tamaño PDF | — | 3,089 KB | — |
| Páginas estimadas | 162 | ~158 | −4 (Abstract eliminado) |
| Figuras colocadas | 26 | 26 | = |
| Tablas | 33 | 33 | = |
| COM update | OK | OK | = |

---

## 2. Verificación de correcciones H01..H05

### H01 — Matrícula en portada

| Verificación | Estado |
|-------------|--------|
| `DATOS["matricula"] = "22010350"` añadido | ✓ |
| `centered(f"MATRÍCULA: {DATOS['matricula']}", 11)` bajo nombre autor | ✓ |
| Nota gris cambiada a "[Fecha de presentación pendiente...]" | ✓ |

**Resultado esperado en portada:**
```
PRESENTA
Moisés Medina Moreno
MATRÍCULA: 22010350

ASESOR
Dr. Francisco Rodríguez
```

### H02 — Header sin "Reporte de Titulación"

| Verificación | Estado |
|-------------|--------|
| `setup_header_footer()` actualizado | ✓ |
| Header text = `"ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES"` | ✓ |
| Texto eliminado: `" | Reporte de Titulación"` | ✓ |

### H03 — Abstract eliminado

| Verificación | Estado |
|-------------|--------|
| Llamada `add_preliminary(..., "ABSTRACT")` removida | ✓ |
| Comentario de código `# H03: Abstract eliminado` | ✓ |
| Resumen (español) conservado | ✓ |
| ~4 páginas menos en el documento | ✓ (esperado) |

### H04 — Fig 5.19 keyword corregido

| Verificación | Estado |
|-------------|--------|
| Keyword anterior: `"Evaluación psicométrica"` | Eliminado |
| Keyword nuevo: `"5.11.1"` | ✓ |
| Match seguro: solo `### 5.11.1 Instrumento institucional Mini Big Five` en Cap V | ✓ |
| NO matchea Cap III `## 3.8 Modelo Big Five y evaluación psicométrica` | ✓ |

### H05 — Fig 5.21 keyword corregido

| Verificación | Estado |
|-------------|--------|
| Keyword anterior: `"psicométrico"` | Eliminado |
| Keyword nuevo: `"5.11.3"` | ✓ |
| Match seguro: solo `### 5.11.3 Flujo de inicio del cuestionario psicométrico` en Cap V | ✓ |
| NO matchea ningún heading de Cap III | ✓ |

---

## 3. Defectos conocidos heredados de v0.4 (no corregidos en v0.5)

| ID | Severidad | Descripción | Para |
|----|-----------|-------------|------|
| P0-01 | P0 | Portada: fecha de presentación aún pendiente | v1.0 |
| P0-03 | P0 | TOC placeholder visible hasta apertura en Word | Instrucción al usuario |
| P1-01 | P1 | Fig 5.9 duplicada en §7.5.4 por keyword match | Revisar |
| P2-01 | P2 | EV-5B-02, EV-5B-03 aparecen como marcadores rojos | Pendiente captura |
| E-09 | P2 | Logo ITESZ no incluido en portada | v1.0 |

---

## 4. Lista de verificación visual (abrir DOCX en Word)

- [ ] Portada: "MATRÍCULA: 22010350" aparece debajo del nombre
- [ ] Portada: NO aparece "Reporte de titulación que para obtener..."
- [ ] Portada: NO aparece la nota anterior de matrícula pendiente
- [ ] Header de páginas internas: solo dice "ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES"
- [ ] NO hay sección "ABSTRACT" en el documento
- [ ] RESUMEN sí aparece (en español)
- [ ] Fig 5.19 (preguntas Likert) aparece en §5.11.1 (Cap V), no en Cap III
- [ ] Fig 5.21 (diagrama inicio psicométrico) aparece en §5.11.3 (Cap V), no en Cap III
- [ ] Fig 5.16 y 5.17 aparecen como marcadores amarillos (pendiente real)
- [ ] TOC, TOF, TOT se actualizan correctamente al presionar F9 en Word
- [ ] Paginación: ~158 páginas (sin Abstract)

---

## 5. Instrucciones de apertura del DOCX

1. Abrir `UCES_Trabajo_B_Revision_v05.docx` en Microsoft Word
2. Si aparece mensaje "Este documento contiene campos que pueden necesitar actualización": aceptar
3. Presionar **Ctrl+A** → **F9** para actualizar todos los campos
4. Revisar portada y primeras páginas
5. Buscar (Ctrl+F) "5.11.1" para verificar ubicación de Fig 5.19
6. Verificar que NO existe la palabra "ABSTRACT" como título de sección

---

## 6. Estado para entrega institucional

| Requisito | Estado |
|-----------|--------|
| Título completo | ✓ |
| Autor con matrícula | ✓ (22010350) |
| Asesor | ✓ (Dr. Francisco Rodríguez) |
| Institución | ✓ (ITESZ) |
| Carrera | ✓ (ISC) |
| Modalidad | ✓ (Proyecto innovador) |
| Resumen español | ✓ |
| Abstract inglés | ELIMINADO (v0.5) |
| 7 capítulos completos | ✓ |
| 33 referencias APA 7 | ✓ |
| Fecha de presentación | PENDIENTE |
| Logo ITESZ | PENDIENTE |
| Firma/sello asesor | PENDIENTE |
