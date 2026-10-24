# Matriz de capturas — Corte 8C

**Fecha:** 2026-10-23
**Alcance:** 21 capturas Categoría A + capturas suplementarias obtenidas

---

## Convención de columnas

| Campo | Descripción |
|---|---|
| ID | Identificador de evidencia (EV-{cap}-{seq}) |
| Cap./§ | Capítulo y sección del documento donde se insertará |
| Funcionalidad | RF o RN relacionado |
| Ruta | URL de la aplicación |
| Estado inicial requerido | Condición previa necesaria para obtener la captura |
| Datos de prueba | Credenciales o datos utilizados |
| Visual esperada | Descripción del contenido que debe mostrar la imagen |
| Archivo | Nombre de archivo en `evidencias/08c/` |
| Estado | OBTENIDA / PENDIENTE / BLOQUEADA |
| Riesgo de exposición | Datos sensibles que podrían aparecer |
| CP relacionado | Caso de prueba del Cap. VI |

---

## Categoría A — Flujo del candidato (Cap. V §5.2–5.8)

| ID | Cap./§ | Funcionalidad | Ruta | Estado inicial | Datos de prueba | Visual esperada | Archivo | Estado | Riesgo exposición | CP |
|---|---|---|---|---|---|---|---|---|---|---|
| EV-5A-02 | V §5.2 | Landing pública | `/` | Sin sesión | — | Encabezado con nombre del sistema, CTA de registro y login | `candidato/EV-5A-02-landing.png` | OBTENIDA | Ninguno | CP-01 |
| EV-5A-04 | V §5.2 | Esquema de base de datos | Supabase Studio | Sesión en supabase.com | — | Vista de 13 tablas en Table Editor (profiles, vacancies, etc.) | `candidato/EV-5A-04-supabase-tablas.png` | BLOQUEADA (Studio) | Metadatos de BD | — |
| EV-5A-05 | V §5.3 | RF-01 Registro | `/register` | Sin sesión | — | Formulario con campos email, password, CURP vacíos | `candidato/EV-5A-05-registro-formulario.png` | OBTENIDA | Ninguno | CP-01 |
| EV-5A-06 | V §5.3 | RN-02 CURP única | `/register` | CURP ya registrada | `FICA850315MDFBNC08` (duplicada) | Mensaje de error «CURP ya registrada» o equivalente | `candidato/EV-5A-06-curp-duplicada.png` | OBTENIDA | CURP ficticia | CP-02a |
| EV-5A-07 | V §5.3 | RF-02 Login | `/login` | Sin sesión | — | Formulario email/contraseña sin errores | `candidato/EV-5A-07-login.png` | OBTENIDA | Ninguno | CP-02b |
| EV-5A-09 | V §5.4 | RF-03 Panel | `/panel` | Sesión candidato activa | `candidato-8c-002@prueba-uces.test` | Módulos disponibles, nombre de usuario, estado de postulación | `candidato/EV-5A-09-panel-candidato.png` | OBTENIDA | Email de prueba | CP-03 |
| EV-5A-11 | V §5.5 | RF-05 Vacantes | `/vacantes` | Sesión candidato activa | ídem | Lista de al menos una vacante activa con título y área | `candidato/EV-5A-11-vacantes.png` | OBTENIDA | Email de prueba | CP-05 |
| EV-5A-12 | V §5.5 | RF-06 Detalle vacante | `/vacantes/[id]` | Sesión candidato activa | UUID vacante de prueba | Título, descripción, requisitos y botón de postulación | `candidato/EV-5A-12-detalle-vacante.png` | OBTENIDA | Email de prueba | CP-06 |
| EV-5A-15 | V §5.11 | RF-12 Psicométrico | `/psicometrico` | Postulación activa, módulo habilitado | ídem | 20 ítems Likert 1–5, escala visible, botón Enviar | `candidato/EV-5A-15-psicometrico-preguntas.png` | OBTENIDA | Email de prueba | CP-11 |
| EV-5A-17 | V §5.11 | RF-13 Resultado | `/resultado/[id]` | Intento psicométrico completado | ídem | Scores por rasgo (Alta/Adecuada/Riesgo), clasificación global | `candidato/EV-5A-17-resultado-psicometrico.png` | OBTENIDA* | Email, resultados | CP-12 |
| EV-5A-19 | V §5.6 | RF-08 Evidencias | `/modulos/[id]` | Módulo activo | ídem | Interfaz de subida de archivo (FileInput o drag-and-drop) | `candidato/EV-5A-19-subida-evidencia.png` | OBTENIDA | Email de prueba | CP-09 |

> *EV-5A-17: posible que muestre puntuaciones 0 si la API de preguntas falló al momento del envío. Verificar visualmente antes de insertar en el Word.

---

## Categoría A — Panel de administración (Cap. V §5.9–5.10)

| ID | Cap./§ | Funcionalidad | Ruta | Estado inicial | Datos de prueba | Visual esperada | Archivo | Estado | Riesgo exposición | CP |
|---|---|---|---|---|---|---|---|---|---|---|
| EV-5B-01 | V §5.9 | RF-16 Panel admin | `/admin` | Sesión admin activa | `admin-8c-001@prueba-uces.test` | Tabla de postulantes con columnas nombre, vacante, estado | `administrador/EV-5B-01-admin-panel.png` | OBTENIDA | Email admin | CP-16 |
| EV-5B-02 | V §5.10 | RF-17 Detalle admin | `/admin/attempts/[id]` | Intento con respuestas válidas | ídem + attempt_id válido | Perfil candidato, respuestas psicométricas, resumen de módulos | `administrador/EV-5B-02-admin-detalle.png` | PENDIENTE | Email, datos candidato | CP-17 |
| EV-5B-03 | V §5.10 | RF-18 Decisión | `/admin/attempts/[id]` | Misma ruta, formulario activo | ídem | Formulario de decisión (Aprobar/Rechazar) con campo comentarios | `administrador/EV-5B-03-admin-decision.png` | PENDIENTE | Email, comentario | CP-17 |
| EV-5B-08 | V §5.9 | RNF-05 Control acceso | `/admin` | Sesión candidato (no admin) | `candidato-8c-002@prueba-uces.test` | Redirección o mensaje «Acceso no autorizado» | `candidato/EV-5B-08-acceso-denegado.png` | OBTENIDA | Email candidato | CP-08 |
| EV-5B-12 | V §5.11 | RF-12 Seed psicométrico | Supabase Studio | Sesión en supabase.com | — | Tabla `questions` con 20 filas, columnas rasgo/ítem/texto | `administrador/EV-5B-12-supabase-questions.png` | BLOQUEADA (Studio) | Texto ítems | — |

---

## Categoría A — Discrepancias documentadas (Cap. V §5.13)

| ID | Cap./§ | Funcionalidad | Ruta | Estado inicial | Datos de prueba | Visual esperada | Archivo | Estado | Riesgo exposición | CP |
|---|---|---|---|---|---|---|---|---|---|---|
| EV-5B-13 | V §5.11 | D-01 Guard prereq | `/panel` o `/psicometrico` | Candidato sin postulación activa | `candidato-8c-002@prueba-uces.test` | Mensaje de prerequisito o redirección que bloquea acceso al psicométrico | `candidato/EV-5B-13-guard-prereq.png` | OBTENIDA | Email candidato | CP-07 |
| EV-5B-15 | V §5.13 | D-01 Guard `completed` | `/panel` | Candidato con psicométrico completado | ídem | Guard activo basado en campo `completed`, no en score — descrepancia documentada | `candidato/EV-5B-15-d01-guard-score.png` | OBTENIDA | Email candidato | CP-07/CP-08 |

---

## Categoría A — Validaciones de casos de prueba (Cap. VI §6.5)

| ID | Cap./§ | Funcionalidad | Ruta | Estado inicial | Datos de prueba | Visual esperada | Archivo | Estado | Riesgo exposición | CP |
|---|---|---|---|---|---|---|---|---|---|---|
| EV-6C-01 | VI §6.5 | RF-01 Auth — usuarios | Supabase Studio Auth | Sesión en supabase.com | — | Lista de usuarios registrados con timestamps y emails | `validaciones/EV-6C-01-supabase-auth.png` | BLOQUEADA (Studio) | Emails reales | — |
| EV-6C-02 | VI §6.5 | RF-03 Roles | Supabase Studio | Sesión en supabase.com | — | Tabla `user_roles` con admin_id y role=admin | `validaciones/EV-6C-02-supabase-roles.png` | BLOQUEADA (Studio) | UUIDs usuarios | — |
| EV-6C-04 | VI §6.5.3 | D-01 CP-07 | `/psicometrico` o API | Guard activo | ídem | Comportamiento CP-07: guard verifica campo `completed`, no score — APROBADO PARCIAL | `validaciones/EV-6C-04-cp07-guard-d01.png` | OBTENIDA | Ninguno | CP-07 |
| EV-6C-05 | VI §6.5.3 | CP-20 Resultado | `/resultado/[id]` | Intento completado | ídem | Resultado psicométrico con clasificación visible | `candidato/EV-5A-17-resultado-psicometrico.png` | OBTENIDA* | Email, resultados | CP-20 |
| EV-6C-06 | VI §6.5.3 | D-03 CP-18 Stats | `/api/admin/stats` | Sesión admin | `admin-8c-001@prueba-uces.test` | Respuesta JSON con solo 2 métricas (D-03 documentada) | `validaciones/EV-6C-06-cp18-stats-d03.png` | OBTENIDA | — | CP-18 |
| EV-6C-07 | VI §6.5.3 | RLS CP-22 | API Supabase REST | Sin sesión o sesión candidato | — | Error 403 / array vacío al acceder tabla sin permisos | `validaciones/EV-6C-07-cp22-rls.png` | OBTENIDA | — | CP-22 |

---

## Resumen consolidado

| Estado | Cat. A | Total con suplementarias |
|---|---|---|
| OBTENIDA | 15 | 18 |
| PENDIENTE | 2 | 2 |
| BLOQUEADA (Studio) | 4 | 4 |
| **Total** | **21** | **24** |
