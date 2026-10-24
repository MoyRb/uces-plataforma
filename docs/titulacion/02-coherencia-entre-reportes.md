# Coherencia entre reportes — Trabajo A y Trabajo B

**Fecha de análisis:** 2026-10-22
**Trabajo A:** "Análisis y diseño de una plataforma de reclutamiento para UCES" — Francisco Daniel Arciniega Robles
**Trabajo B:** "Desarrollo e implementación de una plataforma de reclutamiento para UCES" — Moisés Ruiz Bernal
**Propósito:** Identificar concordancias, divergencias y contradicciones entre ambos reportes antes del cierre de redacción.

---

## 1. Nombre del proyecto y del sistema

| Dimensión | Trabajo A | Trabajo B | Estado |
|---|---|---|---|
| Nombre del sistema | "Plataforma de reclutamiento UCES" | "UCES Plataforma de Talento" | DIVERGENCIA MENOR |
| Nombre del proyecto (título) | "Análisis y diseño de una plataforma de reclutamiento para UCES" | "Desarrollo e implementación de una plataforma de reclutamiento para UCES" | COHERENTE |
| Acrónimo de la institución | UCES | UCES | COHERENTE |
| Nombre completo de la institución | Universidad Capital de Estudios Superiores | No definido explícitamente en Cap. I-II | PENDIENTE DE CORRECCIÓN |

**Diagnóstico:** La divergencia en el nombre del sistema ("Plataforma de reclutamiento UCES" vs. "UCES Plataforma de Talento") es atribuible a que el nombre de interfaz visible evolucionó durante el desarrollo. No constituye una contradicción académica porque ambos reportes describen el mismo sistema. Sin embargo, el Trabajo B debe definir explícitamente el nombre completo de UCES en su sección 1.1 para evitar ambigüedad ante el jurado.

**Acción requerida en Trabajo B:**
- En la sección 1.1 del Cap. I, agregar la definición completa: "Universidad Capital de Estudios Superiores (UCES)".
- En la sección 2.1 del Cap. II, actualizar la primera mención de "UCES" por "Universidad Capital de Estudios Superiores (UCES)".
- El nombre de la aplicación puede citarse como "UCES Plataforma de Talento" indicando que ese es el nombre del producto de software.

---

## 2. Objetivo general y problema institucional

| Dimensión | Trabajo A | Trabajo B | Estado |
|---|---|---|---|
| Problema central | Proceso manual de reclutamiento sin evaluación preliminar estructurada | Proceso manual de reclutamiento sin evaluación estructurada previa a la entrevista | COHERENTE |
| Objetivo general | Analizar y diseñar una plataforma web para digitalizar y estructurar el proceso de reclutamiento de RH de UCES | Desarrollar e implementar la plataforma diseñada en el Trabajo A, con módulos de evaluación psicométrica y de conocimientos | COMPLEMENTARIO |
| Hipótesis/propósito | Reducir tiempo de revisión, centralizar información, mejorar satisfacción del área de RH | Implementar el sistema definido por los requisitos del Trabajo A | COHERENTE |

**Diagnóstico:** Los objetivos son distintos por diseño (análisis/diseño vs. desarrollo/implementación) y son perfectamente complementarios. No existe contradicción.

---

## 3. Participación institucional del área de RH

| Dimensión | Trabajo A | Trabajo B | Estado |
|---|---|---|---|
| Identificación de la necesidad | El área de RH de UCES identificó la necesidad de digitalizar el proceso | Mismo origen declarado | COHERENTE |
| Participación en requisitos | El área de RH proporcionó el instrumento psicométrico y participó en la validación de requisitos | El área de RH proporcionó el cuestionario (EV-06) | COHERENTE |
| Instrumento psicométrico | Cuestionario de 20 ítems basado en el modelo Big Five, proporcionado por Ale Fraga (personal de RH de UCES) | Cuestionario mencionado como recibido del área de RH | COHERENTE |
| Nombre del contacto en RH | Ale Fraga (mencionado en Trabajo A) | No mencionado nominalmente en Cap. I-II (protegido como EV-06) | ACEPTABLE |

**Diagnóstico:** La coherencia es satisfactoria. El Trabajo B protege adecuadamente el nombre del contacto bajo marcadores de evidencia, mientras que el Trabajo A lo menciona directamente. Esto no genera contradicción: son decisiones de presentación distintas para el mismo hecho.

---

## 4. Metodología de trabajo

| Dimensión | Trabajo A | Trabajo B | Estado |
|---|---|---|---|
| Metodología declarada | Prototipado evolutivo | No declarada explícitamente en Cap. I (pendiente en Cap. IV) | PENDIENTE |
| Justificación de la metodología | Adecuada para proyectos con requisitos cambiantes y validación continua con el usuario | Misma justificación aplica | COHERENTE (cuando se declare) |
| Evidencia en el repositorio | Git history muestra iteraciones evolutivas compatibles con prototipado | Git history disponible como evidencia | COHERENTE |

**Diagnóstico:** El Trabajo B aún no ha declarado explícitamente la metodología (esto corresponde al Cap. IV). Cuando se redacte ese capítulo, debe coincidir con el prototipado evolutivo del Trabajo A. No declarar una metodología diferente.

**Acción requerida en Trabajo B:**
- En el Cap. IV (Metodología de desarrollo), declarar "prototipado evolutivo" como metodología y referenciar que fue seleccionada a partir del análisis realizado en el Trabajo A.

---

## 5. Roles y funcionalidades del sistema

| Rol | Trabajo A | Trabajo B (código verificado) | Estado |
|---|---|---|---|
| Candidato (applicant) | Definido como actor principal | Implementado: /register, /perfil, /psicometrico, /modulos/[id], /vacantes/[id], /evaluacion/[id], /resultado/[id] | COHERENTE |
| Administrador (admin) | Definido como actor secundario con acceso al panel de revisión | Implementado: /admin, /admin/attempts/[id], requireAdmin() | COHERENTE |
| Revisor (reviewer) | Definido en algunos CU como actor con permisos intermedios | Rol presente en profiles.role check pero NO implementado en user_roles | DISCREPANCIA D-04 |
| Asesor (advisor) | No definido como rol del sistema en Trabajo A | No existe como rol en el código | COHERENTE |

**Funcionalidades RF:**
- 18 RF definidos en Trabajo A → 18 RF verificados como implementados en el repositorio.
- Ver `02-matriz-requisitos-implementacion.md` para el detalle completo.

**Diagnóstico:** La discrepancia D-04 (rol reviewer no implementado en user_roles) debe mencionarse en el Trabajo B como una funcionalidad futura. El Trabajo A define el rol; el Trabajo B debe aclarar que quedó fuera del alcance del MVP.

---

## 6. Arquitectura del sistema

| Dimensión | Trabajo A | Trabajo B | Estado |
|---|---|---|---|
| Tipo de sistema | Aplicación web | Aplicación web | COHERENTE |
| Capa de presentación | No especifica framework (diseño de interfaces) | Next.js 16.1.1 con App Router | COHERENTE (B especifica) |
| Capa de datos | Base de datos relacional con 13 tablas | Supabase/PostgreSQL, 13 tablas confirmadas | COHERENTE |
| Autenticación | JWT declarado en el diseño | Supabase Auth con JWT, get_my_role() RPC | COHERENTE |
| Almacenamiento de archivos | Almacenamiento de evidencias (CV, diplomas) | Bucket "evidences" privado en Supabase Storage con signed URLs | COHERENTE |
| Seguridad de datos | RLS mencionado en diseño | RLS implementado en todas las tablas | COHERENTE |
| CURP | Almacenamiento de CURP como dato personal | HMAC-SHA256 — solo hash almacenado, no CURP en claro | DIFERENCIA DE IMPLEMENTACIÓN (mejora de seguridad) |

**Diagnóstico:** La arquitectura general es coherente. La diferencia en el manejo de CURP (hash vs. dato en claro) es una decisión de implementación que mejora la seguridad sobre lo diseñado. El Trabajo B debe documentar esto como decisión técnica justificada en el Cap. V.

---

## 7. Reglas de negocio

| Regla | Trabajo A (diseño) | Trabajo B (implementación) | Estado |
|---|---|---|---|
| RN-01: El candidato debe completar el psicométrico antes de acceder a evaluaciones | Definida | Implementada con redirect en /psicometrico | COHERENTE |
| RN-02: El candidato solo puede intentar cada módulo una vez | Definida | Implementada en guard de /evaluacion/[attemptId] | COHERENTE |
| RN-03: Candidatos con riesgo psicométrico no acceden a evaluaciones | Definida | DISCREPANCIA D-01: el guard solo verifica completed, no score | DISCREPANCIA |
| RN-04: Candidatos en lista negra no pueden postular | Definida | No existe tabla de lista negra; no implementada | DISCREPANCIA D-05 |
| RN-05 a RN-12 | Definidas en Trabajo A | Verificadas como implementadas | COHERENTE |

**Diagnóstico:** Las discrepancias D-01 y D-05 son las más relevantes para la coherencia académica. El Trabajo B debe documentarlas explícitamente como "diferencias entre diseño e implementación" en el Cap. V, con justificación técnica (MVP scope, complejidad adicional no incluida en la primera versión).

---

## 8. Estado de implementación del MVP

| Dimensión | Trabajo A | Trabajo B | Estado |
|---|---|---|---|
| Alcance declarado del MVP | Sistema funcional con módulos de evaluación, psicométrico, panel de revisión y postulación | Sistema funcional con los mismos módulos | COHERENTE |
| Funcionalidades fuera del MVP | 11 elementos de trabajo futuro identificados | Las mismas limitaciones reconocidas en el Cap. I (sección 1.6) | COHERENTE |
| Estado de despliegue | No especificado en Trabajo A | Desarrollo local confirmado; despliegue en producción no declarado | ACEPTABLE |

---

## 9. Limitaciones del MVP

| Limitación | Trabajo A | Trabajo B | Estado |
|---|---|---|---|
| Sin notificaciones automáticas | Listada como trabajo futuro (TF-01) | Listada en sección 1.6 | COHERENTE |
| Sin módulo de practical_tasks en admin | No explícitamente | Mencionado como tabla sin CRUD | TRABAJO B AMPLÍA |
| Sin rol reviewer implementado | Definido como futura extensión | Mencionado como inconsistencia conocida | COHERENTE |
| Sin estadísticas dinámicas | No explícitamente | Mencionado en limitaciones | TRABAJO B AMPLÍA |
| Sin middleware.ts de Next.js | No aplica (no es requisito de diseño) | Mencionado como decisión de implementación | TRABAJO B AMPLÍA |

---

## 10. Contradicciones que deben resolverse antes de la entrega

| ID | Contradicción | Acción en Trabajo B |
|---|---|---|
| C-01 | UCES no se define por su nombre completo en Cap. I y II del Trabajo B | Agregar "Universidad Capital de Estudios Superiores (UCES)" en sección 1.1 y 2.1 |
| C-02 | Metodología no declarada en Trabajo B | Declarar "prototipado evolutivo" en Cap. IV con referencia al Trabajo A |
| C-03 | D-01: guard no verifica score | Documentar en Cap. V como diferencia de implementación con justificación |
| C-04 | D-02: tabla reviews es primaria, no alternativa | Documentar en Cap. V con diagrama de flujo correcto |
| C-05 | Rol reviewer definido en diseño pero sin implementar | Mencionar en Cap. I sección 1.6 como fuera del alcance del MVP |
| C-06 | RN-04 (lista negra) no implementada | Mencionar en Cap. I sección 1.6 o en Cap. V como trabajo futuro |
| C-07 | Nombre del sistema difiere entre reportes | Nota aclaratoria en Cap. I: "el sistema se presenta bajo el nombre comercial UCES Plataforma de Talento" |

**C-01 y C-02 son obligatorias antes del siguiente corte de redacción.** Las demás (C-03 a C-07) corresponden al Cap. V y al cierre de la sección 1.6.

---

## 11. Afirmaciones del Trabajo B que dependen del Trabajo A

Las siguientes afirmaciones en el Trabajo B deben citarse como derivadas del análisis y diseño del Trabajo A:

1. La identificación de las tres necesidades organizacionales (Cap. II, sección 2.4) corresponde a requisitos formalizados en el Trabajo A.
2. La decisión de usar prototipado evolutivo fue tomada en el Trabajo A y adoptada en el desarrollo.
3. Los 18 RF implementados en el Trabajo B provienen directamente del catálogo de requisitos del Trabajo A.
4. El instrumento psicométrico de 20 ítems fue definido y documentado en el Trabajo A.
5. El modelo de datos de 13 tablas fue diseñado en el Trabajo A y se implementó con adecuaciones en el Trabajo B.

**Forma de citación recomendada en el Trabajo B:**
> "Según el análisis y diseño documentado en el Trabajo A de la presente residencia profesional..."

---

## 12. Conclusión del análisis de coherencia

Los dos reportes son académicamente complementarios y coherentes en sus dimensiones fundamentales:
- Mismo problema institucional, misma solución propuesta, mismo sistema implementado.
- El Trabajo A cubre análisis, diseño y modelado; el Trabajo B cubre desarrollo, implementación y pruebas.
- Las discrepancias detectadas (D-01, D-02, D-03, D-04, D-05) son diferencias entre diseño e implementación, no contradicciones entre los reportes; todas deben documentarse en el Cap. V del Trabajo B.

**El riesgo académico más alto es C-01** (nombre completo de UCES ausente). Los demás riesgos son manejables con adiciones acotadas en los capítulos correspondientes.
