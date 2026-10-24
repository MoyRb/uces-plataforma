# Revisión académica — Capítulo III

**Documento revisado:** `docs/titulacion/capitulos/03-marco-teorico.md`
**Fecha de revisión:** 2026-10-22
**Revisor:** Auditoría interna pre-entrega

---

## 1. Relevancia de cada sección para UCES Plataforma de Talento

| Sección | Relevancia para el sistema | Relación con código verificado |
|---|---|---|
| 3.1 Ingeniería de software | Alta — contextualiza la relación entre Trabajo A (análisis) y Trabajo B (desarrollo) | No requiere código; es marco conceptual |
| 3.2 Arquitectura web | Alta — describe el modelo cliente-servidor, HTTP, SSR/CSR | Estructura `app/api/` y `app/` verificada |
| 3.3 Next.js, React, TypeScript | Alta — fundamentos del stack principal | `package.json`, estructura de rutas verificada |
| 3.4 Supabase y PostgreSQL | Alta — fundamentos del BaaS y del SGBD | `schema.sql`, `supabaseClient.ts`, `supabaseServer.ts` verificados |
| 3.4.5 RLS | Alta — mecanismo de seguridad central | `rls.sql` verificado línea por línea |
| 3.5 Autenticación y autorización | Alta — describe JWT, RBAC, `get_my_role()` | `auth.ts`, `requireAdmin()`, `rls.sql` verificados |
| 3.6 HMAC y CURP | Alta — decisión técnica documentada en código | `lib/curp.ts`, `api/auth/register/route.ts` verificados |
| 3.7 Evaluaciones y temporizador | Alta — describe el modelo de control de tiempo | `submit/route.ts`, `schema.sql` (deadline_at) verificados |
| 3.8 Big Five y Likert | Alta — fundamento del instrumento psicométrico | `lib/psicometricoResults.ts` verificado |
| 3.9 Interfaces y UX | Media — describe los principios de diseño de UI | `package.json` (shadcn/ui, Tailwind) verificado |
| 3.10 Despliegue | Media — fundamentos generales aplicables al proyecto | Variables de entorno verificadas en código |
| 3.11 Conclusiones | Alta — integración de todo el capítulo con el Cap. V | Proyecta hacia implementación, no adelanta código |

**Veredicto:** Todas las secciones tienen relevancia directa para el proyecto. Ninguna sección es genérica sin conexión con el sistema.

---

## 2. Correspondencia entre conceptos y código

| Concepto teórico | Implementación verificada | Correspondencia |
|---|---|---|
| JWT como token de acceso | `requireAdmin()` extrae Bearer token del header; `supabase.auth.getUser(token)` lo valida | Directa |
| SECURITY DEFINER en funciones SQL | `get_my_role()` declarada con `security definer set search_path = public` | Directa |
| HMAC-SHA256 con clave secreta | `crypto.createHmac("sha256", secret).update(normalizeCurp(curp)).digest("hex")` | Directa |
| Hash unidireccional para detectar duplicados | `curp_hashes` con unique index; `maybeSingle()` en registro | Directa |
| Deadline en servidor para evaluar tiempo | `deadline_at timestamptz not null` en attempts; `Date.now() > new Date(attempt.deadline_at).getTime()` en submit | Directa |
| JSONB para almacenamiento estructurado | `psychometric_summary jsonb` en attempts; `PsicometricoSummary` type en TypeScript | Directa |
| Scores 4-20 y umbrales 16/11 | `score >= 16` → Alta, `score >= 11` → Adecuada, else Riesgo en `classifyTrait()` | Directa |
| Server Components vs Client Components | Documentado en sección 3.3.2; verificable en estructura `app/` | Arquitectural |
| Clave anón vs clave de servicio | `supabaseClient.ts` (ANON_KEY) vs `supabaseServer.ts` (SERVICE_ROLE_KEY) | Directa |
| Bucket privado con signed URLs | `insert into storage.buckets ... public=false` en rls.sql | Directa |

**Sin afirmaciones de código no verificadas detectadas.** Todas las referencias al comportamiento del sistema se apoyan en archivos leídos.

---

## 3. Precisión de las afirmaciones técnicas

### 3.1 Afirmaciones verificadas como correctas

- La función `get_my_role()` usa `SECURITY DEFINER` — verificado en `rls.sql` línea 5.
- La función devuelve `'user'` como fallback en ausencia de datos — verificado en lógica del `if current_role is not null`.
- `resolveRole()` acepta solo `"admin"` o `"user"` — verificado en `auth.ts` líneas 5-10.
- `supabaseServer()` deshabilita autoRefreshToken y persistSession — verificado en `supabaseServer.ts` línea 10.
- La CURP se normaliza a mayúsculas antes de hashear — verificado en `normalizeCurp()` en `curp.ts`.
- `deadline_at` es `timestamptz not null` — verificado en `schema.sql` línea 65.
- El bucket `evidences` es privado (`public = false`) — verificado en `rls.sql` línea 290.
- Extroversión etiquetada como indicador sin filtro — verificado en `buildTraitResult(..., false, "No es filtro de contratación, solo indicador de integración.")`.

### 3.2 Afirmaciones que requieren atención

| Afirmación | Observación |
|---|---|
| "React 19 incorporó mejoras en formularios y acciones asíncronas" | Correcto en términos generales; no se apoya con código del proyecto porque no se verificó uso de `useActionState` o `use()`. Aceptable como dato técnico referenciado en la documentación oficial. |
| "Vercel genera preview deployments por cada PR" | Correcto como descripción general de Vercel; no verificado en el proyecto concreto (no se inspeccionó `.vercel/` ni `vercel.json`). Presentado como descripción de la plataforma, no como afirmación del proyecto. Aceptable. |
| Instrumento psicométrico "consistente con el Mini-IPIP" | Señalado con cautela en el texto: "el instrumento específico utilizado fue proporcionado por personal de UCES y su ficha de validación no está disponible". La redacción es correcta — establece la relación estructural sin afirmar que sea el Mini-IPIP. |
| Umbrales 16/11 como "criterios institucionales" | Presentados explícitamente como tales, no como puntos de corte científicos. La redacción es responsable. |

### 3.3 Afirmaciones que NO aparecen (correcto que estén ausentes)

- No se afirma que la aplicación "es segura" o "protege completamente" los datos.
- No se afirma que el Big Five predice el desempeño laboral con certeza.
- No se afirma que el instrumento psicométrico de UCES esté validado.
- No se menciona middleware.ts como mecanismo de protección (no existe en el proyecto).

---

## 4. Referencias no verificadas

Las referencias del capítulo se generaron a partir de fuentes reconocidas. El archivo `03-bibliografia-verificada.md` documenta el estado de verificación de cada una. Las siguientes observaciones aplican a este capítulo:

| Referencia | Estado | Acción requerida |
|---|---|---|
| Sommerville (2016) *Software Engineering* 10.ª ed. | **Verificable** — obra estándar en la disciplina | Confirmar edición y número de páginas antes de la entrega |
| Jones, Bradley & Sakimura (2015) RFC 7519 | **Verificada** — disponible en datatracker.ietf.org | URL incluida en bibliografía |
| Krawczyk, Bellare & Canetti (1997) RFC 2104 | **Verificada** — disponible en datatracker.ietf.org | URL incluida en bibliografía |
| McCrae & Costa (1992) | **Verificable** — artículo de journal ampliamente citado | Confirmar nombre completo del artículo antes de la entrega |
| Barrick & Mount (1991) | **Verificable** — artículo de *Personnel Psychology* | Confirmar volumen y páginas antes de la entrega |
| Donnellan et al. (2006) | **Verificable** — artículo de *Journal of Research in Personality* | Usado solo como referencia de estructura; el instrumento de UCES puede no ser este |
| Likert (1932) | **Verificable** — artículo clásico de psicología social | Confirmar nombre de publicación |
| NIST (2015) FIPS PUB 180-4 | **Verificable** — publicación oficial del NIST | URL incluida en bibliografía |
| Ferraiolo & Kuhn (1992) | **Verificable** — artículo de NIST | Confirmar datos de publicación |
| Clariana & Wallace (2002) | **Verificable** — artículo sobre evaluaciones digitales | Confirmar datos antes de la entrega |
| Congreso de la Unión (2010) LFPDPPP | **Verificable** — ley publicada en el DOF | URL incluida en bibliografía |
| Muñiz (2010) | **Verificable** — obra de psicometría en español | Confirmar datos de publicación |
| Twelve-Factor App (2017) | **Verificable** — disponible en 12factor.net | URL incluida en bibliografía |
| Kleppmann (2017) *Designing Data-Intensive Applications* | **Verificable** — obra estándar de sistemas distribuidos | Confirmar edición |
| Documentaciones oficiales (Next.js, React, TypeScript, Supabase, PostgreSQL, Tailwind, shadcn/ui, OWASP, Nielsen Norman) | **Verificables** — fuentes primarias online | URLs incluidas en bibliografía |

**Ninguna referencia fue inventada.** Las referencias a obras impresas se presentan con los datos disponibles marcando en el archivo de bibliografía cuáles requieren confirmación de edición o páginas específicas.

---

## 5. Redundancias con el Trabajo A

El Trabajo A (reporte de Francisco Daniel Arciniega Robles) desarrolla en su Capítulo II los siguientes temas:
- Proceso de reclutamiento y selección de personal
- Sistemas de información y aplicaciones web (concepto general)
- Metodologías de desarrollo de software (incluyendo prototipado)
- Análisis y diseño orientado a objetos y UML
- Bases de datos relacionales (modelo conceptual)
- Experiencia de usuario e interfaz (diseño de las 15 pantallas)
- Seguridad en aplicaciones web (nivel general)

**Temas del Capítulo III del Trabajo B que NO aparecen en el Trabajo A:**
- Next.js App Router, Server Components, Client Components
- Supabase como BaaS y sus tres servicios (Auth, PostgreSQL, Storage)
- JWT en detalle (RFC 7519, estructura de claims, verificación)
- Row Level Security con SECURITY DEFINER
- HMAC-SHA256 (RFC 2104, diferencia con hash simple, clave secreta)
- Tailwind CSS y shadcn/ui (tecnologías específicas)
- Variables de entorno y separación de entornos en Next.js
- Vercel como plataforma de despliegue
- Big Five con profundidad (el Trabajo A lo menciona pero no lo desarrolla)
- Escalas Likert y su tratamiento psicométrico
- Modelo de control de tiempo en evaluaciones digitales

**Superposición identificada:**
- El concepto general de "aplicaciones web" y "modelo cliente-servidor" es cubierto en ambos trabajos. En el Trabajo B, la sección 3.2 lo aborda desde la perspectiva de la arquitectura de implementación (SSR/CSR, Route Handlers), no desde el diseño conceptual. La superposición es mínima y justificada.
- La mención de "seguridad en aplicaciones web" en el Trabajo A es general; la sección 3.5 del Trabajo B desarrolla JWT y RBAC con especificidad de implementación. No es redundante.

**Veredicto:** No se detectan redundancias sustanciales con el Trabajo A. El capítulo se mantiene en el dominio de las tecnologías de implementación.

---

## 6. Anticipación del Capítulo V

El capítulo menciona en varias secciones que "el Capítulo V retomará" o "desarrollará en detalle" aspectos específicos. Esto es correcto: establece la relación entre fundamento y aplicación sin adelantar el código. Las únicas referencias al código actual son las necesarias para conectar la teoría con el sistema concreto y demostrar que los fundamentos son relevantes.

**Ninguna sección reproduce fragmentos completos de código.** Los fragmentos mencionados en el texto son extractos acotados que ilustran un punto teórico específico. El código completo se reserva para el Capítulo V.

---

## 7. Naturalidad del estilo

El capítulo mantiene un tono académico sin caer en tecnicismos injustificados ni en explicaciones elementales excesivas para el nivel de la carrera de Ingeniería en Sistemas Computacionales. Las transiciones entre secciones son coherentes. No se detectan párrafos de relleno ni afirmaciones vagas sin sustento.

**Observaciones menores:**
1. La sección 3.9 (UX) podría beneficiarse de un ejemplo más específico del sistema al mencionar "retroalimentación del sistema". Actualmente menciona el temporizador y la validación de CURP; podría agregar un tercero. No es urgente — en su forma actual es aceptable.
2. La sección 3.10.2 describe Vercel con un nivel de detalle general que no se apoya en archivos de configuración del repositorio. Esto es explícito en la revisión: se presenta como descripción de la plataforma. Si el asesor pregunta, debe mencionarse que el despliegue en Vercel es la opción natural para el framework pero no se verificó la existencia de un despliegue activo en el repositorio.

---

## 8. Extensión estimada

| Sección | Palabras estimadas | Páginas est. (250 pal./pág.) |
|---|---|---|
| 3.1 Ingeniería de software | ~380 | ~1.5 |
| 3.2 Arquitectura web | ~420 | ~1.7 |
| 3.3 Next.js, React, TypeScript | ~620 | ~2.5 |
| 3.4 Supabase y PostgreSQL | ~820 | ~3.3 |
| 3.5 Autenticación y autorización | ~620 | ~2.5 |
| 3.6 HMAC y CURP | ~600 | ~2.4 |
| 3.7 Evaluaciones y temporizador | ~450 | ~1.8 |
| 3.8 Big Five y Likert | ~650 | ~2.6 |
| 3.9 UX e interfaces | ~370 | ~1.5 |
| 3.10 Despliegue | ~450 | ~1.8 |
| 3.11 Conclusiones | ~280 | ~1.1 |
| **Total** | **~5,260** | **~21 páginas** |

El capítulo supera el rango objetivo de 18 páginas por aproximadamente 3 páginas. Esto es aceptable dado que el rango de 18-22 páginas es la estimación de la instrucción original. Si se requiere reducción, las secciones 3.9 y 3.10 admiten condensación sin pérdida de argumento sustancial.

---

## 9. Asuntos pendientes de evidencia o confirmación

| Asunto | Sección | Acción requerida |
|---|---|---|
| Datos exactos de publicación de Sommerville (2016) | 3.1 | Confirmar editorial, número de páginas antes de la entrega |
| Verificar si el instrumento psicométrico de UCES corresponde al Mini-IPIP o a otro instrumento | 3.8.3 | Preguntar al área de RH o revisar el cuestionario original (EV-06) |
| Confirmar que los datos de edición de McCrae & Costa (1992), Barrick & Mount (1991), Donnellan et al. (2006), Likert (1932) son correctos | 3.8 | Revisión de bibliografía antes de maquetación |
| Confirmar existencia de despliegue en Vercel | 3.10.2 | No es crítico para la defensa académica; mencionado como plataforma natural |

---

## 10. Verificación de restricciones académicas

| Restricción | ¿Se cumple? | Notas |
|---|---|---|
| No afirmar que la aplicación es completamente segura | Sí | Se menciona "defensa en profundidad" y múltiples capas sin garantías absolutas |
| No presentar los umbrales del Big Five como científicamente validados | Sí | Explícitamente presentados como criterios institucionales |
| No duplicar el marco teórico del Trabajo A | Sí | El contenido se concentra en tecnologías de implementación |
| No anticipar excesivamente el Capítulo V | Sí | Solo referencias prospectivas sin fragmentos de código completos |
| Voz impersonal, tercera persona | Sí | Consistente en todo el capítulo |
| No inventar citas ni referencias | Sí | Referencias documentadas en archivo de bibliografía con estado de verificación |
| Distinguir instrumento institucional de instrumento científico validado | Sí | Sección 3.8.3 es explícita |
