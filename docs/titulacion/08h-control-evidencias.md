# 08h-control-evidencias.md
# Corte 8H — Control de evidencias acumulado
**Fecha:** 2026-10-24

---

## Estado global de evidencias

| Total planificadas | Obtenidas | Marcadores | Pendientes |
|-------------------|-----------|------------|------------|
| 26 figuras + 4 Studio = 30 | 18 reales + 2 marcadores | 2 (Figs 5.16/5.17) | 8 |

---

## Categoría A: Capturas de la aplicación (26 figuras en el documento)

| Fig | ID evidencia | Ruta imagen | Estado | Notas |
|-----|-------------|-------------|--------|-------|
| 5.1 | — | diagramas/exportados/fig-5-1-arquitectura.png | ✓ OK | Pillow, 86 KB |
| 5.2 | — | diagramas/exportados/fig-5-2-secuencia-registro.png | ✓ OK | Mermaid |
| 5.3 | — | diagramas/exportados/fig-5-3-secuencia-postulacion.png | ✓ OK | Mermaid |
| 5.4 | EV-5A-02 | evidencias/08c/candidato/EV-5A-02-landing.png | ✓ OK | |
| 5.5 | — | diagramas/exportados/fig-5-5-persistencia-decisiones.png | ✓ OK | Mermaid |
| 5.5 | EV-5A-05 | evidencias/08c/candidato/EV-5A-05-registro-formulario.png | ✓ OK | |
| 5.6 | EV-5A-06 | evidencias/08c/candidato/EV-5A-06-curp-duplicada.png | ✓ OK | |
| 5.7 | EV-5A-07 | evidencias/08c/candidato/EV-5A-07-login.png | ✓ OK | |
| 5.8 | — | diagramas/exportados/fig-5-4-secuencia-evidencias.png | ✓ OK | Mermaid |
| 5.9 | EV-5A-09 | evidencias/08c/candidato/EV-5A-09-panel-candidato.png | ✓ OK | |
| 5.10 | EV-5A-11 | — | MARCADOR | Ruta 404 por diseño — documentado |
| 5.11 | EV-5A-12 | evidencias/08c/candidato/EV-5A-12-detalle-vacante.png | ✓ OK | |
| 5.12 | EV-5A-19 | evidencias/08c/candidato/EV-5A-19-subida-evidencia.png | ✓ OK | |
| 5.13 | EV-5B-01 | evidencias/08c/administrador/EV-5B-01-admin-panel.png | ✓ OK | |
| 5.14 | EV-5B-08 | evidencias/08c/candidato/EV-5B-08-acceso-denegado.png | ✓ OK | |
| 5.15 | — | diagramas/exportados/fig-5-6-flujo-requireAdmin.png | ✓ OK | Mermaid |
| 5.16 | EV-5B-02 | — | PENDIENTE | Requiere candidato con intento completo |
| 5.17 | EV-5B-03 | — | PENDIENTE | Requiere candidato con intento completo |
| 5.18 | EV-5B-13 | evidencias/08c/candidato/EV-5B-13-guard-prereq.png | ✓ OK | |
| 5.19 | EV-5A-15 | evidencias/08c/candidato/EV-5A-15-psicometrico-preguntas.png | ✓ OK | v0.5: keyword corregido |
| 5.20 | EV-5A-17 | evidencias/08c/candidato/EV-5A-17-resultado-psicometrico.png | ✓ VERIFICAR | Scores pueden ser 0 |
| 5.21 | — | diagramas/exportados/fig-5-7-inicio-psicometrico.png | ✓ OK | v0.5: keyword corregido |
| 5.22 | EV-5B-15 | evidencias/08c/candidato/EV-5B-15-d01-guard-score.png | ✓ OK | |
| 6.1 | EV-6C-04 | evidencias/08c/validaciones/EV-6C-04-cp07-guard-d01.png | ✓ OK | |
| 6.2 | EV-6C-05 | evidencias/08c/candidato/EV-5A-17-resultado-psicometrico.png | ✓ OK | Reuso |
| 6.3 | EV-6C-06 | evidencias/08c/validaciones/EV-6C-06-cp18-stats-d03.png | PENDIENTE | Captura manual |
| 6.4 | EV-6C-07 | evidencias/08c/validaciones/EV-6C-07-cp22-rls.png | ✓ OK | |

---

## Categoría B: Capturas de Supabase Studio (4)

| ID | Descripción | Archivo destino | Estado |
|----|-------------|-----------------|--------|
| CAP-SB-01 | Table Editor: applications | evidencias/08c/supabase-studio/CAP-SB-01-applications.png | PENDIENTE |
| CAP-SB-02 | Schema Visualizer | evidencias/08c/supabase-studio/CAP-SB-02-schema.png | PENDIENTE |
| CAP-SB-03 | Authentication: Users | evidencias/08c/supabase-studio/CAP-SB-03-auth-users.png | PENDIENTE |
| CAP-SB-04 | Storage: evidences | evidencias/08c/supabase-studio/CAP-SB-04-storage-evidences.png | PENDIENTE |

---

## Archivos en disco (verificado post-Corte 8C)

```
docs/titulacion/evidencias/08c/
├── candidato/          (14 archivos PNG)
├── administrador/      (1 archivo PNG: EV-5B-01)
├── validaciones/       (3 archivos PNG: EV-6C-04, EV-6C-07; EV-6C-06 pendiente)
└── captura-v2.js       (script Puppeteer con inyección de sesión)

docs/titulacion/diagramas/exportados/
├── fig-5-1-arquitectura.png    (86 KB — Pillow, Corte 8G)
├── fig-5-2-secuencia-registro.png
├── fig-5-3-secuencia-postulacion.png
├── fig-5-4-secuencia-evidencias.png
├── fig-5-5-persistencia-decisiones.png
├── fig-5-6-flujo-requireAdmin.png
└── fig-5-7-inicio-psicometrico.png
```

---

## Acciones pendientes para completar evidencias

1. [ ] Ejecutar scripts demo en Supabase DEMO aislado
2. [ ] Capturar EV-5B-02 y EV-5B-03 con Candidato Demo 01
3. [ ] Capturar CAP-SB-01..04 en Supabase Studio
4. [ ] Verificar EV-5A-17 (scores > 0)
5. [ ] Re-capturar EV-6C-06 si la captura actual muestra error distinto al esperado
6. [ ] Crear carpeta `evidencias/08c/supabase-studio/` si no existe
