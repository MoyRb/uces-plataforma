# 08i-pendientes-finales.md
# Corte 8I — Pendientes para v1.0 (entrega definitiva)
**Fecha:** 2026-10-25 | **Versión actual:** v0.6

---

## Pendientes P0 — Bloquean la entrega

| # | Tarea | Cómo resolver |
|---|-------|--------------|
| P0-1 | Fecha de presentación en portada | Confirmar con coordinación académica → agregar `DATOS["fecha"]` en generador |
| P0-2 | Aprobación del asesor Dr. Francisco Rodríguez | Enviar v0.6 como borrador de revisión |
| P0-3 | TOC visible en Word (Ctrl+A → F9) | Abrir DOCX y actualizar campos antes de imprimir |

---

## Pendientes P1 — Mejoran significativamente el documento

| # | Tarea | Impacto |
|---|-------|---------|
| P1-1 | EV-5B-02: captura de `/admin/attempts/[id]` con candidato con intento completo | Reemplaza marcador en Fig 5.16 |
| P1-2 | EV-5B-03: formulario de decisión admin (misma sesión que P1-1) | Reemplaza marcador en Fig 5.17 |
| P1-3 | EV-5A-11: re-capturar pantalla de vacantes (imagen actual negra, inválida) | Reemplaza marcador en Fig 5.10 |
| P1-4 | Logo ITESZ en portada (proporcionar PNG/SVG) | Incorporar en `add_cover()` |

---

## Pendientes P2 — Verificación antes de entrega

| # | Tarea | Acción |
|---|-------|--------|
| P2-1 | Fig 5.20 (EV-5A-17): verificar que los scores psicométricos sean > 0 | Abrir PDF → §5.11.5 → observar Figura 5.20 |
| P2-2 | Bibliografía: fechas de acceso en entradas web (Vercel, Supabase, React, NN/g) | Ver `08g-validacion-bibliografia.md` |
| P2-3 | Referencia Arciniega Robles: confirmar nombre completo y año exacto | Revisar portada del PDF `analisis-diseno-uces.pdf` |
| P2-4 | Inspección visual página por página del PDF final | Abrirlo en Acrobat o Word |

---

## Instrucciones para generar v1.0 desde v0.6

1. Obtener capturas EV-5B-02, EV-5B-03, EV-5A-11 (ver `08h-guia-capturas-manuales.md`)
2. Colocarlas en `evidencias/08c/administrador/` y `evidencias/08c/candidato/`
3. En `generar-docx-v06.py` (o crear v07):
   - Fig 5.16: cambiar `None` → `IMGS_ADM / "EV-5B-02-admin-detalle-candidato.png"`
   - Fig 5.17: cambiar `None` → `IMGS_ADM / "EV-5B-03-admin-decision-form.png"`
   - Fig 5.10: cambiar `None` → `IMGS_CAP / "EV-5A-11-vacantes.png"` (y actualizar caption)
4. Agregar `DATOS["fecha"]` con la fecha de presentación oficial
5. Agregar logo ITESZ si se dispone del archivo
6. Ejecutar el generador → v1.0
7. Abrir en Word → Ctrl+A → F9 → revisar TOC
8. Exportar PDF final

---

## Estado de entregables actuales

| Archivo | Tamaño | Estado |
|---------|--------|--------|
| `entregables/UCES_Trabajo_B_Revision_v05.docx` | 2,671 KB | Archivado |
| `entregables/UCES_Trabajo_B_Revision_v05.pdf` | 3,089 KB | Archivado |
| `entregables/UCES_Trabajo_B_Revision_v06.docx` | 3,712 KB | **VERSIÓN ACTUAL** |
| `entregables/UCES_Trabajo_B_Revision_v06.pdf` | 3,535 KB | **VERSIÓN ACTUAL** |
| `entregables/generar-docx-v06.py` | — | Generador activo |
