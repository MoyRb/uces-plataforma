# 08i-control-calidad.md
# Corte 8I — Control de calidad v0.6
**Fecha:** 2026-10-25

---

## 1. Métricas

| Métrica | v0.5 | v0.6 | Delta |
|---------|------|------|-------|
| Tamaño DOCX | 2,671 KB | 3,712 KB | +1,041 KB |
| Tamaño PDF | 3,089 KB | 3,535 KB | +446 KB |
| Figuras totales | 26 | 30 | +4 |
| Tablas | 33 | 33 | = |
| COM update | OK | OK | = |
| Páginas estimadas | ~158 | ~165 | +7 (4 fig. Studio ≈ 4p + párrafos) |

---

## 2. Verificación de correcciones I01–I04

### I01 — 4 capturas Supabase Studio integradas

| Fig | Sección | Keyword | Archivo existe | Resolución | Estado |
|----|---------|---------|---------------|-----------|--------|
| 5.23 | §5.9.6 | `"5.9.6"` | ✓ SB-01-tablas-pobladas.png (357KB) | 1917×1077 | ✓ |
| 5.24 | §5.2.2 | `"5.2.2"` | ✓ SB-02-esquema-relacional.png (298KB) | 1915×1077 | ✓ |
| 5.25 | §5.10.1 | `"5.10.1"` | ✓ SB-03-usuarios-auth.png (293KB, renombrado) | 1915×1070 | ✓ |
| 5.26 | §5.10.9 | `"5.10.9"` | ✓ SB-04-storage-evidencias.png (160KB) | 1917×1077 | ✓ |

### I02 — Párrafos académicos en Cap V

| Sección | Párrafo añadido | Referencia a figura |
|---------|-----------------|---------------------|
| §5.2.2 | "La Figura 5.24 ilustra la estructura relacional..." | Fig 5.24 |
| §5.9.6 | "La Figura 5.23 muestra el estado de la tabla applications..." | Fig 5.23 |
| §5.10.1 | "La Figura 5.25 muestra el panel de gestión de usuarios..." | Fig 5.25 |
| §5.10.9 | "La Figura 5.26 presenta el bucket evidences..." | Fig 5.26 |

### I03 — EV-5A-11 conserva marcador

| Verificación | Estado |
|-------------|--------|
| Imagen inválida detectada (9KB, mean ~0.19/255) | ✓ Detectada |
| Fig 5.10 conserva texto de marcador (ruta 404 por diseño) | ✓ |
| No se sustituyó con imagen negra | ✓ |

### I04 — EV-5B-02 y EV-5B-03 conservan marcadores

| Fig | Estado |
|----|--------|
| 5.16 (EV-5B-02) | MARCADOR ROJO — archivo ausente |
| 5.17 (EV-5B-03) | MARCADOR ROJO — archivo ausente |

---

## 3. Correcciones heredadas de v0.5 (verificadas, no duplicadas)

| Corrección | Aplicada desde | Estado en v0.6 |
|-----------|---------------|----------------|
| Matrícula 22010350 en portada | v0.5 (H01) | ✓ Conservada |
| Header sin "Reporte de Titulación" | v0.5 (H02) | ✓ Conservada |
| Abstract eliminado | v0.5 (H03) | ✓ Conservada |
| Fig 5.19 keyword "5.11.1" | v0.5 (H04) | ✓ Conservada |
| Fig 5.21 keyword "5.11.3" | v0.5 (H05) | ✓ Conservada |

---

## 4. Lista de verificación visual (abrir en Word)

- [ ] Portada: "MATRÍCULA: 22010350" visible bajo nombre del autor
- [ ] Header: solo "ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES"
- [ ] NO existe sección ABSTRACT
- [ ] Fig 5.23 aparece en §5.9.6 (Cap V), muestra tabla de Supabase Studio con registros
- [ ] Fig 5.24 aparece en §5.2.2 (Cap V), muestra el esquema relacional con 13 tablas
- [ ] Fig 5.25 aparece en §5.10.1 (Cap V), muestra panel de usuarios de Supabase Auth
- [ ] Fig 5.26 aparece en §5.10.9 (Cap V), muestra bucket evidences privado
- [ ] Figs 5.19 y 5.21 aparecen en §5.11 (Cap V), NO en Cap III
- [ ] Fig 5.10, 5.16, 5.17 muestran marcadores (texto amarillo/rojo) — normal hasta obtener capturas
- [ ] Todas las imágenes son legibles (resolución ~1440×900 o ~1917×1077)
- [ ] TOC, TOF, TOT actualizados (Ctrl+A → F9 en Word)
- [ ] ~165 páginas aproximadas

---

## 5. Nota sobre autenticidad de capturas Supabase Studio

Las 4 capturas de Supabase Studio (SB-01..04) son capturas auténticas del entorno de demostración creado con los scripts `supabase/demo/02-seed-catalogos.sql` y `supabase/demo/03-seed-flujos.sql`. Los datos mostrados son ficticios y no corresponden a usuarios o postulaciones reales de la institución. Los captions incluyen la leyenda:

> "Fuente: elaboración propia, captura del entorno de demostración de UCES en Supabase Studio, 2026."

---

## 6. Defectos activos

| ID | Severidad | Descripción | Para versión |
|----|-----------|-------------|-------------|
| P0-01 | P0 | Fecha de presentación pendiente | v1.0 |
| P0-03 | P0 | TOC placeholder hasta apertura en Word | Instrucción al usuario |
| P1-01 | P1 | EV-5B-02, EV-5B-03 como marcadores | v1.0 |
| P1-02 | P1 | Fig 5.10 como marcador (EV-5A-11 negra) | v1.0 |
| P2-01 | P2 | Fig 5.20 puede tener scores en 0 | Verificar |
| P2-02 | P2 | Logo ITESZ no incluido | v1.0 |
