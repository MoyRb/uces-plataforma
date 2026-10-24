# Auditoría integral — Corte 8A

**Fecha:** 2026-10-23
**Fuente:** Revisión completa de los 7 capítulos, documentos de auditoría del Corte 5C al 7, y verificación cruzada con código fuente.
**Alcance:** Coherencia inter-capítulos, conteo de pruebas, validación de objetivos, problemas editoriales.

---

## 1. Estado académico de los siete capítulos

| Cap. | Título | Palabras | Estado | Observaciones principales |
|---|---|---|---|---|
| I | Introducción y generalidades | 3 030 | COMPLETO | Objetivos bien formulados; §1.7 describe Cap. VI con imprecisión menor |
| II | Contexto organizacional | 3 043 | COMPLETO | Evidencias institucionales [EV-01, EV-06] marcadas como pendientes; apropiado y honesto |
| III | Marco teórico | 6 945 | COMPLETO | Más denso y referenciado; sin sección de referencias consolidada al final |
| IV | Metodología | 4 740 | COMPLETO | Ocho iteraciones bien documentadas; T-01..T-05 descriptivos |
| V | Desarrollo e implementación | 11 804 | COMPLETO | Capítulo más extenso; 25 bloques de código, 7 figuras Mermaid; contiene nota de estructura ("Corte 5A/5B") visible en edición final |
| VI | Pruebas y resultados | 3 137 | COMPLETO (ver §2) | Nota de estado "Corte 6A" al inicio debe eliminarse; §6.6.2 tiene conteo incorrecto (14→16) |
| VII | Conclusiones | 3 827 | COMPLETO | Redacción sólida; coherente con toda la documentación de auditoría |
| — | **Total** | **36 526** | — | — |

---

## 2. Inconsistencias críticas encontradas

### IC-01 — Conteo de APROBADO en §6.6.2 (CORREGIR ANTES DE ENTREGA)

| Campo | Detalle |
|---|---|
| Ubicación | `capitulos/06-pruebas-resultados.md`, §6.6.2, segundo párrafo |
| Texto actual | "14 casos APROBADOS (63.6%), 2 APROBADOS PARCIAL (9.1%), 3 PARCIAL sin endpoint (13.6%), 1 BLOQUEADO (4.5%)" |
| Texto correcto | "16 casos APROBADOS (72.7%), 2 APROBADOS PARCIAL (9.1%), 3 PARCIAL sin endpoint (13.6%), 1 BLOQUEADO (4.5%)" |
| Origen | Corte 6B documentó APROBADO=14 por error; conciliación C6-01 lo corrigió a 16 |
| Impacto | Contradice la tabla §6.5.3, el documento 07-conciliacion-pruebas.md y el Cap. VII |

### IC-02 — Nota de estado al inicio de Cap. VI (ELIMINAR EN VERSIÓN FINAL)

| Campo | Detalle |
|---|---|
| Ubicación | `capitulos/06-pruebas-resultados.md`, línea 3 |
| Texto actual | `> **Estado:** Corte 6A — Secciones 6.1 a 6.4 redactadas. Secciones 6.5 (ejecución) y 6.6 (análisis) se redactarán en el Corte 6B...` |
| Acción | Eliminar el bloque completo de nota de estado antes de la versión final |
| Impacto | Es una nota de trabajo interno que no debe aparecer en el documento académico |

### IC-03 — Nota de estructura al inicio de Cap. V (ELIMINAR EN VERSIÓN FINAL)

| Campo | Detalle |
|---|---|
| Ubicación | `capitulos/05-desarrollo-implementacion.md`, líneas 3-4 |
| Texto actual | `> **Nota de estructura:** Este capítulo se divide en dos partes. Las secciones 5.1 a 5.8 (Corte 5A)...` |
| Acción | Eliminar antes de la versión final; es una nota de trabajo del proceso de redacción |

### IC-04 — Grupo A en §6.4.1 no refleja CP-02a/CP-02b

| Campo | Detalle |
|---|---|
| Ubicación | `capitulos/06-pruebas-resultados.md`, §6.4.1, tabla |
| Texto actual | Grupo A lista "CP-01, CP-02, CP-03" |
| Corrección | Actualizar a "CP-01, CP-02a, CP-02b, CP-03" o añadir nota explicativa: "CP-02 se ejecutó en dos escenarios: CP-02a (CURP duplicada) y CP-02b (inicio de sesión exitoso)" |
| Impacto | Menor pero crea confusión con la tabla §6.5.3 que lista CP-02a y CP-02b por separado |

### IC-05 — Descripción de Cap. VI en §1.7 del Cap. I

| Campo | Detalle |
|---|---|
| Ubicación | `capitulos/01-introduccion-generalidades.md`, §1.7 |
| Texto actual | "los resultados del checklist de extremo a extremo definido en el repositorio" |
| Problema | No existe un checklist en el repositorio; el plan de pruebas está en `docs/titulacion/06-plan-pruebas.md`, no en el repositorio de código |
| Corrección sugerida | "los resultados de los 22 casos de prueba ejecutados sobre el sistema activo" |

### IC-06 — Referencia al instrumento psicométrico en §3.8.3

| Campo | Detalle |
|---|---|
| Ubicación | `capitulos/03-marco-teorico.md`, §3.8.3 |
| Texto actual | "estructura consistente con versiones reducidas del Big Five, como el Mini-IPIP de 20 ítems desarrollado por Donnellan et al. (2006), aunque el instrumento específico utilizado fue proporcionado por personal..." |
| Problema | El instrumento se llama "TEST MINI BIG FIVE" en el sistema (commit `dd26d9a`); la asociación con el Mini-IPIP es una comparación informal, no una identificación |
| Corrección | Aclarar que es una comparación estructural, no una afirmación de identidad con el Mini-IPIP de Donnellan |

---

## 3. Inconsistencias menores encontradas

### IM-01 — Versión de Node.js en §4.3

| Texto actual | `package.json` especifica `^20`; la ejecución real fue con 22.22.2 |
| Estado | No requiere corrección; el texto dice "versión ^20 según `package.json`", lo cual es preciso |

### IM-02 — Conteo de endpoints en §5.9 vs. §6.3

| Cap. V | Menciona "13 route handlers" en `app/api/admin/` |
| Cap. VI §6.4.1 | Lista endppoints correctamente; confirma 13 |
| Estado | Consistente. No requiere corrección |

### IM-03 — Definición de "Funcional" vs. "Adecuada" en clasificaciones psicométricas

| Ubicación | Cap. III §3.8.3 dice "Funcional"; Cap. V, Cap. VI y Cap. VII dicen "Adecuada" |
| Resolución | La implementación usa "Adecuada" (verificable en `lib/psicometricoResults.ts`); Cap. III debe cambiarse de "Funcional" a "Adecuada" |

### IM-04 — Sigla MVP no definida en Cap. II

| Situación | Cap. I §1.1 define MVP correctamente; Cap. II usa MVP sin redefinir; aceptable |

### IM-05 — Uso mixto de "cuestionario" e "instrumento" para el psicométrico

| Situación | Ambos términos se usan en distintos capítulos para el mismo artefacto |
| Recomendación | Normalizar a "instrumento psicométrico institucional" como término principal; "cuestionario" como sinónimo explícito en primer uso |

---

## 4. Coherencia entre los capítulos en temas clave

| Tema | Cap. I | Cap. II | Cap. III | Cap. IV | Cap. V | Cap. VI | Cap. VII | Consistente |
|---|---|---|---|---|---|---|---|---|
| Nombre del sistema | UCES Plataforma de Talento | UCES Plataforma de Talento | UCES Plataforma de Talento | UCES Plataforma de Talento | UCES Plataforma de Talento | UCES Plataforma de Talento | UCES Plataforma de Talento | Sí |
| Nombre institución | UCES | UCES | UCES | UCES | UCES | UCES | UCES | Sí |
| Total RF | 18 | — | — | 18 | 18 | 18 | 18 | Sí |
| Total discrepancias | D-01..D-05 (implícito) | — | — | D-02 origen | D-01..D-05 | D-01..D-05 | D-01..D-05 | Sí |
| Total CPs | — | — | — | — | — | 22 | 22 | Sí |
| Total APROBADO | — | — | — | — | — | **14 (error)** | 16 | **No** — IC-01 |
| Metodología | — | — | — | Prototipado evolutivo | — | — | — | Sí |
| 8 iteraciones | — | — | — | Sí | — | — | — | Sí |
| Stack tecnológico | Next.js/Supabase | — | Detallado | Mencionado | Implementado | — | Mencionado | Sí |
| Roles: user/admin | Sí | — | Sí | — | Sí | Sí | Sí | Sí |
| D-01 "completitud no score" | §1.6 | — | — | — | Sí | Sí | Sí | Sí |
| Clasificación psicométrica "Adecuada" | — | — | "Funcional" (error IM-03) | — | "Adecuada" | "Adecuada" | "Adecuada" | **No** — IM-03 |

---

## 5. Validación de objetivos

**Conteo de objetivos:** 1 general + 7 específicos = **8 objetivos en total**. El Cap. VII §7.3 los describe correctamente. Los capítulos I y VII son consistentes.

| Objetivo | Cap. I | Cap. VII §7.3 | Nivel | Evidencia |
|---|---|---|---|---|
| OG | §1.3 | §7.2 | CUMPLIDO CON MATICES | INC-6B-01, INC-6B-02 |
| OE-01 | §1.4 | §7.3 tabla | CUMPLIDO | Schema.sql, 13 tablas, RLS |
| OE-02 | §1.4 | §7.3 tabla | CUMPLIDO | lib/curp.ts, curp_hashes |
| OE-03 | §1.4 | §7.3 tabla | CUMPLIDO | lib/psicometricoResults.ts, CP-14 |
| OE-04 | §1.4 | §7.3 tabla | CUMPLIDO CON MATICES | CP-11 no probado; INC-6B-01 |
| OE-05 | §1.4 | §7.3 tabla | CUMPLIDO CON MATICES | INC-6B-02 |
| OE-06 | §1.4 | §7.3 tabla | CUMPLIDO | requireAdmin(), RLS, CP-03/22 |
| OE-07 | §1.4 | §7.3 tabla | CUMPLIDO | Vercel, .env configurado |

**Resultado:** 5 CUMPLIDO, 3 CUMPLIDO CON MATICES, 0 incumplidos. Confirmado en `07-matriz-cumplimiento-objetivos.md`.

---

## 6. Conciliación definitiva de pruebas

La conciliación completa está en `07-conciliacion-pruebas.md`. Resumen para este informe:

| Estado | Conteo correcto | Conteo original | Error |
|---|---|---|---|
| APROBADO | **16** | 14 | CP-18 y CP-19 omitidos del resumen |
| APROBADO PARCIAL | 2 | 2 | Correcto |
| PARCIAL (sin endpoint) | 3 | 3 | Correcto |
| BLOQUEADO | 1 | 1 | Correcto |
| **Total** | **22** | 22 | Aritmética corregida: 16+2+3+1=22 ✓ |

**Archivo pendiente de corrección:** `capitulos/06-pruebas-resultados.md`, §6.6.2.

---

## 7. Problemas editoriales de estilo

| # | Ubicación | Problema | Acción |
|---|---|---|---|
| E-01 | Cap. VI (inicio) | Nota de estado "Corte 6A" interna | Eliminar antes de versión final |
| E-02 | Cap. V (inicio) | Nota de estructura "Corte 5A/5B" interna | Eliminar antes de versión final |
| E-03 | Cap. III §3.8.3 | "Funcional" en vez de "Adecuada" para clasificación intermedia | Corregir (IM-03) |
| E-04 | Cap. VI §6.6.2 | Conteo APROBADO=14 | Corregir a 16 (IC-01) |
| E-05 | Cap. VI §6.4.1 | Grupo A usa "CP-02" sin diferenciar a y b | Aclarar (IC-04) |
| E-06 | Cap. I §1.7 | "checklist definido en el repositorio" | Corregir descripción (IC-05) |
| E-07 | Cap. III §3.8.3 | Asociación con Mini-IPIP presentada como equivalencia | Aclarar que es comparación estructural (IC-06) |
| E-08 | Todos los caps. | Sin sección de referencias bibliográficas en ningún capítulo | Crear sección de referencias al final del documento |
| E-09 | Cap. V | Código ASCII del diagrama de arquitectura (§5.1.2) substituirá Figura 5.1 en Word | Exportar a imagen al maquetar |

---

## 8. Estado del PDF del Trabajo A

El archivo `docs/titulacion/referencias/analisis-diseno-uces.pdf` existe en el repositorio pero no pudo ser leído durante esta auditoría (herramienta `pdftoppm` no disponible en el entorno Windows). La cita "Arciniega Robles, 2026" se usa correctamente en los capítulos IV y VII. La verificación del PDF queda como pendiente antes de la entrega.

---

## 9. Resumen ejecutivo

| Categoría | Resultado |
|---|---|
| Capítulos completos | 7/7 |
| Palabras totales | 36,526 |
| Estimación de páginas (cuerpo) | ~150-170 páginas (ver `08a-conteo-paginas.md`) |
| Inconsistencias críticas | 6 (IC-01 a IC-06) |
| Inconsistencias menores | 5 (IM-01 a IM-05) |
| Problemas editoriales | 9 (E-01 a E-09) |
| Objetivos verificados | 8 (1 OG + 7 OE) |
| Pruebas conciliadas | 22 (conteo definitivo: 16+2+3+1) |
| Referencias en texto | ~29 citas (sin sección consolidada) |
| Figuras en capítulos | 7 (Cap. V) + referencias en otros |
| Capturas de pantalla obtenidas | 0/53 (pendientes todas) |
| PDF Trabajo A verificado | NO (herramienta no disponible) |

---

## 10. Próximos pasos para Cortes 8B y 8C

**Corte 8B — Correcciones editoriales y bibliografía:**
1. Aplicar correcciones IC-01 a IC-06 y E-01 a E-09 en los capítulos
2. Crear sección consolidada de referencias bibliográficas
3. Verificar URLs y fechas de todas las referencias del Cap. III
4. Eliminar notas de estado/estructura internas

**Corte 8C — Maquetación y entrega:**
1. Obtener las 53 capturas de pantalla (reqeuiere navegador interactivo)
2. Exportar 6 diagramas Mermaid a PNG desde mermaid.live
3. Ensamblar documento Word con plantilla institucional
4. Insertar figuras, tablas con estilo y pie de figura
5. Generar índices de figuras y tablas
6. Revisar paginación y formatos
