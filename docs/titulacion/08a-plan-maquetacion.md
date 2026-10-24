# Plan de maquetación del documento final — Corte 8A

**Fecha:** 2026-10-23
**Alcance:** Propuesta de estructura editorial completa para el documento Word/PDF de titulación. No incluye instrucciones de maquetación en Word aún — eso se detalla en el Corte 8C.

---

## 1. Parámetros de página (pendientes de confirmar con plantilla institucional)

| Parámetro | Valor provisional | Por confirmar |
|---|---|---|
| Tamaño de hoja | Carta (21.59 × 27.94 cm) | Sí |
| Margen izquierdo | 3 cm | Sí |
| Margen derecho | 2.5 cm | Sí |
| Margen superior | 2.5 cm | Sí |
| Margen inferior | 2.5 cm | Sí |
| Fuente principal | Arial 11 pt | Sí — podría ser Times New Roman |
| Fuente títulos H1 | Arial 14 pt negrita | Sí |
| Fuente títulos H2 | Arial 12 pt negrita | Sí |
| Fuente títulos H3 | Arial 11 pt negrita | Sí |
| Interlineado cuerpo | 1.5 | Sí — podría ser 2.0 |
| Interlineado citas largas | 1.0 (sangría 1.25 cm) | Sí |
| Alineación | Justificado | Sí |
| Fuente código | Courier New 9 pt | No — estándar tipográfico |
| Numeración de páginas | Inferior centrada o inferior derecha | Sí |
| Encabezado | Título abreviado o número de capítulo | Sí |

---

## 2. Estructura del documento maestro

### Sección I — Páginas preliminares (sin numeración árabe; usar numeración romana i, ii, iii...)

| Orden | Elemento | Páginas estimadas | Fuente del contenido |
|---|---|---|---|
| 1 | Portada | 1 | Plantilla institucional |
| 2 | Hoja de identificación / firmas / dictamen | 1 | Institución |
| 3 | Dedicatoria / Agradecimientos (opcional) | 0–1 | Redactar |
| 4 | Resumen (español, máx. 300 palabras) | 1 | Redactar |
| 5 | Abstract (inglés, traducción del resumen) | 1 | Traducir resumen |
| 6 | Índice general | 2–3 | Generado automáticamente en Word |
| 7 | Índice de figuras | 1 | Generado automáticamente |
| 8 | Índice de tablas | 1 | Generado automáticamente |
| **Subtotal** | | **8–9** | |

> **Nota:** El resumen y abstract deben redactarse en el Corte 8B. Estructura recomendada: objetivo del proyecto (1 oración), metodología (2 oraciones), resultados (3 oraciones con cifras: 18 RF, 22 CP, 16 APROBADO), conclusión (1 oración).

---

### Sección II — Cuerpo principal (numeración árabe desde página 1)

| Capítulo | Título | Páginas estimadas | Fuente |
|---|---|---|---|
| I | Introducción y generalidades | 10–12 | `capitulos/01-introduccion-generalidades.md` |
| II | Contexto organizacional | 10–12 | `capitulos/02-contexto-organizacional.md` |
| III | Marco teórico | 23–26 | `capitulos/03-marco-teorico.md` |
| IV | Metodología | 18–22 | `capitulos/04-metodologia.md` |
| V | Desarrollo e implementación | 45–52 | `capitulos/05-desarrollo-implementacion.md` |
| VI | Pruebas y resultados | 20–24 | `capitulos/06-pruebas-resultados.md` |
| VII | Conclusiones, discusión y trabajo futuro | 13–16 | `capitulos/07-conclusiones-trabajo-futuro.md` |
| **Subtotal** | | **139–164** | |

---

### Sección III — Elementos finales (numeración continua)

| Orden | Elemento | Páginas estimadas | Fuente |
|---|---|---|---|
| 1 | Referencias bibliográficas | 3–4 | `08a-revision-bibliografica.md` (lista B-01..B-33) |
| 2 | Glosario de términos | 2–3 | Extraer de caps. I y III |
| **Subtotal** | | **5–7** | |

---

### Sección IV — Anexos (numeración continua o aparte)

| Anexo | Título | Contenido | Páginas estimadas |
|---|---|---|---|
| A | Requisitos funcionales del Trabajo A | 18 RF de Arciniega Robles (2026) con descripción | 3–4 |
| B | Matriz de trazabilidad completa | RF vs. implementación vs. resultados de prueba | 3–4 |
| C | Discrepancias D-01..D-05 — descripción técnica detallada | Evidencia en código y comportamiento observado | 2–3 |
| D | Diagramas Mermaid (Fig. 5.2–5.7) | 6 imágenes PNG exportadas de mermaid.live | 6 |
| E | Capturas de pantalla del sistema | Subset de capturas Categoría A y B | 10–15 |
| F | Evidencias de pruebas — respuestas API (EV-6B-01..21) | Selección de respuestas JSON representativas | 5–7 |
| **Subtotal** | | | **29–39** |

---

### Resumen de páginas totales

| Sección | Mínimo | Máximo |
|---|---|---|
| Páginas preliminares | 8 | 9 |
| Cuerpo (7 capítulos) | 139 | 164 |
| Referencias y glosario | 5 | 7 |
| Anexos | 29 | 39 |
| **TOTAL** | **181** | **219** |

> Estas estimaciones asumen que se obtienen todas las capturas de pantalla Categoría A (21) y se insertan en Cap. V y Cap. VI. Sin capturas en cuerpo: ~160–185 páginas.

---

## 3. Jerarquía de estilos de Word

| Nivel | Estilo Word | Uso |
|---|---|---|
| Título del trabajo | Personalizado "Portada" | Solo en portada |
| H1 — Número y título de capítulo | "Título 1" (14 pt, negrita, centrado o izquierda) | `# Capítulo I...` |
| H2 — Sección numerada | "Título 2" (12 pt, negrita) | `## 1.1 Antecedentes` |
| H3 — Subsección | "Título 3" (11 pt, negrita) | `### 1.1.1 ...` |
| Cuerpo de texto | "Normal" (11 pt, 1.5, justificado) | Párrafos de prosa |
| Cita literal larga (>40 palabras) | "Cita" (10 pt, 1.0, sangría 1.25 cm ambos lados) | Citas textuales |
| Pie de figura | "Pie de figura" (9 pt, centrado, negrita "Figura X.X.") | Bajo cada imagen |
| Pie de tabla | "Pie de tabla" (9 pt, centrado, negrita "Tabla X.X.") | Arriba de cada tabla |
| Código fuente | "Código" (Courier New 9 pt, fondo gris #F5F5F5, recuadro) | Bloques TypeScript |
| Nota al pie | Automático Word (9 pt) | Referencias numéricas si aplica |

---

## 4. Convención de numeración de figuras y tablas

### Figuras
```
Figura X.Y. Título descriptivo.
Fuente: Elaboración propia / [Autor, año] / Captura de pantalla obtenida el DD/MM/AAAA.
```
Donde X = número de capítulo, Y = número secuencial dentro del capítulo.

Actualmente solo el Cap. V tiene figuras numeradas (Fig. 5.1–5.7).

### Tablas
```
Tabla X.Y. Título descriptivo.
[Tabla]
Fuente: Elaboración propia.
```
El pie de tabla va **encima** de la tabla (estándar APA 7). Los capítulos IV–VII tienen tablas numeradas del 4.1 al 7.5 (ver inventario en `08a-inventario-figuras-tablas.md`).

> **Pendiente:** Agregar etiquetas formales `Tabla X.Y` y `Figura X.Y` a las tablas Markdown antes de exportar a Word — en los archivos Markdown actuales las tablas no tienen leyenda formal.

---

## 5. Tratamiento de bloques de código

Los ~25 bloques de código en Cap. V deben maquetarse como:

```
[Código X.Y. Descripción del fragmento. Archivo: nombre-del-archivo.ts]
[bloque de código en Courier New 9 pt, fondo gris, con recuadro de 0.5 pt]
```

O alternativamente, si la institución no acepta numeración de código, usar solo el recuadro visual sin numeración formal.

**Bloques Mermaid:** Deben eliminarse del texto y reemplazarse por la imagen PNG exportada de mermaid.live, con leyenda "Figura 5.X."

---

## 6. Orden de exportación de archivos Markdown a Word

Cuando se inicie la maquetación en el Corte 8C, el orden de pegado en Word es:

1. Aplicar plantilla institucional (si existe) o configurar manualmente los parámetros de §1
2. Insertar portada y páginas preliminares manualmente
3. Pegar Cap. I (`01-introduccion-generalidades.md`) → aplicar estilos
4. Pegar Cap. II (`02-contexto-organizacional.md`)
5. Pegar Cap. III (`03-marco-teorico.md`)
6. Pegar Cap. IV (`04-metodologia.md`)
7. Pegar Cap. V (`05-desarrollo-implementacion.md`) → insertar figuras, reemplazar bloques Mermaid
8. Pegar Cap. VI (`06-pruebas-resultados.md`) → insertar capturas de pruebas
9. Pegar Cap. VII (`07-conclusiones-trabajo-futuro.md`)
10. Pegar Referencias bibliográficas (lista APA de `08a-revision-bibliografica.md`)
11. Pegar Glosario
12. Insertar Anexos A–F
13. Generar Índice general, Índice de figuras, Índice de tablas
14. Verificar paginación, saltos de página y encabezados
15. Exportar a PDF

---

## 7. Correcciones que deben aplicarse ANTES de exportar a Word

Antes de iniciar la maquetación, deben estar aplicadas las siguientes correcciones documentadas en `08a-auditoria-integral.md`:

| Corrección | Archivo | Estado |
|---|---|---|
| IC-01: 14→16 APROBADO en §6.6.2 | `capitulos/06-pruebas-resultados.md` | PENDIENTE |
| IC-02: Eliminar nota "Corte 6A" | `capitulos/06-pruebas-resultados.md` | PENDIENTE |
| IC-03: Eliminar nota "Corte 5A/5B" | `capitulos/05-desarrollo-implementacion.md` | PENDIENTE |
| IC-04: CP-02a/CP-02b en §6.4.1 | `capitulos/06-pruebas-resultados.md` | PENDIENTE |
| IC-05: §1.7 descripción Cap. VI | `capitulos/01-introduccion-generalidades.md` | PENDIENTE |
| IC-06: §3.8.3 Mini-IPIP comparación | `capitulos/03-marco-teorico.md` | PENDIENTE |
| IM-03: "Funcional"→"Adecuada" §3.8.3 | `capitulos/03-marco-teorico.md` | PENDIENTE |
| Agregar sección Referencias | Documento final | PENDIENTE |

---

## 8. Herramientas recomendadas

| Tarea | Herramienta |
|---|---|
| Maquetación principal | Microsoft Word 365 |
| Exportar Mermaid a PNG | mermaid.live (1280×800 px mínimo) |
| Capturas de pantalla | Snipping Tool (Windows) o ShareX |
| Verificar PDF final | Adobe Acrobat Reader |
| Referencia APA 7 | Zotero o Citation Machine |
| Diagrama arquitectura (Fig. 5.1) | draw.io o Lucidchart — exportar PNG |
