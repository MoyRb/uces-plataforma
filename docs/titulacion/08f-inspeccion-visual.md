# Inspección visual — Corte 8F

**Fecha:** 2026-10-23
**Versión:** v0.3
**Archivo:** `UCES_Trabajo_B_Revision_v03.pdf` (3,020 KB, 163 páginas)

---

## Lista de verificación (15 puntos requeridos)

| # | Verificación | Resultado | Observaciones |
|---|---|---|---|
| 1 | Portada correctamente formateada | OK | p.1 — sin header/footer en portada |
| 2 | "Moisés Medina Moreno" en portada | OK | Confirmado en extracción de texto p.1 |
| 3 | "Dr. Francisco Rodríguez" en portada | OK | Confirmado en extracción de texto p.1 |
| 4 | Nombre de la institución (ITESZ) | OK | "INSTITUTO TECNOLÓGICO DE ESTUDIOS SUPERIORES DE ZAMORA" en p.1 |
| 5 | Índice general completo | OK | pp.7–14, todos los capítulos con números de página reales |
| 6 | Números de página en índice general | OK | Generados vía Word COM, no hardcodeados |
| 7 | Índice de figuras con 25 entradas | OK | pp.15–16, 25 figuras con página real |
| 8 | Índice de tablas con 33 entradas | OK | pp.17–18, 33 tablas con página real |
| 9 | Notas de fuente en figuras | OK | Todas las figuras tienen caption con fuente |
| 10 | Referencias a figuras en texto | PARCIAL | Referencias en negrita existen pero no son campos REF vinculados |
| 11 | Cero figuras duplicadas | OK | Figura 5.9 aparece en p.89 solo; en p.15 es la entrada del índice (esperado) |
| 12 | Paginación coherente | OK | 163 páginas, numeración continua desde p.2 |
| 13 | Títulos de capítulos correctos | OK | Todos los capítulos I–VII visibles en TOC |
| 14 | Páginas con tablas e imágenes | OK | 33 tablas con caption visible en índice; 25 figuras colocadas |
| 15 | Campos de Word sin errores | OK | COM actualizó 3 TOC sin errores; PDF generado correctamente |

---

## Inspección detallada por página

### Portada (p.1)
```
INSTITUTO TECNOLÓGICO DE ESTUDIOS SUPERIORES DE ZAMORA
INGENIERÍA EN SISTEMAS COMPUTACIONALES
[Título completo del proyecto]
Reporte de titulación que para obtener el título de
Ingeniero en Sistemas Computacionales
Presenta: Moisés Medina Moreno
Asesor: Dr. Francisco Rodríguez
Modalidad de titulación: Proyecto innovador
Zamora, Michoacán, México
[Nota: matrícula y fecha pendientes]
```
**Estado:** CORRECTO — sin header/footer en primera página

### Resumen y Abstract (pp.2–6)
Header activo: `"ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES | Reporte de Titulación"`
Footer activo: `"— N —"` donde N es el número real de página.

### Índice General (pp.7–14)
- 8 páginas reales (vs. 1 placeholder en v0.1)
- Todos los capítulos I–VII con subsecciones hasta H3
- Números de página reales actualizados por Word COM

### Índice de Figuras (pp.15–16)
- 25 entradas
- Cada entrada: número de figura + caption completo + número de página
- Ejemplo: `Figura 5.9. Panel principal del candidato autenticado (/panel). Captura de UCES Plataforma de Talento, 2026. ........... 89`

### Índice de Tablas (pp.17–18)
- 33 entradas
- Cada entrada: "Tabla N.M. Descripción." + número de página
- Ejemplo: `Tabla 6.12. Tabla resumen de resultados de ejecución. ......... 141`

### §5.4 Panel del candidato (p.89)
- Header: `"ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES | Reporte de Titulación"`
- Footer: `"— 89 —"`
- Figura 5.9 aparece correctamente
- **P1-01 CONFIRMADO RESUELTO:** §7.5.4 (p.155) no contiene Figura 5.9

### §7.5.4 Incidencias detectadas (p.155)
- No contiene ninguna imagen de "panel del candidato"
- Solo texto de incidencias detectadas durante las pruebas

---

## Defectos residuales identificados en v0.3

| ID | Prioridad | Descripción |
|---|---|---|
| P0-01 | P0 | Matrícula y fecha no confirmadas — nota gris en portada |
| P0-03 | P0 | Logo institucional ITESZ ausente |
| P1-02 | P1 | EV-5A-17 muestra UNDER_REVIEW, no scores psicométricos reales |
| P1-05 | P1 | EV-6C-06 muestra error 401, no respuesta real de D-03 |
| P1-06 | P1 | Cap V extenso (~56 páginas) — código en cuerpo, sin Anexo A |
| P1-08 | P1 | EV-5B-02 y EV-5B-03 sin captura (placeholders en §5.9.8 y §5.10) |
| P1-09 | P1 | Fig 5.1 sigue siendo ASCII art de arquitectura (no imagen vectorial) |
| P1-10 | P1 | Referencias cruzadas en texto son texto plano (no campos REF de Word) |
| P2-01 | P2 | Plantilla Word ITESZ no aplicada (parámetros provisionales) |
| P2-06 | P2 | Saltos de página explícitos entre capítulos |

---

## Recomendación para inspección manual adicional

Se recomienda que el autor abra `UCES_Trabajo_B_Revision_v03.pdf` en Adobe Acrobat o Word y verifique:

1. **p.1** — Portada completa y legible
2. **pp.7–14** — Índice general (confirmar que los números de página sean correctos)
3. **pp.15–16** — Índice de figuras (25 entradas)
4. **pp.17–18** — Índice de tablas (33 entradas)
5. **pp.75–130** — Cap V (figuras y diagramas en posición correcta)
6. **p.89** — Figura 5.9 en §5.4
7. **p.155** — §7.5.4 sin figura duplicada
8. **pp.131–147** — Cap VI con evidencias de casos de prueba
9. **pp.161–163** — Referencias bibliográficas (33 entradas)
