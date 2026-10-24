# Línea de tiempo — Historial Git del proyecto

**Proyecto:** UCES Plataforma de Talento
**Repositorio:** github.com/MoyRb/uces-plataforma
**Rama principal:** main
**Rango:** 2025-12-30 → 2026-05-20
**Fuente:** `git log --date=short --pretty=format:"%h | %ad | %s" --all`

---

## Resumen por iteración

| Iteración | Período | Commits sustantivos | Funcionalidades incorporadas |
|---|---|---|---|
| 1 — Andamiaje | 2025-12-30 | 4 | Proyecto Next.js, schema DB, RLS inicial, libs base |
| 2 — Flujo candidato | 2025-12-31 | 3 | Login, registro, panel, evaluación, evidencia, submit, resultado |
| 3 — Roles reales | 2026-02-17 | 2 | user_roles, get_my_role(), acceso admin basado en BD |
| 4 — Panel admin | 2026-02-18 | 2 | 13 endpoints API admin, requireAdmin(), CRUD completo |
| 5 — Estabilización | 2026-02-18 | 9 | Async params, /perfil, formatBytes, markup, questions |
| 6 — Revisión admin | 2026-02-18 | 4 | Detalle de intento, decisiones, notificaciones perfil |
| 7 — Psicométrico | 2026-03-04 | 4 | Seed Big Five, módulo /psicometrico, scoring, resumen admin |
| 8 — Ajuste final | 2026-05-08 – 2026-05-20 | 7 | Instrumento definitivo, diseño UI, types TS, RPC visibility |

**Total de commits (incluyendo merges):** 56

---

## Tabla completa de commits

| Hash | Fecha | Mensaje | Iteración | Tipo |
|---|---|---|---|---|
| `2183d58` | 2025-12-30 | Initial commit | 1 | init |
| `355a0cf` | 2025-12-30 | init: nextjs app | 1 | init |
| `f562cea` | 2025-12-30 | init | 1 | init |
| `c83fb06` | 2025-12-30 | Add supabase scaffolding and landing placeholder | 1 | feat |
| `047286f` | 2025-12-30 | 1 MoyRb/implement-uces-web-platform-mvp | 1 | merge |
| `e349092` | 2025-12-31 | chore: local fixes (turbopack root/lockfiles) | 2 | chore |
| `c3ddc61` | 2025-12-31 | docs: update env setup (+ login/register/panel/admin/auth API) | 2 | feat |
| `979e327` | 2025-12-31 | 2 from MoyRb/fix-404-for-login-and-register-routes | 2 | merge |
| `24adf91` | 2025-12-31 | feat: evidence upload + submit + result page | 2 | feat |
| `88090db` | 2025-12-31 | 3 from MoyRb/implementar-flujo-principal-de-mockups | 2 | merge |
| `4d9f058` | 2026-02-17 | Implementa roles reales con user_roles y acceso admin | 3 | feat |
| `ac9c552` | 2026-02-17 | Merge pull request #4 | 3 | merge |
| `ff2657f` | 2026-02-18 | feat(admin): add secured admin dashboard and CRUD APIs | 4 | feat |
| `6c30675` | 2026-02-18 | Merge pull request #5 | 4 | merge |
| `4f9ca47` | 2026-02-18 | Fix MVP RLS roles/storage and unify role resolution | 5 | fix |
| `31affea` | 2026-02-18 | Merge pull request #6 | 5 | merge |
| `c77284d` | 2026-02-18 | Fix async params usage in module vacancies page | 5 | fix |
| `7f22ac2` | 2026-02-18 | Merge pull request #7 | 5 | merge |
| `518e343` | 2026-02-18 | Fix module page dynamic params and CardDescription markup | 5 | fix |
| `b132b58` | 2026-02-18 | Merge pull request #8 | 5 | merge |
| `0088735` | 2026-02-18 | fix: await dynamic params in vacancy detail page | 5 | fix |
| `7f22ac2` | 2026-02-18 | Merge pull request #9 | 5 | merge |
| `9563ccc` | 2026-02-18 | Fix async params access in dynamic app pages | 5 | fix |
| `fc149ea` | 2026-02-18 | Merge pull request #10 | 5 | merge |
| `065f8d1` | 2026-02-18 | Fix nested paragraph markup in module vacancy cards | 5 | fix |
| `2658c62` | 2026-02-18 | Merge pull request #11 | 5 | merge |
| `0905c1c` | 2026-02-18 | Fix async dynamic params usage in API route handlers | 5 | fix |
| `928b180` | 2026-02-18 | Merge pull request #12 | 5 | merge |
| `9350275` | 2026-02-18 | Implement admin vacancies + assessments flow with FK-safe deletes | 6 | feat |
| `0d56dd6` | 2026-02-18 | Merge pull request #13 | 6 | merge |
| `694d53c` | 2026-02-18 | Fix profile button navigation and add /perfil page | 6 | fix |
| `c440b17` | 2026-02-18 | Merge pull request #14 | 6 | merge |
| `a25f08d` | 2026-02-18 | Fix resultado formatBytes import via shared lib util | 6 | fix |
| `3b85a7b` | 2026-02-18 | Merge pull request #15 | 6 | merge |
| `9fd7193` | 2026-02-18 | Fix admin question options normalization and persistence | 6 | fix |
| `09200dc` | 2026-02-18 | Merge pull request #16 | 6 | merge |
| `022692f` | 2026-02-18 | Add admin attempt review detail flow | 6 | feat |
| `d64a986` | 2026-02-18 | Merge pull request #17 | 6 | merge |
| `58fa9d3` | 2026-02-18 | Implement admin final decision flow and profile decision notifications | 6 | feat |
| `a2adc80` | 2026-02-18 | Merge pull request #18 | 6 | merge |
| `bfe4088` | 2026-02-18 | Handle attempts decision column fallback in admin patch | 6 | fix |
| `92a6b41` | 2026-02-18 | Merge pull request #19 | 6 | merge |
| `07fca11` | 2026-03-04 | Add idempotent psychometric base seed with Cultura Capital and Mini Big Five | 7 | feat |
| `b31f48d` | 2026-03-04 | Merge pull request #20 | 7 | merge |
| `c9188af` | 2026-03-04 | Requerir psicométrico base antes de postular a vacantes | 7 | feat |
| `4b2c4b0` | 2026-03-04 | Merge pull request #21 | 7 | merge |
| `d7c0824` | 2026-03-04 | Implementa scoring y resumen del psicométrico | 7 | feat |
| `95bf542` | 2026-03-04 | Merge pull request #22 | 7 | merge |
| `5870d26` | 2026-03-04 | Oculta puntajes al usuario y muestra resumen psicométrico en admin | 7 | feat |
| `fd411d1` | 2026-03-04 | Merge pull request #23 | 7 | merge |
| `dd26d9a` | 2026-05-08 | Ajusta psicométrico base a TEST MINI BIG FIVE de 20 preguntas | 8 | fix |
| `1cd81f3` | 2026-05-08 | ajuste en el minibig-five y en las rutas | 8 | fix |
| `d00ba8b` | 2026-05-08 | Add idempotent admin roles migration with profile fallback | 8 | fix |
| `41a9b4d` | 2026-05-08 | añadir el public profiles de los roles de la bd | 8 | fix |
| `b42b10b` | 2026-05-15 | si (ajuste de lockfiles) | 8 | chore |
| `0b84137` | 2026-05-15 | Fix review decision typing for admin build | 8 | fix |
| `4075114` | 2026-05-15 | Fix Supabase relation typing and unblock production build | 8 | fix |
| `b12610b` | 2026-05-15 | Merge branch 'main' | 8 | merge |
| `ca422c8` | 2026-05-20 | Fix role RPC visibility and fallback behavior | 8 | fix |
| `5ca40d2` | 2026-05-20 | Merge pull request #28 | 8 | merge |

---

## Distribución de commits por tipo

| Tipo | Cantidad | Descripción |
|---|---|---|
| feat | 12 | Nuevas funcionalidades |
| fix | 17 | Correcciones técnicas |
| chore / init | 6 | Configuración y mantenimiento |
| merge | 21 | Integraciones de ramas (no producen cambios adicionales) |
| **Total** | **56** | |

---

## Observaciones sobre el historial

1. **Alta densidad de commits en 2026-02-18:** La iteración 4 (panel admin) y la iteración 5 (estabilización) ocurrieron el mismo día calendario. Esto puede reflejar una sesión de trabajo extensa o que los commits de corrección se realizaron inmediatamente después de detectar los problemas durante la construcción del panel admin.

2. **Pausa entre iteraciones:** Existe una pausa de aproximadamente dos semanas entre la iteración 6 (2026-02-18) y la iteración 7 (2026-03-04), y otra de aproximadamente dos meses entre la iteración 7 (2026-03-04) y la iteración 8 (2026-05-08). Estas pausas son consistentes con el contexto de residencias profesionales donde el desarrollador puede tener otras obligaciones académicas.

3. **Commit `b42b10b` — "si":** El mensaje de este commit no describe el cambio realizado (ajuste de lockfiles). Es el único commit del historial con un mensaje no descriptivo. Los lockfiles modificados son `package-lock.json` a nivel raíz y en `my-app/`.

4. **No se observan commits de rollback o `git revert`:** El historial no contiene commits de reversión. Los problemas encontrados se resolvieron con commits de avance (fix), no revirtiendo commits previos.
