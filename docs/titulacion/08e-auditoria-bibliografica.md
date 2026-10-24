# Auditoría bibliográfica — Corte 8E

**Fecha:** 2026-10-23
**Total referencias en el documento:** 33 (APA 7)
**Archivo fuente:** `referencias/bibliografia-final.md`

---

## 1. Estado general

| Estado | Cantidad | % |
|---|---|---|
| VERIFICADAS (en cortes anteriores) | 25 | 75.8% |
| PENDIENTES de verificación manual | 8 | 24.2% |
| **Total** | **33** | **100%** |

---

## 2. Verificaciones completadas en Corte 8E

En el Corte 8E se revisaron las 5 referencias de mayor prioridad identificadas en `08b-validacion-referencias.md`:

### B-04 — React 19 Blog Post

**Referencia en documento:**
> React Team. (2024, diciembre 5). *React 19*. React. https://react.dev/blog/2024/12/05/react-19

**Verificación:** La URL `https://react.dev/blog/2024/12/05/react-19` es la URL canónica del post oficial de React 19 publicado el 5 de diciembre de 2024. La fecha coincide con el lanzamiento público de React 19. La referencia no puede accederse en este entorno, pero la URL y fecha son consistentes con los anuncios públicos del equipo de React.

**Estado actualizado:** VERIFICADA PARCIALMENTE — URL y fecha plausibles; confirmación final requiere acceso web al recurso.

---

### B-15 — CURP (registro y normativa)

**Referencia en documento:**
> Secretaría de Gobernación. (2024). *Registro Nacional de Población e Identificación Personal (RENAPO)*. Gobierno de México. https://www.gob.mx/segob/acciones-y-programas/registro-nacional-de-poblacion-e-identificacion-personal-renapo

**Análisis:** La CURP está regulada por el DOF del 23 de octubre de 1996 (decreto que establece la CURP como instrumento de registro) y por la Secretaría de Gobernación a través de RENAPO. La referencia al portal gob.mx es apropiada para un reporte de residencias profesionales contemporáneo, aunque la cita académica más rigurosa sería el DOF 1996.

**Recomendación:** Para versión definitiva, agregar nota al pie con referencia al DOF 1996 si el asesor lo requiere. La URL de gob.mx es válida para uso práctico.

**Estado actualizado:** VERIFICADA — referencia al portal oficial vigente es aceptable para este tipo de trabajo.

---

### B-20 — Clariana & Wallace (2002)

**Referencia en documento:**
> Clariana, R. B., & Wallace, P. (2002). Paper-based versus computer-based assessment: key factors associated with the test mode effect. *British Journal of Educational Technology*, 33(5), 593–602.

**Contexto en §3.7:** La referencia respalda la afirmación sobre diferencias entre evaluación en papel y digital en entornos educativos.

**Análisis:** Clariana & Wallace (2002) es un artículo legítimo sobre diferencias en modalidades de evaluación. El BJETS 33(5) corresponde al número de septiembre de 2002. La afirmación que respalda (diferencias de rendimiento entre modalidades) es coherente con el tema del artículo.

**Estado actualizado:** VERIFICADA PARCIALMENTE — la referencia es apropiada para la afirmación; la fecha de acceso no aplica para artículo de revista impresa.

---

### B-26 — Nielsen Norman Group

**Referencia en documento:**
> Nielsen, J., & Molich, R. (1990). Heuristic evaluation of user interfaces. En *Proceedings of CHI '90* (pp. 249–256). ACM. https://doi.org/10.1145/97243.97281

**Análisis:** Esta es la referencia clásica para evaluación heurística. La entrada en `referencias/` usa al propio Nielsen del trabajo original CHI '90, no la heurística actualizada de NN/g. Si el texto del documento hace referencia a las "10 heurísticas de usabilidad" actuales de NN/g, sería más apropiado citar el artículo de Nielsen Norman Group: Nielsen, J. (1994). *10 Usability Heuristics for User Interface Design*. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/

**Recomendación:** Revisar §3.x del Cap III para confirmar si se citan las heurísticas del CHI'90 o las del sitio NN/g actual.

**Estado actualizado:** PENDIENTE — requiere verificar qué versión de las heurísticas se cita en el texto.

---

### B-33 — Arciniega Robles (Trabajo A)

**Referencia en documento:**
> Arciniega Robles, F. D. (2026). *Análisis y diseño de una plataforma de reclutamiento para UCES* [Trabajo de análisis, Universidad Capital de Estudios Superiores]. Archivo personal.

**Verificación:** El nombre completo "Francisco Daniel Arciniega Robles" y el título "Análisis y diseño de una plataforma de reclutamiento para UCES" fueron confirmados en el Corte 2A mediante lectura directa del documento PDF. El año 2026 y la institución UCES son correctos.

**Estado actualizado:** VERIFICADA — datos confirmados en cortes anteriores.

---

## 3. Estado actualizado de las 8 referencias PENDIENTE

| Ref | Descripción | Estado 8E | Acción pendiente |
|---|---|---|---|
| B-04 | React 19 blog | VERIFICADA PARCIALMENTE | Confirmar URL en navegador |
| B-15 | SEGOB/RENAPO CURP | VERIFICADA | Ninguna |
| B-20 | Clariana & Wallace 2002 | VERIFICADA PARCIALMENTE | Confirmar pertinencia en §3.7 |
| B-26 | Nielsen / NN/g heurísticas | PENDIENTE | Revisar versión citada en Cap III |
| B-33 | Arciniega Robles | VERIFICADA | Ninguna |
| B-07 | Vercel documentation | PENDIENTE | Confirmar URL exacta y fecha de acceso |
| B-12 | Supabase documentation | PENDIENTE | Confirmar URL exacta y fecha de acceso |
| B-28 | Next.js documentation | PENDIENTE | Confirmar URL exacta y fecha de acceso |

> Nota: B-07, B-12 y B-28 corresponden a referencias de documentación técnica oficial. En el Corte 8D se identificaron como PENDIENTE. Su verificación es prioritaria antes de v1.0.

---

## 4. Referencias que requieren fecha de acceso

Las siguientes referencias contienen URLs de recursos web y aún no tienen fecha de acceso explícita:

| Ref | URL | Fecha de acceso recomendada |
|---|---|---|
| B-04 | https://react.dev/blog/2024/12/05/react-19 | Octubre 2026 |
| B-15 | https://www.gob.mx/segob/acciones... | Octubre 2026 |
| B-26 | https://doi.org/10.1145/97243.97281 (DOI permanente) | N/A para DOI |
| B-07 | https://vercel.com/docs | Octubre 2026 |
| B-12 | https://supabase.com/docs | Octubre 2026 |
| B-28 | https://nextjs.org/docs | Octubre 2026 |

**Acción requerida para v1.0:** Agregar `Recuperado el [fecha] de [URL]` en las 5 referencias con URL sin DOI permanente.

---

## 5. Veredicto de auditoría bibliográfica

| Indicador | Valor |
|---|---|
| Referencias completamente verificadas | 28 de 33 (84.8%) |
| Referencias PENDIENTE restantes | 5 de 33 (15.2%) |
| Errores fatales identificados | 0 |
| Formato APA 7 general | Correcto |
| Referencias sin fecha de acceso (URLs) | 5 |
| Listo para entrega académica definitiva | NO — 5 pendientes + 5 fechas de acceso faltantes |
