# 08h-reporte-consolidado.md
# Corte 8H — Reporte Consolidado
**Fecha:** 2026-10-24
**Versión documento:** v0.5

---

## 1. Resumen ejecutivo

El Corte 8H comprende dos líneas de trabajo paralelas:

1. **Línea A — Base de datos demo:** Generación de 6 archivos SQL/JS con datos ficticios para el proyecto Supabase DEMO aislado. Los archivos permiten poblar 13 tablas con flujos coherentes de 8 candidatos en distintos estados, listos para capturas de pantalla de administrador.

2. **Línea B — Documento v0.5:** 5 correcciones editoriales aplicadas al generador DOCX. El documento v0.5 corrige la portada (matrícula real), el encabezado de página, elimina el Abstract, y soluciona la ubicación errónea de las Figuras 5.19 y 5.21.

---

## 2. Línea A — Scripts demo Supabase

### 2.1 Archivos generados

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `supabase/demo/README.md` | Documentación | Advertencias de seguridad, orden de ejecución |
| `supabase/demo/01-auditoria-esquema.sql` | SQL | Auditoría de esquema, detección de INC-6B-02 |
| `supabase/demo/02-seed-catalogos.sql` | SQL | 4 módulos, 10 vacantes, 5 evaluaciones, 25 preguntas, 6 tareas prácticas |
| `supabase/demo/03-seed-flujos.sql` | SQL | Aplicaciones, intentos, respuestas, evidencias, revisiones |
| `supabase/demo/04-validacion-integridad.sql` | SQL | 11 consultas de verificación |
| `supabase/demo/05-limpieza-demo.sql` | SQL | DELETE seguro solo en UUIDs demo |
| `supabase/demo/06-crear-usuarios.js` | JS/Node | Crea 12 usuarios vía Auth Admin API |

### 2.2 Usuarios DEMO definidos (12 total)

| Email | Nombre | Rol | CURP sintética |
|-------|--------|-----|----------------|
| admin-demo@uces-demo.test | Admin Demo 01 | admin | — |
| revisor-demo-01@uces-demo.test | Revisor Demo 01 | user (reviewer) | — |
| candidato-demo-01..08@uces-demo.test | Candidato Demo 01-08 | user | DEMA..DEMH |
| extra-demo-01..02@uces-demo.test | Extra Demo 01-02 | user | DEMI, DEMJ |

### 2.3 Flujos cubiertos por los datos seed

| Estado del candidato | Candidato | Descripción |
|---------------------|-----------|-------------|
| Psicométrico completado + vacante aprobado | Demo 01 | Flujo completo exitoso |
| Psicométrico completado + vacante rechazado | Demo 02 | Flujo completo con rechazo |
| Psicométrico completado + evaluación en revisión | Demo 03 | Intento bajo revisión |
| Psicométrico completado + en progreso | Demo 04 | Intento iniciado sin completar |
| Solo psicométrico completado | Demo 05 | Sin postulación a vacante real |
| Psicométrico en progreso | Demo 06 | Intento psicométrico abierto |
| Recién registrado | Demo 07-08 | Sin postulaciones |

### 2.4 Estado de ejecución

> **PREPARADOS, NO EJECUTADOS.** Los scripts requieren un proyecto Supabase DEMO aislado.
> La URL de producción `uilqwyrslwrkeubaayoi` está bloqueada en `06-crear-usuarios.js`.

---

## 3. Línea B — Correcciones editoriales v0.5

### 3.1 Correcciones aplicadas

| ID | Descripción | Archivo afectado | Resultado |
|----|-------------|------------------|-----------|
| H01 | Matrícula 22010350 en portada | `generar-docx-v05.py` | `centered("MATRÍCULA: 22010350", 11)` bajo autor |
| H02 | Header sin "Reporte de Titulación" | `generar-docx-v05.py` | Header = `"ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES"` |
| H03 | Abstract eliminado | `generar-docx-v05.py` | Llamada a `add_preliminary(..., "ABSTRACT")` removida |
| H04 | Fig 5.19 keyword "5.11.1" | `generar-docx-v05.py` | Evita colocación en Cap. III |
| H05 | Fig 5.21 keyword "5.11.3" | `generar-docx-v05.py` | Evita colocación en Cap. III |

### 3.2 Métricas v0.5

| Métrica | v0.4 | v0.5 | Delta |
|---------|------|------|-------|
| Tamaño DOCX | ~2,065 KB | 2,671 KB | +606 KB (TOC actualizado) |
| Tamaño PDF | ~2,424 KB | 3,089 KB | +665 KB |
| Páginas estimadas | 162 | ~158 | −4 (sin Abstract ~4 pág) |
| Figuras colocadas | 26 | 26 | = |
| COM update | OK | OK | = |

---

## 4. Capturas manuales pendientes (no bloqueantes para v0.5)

| ID | Captura | Estado |
|----|---------|--------|
| EV-5B-02 | Admin detalle candidato `/admin/attempts/[id]` | PENDIENTE — requiere candidato con intento completo |
| EV-5B-03 | Formulario de decisión admin | PENDIENTE — requiere mismo candidato |
| EV-5A-17 | Resultado psicométrico (verificar scores > 0) | VERIFICAR |
| EV-6C-06 | CP-18 stats D-03 | PENDIENTE (Supabase Studio) |
| CAP-SB-01 | Table Editor → applications | PENDIENTE (Supabase Studio) |
| CAP-SB-02 | Schema Visualizer | PENDIENTE (Supabase Studio) |
| CAP-SB-03 | Authentication → Users | PENDIENTE (Supabase Studio) |
| CAP-SB-04 | Storage → evidences | PENDIENTE (Supabase Studio) |

---

## 5. Archivos generados en este corte

```
docs/titulacion/
├── 08h-reporte-consolidado.md      ← este archivo
├── 08h-inventario-seed-demo.md
├── 08h-validacion-supabase.md
├── 08h-guia-capturas-manuales.md
├── 08h-control-evidencias.md
├── 08h-control-calidad-v05.md
└── entregables/
    ├── generar-docx-v05.py
    ├── UCES_Trabajo_B_Revision_v05.docx  (2,671 KB)
    └── UCES_Trabajo_B_Revision_v05.pdf   (3,089 KB)

supabase/demo/
├── README.md
├── 01-auditoria-esquema.sql
├── 02-seed-catalogos.sql
├── 03-seed-flujos.sql
├── 04-validacion-integridad.sql
├── 05-limpieza-demo.sql
└── 06-crear-usuarios.js
```

---

## 6. Próximos pasos antes de v1.0

1. Obtener capturas EV-5B-02 y EV-5B-03 (candidato con intento completo)
2. Ejecutar scripts demo en proyecto Supabase DEMO aislado
3. Capturar CAP-SB-01..04 en Supabase Studio
4. Confirmar plantilla Word institucional UCES/ITESZ con asesor
5. Confirmar fecha de presentación con coordinación académica
6. Reemplazar marcadores de figura restantes con capturas reales
