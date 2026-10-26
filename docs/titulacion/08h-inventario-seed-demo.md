# 08h-inventario-seed-demo.md
# Corte 8H — Inventario completo de datos seed DEMO
**Fecha:** 2026-10-24

---

## 1. Módulos (4)

| ID (d100...) | Nombre | Descripción |
|--------------|--------|-------------|
| d1000000-0000-0000-0000-000000000001 | Ingeniería de Software | Proyectos de desarrollo de software a medida |
| d1000000-0000-0000-0000-000000000002 | Redes y Telecomunicaciones | Infraestructura de red y conectividad empresarial |
| d1000000-0000-0000-0000-000000000003 | Ciencia de Datos | Análisis, modelado y visualización de datos |
| d1000000-0000-0000-0000-000000000004 | Soporte y Operaciones TI | Atención a usuarios y gestión de incidencias |

---

## 2. Vacantes (10 + 1 psicométrico base)

| ID | Título | Módulo | Estado |
|----|--------|--------|--------|
| dv000000-...-001 | Desarrollador Web Full Stack Jr. | Ing. Software | open |
| dv000000-...-002 | Analista de Sistemas | Ing. Software | open |
| dv000000-...-003 | Administrador de Redes | Redes y Telecom | open |
| dv000000-...-004 | Especialista en Ciberseguridad | Redes y Telecom | open |
| dv000000-...-005 | Científico de Datos Jr. | Ciencia de Datos | open |
| dv000000-...-006 | Ingeniero de Machine Learning | Ciencia de Datos | open |
| dv000000-...-007 | Técnico de Soporte TI | Soporte y Ops | open |
| dv000000-...-008 | Coordinador de Operaciones TI | Soporte y Ops | open |
| dv000000-...-009 | Practicante en Desarrollo Backend | Ing. Software | open |
| dv000000-...-010 | Auxiliar Administrativo TI | Soporte y Ops | closed |
| f1000000-...-001 | Evaluación Psicométrica Institucional | — | open (fijo) |

---

## 3. Evaluaciones (5 + 1 psicométrico base)

| ID | Título | Vacante | Tipo |
|----|--------|---------|------|
| da000000-...-001 | Evaluación Full Stack Jr. | dv-001 | teórica |
| da000000-...-002 | Evaluación Analista Sistemas | dv-002 | teórica |
| da000000-...-003 | Evaluación Admin. Redes | dv-003 | teórica |
| da000000-...-004 | Evaluación Ciencia de Datos | dv-005 | teórica |
| da000000-...-005 | Evaluación Técnico Soporte | dv-007 | teórica |
| f2000000-...-001 | Mini Big Five Institucional | f1-001 | psicométrico (fijo) |

---

## 4. Preguntas por evaluación (5 preguntas × 5 evaluaciones = 25 + 20 psicométricas)

Cada evaluación demo tiene 5 preguntas de opción múltiple con 1 respuesta correcta (A).
El psicométrico base (f2000000-...-001) tiene los 20 ítems Likert Mini Big Five ya insertados por `seed.sql` productivo.

---

## 5. Tareas prácticas (6)

| Evaluación | Título tarea |
|-----------|--------------|
| da000000-...-001 | Implementar endpoint REST básico en Node.js |
| da000000-...-002 | Modelar diagrama entidad-relación para sistema de biblioteca |
| da000000-...-003 | Configurar VLAN en switch administrado (simulación) |
| da000000-...-004 | Análisis exploratorio de dataset con Python/Pandas |
| da000000-...-005 | Diagnóstico y resolución de incidencia de red |
| da000000-...-001 | Refactorizar componente React con hooks modernos |

---

## 6. Aplicaciones y flujos por candidato

### Psicométrico (7 aplicaciones → 7 intentos)

| Candidato Demo | Estado intento psicométrico | Score E | Score A | Score R | Score AP | Score EX |
|----------------|---------------------------|---------|---------|---------|----------|----------|
| 01 | completed | 18 | 16 | 17 | 15 | 14 |
| 02 | completed | 14 | 12 | 16 | 18 | 13 |
| 03 | completed | 12 | 15 | 14 | 16 | 11 |
| 04 | completed | 16 | 14 | 12 | 13 | 15 |
| 05 | completed | 17 | 16 | 15 | 14 | 12 |
| 06 | in_progress | — | — | — | — | — |
| 07 | in_progress | — | — | — | — | — |

### Vacantes reales (7 aplicaciones, Candidatos 01-05 + 2 extras)

| Candidato | Vacante | Estado app | Estado intento | Decision | Revisión |
|-----------|---------|------------|----------------|----------|----------|
| Demo 01 | Full Stack Jr. | in_review | completed | APPROVED | aprobado |
| Demo 02 | Full Stack Jr. | rejected | completed | REJECTED | rechazado |
| Demo 03 | Analista Sistemas | in_review | under_review | — | — |
| Demo 04 | Admin. Redes | in_review | in_progress | — | — |
| Demo 05 | Ciencia de Datos | pending | — | — | — |
| Demo 01 | Analista Sistemas | pending | — | — | — |
| Demo 03 | Soporte TI | pending | — | — | — |

---

## 7. Respuestas (answers)

- Candidato 01: 5 respuestas correctas (A) → theory_score = 100
- Candidato 02: 4 correctas (A) + 1 incorrecta (B) → theory_score = 80
- Candidato 03: 3 correctas (A) + 2 incorrectas → theory_score = 60

---

## 8. Evidencias (evidence_uploads)

| Candidato | Nombre archivo | Tipo MIME | Tamaño |
|-----------|---------------|-----------|--------|
| Demo 01 | cv-demo-01.pdf | application/pdf | ~512 KB |
| Demo 01 | diploma-demo-01.pdf | application/pdf | ~256 KB |
| Demo 02 | cv-demo-02.pdf | application/pdf | ~512 KB |
| Demo 02 | portafolio-demo-02.zip | application/zip | ~1 MB |
| Demo 03 | cv-demo-03.pdf | application/pdf | ~512 KB |
| Demo 03 | carta-recomendacion-03.pdf | application/pdf | ~128 KB |
| Demo 04 | cv-demo-04.pdf | application/pdf | ~512 KB |
| Demo 04 | certificado-demo-04.pdf | application/pdf | ~256 KB |

---

## 9. Revisiones administrativas (4)

| Candidato | Decisión | Comentario |
|-----------|----------|------------|
| Demo 01 | APPROVED | Perfil adecuado. Puntaje teórico alto y psicométrico equilibrado. |
| Demo 02 | REJECTED | Puntaje insuficiente y perfil de riesgo en Estabilidad Emocional. |
| Demo 01 (2ª app) | — | Pendiente revisión |
| Demo 03 | — | Pendiente revisión |

---

## 10. Notas de implementación

- **UUIDs**: Los IDs de candidatos en `03-seed-flujos.sql` son variables (`v_uuid_c01..c12`) que deben
  sustituirse con los UUIDs reales del `.demo-uuids.json` generado por `06-crear-usuarios.js`.
- **Columna `comments`**: Las revisiones usan `comments`, NO `notes` (INC-6B-02 documentada).
- **psychometric_summary**: JSONB con estructura `{scores: {E, A, R, AP, EX}, profile: "..."}`.
- **Hash CURP**: Llave `DEMO_CURP_KEY_2026` (solo para proyecto DEMO, nunca para producción).
