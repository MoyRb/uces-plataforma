# Revisión académica — Capítulo V (Corte 5A)

**Documento revisado:** `docs/titulacion/capitulos/05-desarrollo-implementacion.md` (secciones 5.1 a 5.8)
**Fecha de revisión:** 2026-10-22
**Revisor:** Auditoría interna pre-entrega

---

## 1. Contraste fragmentos de código con archivos fuente

| Fragmento en el capítulo | Archivo fuente | Líneas verificadas | ¿Correcto? |
|---|---|---|---|
| `curpPattern = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/` | `app/api/auth/register/route.ts:12` | Literal | SÍ |
| `supabase.auth.admin.createUser({email_confirm: true})` | `register/route.ts:56-60` | Exacto | SÍ |
| `await supabase.auth.admin.deleteUser(userId)` en rollback | `register/route.ts:74, 84, 94` | Tres ocurrencias verificadas | SÍ |
| `PSICOMETRICO_BASE_ASSESSMENT_ID = "f2000000-0000-0000-0000-000000000001"` | `lib/assessmentConstants.ts` (referenciado en psicometrico.ts:3) | UUID verificado en seed.sql | SÍ |
| `!psicometricoState.completed` como única verificación en apply | `apply/route.ts:32-41` | Exacto — NO verifica score | SÍ |
| `autoSubmitTriggeredRef.current = true` para prevenir doble envío | `cliente.tsx:215` | Exacto | SÍ |
| `setRemainingMs(() => new Date(deadlineAt).getTime() - Date.now())` | `cliente.tsx:61` | Exacto (inicialización de estado) | SÍ |
| `Date.now() > new Date(attempt.deadline_at).getTime()` en answers route | `answers/route.ts:64` | Exacto | SÍ |
| `upsert({attempt_id, question_id, selected_option})` en answers | `answers/route.ts:74-78` | Exacto | SÍ |
| Path: `${attemptId}/${Date.now()}-${Math.random()...}` | `cliente.tsx:148` | Exacto | SÍ |
| `accept="image/*,application/pdf"` en el input de evidencia | `cliente.tsx:315` | Exacto (`image/*,application/pdf`) | SÍ |
| `createSignedUrl(upload.path, 3600)` en admin detail | `app/api/admin/attempts/[id]/detail/route.ts` | Verificado en sesión anterior | SÍ |
| `supabase.storage.from("evidences").upload(storagePath, file, {upsert: false})` | `cliente.tsx:150-152` | Exacto | SÍ |

**Resultado:** Todos los fragmentos de código son exactos y corresponden al código real. Ninguno fue inventado ni parafraseado incorrectamente.

---

## 2. Verificación de requisitos correctamente asociados

| RF | Sección donde se documenta | ¿Correcto? |
|---|---|---|
| RF-01 (Registro con CURP) | 5.3 | SÍ — flujo completo documentado |
| RF-02 (Hash HMAC CURP) | 5.3.1 | SÍ — mecanismo y código explicados |
| RF-03 (Autenticación y rol) | 5.3.2 | SÍ — login + get_my_role + resolveRole |
| RF-04 (Módulos disponibles) | 5.4, 5.5 | SÍ — panel + modulos/[id] |
| RF-05 (Detalle de vacantes) | 5.5 | SÍ — jerarquía y Server Component |
| RF-06 (Cuestionario psicométrico) | 5.6.1 (verificación previa) | PARCIAL — el módulo psicométrico completo se documentará en 5B como submódulo |
| RF-07 (Postulación) | 5.6 | SÍ — flujo completo de 6 pasos |
| RF-08 (Responder evaluación) | 5.7.3 | SÍ — upsert, validaciones, estado local |
| RF-09 (Control de tiempo) | 5.7.2, 5.7.3 | SÍ — timer, deadline_at, validación servidor |
| RF-10 (Carga de evidencias) | 5.8 | SÍ — Storage, path, evidence_uploads |
| RF-11 (Envío de intento) | 5.7.5 | SÍ — submit route, theory_score, JSONB |

**RF-06 queda parcialmente documentado en 5A** — la verificación del prerrequisito psicométrico se documenta en 5.6.1, pero el módulo `/psicometrico` como flujo independiente (iniciar, responder, enviar) se documentará en el Corte 5B.

---

## 3. Verificación de correspondencia de diagramas con el flujo real

| Figura | Descripción | ¿Corresponde al código? |
|---|---|---|
| Figura 5.1 — Arquitectura | Tres capas: Browser, Servidor Next.js, Supabase | SÍ — refleja la separación real de `supabaseClient.ts` vs `supabaseServer.ts` |
| Figura 5.2 — Secuencia de registro | 8 pasos con rollbacks | SÍ — cada paso tiene referencia a líneas del código |
| Figura 5.3 — Secuencia de postulación | 6 verificaciones + creación de intento | SÍ — el orden corresponde exactamente a `apply/route.ts` |
| Figura 5.4 — Almacenamiento de evidencias | Upload a Storage + INSERT en evidence_uploads | SÍ — corresponde a `handleUpload()` en `cliente.tsx:137-175` |

---

## 4. Inconsistencias detectadas

### 4.1 `getPublicUrl` en un bucket privado

**Sección:** 5.8.4 (último párrafo)

En `cliente.tsx:89`, el código usa `supabase.storage.from("evidences").getPublicUrl(evidence.path)` para mostrar el archivo al candidato durante la evaluación activa. Sin embargo, el bucket `evidences` es privado (`public = false` en `rls.sql:291`).

`getPublicUrl()` genera la URL en el formato correcto del bucket, pero para buckets privados esa URL no es accesible sin autenticación. La URL solo funciona si el candidato está autenticado y la política de RLS de Storage permite la lectura (política `owner-or-admin-read-evidences` solo permite SELECT, no acceso HTTP sin autenticación).

**Consecuencia práctica:** El enlace "Ver evidencia" mostrado al candidato durante su evaluación puede no funcionar si el navegador intenta abrir la URL sin incluir el JWT. Este es un comportamiento no documentado que el desarrollador debe confirmar durante las pruebas del Capítulo VI.

**Qué dice el capítulo:** La sección 5.8.4 menciona esto como "URL pública solo funciona durante la sesión autenticada del propietario", lo que es una descripción aproximada pero no completamente precisa técnicamente. Corrección sugerida para la versión final: señalar que `getPublicUrl()` se usa en el cliente como referencia de previsualización, y que el acceso a archivos privados en el panel admin usa correctamente `createSignedUrl()`.

### 4.2 Theory score psicométrico vs. score de conocimientos

**Sección:** 5.7.5

El capítulo afirma que para evaluaciones de conocimientos, el `theory_score` almacena la puntuación de respuestas correctas. Sin embargo, el código de `submit/route.ts` revisado en la sesión anterior calcula `theory_score = Math.round((likertAnswered / likertQuestions) * 100)` usando `calculatePsicometricoSummary()`. Esta función solo maneja ítems con prefijo `MINI_BIG_FIVE|`. Para evaluaciones de conocimientos (no psicométricas), las respuestas no tienen ese prefijo, por lo que `likertAnswered` sería 0 y el `theory_score` resultaría 0.

**Estado:** La afirmación "para evaluaciones de conocimientos almacena la puntuación de respuestas correctas" requiere verificación adicional del código de submit. Este punto debe marcarse como pendiente en la sección 5.7.5 de la versión final.

---

## 5. Identificación de posibles vulnerabilidades (sin modificar código)

| Vulnerabilidad potencial | Sección relacionada | Riesgo | Notas |
|---|---|---|---|
| Tipo MIME no verificado en el servidor para evidencias | 5.8.3 | BAJO — el bucket privado restringe acceso; el contenido no se ejecuta | Documentado en el capítulo como limitación del MVP |
| Envío de evaluación sin respuestas mínimas | 5.7.5 | BAJO — el sistema acepta envíos con 0 respuestas | No es una vulnerabilidad de seguridad; es una limitación de negocio |
| `getPublicUrl()` en bucket privado | 5.8.4 | BAJO — afecta funcionalidad, no seguridad | Documentado en sección 4.1 de esta revisión |
| Protección de ruta por cliente (panel) | 5.4.1 | BAJO — los endpoints API son protegidos independientemente | Documentado en 5.4.2: la verificación es de usabilidad, no de seguridad |

No se identificaron vulnerabilidades de seguridad graves. Las protecciones de seguridad aplicadas (RLS, requireAdmin, JWT validation, HMAC) son correctas y están documentadas.

---

## 6. Continuidad con capítulos anteriores

| Elemento | Capítulo anterior | Cap. V 5A | ¿Coherente? |
|---|---|---|---|
| Prototipado evolutivo → iteración 2 implementó el flujo del candidato | Cap. IV, sección 4.4 | 5A documenta exactamente ese flujo | SÍ |
| HMAC-SHA256 para CURP | Cap. III, sección 3.6 | 5.3.1 aplica el fundamento con código real | SÍ |
| JWT y getRoleForSession() | Cap. III, sección 3.5 | 5.3.2 implementa el flujo descrito | SÍ |
| Server vs. Client Components | Cap. III, sección 3.3.2 | 5.4.1, 5.7.1 aplican la distinción con ejemplos concretos | SÍ |
| Discrepancia D-01 (solo verifica completed, no score) | Cap. IV, problema T-XX y matriz de requisitos | 5.6.1 menciona explícitamente D-01 | SÍ |

---

## 7. Extensión estimada del Corte 5A

| Sección | Palabras est. | Páginas est. (250 pal./pág.) |
|---|---|---|
| 5.1 Arquitectura | ~620 | ~2.5 |
| 5.2 Configuración Supabase | ~380 | ~1.5 |
| 5.3 Registro y autenticación | ~740 | ~3.0 |
| 5.4 Panel del candidato | ~450 | ~1.8 |
| 5.5 Vacantes | ~340 | ~1.4 |
| 5.6 Postulación | ~750 | ~3.0 |
| 5.7 Evaluaciones | ~780 | ~3.1 |
| 5.8 Evidencias | ~480 | ~1.9 |
| **Total 5A** | **~4,540** | **~18.2 páginas** |

El Corte 5A está dentro del rango objetivo de 20-23 páginas considerando que los diagramas y tablas ocupan espacio adicional en la versión maquetada. Los cuatro diagramas Mermaid y cuatro tablas de la sección 5.1, más las tablas de las otras secciones, agregarán aproximadamente 3-4 páginas visuales.

---

## 8. Asuntos pendientes antes de la entrega

| Asunto | Sección | Acción requerida |
|---|---|---|
| Confirmar comportamiento de `theory_score` en evaluaciones de conocimientos | 5.7.5 | Leer la lógica de submit/route.ts para evaluaciones no psicométricas |
| Confirmar el funcionamiento real del enlace "Ver evidencia" en evaluación activa | 5.8.4 | Prueba funcional manual |
| Capturas de pantalla para acompañar los diagramas | Todas | Ver `05a-capturas-pendientes.md` |
| RF-06 (módulo psicométrico completo) | Pendiente 5B | Documentar el flujo /psicometrico → /evaluacion → /resultado psicométrico |
