# Plan de Paginación — Reporte de Residencias Profesionales

**Proyecto:** UCES Plataforma de Talento (MVP)
**Objetivo:** ~150 páginas totales
**Formato de referencia:** hoja carta, fuente 12pt, interlineado 1.5, márgenes estándar

---

## Distribución por sección

| Sección | Páginas estimadas | Acumulado |
|---|---|---|
| Portada, firmas, resumen ejecutivo, índices | 8 | 8 |
| Capítulo 1 — Introducción | 8 | 16 |
| Capítulo 2 — Contexto organizacional | 10 | 26 |
| Capítulo 3 — Marco teórico | 22 | 48 |
| Capítulo 4 — Análisis y diseño | 28 | 76 |
| Capítulo 5 — Desarrollo del sistema | 50 | 126 |
| Capítulo 6 — Pruebas | 12 | 138 |
| Capítulo 7 — Conclusiones | 8 | 146 |
| Referencias bibliográficas | 3 | 149 |
| Anexos | variable (~15) | ~164 |

---

## Desglose del Capítulo 5 (el más extenso)

El capítulo de desarrollo es el núcleo del reporte y debe representar el trabajo técnico realizado. Se sugiere la siguiente distribución interna:

| Sección | Contenido principal | Páginas |
|---|---|---|
| 5.1 Entorno de desarrollo | Estructura de directorios, variables de entorno, stack | 3 |
| 5.2 Base de datos | Schema con diagramas, tablas, RLS, migraciones | 8 |
| 5.3 Autenticación y registro | Flujo de registro CURP, login, resolución de rol | 5 |
| 5.4 Módulo candidato | Panel, módulos, vacantes, perfil | 6 |
| 5.5 Módulo de evaluación | Temporizador, guardado, evidencia, submit | 8 |
| 5.6 Módulo psicométrico | Mini Big Five, seed, scoring, restricción previa | 8 |
| 5.7 Panel administrativo | CRUD, revisión de intentos, decisión, storage | 10 |
| 5.8 Storage | Bucket, políticas, URLs firmadas | 2 |
| **Total Cap. 5** | | **50** |

---

## Elementos gráficos recomendados por capítulo

### Capítulo 3 — Marco teórico
- Diagrama del ciclo de renderizado de Next.js (Server Component vs. Client Component)
- Diagrama de capas de seguridad de Supabase (Auth → JWT → RLS → DB)
- Representación gráfica del modelo Big Five con descripción de rasgos

### Capítulo 4 — Análisis y diseño
- Diagrama de casos de uso (candidato y administrador)
- Diagrama Entidad-Relación completo (13 tablas)
- Diagrama de componentes de la arquitectura
- Flujograma de resolución de rol (get_my_role con fallback)
- Diagrama de flujo de la aplicación del candidato (pantalla a pantalla)
- Diagrama del flujo de decisión administrativa

### Capítulo 5 — Desarrollo del sistema
- Captura de pantalla: landing page `/`
- Captura de pantalla: formulario de registro `/register`
- Captura de pantalla: formulario de login `/login`
- Captura de pantalla: panel del candidato `/panel` (con módulos)
- Captura de pantalla: lista de vacantes `/modulos/[id]`
- Captura de pantalla: detalle de vacante `/vacantes/[id]`
- Captura de pantalla: evaluación con temporizador `/evaluacion/[id]`
- Captura de pantalla: psicométrico Mini Big Five en pantalla
- Captura de pantalla: página de resultado `/resultado/[id]`
- Captura de pantalla: perfil del candidato `/perfil`
- Captura de pantalla: panel administrativo — resumen `/admin`
- Captura de pantalla: panel administrativo — módulos
- Captura de pantalla: panel administrativo — vacantes
- Captura de pantalla: panel administrativo — evaluaciones/preguntas
- Captura de pantalla: revisión de intento `/admin/attempts/[id]`
- Captura de pantalla: resumen psicométrico en admin
- Fragmentos de código clave: `get_my_role()`, `hashCurpHmac`, `calculatePsicometricoSummary`, `requireAdmin`, ejemplo de política RLS

### Capítulo 6 — Pruebas
- Tabla de casos de prueba con resultado esperado y resultado observado
- Capturas de pantalla de flujos completados exitosamente

---

## Notas para la redacción

1. **Fragmentos de código:** Incluir únicamente los fragmentos más representativos o las decisiones de diseño no obvias. No pegar archivos completos en el cuerpo del texto; para eso están los anexos.

2. **Figuras y tablas:** Cada figura y tabla debe tener número y pie de figura/tabla. Las figuras se numeran consecutivamente por capítulo (Figura 5.1, Figura 5.2, etc.).

3. **Citas de código:** Cuando se explique una decisión técnica, citar el archivo y número de línea, no solo describir. Por ejemplo: "Como se observa en `lib/curp.ts` (línea 5), el hash se genera con HMAC-SHA256 usando un secreto de entorno."

4. **Modo de escritura:** Tercera persona o impersonal. No usar "yo implementé" sino "se implementó" o "el sistema implementa".

5. **Diferenciación MVP:** Ser explícito sobre qué funcionalidades corresponden al MVP entregado y cuáles quedan como trabajo futuro. Esto es especialmente relevante para `practical_tasks` sin CRUD en admin y el rol `reviewer` sin implementar.

6. **Estadísticas decorativas:** Los valores 12 vacantes / 38 postulantes / 9 en revisión de la landing page son datos estáticos de demostración visual. No presentarlos como métricas reales del sistema.

---

## Estimación de horas de redacción por capítulo

| Capítulo | Horas estimadas |
|---|---|
| Cap. 1 — Introducción | 4 |
| Cap. 2 — Contexto organizacional | 6 |
| Cap. 3 — Marco teórico | 14 |
| Cap. 4 — Análisis y diseño | 16 |
| Cap. 5 — Desarrollo del sistema | 24 |
| Cap. 6 — Pruebas | 8 |
| Cap. 7 — Conclusiones | 4 |
| Referencias y anexos | 6 |
| Revisión y formato final | 8 |
| **Total** | **~90 horas** |
