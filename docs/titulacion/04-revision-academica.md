# Revisión académica — Capítulo IV

**Documento revisado:** `docs/titulacion/capitulos/04-metodologia-desarrollo.md`
**Fecha de revisión:** 2026-10-22
**Revisor:** Auditoría interna pre-entrega

---

## 1. Verificación de sustento en archivos, commits o documentación

| Afirmación en el capítulo | Fuente de evidencia | Estado |
|---|---|---|
| Prototipado evolutivo seleccionado en el Trabajo A | `02-coherencia-entre-reportes.md`, sección 4 | VERIFICADO |
| Esquema de 13 tablas definido en iteración 1 | `supabase/schema.sql`, commit `c83fb06` (106 líneas nuevas) | VERIFICADO |
| Iteración 2 implementó evaluación completa del candidato | Commit `24adf91` (+1170 líneas, 12 archivos) | VERIFICADO |
| user_roles creado en iteración 3 | Commit `4d9f058`, archivo `supabase/roles.sql` | VERIFICADO |
| 13 archivos de API admin creados en iteración 4 | Commit `ff2657f` (+786 líneas, 13 archivos nuevos) | VERIFICADO |
| T-01: múltiples commits de async params fix en 2026-02-18 | Commits `c77284d`, `518e343`, `9563ccc`, `0905c1c` (todos 2026-02-18) | VERIFICADO |
| T-02: SECURITY DEFINER en get_my_role() | `supabase/rls.sql` línea 5, `supabase/roles.sql` línea 27 | VERIFICADO |
| T-03: tipo unión en relaciones Supabase | Commit `4075114`, archivo `submit/route.ts` (AttemptWithApplication type + normalización) | VERIFICADO |
| T-04: migración psychometric_summary | Archivo `supabase/migration_attempts_psychometric_summary.sql` (1 línea), commit `d7c0824` | VERIFICADO |
| T-05: creación de lib/reviewDecision.ts | Commit `0b84137`, 4 archivos modificados incluyendo nuevo `lib/reviewDecision.ts` | VERIFICADO |
| Módulo psicométrico en 4 commits secuenciales de 2026-03-04 | Commits `07fca11`, `c9188af`, `d7c0824`, `5870d26` (todos 2026-03-04) | VERIFICADO |
| Instrumento ajustado a 20 ítems definitivos en May 2026 | Commit `dd26d9a` ("Ajusta psicométrico base a TEST MINI BIG FIVE de 20 preguntas") | VERIFICADO |
| Pausa entre iteraciones 6 y 7 | Commit `92a6b41` (2026-02-18) → `07fca11` (2026-03-04): 14 días | VERIFICADO |
| Pausa entre iteraciones 7 y 8 | Commit `fd411d1` (2026-03-04) → `dd26d9a` (2026-05-08): 65 días | VERIFICADO |
| Total de 56 commits | Conteo del `git log --all` | VERIFICADO |
| Commit "si" con mensaje no descriptivo | Commit `b42b10b` (2026-05-15): ajuste de lockfiles | VERIFICADO |

**Sin afirmaciones sin sustento detectadas.** Todas las afirmaciones técnicas se apoyan en archivos del repositorio o en el historial de commits.

---

## 2. Verificación de interpretación correcta de fechas

| Fecha en el capítulo | Dato Git | ¿Correcto? |
|---|---|---|
| Inicio del proyecto: 2025-12-30 | Commit `2183d58` del 2025-12-30 | SÍ |
| Iteración 2 en 2025-12-31 | Commits `c3ddc61`, `24adf91` del 2025-12-31 | SÍ |
| Roles reales: 2026-02-17 | Commit `4d9f058` del 2026-02-17 | SÍ |
| Panel admin e iteraciones 4-6 en 2026-02-18 | Todos los commits de esas iteraciones son del 2026-02-18 | SÍ |
| Módulo psicométrico: 2026-03-04 | Commits `07fca11`-`fd411d1` todos del 2026-03-04 | SÍ |
| Iteración 8 inicio: 2026-05-08 | Commit `dd26d9a` del 2026-05-08 | SÍ |
| Commit final: 2026-05-20 | Commit `5ca40d2` del 2026-05-20 | SÍ |

**No se detectan errores de interpretación de fechas.**

---

## 3. Coherencia con el modelo de prototipado evolutivo del Trabajo A

El capítulo declara correctamente que el prototipado evolutivo fue identificado en el Trabajo A como la metodología del proyecto. La tabla 4.8 vincula las fases del modelo con las actividades del Trabajo B sin exagerar la correspondencia.

**Lo que el capítulo hace bien:**
- No atribuye al proyecto una aplicación formal de Scrum.
- No inventa ceremonias, artefactos ni roles de Scrum.
- Reconoce que la descripción combina evidencia directa del Git y reconstrucción del desarrollador.
- Identifica el módulo psicométrico como el caso más claro de requisitos emergentes.

**Punto de atención:** La sección 4.8 referencia "Arciniega Robles, 2026, sección 3.1" para la descripción del ciclo de prototipado evolutivo. Esta referencia al Trabajo A es correcta en su forma. Antes de la entrega, confirmar que el Trabajo A efectivamente desarrolla la metodología en su sección 3.1 (la numeración puede variar en la versión final del reporte del compañero).

---

## 4. Decisiones que requieren confirmación del desarrollador

| Decisión | Sección | Tipo de confirmación requerida |
|---|---|---|
| La elección del prototipado evolutivo fue una decisión consciente tomada en conjunto con el análisis del Trabajo A | 4.1 | Confirmar con el desarrollador que la metodología fue seleccionada explícitamente, no adoptada de facto |
| La definición del esquema completo desde la iteración 1 fue una decisión deliberada de diseño | 4.1 | Confirmar que se tomó como decisión, no que simplemente ocurrió así |
| Las iteraciones 4, 5 y 6 ocurrieron en una o varias sesiones dentro del mismo día (2026-02-18) | 4.4 (múltiples) | Confirmar si fue una sola jornada extensa o varias sesiones; esto puede mencionarse en el reporte si se quiere ser más preciso |
| La pausa de 65 días entre iteraciones 7 y 8 se debió a otras obligaciones académicas | 4.2 | Confirmar la razón para poder mencionarla con precisión en el reporte final |
| El instrumento psicométrico fue recibido del área de RH antes de la iteración 7 | 4.4 (Iteración 7) | Confirmar la secuencia exacta: ¿se recibió el cuestionario antes o durante la iteración 7? |

---

## 5. Verificación de no contradicción con capítulos anteriores

| Elemento | Cap. I / II | Cap. IV | ¿Coherente? |
|---|---|---|---|
| Nombre del sistema | "UCES Plataforma de Talento" | "UCES Plataforma de Talento" | SÍ |
| Definición de UCES | "Universidad Capital de Estudios Superiores (UCES)" | No se define (no es necesario repetirlo) | SÍ |
| Metodología: prototipado evolutivo | No declarada explícitamente en Cap. I (pendiente de Cap. IV) | Declarada en sección 4.1 | COHERENTE — Cap. IV cumple su rol |
| MVP como alcance | Sección 1.6 establece el MVP | Sección 4.4 itera sobre el MVP sin agregar funciones fuera del alcance | SÍ |
| Limitación de rol reviewer | Sección 1.6 lo menciona como fuera del MVP | No se menciona en Cap. IV (correcto: es una limitación, no una decisión metodológica) | SÍ |
| Stack tecnológico | Sección 1.2 declara Next.js, Supabase, TypeScript | Sección 4.3 confirma y amplía con versiones exactas | SÍ |
| UCES plataforma Big Five 20 ítems | No detallado en Cap. I-II | Confirmado en iteración 7 con commit específico | SÍ |

---

## 6. Extensión estimada

| Sección | Palabras estimadas | Páginas est. (250 pal./pág.) |
|---|---|---|
| 4.1 Selección de metodología | ~420 | ~1.7 |
| 4.2 Organización general | ~320 | ~1.3 |
| 4.3 Entorno de desarrollo | ~260 | ~1.0 |
| 4.4 Construcción incremental (8 iteraciones) | ~1,020 | ~4.1 |
| 4.5 Integración y revisión | ~280 | ~1.1 |
| 4.6 Problemas técnicos (5 problemas) | ~800 | ~3.2 |
| 4.7 Control de versiones | ~220 | ~0.9 |
| 4.8 Relación con prototipado evolutivo | ~160 + tabla | ~0.8 |
| 4.9 Evaluación de la metodología | ~400 | ~1.6 |
| 4.10 Conclusiones | ~200 | ~0.8 |
| **Total** | **~4,080** | **~16.5 páginas** |

El capítulo supera ligeramente el límite superior del rango objetivo (12-16 páginas) por aproximadamente media página. Esto es aceptable. Si se requiere condensación, la sección 4.9 admite reducirse sin pérdida de argumento, y las iteraciones 3 y 5 pueden acortarse.

---

## 7. Verificación de restricciones del encargo

| Restricción | ¿Se cumple? | Notas |
|---|---|---|
| No atribuir Scrum sin evidencia | SÍ | No se menciona Scrum en el capítulo |
| No inventar duraciones de iteraciones | SÍ | Se describen por rango de fechas, nunca con duración en días declarada |
| No inventar errores, mensajes de consola o fechas | SÍ | Los errores documentados se derivan del código y del historial |
| Distinguir lo documentado de lo reconstruido | SÍ | Sección 4.2 aclara explícitamente la naturaleza de la reconstrucción |
| No repetir análisis del Trabajo A | SÍ | Solo se referencia el Trabajo A para la metodología, sin reproducir contenido |
| No inventar participantes ni reuniones | SÍ | No se menciona número de participantes ni reuniones formales |
| Párrafos fluidos y técnicamente sustanciales | SÍ | Las secciones de iteración y problemas técnicos son descriptivas y concretas |

---

## 8. Asuntos pendientes antes de la entrega

1. **Confirmar número de sección del Trabajo A** que desarrolla el prototipado evolutivo (citado como "sección 3.1" en la tabla 4.8).
2. **Verificar las cinco decisiones** listadas en la sección 4 de esta revisión con el desarrollador.
3. El diagrama del ciclo de prototipado evolutivo mencionado en el encargo se representa mediante la tabla 4.8 (vinculación de fases). Si el asesor o el formato universitario requiere un diagrama visual (figura numerada), debe generarse para la versión maquetada en Word.
4. La sección 4.7 afirma que no hay evidencias de CI/CD en el repositorio. Confirmar que esto sigue siendo cierto al momento de la entrega (verificar si se agregó algún archivo de GitHub Actions después de la fecha de auditoría).
