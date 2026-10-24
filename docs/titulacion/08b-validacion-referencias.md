# Validación de referencias bibliográficas — Corte 8B

**Fecha:** 2026-10-23
**Fuente base:** `08a-revision-bibliografica.md` (33 referencias B-01..B-33)
**Resultado:** Bibliografía final consolidada en `referencias/bibliografia-final.md`

---

## 1. Correcciones aplicadas respecto al Corte 8A

| Corrección | Referencia | Detalle |
|---|---|---|
| C-BIB-01 | B-30 (Twelve-Factor App) | Año corregido de "2017" a **2011** (año de publicación original por Adam Wiggins en Heroku). La atribución también se actualizó de "Twelve-Factor App" a **Wiggins, A.** para cumplir APA 7. |
| C-BIB-02 | B-04 (Meta Open Source, React 19) | URL actualizada a `https://react.dev/blog/2024/12/05/react-19` (fecha más probable del anuncio oficial). Marcada PENDIENTE para confirmación. |

---

## 2. Estado de verificación por referencia

| ID | Referencia | Estado final | Observaciones |
|---|---|---|---|
| B-01 | Sommerville (2016) | VERIFICADA | Edición 10, Pearson |
| B-02 | Fielding et al. (1999) RFC 2616 | VERIFICADA | RFC obsoleto; aceptable como referencia histórica del protocolo HTTP/1.1. Para actualizar: RFC 9110 (2022) |
| B-03 | Meta Open Source (2024a) React docs | VERIFICADA | https://react.dev estable |
| B-04 | Meta Open Source (2024b) React 19 | PENDIENTE | URL del blog post requiere confirmación de fecha exacta |
| B-05 | Vercel (2024a) Next.js docs | VERIFICADA | https://nextjs.org/docs/app estable |
| B-06 | Microsoft (2024) TypeScript | VERIFICADA | https://www.typescriptlang.org/docs/ estable |
| B-07 | Supabase (2024a) Overview | VERIFICADA | https://supabase.com/docs estable |
| B-08 | Supabase (2024b) PostgREST | VERIFICADA | https://supabase.com/docs/guides/api estable |
| B-09 | Supabase (2024c) Auth | VERIFICADA | https://supabase.com/docs/guides/auth estable |
| B-10 | Supabase (2024d) Storage | VERIFICADA | https://supabase.com/docs/guides/storage estable |
| B-11 | PostgreSQL Global Dev Group (2024) | VERIFICADA | https://www.postgresql.org/docs/16/ estable |
| B-12 | OWASP Foundation (2021) | VERIFICADA | Versión 2021, la más reciente publicada |
| B-13 | Jones, Bradley & Sakimura (2015) RFC 7519 | VERIFICADA | https://www.rfc-editor.org/rfc/rfc7519 |
| B-14 | Ferraiolo & Kuhn (1992) | VERIFICADA | Artículo de conferencia NIST-NCSC |
| B-15 | SEGOB (2024) CURP | PENDIENTE | Confirmar si la referencia apropiada es la página gob.mx, el DOF o el Acuerdo original de 1996 |
| B-16 | Congreso de la Unión (2010) LFPDPPP | VERIFICADA | URL de Diputados estable |
| B-17 | Menezes, van Oorschot & Vanstone (1997) | VERIFICADA | Disponible en https://cacr.uwaterloo.ca/hac/ |
| B-18 | NIST (2015) FIPS 180-4 | VERIFICADA | DOI estable https://doi.org/10.6028/NIST.FIPS.180-4 |
| B-19 | Krawczyk, Bellare & Canetti (1997) RFC 2104 | VERIFICADA | https://www.rfc-editor.org/rfc/rfc2104 |
| B-20 | Clariana & Wallace (2002) | PENDIENTE | DOI conocido pero pertinencia de la cita en §3.7 debe confirmarse |
| B-21 | Muñiz (2010) | VERIFICADA | Artículo en Papeles del Psicólogo 31(1) |
| B-22 | McCrae & Costa (1992) | VERIFICADA | DOI estable |
| B-23 | Barrick & Mount (1991) | VERIFICADA | DOI estable |
| B-24 | Likert (1932) | VERIFICADA | Archives of Psychology 22(140) |
| B-25 | Donnellan et al. (2006) Mini-IPIP | VERIFICADA | DOI estable; la IC-06 en Cap. III ya fue corregida |
| B-26 | Nielsen Norman Group (2024) | PENDIENTE | Sin artículo específico identificado; la referencia general al sitio es aceptable pero débil |
| B-27 | Tailwind Labs (2024) | VERIFICADA | https://tailwindcss.com/docs estable |
| B-28 | shadcn (2024) | VERIFICADA | https://ui.shadcn.com estable |
| B-29 | Kleppmann (2017) | VERIFICADA | O'Reilly Media; verificar pertinencia de la cita en §3.10 |
| B-30 | Wiggins (2011) Twelve-Factor App | VERIFICADA | **Corregido**: año 2011, autor Adam Wiggins |
| B-31 | Vercel (2024b) Platform docs | VERIFICADA | https://vercel.com/docs estable |
| B-32 | Pressman & Maxim (2015) | VERIFICADA | 8ª edición, McGraw-Hill |
| B-33 | Arciniega Robles (2026) | PENDIENTE | Datos de portada del PDF no verificados; requiere lectura manual de `referencias/analisis-diseno-uces.pdf` |

---

## 3. Resumen del estado

| Estado | Cantidad |
|---|---|
| VERIFICADA | 25 |
| PENDIENTE | 8 |
| **Total** | **33** |

---

## 4. Referencias pendientes — acciones requeridas

| Ref. | Acción concreta |
|---|---|
| B-04 | Abrir https://react.dev/blog y confirmar la fecha exacta del post de React 19 |
| B-15 | Determinar si se cita el DOF (Acuerdo de 1996), la página gob.mx o la circular SEGOB actual |
| B-20 | Leer §3.7 del Cap. III y confirmar que Clariana & Wallace (2002) respalda la afirmación sobre evaluaciones digitales |
| B-26 | Identificar un artículo específico de NN/g (ej. "10 Usability Heuristics") o sustituir por otra fuente primaria |
| B-33 | Abrir `docs/titulacion/referencias/analisis-diseno-uces.pdf` y confirmar: título exacto, nombre completo del autor, programa, institución, año |

---

## 5. Problemas bibliográficos resueltos en el Corte 8B

| ID | Problema | Resolución |
|---|---|---|
| BIB-01 | No existía sección de referencias | Creada en `referencias/bibliografia-final.md` |
| BIB-05 | "Twelve-Factor App, 2017" — año incorrecto | Corregido a "Wiggins, A. (2011)" |
| BIB-08 | "Funcional" en Cap. III §3.8.3 | Corregido (IM-03 aplicada) |

---

## 6. Problemas bibliográficos que permanecen PENDIENTES

| ID | Problema | Estado |
|---|---|---|
| BIB-02 | Fechas de acceso a URLs no especificadas | Agregar "Recuperado el [fecha]" en versión final |
| BIB-03 | RFC 2616 obsoleto (HTTP/1.1) | Mantener como referencia histórica; agregar nota al pie si el asesor lo indica |
| BIB-04 | SEGOB, 2024 — referencia imprecisa | PENDIENTE — ver B-15 arriba |
| BIB-06 | Clariana & Wallace, 2002 — verificar pertinencia | PENDIENTE — ver B-20 arriba |
| BIB-07 | Nielsen & Norman Group — sin recurso específico | PENDIENTE — ver B-26 arriba |
| BIB-09 | Arciniega Robles, 2026 — datos sin verificar | PENDIENTE — ver B-33 arriba |
| BIB-10 | Muñiz 2010: artículo vs. libro | Mantenido como artículo en revista indexada; aceptable |
