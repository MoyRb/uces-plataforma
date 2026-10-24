# Revisión académica — Capítulo I

**Documento revisado:** `docs/titulacion/capitulos/01-introduccion-generalidades.md`
**Fecha de revisión:** 2026-10-21
**Revisor:** Auditoría interna pre-entrega

---

## 1. Coherencia entre problema, objetivos y justificación

La cadena argumentativa del capítulo es consistente. La sección 1.1 establece el problema (proceso manual sin evaluación preliminar, carga de revisión y entrevistas a candidatos no filtrados); la sección 1.3 formula el objetivo general en términos que responden directamente a ese problema (centralizar y digitalizar las actividades del proceso); la sección 1.4 descompone el objetivo en siete objetivos específicos que se corresponden uno a uno con los módulos implementados verificados en el repositorio; y la sección 1.5 justifica la elección de este problema y de este alcance sin recurrir a afirmaciones no respaldadas.

**No se detectan contradicciones internas** entre las tres secciones. El problema no está exagerado, los objetivos no prometen más de lo que el sistema construye, y la justificación no afirma impactos cuantitativos que no pueden verificarse.

---

## 2. Correspondencia con las funcionalidades implementadas

| Objetivo específico | Funcionalidad en repositorio | Estado |
|---|---|---|
| OE-01 — Modelo relacional con RLS | 13 tablas en `schema.sql`, políticas en `rls.sql` | CONFIRMADO |
| OE-02 — Registro con CURP + HMAC-SHA256 | `api/auth/register/route.ts`, `lib/curp.ts` | CONFIRMADO |
| OE-03 — Módulo psicométrico Big Five | `lib/psicometricoResults.ts`, `seed_psicometrico_base.sql` | CONFIRMADO |
| OE-04 — Evaluación con temporizador y evidencia | `evaluacion/[attemptId]/cliente.tsx`, `api/attempts/*/submit` | CONFIRMADO |
| OE-05 — Panel administrativo con CRUD y decisiones | `admin/page.tsx`, `api/admin/**` | CONFIRMADO |
| OE-06 — Control de acceso con JWT + RLS | `api/admin/utils.ts` (`requireAdmin`), `roles.sql` | CONFIRMADO |
| OE-07 — Despliegue en Vercel | `supabase/.temp/linked-project.json`, README | DECLARADO (pendiente EV-03) |

La sección 1.6 lista correctamente las limitaciones del MVP y no describe como implementadas las funcionalidades ausentes. La redacción de la limitación sobre la restricción psicométrica (`POST /api/vacancies/[id]/apply` solo verifica `completed`, no el score) es precisa y no ambigua.

---

## 3. Afirmaciones pendientes de evidencia

Las siguientes afirmaciones del capítulo están correctamente atribuidas pero dependen de evidencia externa que aún no se ha recopilado:

| Afirmación | Sección | Evidencia requerida | ID |
|---|---|---|---|
| "el área de Recursos Humanos de UCES" como unidad organizacional receptora | 1.1, 1.3 | Carta de adscripción o documento institucional | EV-01 |
| "el proceso de reclutamiento se desarrollaba mediante actividades principalmente manuales" | 1.1 | Declaración del desarrollador (P-04). Sin documento institucional adicional | EV-02 |
| "La aplicación se desplegó en Vercel" | 1.2 | URL pública + captura de pantalla | EV-03 |
| "El instrumento fue proporcionado por personal de la institución" | 1.2, 1.6 | Cuestionario original de UCES | EV-06 |
| "Los umbrales corresponden a criterios institucionales" | 1.6 | Lineamiento o comunicación de UCES | EV-07 |

**Ninguna de estas afirmaciones constituye una afirmación falsa en el texto actual.** Están redactadas con el grado de atribución correcto (no se presentan como hechos verificados externamente, sino como información del proyecto). El riesgo es que el jurado solicite evidencia documental de alguna de ellas. Véase `00-evidencias-por-recopilar.md` para las acciones pendientes.

---

## 4. Repeticiones y debilidades de redacción

### 4.1 Repeticiones detectadas

| Elemento repetido | Apariciones | Recomendación |
|---|---|---|
| "MVP" / "Minimum Viable Product" | 1.1 (definido), 1.5, 1.6, 1.7 | Aceptable. Se define en 1.1 y se usa la sigla en secciones posteriores. No es redundante. |
| Descripción de la arquitectura Next.js + Supabase | 1.2 (amplio), 1.7 (mención breve) | En 1.7 solo se menciona para contextualizar el Cap. III. Sin redundancia problemática. |
| "Recursos Humanos" como área beneficiaria | 1.1, 1.3, 1.5 | Necesario para mantener coherencia del argumento. No se califica como repetición negativa. |

**No se detectan párrafos duplicados ni ideas reexpresadas innecesariamente.**

### 4.2 Debilidades menores de redacción

1. **Sección 1.1, párrafo 4** — La enumeración "cuatro componentes fundamentales: la publicación de vacantes, el registro de candidatos, la evaluación psicométrica preliminar y la evaluación de conocimientos específicos" podría integrarse más fluidamente en la prosa, aunque como está no es incorrecto. Si el asesor prefiere evitar listas en la introducción, puede reescribirse como prosa continua.

2. **Sección 1.4** — Los objetivos específicos son claros y técnicamente precisos. Sin embargo, OE-01 y OE-06 tienen cierta superposición temática (ambos mencionan RLS). El traslape es aceptable porque OE-01 habla del diseño del modelo y OE-06 habla del control de acceso de API; no hay contradicción.

3. **Sección 1.5, último párrafo** — La frase "No se dispone de indicadores cuantitativos sobre el proceso de reclutamiento anterior" es correcta y necesaria, pero tiene un tono ligeramente defensivo. Podría reformularse como: "El alcance de este proyecto se circunscribe a la construcción e implementación técnica del sistema; la evaluación de su impacto operativo constituye una actividad posterior que depende del proceso de adopción institucional." Esto mantiene el mismo mensaje pero lo enmarca como una delimitación positiva del alcance.

4. **Sección 1.6** — La separación visual entre "dentro del alcance" y "fuera del alcance" mediante subtítulos es clara. Sin embargo, en el documento maquetado en Word/LaTeX, estas subsecciones deberían numerarse (1.6.1 / 1.6.2) o presentarse con tabla si el asesor lo prefiere. Revisar el formato con la plantilla institucional antes de la entrega.

---

## 5. Extensión aproximada y recomendaciones de paginación

| Sección | Palabras estimadas | Páginas estimadas (250 pal./pág.) |
|---|---|---|
| 1.1 Antecedentes | ~500 | ~2.0 |
| 1.2 Descripción general | ~520 | ~2.1 |
| 1.3 Objetivo general | ~75 | ~0.3 |
| 1.4 Objetivos específicos | ~360 | ~1.4 |
| 1.5 Justificación | ~430 | ~1.7 |
| 1.6 Alcance y limitaciones | ~620 | ~2.5 |
| 1.7 Organización del documento | ~240 | ~1.0 |
| **Total** | **~2,745** | **~11.0** |

El capítulo alcanza aproximadamente 11 páginas en formato carta 12 pt interlineado 1.5, dentro del rango objetivo de 8 a 12 páginas establecido en el plan de paginación. No es necesario agregar contenido para cubrir extensión.

**Recomendación:** No extender. El capítulo tiene densidad argumentativa adecuada. Agregar párrafos adicionales sin nueva información comprometería la calidad.

---

## 6. Verificación de restricciones académicas

| Restricción | ¿Se cumple? | Notas |
|---|---|---|
| No inventar entrevistas ni reuniones | Sí | Los antecedentes se atribuyen a "información del área" o "declaración del desarrollador" sin inventar sesiones |
| No afirmar reducción porcentual del tiempo | Sí | La sección 1.5 delimita explícitamente la ausencia de indicadores cuantitativos |
| No describir funcionalidades no implementadas como implementadas | Sí | La sección 1.6 lista con precisión lo que está fuera del alcance del MVP |
| No usar lenguaje comercial | Sí | Sin frases del tipo "solución innovadora de vanguardia" o "plataforma líder" |
| Tercera persona / voz impersonal | Sí | Redacción consistente en voz impersonal ("el sistema permite", "se implementó", "el proyecto contempla") |
| No afirmar adopción institucional masiva | Sí | El sistema se presenta como MVP funcional; la adopción operativa se identifica como actividad posterior |

---

## 7. Observaciones para el autor

1. **Antes de la defensa:** Obtener EV-01 (carta de adscripción) y EV-03 (URL con captura de Vercel). Estas son las dos evidencias cuya ausencia puede ser cuestionada directamente por el jurado en relación con el contenido del Capítulo I.

2. **Formato institucional:** Verificar con la plantilla del instituto si los objetivos específicos deben presentarse como lista numerada o como párrafos con encabezado en negrita. La versión actual usa encabezados negrita (OE-01 a OE-07); ajustar si la guía institucional exige otro formato.

3. **Cita de la sección 1.2:** Si el asesor solicita una referencia bibliográfica para la descripción del modelo Big Five en la sección 1.2, agregar "(Costa y McCrae, 1992)" o la referencia correspondiente que se utilice en el Cap. III. En su estado actual, la mención no cita fuente explícita porque el marco teórico se desarrolla en el capítulo siguiente.

4. **Figura opcional en 1.2:** Podría agregarse un diagrama simplificado del flujo general (candidato → psicométrico → vacante → evaluación → resultado / admin → revisión → decisión) para acompañar la descripción del sistema. Esto reforzaría visualmente la descripción sin extender el texto. Se clasifica como mejora opcional, no requerida.
