# 08j-reporte-cierre.md
# Corte 8J — Reporte de cierre de capturas y generación de v0.7
**Fecha:** 2026-10-25 | **Versión generada:** v0.7 (pendiente de ejecución)

---

## 1. Objetivo del corte

Corte 8J cierra el ciclo de capturas de evidencias visuales antes de la versión final v1.0.
Las tres tareas principales:

| Tarea | Estado |
|-------|--------|
| EV-5B-02: captura de `/admin/attempts/[id]` | Herramienta lista (`captura-v3.js`) |
| EV-5B-03: formulario de decisión admin | Herramienta lista (`captura-v3.js`) |
| EV-5A-11: lista de vacantes (imagen negra) | Regla de Cierre aplicada |

---

## 2. EV-5A-11 — Regla de Cierre

### Diagnóstico
- Ruta `/vacantes` no existe en el proyecto (solo `/vacantes/[id]`).
- La captura obtenida en Corte 8C (`9 KB`, `mean ≈ 0.19/255`) es una pantalla 404.
- Decisión: la ausencia de `/vacantes` es una **decisión de diseño arquitectónico** documentable.

### Acción aplicada
1. Fig 5.10 (marcador EV-5A-11) **eliminada** del generador.
2. Nota arquitectónica añadida al texto de `§5.5.1` del Capítulo V:
   > La plataforma no implementa una ruta de listado general de vacantes (`/vacantes`).
   > El acceso se realiza exclusivamente mediante la URL directa `/vacantes/[id]` desde el módulo.
3. Renumeración en cascada: Figs 5.11-5.26 → 5.10-5.25.
4. Referencias en texto Cap. V actualizadas (4 párrafos Supabase Studio).

---

## 3. EV-5B-02 y EV-5B-03 — Script de captura

### Herramienta: `evidencias/08j/captura-v3.js`

| Parámetro | Valor |
|-----------|-------|
| Admin | `c.mendoza@itesz.edu.mx` / `Uces2026#Prueba!` |
| Attempt strategy | Demo d2200* COMPLETED → any COMPLETED → SUBMITTED → latest |
| Output | `evidencias/08j/administrador/` |
| Viewport | 1440×900 |

### Para ejecutar

```bash
cd C:/uces-plataforma
node docs/titulacion/evidencias/08j/captura-v3.js
```

### Prerrequisitos
1. App corriendo en `http://localhost:3000`
2. Usuario `c.mendoza@itesz.edu.mx` en Supabase con rol admin
3. Al menos un attempt en la BD (ejecutar `supabase/demo/03-seed-flujos.sql` si no hay ninguno)

### Capturas esperadas

| ID | Archivo | Descripción |
|----|---------|-------------|
| EV-5B-02 | `EV-5B-02-admin-detalle-candidato.png` | Vista superior: Resumen + Resumen psicométrico |
| EV-5B-03 | `EV-5B-03-admin-decision.png` | Vista scrolleada: "Acciones de revisión" con selector y botones |

---

## 4. Cambios en el generador (v0.7 vs v0.6)

| Cambio | Descripción |
|--------|-------------|
| J01 | EV-5B-02 → Fig 5.15 (era 5.16, placeholder `None`) |
| J02 | EV-5B-03 → Fig 5.16 (era 5.17, placeholder `None`) |
| J03 | EV-5A-11 eliminada, Figs 5.11-5.26 renumeradas como 5.10-5.25 |
| J04 | 4 refs Supabase Studio en Cap V texto: 5.23-5.26 → 5.22-5.25 |
| — | `IMGS_8J = BASE / "evidencias/08j/administrador"` añadido |
| — | `OUT_DOCX/PDF` apuntan a `v07` |

---

## 5. Para generar v0.7

```bash
cd C:/uces-plataforma/docs/titulacion/entregables
python generar-docx-v07.py
```

Si EV-5B-02/EV-5B-03 no existen aún, el generador insertará un placeholder en amarillo
(comportamiento heredado de `insert_image()`). Las capturas pueden obtenerse y regenerar
sin modificar el generador.

---

## 6. Diferencias de versión esperadas

| Métrica | v0.6 | v0.7 estimado |
|---------|------|---------------|
| Figuras totales | 30 | 29 (eliminada Fig 5.10) |
| Marcadores pendientes | 3 (Figs 5.10, 5.16, 5.17) | 0 (todas reales) |
| Cap. V figuras | 26 | 25 |
| DOCX esperado | 3,712 KB | ~4,300 KB (+EV-5B-02/03 + nota) |
