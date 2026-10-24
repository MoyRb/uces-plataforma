# Revisión académica — Capítulo II

**Documento revisado:** `docs/titulacion/capitulos/02-contexto-organizacional.md`
**Fecha de revisión:** 2026-10-22
**Revisor:** Auditoría interna pre-entrega

---

## 1. Correspondencia con la problemática planteada en el Capítulo I

El Capítulo I establece el problema en términos generales: proceso manual de reclutamiento sin evaluación estructurada previa a la entrevista, carga de revisión individual de documentos, y necesidad de una plataforma que centralice el proceso y aporte información organizada al evaluador.

El Capítulo II profundiza correctamente en ese mismo problema sin repetirlo: describe el procedimiento paso a paso (sección 2.3), analiza las consecuencias específicas de la ausencia de evaluación preliminar desde la perspectiva del área de RH (sección 2.2), descompone las necesidades en tres categorías distintas (sección 2.4) y explica cómo la plataforma transforma el flujo (sección 2.6).

**Veredicto:** La correspondencia es coherente. El Cap. II amplía el argumento del Cap. I sin contradecirlo.

**Punto de atención:** La sección 2.6 describe el flujo propuesto con cierto nivel de detalle técnico (psicométrico obligatorio, evaluación con temporizador, panel de revisión). Esto anticipa brevemente el Cap. V. El nivel de detalle actual es aceptable como contexto organizacional; se volvería problemático si se ampliara con nombres de endpoints o fragmentos de código. No modificar.

---

## 2. Coherencia entre proceso anterior y proceso propuesto

La narrativa del capítulo construye una relación clara de causa y efecto:

| Problema en el proceso anterior | Elemento del sistema que lo atiende |
|---|---|
| Sin evaluación de conocimientos antes de entrevista | Módulo de evaluación con temporizador (OE-04) |
| Sin evaluación psicométrica integrada | Módulo psicométrico obligatorio como prerrequisito (OE-03) |
| Sin seguimiento centralizado de postulaciones | Panel administrativo con estados y decisiones (OE-05) |

Cada necesidad identificada en 2.4 tiene un correlato en los objetivos específicos del Cap. I (OE-03, OE-04, OE-05). La coherencia entre capítulos es satisfactoria.

La sección 2.8 (conclusiones) cierra el capítulo con la afirmación explícita de esta correspondencia, lo cual es correcto desde el punto de vista de la estructura argumentativa del reporte.

---

## 3. Redundancias entre capítulos

Se realizó una comparación punto a punto entre las secciones del Cap. I y el Cap. II.

| Elemento | Cap. I (sección) | Cap. II (sección) | ¿Redundancia? |
|---|---|---|---|
| Descripción del proceso manual de RH | 1.1 (párrafos 2-3, introductorio) | 2.3 (sección completa, detallado) | No — II profundiza, no repite |
| Problema de entrevistar candidatos sin filtro | 1.1 (mencionado) | 2.3 (explicado con causa/consecuencia) | No — extensión complementaria |
| Las tres necesidades del proyecto | 1.3 y 1.4 (formulados como objetivos) | 2.4 (explicados desde perspectiva organizacional) | No — ángulo diferente |
| Descripción técnica del sistema (Next.js, Supabase, JWT, etc.) | 1.2 (completa) | Ausente en Cap. II | Correcto — no se repite |
| Limitaciones del MVP | 1.6 (sección completa) | 2.6 último párrafo (una mención acotada) | Aceptable — es la mención mínima necesaria para la coherencia del argumento |
| Restricción psicométrica no implementada | 1.6 (explícito) | 2.6 (confirmado sin reiterar la limitación técnica) | Correcto — II menciona la política, I describe la limitación técnica |

**No se detectan párrafos duplicados.** La mención del proceso en Cap. I es introductoria; Cap. II es el desarrollo completo de ese contexto.

---

## 4. Afirmaciones que requieren respaldo documental

| Afirmación | Sección | Tipo de respaldo requerido | ID |
|---|---|---|---|
| UCES como institución receptora formal de las residencias | 2.1, 2.5 | Carta de adscripción | EV-01 |
| El área de RH identificó la necesidad de digitalizar el proceso | 2.1, 2.4 | Declaración del desarrollador (P-01, P-04). Sin documento adicional | EV-02 parcial |
| El personal del área proporcionó el cuestionario psicométrico | 2.4, 2.5 | Cuestionario original de UCES, proporcionado por Ale Fraga | EV-06 |
| El proceso previo era mayoritariamente manual | 2.3 | Declaración del desarrollador (P-04). Sin documento institucional | EV-02 |
| Los datos formales de los asesores | 2.5 | Carta de adscripción con firmas | EV-01 |

**Todas las afirmaciones están marcadas con la notación `[EV-XX]` en el texto.** Ninguna se presenta como hecho verificado externamente sin esa advertencia. El riesgo académico es bajo si el jurado acepta declaraciones del desarrollador como fuente primaria, lo cual es estándar en reportes de residencias. El riesgo aumenta si el jurado exige EV-01 durante la defensa.

**Recomendación antes de la defensa:** Gestionar EV-01 con prioridad. Es la evidencia que respalda casi todas las afirmaciones institucionales de este capítulo y del Cap. I.

---

## 5. Calidad y naturalidad de la redacción

### 5.1 Aspectos positivos

- El capítulo mantiene voz impersonal consistente sin caer en estructuras mecánicas o repetitivas.
- La sección 2.3 describe el proceso previo con un nivel de detalle suficiente para que sea analizable, sin inventar datos ni atribuir cifras.
- La sección 2.6 hace bien la distinción entre lo que el sistema hace (presenta información) y lo que no hace (tomar decisiones), lo cual es una afirmación técnicamente correcta y académicamente relevante.
- Las conclusiones de 2.8 sintetizan el argumento del capítulo y proyectan hacia los capítulos siguientes sin adelantar contenido técnico que pertenece al Cap. IV y V.

### 5.2 Observaciones de redacción

1. **Sección 2.1, segundo párrafo de apertura** — La nota de evidencia pendiente `[EV-01]` interrumpe el flujo narrativo. En la versión final maquetada en Word, considerar colocarla como nota al pie en lugar de bloque en el cuerpo del texto. El contenido es correcto; el formato puede ajustarse.

2. **Sección 2.2, último párrafo** — La frase "La particularidad del contexto de este proyecto radica en que..." introduce el instrumento psicométrico como contexto para la siguiente sección. Funciona correctamente como transición pero podría percibirse como abrupta si el lector no conoce el sistema. Es aceptable en su forma actual; si el asesor lo observa, puede integrarse en la siguiente oración.

3. **Sección 2.4, segundo punto** — La descripción del cuestionario incluye la frase "basado en dimensiones del modelo de los Cinco Grandes factores de personalidad". Esta afirmación es técnicamente correcta y coherente con lo que se dice en los Cap. I y V. Sin embargo, en el Cap. III se desarrollará el marco teórico del Big Five; verificar que la primera mención en el Cap. II sea consistente en terminología con la que se usará en III.

4. **Sección 2.7, tercer párrafo** — El listado de condiciones operativas (dispositivo con internet, personal capacitado en el panel, configuración previa de preguntas) podría convertirse en una lista numerada si el asesor prefiere estructuras más visibles para requisitos. En su forma actual como párrafo fluido es académicamente apropiado.

5. **Sin uso de lenguaje comercial detectado.** No hay frases del tipo "solución integral", "herramienta de vanguardia" ni afirmaciones de impacto positivo sin respaldo.

---

## 6. Extensión estimada

| Sección | Palabras estimadas | Páginas estimadas (250 pal./pág.) |
|---|---|---|
| 2.1 Descripción de UCES | ~290 | ~1.2 |
| 2.2 Función de RH | ~310 | ~1.2 |
| 2.3 Procedimiento previo | ~400 | ~1.6 |
| 2.4 Necesidades identificadas | ~390 | ~1.6 |
| 2.5 Actores | ~290 | ~1.2 |
| 2.6 Propuesta de transformación | ~470 | ~1.9 |
| 2.7 Alcance organizacional | ~390 | ~1.6 |
| 2.8 Conclusiones | ~290 | ~1.2 |
| **Total** | **~2,830** | **~11.3** |

El capítulo supera ligeramente el rango objetivo de 8-10 páginas establecido en el plan de paginación, alcanzando aproximadamente 11 páginas. Esto es aceptable dado que el plan de paginación es una estimación guía, no un límite estricto, y el contenido justifica su extensión.

**Si se requiere reducción:** Las secciones 2.5 y 2.7 admiten condensación sin pérdida de argumento sustancial. La sección 2.5 puede recortarse a dos párrafos si se eliminan las notas de evidencia del cuerpo y se llevan a pie de página. La sección 2.7, tercer párrafo (condiciones operativas), podría reducirse a una sola oración introductoria sin la enumeración de condiciones, reservando ese detalle para el Cap. VI.

---

## 7. Verificación de restricciones académicas

| Restricción | ¿Se cumple? | Notas |
|---|---|---|
| No inventar misión, visión, organigramas ni fechas | Sí | La sección 2.1 declara explícitamente que no se dispone de esa información |
| No fabricar entrevistas ni testimonios | Sí | Toda la información se atribuye a "declaración del desarrollador" o se marca con EV-XX |
| No afirmar porcentajes de mejora ni volúmenes de candidatos | Sí | No aparece ninguna cifra sin respaldo |
| No repetir explicaciones técnicas del Cap. I | Sí | No hay menciones de Next.js, Supabase, JWT, RLS ni TypeScript |
| Distinguir información declarada de evidencia verificada | Sí | Las notas EV-01, EV-06 aparecen en cada afirmación institucional relevante |
| No afirmar adopción institucional sostenida | Sí | La sección 2.7 describe la adopción como condición futura, no como hecho cumplido |
| Tercera persona / voz impersonal | Sí | Consistente en todo el capítulo |

---

## 8. Observaciones para el autor

1. **EV-01 es la evidencia crítica de este capítulo.** Las secciones 2.1, 2.5 y las referencias a los asesores no pueden considerarse completas sin la carta de adscripción. Gestionar antes de la defensa.

2. **Marcadores `[EV-XX]` en el texto final:** En la versión maquetada para entrega, estos marcadores deben convertirse en notas al pie con el texto correspondiente, o eliminarse una vez que las evidencias estén incorporadas. No deben aparecer en el documento final con la sintaxis de corchetes.

3. **Coherencia terminológica con Cap. III:** Antes de finalizar el Cap. III (Marco teórico), verificar que los términos usados en 2.2 ("proceso de reclutamiento y selección"), 2.4 ("modelo de los Cinco Grandes factores") y 2.6 ("evaluación psicométrica", "evaluación de conocimientos") sean los mismos que se usarán en el marco teórico para evitar inconsistencias terminológicas.

4. **Figura opcional:** Podría agregarse al final de la sección 2.6 un diagrama de flujo comparativo (proceso anterior vs. proceso propuesto) con dos columnas. Esto reforzaría visualmente la transformación descrita sin agregar texto. Se clasifica como mejora opcional para el Cap. IV o para los gráficos del Cap. II si el plan de paginación lo permite.
