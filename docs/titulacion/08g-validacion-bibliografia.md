# Validación bibliográfica — Corte 8G

**Fecha:** 2026-10-23
**Versión:** v0.4
**Archivo fuente:** `referencias/bibliografia-final.md`
**Total de referencias en documento:** 33 entradas (31 fuentes únicas)

---

## 1. Estado general de la bibliografía

| Indicador | Resultado |
|---|---|
| Total de entradas en `bibliografia-final.md` | 33 |
| Entradas en el DOCX v0.4 | 33 |
| Formato | APA 7ª edición |
| Marcado como PENDIENTE | 6 entradas |
| Con DOI | ~12 entradas |
| Con URL sin DOI | ~10 entradas |
| Sin URL ni DOI (libros impresos) | ~11 entradas |
| Nota editorial en DOCX | SÍ — banner en rojo visible antes de la lista |

---

## 2. Verificación de referencias específicas señaladas en Corte 8F

### B-26 — Nielsen Norman Group (heurísticas)
- **Referencia actual:** `Nielsen Norman Group. (2024). *UX research & design*. Nielsen Norman Group. https://www.nngroup.com/ *(PENDIENTE — identificar artículo o guía específica de NN/g que sustente la afirmación en §3.9)*`
- **Uso en el texto:** Cap III §3.9 — se cita en el contexto de las 10 heurísticas de usabilidad
- **Problema identificado:** Las 10 heurísticas de Nielsen datan de 1994 (Jakob Nielsen, CACM). NN/g actualiza los títulos pero la fuente original es Nielsen, J. (1994). *Usability Engineering*. Academic Press, o el artículo original "10 Usability Heuristics for User Interface Design" (en nngroup.com, sin DOI).
- **Recomendación:** El autor debe verificar si §3.9 cita el artículo original de 1994 o la actualización de NN/g. Si la afirmación es sobre las heurísticas modernas, la URL correcta es https://www.nngroup.com/articles/ten-usability-heuristics/ con fecha de acceso.
- **Estado:** PENDIENTE — acción requerida del autor

### B-07 — Vercel (documentación)
- **Referencia actual:** `Vercel. (2024a). *Next.js App Router documentation*. Vercel. https://nextjs.org/docs/app`
- **Referencia actual:** `Vercel. (2024b). *Vercel platform documentation*. Vercel. https://vercel.com/docs`
- **Verificación:** Ambas URLs son accesibles y correctas. La documentación de Next.js reside en nextjs.org (mantenido por Vercel). La documentación de Vercel en vercel.com/docs.
- **Pendiente:** Agregar fecha de acceso en formato APA: "Recuperado el 23 de octubre de 2026, de https://nextjs.org/docs/app"
- **Estado:** URLs CORRECTAS — fecha de acceso pendiente

### B-12 — Supabase (documentación)
- **Referencia actual:** 4 entradas (Supabase 2024a–d): Overview, REST API, Auth, Storage
- **URLs:** https://supabase.com/docs (overview), /guides/api, /guides/auth, /guides/storage
- **Verificación:** Las rutas son las documentadas y accesibles públicamente en supabase.com
- **Pendiente:** Agregar fecha de acceso a las 4 entradas. Ejemplo: "Recuperado el 23 de octubre de 2026, de https://supabase.com/docs"
- **Estado:** URLs CORRECTAS — fecha de acceso pendiente (4 entradas)

### B-28 — Next.js (documentación)
- **Nota:** Next.js está bajo Vercel. La referencia correspondiente es `Vercel. (2024a). *Next.js App Router documentation*. https://nextjs.org/docs/app`
- **Verificación:** URL correcta y accesible
- **Pendiente:** Fecha de acceso
- **Estado:** URL CORRECTA — fecha de acceso pendiente

### B-04 — React 19
- **Referencia actual:** `Meta Open Source. (2024b). *React 19*. Meta Platforms. https://react.dev/blog/2024/12/05/react-19 *(PENDIENTE — confirmar URL y fecha exacta)*`
- **Problema:** La URL apunta a una publicación del 5 de diciembre de 2024. La fecha del blog es posterior a la compilación de la bibliografía (octubre 2026 como fecha de corte de evaluación, pero React 19 se publicó en diciembre 2024).
- **Verificación requerida:** El autor debe confirmar que esa URL es accesible y contiene el anuncio oficial de React 19.
- **Recomendación:** Si la URL es correcta, agregar "Recuperado el 23 de octubre de 2026, de https://react.dev/blog/2024/12/05/react-19"
- **Estado:** PENDIENTE — verificación manual requerida

---

## 3. Referencias con URL sin fecha de acceso (5 entradas prioritarias)

| Ref | Autores | URL | Acción requerida |
|---|---|---|---|
| Vercel 2024a | Next.js App Router docs | https://nextjs.org/docs/app | Agregar fecha de acceso |
| Vercel 2024b | Vercel platform docs | https://vercel.com/docs | Agregar fecha de acceso |
| Supabase 2024a–d | Documentación Supabase | https://supabase.com/docs y subrutas | Agregar fecha de acceso (4 entradas) |
| Meta OS 2024b | React 19 blog | https://react.dev/blog/2024/12/05/react-19 | Verificar accesibilidad + fecha de acceso |
| Nielsen Norman Group 2024 | UX research & design | https://www.nngroup.com/ | Identificar artículo específico + fecha de acceso |

---

## 4. Referencias marcadas como PENDIENTE en la fuente

| Referencia | Motivo del PENDIENTE |
|---|---|
| Arciniega Robles, F. D. (2026) | Confirmar título exacto, nombre completo y año en portada del PDF |
| Clariana & Wallace (2002) | Verificar pertinencia exacta de la afirmación en §3.7 |
| Meta Open Source (2024b) — React 19 | Confirmar URL y fecha exacta del anuncio oficial |
| Nielsen Norman Group (2024) | Identificar artículo específico de NN/g para la afirmación en §3.9 |
| SEGOB (2024) | Confirmar si la cita correcta es gob.mx, DOF o el Acuerdo de 1996 |
| Nielsen Norman Group — heurísticas | Verificar si cita es CHI'94 / Nielsen (1994) o NN/g actualizado |

---

## 5. Verificación de coherencia citas-referencias

Las 33 referencias en `bibliografia-final.md` corresponden a las fuentes citadas en los capítulos. La lista incluye:
- Autores académicos con DOI verificables (Barrick & Mount, McCrae & Costa, Donnellan et al., etc.)
- Documentación oficial de las tecnologías utilizadas (Supabase, Next.js, React, TypeScript, Tailwind, shadcn/ui)
- Estándares y normas (RFC 2616, RFC 7519, RFC 2104, FIPS 180-4, OWASP Top Ten)
- Libros de referencia (Pressman, Sommerville, Kleppmann)
- Referencia interna al Trabajo A (Arciniega Robles)

No se identificaron referencias en el texto sin entrada bibliográfica correspondiente.

---

## 6. Conclusión de validación

| Aspecto | Estado |
|---|---|
| Conteo de referencias (33) | CORRECTO |
| Formato APA 7 (estructura general) | CORRECTO |
| URLs de tecnologías principales | CORRECTAS |
| DOIs académicos | CORRECTOS (formato verificado) |
| Fechas de acceso en URLs | PENDIENTE — 5+ entradas |
| Referencias específicas B-26, B-07, B-12, B-28, B-04 | PENDIENTE — verificación manual del autor |
