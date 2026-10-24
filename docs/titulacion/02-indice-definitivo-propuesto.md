# Índice definitivo propuesto — Trabajo B

**Trabajo:** "Desarrollo e implementación de una plataforma de reclutamiento para UCES"
**Autor:** Moisés Ruiz Bernal
**Fecha:** 2026-10-22
**Versión:** 1.0 (posterior al análisis del documento compañero)

---

## Principios de estructura

1. **No duplicar** el contenido del Trabajo A. El Trabajo B referencia al Trabajo A en lugar de reproducir: catálogo de requisitos, diagramas UML, modelo de datos, casos de uso, interfaces diseñadas.
2. **El Trabajo B aporta** lo que el Trabajo A no tiene: código fuente, decisiones de implementación, diferencias diseño/código, pruebas funcionales, instrucciones de despliegue.
3. **El Cap. III del Trabajo B** (Marco teórico) cubre tecnologías de implementación (Next.js, Supabase, RLS, JWT, TypeScript) que el Trabajo A no desarrolla. No repetir las teorías de análisis y diseño que ya están en el Cap. II del Trabajo A (metodologías, UML, bases de datos relacionales).
4. **El Cap. IV del Trabajo B** describe la metodología de desarrollo (prototipado evolutivo aplicado) con énfasis en las iteraciones de código, no en la fase de análisis.

---

## Índice propuesto

### Portada y elementos preliminares (~3 páginas)
- Portada institucional
- Carta de adscripción [EV-01]
- Agradecimientos (opcional, 1 página)
- Índice general

---

### Índice de figuras y tablas (~1 página)

---

### Resumen ejecutivo (~1 página)
- Descripción del proyecto en no más de 300 palabras
- Tecnologías principales
- Resultado obtenido (MVP funcional con X módulos)

---

### Capítulo I — Introducción y generalidades del proyecto (~11 páginas)
> Archivo: `capitulos/01-introduccion-generalidades.md` — REDACTADO

| Sección | Contenido | Páginas est. |
|---|---|---|
| 1.1 Antecedentes | Contexto del problema de reclutamiento en UCES; definición de UCES (nombre completo) | 2 |
| 1.2 Descripción general del proyecto | Sistema, stack tecnológico, MVP, nombre "UCES Plataforma de Talento" | 2 |
| 1.3 Objetivo general | Una sola oración | 0.5 |
| 1.4 Objetivos específicos | OE-01 a OE-07 con descripción breve | 1.5 |
| 1.5 Justificación | Necesidad organizacional, beneficios del sistema | 2 |
| 1.6 Alcance y limitaciones | MVP scope, limitaciones explícitas, fuera del alcance | 2 |
| 1.7 Organización del documento | Mapa de capítulos | 1 |
| **Total Cap. I** | | **~11** |

**Pendiente:** Actualizar sección 1.1 con el nombre completo de UCES.

---

### Capítulo II — Contexto organizacional (~11 páginas)
> Archivo: `capitulos/02-contexto-organizacional.md` — REDACTADO

| Sección | Contenido | Páginas est. |
|---|---|---|
| 2.1 Descripción de la organización receptora | UCES, área de RH, ubicación [EV-01] | 1.2 |
| 2.2 Función del área de recursos humanos | Proceso de reclutamiento y selección | 1.2 |
| 2.3 Procedimiento previo al sistema | Flujo manual paso a paso | 1.6 |
| 2.4 Necesidades identificadas | Las tres necesidades: psicométrico, evaluación, panel | 1.6 |
| 2.5 Actores del proyecto | Desarrollador, área de RH, asesores [EV-01] | 1.2 |
| 2.6 Propuesta de transformación | Cómo el sistema atiende las necesidades | 1.9 |
| 2.7 Alcance organizacional | Condiciones de adopción, restricciones | 1.6 |
| 2.8 Conclusiones del capítulo | Síntesis y proyección al marco teórico | 1.2 |
| **Total Cap. II** | | **~11** |

**Pendiente:** Actualizar sección 2.1 con el nombre completo de UCES.

---

### Capítulo III — Marco teórico (~18 páginas)
> Archivo: `capitulos/03-marco-teorico.md` — PENDIENTE

**Diferenciación con el Trabajo A:** El Trabajo A (Cap. II) cubre: proceso de reclutamiento, sistemas de información, metodologías, UML, BD relacionales, UX, seguridad web. El Trabajo B NO repite esas teorías. El Cap. III del Trabajo B cubre exclusivamente las tecnologías de implementación.

| Sección | Contenido | Páginas est. |
|---|---|---|
| 3.1 Next.js y el modelo App Router | Server Components, Client Components, routing, SSR vs. CSR, API Routes | 3 |
| 3.2 Supabase como BaaS | PostgreSQL gestionado, Supabase Auth, Supabase Storage, SDK JavaScript | 3 |
| 3.3 Autenticación basada en JWT | Mecanismo JWT, sesiones, refresh tokens, claims personalizados | 2 |
| 3.4 Row Level Security (RLS) | Políticas de seguridad a nivel de fila, funciones security definer | 2 |
| 3.5 TypeScript en proyectos full-stack | Tipado estático, inferencia, tipos generados desde Supabase | 2 |
| 3.6 Tailwind CSS y componentes con shadcn/ui | Utilidades CSS, Radix UI primitives, accesibilidad | 1.5 |
| 3.7 Modelo psicométrico Big Five | Cinco Grandes factores, dimensiones, aplicaciones en RH, Mini-IPIP | 2.5 |
| 3.8 Protección de datos personales (CURP) | HMAC-SHA256, hashing irreversible, cumplimiento LFPDPPP | 2 |
| **Total Cap. III** | | **~18** |

**Nota:** La sección 3.7 (Big Five) es el único desarrollo teórico del modelo psicométrico en ambos reportes. El Trabajo A no lo desarrolla, solo lo menciona. Esta sección es exclusiva del Trabajo B.

---

### Capítulo IV — Metodología de desarrollo (~14 páginas)
> Archivo: `capitulos/04-metodologia.md` — PENDIENTE

| Sección | Contenido | Páginas est. |
|---|---|---|
| 4.1 Selección de la metodología | Prototipado evolutivo: justificación, criterios de selección | 2 |
| 4.2 Descripción del prototipado evolutivo | Ciclo de vida, iteraciones, validación continua | 2 |
| 4.3 Herramientas del entorno de desarrollo | Git, GitHub, VS Code, Node.js, Supabase CLI, Vercel (si aplica) | 2 |
| 4.4 Iteraciones del proyecto | Descripción de cada iteración: sprint/prototipo con alcance y resultado | 4 |
| 4.5 Control de versiones y trazabilidad | Estrategia de ramas, commits, relación commit-funcionalidad | 2 |
| 4.6 Gestión de la base de datos en desarrollo | Migraciones, schema.sql, seed.sql, entornos local/producción | 2 |
| **Total Cap. IV** | | **~14** |

---

### Capítulo V — Desarrollo e implementación (~40 páginas)
> Archivo: `capitulos/05-desarrollo-implementacion.md` — PENDIENTE

Este es el capítulo central del Trabajo B. Documenta el código implementado por módulo, justifica decisiones técnicas y registra diferencias con el diseño del Trabajo A.

| Sección | Contenido | Páginas est. |
|---|---|---|
| 5.1 Arquitectura de la solución | Diagrama de capas (presentación, lógica, datos), flujo de requests | 3 |
| 5.2 Estructura del proyecto | Árbol de directorios comentado: app/, lib/, supabase/, components/ | 2 |
| 5.3 Módulo de autenticación y perfiles | /login, /register, lib/auth.ts, profiles, user_roles, get_my_role() | 4 |
| 5.4 Módulo psicométrico (Big Five) | /psicometrico, lib/psicometrico.ts, lib/psicometricoResults.ts, estructura JSONB | 5 |
| 5.5 Módulo de vacantes y postulaciones | /vacantes/[id], applications, lógica de postulación | 3 |
| 5.6 Módulo de evaluación de conocimientos | /modulos/[moduleId], /evaluacion/[attemptId], temporizador, attempts, answers | 5 |
| 5.7 Módulo de resultados | /resultado/[attemptId], cálculo de score, retroalimentación | 2 |
| 5.8 Panel administrativo | /admin, /admin/attempts/[id], requireAdmin(), lib/supabaseServer.ts | 4 |
| 5.9 Seguridad: RLS y políticas de acceso | Políticas por tabla, funciones security definer, bucket privado | 4 |
| 5.10 Protección de CURP | lib/curp.ts, HMAC-SHA256, CURP_HASH_SECRET, justificación legal | 2 |
| 5.11 Diferencias entre diseño e implementación | D-01, D-02, D-03, D-04, D-05 documentadas con justificación | 4 |
| 5.12 Funcionalidades implementadas sin requisito explícito | RLS avanzada, requireAdmin(), estructura JSONB psicométrica, hash CURP | 2 |
| **Total Cap. V** | | **~40** |

---

### Capítulo VI — Pruebas y resultados (~18 páginas)
> Archivo: `capitulos/06-pruebas-resultados.md` — PENDIENTE

| Sección | Contenido | Páginas est. |
|---|---|---|
| 6.1 Estrategia de pruebas | Tipos de pruebas realizadas: funcionales, de integración, manuales | 2 |
| 6.2 Casos de prueba — Módulo de autenticación | Registro, login, permisos, roles | 2 |
| 6.3 Casos de prueba — Módulo psicométrico | Flujo completo, cálculo de scores, clasificación | 3 |
| 6.4 Casos de prueba — Módulo de evaluación | Temporizador, guard de intento único, corrección automática | 3 |
| 6.5 Casos de prueba — Panel administrativo | Acceso con requireAdmin(), revisión de intentos, decisiones | 2 |
| 6.6 Resultados de las pruebas | Tabla de casos: ID, descripción, entrada, resultado esperado, resultado real, estado | 3 |
| 6.7 Verificación de indicadores de hipótesis | I-1 (centralización), I-2 (tiempo de revisión), I-3 (satisfacción RH) — estado de cada uno | 3 |
| **Total Cap. VI** | | **~18** |

**Nota sobre hipótesis:** I-1 puede verificarse por diseño (el sistema centraliza información). I-2 e I-3 requieren medición con usuarios reales. En el MVP, se reportarán como "pendientes de validación post-implementación" con propuesta de instrumento de medición.

---

### Capítulo VII — Conclusiones y trabajo futuro (~8 páginas)
> Archivo: `capitulos/07-conclusiones.md` — PENDIENTE

| Sección | Contenido | Páginas est. |
|---|---|---|
| 7.1 Conclusiones del proyecto | Verificación de objetivos OE-01 a OE-07, uno por uno | 3 |
| 7.2 Contribuciones del Trabajo B | Lo que este reporte aporta sobre el Trabajo A | 1 |
| 7.3 Limitaciones del MVP | Síntesis de las limitaciones documentadas en 1.6 y 5.11 | 1.5 |
| 7.4 Trabajo futuro | Los 11 elementos identificados en el Trabajo A + los hallazgos propios | 2 |
| 7.5 Reflexión del desarrollador | Aprendizajes técnicos y del proceso | 0.5 |
| **Total Cap. VII** | | **~8** |

---

### Referencias bibliográficas (~3 páginas)
- Documentación oficial de Next.js, Supabase, TypeScript
- Fuentes del modelo Big Five (McCrae & Costa, Mini-IPIP)
- Referencias académicas de seguridad web, RLS, JWT
- El Trabajo A se cita como: Arciniega Robles, F.D. (2026). *Análisis y diseño de una plataforma de reclutamiento para UCES*. Reporte de residencias profesionales. Universidad Capital de Estudios Superiores.

---

### Anexos (~5 páginas)
- Anexo A: Fragmentos de código relevantes (lib/curp.ts, lib/psicometricoResults.ts)
- Anexo B: Esquema de base de datos (schema.sql resumido)
- Anexo C: Captura de pantallas del sistema funcional
- Anexo D: Carta de adscripción [EV-01] (cuando disponible)

---

## Resumen de distribución de páginas

| Sección | Páginas estimadas |
|---|---|
| Portada y preliminares | 3 |
| Índice de figuras y tablas | 1 |
| Resumen ejecutivo | 1 |
| Cap. I — Introducción | 11 |
| Cap. II — Contexto organizacional | 11 |
| Cap. III — Marco teórico | 18 |
| Cap. IV — Metodología | 14 |
| Cap. V — Desarrollo e implementación | 40 |
| Cap. VI — Pruebas y resultados | 18 |
| Cap. VII — Conclusiones | 8 |
| Referencias | 3 |
| Anexos | 5 |
| **TOTAL** | **~133** |

**Rango objetivo:** 125-150 páginas. El índice actual proyecta ~133 páginas, dentro del rango.

---

## Diferenciación clara respecto al Trabajo A

El Trabajo B NO reproduce los siguientes elementos del Trabajo A:
- Catálogo completo de RF, RNF, RN, CU (los referencia, no los reproduce)
- 9 diagramas UML (clases, secuencia, actividad, CU) — el Trabajo B puede incluir uno o dos diagramas de arquitectura propios
- Modelo ER detallado de 13 tablas — el Trabajo B describe las tablas desde la perspectiva de implementación
- Diseños de las 15 interfaces de usuario — el Trabajo B muestra capturas del sistema implementado
- Marco teórico de análisis y diseño (UML, metodologías clásicas, BD relacionales)

El Trabajo B APORTA sobre el Trabajo A:
- Código fuente documentado y justificado
- Decisiones técnicas no previstas en el diseño (HMAC-SHA256, RLS security definer, estructura JSONB)
- Diferencias entre el diseño y la implementación con justificación
- Pruebas funcionales con casos documentados
- Verificación de los indicadores de hipótesis
- Instrucciones de configuración y despliegue
