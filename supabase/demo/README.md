# UCES DEMO — Scripts de base de datos demostrativa

**Proyecto:** UCES Plataforma de Talento — Tesis Moisés Medina Moreno (22010350)
**Propósito:** Poblado de un proyecto Supabase DEMO aislado con datos ficticios para:
  1. Obtener capturas de Supabase Studio para la tesis (Corte 8H)
  2. Demonstrar flujos completos del sistema
  3. Generar escenarios de revisión administrativa

---

## ADVERTENCIA DE SEGURIDAD

**ESTOS SCRIPTS DEBEN EJECUTARSE ÚNICAMENTE EN UN PROYECTO SUPABASE DEMO AISLADO.**

- NO ejecutar en el proyecto de producción `uilqwyrslwrkeubaayoi`
- Verificar el identificador del proyecto antes de cualquier operación
- Los datos son completamente ficticios y no corresponden a personas reales
- Las CURPs sintéticas usan el prefijo `DEM` y NO están validadas por RENAPO

---

## Verificación de proyecto antes de ejecutar

```sql
-- Ejecutar primero en el SQL Editor de Supabase:
SELECT current_database(), now();
-- Verificar que el project_id mostrado sea el del proyecto DEMO
```

```bash
# Verificar con Supabase CLI:
supabase projects list
# El proyecto DEMO debe estar seleccionado, NO uilqwyrslwrkeubaayoi
```

---

## Orden de ejecución

| Paso | Archivo | Descripción | Herramienta |
|---|---|---|---|
| 1 | `01-auditoria-esquema.sql` | Verificar tablas y columnas existentes | SQL Editor |
| 2 | `06-crear-usuarios.js` | Crear 12 usuarios ficticios via Auth Admin API | Node.js |
| 3 | `02-seed-catalogos.sql` | Módulos, vacantes, evaluaciones, preguntas | SQL Editor |
| 4 | `03-seed-flujos.sql` | Aplicaciones, intentos, respuestas, evidencias, revisiones | SQL Editor |
| 5 | `04-validacion-integridad.sql` | Verificar registros y relaciones | SQL Editor |
| 6 | CAPTURAS | Tomar capturas de Supabase Studio según guía | Manual |
| 7 | `05-limpieza-demo.sql` | Eliminar datos DEMO (solo cuando ya no se necesiten) | SQL Editor |

---

## Usuarios DEMO creados

| Rol | Email | Nombre | UUID previsto |
|---|---|---|---|
| admin | admin-demo@uces-demo.test | Admin Demo 01 | generado por Auth API |
| user (reviewer) | revisor-demo-01@uces-demo.test | Revisor Demo 01 | generado por Auth API |
| user | candidato-demo-01@uces-demo.test | Candidato Demo 01 | generado por Auth API |
| user | candidato-demo-02@uces-demo.test | Candidato Demo 02 | generado por Auth API |
| ... | ... | ... | ... |
| user | candidato-demo-09@uces-demo.test | Candidato Demo 09 | generado por Auth API |
| user | extra-demo-01@uces-demo.test | Extra Demo 01 | generado por Auth API |
| user | extra-demo-02@uces-demo.test | Extra Demo 02 | generado por Auth API |

---

## Capturas objetivo

| ID | Ruta en Studio | Nombre archivo |
|---|---|---|
| CAP-SB-01 | Table Editor → applications | EV-SB-01-table-editor.png |
| CAP-SB-02 | Database → Schema Visualizer | EV-SB-02-schema-visualizer.png |
| CAP-SB-03 | Authentication → Users | EV-SB-03-auth-users.png |
| CAP-SB-04 | Storage → evidences | EV-SB-04-storage-evidences.png |

---

## Notas de reproducibilidad

- La clave HMAC usada para las CURPs ficticias es `DEMO_CURP_KEY_2026`
- Esta clave debe estar en `.env.demo.local` como `CURP_HMAC_SECRET=DEMO_CURP_KEY_2026`
- **No usar esta clave en producción**
- El script Node.js requiere `SUPABASE_DEMO_URL` y `SUPABASE_DEMO_SERVICE_ROLE_KEY` en `.env.demo.local`
