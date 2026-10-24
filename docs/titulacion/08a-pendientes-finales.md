# Pendientes finales antes de entrega — Corte 8A

**Fecha:** 2026-10-23
**Propósito:** Lista maestra y priorizada de todas las tareas que deben completarse antes de la entrega del documento de titulación. Incluye correcciones editoriales, evidencias pendientes, elementos faltantes y acciones de maquetación.

---

## 1. Correcciones críticas en capítulos (IC — inconsistencias críticas)

Estas correcciones deben aplicarse en los archivos Markdown **antes** de la maquetación. Documentadas en `08a-auditoria-integral.md`.

| # | ID | Archivo | Acción | Impacto |
|---|---|---|---|---|
| 1 | IC-01 | `capitulos/06-pruebas-resultados.md` §6.6.2 | Cambiar "14 casos APROBADOS (63.6%)" → "16 casos APROBADOS (72.7%)" | Contradice tabla §6.5.3, Cap. VII y conciliación |
| 2 | IC-02 | `capitulos/06-pruebas-resultados.md` línea 3 | Eliminar bloque de nota "Estado: Corte 6A..." | Nota interna visible en documento académico |
| 3 | IC-03 | `capitulos/05-desarrollo-implementacion.md` líneas 3-4 | Eliminar bloque de nota "Nota de estructura: Corte 5A/5B..." | Nota interna visible en documento académico |
| 4 | IC-04 | `capitulos/06-pruebas-resultados.md` §6.4.1 | Actualizar Grupo A: "CP-01, CP-02, CP-03" → "CP-01, CP-02a, CP-02b, CP-03" + nota explicativa | Incoherencia con tabla §6.5.3 |
| 5 | IC-05 | `capitulos/01-introduccion-generalidades.md` §1.7 | "checklist de extremo a extremo definido en el repositorio" → "22 casos de prueba ejecutados sobre el sistema activo" | Referencia a artefacto inexistente |
| 6 | IC-06 | `capitulos/03-marco-teorico.md` §3.8.3 | Aclarar que la asociación con Mini-IPIP de Donnellan (2006) es una comparación estructural, no identificación del instrumento | Afirmación académicamente imprecisa |

---

## 2. Correcciones menores en capítulos (IM — inconsistencias menores)

| # | ID | Archivo | Acción |
|---|---|---|---|
| 7 | IM-03 | `capitulos/03-marco-teorico.md` §3.8.3 | "Funcional" → "Adecuada" para clasificación intermedia psicométrica |
| 8 | IM-05 | Todos los caps. | Normalizar: primer uso → "instrumento psicométrico institucional"; después "cuestionario" como sinónimo explícito (bajo prioridad) |

---

## 3. Elementos de contenido faltantes

| # | Elemento | Descripción | Prioridad |
|---|---|---|---|
| 9 | Sección de Referencias bibliográficas | Crear lista consolidada APA 7 de las 33 citas (B-01..B-33) al final del documento o como sección final del Cap. VII | **Alta** |
| 10 | Resumen (español) | ~300 palabras: objetivo, metodología, resultados (18 RF, 22 CP, 16 APROBADO), conclusión | Alta |
| 11 | Abstract (inglés) | Traducción del resumen | Alta |
| 12 | Glosario de términos | MVP, RF, CP, D-01..D-05, RLS, JWT, HMAC, Mini Big Five, prototipado evolutivo, etc. | Media |
| 13 | Figura 5.1 (arquitectura) | Reemplazar ASCII art por imagen vectorial exportada de draw.io o Lucidchart | Media |
| 14 | Leyendas formales de tablas | Agregar "Tabla X.Y. Título" encima de cada tabla en los capítulos IV–VII (ver inventario en `08a-inventario-figuras-tablas.md`) | Media |

---

## 4. Verificaciones bibliográficas pendientes

Documentadas en `08a-revision-bibliografica.md` §3.

| # | Referencia | Problema | Acción |
|---|---|---|---|
| 15 | B-05: Twelve-Factor App | Año "2017" probablemente incorrecto (original 2011) | Verificar en https://12factor.net y corregir año |
| 16 | B-33: Arciniega Robles, 2026 | PDF no legible en entorno — datos no verificados | Verificar manualmente título, editorial, institución |
| 17 | B-01: Pressman, 2014 | Edición no confirmada | Verificar en fuente académica |
| 18 | B-15, B-20, B-26, B-30 | Fechas de acceso a URLs no verificadas | Actualizar fecha de acceso al día de consulta |
| 19 | Vercel, Supabase, Next.js docs | Años de publicación estimados | Verificar en sitios oficiales y corregir si difieren |

---

## 5. Evidencias visuales pendientes

| # | Elemento | Detalle | Prioridad |
|---|---|---|---|
| 20 | 21 capturas Categoría A | Indispensables en cuerpo del documento (ver `08a-plan-evidencias.md` §4) | **Alta** |
| 21 | 20 capturas Categoría B | Recomendadas para Anexo E | Media |
| 22 | 6 diagramas Mermaid → PNG | Fig. 5.2–5.7 desde mermaid.live (1280×800 px mínimo) | **Alta** |
| 23 | Figura 5.1 → imagen vectorial | Arquitectura de tres capas en draw.io o Lucidchart | Media |

> **Acción mínima viable:** obtener las 21 capturas Categoría A y los 6 PNG de Mermaid. Las capturas Categoría B y C pueden omitirse si el tiempo es limitado.

---

## 6. Tareas de maquetación (Corte 8C)

Estas tareas se realizan UNA VEZ que todas las correcciones de puntos 1–5 estén completadas.

| # | Tarea | Descripción |
|---|---|---|
| 24 | Confirmar plantilla institucional | Obtener plantilla Word oficial de UCES si existe; si no, aplicar parámetros de `08a-plan-maquetacion.md` |
| 25 | Exportar capítulos a Word | Copiar capítulos Markdown al documento Word y aplicar estilos |
| 26 | Insertar figuras y capturas | Colocar imágenes en posición correcta con leyendas formales |
| 27 | Insertar código con estilo | Courier New 9 pt, fondo gris, recuadro; reemplazar bloques Mermaid por PNG |
| 28 | Crear sección Referencias | Pegar lista APA de las 33 referencias en orden alfabético |
| 29 | Crear Glosario | Pegar términos y definiciones |
| 30 | Crear Anexos A–F | Ver estructura en `08a-plan-maquetacion.md` §2 Sección IV |
| 31 | Generar índices automáticos | Índice general, índice de figuras, índice de tablas en Word |
| 32 | Verificar paginación | Saltos de capítulo, numeración romana/árabe, encabezados |
| 33 | Exportar a PDF | PDF/A preferible para archivo institucional |
| 34 | Revisión final de PDF | Verificar que no haya páginas en blanco, imágenes rotas o texto cortado |

---

## 7. Verificaciones de calidad finales (lista de cotejo pre-entrega)

Antes de imprimir o entregar el PDF, verificar cada punto:

### Coherencia de contenido
- [ ] IC-01 a IC-06 corregidas en los capítulos
- [ ] IM-03 corregida ("Funcional" → "Adecuada")
- [ ] Notas internas de estado eliminadas (IC-02, IC-03)
- [ ] Conteo de APROBADO=16 consistente en Cap. VI y VII
- [ ] Todos los objetivos OE-01..OE-07 mencionados en Cap. I §1.4 y Cap. VII §7.3

### Bibliografía
- [ ] Sección de referencias existe al final del documento
- [ ] Todas las citas en texto tienen entrada en referencias (y viceversa)
- [ ] Formato APA 7 consistente
- [ ] Año de Twelve-Factor App verificado y corregido si aplica
- [ ] Arciniega Robles (2026) con datos completos

### Figuras y tablas
- [ ] Fig. 5.1 es imagen (no ASCII art)
- [ ] Fig. 5.2–5.7 son imágenes PNG (no bloques Mermaid)
- [ ] Todas las figuras tienen leyenda "Figura X.Y. Título. Fuente: ..."
- [ ] Todas las tablas tienen leyenda "Tabla X.Y. Título." encima
- [ ] Índice de figuras generado y correcto
- [ ] Índice de tablas generado y correcto

### Estructura del documento
- [ ] Portada con datos institucionales completos
- [ ] Resumen y Abstract presentes
- [ ] Índice general con números de página correctos
- [ ] Numeración romana en preliminares, árabe en cuerpo
- [ ] Capítulos I–VII sin notas de estado internas
- [ ] Referencias bibliográficas completas (33 entradas)
- [ ] Glosario presente
- [ ] Anexos A–F correctamente etiquetados

### Formato
- [ ] Fuente y tamaño consistentes en todo el documento
- [ ] Interlineado uniforme (1.5 o el que confirme la institución)
- [ ] Márgenes correctos (3/2.5/2.5/2.5 cm o los institucionales)
- [ ] Sin páginas en blanco no intencionales
- [ ] Sin texto en color (salvo si la institución lo permite)
- [ ] Bloques de código con formato monoespaciado y fondo gris

---

## 8. Resumen de estado actual (2026-10-23)

| Área | Completado | Pendiente |
|---|---|---|
| Redacción de capítulos | 7/7 capítulos completos | 6 correcciones IC + 2 IM |
| Auditoría integral | Completada (8A) | — |
| Bibliografía | 33 citas identificadas | Sección consolidada no creada; 9 verificaciones pendientes |
| Figuras/tablas | Inventario completo | 27 capturas A + 6 Mermaid PNG pendientes |
| Evidencias de prueba | 21 API evidencias (6B) | 50 capturas visuales pendientes |
| Maquetación | Plan definido (8A) | Todo pendiente (Corte 8C) |
| Resumen/Abstract | No redactados | Redactar en Corte 8B |
| Glosario | No creado | Redactar en Corte 8B |

**Clasificación de bloqueadores:**
- **BLOQUEA entrega académica:** IC-01 a IC-06, sección de referencias, capturas Categoría A
- **Recomendable pero no bloquea:** Capturas Categoría B, glosario, resumen/abstract (depende de requisitos institucionales)
- **Puede omitirse:** Capturas Categoría C, verificaciones bibliográficas menores
