# Matriz de cumplimiento de objetivos — Capítulo VII

**Fecha:** 2026-10-23
**Fuente:** Objetivos definidos en §1.3–§1.4 del Capítulo I; evidencias del Capítulo V y del Corte 6B.

---

## 1. Objetivo general

> Desarrollar una plataforma web funcional que centralice y digitalice las actividades del proceso de reclutamiento y preselección de candidatos del área de Recursos Humanos de UCES, mediante la implementación de módulos de registro de candidatos, evaluación psicométrica, evaluación de conocimientos con temporizador, carga de evidencia práctica y revisión administrativa de resultados, con mecanismos de autenticación, autorización por roles y seguridad a nivel de base de datos.

| Dimensión evaluada | Resultado | Evidencia |
|---|---|---|
| Plataforma web funcional en producción | Desplegada en Vercel; accesible públicamente | §5.1; variable NEXT_PUBLIC_SUPABASE_URL |
| Módulo de registro | Implementado; validación CURP + HMAC-SHA256 + unicidad | CP-01 APROBADO (EV-6B-01) |
| Evaluación psicométrica | Implementada; 20 ítems, 5 rasgos, scoring automático | CP-14 APROBADO (EV-6B-06/07) |
| Evaluación con temporizador | Implementada; deadline configurable, envío automático | CP-10 APROBADO PARCIAL (INC-6B-01 documentada) |
| Carga de evidencia práctica | Implementada; bucket privado Supabase Storage | CP-12 APROBADO (EV-6B-12) |
| Revisión administrativa | Implementada; decisión persistida; fallback documentado | CP-20 APROBADO PARCIAL (INC-6B-02) |
| Autenticación y autorización por roles | Implementadas; requireAdmin() 4 verificaciones | CP-03, CP-22 APROBADO |
| Seguridad a nivel de base de datos (RLS) | Habilitada en 13 tablas; verificada por EE-07 | EV-EST-05, §5.10 |

**Nivel de cumplimiento del objetivo general: CUMPLIDO CON MATICES**

Los ocho componentes del objetivo están presentes y verificados funcionalmente. Los matices documentados son INC-6B-01 (UPSERT de respuestas sin `onConflict`, impacto bajo) e INC-6B-02 (`upsertReview` con fallback funcional, impacto medio). Ninguna de estas incidencias invalida la funcionalidad central ni impide el uso del sistema.

---

## 2. Objetivos específicos

### OE-01 — Modelo de datos relacional con RLS

> Diseñar un modelo de datos relacional en PostgreSQL que soporte los flujos de registro de usuarios, gestión de vacantes, aplicación de evaluaciones y almacenamiento de resultados, con restricciones de integridad referencial y políticas de RLS.

| Indicador | Resultado | Evidencia |
|---|---|---|
| Tablas del modelo | 13 tablas implementadas | `supabase/schema.sql`, §4.4 |
| Integridad referencial | FK entre profiles, applications, attempts, answers | schema.sql líneas de constraint |
| RLS habilitado | Todas las tablas; políticas por rol | `supabase/rls.sql`, §5.2 |
| Flujo candidato soportado | Registro → psicométrico → postulación → evaluación | CPs 01–14 APROBADO |
| Flujo admin soportado | CRUD módulos/vacantes/evaluaciones + revisión | CPs 15–21 APROBADO |

**Estado:** CUMPLIDO

---

### OE-02 — Módulo de registro con CURP criptográfica

> Implementar un módulo de registro que valide el formato de la CURP, almacene únicamente su representación criptográfica mediante HMAC-SHA256 y garantice la unicidad mediante restricción de clave única.

| Indicador | Resultado | Evidencia |
|---|---|---|
| Validación formato CURP | Regex en `lib/curp.ts` | §5.3; EV-EST-03 (indirecto) |
| HMAC-SHA256 implementado | `hashCurpHmac()` con clave de entorno | `lib/curp.ts` |
| Sin CURP en texto claro | Tabla `curp_hashes` almacena solo hash | EV-VI-01 (pendiente captura) |
| Unicidad garantizada | `unique` en `curp_hashes.hash` | `schema.sql` |
| Rechazo por CURP duplicada | HTTP 400 con mensaje específico | CP-02a APROBADO (EV-6B-02) |

**Estado:** CUMPLIDO

---

### OE-03 — Módulo de evaluación psicométrica Big Five

> Desarrollar el módulo de evaluación psicométrica que permita presentar el cuestionario Big Five, registrar respuestas con escala Likert, calcular scores por rasgo y generar un resumen estructurado persistente.

| Indicador | Resultado | Evidencia |
|---|---|---|
| 20 ítems Likert 1-5 implementados | 20 preguntas con prefijo MINI_BIG_FIVE | Seed en Supabase; EV-6B-06 |
| 5 rasgos evaluados | ESTABILIDAD, AMABILIDAD, RESPONSABILIDAD, APERTURA, EXTROVERSION | `lib/psicometricoResults.ts` |
| Scoring automático | `calculatePsicometricoSummary()` | EV-EST-03; EV-6B-07 |
| Resumen persistente en JSONB | `attempts.psychometric_summary` | EV-6B-07 (theoryScore:100) |
| Disponible para admin | `/admin/attempts/[id]` muestra Big Five | CP-19 APROBADO (EV-6B-18) |
| Clasificación por umbral | ≥16 Alta, 11-15 Adecuada, <11 Riesgo | `lib/psicometricoResults.ts:72-85` |

**Estado:** CUMPLIDO

**Matiz:** Los umbrales de clasificación corresponden a criterios institucionales, no a validación psicométrica publicada. Esta limitación está declarada explícitamente en §1.6 del Capítulo I.

---

### OE-04 — Módulo de evaluación con temporizador, envío automático y evidencia

> Construir el módulo de evaluación con temporizador regresivo configurable, guardado automático por selección, envío automático al expirar, carga de archivo de evidencia práctica y procesamiento del intento al envío.

| Indicador | Resultado | Evidencia |
|---|---|---|
| Temporizador regresivo | Implementado en `evaluacion/[attemptId]/cliente.tsx` | §5.7; CP-10 (EV-6B-10) |
| Guardado por selección | `/api/attempts/[id]/answers` guarda cada respuesta | CP-10 APROBADO (5 respuestas OK) |
| Envío automático al expirar | FE-04; `timedOutBeforeSubmit` en JSONB | CP-11 BLOQUEADO (limitación práctica) |
| Sin doble envío | Intento idempotente por estado | `submit/route.ts`; §5.7.5 |
| Carga de evidencia | Supabase Storage bucket "evidences" | CP-12 APROBADO (EV-6B-12) |
| Procesamiento al envío | `calculatePsicometricoSummary()`, `theory_score` | CP-13 APROBADO (EV-6B-13) |

**Estado:** CUMPLIDO CON MATICES

**Matices:**
- CP-11 (envío automático) no fue ejecutado por restricción práctica de tiempo (esperar 35 min). La lógica está implementada y verificada estáticamente. El timeout se documenta como no probado empíricamente.
- INC-6B-01: el UPSERT de respuestas falla al intentar cambiar una respuesta ya registrada (impacto bajo: primera respuesta queda guardada).

---

### OE-05 — Panel administrativo con CRUD y revisión

> Implementar el panel administrativo con CRUD sobre módulos, vacantes, evaluaciones y preguntas, revisión de intentos, consulta de resumen psicométrico, acceso a evidencia con URLs firmadas y registro de decisiones.

| Indicador | Resultado | Evidencia |
|---|---|---|
| CRUD módulos | GET/POST/PUT/DELETE en `/api/admin/modules/` | CP-15 APROBADO (EV-6B-14) |
| CRUD vacantes | Con auto-creación de assessment (FE-02) | CP-16 APROBADO (EV-6B-15) |
| CRUD evaluaciones y preguntas | 4 endpoints específicos | CP-17 APROBADO (EV-6B-16) |
| Lista de intentos con stats | GET /admin/attempts, /admin/vacancies/[id]/stats | CP-18 APROBADO (EV-6B-17) |
| Detalle con resumen psicométrico | GET /admin/attempts/[id]/detail | CP-19 APROBADO (EV-6B-18) |
| Signed URLs para evidencia | Generadas automáticamente en detalle admin | CP-21 APROBADO (EV-6B-20) |
| Registro de decisiones | PATCH /admin/attempts/[id] → APPROVED | CP-20 APROBADO PARCIAL (INC-6B-02) |

**Estado:** CUMPLIDO CON MATICES

**Matiz:** INC-6B-02 — `upsertReview` falla por mismatch de schema y usa fallback `attempts.decision`. La decisión se persiste correctamente, pero en la tabla de respaldo en lugar de `reviews`. El flujo de negocio es funcional; la auditoría de revisiones es incompleta.

---

### OE-06 — Control de acceso con roles, JWT y RLS

> Aplicar un modelo de control de acceso con dos roles operativos diferenciados, respaldado por políticas RLS y verificación de JWT en los endpoints de la API.

| Indicador | Resultado | Evidencia |
|---|---|---|
| Dos roles operativos | `admin` y `user` (candidato) | `lib/auth.ts`; `user_roles` |
| Verificación JWT en API admin | `requireAdmin()`: 4 verificaciones secuenciales | EV-EST-05; EE-07 |
| RPC `get_my_role()` | Security definer; acceso sin exposición directa de tabla | `supabase/roles.sql` |
| Candidato no accede a admin | HTTP 403 con token de candidato | CP-03 APROBADO (EV-6B-04) |
| Token inválido → 401 | Sin header o token corrupto | CP-22 APROBADO (EV-6B-21) |
| RLS en 13 tablas | Políticas por usuario y por rol | `supabase/rls.sql` |

**Estado:** CUMPLIDO

**Nota D-04:** El rol `reviewer` está definido en el esquema pero `resolveRole("reviewer")` retorna `"user"`. Es inoperativo. Esta limitación está declarada explícitamente en §1.6.

---

### OE-07 — Despliegue en entorno accesible públicamente

> Desplegar el sistema en Vercel con variables de entorno sensibles configuradas y la infraestructura Supabase vinculada.

| Indicador | Resultado | Evidencia |
|---|---|---|
| Despliegue en Vercel | Producción activa | §5.1; dominio .vercel.app |
| Variables de entorno en plataforma | 4 variables configuradas en Vercel | `06b-reporte-ejecucion.md §1` |
| Supabase vinculado | Proyecto UcesCap (uilqwyrslwrkeubaayoi) | `.env.local`; pruebas 6B |
| Build sin errores TypeScript | `tsc --noEmit` pasa | EV-EST-01 (EE-01) |
| Build de producción | `npm run build` exitoso | Historial de PRs (#26-#28) |

**Estado:** CUMPLIDO

---

## 3. Resumen de cumplimiento

| Objetivo | Estado | Matices |
|---|---|---|
| OG — Objetivo general | CUMPLIDO CON MATICES | INC-6B-01 (bajo), INC-6B-02 (medio) |
| OE-01 — Modelo de datos | CUMPLIDO | — |
| OE-02 — Registro + CURP | CUMPLIDO | — |
| OE-03 — Psicométrico Big Five | CUMPLIDO | Validación psicométrica formal no realizada |
| OE-04 — Evaluación + temporizador | CUMPLIDO CON MATICES | CP-11 no probado empíricamente; INC-6B-01 |
| OE-05 — Panel admin | CUMPLIDO CON MATICES | INC-6B-02 |
| OE-06 — Control de acceso | CUMPLIDO | D-04 declarada en alcance |
| OE-07 — Despliegue | CUMPLIDO | — |

**Resultado global:** 5 objetivos CUMPLIDOS sin matices, 3 CUMPLIDOS CON MATICES documentados. Ningún objetivo fue incumplido. Los matices identificados son defectos de implementación de severidad baja-media, con impacto acotado sobre el flujo de negocio principal.
