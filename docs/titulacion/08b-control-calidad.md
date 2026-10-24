# Control de calidad — Corte 8B

**Fecha:** 2026-10-23
**Propósito:** Tabla consolidada de todos los hallazgos del proceso de auditoría (Corte 8A) con estado actualizado tras las correcciones del Corte 8B.

---

## 1. Tabla de hallazgos — estado actualizado

### Inconsistencias críticas

| ID | Descripción | Archivo | Estado Corte 8A | Estado Corte 8B |
|---|---|---|---|---|
| IC-01 | §6.6.2: conteo APROBADO = 14 en lugar de 16 | `06-pruebas-resultados.md` | PENDIENTE | **CORREGIDO** |
| IC-02 | Nota interna "Estado: Corte 6A" en Cap. VI | `06-pruebas-resultados.md` | PENDIENTE | **CORREGIDO** |
| IC-03 | Nota interna "Nota de estructura: Corte 5A/5B" en Cap. V | `05-desarrollo-implementacion.md` | PENDIENTE | **CORREGIDO** |
| IC-04 | §6.4.1 Grupo A lista "CP-02" sin diferenciar CP-02a/CP-02b | `06-pruebas-resultados.md` | PENDIENTE | **CORREGIDO** |
| IC-05 | §1.7 describe Cap. VI con referencia a "checklist en el repositorio" inexistente | `01-introduccion-generalidades.md` | PENDIENTE | **CORREGIDO** |
| IC-06 | §3.8.3 asocia el instrumento con Mini-IPIP como equivalencia | `03-marco-teorico.md` | PENDIENTE | **CORREGIDO** |

**Resultado: 6/6 inconsistencias críticas CORREGIDAS.**

---

### Inconsistencias menores

| ID | Descripción | Estado Corte 8A | Estado Corte 8B |
|---|---|---|---|
| IM-01 | Versión de Node.js — texto preciso, sin corrección requerida | No aplica | **SIN CORRECCIÓN REQUERIDA** |
| IM-02 | Conteo de endpoints — consistente entre caps. V y VI | No aplica | **SIN CORRECCIÓN REQUERIDA** |
| IM-03 | "Funcional" vs. "Adecuada" en §3.8.3 | PENDIENTE | **CORREGIDO** |
| IM-04 | MVP sin redefinir en Cap. II — práctica académica aceptable | No aplica | **SIN CORRECCIÓN REQUERIDA** |
| IM-05 | Uso mixto "cuestionario"/"instrumento" | PENDIENTE | **RECOMENDACIÓN REGISTRADA — no aplicada extensamente** |

**Resultado: 1/5 correcciones menores aplicadas (IM-03); 3 confirmadas como sin corrección requerida; 1 como recomendación para revisión del autor.**

---

### Problemas editoriales

| ID | Descripción | Estado Corte 8A | Estado Corte 8B |
|---|---|---|---|
| E-01 | Nota "Corte 6A" en inicio de Cap. VI | PENDIENTE | **CORREGIDO** |
| E-02 | Nota "Corte 5A/5B" en inicio de Cap. V | PENDIENTE | **CORREGIDO** |
| E-03 | "Funcional" en §3.8.3 (ligado a IM-03) | PENDIENTE | **CORREGIDO** |
| E-04 | APROBADO=14 en §6.6.2 (ligado a IC-01) | PENDIENTE | **CORREGIDO** |
| E-05 | CP-02 sin sufijo en §6.4.1 (ligado a IC-04) | PENDIENTE | **CORREGIDO** |
| E-06 | "checklist en repositorio" en §1.7 (ligado a IC-05) | PENDIENTE | **CORREGIDO** |
| E-07 | Mini-IPIP como equivalencia en §3.8.3 (ligado a IC-06) | PENDIENTE | **CORREGIDO** |
| E-08 | Sin sección de referencias bibliográficas | PENDIENTE | **RESUELTO** — `referencias/bibliografia-final.md` |
| E-09 | Fig. 5.1 en ASCII art — debe convertirse a imagen | PENDIENTE | **PENDIENTE** — requiere Corte 8C |

**Resultado: 8/9 problemas editoriales resueltos; 1 (E-09) requiere maquetación.**

---

### Problemas bibliográficos

| ID | Descripción | Estado Corte 8A | Estado Corte 8B |
|---|---|---|---|
| BIB-01 | No existe sección de referencias | PENDIENTE | **RESUELTO** |
| BIB-02 | URLs sin fecha de acceso | PENDIENTE | **PENDIENTE** — agregar en versión final |
| BIB-03 | RFC 2616 obsoleto | PENDIENTE | **ACEPTADO** — referencia histórica válida |
| BIB-04 | SEGOB 2024 — referencia imprecisa | PENDIENTE | **PENDIENTE** — requiere verificación manual |
| BIB-05 | "Twelve-Factor App, 2017" — año incorrecto | PENDIENTE | **CORREGIDO** — Wiggins (2011) |
| BIB-06 | Clariana & Wallace — verificar pertinencia | PENDIENTE | **PENDIENTE** — requiere verificación |
| BIB-07 | Nielsen Norman Group — sin recurso específico | PENDIENTE | **PENDIENTE** — requiere identificar artículo |
| BIB-08 | "Funcional" en Cap. III (no afecta referencias) | PENDIENTE | **CORREGIDO** (IM-03) |
| BIB-09 | Arciniega Robles — datos sin verificar | PENDIENTE | **PENDIENTE** — requiere leer PDF manualmente |
| BIB-10 | Muñiz 2010 — artículo vs. libro | PENDIENTE | **RESUELTO** — artículo es aceptable |

---

## 2. Nuevo conteo de palabras (post-Corte 8B)

| Capítulo | Palabras antes (8A) | Palabras después (8B) | Diferencia | Causa |
|---|---|---|---|---|
| I | 3,030 | 3,031 | +1 | Ajuste mínimo de texto en §1.7 |
| II | 3,043 | 3,043 | 0 | Sin cambios |
| III | 6,945 | 6,984 | +39 | IC-06: texto aclaratorio más extenso en §3.8.3 |
| IV | 4,740 | 4,740 | 0 | Sin cambios |
| V | 11,804 | 11,747 | -57 | IC-03: eliminación de nota interna (~37 palabras) |
| VI | 3,137 | 3,106 | -31 | IC-02: eliminación de nota interna (~33 palabras) |
| VII | 3,827 | 3,827 | 0 | Sin cambios |
| **Total** | **36,526** | **36,478** | **-48** | Neto: eliminaciones superan adiciones |

> La reducción de 48 palabras es íntegramente atribuible a la eliminación de notas de trabajo internas (IC-02, IC-03). No se eliminó contenido académico. La adición en Cap. III (+39) mejoró la precisión académica del §3.8.3.

---

## 3. Estado de los diagramas Mermaid

| Archivo .mmd | Estado | Archivos exportados |
|---|---|---|
| `05a/fig-5-2-secuencia-registro.mmd` | VERIFICADO | `exportados/fig-5-2-secuencia-registro.png` + `.svg` |
| `05a/fig-5-3-secuencia-postulacion.mmd` | VERIFICADO | `exportados/fig-5-3-secuencia-postulacion.png` + `.svg` |
| `05a/fig-5-4-secuencia-evidencias.mmd` | VERIFICADO | `exportados/fig-5-4-secuencia-evidencias.png` + `.svg` |
| `05b/fig-5-5-persistencia-decisiones.mmd` | VERIFICADO | `exportados/fig-5-5-persistencia-decisiones.png` + `.svg` |
| `05b/fig-5-6-flujo-requireAdmin.mmd` | VERIFICADO | `exportados/fig-5-6-flujo-requireAdmin.png` + `.svg` |
| `05b/fig-5-7-inicio-psicometrico.mmd` | VERIFICADO | `exportados/fig-5-7-inicio-psicometrico.png` + `.svg` |

Herramienta: `@mermaid-js/mermaid-cli` v12.0.0 vía `npx`. Los archivos `.mmd` originales se conservan sin modificación como fuente editable.

---

## 4. Verificación de coherencia post-correcciones

| Verificación | Resultado |
|---|---|
| Conteo APROBADO en §6.6.2 (16) coincide con tabla §6.5.3 | OK ✓ |
| Conteo APROBADO en §6.6.2 (16) coincide con Cap. VII §7.5 | OK ✓ |
| Conteo APROBADO en §6.6.2 (16) coincide con `07-conciliacion-pruebas.md` | OK ✓ |
| Clasificación psicométrica "Adecuada" consistente en Caps. III, V, VI, VII | OK ✓ |
| Notas internas de cortes eliminadas de Caps. V y VI | OK ✓ |
| §1.7 describe correctamente los 22 casos de prueba del Cap. VI | OK ✓ |
| Mini-IPIP en §3.8.3 presentado como comparación estructural | OK ✓ |
| CP-02a/CP-02b en §6.4.1 consistente con §6.5.3 | OK ✓ |

---

## 5. Pendientes para Corte 8C (maquetación)

| # | Tarea | Prioridad |
|---|---|---|
| 1 | Obtener 21 capturas de pantalla Categoría A (ver `08a-plan-evidencias.md`) | Alta |
| 2 | Confirmar plantilla institucional Word de UCES | Alta |
| 3 | Reemplazar ASCII art Fig. 5.1 con imagen vectorial (E-09) | Media |
| 4 | Agregar leyendas formales "Tabla X.Y." y "Figura X.Y." en cada elemento | Media |
| 5 | Verificar 5 referencias PENDIENTE (B-04, B-15, B-20, B-26, B-33) | Media |
| 6 | Agregar fechas de acceso a URLs en bibliografía | Baja |
| 7 | Maquetar documento Word completo (ver `08a-plan-maquetacion.md`) | Alta — es el objetivo del corte |
| 8 | Generar índices automáticos (general, figuras, tablas) en Word | Alta |
| 9 | Exportar PDF final | Alta |

---

## 6. Resumen ejecutivo del Corte 8B

| Indicador | Valor |
|---|---|
| Inconsistencias críticas corregidas | **6/6** |
| Inconsistencias menores aplicadas | **1/5** (3 no requerían corrección; 1 como recomendación) |
| Problemas editoriales resueltos | **8/9** (1 pendiente para Corte 8C) |
| Problemas bibliográficos resueltos | **3/10** (5 pendientes de verificación manual; 2 aceptados) |
| Palabras totales (7 capítulos) | **36,478** |
| Diagramas exportados | **6 PNG + 6 SVG** |
| Archivos de respaldo creados | **4** (en `respaldo-pre-8b/`) |
| Resumen y Abstract redactados | **Sí** (español e inglés) |
| Bibliografía consolidada | **Sí** (33 entradas APA 7) |
| ¿Listo para Corte 8C (capturas + maquetación)? | **SÍ** — con las capturas pendientes como condición para el cuerpo del Cap. V y VI |
