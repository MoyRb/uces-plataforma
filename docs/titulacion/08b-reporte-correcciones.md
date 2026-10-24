# Reporte de correcciones aplicadas — Corte 8B

**Fecha:** 2026-10-23
**Alcance:** Correcciones a los capítulos I, III, V y VI. Correcciones bibliográficas. Generación de entregables.
**Archivos respaldados en:** `docs/titulacion/respaldo-pre-8b/`

---

## 1. Correcciones de inconsistencias críticas (IC)

### IC-01 — §6.6.2: Conteo de APROBADO corregido a 16

| Campo | Detalle |
|---|---|
| Archivo | `capitulos/06-pruebas-resultados.md` |
| Sección | §6.6.2 Calidad del sistema |
| Texto anterior | `14 casos APROBADOS (63.6%), 2 APROBADOS PARCIAL (9.1%), 3 PARCIAL sin endpoint (13.6%), 1 BLOQUEADO (4.5%), 0 FALLIDOS.` |
| Texto corregido | `16 casos APROBADOS (72.7%), 2 APROBADOS PARCIAL (9.1%), 3 PARCIAL sin endpoint (13.6%), 1 BLOQUEADO (4.5%), 0 FALLIDOS.` |
| Justificación | CP-18 (Estadísticas, APROBADO) y CP-19 (Detalle admin, APROBADO) fueron omitidos del conteo original. Documentado en `07-conciliacion-pruebas.md`. Aritmética verificada: 16+2+3+1=22 ✓ |
| Estado | CORREGIDO |

---

### IC-02 — Nota interna "Corte 6A" eliminada de Cap. VI

| Campo | Detalle |
|---|---|
| Archivo | `capitulos/06-pruebas-resultados.md` |
| Sección | Inicio del capítulo (línea 3 antes de la corrección) |
| Texto anterior | `> **Estado:** Corte 6A — Secciones 6.1 a 6.4 redactadas. Secciones 6.5 (ejecución) y 6.6 (análisis) se redactarán en el Corte 6B una vez que los casos de prueba hayan sido ejecutados con el sistema en marcha.` |
| Texto corregido | Línea eliminada por completo |
| Justificación | Nota de trabajo interno del proceso de redacción. No debe aparecer en el documento académico final. |
| Estado | CORREGIDO |

---

### IC-03 — Nota interna "Corte 5A/5B" eliminada de Cap. V

| Campo | Detalle |
|---|---|
| Archivo | `capitulos/05-desarrollo-implementacion.md` |
| Sección | Inicio del capítulo (líneas 3-5 antes de la corrección) |
| Texto anterior | `> **Nota de estructura:** Este capítulo se divide en dos partes. Las secciones 5.1 a 5.8 (Corte 5A) documentan la arquitectura del sistema y los módulos del flujo del candidato. Las secciones 5.9 a 5.13 (Corte 5B) documentan el panel administrativo, la seguridad, el módulo psicométrico, las diferencias entre diseño e implementación, y las conclusiones del capítulo.` |
| Texto corregido | Línea eliminada por completo |
| Justificación | Nota de trabajo interno del proceso de redacción. No debe aparecer en el documento académico final. |
| Estado | CORREGIDO |

---

### IC-04 — §6.4.1 Grupo A: CP-02 diferenciado en CP-02a y CP-02b

| Campo | Detalle |
|---|---|
| Archivo | `capitulos/06-pruebas-resultados.md` |
| Sección | §6.4.1 Resumen de casos de prueba, tabla de grupos |
| Texto anterior | `| A — Registro y autenticación | CP-01, CP-02, CP-03 | RF-01, RF-02 | Registro de candidato, inicio de sesión, protección de rutas admin |` |
| Texto corregido | `| A — Registro y autenticación | CP-01, CP-02a, CP-02b, CP-03 | RF-01, RF-02 | Registro de candidato (CP-02a: CURP duplicada; CP-02b: inicio de sesión exitoso), protección de rutas admin |` |
| Justificación | La tabla §6.5.3 lista CP-02a y CP-02b por separado. El Grupo A debe ser consistente con la nomenclatura usada en la ejecución. |
| Estado | CORREGIDO |

---

### IC-05 — §1.7 Cap. I: Descripción de Cap. VI corregida

| Campo | Detalle |
|---|---|
| Archivo | `capitulos/01-introduccion-generalidades.md` |
| Sección | §1.7 Organización del documento |
| Texto anterior | `los resultados del checklist de extremo a extremo definido en el repositorio` |
| Texto corregido | `los resultados de los 22 casos de prueba ejecutados sobre el sistema activo` |
| Justificación | No existe un "checklist en el repositorio". El plan de pruebas está en `docs/titulacion/06-plan-pruebas.md`, no en el repositorio de código. La descripción correcta hace referencia a los 22 casos de prueba documentados en el Cap. VI. |
| Estado | CORREGIDO |

---

### IC-06 — §3.8.3 Cap. III: Asociación Mini-IPIP aclarada como comparación estructural

| Campo | Detalle |
|---|---|
| Archivo | `capitulos/03-marco-teorico.md` |
| Sección | §3.8.3 Implementación en UCES Plataforma de Talento |
| Texto anterior | `Esta estructura es consistente con versiones reducidas del Big Five, como el Mini-IPIP de 20 ítems desarrollado por Donnellan et al. (2006), aunque el instrumento específico utilizado fue proporcionado por personal del área de Recursos Humanos de UCES y su ficha de validación no está disponible en el expediente técnico del proyecto.` |
| Texto corregido | `Esta estructura es consistente, en número de ítems y organización por dimensiones, con versiones reducidas del Big Five como el Mini-IPIP de 20 ítems de Donnellan et al. (2006). Esta semejanza estructural es una referencia de comparación y no implica que el instrumento utilizado sea el Mini-IPIP ni ninguna otra versión publicada del modelo: el cuestionario fue proporcionado por personal del área de Recursos Humanos de UCES con la denominación "TEST MINI BIG FIVE", y su origen, proceso de adaptación y propiedades psicométricas formales no están disponibles en el expediente técnico del proyecto.` |
| Justificación | El texto original podía interpretarse como una identificación del instrumento con el Mini-IPIP de Donnellan. La corrección establece explícitamente que la semejanza es estructural y que el instrumento es distinto al Mini-IPIP publicado. |
| Estado | CORREGIDO |

---

## 2. Correcciones de inconsistencias menores (IM)

### IM-01 — Versión de Node.js

| Estado | Sin corrección requerida |
|---|---|
| Justificación | El texto dice "versión ^20 según `package.json`", lo cual es técnicamente preciso. La ejecución real con Node.js 22.22.2 no contradice el texto. |

### IM-02 — Conteo de endpoints

| Estado | Sin corrección requerida |
|---|---|
| Justificación | Cap. V y Cap. VI §6.4.1 son consistentes en el conteo de 13 route handlers. |

### IM-03 — "Funcional" → "Adecuada" en §3.8.3

| Campo | Detalle |
|---|---|
| Archivo | `capitulos/03-marco-teorico.md` |
| Sección | §3.8.3 Implementación en UCES Plataforma de Talento |
| Texto anterior | `entre 11 y 15 como "Adecuada" o "Funcional"` |
| Texto corregido | `entre 11 y 15 como "Adecuada"` |
| Justificación | La implementación en `lib/psicometricoResults.ts` usa exclusivamente "Adecuada". Los capítulos V, VI y VII son consistentes con "Adecuada". La palabra "Funcional" era un remanente de una versión anterior de la clasificación. |
| Estado | CORREGIDO |

### IM-04 — Sigla MVP no redefinida en Cap. II

| Estado | Sin corrección requerida |
|---|---|
| Justificación | MVP se define correctamente en Cap. I §1.1. El uso en Cap. II sin redefinición es una práctica aceptable de escritura académica. |

### IM-05 — Uso mixto de "cuestionario" e "instrumento"

| Estado | Recomendación registrada; no aplicada extensamente |
|---|---|
| Justificación | El uso mixto es coherente en contexto. La corrección extensiva de este término en todos los capítulos no está justificada como corrección de contenido y podría alterar la voz del texto. Se recomienda al autor normalizar en la revisión final si el asesor lo solicita. El primer uso en cada capítulo ya introduce "instrumento psicométrico institucional" correctamente. |

---

## 3. Correcciones editoriales (E)

| ID | Descripción | Estado |
|---|---|---|
| E-01 | Nota "Corte 6A" en Cap. VI | CORREGIDO (IC-02) |
| E-02 | Nota "Corte 5A/5B" en Cap. V | CORREGIDO (IC-03) |
| E-03 | "Funcional" en §3.8.3 | CORREGIDO (IM-03) |
| E-04 | APROBADO=14 en §6.6.2 | CORREGIDO (IC-01) |
| E-05 | CP-02 sin sufijo a/b en §6.4.1 | CORREGIDO (IC-04) |
| E-06 | "checklist en repositorio" en §1.7 | CORREGIDO (IC-05) |
| E-07 | Mini-IPIP presentado como equivalencia | CORREGIDO (IC-06) |
| E-08 | Sin sección de referencias | RESUELTO — `referencias/bibliografia-final.md` creado |
| E-09 | ASCII art Fig. 5.1 requiere imagen | PENDIENTE — requiere maquetación (Corte 8C) |

---

## 4. Correcciones bibliográficas

| ID | Detalle |
|---|---|
| C-BIB-01 | B-30 "Twelve-Factor App, 2017" corregido a "Wiggins, A. (2011)" |
| C-BIB-02 | B-04 URL de React 19 blog post actualizada (PENDIENTE de confirmación final) |

---

## 5. Entregables generados en el Corte 8B

| Archivo | Descripción | Estado |
|---|---|---|
| `referencias/bibliografia-final.md` | 33 referencias en APA 7, orden alfabético | CREADO |
| `08b-validacion-referencias.md` | Estado de verificación por referencia | CREADO |
| `preliminares/resumen.md` | Resumen académico ~290 palabras | CREADO |
| `preliminares/abstract.md` | Abstract en inglés académico | CREADO |
| `diagramas/exportados/*.png` | 6 diagramas Mermaid exportados a PNG | CREADO |
| `diagramas/exportados/*.svg` | 6 diagramas Mermaid exportados a SVG | CREADO |
| `08b-reporte-correcciones.md` | Este archivo | CREADO |
| `08b-control-calidad.md` | Tabla consolidada de hallazgos | CREADO |
| `respaldo-pre-8b/` | 4 archivos respaldados antes de correcciones | CREADO |

---

## 6. Archivos NO modificados

Los siguientes archivos fueron explícitamente NO modificados en el Corte 8B:

- `capitulos/02-contexto-organizacional.md` — sin correcciones pendientes
- `capitulos/04-metodologia-desarrollo.md` — sin correcciones pendientes
- `capitulos/07-conclusiones-trabajo-futuro.md` — sin correcciones pendientes
- Ningún archivo de código de la aplicación (`my-app/`, `supabase/`)
- Base de datos, despliegue en Vercel, historial de Git
