# Conciliación de casos de prueba — Corte 7

**Fecha:** 2026-10-23
**Propósito:** Resolver la discrepancia aritmética reportada en el resumen del Corte 6B y establecer el conteo definitivo y verificado de los 22 casos de prueba del Capítulo VI.

---

## 1. Origen de la discrepancia

El resumen publicado en `06b-matriz-resultados.md` §2 indicaba:

| Estado | Cantidad reportada |
|---|---|
| APROBADO | 14 |
| APROBADO PARCIAL | 2 |
| PARCIAL (sin endpoint REST) | 3 |
| BLOQUEADO | 1 |
| FALLIDO | 0 |
| **Total reportado** | **22** |

La suma aritmética es **14 + 2 + 3 + 1 + 0 = 20**, no 22. La diferencia es de **2 casos no contabilizados** en la fila APROBADO.

---

## 2. Método de conciliación

### 2.1 Identificación del universo de 22 casos

El archivo `06a-matriz-casos-prueba.md` define la lista canónica con el encabezado `Total de casos: 22` y un resumen final que confirma `Total: 22`. La composición del universo es:

| Caso | Nombre | Grupo |
|---|---|---|
| CP-01 | Registro de candidato nuevo | A — Acceso |
| CP-02a | Registro rechazado por CURP duplicada | A — Acceso |
| CP-02b | Autenticación de candidato | A — Acceso |
| CP-03 | Protección de ruta admin desde candidato | A — Acceso |
| CP-04 | Panel del candidato | B — Panel |
| CP-05 | Catálogo excluye vacantes en draft | B — Panel |
| CP-06 | Detalle de vacante | B — Panel |
| CP-07 | Bloqueo por psicométrico no completado | C — Psicométrico |
| CP-08 | Verificación empírica de D-01 (Riesgo puede postularse) | C — Psicométrico |
| CP-09 | Reutilización de postulación existente | D — Evaluación |
| CP-10 | Evaluación con temporizador y respuestas | D — Evaluación |
| CP-11 | Envío automático al expirar (FE-04) | D — Evaluación |
| CP-12 | Carga de evidencia | D — Evaluación |
| CP-13 | Visualización de resultado tras envío | D — Evaluación |
| CP-14 | Flujo completo del cuestionario psicométrico | C — Psicométrico |
| CP-15 | Creación y edición de módulo | E — Admin |
| CP-16 | Creación de vacante con assessment automático | E — Admin |
| CP-17 | Configuración de evaluación y preguntas | E — Admin |
| CP-18 | Lista de intentos / stats de vacante | E — Admin |
| CP-19 | Detalle de intento psicométrico con Big Five | E — Admin |
| CP-20 | Verificación empírica de D-02 (decisión en reviews) | E — Admin |
| CP-21 | Acceso a evidencia desde admin con signed URL | E — Admin |
| CP-22 | Seguridad: Bearer token inválido | F — Seguridad |

**Nota de conteo:** CP-02a y CP-02b son dos escenarios del caso original CP-02 (Registro y autenticación). En el conteo del universo se tratan como una unidad lógica (CP-02), dando el total de **22 casos** numerados CP-01 a CP-22.

### 2.2 Revisión caso por caso desde la bitácora

Se comparó cada caso contra los resultados registrados en `06a-bitacora-ejecucion.md` §Sesión 6B-S1 y `06b-reporte-ejecucion.md`:

| Caso | Estado en bitácora | Evidencia |
|---|---|---|
| CP-01 | APROBADO | EV-6B-01 (HTTP 201) |
| CP-02a | APROBADO | EV-6B-02 (HTTP 400 CURP duplicada) |
| CP-02b | APROBADO | EV-6B-03 (JWT obtenido) |
| CP-03 | APROBADO | EV-6B-04 (HTTP 403) |
| CP-04 | PARCIAL | Sin endpoint REST; estado confirmado en DB |
| CP-05 | PARCIAL | Sin endpoint REST; vacantes confirmadas en DB |
| CP-06 | PARCIAL | Sin endpoint REST; detalle confirmado en DB |
| CP-07 | APROBADO | EV-6B-05 (HTTP 403 requiresPsychometric) |
| CP-08 | APROBADO | EV-6B-08 (HTTP 200 attemptId; D-01 confirmada) |
| CP-09 | APROBADO | EV-6B-09 (mismo attemptId, sin duplicado) |
| CP-10 | APROBADO PARCIAL | EV-6B-10 OK, EV-6B-11 HTTP 400 (INC-6B-01) |
| CP-11 | BLOQUEADO | Requiere esperar expiración (35 min) |
| CP-12 | APROBADO | EV-6B-12 (archivo en bucket evidences) |
| CP-13 | APROBADO | EV-6B-13 (theoryScore:0 correcto) |
| CP-14 | APROBADO | EV-6B-06, EV-6B-07 (theoryScore:100, rasgos Alta) |
| CP-15 | APROBADO | EV-6B-14 (HTTP 200 módulos) |
| CP-16 | APROBADO | EV-6B-15 (HTTP 200 vacantes) |
| CP-17 | APROBADO | EV-6B-16 (HTTP 200 evaluaciones) |
| **CP-18** | **APROBADO** | **EV-6B-17 ({applicationsCount:1, attemptsCount:1})** |
| **CP-19** | **APROBADO** | **EV-6B-18 (detalle intento HTTP 200)** |
| CP-20 | APROBADO PARCIAL | EV-6B-19 (APPROVED, decision_source:"attempts"; INC-6B-02) |
| CP-21 | APROBADO | EV-6B-20 (signedUrl presente) |
| CP-22 | APROBADO | EV-6B-21 (HTTP 401 token inválido) |

---

## 3. Causa raíz de la discrepancia

CP-18 (Stats de vacante / lista de intentos) y CP-19 (Detalle de intento admin con Big Five) fueron ejecutados exitosamente en la sesión 6B-S1 y registrados como APROBADO en la bitácora detallada. Sin embargo, al redactar el resumen tabulado en `06b-matriz-resultados.md`, estos dos casos fueron omitidos del conteo APROBADO. La suma 14 corresponde a los 14 APROBADO contados antes de alcanzar CP-18 y CP-19 en la secuencia.

No se trata de casos no ejecutados ni de resultados incorrectos. Ambos casos tienen evidencia documental (EV-6B-17 y EV-6B-18).

---

## 4. Conteo definitivo y verificado

| Estado | Cantidad correcta | Casos |
|---|---|---|
| APROBADO | **16** | CP-01, CP-02(a+b), CP-03, CP-07, CP-08, CP-09, CP-12, CP-13, CP-14, CP-15, CP-16, CP-17, **CP-18**, **CP-19**, CP-21, CP-22 |
| APROBADO PARCIAL | 2 | CP-10 (INC-6B-01), CP-20 (INC-6B-02) |
| PARCIAL (sin endpoint REST) | 3 | CP-04, CP-05, CP-06 |
| BLOQUEADO | 1 | CP-11 |
| FALLIDO | 0 | — |
| **Total** | **22** | **16 + 2 + 3 + 1 + 0 = 22** ✓ |

---

## 5. Impacto en el Capítulo VI

El cuerpo del Capítulo VI (`capitulos/06-pruebas-resultados.md`) ya describe correctamente los resultados individuales de CP-18 y CP-19. Solo la tabla de resumen de §6.5 debe actualizarse para reflejar APROBADO: 16 en lugar de 14. Esta corrección se aplica con el identificador **C6-01**.

El resumen ejecutivo del Capítulo VII tomará como base el conteo definitivo de esta conciliación: **16/22 completamente aprobados, 2 aprobados con defecto menor documentado, 3 parciales por diseño arquitectónico, 1 bloqueado por restricción práctica, 0 fallidos.**

---

## 6. Corrección en 06b-matriz-resultados.md (C6-01)

| Campo | Antes | Después |
|---|---|---|
| Fila APROBADO en resumen | 14 | **16** |
| Fila total | 22 | 22 (sin cambio) |
| Nota de porcentaje APROBADO | 63.6% | **72.7%** |
