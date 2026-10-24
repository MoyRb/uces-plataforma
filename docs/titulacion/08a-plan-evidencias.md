# Plan de evidencias y capturas de pantalla — Corte 8A

**Fecha:** 2026-10-23
**Alcance:** Clasificación de las 50 capturas de pantalla requeridas (+ 3 opcionales) para el documento académico final.
**Criterio de clasificación:**
- **Categoría A** — Indispensable en el cuerpo del documento: la sección hace referencia directa a la captura o la afirmación no puede verificarse sin imagen.
- **Categoría B** — Recomendada para anexos: apoya la narración pero la prosa es suficiente sin ella.
- **Categoría C** — Opcional/redundante: duplica información ya documentada textualmente o en otras evidencias.


---
## 1. Capturas del Capítulo V — Secciones 5.1 a 5.8

### Grupo V-A: Estructura y configuración (§5.1–5.2)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5A-01 | §5.1.1 | Árbol de directorios del monorepo en VS Code o terminal | `ev-5a-01-estructura-directorios.png` | B | Media |
| EV-5A-02 | §5.2.1 | Página de inicio de la plataforma (ruta `/`) en producción | `ev-5a-02-landing-produccion.png` | A | Alta |
| EV-5A-03 | §5.2.2 | Panel de variables de entorno en Vercel (nombres sin valores) | `ev-5a-03-variables-entorno-vercel.png` | B | Media |
| EV-5A-04 | §5.2.3 | Tabla de base de datos en Supabase Studio — vista de 13 tablas | `ev-5a-04-tablas-supabase.png` | A | Alta |

### Grupo V-B: Flujo de registro y autenticación (§5.3)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5A-05 | §5.3.1 | Formulario de registro de candidato (`/register`) — vacío | `ev-5a-05-registro-formulario.png` | A | Alta |
| EV-5A-06 | §5.3.1 | Error de CURP duplicada al intentar registrar un CURP ya existente | `ev-5a-06-registro-curp-duplicada.png` | A | Alta |
| EV-5A-07 | §5.3.2 | Formulario de inicio de sesión (`/login`) | `ev-5a-07-login-formulario.png` | A | Alta |
| EV-5A-08 | §5.3.2 | Mensaje de error de credenciales incorrectas en login | `ev-5a-08-login-error.png` | B | Media |

### Grupo V-C: Panel del candidato y perfil (§5.4–5.5)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5A-09 | §5.4 | Panel del candidato (`/panel`) — lista de módulos disponibles | `ev-5a-09-panel-candidato.png` | A | Alta |
| EV-5A-10 | §5.5 | Página de perfil del candidato (`/perfil`) | `ev-5a-10-perfil-candidato.png` | B | Media |

### Grupo V-D: Proceso de postulación (§5.6)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5A-11 | §5.6.1 | Listado de vacantes (`/vacantes`) disponibles para el candidato | `ev-5a-11-listado-vacantes.png` | A | Alta |
| EV-5A-12 | §5.6.1 | Vista de detalle de una vacante con botón de postulación | `ev-5a-12-detalle-vacante.png` | A | Alta |
| EV-5A-13 | §5.6.2 | Confirmación de postulación exitosa | `ev-5a-13-postulacion-exitosa.png` | B | Media |
| EV-5A-14 | §5.6.2 | Estado de postulación en el panel del candidato | `ev-5a-14-estado-postulacion.png` | B | Media |

### Grupo V-E: Evaluación psicométrica (§5.7)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5A-15 | §5.7.1 | Instrumento psicométrico (`/psicometrico`) — primeras preguntas | `ev-5a-15-psicometrico-preguntas.png` | A | Alta |
| EV-5A-16 | §5.7.1 | Instrumento psicométrico — ítems finales (ítem 17–20) | `ev-5a-16-psicometrico-final.png` | C | Baja |
| EV-5A-17 | §5.7.2 | Pantalla de resultado del psicométrico (`/resultado/[attemptId]`) | `ev-5a-17-resultado-psicometrico.png` | A | Alta |
| EV-5A-18 | §5.7.2 | Guardado en Supabase: fila en tabla `attempts` con `psychometric_summary` | `ev-5a-18-attempts-supabase.png` | B | Media |

### Grupo V-F: Subida de evidencias (§5.8)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5A-19 | §5.8.1 | Módulo de subida de evidencia (`/modulos/[moduleId]`) — formulario | `ev-5a-19-subida-evidencia-form.png` | A | Alta |
| EV-5A-20 | §5.8.1 | Confirmación de archivo subido exitosamente | `ev-5a-20-subida-exitosa.png` | B | Media |
| EV-5A-21 | §5.8.2 | Bucket "evidences" en Supabase Storage con archivos cargados | `ev-5a-21-bucket-evidences.png` | B | Media |
| EV-5A-22 | §5.8.2 | Política de acceso al bucket en Supabase (privado) | `ev-5a-22-bucket-politica.png` | C | Baja |
| EV-5A-23 | §5.8.3 | URL firmada generada para descarga de evidencia | `ev-5a-23-signed-url.png` | C | Baja |
| EV-5A-24 (opc.) | §5.8 | Vista de la tabla `evidence_uploads` en Supabase con registros | `ev-5a-24-evidence-uploads-tabla.png` | C | Opcional |
| EV-5A-25 | §5.8 | Listado de evidencias en la interfaz del candidato | `ev-5a-25-listado-evidencias.png` | B | Media |

**Subtotal secciones 5.1–5.8: 25 requeridas + 1 opcional**

---

## 2. Capturas del Capítulo V — Secciones 5.9 a 5.13

### Grupo V-G: Panel de administración (§5.9)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5B-01 | §5.9.1 | Panel de administración (`/admin`) — vista de lista de candidatos | `ev-5b-01-admin-panel.png` | A | Alta |
| EV-5B-02 | §5.9.2 | Vista de detalle de un candidato en admin (`/admin/attempts/[id]`) | `ev-5b-02-admin-detalle-candidato.png` | A | Alta |
| EV-5B-03 | §5.9.3 | Formulario de decisión de revisión (aprobar/rechazar) | `ev-5b-03-admin-decision-form.png` | A | Alta |
| EV-5B-04 | §5.9.4 | Respuesta API `POST /api/admin/review` con decisión guardada | `ev-5b-04-api-review-response.png` | B | Media |
| EV-5B-05 | §5.9.5 | Tabla `attempts` en Supabase con columna `decision` actualizada | `ev-5b-05-attempts-decision-supabase.png` | B | Media |
| EV-5B-06 | §5.9.6 | Endpoint `GET /api/admin/stats` — respuesta JSON | `ev-5b-06-api-stats-response.png` | B | Media |
| EV-5B-07 (opc.) | §5.9.7 | Notificación enviada al candidato (si se implementó email) | `ev-5b-07-notificacion-email.png` | C | Opcional |

### Grupo V-H: Control de acceso y autorización (§5.10)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5B-08 | §5.10.1 | Pantalla de error 403 al acceder a `/admin` sin rol admin | `ev-5b-08-acceso-denegado-admin.png` | A | Alta |
| EV-5B-09 | §5.10.2 | Respuesta 401 de `requireAdmin()` en Postman o navegador | `ev-5b-09-requireadmin-401.png` | B | Media |
| EV-5B-10 | §5.10.3 | Editor de políticas RLS en Supabase — tabla `applications` | `ev-5b-10-rls-politicas.png` | B | Media |
| EV-5B-11 | §5.10.4 | Función `get_my_role()` en SQL Editor de Supabase | `ev-5b-11-get-my-role-sql.png` | B | Media |

### Grupo V-I: Módulo psicométrico avanzado (§5.11)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5B-12 | §5.11.1 | Tabla de 20 preguntas psicométricas en Supabase (`questions`) | `ev-5b-12-questions-tabla.png` | A | Alta |
| EV-5B-13 | §5.11.2 | Guard de prerequisito: mensaje al intentar acceder a `/evaluacion` sin completar psicométrico | `ev-5b-13-guard-prereq.png` | A | Alta |
| EV-5B-14 | §5.11.3 | Resultado de `calculatePsicometricoSummary()` — JSON en consola o API | `ev-5b-14-summary-json.png` | B | Media |

### Grupo V-J: Discrepancias y trazabilidad (§5.12–5.13)

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-5B-15 | §5.12 | D-01: Candidato con score 0 puede continuar — pantalla del guard | `ev-5b-15-d01-guard-score.png` | A | Alta |
| EV-5B-16 | §5.12 | D-02: Respuesta de error al llamar `upsertReview` (si reproducible) | `ev-5b-16-d02-upsertreview-error.png` | B | Media |
| EV-5B-17 | §5.13 | Tabla `reviews` en Supabase — columnas reales vs. esperadas | `ev-5b-17-reviews-schema.png` | B | Media |

**Subtotal secciones 5.9–5.13: 17 requeridas + 1 opcional**

---

## 3. Capturas del Capítulo VI — Evidencias de pruebas

| ID | Sección | Descripción | Nombre de archivo sugerido | Categoría | Prioridad |
|---|---|---|---|---|---|
| EV-6C-01 | §6.5.1 | Dashboard de Supabase Auth con usuarios de prueba registrados | `ev-6c-01-auth-usuarios.png` | A | Alta |
| EV-6C-02 | §6.5.2 | Tabla `user_roles` con roles asignados a los usuarios de prueba | `ev-6c-02-user-roles-tabla.png` | A | Alta |
| EV-6C-03 | §6.5.3 | Ejecución de CP-01 (registro nuevo) — estado final en Auth | `ev-6c-03-cp01-registro.png` | B | Media |
| EV-6C-04 | §6.5.3 | Ejecución de CP-07 (guard psicométrico D-01) — pantalla de bloqueo sin score 0 | `ev-6c-04-cp07-guard-d01.png` | A | Alta |
| EV-6C-05 | §6.5.3 | Respuesta de CP-14 (clasificación psicométrica "Alta") | `ev-6c-05-cp14-clasificacion-alta.png` | A | Alta |
| EV-6C-06 | §6.5.3 | Respuesta de CP-18 (stats — solo 2 métricas, D-03) | `ev-6c-06-cp18-stats-d03.png` | A | Alta |
| EV-6C-07 | §6.5.3 | Respuesta de CP-22 (RLS — candidato sin acceso a otro perfil) | `ev-6c-07-cp22-rls.png` | A | Alta |
| EV-6C-08 | §6.5.3 | Respuesta de CP-11 (BLOQUEADO — timeout no probado) — captura del entorno | `ev-6c-08-cp11-bloqueado.png` | B | Media |

**Subtotal Capítulo VI: 8 requeridas**

---

## 4. Resumen de clasificación

| Categoría | Cantidad | Descripción |
|---|---|---|
| **A — Indispensable (cuerpo)** | **21** | Deben aparecer en el cuerpo del capítulo correspondiente |
| **B — Recomendada (anexos)** | **20** | Se incluyen en Anexo E o bajo la sección correspondiente |
| **C — Opcional** | **9** | Se omiten si el tiempo de captura es limitado antes de entrega |
| **Total requeridas** | **50** | Sin opcionales |
| **Opcionales adicionales** | 2 | EV-5A-24, EV-5B-07 |

---

## 5. Orden de obtención recomendado

La obtención de capturas debe realizarse en sesión con navegador interactivo (Chrome/Firefox) con acceso a la aplicación en producción (Vercel) y a Supabase Studio. Orden sugerido por impacto académico:

### Sesión 1 — Flujo candidato completo (~2 horas)
1. EV-5A-02 (landing)
2. EV-5A-05, EV-5A-06 (registro)
3. EV-5A-07 (login)
4. EV-5A-09 (panel candidato)
5. EV-5A-11, EV-5A-12, EV-5A-13 (vacantes y postulación)
6. EV-5A-15, EV-5A-17 (psicométrico)
7. EV-5A-19, EV-5A-20 (evidencias)

### Sesión 2 — Panel admin y autorización (~1.5 horas)
1. EV-5B-01, EV-5B-02, EV-5B-03 (admin)
2. EV-5B-08 (acceso denegado)
3. EV-5B-13 (guard prerequisito)
4. EV-5B-15 (D-01)

### Sesión 3 — Supabase Studio (~1 hora)
1. EV-5A-04 (tablas)
2. EV-5B-12 (questions)
3. EV-6C-01, EV-6C-02 (auth y roles)
4. EV-5B-10, EV-5B-11 (RLS, get_my_role)

### Sesión 4 — Pruebas específicas para Cap. VI (~1.5 horas)
1. EV-6C-04 (CP-07, D-01)
2. EV-6C-05 (CP-14)
3. EV-6C-06 (CP-18, D-03)
4. EV-6C-07 (CP-22, RLS)

---

## 6. Convención de nombres de archivo

```
ev-{capítulo}-{número}-{descripción-kebab}.png
```

- Resolución mínima: 1280 × 800 px
- Formato: PNG (no JPG para interfaces con texto)
- Sin datos personales reales en las capturas — usar datos de prueba
- Ruta de destino: `docs/titulacion/evidencias/capturas/`

---

## 7. Capturas que YA existen (del Corte 6B)

Las evidencias del Corte 6B (`evidencias/06b/`) son respuestas de API en formato JSON, no capturas de pantalla visuales. Se mantienen como evidencias de pruebas de integración. No sustituyen las capturas de interfaz de usuario pendientes.

| Evidencias existentes | Tipo | Usable en |
|---|---|---|
| EV-6B-01..EV-6B-21 (21 archivos JSON) | Respuestas API texto | Cap. VI §6.5 como referencia técnica |
| Capturas visuales de interfaz | NINGUNA obtenida | Pendientes todas |
