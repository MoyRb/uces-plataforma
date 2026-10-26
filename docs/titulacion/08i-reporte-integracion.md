# 08i-reporte-integracion.md
# Corte 8I — Reporte de integración de capturas
**Fecha:** 2026-10-25 | **Versión generada:** v0.6

---

## 1. Inspección de directorios

| Directorio | Estado | Archivos encontrados |
|-----------|--------|---------------------|
| `evidencias/08h/supabase/` | EXISTE | 4 PNG válidas |
| `evidencias/08h/aplicacion/` | NO EXISTE | — |
| `evidencias/08c/candidato/` | EXISTE | 16 archivos |
| `evidencias/08c/administrador/` | EXISTE | 1 archivo |
| `evidencias/08c/validaciones/` | EXISTE | 3 archivos |

---

## 2. Inventario de capturas Supabase Studio

| ID | Archivo | Resolución | Tamaño | Estado |
|----|---------|-----------|--------|--------|
| SB-01 | SB-01-tablas-pobladas.png | 1917×1077 px | 357 KB | ✓ VÁLIDA — integrada como Fig 5.23 |
| SB-02 | SB-02-esquema-relacional.png | 1915×1077 px | 298 KB | ✓ VÁLIDA — integrada como Fig 5.24 |
| SB-03 | SB-03-usuarios-auth.png (renombrada) | 1915×1070 px | 293 KB | ✓ VÁLIDA — integrada como Fig 5.25 |
| SB-04 | SB-04-storage-evidencias.png | 1917×1077 px | 160 KB | ✓ VÁLIDA — integrada como Fig 5.26 |

> **Nota:** `SB-03` tenía doble extensión (`.png..png`). Renombrado a `.png` antes de la integración.

---

## 3. Inventario de capturas de aplicación

| ID | Archivo | Tamaño | Estado |
|----|---------|--------|--------|
| EV-5A-02 | EV-5A-02-landing.png | 112 KB | ✓ Válida |
| EV-5A-05 | EV-5A-05-registro-formulario.png | 222 KB | ✓ Válida |
| EV-5A-06 | EV-5A-06-curp-duplicada.png | 221 KB | ✓ Válida |
| EV-5A-07 | EV-5A-07-login.png | 240 KB | ✓ Válida |
| EV-5A-09 | EV-5A-09-panel-candidato.png | 198 KB | ✓ Válida |
| EV-5A-11 | EV-5A-11-vacantes.png | 9 KB | ✗ INVÁLIDA — imagen casi negra (mean ~0.19/255). Conserva marcador en Fig 5.10. |
| EV-5A-12 | EV-5A-12-detalle-vacante.png | 155 KB | ✓ Válida |
| EV-5A-15 | EV-5A-15-psicometrico-preguntas.png | 55 KB | ✓ Válida |
| EV-5A-17 | EV-5A-17-resultado-psicometrico.png | 40 KB | ✓ Válida (caption documenta posibles scores 0) |
| EV-5A-19 | EV-5A-19-subida-evidencia.png | 148 KB | ✓ Válida |
| EV-5B-01 | EV-5B-01-admin-panel.png | 200 KB | ✓ Válida |
| EV-5B-02 | — | — | ✗ AUSENTE — Fig 5.16 conserva marcador rojo |
| EV-5B-03 | — | — | ✗ AUSENTE — Fig 5.17 conserva marcador rojo |
| EV-5B-08 | EV-5B-08-acceso-denegado.png | 200 KB | ✓ Válida |
| EV-5B-13 | EV-5B-13-guard-prereq.png | 22 KB | ✓ Válida |
| EV-5B-15 | EV-5B-15-d01-guard-score.png | 155 KB | ✓ Válida |
| EV-6C-04 | EV-6C-04-cp07-guard-d01.png | 22 KB | ✓ Válida |
| EV-6C-06 | EV-6C-06-cp18-stats-d03.png | 8 KB | ✓ Válida (JSON de error sin sesión) |
| EV-6C-07 | EV-6C-07-cp22-rls.png | 156 KB | ✓ Válida |

---

## 4. Asignación de Supabase Studio a capítulo V

| Fig | ID | Sección | Keyword | Descripción académica |
|----|-----|---------|---------|----------------------|
| 5.23 | SB-01 | §5.9.6 Consulta de postulaciones | `"5.9.6"` | Tabla applications con postulaciones en distintos estados |
| 5.24 | SB-02 | §5.2.2 Variables de entorno | `"5.2.2"` | Esquema relacional completo — 13 tablas con FK |
| 5.25 | SB-03 | §5.10.1 Autenticación Supabase Auth | `"5.10.1"` | Panel de usuarios auth registrados |
| 5.26 | SB-04 | §5.10.9 Almacenamiento privado | `"5.10.9"` | Bucket evidences con acceso privado |

---

## 5. Modificaciones al Capítulo V

Párrafos académicos añadidos al final de:
- §5.2.2: referencia a Fig 5.24 (esquema relacional)
- §5.9.6: referencia a Fig 5.23 (tablas pobladas)
- §5.10.1: referencia a Fig 5.25 (usuarios auth)
- §5.10.9: referencia a Fig 5.26 (storage)

---

## 6. Resultado de la generación

| Métrica | v0.5 | v0.6 | Delta |
|---------|------|------|-------|
| Figuras en documento | 26 | 30 | +4 (Supabase Studio) |
| Tamaño DOCX | 2,671 KB | 3,712 KB | +1,041 KB |
| Tamaño PDF | 3,089 KB | 3,535 KB | +446 KB |
| COM update | OK | OK | = |
| Figuras colocadas | 26/26 | 30/30 | +4 |
