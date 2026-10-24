# Índice maestro consolidado — Propuesta de estructura final

**Fecha:** 2026-10-23
**Versión:** 1.0 (Corte 8A — para revisión antes de maquetación)
**Documento:** "Desarrollo e implementación de una plataforma web de reclutamiento universitario mediante prototipado evolutivo"
**Autor:** [Nombre del estudiante]
**Institución:** Universidad Capital de Estudios Superiores (UCES), Zamora, Michoacán
**Programa:** [Nombre del programa]

---

## PÁGINAS PRELIMINARES

```
Portada ............................................................ i
Hoja de identificación y firmas .................................... ii
Agradecimientos .................................................... iii
Resumen ............................................................ iv
Abstract ........................................................... v
Índice general ..................................................... vi–viii
Índice de figuras .................................................. ix
Índice de tablas ................................................... x
```

---

## CAPÍTULO I. INTRODUCCIÓN Y GENERALIDADES

```
1.1  Antecedentes .................................................. 1
1.2  Nombre del sistema y contexto de desarrollo ................... 2
1.3  Planteamiento del problema .................................... 3
1.4  Objetivos del trabajo terminal ................................ 4
     1.4.1  Objetivo general ....................................... 4
     1.4.2  Objetivos específicos .................................. 4
1.5  Justificación ................................................. 5
1.6  Alcance y limitaciones ........................................ 6
1.7  Descripción del contenido por capítulo ........................ 7
```

*Páginas estimadas: 10–12*

---

## CAPÍTULO II. CONTEXTO ORGANIZACIONAL

```
2.1  Descripción de la institución (UCES) .......................... 9
2.2  Misión y visión ............................................... 10
2.3  Proceso de reclutamiento actual ............................... 10
2.4  Problemática identificada ..................................... 11
2.5  Relación con el Trabajo A (Arciniega Robles, 2026) ............ 12
```

*Páginas estimadas: 10–12*

---

## CAPÍTULO III. MARCO TEÓRICO

```
3.1  Sistemas de información web ................................... 14
3.2  Arquitecturas de aplicaciones web modernas .................... 15
     3.2.1  Modelo cliente-servidor ................................ 15
     3.2.2  Arquitectura de tres capas ............................. 16
3.3  Tecnologías de desarrollo utilizadas .......................... 17
     3.3.1  Next.js y React ....................................... 17
     3.3.2  TypeScript ............................................. 18
     3.3.3  Tailwind CSS y shadcn/ui ............................... 18
     3.3.4  Supabase (PostgreSQL, Auth, Storage) ................... 18
     3.3.5  Vercel como plataforma de despliegue ................... 19
3.4  Bases de datos relacionales y seguridad ....................... 20
     3.4.1  Row Level Security (RLS) ............................... 20
     3.4.2  JSON Web Tokens (JWT) .................................. 21
3.5  Protección de datos personales ................................ 21
     3.5.1  HMAC-SHA256 para CURP .................................. 21
     3.5.2  Doce factores (Twelve-Factor App) ...................... 22
3.6  Reclutamiento y selección de personal ......................... 22
3.7  Diseño centrado en el usuario (UX) ............................ 23
3.8  Evaluación psicométrica ....................................... 24
     3.8.1  Modelo de los Cinco Grandes (Big Five) ................. 24
     3.8.2  Mini-IPIP y versiones reducidas del Big Five ........... 25
     3.8.3  Instrumento psicométrico institucional ................. 25
     3.8.4  Escalas Likert y puntuación ............................ 26
3.9  Requisitos de software y especificación ...................... 27
     3.9.1  Requisitos funcionales y no funcionales ................ 27
     3.9.2  Casos de uso ........................................... 27
```

*Páginas estimadas: 23–26*

---

## CAPÍTULO IV. METODOLOGÍA

```
4.1  Enfoque metodológico: prototipado evolutivo ................... 29
4.2  Ciclo de desarrollo aplicado .................................. 30
4.3  Entorno de desarrollo ......................................... 31
     4.3.1  Variables de entorno y configuración ................... 31
     4.3.2  Control de versiones (Git/GitHub) ...................... 32
4.4  Iteraciones de desarrollo ..................................... 32
     4.4.1  Iteración 1 — Andamiaje (Dic. 30 2025) ................ 32
     4.4.2  Iteración 2 — Flujo candidato (Dic. 31 2025) .......... 33
     4.4.3  Iteración 3 — Roles reales (Feb. 17 2026) ............. 33
     4.4.4  Iteración 4 — Panel admin (Feb. 18 2026) .............. 34
     4.4.5  Iteración 5 — Estabilización (Feb. 18 2026) ........... 34
     4.4.6  Iteración 6 — Revisión admin (Feb. 18 2026) ........... 35
     4.4.7  Iteración 7 — Módulo psicométrico (Mar. 4 2026) ....... 35
     4.4.8  Iteración 8 — Ajuste final (May. 8–20 2026) ........... 36
4.5  Gestión de problemas técnicos ................................. 36
     4.5.1  T-01: Parámetros asíncronos en Next.js ................. 37
     4.5.2  T-02: Circularidad en políticas RLS .................... 37
     4.5.3  T-03: Tipado de relaciones en Supabase ................. 38
     4.5.4  T-04: psychometric_summary en attempts ................. 38
     4.5.5  T-05: Tipo ReviewDecision .............................. 38
4.6  Instrumentos de documentación ................................ 39
4.7  Relación entre el Trabajo A y el Trabajo B .................... 39
4.8  Síntesis metodológica ......................................... 40
```

*Páginas estimadas: 18–22*

---

## CAPÍTULO V. DESARROLLO E IMPLEMENTACIÓN

```
5.1  Arquitectura del sistema ...................................... 42
     5.1.1  Estructura del repositorio (monorepo) .................. 42
     5.1.2  Diagrama de arquitectura de tres capas (Fig. 5.1) ...... 43
     5.1.3  Componentes principales del sistema (Tabla 5.1) ........ 43
     5.1.4  Capas del sistema: Trabajo A vs. Trabajo B (Tabla 5.2) . 44
5.2  Infraestructura y configuración ............................... 45
     5.2.1  Clientes de Supabase (browser/server) .................. 45
     5.2.2  Variables de entorno (Tabla 5.3) ....................... 46
     5.2.3  Esquema de base de datos — 13 tablas (Tabla 5.4) ....... 46
5.3  Módulo de registro de candidatos .............................. 48
     5.3.1  Flujo de registro (Fig. 5.2) ........................... 48
     5.3.2  Autenticación con Supabase Auth ........................ 49
5.4  Módulo de panel del candidato ................................. 50
5.5  Módulo de perfil del candidato ................................ 51
5.6  Módulo de postulación ......................................... 51
     5.6.1  Flujo de postulación (Fig. 5.3) ........................ 51
     5.6.2  Almacenamiento de la postulación ....................... 52
5.7  Módulo de evaluación psicométrica ............................. 53
     5.7.1  Instrumento y preguntas ............................... 53
     5.7.2  Scoring: calculatePsicometricoSummary() ................ 54
5.8  Módulo de subida de evidencias ................................ 55
     5.8.1  Flujo de almacenamiento (Fig. 5.4) ..................... 55
     5.8.2  Bucket privado y URLs firmadas ......................... 56
5.9  Módulo de administración ...................................... 57
     5.9.1  Panel de administración ................................ 57
     5.9.2  Route handlers de administración (13 endpoints) ........ 58
     5.9.3  Flujo de persistencia de decisiones (Fig. 5.5) ......... 59
5.10 Control de acceso y autorización ............................. 60
     5.10.1 requireAdmin() — verificación de JWT (Fig. 5.6) ........ 60
     5.10.2 Políticas RLS por tabla (Tabla 5.5) .................... 61
5.11 Módulo psicométrico avanzado .................................. 62
     5.11.1 Prerequisito de evaluación (guard) ..................... 62
     5.11.2 ensurePsicometricoAttempt() (Fig. 5.7) ................. 63
5.12 Discrepancias entre diseño e implementación ................... 64
     5.12.1 D-01: Guard verifica completitud, no score ............. 64
     5.12.2 D-02: upsertReview y mismatch de esquema ............... 65
     5.12.3 D-03: Endpoint de estadísticas incompleto .............. 65
     5.12.4 D-04: Rol reviewer inoperativo ......................... 66
     5.12.5 D-05: Lista de exclusión no implementada ............... 66
     5.12.6 Discrepancias D-01..D-05 (Tabla 5.6) ................... 67
5.13 Análisis de trazabilidad de requisitos ........................ 67
     5.13.1 RF implementados sin discrepancia (Tabla 5.7) .......... 67
     5.13.2 RF con discrepancias (Tabla 5.8) ....................... 68
     5.13.3 Funcionalidades emergentes (Tabla 5.9) ................. 68
```

*Páginas estimadas: 45–52*

---

## CAPÍTULO VI. PRUEBAS Y RESULTADOS

```
6.1  Introducción al plan de pruebas ............................... 70
6.2  Estrategia de pruebas ......................................... 71
     6.2.1  Tipos de prueba (Tabla 6.1) ............................ 71
     6.2.2  Criterios de aceptación (Tabla 6.2) .................... 71
     6.2.3  Verificaciones estáticas (Tabla 6.3) ................... 72
6.3  Entorno de pruebas ............................................ 72
     6.3.1  Entorno local (Tabla 6.4) .............................. 72
     6.3.2  Entorno de producción (Tabla 6.5) ...................... 73
     6.3.3  Roles de prueba (Tabla 6.6) ............................ 73
     6.3.4  Datos de prueba mínimos (Tabla 6.7) .................... 73
     6.3.5  Herramientas de apoyo (Tabla 6.8) ...................... 74
6.4  Diseño de casos de prueba ..................................... 74
     6.4.1  Resumen de casos por grupo (Tabla 6.9) ................. 74
     6.4.2  Prioridad de ejecución (Tabla 6.10) .................... 75
     6.4.3  Casos para verificación de discrepancias (Tabla 6.11) .. 75
6.5  Ejecución de pruebas .......................................... 76
     6.5.1  Condiciones de ejecución ............................... 76
     6.5.2  Entorno utilizado ...................................... 76
     6.5.3  Resultados por caso de prueba (Tabla 6.12) ............. 77
6.6  Análisis de resultados ........................................ 80
     6.6.1  Resumen ejecutivo de resultados ........................ 80
     6.6.2  Métricas de aprobación ................................. 80
     6.6.3  Verificación de discrepancias (Tabla 6.13) ............. 81
     6.6.4  Incidencias detectadas (INC-6B-01, INC-6B-02) .......... 82
     6.6.5  Conclusión del capítulo ................................ 82
```

*Páginas estimadas: 20–24*

---

## CAPÍTULO VII. CONCLUSIONES, DISCUSIÓN Y TRABAJO FUTURO

```
7.1  Síntesis del proyecto ......................................... 84
7.2  Evaluación del objetivo general ............................... 85
7.3  Cumplimiento de objetivos específicos (Tabla 7.1) ............. 85
7.4  Resultados de la implementación ............................... 87
     7.4.1  Requisitos funcionales (Tablas 7.2 y 7.3) .............. 87
     7.4.2  Funcionalidades emergentes ............................. 88
7.5  Resultados de las pruebas ..................................... 88
     7.5.1  Desempeño general ...................................... 88
     7.5.2  Comportamiento del sistema ............................. 89
     7.5.3  Resultados por estado (Tablas 7.4 y 7.5) ............... 89
7.6  Limitaciones del trabajo ...................................... 90
7.7  Competencias profesionales desarrolladas ...................... 91
7.8  Trabajo futuro y recomendaciones .............................. 91
     7.8.1  Recomendaciones prioritarias (P1) ...................... 91
     7.8.2  Mejoras funcionales (P2) ............................... 92
     7.8.3  Mejoras a largo plazo (P3) ............................. 93
7.9  Reflexión final ............................................... 93
```

*Páginas estimadas: 13–16*

---

## REFERENCIAS BIBLIOGRÁFICAS

```
Referencias ........................................................ 95–98
```

*(33 entradas, orden alfabético APA 7; ver lista en `08a-revision-bibliografica.md`)*

---

## GLOSARIO DE TÉRMINOS

```
Glosario ........................................................... 99–101
```

*(Términos técnicos y acrónimos: MVP, RF, CP, D-xx, RLS, JWT, HMAC, Big Five, Prototipado evolutivo, Supabase, Next.js, App Router, Route Handler, RPC, CURP)*

---

## ANEXOS

```
Anexo A. Requisitos funcionales del Trabajo A ...................... 103–106
Anexo B. Matriz de trazabilidad completa ........................... 107–110
Anexo C. Discrepancias D-01..D-05 — análisis técnico detallado ..... 111–113
Anexo D. Diagramas Mermaid exportados (Fig. 5.2–5.7) ............... 114–119
Anexo E. Capturas de pantalla del sistema .......................... 120–133
Anexo F. Evidencias de pruebas — respuestas API (selección) ........ 134–140
```

*Páginas estimadas: 38 (con capturas Categoría A y B)*

---

## Resumen de paginación proyectada

| Sección | Páginas mínimas | Páginas máximas |
|---|---|---|
| Preliminares | 8 | 9 |
| Capítulo I | 10 | 12 |
| Capítulo II | 10 | 12 |
| Capítulo III | 23 | 26 |
| Capítulo IV | 18 | 22 |
| Capítulo V | 45 | 52 |
| Capítulo VI | 20 | 24 |
| Capítulo VII | 13 | 16 |
| Referencias | 3 | 4 |
| Glosario | 2 | 3 |
| Anexos | 29 | 39 |
| **TOTAL** | **181** | **219** |

> El documento supera ampliamente la meta mínima de 150 páginas. Un rango de 181–219 páginas es apropiado para un trabajo terminal de ingeniería de 7 capítulos con nivel de detalle técnico como el presente.

---

## Notas para el autor

1. Los números de página en este índice son **aproximados**. Los números reales se generarán automáticamente al crear el índice en Word.
2. Las secciones marcadas como "§X.X" en los capítulos corresponden directamente a las entradas de este índice.
3. Los títulos de tablas y figuras en este índice son los definitivos y deben coincidir exactamente con los pies de tabla/figura en el documento Word.
4. Si la institución requiere que la bibliografía aparezca al final de cada capítulo (en lugar de una lista consolidada), ajustar la estructura y omitir la sección "Referencias bibliográficas" central.
