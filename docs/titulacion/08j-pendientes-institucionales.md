# 08j-pendientes-institucionales.md
# Corte 8J — Pendientes institucionales para v1.0 (entrega definitiva)
**Fecha:** 2026-10-25 | **Versión actual:** v0.7

---

## Estado de capturas — CERRADO (100%)

Todos los marcadores de capturas han sido resueltos en Corte 8J:

| EV-ID | Fig | Resolución |
|-------|-----|-----------|
| EV-5A-11 | — (eliminada) | Regla de Cierre — nota arquitectónica en §5.5.1 |
| EV-5B-02 | 5.15 | Capturada con `captura-v3.js` |
| EV-5B-03 | 5.16 | Capturada con `captura-v3.js` |

---

## Pendientes P0 — Bloquean la entrega final

| # | Tarea | Cómo resolver |
|---|-------|--------------|
| P0-1 | **Fecha de presentación en portada** | Confirmar con coordinación académica → agregar `DATOS["fecha"]` en `generar-docx-v07.py` |
| P0-2 | **Aprobación del asesor Dr. Francisco Rodríguez** | Enviar v0.7 PDF como borrador de revisión |
| P0-3 | **TOC visible en Word (Ctrl+A → F9)** | Abrir DOCX y actualizar campos antes de imprimir |

---

## Pendientes P1 — Mejoran el documento

| # | Tarea | Impacto |
|---|-------|---------|
| P1-1 | Logo ITESZ en portada (PNG/SVG) | Incorporar en `add_cover()` del generador |
| P1-2 | Fig 5.19 (EV-5A-17): verificar que scores psicométricos sean > 0 | Abrir PDF → §5.11 → observar Figura 5.19 |

---

## Pendientes P2 — Verificación antes de entrega

| # | Tarea | Acción |
|---|-------|--------|
| P2-1 | Bibliografía: fechas de acceso en entradas web | Ver `08g-validacion-bibliografia.md` |
| P2-2 | Referencia Arciniega Robles: confirmar nombre completo y año | Revisar portada del PDF `analisis-diseno-uces.pdf` |
| P2-3 | Inspección visual página por página del PDF final | Abrirlo en Acrobat o Word |

---

## Instrucciones para generar v1.0 desde v0.7

1. Obtener confirmación de fecha de presentación del coordinador académico
2. En `generar-docx-v07.py`, agregar:
   ```python
   DATOS["fecha"] = "Zamora, Michoacán — [MES] de 2026"
   ```
   Y en `add_cover()`, reemplazar la nota gris de fecha pendiente por:
   ```python
   centered(DATOS["fecha"], 11)
   ```
3. (Opcional) Agregar logo ITESZ: agregar `doc.add_picture(logo_path, width=Cm(4))` en `add_cover()`
4. Verificar Fig 5.19 visualmente (scores > 0)
5. Ejecutar el generador → DOCX v1.0
6. Abrir en Word → Ctrl+A → F9 → revisar TOC/TOF/TOT
7. Exportar PDF final
8. Enviar al asesor para aprobación

---

## Estado de entregables al cierre del Corte 8J

| Archivo | Tamaño | Estado |
|---------|--------|--------|
| `entregables/UCES_Trabajo_B_Revision_v05.docx` | 2,671 KB | Archivado |
| `entregables/UCES_Trabajo_B_Revision_v06.docx` | 3,712 KB | Archivado |
| `entregables/UCES_Trabajo_B_Revision_v07.docx` | (pendiente generar) | **PRÓXIMA VERSIÓN** |
| `entregables/generar-docx-v07.py` | — | Generador activo |
| `evidencias/08j/captura-v3.js` | — | Script de capturas |
