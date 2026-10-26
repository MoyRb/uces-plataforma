# 08h-guia-capturas-manuales.md
# Corte 8H — Guía de capturas manuales pendientes
**Fecha:** 2026-10-24

---

## Capturas pendientes: resumen

| ID | Sección doc | Figura | Estado | Bloqueante |
|----|-------------|--------|--------|------------|
| EV-5B-02 | §5.10 | Fig 5.16 | PENDIENTE | Requiere candidato con intento completo |
| EV-5B-03 | §5.9.8 | Fig 5.17 | PENDIENTE | Requiere mismo candidato |
| EV-5A-17 | §5.11.5 | Fig 5.20 | VERIFICAR | Scores pueden ser 0 |
| EV-6C-06 | §6.5 | Fig 6.3 | PENDIENTE | Requiere Supabase Studio o curl |
| CAP-SB-01 | §5.2 | — | PENDIENTE | Supabase Studio |
| CAP-SB-02 | §5.2 | — | PENDIENTE | Supabase Studio |
| CAP-SB-03 | §5.2 | — | PENDIENTE | Supabase Studio |
| CAP-SB-04 | §5.8 | — | PENDIENTE | Supabase Studio |

---

## EV-5B-02 — Vista de detalle del candidato en admin

**Figura:** 5.16
**Ruta:** `/admin/attempts/<attempt_id>`

**Pasos:**
1. Ejecutar scripts demo (Corte 8H) o usar test users del Corte 8C si tienen intentos completos
2. Login como `admin-demo@uces-demo.test` (contraseña `DemoUCES2026!`)
3. Ir a `/admin`
4. Seleccionar el candidato con intento `completed` (Candidato Demo 01)
5. En la barra de direcciones copiar el `attempt_id`
6. Ir a `/admin/attempts/<attempt_id>`
7. Capturar pantalla completa — debe mostrar: nombre, vacante, puntaje teórico, respuestas, botón de decisión
8. Guardar como `docs/titulacion/evidencias/08c/administrador/EV-5B-02-admin-detalle-candidato.png`

---

## EV-5B-03 — Formulario de decisión admin

**Figura:** 5.17
**Ruta:** `/admin/attempts/<attempt_id>` (misma página que EV-5B-02, sección inferior)

**Pasos:**
1. Continuar desde EV-5B-02 (misma sesión)
2. Scroll hacia abajo hasta sección "Decisión"
3. Capturar el formulario con los botones "Aprobar" / "Rechazar"
4. No enviar la decisión (solo capturar el formulario visible)
5. Guardar como `docs/titulacion/evidencias/08c/administrador/EV-5B-03-admin-decision-form.png`

---

## EV-5A-17 — Resultado psicométrico (verificar scores)

**Figura:** 5.20
**Ruta:** `/resultado/<attempt_id>` (intento psicométrico completado)

**Verificación:**
1. Login como `candidato-demo-01@uces-demo.test`
2. Ir al panel `/panel`
3. Localizar el intento del psicométrico completado
4. Ir a `/resultado/<psicometric_attempt_id>`
5. Si los scores aparecen en 0: el seed tuvo problemas con las respuestas psicométricas
6. Si los scores son correctos (E=18, A=16, R=17, AP=15, EX=14): capturar y guardar
7. Guardar como `docs/titulacion/evidencias/08c/candidato/EV-5A-17-resultado-psicometrico-v2.png`

**Nota sobre el caption en el documento:** El caption actual en Fig 5.20 ya documenta la posibilidad de scores en 0. Si los scores son > 0, se puede actualizar el caption eliminando esa nota.

---

## EV-6C-06 — CP-18: API stats sin sesión

**Figura:** 6.3

**Opción A (Supabase Studio):**
1. Ir a Dashboard → API → Endpoints
2. Probar GET `/rest/v1/rpc/get_stats` sin Authorization header
3. Capturar la respuesta 401

**Opción B (curl en terminal):**
```bash
curl -s -X GET \
  "https://<ref>.supabase.co/rest/v1/rpc/get_stats" \
  -H "apikey: <anon_key>" \
  | python -m json.tool
```
Capturar la salida de terminal mostrando `{"error":"No autenticado"}` o similar.

**Guardar como:** `docs/titulacion/evidencias/08c/validaciones/EV-6C-06-cp18-stats-d03-v2.png`

---

## Capturas de Supabase Studio (CAP-SB-01..04)

### CAP-SB-01 — Table Editor: applications
- Ir a: Supabase Dashboard → Table Editor → tabla `applications`
- Asegurarse de que se ven filas con columnas: `id`, `user_id`, `vacancy_id`, `status`, `created_at`
- Capturar mostrando al menos 5-6 filas con diferentes estados
- Guardar: `evidencias/08c/supabase-studio/CAP-SB-01-applications.png`

### CAP-SB-02 — Schema Visualizer
- Ir a: Database → Schema → Schema Visualizer
- El visualizador debe mostrar las 13 tablas con sus relaciones
- Ajustar zoom para que sean visibles al menos 6-8 tablas
- Capturar
- Guardar: `evidencias/08c/supabase-studio/CAP-SB-02-schema.png`

### CAP-SB-03 — Authentication: Users
- Ir a: Authentication → Users
- Debe mostrar los 12 usuarios demo creados con sus emails
- Capturar la lista completa
- Guardar: `evidencias/08c/supabase-studio/CAP-SB-03-auth-users.png`

### CAP-SB-04 — Storage: bucket evidences
- Ir a: Storage → Buckets → evidences
- Debe mostrar el bucket privado y algunos archivos si el seed subió evidencias
- Capturar
- Guardar: `evidencias/08c/supabase-studio/CAP-SB-04-storage-evidences.png`

---

## Integración en el documento

Una vez obtenidas las capturas:

1. Reemplazar en `generar-docx-v05.py` (o crear v0.6) los `None` de img_path en:
   - Fig 5.16: `None` → `IMGS_ADM / "EV-5B-02-admin-detalle-candidato.png"`
   - Fig 5.17: `None` → `IMGS_ADM / "EV-5B-03-admin-decision-form.png"`

2. Actualizar caption de Fig 5.20 si los scores ya son > 0.

3. Regenerar DOCX/PDF con python `generar-docx-v05.py` (o versión siguiente).
