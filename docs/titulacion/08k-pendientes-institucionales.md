# 08k-pendientes-institucionales.md
# Corte 8K — Pendientes institucionales para v1.0 (entrega definitiva)
**Fecha:** 2026-10-25 | **Versión actual:** v0.8

---

## Estado de hallazgos — CERRADO (100 % en v0.8)

Todos los hallazgos de la auditoría visual fueron resueltos en Corte 8K:

| Hallazgo | Estado en v0.8 |
|----------|---------------|
| H-01 Portada fecha con corchetes | ✓ Resuelto (K01) |
| H-02/H-03 Marcadores [EV-01]/[EV-06] | ✓ Resueltos (K06) |
| H-04 Referencia "versión v0.4" | ✓ Resuelto (K07) |
| H-05 Tablas T-03/T-04/T-05 fragmentadas | ✓ Resuelto (K04) |
| H-06 §1.7 descripción Cap IV incorrecta | ✓ Resuelto (K05) |
| H-07 §1.7 Anexos no existentes anunciados | ✓ Resuelto (K05) |
| H-08 Metadatos de auditoría en bibliografía | ✓ Resuelto (K02 + K09) |
| H-09 fig_num "5.5" duplicado | ✓ Resuelto (K03) |
| H-10 "D-01 y D-02" incorrecto en Resumen | ✓ Resuelto (K08) |

---

## Pendientes P0 — Bloquean la entrega final

| # | Tarea | Cómo resolver |
|---|-------|---------------|
| P0-1 | **Fecha de presentación en portada** | Confirmar con coordinación académica → agregar `DATOS["fecha"]` en `generar-docx-v08.py` y reemplazar la nota gris por `centered(DATOS["fecha"], 11)` en `add_cover()` |
| P0-2 | **Aprobación del asesor Dr. Francisco Rodríguez** | Enviar v0.8 PDF como borrador de revisión |
| P0-3 | **TOC/TOF/TOT actualizados en Word** | Abrir DOCX y presionar Ctrl+A → F9 antes de imprimir (o confirmar que COM ya los actualizó al exportar) |

---

## Pendientes P1 — Mejoran el documento

| # | Tarea | Impacto |
|---|-------|---------|
| P1-1 | Logo ITESZ en portada (PNG/SVG) | Incorporar en `add_cover()` del generador con `doc.add_picture(logo_path, width=Cm(4))` |
| P1-2 | Confirmar referencias con PENDIENTE (ahora limpias en texto, pero datos pendientes de verificación real) | Arciniega Robles año, Meta React 19 URL exacta, Nielsen Norman artículo específico, SEGOB fuente correcta, Clariana & Wallace pertinencia |

---

## Pendientes P2 — Verificación antes de entrega

| # | Tarea | Acción |
|---|-------|--------|
| P2-1 | Fig 5.19 (EV-5A-17): verificar que scores psicométricos sean > 0 | Abrir PDF → §5.11.5 → observar Figura 5.19 |
| P2-2 | Inspección visual página por página del PDF v0.8 | Abrirlo en Acrobat o Word y confirmar 0 marcadores rojos/amarillos |
| P2-3 | Tablas T-03 a T-05: confirmar ancho de columna "Detalle" legible en PDF v0.8 | Abrir PDF → §4.6 → verificar PP. 64-66 |

---

## Instrucciones para generar v1.0 desde v0.8

1. Obtener confirmación de fecha de presentación del coordinador académico
2. En `generar-docx-v08.py`, agregar:
   ```python
   DATOS["fecha"] = "Zamora, Michoacán — [MES] de 2026"
   ```
   Y en `add_cover()`, reemplazar la nota gris de fecha por:
   ```python
   centered(DATOS["fecha"], 11)
   ```
3. (Opcional) Agregar logo ITESZ: `doc.add_picture(logo_path, width=Cm(4))` en `add_cover()`
4. Verificar Fig 5.19 visualmente (scores > 0)
5. Ejecutar el generador → DOCX v1.0
6. Abrir en Word → Ctrl+A → F9 → revisar TOC/TOF/TOT
7. Exportar PDF final
8. Enviar al asesor para aprobación

---

## Estado de entregables al cierre del Corte 8K

| Archivo | Tamaño | Estado |
|---------|--------|--------|
| `entregables/UCES_Trabajo_B_Revision_v07.docx` | ~3,711 KB | Archivado |
| `entregables/UCES_Trabajo_B_Revision_v08.docx` | 3,711 KB | **VERSIÓN ACTIVA** |
| `entregables/UCES_Trabajo_B_Revision_v08.pdf` | 3,524 KB | **VERSIÓN ACTIVA** |
| `entregables/generar-docx-v08.py` | — | Generador activo |
