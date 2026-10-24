# Capítulo VI — Plan de pruebas funcionales

**Fecha de elaboración:** 2026-10-22
**Alcance:** Pruebas funcionales del MVP de UCES Plataforma de Talento
**Base:** Requisitos funcionales RF-01 a RF-18 documentados en el Capítulo V

> **Nota:** Este documento es el insumo de planificación para el Capítulo VI. Los resultados, capturas de pantalla y evidencias se registrarán en los documentos de ejecución de pruebas una vez realizadas.

---

## 6.1 Estrategia de pruebas

### 6.1.1 Enfoque

Las pruebas del MVP son **funcionales end-to-end**: verifican que cada requisito funcional produce el comportamiento esperado desde la interfaz de usuario, sin acceso directo a la base de datos durante la ejecución (excepto verificaciones de estado con el dashboard de Supabase).

No se realizan pruebas unitarias automatizadas en esta fase; el alcance del trabajo de titulación cubre pruebas manuales con criterios de aceptación definidos. Las pruebas automatizadas son trabajo futuro.

### 6.1.2 Entornos

| Entorno | URL | Uso |
|---|---|---|
| Local (`npm run dev`) | `http://localhost:3000` | Pruebas exploratorias y de regresión |
| Producción (Vercel) | URL de producción del proyecto | Pruebas de aceptación finales |

### 6.1.3 Roles de prueba requeridos

| Rol | Descripción | Cómo obtener |
|---|---|---|
| Candidato de prueba | Usuario registrado sin rol admin | Registro desde `/register` con CURP nueva |
| Candidato con psicométrico completado | Candidato que completó el cuestionario base | Candidato de prueba + completar evaluación en `/psicometrico` |
| Administrador | Usuario con rol `admin` en `user_roles` | Insertar en Supabase Dashboard: `INSERT INTO user_roles (user_id, role) VALUES ('[uuid]', 'admin')` |

### 6.1.4 Datos de prueba

- Usar CURP de formato válido con datos ficticios (ej. `GOMC900101HDFRRL09`)
- Email: usar direcciones de prueba en dominio controlado
- Vacantes de prueba: crear al menos dos, una en estado `open` y una en `draft`
- Módulo de prueba: crear al menos uno visible en el catálogo

---

## 6.2 Casos de prueba

### CP-01 — Registro de candidato nuevo

| Campo | Valor |
|---|---|
| RF cubierto | RF-01 |
| Precondiciones | CURP no registrada, email no usado |
| Pasos | 1. Ir a `/register`. 2. Ingresar nombre, email, password, CURP válida. 3. Enviar. |
| Resultado esperado | 201 — Candidato creado. Redirige a `/login`. En Supabase: registro en `profiles`, `curp_hashes`, `user_roles` (role='user'). |
| Resultado de falla esperado | CURP ya registrada → 400 "Esta CURP ya está registrada". Email ya usado → 400. |
| Captura requerida | `fig-5-2a-registro-exitoso.png`, `fig-5-2b-error-curp-duplicada.png` |

### CP-02 — Autenticación de candidato

| Campo | Valor |
|---|---|
| RF cubierto | RF-02 |
| Precondiciones | Candidato registrado con CP-01 |
| Pasos | 1. Ir a `/login`. 2. Ingresar email y password. 3. Enviar. |
| Resultado esperado | Sesión activa. Redirección a `/panel`. |
| Resultado de falla | Credenciales incorrectas → mensaje de error visible. |
| Captura requerida | `fig-5-3a-login-formulario.png`, `fig-5-3b-panel-tras-login.png` |

### CP-03 — Protección de ruta admin desde candidato

| Campo | Valor |
|---|---|
| RF cubierto | RF-02, §5.10 |
| Precondiciones | Sesión de candidato activa |
| Pasos | 1. Navegar directamente a `/admin` con sesión de candidato. |
| Resultado esperado | Redirección a `/panel` (protección client-side). Si se prueba la API: `GET /api/admin/modules` con token de candidato → 403. |
| Captura requerida | `fig-5-10a-acceso-denegado-admin.png` |

### CP-04 — Panel del candidato con 5 efectos

| Campo | Valor |
|---|---|
| RF cubierto | RF-03 |
| Precondiciones | Sesión activa, módulos y vacantes creados |
| Pasos | 1. Ir a `/panel`. 2. Observar carga de: perfil, rol, módulos, vacantes y estado psicométrico. |
| Resultado esperado | Panel muestra nombre, lista de módulos, lista de vacantes y estado del psicométrico (pendiente o completado). |
| Captura requerida | `fig-5-4a-panel-candidato-estado.png` |

### CP-05 — Catálogo de vacantes — exclusión de draft

| Campo | Valor |
|---|---|
| RF cubierto | RF-04 |
| Precondiciones | Vacante `open` y vacante `draft` creadas |
| Pasos | 1. Ir a `/panel` o catálogo de vacantes como candidato. |
| Resultado esperado | Solo aparecen vacantes con `status = 'open'`. La vacante en `draft` no es visible. |
| Captura requerida | `fig-5-5a-catalogo-vacantes.png` |

### CP-06 — Detalle de vacante

| Campo | Valor |
|---|---|
| RF cubierto | RF-05 |
| Precondiciones | Vacante `open` con módulo asignado |
| Pasos | 1. Hacer clic en una vacante del catálogo. |
| Resultado esperado | Página de detalle muestra título, descripción, módulo y botón "Postular". |
| Captura requerida | `fig-5-5b-detalle-vacante.png` |

### CP-07 — Bloqueo por psicométrico no completado

| Campo | Valor |
|---|---|
| RF cubierto | RF-06 |
| Precondiciones | Candidato sin cuestionario psicométrico completado |
| Pasos | 1. Intentar postularse a una vacante `open`. |
| Resultado esperado | 403 con `requiresPsychometric: true`. Redirección automática a `/psicometrico`. |
| Captura requerida | `fig-5-6a-bloqueo-psicometrico.png` |

### CP-08 — Postulación con psicométrico completado (verificación D-01)

| Campo | Valor |
|---|---|
| RF cubierto | RF-07 |
| Discrepancia verificada | D-01: candidato con clasificación Riesgo puede postularse |
| Precondiciones | Candidato con psicométrico enviado (cualquier resultado) |
| Pasos | 1. Verificar en panel admin que el candidato tiene algún rasgo en "Riesgo". 2. Intentar postularse a vacante `open`. |
| Resultado esperado | Postulación exitosa. No hay bloqueo por puntaje. Redirige a `/evaluacion/[attemptId]`. |
| Captura requerida | `fig-5-12b-d01-postulacion-riesgo.png` |

### CP-09 — Reutilización de postulación existente

| Campo | Valor |
|---|---|
| RF cubierto | RF-08, FE-03 |
| Precondiciones | Candidato con postulación previa a la misma vacante |
| Pasos | 1. Postularse por segunda vez a la misma vacante. |
| Resultado esperado | No se crea una nueva `application`; se retorna el intento existente si no fue enviado. |
| Captura requerida | — (verificar en Supabase Dashboard: cuenta de `applications`) |

### CP-10 — Evaluación con temporizador

| Campo | Valor |
|---|---|
| RF cubierto | RF-09 |
| Precondiciones | Intento activo con `deadline_at` futuro |
| Pasos | 1. Abrir `/evaluacion/[attemptId]`. 2. Observar temporizador. 3. Responder preguntas y guardar. |
| Resultado esperado | Temporizador visible y decreciente. Respuestas guardadas sin recargar página. Al expirar: envío automático y redirección. |
| Capturas requeridas | `fig-5-7a-evaluacion-activa-temporizador.png`, `fig-5-7b-preguntas-lista.png` |

### CP-11 — Envío automático al expirar (FE-04)

| Campo | Valor |
|---|---|
| RF cubierto | RF-09, FE-04 |
| Precondiciones | Intento con `deadline_at` próximo (reducir duración en admin para prueba) |
| Pasos | 1. Abrir evaluación. 2. Esperar a que el temporizador llegue a 0 sin enviar manualmente. |
| Resultado esperado | Envío automático disparado. `submitMeta.timedOutBeforeSubmit = true` en `psychometric_summary`. Estado del intento: `UNDER_REVIEW`. |
| Captura requerida | `fig-5-7e-envio-automatico-expirado.png` |

### CP-12 — Carga de evidencia

| Campo | Valor |
|---|---|
| RF cubierto | RF-10 |
| Precondiciones | Intento activo, evaluación con tarea práctica |
| Pasos | 1. En la pantalla de evaluación, subir archivo PDF menor a 5 MB. |
| Resultado esperado | Archivo subido al bucket `evidences`. Registro creado en `evidence_uploads`. Enlace visible en pantalla. |
| Capturas requeridas | `fig-5-8d-carga-evidencia.png`, `fig-5-8e-evidencia-subida.png` |

### CP-13 — Visualización de resultado

| Campo | Valor |
|---|---|
| RF cubierto | RF-12 |
| Precondiciones | Intento enviado |
| Pasos | 1. Ir a `/resultado/[attemptId]`. |
| Resultado esperado | Página muestra estado del intento. |
| Captura requerida | `fig-5-7f-resultado-enviado.png` |

### CP-14 — Cuestionario psicométrico completo

| Campo | Valor |
|---|---|
| RF cubierto | RF-06, RF-09, RF-11 |
| Precondiciones | Candidato sin psicométrico previo |
| Pasos | 1. Ir a `/psicometrico`. 2. Responder los 20 reactivos con escala Likert 1-5. 3. Enviar. |
| Resultado esperado | `theory_score = 100`. `psychometric_summary` con scores por rasgo. Redirige a `/panel`. En Supabase: `psychometric_summary` no nulo en el intento. |
| Capturas requeridas | `fig-5-11a-psicometrico-evaluacion.png`, `fig-5-11b-psicometrico-resultado.png` |

### CP-15 — Creación de módulo (admin)

| Campo | Valor |
|---|---|
| RF cubierto | RF-13 |
| Precondiciones | Sesión de administrador activa |
| Pasos | 1. Ir a `/admin` → pestaña Módulos. 2. Ingresar nombre. 3. Guardar. |
| Resultado esperado | Módulo aparece en lista. |
| Captura requerida | `fig-5-9b-admin-modulos.png` |

### CP-16 — Creación de vacante con assessment automático (FE-02)

| Campo | Valor |
|---|---|
| RF cubierto | RF-14 |
| Precondiciones | Al menos un módulo existente |
| Pasos | 1. Ir a `/admin` → pestaña Vacantes. 2. Crear vacante asignando módulo. |
| Resultado esperado | Vacante creada. En Supabase: registro en `assessments` con `vacancy_id` = nueva vacante. |
| Captura requerida | `fig-5-9c-admin-vacantes.png` |

### CP-17 — Configuración de evaluación y preguntas (admin)

| Campo | Valor |
|---|---|
| RF cubierto | RF-15, RF-16 |
| Precondiciones | Vacante con assessment creado |
| Pasos | 1. Ir a `/admin` → pestaña Evaluaciones. 2. Editar duración. 3. Agregar pregunta. |
| Resultado esperado | Pregunta aparece en lista del assessment. Candidato verá la pregunta al presentar el intento. |
| Captura requerida | `fig-5-9d-admin-evaluaciones-preguntas.png` |

### CP-18 — Lista de intentos con filtros (admin)

| Campo | Valor |
|---|---|
| RF cubierto | RF-17 |
| Precondiciones | Al menos un intento enviado |
| Pasos | 1. Ir a `/admin` → pestaña Intentos. 2. Aplicar filtros por vacante o estado. |
| Resultado esperado | Lista filtrada de intentos con nombre del candidato y vacante. |
| Captura requerida | `fig-5-9e-admin-intentos.png` |

### CP-19 — Detalle de intento psicométrico (admin)

| Campo | Valor |
|---|---|
| RF cubierto | RF-17 |
| Precondiciones | Intento psicométrico enviado con `psychometric_summary` |
| Pasos | 1. Abrir detalle del intento psicométrico del candidato en `/admin/attempts/[id]`. |
| Resultado esperado | Resumen Big Five visible con scores por rasgo, clasificaciones y respuestas individuales. Extroversión marcada como indicador. |
| Capturas requeridas | `fig-5-11c-admin-resumen-bigfive.png`, `fig-5-11d-admin-extroversion-indicador.png` |

### CP-20 — Registro de decisión (admin) — verificación D-02

| Campo | Valor |
|---|---|
| RF cubierto | RF-18 |
| Discrepancia verificada | D-02: decisión registrada en `reviews`, no en `attempts.decision` |
| Precondiciones | Intento en estado `UNDER_REVIEW` |
| Pasos | 1. Abrir detalle en `/admin/attempts/[id]`. 2. Seleccionar decisión APPROVED. 3. Agregar nota. 4. Guardar. |
| Resultado esperado | Estado del intento → COMPLETED. En Supabase Dashboard: registro en tabla `reviews` con la decisión. |
| Capturas requeridas | `fig-5-9g-admin-acciones-revision.png`, `fig-5-12a-decision-aprobado.png` |

### CP-21 — Acceso a evidencias desde admin (admin)

| Campo | Valor |
|---|---|
| RF cubierto | RF-17 |
| Precondiciones | Intento con evidencia subida |
| Pasos | 1. Abrir detalle en `/admin/attempts/[id]`. 2. Ir a sección Evidencias. 3. Hacer clic en "Descargar". |
| Resultado esperado | URL firmada (signed URL) válida. Archivo descargado o previsualizado. |
| Captura requerida | `fig-5-9i-admin-evidencias-descarga.png` |

### CP-22 — Seguridad: Bearer token en API admin

| Campo | Valor |
|---|---|
| RF cubierto | §5.10 |
| Precondiciones | Sesión de administrador activa, DevTools abierto |
| Pasos | 1. En `/admin`, abrir DevTools → Network. 2. Realizar cualquier acción (cargar módulos). 3. Inspeccionar la solicitud a `/api/admin/modules`. |
| Resultado esperado | Encabezado `Authorization: Bearer [token]` visible en la solicitud. |
| Captura requerida | `fig-5-10b-bearer-token-devtools.png` (opcional) |

---

## 6.3 Tabla resumen de casos de prueba

| CP | RF | Tipo | Discrepancia/FE | Prioridad |
|---|---|---|---|---|
| CP-01 | RF-01 | Funcional | — | Alta |
| CP-02 | RF-02 | Funcional | — | Alta |
| CP-03 | RF-02 | Seguridad | — | Alta |
| CP-04 | RF-03 | Funcional | — | Media |
| CP-05 | RF-04 | Funcional | — | Media |
| CP-06 | RF-05 | Funcional | — | Media |
| CP-07 | RF-06 | Funcional | — | Alta |
| CP-08 | RF-07 | Funcional | D-01 | Alta |
| CP-09 | RF-08 | Funcional | FE-03 | Media |
| CP-10 | RF-09 | Funcional | — | Alta |
| CP-11 | RF-09 | Funcional | FE-04 | Media |
| CP-12 | RF-10 | Funcional | — | Alta |
| CP-13 | RF-12 | Funcional | — | Baja |
| CP-14 | RF-06, RF-09, RF-11 | Integral | — | Alta |
| CP-15 | RF-13 | Funcional | — | Media |
| CP-16 | RF-14 | Funcional | FE-02 | Media |
| CP-17 | RF-15, RF-16 | Funcional | — | Media |
| CP-18 | RF-17 | Funcional | — | Media |
| CP-19 | RF-17 | Funcional | — | Alta |
| CP-20 | RF-18 | Funcional | D-02 | Alta |
| CP-21 | RF-17 | Funcional | — | Media |
| CP-22 | §5.10 | Seguridad | — | Baja |

**Total de casos de prueba:** 22

---

## 6.4 Criterios de aceptación del capítulo

El Capítulo VI se considerará completo cuando:

1. Los 22 casos de prueba hayan sido ejecutados y documentados con resultado (PASA / FALLA).
2. Los casos de alta prioridad (CP-01, CP-02, CP-03, CP-07, CP-08, CP-10, CP-12, CP-14, CP-19, CP-20) hayan pasado.
3. Las discrepancias D-01 y D-02 hayan sido confirmadas empíricamente mediante CP-08 y CP-20 respectivamente.
4. Las 42 capturas de pantalla requeridas hayan sido obtenidas y nombradas según las convenciones del catálogo.
5. La sección de análisis de resultados relacione cada hallazgo con el RF o discrepancia correspondiente del Capítulo V.

---

## 6.5 Estructura propuesta del Capítulo VI

```
6.1 Introducción a las pruebas
6.2 Entorno de prueba y configuración
6.3 Pruebas del flujo del candidato (CP-01 a CP-14)
  6.3.1 Registro y autenticación
  6.3.2 Panel y catálogo
  6.3.3 Cuestionario psicométrico
  6.3.4 Postulación y evaluación
  6.3.5 Evidencias
6.4 Pruebas del panel administrativo (CP-15 a CP-22)
  6.4.1 Gestión de configuración
  6.4.2 Revisión de intentos y decisiones
  6.4.3 Verificación de seguridad
6.5 Verificación de discrepancias documentadas
  6.5.1 D-01: verificación empírica de postulación con Riesgo
  6.5.2 D-02: verificación de almacenamiento en reviews
6.6 Análisis de resultados
6.7 Conclusiones
```
