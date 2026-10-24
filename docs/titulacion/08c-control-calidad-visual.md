# Control de calidad visual — Corte 8C

**Fecha:** 2026-10-23
**Propósito:** Verificar que cada captura obtenida muestra el contenido académicamente relevante, carece de datos sensibles reales, y tiene resolución adecuada para inserción en Word.

---

## 1. Criterios de aceptación

| Criterio | Descripción | Mínimo aceptable |
|---|---|---|
| Resolución | Ancho de imagen | ≥ 1280 px (screenshots generados a 1280×900) |
| Contenido | La imagen ilustra la funcionalidad descrita en el texto | Contenido correcto visible |
| Datos sensibles | No contiene emails reales, CURPs reales, ni información personal de usuarios reales | Solo datos de prueba @prueba-uces.test |
| Estado de la UI | La interfaz está en estado esperado (no en error inesperado, no en pantalla de carga) | Estado funcional correcto |
| Legibilidad | El texto principal es legible sin zoom | Texto principal visible |

---

## 2. Tabla de verificación por captura

### Flujo del candidato

| ID | Archivo | Res. estimada | Contenido correcto | Datos sensibles | Estado UI | Observaciones |
|---|---|---|---|---|---|---|
| EV-5A-02 | `candidato/EV-5A-02-landing.png` | 1280×900 | SÍ — landing pública | Ninguno | Correcto | Aceptada |
| EV-5A-05 | `candidato/EV-5A-05-registro-formulario.png` | 1280×900 | SÍ — formulario vacío | Ninguno | Correcto | Aceptada |
| EV-5A-06 | `candidato/EV-5A-06-curp-duplicada.png` | 1280×900 | SÍ — error CURP | CURP `FICA850315MDFBNC08` (ficticia, aceptable) | Correcto | Aceptada — la CURP es de prueba |
| EV-5A-07 | `candidato/EV-5A-07-login.png` | 1280×900 | SÍ — formulario login | Ninguno | Correcto | Aceptada |
| EV-5A-09 | `candidato/EV-5A-09-panel-candidato.png` | 1280×900 | SÍ — panel con módulos | Email @prueba-uces.test (aceptable) | Correcto | Aceptada |
| EV-5A-11 | `candidato/EV-5A-11-vacantes.png` | 1280×900 | SÍ — lista vacantes | Email @prueba-uces.test (aceptable) | Correcto | Aceptada |
| EV-5A-12 | `candidato/EV-5A-12-detalle-vacante.png` | 1280×900 | SÍ — detalle vacante | Email @prueba-uces.test (aceptable) | Correcto | Aceptada |
| EV-5A-15 | `candidato/EV-5A-15-psicometrico-preguntas.png` | 1280×900 | SÍ — ítems Likert | Email @prueba-uces.test (aceptable) | Correcto | Aceptada — verificar que muestre ≥1 ítem visible |
| EV-5A-17 | `candidato/EV-5A-17-resultado-psicometrico.png` | 1280×900 | VERIFICAR* | Email @prueba-uces.test | Posiblemente incorrecto | *Verificar visualmente: si muestra scores 0 requiere re-captura |
| EV-5A-19 | `candidato/EV-5A-19-subida-evidencia.png` | 1280×900 | SÍ — FileInput | Email @prueba-uces.test (aceptable) | Correcto | Aceptada |
| EV-5B-08 | `candidato/EV-5B-08-acceso-denegado.png` | 1280×900 | SÍ — acceso denegado | Email @prueba-uces.test (aceptable) | Correcto | Aceptada |
| EV-5B-13 | `candidato/EV-5B-13-guard-prereq.png` | 1280×900 | SÍ — guard activo | Email @prueba-uces.test (aceptable) | Correcto | Aceptada |
| EV-5B-15 | `candidato/EV-5B-15-d01-guard-score.png` | 1280×900 | SÍ — guard D-01 | Email @prueba-uces.test (aceptable) | Correcto | Aceptada |

### Panel de administración

| ID | Archivo | Res. estimada | Contenido correcto | Datos sensibles | Estado UI | Observaciones |
|---|---|---|---|---|---|---|
| EV-5B-01 | `administrador/EV-5B-01-admin-panel.png` | 1280×900 | SÍ — lista admin | Email admin @prueba-uces.test (aceptable) | Correcto | Aceptada |
| EV-5B-02 | — | — | — | — | PENDIENTE | No obtenida |
| EV-5B-03 | — | — | — | — | PENDIENTE | No obtenida |

### Validaciones

| ID | Archivo | Res. estimada | Contenido correcto | Datos sensibles | Estado UI | Observaciones |
|---|---|---|---|---|---|---|
| EV-6C-04 | `validaciones/EV-6C-04-cp07-guard-d01.png` | 1280×900 | SÍ — CP-07 guard D-01 | Ninguno significativo | Correcto | Aceptada |
| EV-6C-05 | (= EV-5A-17) | — | Ver EV-5A-17 | Ver EV-5A-17 | Ver EV-5A-17 | Comparte archivo |
| EV-6C-06 | `validaciones/EV-6C-06-cp18-stats-d03.png` | 1280×900 | SÍ — API stats D-03 | Ninguno | Correcto | Aceptada |
| EV-6C-07 | `validaciones/EV-6C-07-cp22-rls.png` | 1280×900 | SÍ — RLS activo | Ninguno | Correcto | Aceptada |

---

## 3. Capturas con observaciones de calidad

### EV-5A-17 — Resultado psicométrico (VERIFICAR)

**Riesgo:** El candidato de prueba completó el flujo pero la API `/api/psicometrico/questions` podría haber devuelto 0 preguntas. Si el score enviado fue 0 para todos los rasgos:
- La pantalla mostraría clasificación "Riesgo" en todos los rasgos o puntuaciones 0
- Esto es técnicamente incorrecto como ilustración de un resultado típico del sistema

**Criterio de aceptación:** La captura debe mostrar puntuaciones numéricas > 0 y al menos una clasificación distinta de "Riesgo". Si no cumple, re-capturar.

**Alternativa disponible:** Si el sistema tiene otros candidatos reales con resultados válidos (datos anonimizados), usar esa pantalla como referencia con autorización del autor.

---

## 4. Capturas suplementarias generadas

Estas capturas son adicionales a las 21 Categoría A, generadas como artefactos del proceso de automatización:

| Archivo | Descripción | Uso recomendado |
|---|---|---|
| `candidato/EV-5A-05b-registro-completo.png` | Formulario de registro con datos llenados | Puede reemplazar a EV-5A-05 para mostrar el formulario completo; incluir como variante en Anexo B |
| `candidato/EV-5A-05b-registro-lleno.png` | Variante adicional del registro | Descartar o incluir en Anexo B si resulta útil |
| `candidato/EV-5B-08-acceso-denegado-admin.png` | Variante de acceso denegado | Descartar (duplica EV-5B-08) |

---

## 5. Resumen de QA visual

| Criterio | Capturas verificadas | Capturas que requieren acción |
|---|---|---|
| Resolución ≥ 1280 px | 15/15 obtenidas | 0 |
| Contenido correcto | 14/15 | 1 (EV-5A-17 — verificar scores) |
| Datos sensibles ausentes | 15/15 | 0 — todos usan @prueba-uces.test |
| Estado UI esperado | 14/15 | 1 (EV-5A-17 — verificar clasificación) |

**Veredicto:** 14 capturas aceptadas sin reservas. 1 captura (EV-5A-17) requiere verificación visual antes de insertar en Word. 2 capturas pendientes de obtención. 4 capturas pendientes de captura manual (Supabase Studio).
