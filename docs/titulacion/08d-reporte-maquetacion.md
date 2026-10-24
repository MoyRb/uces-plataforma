# Reporte de maquetación — Corte 8D

**Fecha:** 2026-10-23
**Versión generada:** v0.1 (revisión interna — NO para entrega académica)
**Herramienta:** python-docx 1.2.0 + docx2pdf (Microsoft Word COM automation)
**Script generador:** `docs/titulacion/entregables/generar-docx.py`

---

## 1. Archivos generados

| Archivo | Tamaño | Estado |
|---|---|---|
| `entregables/UCES_Trabajo_B_Revision_v01.docx` | 2,065 KB | GENERADO ✓ |
| `entregables/UCES_Trabajo_B_Revision_v01.pdf` | 2,424 KB | GENERADO ✓ |

---

## 2. Parámetros editoriales aplicados (PROVISIONALES)

> **Declaración obligatoria:** Estos parámetros son provisionales. Se aplicaron en ausencia de plantilla institucional confirmada de UCES. No representan el formato oficial de la institución. Deben reemplazarse con la plantilla oficial cuando el autor o asesor la proporcione.

| Parámetro | Valor aplicado |
|---|---|
| Tamaño de papel | Carta (21.59 × 27.94 cm) |
| Fuente principal | Arial 11 pt |
| Interlineado | 1.5 líneas |
| Alineación del cuerpo | Justificado |
| Margen izquierdo | 3.0 cm |
| Margen derecho | 2.5 cm |
| Margen superior | 2.5 cm |
| Margen inferior | 2.5 cm |
| Estilos de heading | Heading 1: Arial 14pt negrita; H2: 12pt negrita; H3: 11pt negrita; H4: 11pt normal |
| Estilo de código | Courier New 9pt, fondo gris claro (#F2F2F2) |
| Estilo de cita en bloque | Sangría 1cm izq, borde izquierdo gris, cursiva 10pt |
| Estilo de leyenda de figura | Arial 9pt cursiva centrado |

---

## 3. Estructura del documento ensamblado

| Sección | Páginas | Observaciones |
|---|---|---|
| Portada institucional provisional | 1 | Metadatos en rojo: autor, matrícula, asesor sin confirmar |
| Resumen (español) | 2 | ~290 palabras; correcto |
| Abstract (inglés) | 2 | ~290 palabras; correcto |
| Marcadores de índices (TOC/Figuras/Tablas) | 1 | Texto en azul; actualizar manualmente en Word |
| Capítulo I — Introducción | 9 | §§1.1–1.7 completos |
| Capítulo II — Contexto organizacional | 9 | §§2.1–2.7 completos |
| Capítulo III — Marco teórico | 20 | §§3.1–3.11 completos |
| Capítulo IV — Metodología | 20 | §§4.1–4.7 completos |
| Capítulo V — Desarrollo e implementación | 70 | §§5.1–5.13 con figuras insertadas; muy extenso (ver §5 de este reporte) |
| Capítulo VI — Pruebas y resultados | 17 | §§6.1–6.6 con evidencias de CPs |
| Capítulo VII — Conclusiones | 14 | §§7.1–7.9 completos |
| Referencias bibliográficas | 3 | 33 entradas APA 7; 8 marcadas PENDIENTE |
| **Total** | **168** | |

---

## 4. Inventario de imágenes insertadas

### Capturas de pantalla (14 imágenes reales)

| # | ID | Archivo | Estado en DOCX | Observaciones |
|---|---|---|---|---|
| 1 | EV-5A-02 | landing.png | INSERTADA | §5.2 — landing page ✓ |
| 2 | EV-5A-05 | registro-formulario.png | INSERTADA | §5.3 — formulario registro ✓ |
| 3 | EV-5A-06 | curp-duplicada.png | INSERTADA | §5.3 — error CURP ✓ |
| 4 | EV-5A-07 | login.png | INSERTADA | §5.3 — formulario login ✓ |
| 5 | EV-5A-09 | panel-candidato.png | INSERTADA* | §5.4 ✓ — **TAMBIÉN aparece en §7.5.4 por coincidencia de keyword "5.4"** |
| 6 | EV-5A-11 | — | MARCADOR ROJO | Imagen 404 inválida — placeholder editorial |
| 7 | EV-5A-12 | detalle-vacante.png | INSERTADA | §5.5 — detalle vacante ✓ |
| 8 | EV-5A-15 | psicometrico-preguntas.png | INSERTADA | §5.11 — TEST MINI BIG FIVE ✓ |
| 9 | EV-5A-19 | subida-evidencia.png | INSERTADA | §5.6 — subida de evidencia ✓ |
| 10 | EV-5B-01 | admin-panel.png | INSERTADA | §5.9 — panel admin ✓ |
| 11 | EV-5B-02 | — | MARCADOR ROJO | Pendiente de captura |
| 12 | EV-5B-13 | guard-prereq.png | INSERTADA | §5.11 — guard prerequisito ✓ |
| 13 | EV-5B-15 | d01-guard-score.png | INSERTADA | §5.13 — discrepancia D-01 ✓ |
| 14 | EV-6C-04 | cp07-guard-d01.png | INSERTADA | §6.5 — CP-07 ✓ |
| 15 | EV-6C-07 | cp22-rls.png | INSERTADA | §6.5 — CP-22 ✓ |

### Diagramas Mermaid (4 de 6 insertados)

| # | Archivo | Estado | Sección |
|---|---|---|---|
| 1 | fig-5-6-flujo-requireAdmin.png | INSERTADA | §5.9 (keyword "requireAdmin") |
| 2 | fig-5-7-inicio-psicometrico.png | INSERTADA | §5.11 (keyword "psicométrico") |
| 3 | fig-5-4-secuencia-evidencias.png | INSERTADA | §5.8 (keyword "5.8") |
| 4 | fig-5-2-secuencia-registro.png | INSERTADA | §5.3 (keyword "Diagramas de secuencia") |
| — | fig-5-3-secuencia-postulacion.png | NO INSERTADA | Keyword no coincidió con ningún heading |
| — | fig-5-5-persistencia-decisiones.png | NO INSERTADA | Keyword no coincidió con ningún heading |

### No insertadas (captions ausentes o no triggered)

| ID | Razón |
|---|---|
| EV-5A-17 | Keyword "Resultado psicométrico" no coincidió con heading — parece no estar en Cap V como heading explícito |
| EV-5B-03 | Keyword "Decisión" no disparado (heading no encontrado con esa cadena) |
| EV-5B-08 | Keyword "Acceso denegado" no disparado |
| EV-6C-05 | Keyword "CP-20" no disparado (no aparece como heading) |
| EV-6C-06 | Keyword "CP-18" no disparado (no aparece como heading) |

---

## 5. Defectos detectados en v0.1

### P0 — Bloquean lectura o uso

| ID | Descripción |
|---|---|
| P0-01 | Portada sin nombre de autor, matrícula ni asesor — placeholders rojos visibles |
| P0-02 | EV-5A-11 es una página 404 inválida — insertada solo como marcador |
| P0-03 | Índice general, de figuras y de tablas son placeholders (no generados automáticamente) |

### P1 — Defectos de contenido o maquetación relevantes

| ID | Descripción |
|---|---|
| P1-01 | Fig. 5.9 (panel candidato) aparece duplicada en §7.5.4 de Cap VII por coincidencia del keyword "5.4" con la sección "7.5.4 Incidencias" |
| P1-02 | EV-5A-17 muestra confirmación de envío (UNDER_REVIEW), no scores por rasgo — caption corregido pero la imagen no ilustra la clasificación Big Five |
| P1-03 | 5 capturas no disparadas (EV-5A-17, EV-5B-03, EV-5B-08, EV-6C-05, EV-6C-06) — no colocadas por no coincidir con headings |
| P1-04 | fig-5-3 y fig-5-5 no insertados — keywords no coincidieron |
| P1-05 | EV-6C-06 muestra error de autenticación, no la discrepancia D-03 (2 métricas) — caption corregido pero imagen no ilustra el defecto previsto |
| P1-06 | Cap V con 70 páginas — posibles saltos de página excesivos entre secciones con figuras |
| P1-07 | Párrafos de markdown que empiezan en mitad de una línea (ej. `**OE-01.**`) convertidos como párrafo normal, perdiendo la numeración visual |
| P1-08 | Las listas `**OE-01.**...**OE-07.**` en Cap I no se convierten como lista — están en párrafos normales |
| P1-09 | 2 capturas admin EV-5B-02 y EV-5B-03 siguen pendientes de captura |

### P2 — Mejoras estéticas menores

| ID | Descripción |
|---|---|
| P2-01 | Formato de portada: logo UCES ausente |
| P2-02 | Encabezado de página (header) no implementado |
| P2-03 | Numeración de páginas no configurada (sin campo automático de número de página) |
| P2-04 | Tablas de código con salto de fila en el medio (sin control de "mantener juntos") |
| P2-05 | Borde rojo de placeholders puede no verse bien en impresión en blanco y negro |
| P2-06 | Fig. 5.1 (ASCII art arquitectura) no reemplazada por imagen — el texto original aparece como bloque de código |

---

## 6. Técnica de conversión empleada

- **Entrada:** 7 archivos Markdown (.md) + 2 preliminares + 1 bibliografía
- **Parser:** Conversor Markdown → python-docx escrito ad hoc en `generar-docx.py`
- **Figuras:** Insertadas tras detección de keywords en headings; 4 placeholders para imágenes faltantes/inválidas
- **PDF:** Generado vía docx2pdf (Microsoft Word COM automation en Windows) — PDF nativo, no simulado

---

## 7. Datos para v0.2

Para la versión v0.2, el `generar-docx.py` deberá:
1. Reemplazar el sistema de keywords por mapa de sección → figura con identificadores exactos de heading
2. Agregar EV-5A-17, EV-5B-08 y EV-6C-05/06 con sus headings correctos
3. Agregar fig-5-3 y fig-5-5 con sus headings correspondientes
4. Corregir la duplicación de Fig. 5.9 en Cap VII
5. Agregar header automático con número de página
6. Mejorar el manejo de las listas OE-XX con numeración explícita
