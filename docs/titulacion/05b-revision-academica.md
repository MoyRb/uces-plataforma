# Revisión académica — Capítulo V (Corte 5B)

**Documento revisado:** `docs/titulacion/capitulos/05-desarrollo-implementacion.md` (secciones 5.9 a 5.13)
**Fecha de revisión:** 2026-10-22
**Revisor:** Auditoría interna pre-entrega

---

## 1. Contraste de fragmentos de código con archivos fuente

| Fragmento en el capítulo | Archivo fuente | Líneas verificadas | ¿Correcto? |
|---|---|---|---|
| `getRoleForSession(supabase)` en validación de acceso admin | `app/admin/page.tsx:202` | Exacto | SÍ |
| `callAdmin` helper con Bearer token en `admin/page.tsx` | `app/admin/page.tsx:137-151` | Exacto — incluye `authorization: Bearer ${token}` | SÍ |
| Tabs: `resumen, modulos, vacantes, evaluaciones, intentos` | `app/admin/page.tsx:51` | Array literal verificado | SÍ |
| `Promise.all([loadModules(), loadVacancies(), loadAssessments(), loadAttempts()])` | `app/admin/page.tsx:191-193` | Exacto en `refreshAll()` | SÍ |
| POST de vacante crea assessment automáticamente | `app/api/admin/vacancies/route.ts:80-103` | Exacto — rollback si falla assessment | SÍ |
| `parseOptionsInput` split por `[\n,]` | `app/admin/page.tsx:91` | Exacto | SÍ |
| `flowchart requireAdmin()` con 4 pasos | `app/api/admin/utils.ts:15-58` | Flujo verificado paso a paso | SÍ |
| Creación de `supabaseAsUser` con anonKey + Bearer header | `app/api/admin/utils.ts:39-49` | Exacto — clave anónima + token del usuario | SÍ |
| `get_my_role()` con SECURITY DEFINER + consulta user_roles → profiles | `supabase/rls.sql:2-34` | Exacto — lógica de fallback verificada | SÍ |
| `resolveRole()` solo acepta admin o user | `lib/auth.ts` | Verificado en sesiones anteriores | SÍ |
| `Array.isArray(attempt.application) ? attempt.application[0] : attempt.application` | `app/api/attempts/[attemptId]/submit/route.ts:49` | Exacto | SÍ |
| `isMissingColumnError()` en submit/route.ts | `app/api/attempts/[attemptId]/submit/route.ts:17-21` | Exacto | SÍ |
| Fallback a `reviews.rubric` cuando columna ausente | `submit/route.ts:100-108` | Exacto | SÍ |
| Prefijo `MINI_BIG_FIVE \| RASGO \| texto` | `lib/psicometricoResults.ts:76-84` | Exacto — `segments[0] === "MINI_BIG_FIVE" && segments.length >= 3` | SÍ |
| `classifyTrait`: ≥16 → high, ≥11 → mid, <11 → low | `lib/psicometricoResults.ts:28-32` | Exacto | SÍ |
| Extroversión con `withFilter = false` y nota descriptiva | `lib/psicometricoResults.ts:109-119` | Exacto — `"No es filtro de contratación, solo indicador de integración."` | SÍ |
| `theory_score = Math.round(likertAnswered / likertQuestions * 100)` | `submit/route.ts:71` | Exacto — usa `Math.max(likertQuestions, 1)` en denominador | SÍ |
| `submitMeta.timedOutBeforeSubmit` en summary | `submit/route.ts:73-78` | Exacto | SÍ |
| Estructura `PsicometricoSummary` con miniBigFive + totals | `lib/psicometricoResults.ts:1-13` | Exacto | SÍ |
| `ReviewDecision = "APPROVED" \| "REJECTED"` | `lib/reviewDecision.ts:1` | Exacto | SÍ |
| `isReviewDecision()` en normalizedDecision | `app/api/admin/utils.ts:88-95` | Exacto | SÍ |
| `persistDecisionAndNotes` usa reviews como primario | `app/api/admin/attempts/[id]/route.ts:201-226` | Flujo verificado | SÍ |
| `createSignedUrl(path, 60 * 60)` para evidencias en detail | `app/api/admin/attempts/[id]/detail/route.ts:65` | Verificado en sesión anterior | SÍ |
| Stats endpoint: solo `applicationsCount` y `attemptsCount` | `app/api/admin/vacancies/[id]/stats/route.ts:23-28` | Exacto | SÍ |
| CHECK `role in ('user','admin','reviewer')` en profiles | `supabase/schema.sql` | Verificado en sesiones anteriores | SÍ |

**Resultado:** Todos los fragmentos de código citados en las secciones 5.9 a 5.13 son exactos y corresponden al código real. Ninguno fue inventado.

---

## 2. Verificación de correcta atribución de discrepancias

| Discrepancia | Afirmación en el capítulo | Verificación en código | Estado |
|---|---|---|---|
| D-01 | Guard verifica `completed`, no score | `apply/route.ts:27-41`: solo `!psicometricoState.completed` | CORRECTO |
| D-02 | `reviews` es almacén primario, `attempts.decision` es fallback | `attempts/[id]/route.ts`: `upsertReview()` primero; fallback solo ante 42P01 | CORRECTO |
| D-03 | Stats endpoint devuelve solo 2 métricas | `stats/route.ts`: literalmente `{ applicationsCount, attemptsCount }` | CORRECTO |
| D-04 | Rol reviewer en schema pero no en user_roles ni RLS | `schema.sql` CHECK: sí. `user_roles`: no. `resolveRole()`: solo admin/user | CORRECTO |
| D-05 | Lista de exclusión no implementada | Sin tabla blacklist en schema. Sin verificación en apply/register | CORRECTO |

---

## 3. Verificación de incidencias técnicas T-01 a T-05

| ID | Afirmación de evidencia | Verificación |
|---|---|---|
| T-01 | Commits `c77284d`, `518e343`, `9563ccc`, `0905c1c`, `4075114` resuelven async params | Verificado en 04-linea-tiempo-git.md y 04-revision-academica.md |
| T-02 | SECURITY DEFINER en `get_my_role()` resuelve circularidad | `rls.sql:5`: `security definer` presente. `rls.sql:36-37`: `revoke all` + `grant execute` |
| T-03 | `Array.isArray()` en submit resuelve tipo unión | `submit/route.ts:49`: verificado |
| T-04 | `isMissingColumnError()` + fallback a reviews | `submit/route.ts:17-21, 94-110`: verificado |
| T-05 | `ReviewDecision` type union en `lib/reviewDecision.ts` | `lib/reviewDecision.ts:1-5`: verificado |

---

## 4. Verificación de diagramas

| Figura | Descripción | ¿Corresponde al código? |
|---|---|---|
| Figura 5.5 — Persistencia de decisiones | Flujo PATCH → UPDATE attempts → upsert reviews | SÍ — `persistDecisionAndNotes` en `attempts/[id]/route.ts:201-226` |
| Figura 5.6 — Flujo requireAdmin() | 4 pasos: Bearer check → auth.getUser → supabaseAsUser → get_my_role | SÍ — `utils.ts:15-58` |
| Figura 5.7 (psicométrico) — Inicio del cuestionario | Flujo ensurePsicometricoAttempt con ramas completed / pendiente / crear | SÍ — `lib/psicometrico.ts:53-123` |

---

## 5. Coherencia con secciones 5.1 a 5.8

| Punto de coherencia | Estado |
|---|---|
| Nota de estructura al inicio del capítulo que anuncia 5A y 5B | Presente — no modificada |
| El patrón `requireAdmin()` en 5.10 es consistente con su mención en 5.1.3 | COHERENTE |
| La descripción de `supabaseServer()` en 5.10.6 es consistente con 5.2.1 | COHERENTE |
| D-01 mencionada en 5.6.1 y documentada en detalle en 5.12.1 | COHERENTE — no se contradice |
| El mecanismo de signed URLs en 5.10.9 es consistente con 5.8.5 | COHERENTE |
| El psicométrico mencionado como prerequisito en 5.6 tiene su módulo completo en 5.11 | COHERENTE |

---

## 6. Inconsistencias detectadas en el Corte 5B

### 6.1 theory_score en evaluaciones de conocimientos (pendiente de 5A)

La sección 5.7.5 del Corte 5A afirma que para evaluaciones de conocimientos el `theory_score` almacena "la puntuación de respuestas correctas". El código de `submit/route.ts` ejecuta `calculatePsicometricoSummary()` sobre todas las preguntas del intento. Para evaluaciones que no contienen preguntas con prefijo `MINI_BIG_FIVE|`, el resultado de `likertAnswered` sería 0 (ninguna pregunta se acumuló), produciendo `theory_score = 0`.

**Pendiente:** Verificar si existe lógica adicional en `submit/route.ts` para evaluaciones de conocimientos o si la afirmación en 5.7.5 es imprecisa. La corrección de esta afirmación debe hacerse antes de la entrega del capítulo.

**Observación:** Revisado `submit/route.ts` completo — no existe lógica diferenciada para evaluaciones de conocimientos. `calculatePsicometricoSummary()` siempre filtra por prefijo `MINI_BIG_FIVE`. Para evaluaciones sin ese prefijo, `theory_score` será 0 o un valor basado en preguntas respondidas que no tengan ese prefijo exacto. La afirmación en 5.7.5 debe ajustarse para reflejar este comportamiento real.

### 6.2 Nota sobre numbering de reglas de negocio (D-05)

La sección 5.12.5 documenta D-05 (lista de exclusión) sin asignar un número de regla de negocio específico del Trabajo A, dado que el PDF no fue accesible para verificación directa. Antes de la entrega, confirmar el número RN correcto con el documento del Trabajo A.

---

## 7. Extensión estimada del Corte 5B

| Sección | Palabras est. | Páginas est. (250 pal./pág.) |
|---|---|---|
| 5.9 Panel administrativo | ~950 | ~3.8 |
| 5.10 Seguridad | ~1,020 | ~4.1 |
| 5.11 Módulo psicométrico | ~980 | ~3.9 |
| 5.12 Diferencias y evolución | ~820 | ~3.3 |
| 5.13 Conclusiones | ~380 | ~1.5 |
| **Total 5B** | **~4,150** | **~16.6 páginas** |

**Total Capítulo V estimado (5A + 5B):** ~8,690 palabras → ~34.8 páginas de texto + diagramas y tablas (4-6 páginas adicionales) → **~39 a 41 páginas maquetadas.**

---

## 8. Asuntos pendientes antes de la entrega

| Asunto | Sección | Acción requerida |
|---|---|---|
| Ajustar afirmación sobre `theory_score` en evaluaciones de conocimientos | 5.7.5 | Cambiar "almacena la puntuación de respuestas correctas" por descripción exacta del comportamiento |
| Verificar numeración de reglas de negocio RN para D-01 y D-05 | 5.12.1, 5.12.5 | Contrastar con PDF del Trabajo A |
| Capturas de pantalla para secciones 5.9 a 5.13 | Todas | Ver `docs/titulacion/evidencias/05b-capturas-pendientes.md` |
| RF-06 (módulo psicométrico completo) | 5.11 | Documentado — verificar que el número RF coincide con el catálogo del Trabajo A |
