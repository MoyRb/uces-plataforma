# Análisis de extensión y estimación de páginas — Corte 8A

**Fecha:** 2026-10-23
**Parámetros editoriales provisionales:** Carta, Arial 11, interlineado 1.5, texto justificado, margen izquierdo 3 cm, derecho 2.5 cm, superior e inferior 2.5 cm.

---

## 1. Conteo real de palabras por capítulo

| Capítulo | Palabras (markdown) | Encabezados | Tablas (filas) | Bloques de código | Referencias a figuras |
|---|---|---|---|---|---|
| I — Introducción | 3 030 | 9 | 0 | 0 | 6 |
| II — Contexto organizacional | 3 043 | 8 | 0 | 0 | 4 |
| III — Marco teórico | 6 945 | 31 | 0 | 0 | 8 |
| IV — Metodología | 4 740 | 26 | 48 filas | 0 | 3 |
| V — Desarrollo | 11 804 | 81 | 82 filas | ~25 bloques | 14 |
| VI — Pruebas | 3 137 | 29 | 100 filas | 0 | 3 |
| VII — Conclusiones | 3 827 | 20 | 17 filas | 0 | 4 |
| **Total body** | **36 526** | **204** | **247** | **~25** | **42** |

> **Nota metodológica:** Las palabras se cuentan desde los archivos Markdown incluyendo texto de tablas y comentarios. No incluye el contenido de los documentos de auditoría (no forman parte del documento académico).

---

## 2. Estimación de páginas por tipo de elemento

### 2.1 Prosa pura

A 280 palabras/página (Arial 11, 1.5, carta con márgenes especificados), el texto prosaico rinde:

| Capítulo | Palabras prosa (aprox.) | Páginas prosa |
|---|---|---|
| I | 3 000 | 10.7 |
| II | 3 000 | 10.7 |
| III | 6 800 | 24.3 |
| IV | 3 500 | 12.5 |
| V | 7 500 | 26.8 |
| VI | 2 200 | 7.9 |
| VII | 3 600 | 12.9 |
| **Subtotal prosa** | **29 600** | **~106** |

### 2.2 Tablas

Una tabla de 4 columnas con ~5 filas ocupa aproximadamente 0.6 páginas. Estimado por capítulo:

| Capítulo | Filas de tabla | Páginas estimadas |
|---|---|---|
| IV | 48 | ~7 |
| V | 82 | ~8 |
| VI | 100 | ~12 |
| VII | 17 | ~2 |
| **Subtotal tablas** | **247** | **~29** |

### 2.3 Bloques de código

Cap. V tiene ~25 bloques de código. Un bloque de código típico (8–15 líneas, Courier 9 pt con fondo) ocupa ~0.3–0.5 páginas:

- 25 bloques × 0.4 páginas promedio = **~10 páginas**

### 2.4 Diagramas y figuras

| Tipo | Cantidad | Páginas estimadas |
|---|---|---|
| Diagramas Mermaid exportados a PNG | 6 | ~6 (1 por figura) |
| Fig. 5.1 (arquitectura, reemplazada por imagen) | 1 | ~1 |
| Capturas de pantalla (cuando se obtengan) | 50 | ~25–35 (1/2 a 2/3 pág. por captura) |
| **Subtotal figuras (sin capturas aún)** | **7** | **~7** |

### 2.5 Elementos preliminares y finales

| Elemento | Páginas estimadas |
|---|---|
| Portada | 1 |
| Hoja de identificación / firmas | 1 |
| Resumen (español) | 1 |
| Abstract (inglés) | 1 |
| Agradecimientos | 0–1 |
| Índice general | 2–3 |
| Índice de figuras | 1 |
| Índice de tablas | 1 |
| Referencias bibliográficas (~33 entradas) | 3–4 |
| Glosario | 2–3 |
| Anexos (A–F) | 15–20 |
| **Subtotal elementos adicionales** | | **28–37** |

---

## 3. Estimación total

| Componente | Páginas mínimas | Páginas máximas |
|---|---|---|
| Prosa de los 7 capítulos | 106 | 106 |
| Tablas | 29 | 29 |
| Bloques de código | 10 | 10 |
| Diagramas Mermaid (7) | 7 | 7 |
| Capturas de pantalla (50 pendientes) | 25 | 35 |
| Elementos preliminares y finales | 28 | 37 |
| **TOTAL ESTIMADO** | **205** | **224** |

> **Interpretación:** El documento completo con todas las capturas se estima entre **205 y 224 páginas**. Sin capturas de pantalla, la estimación es **180–189 páginas**.

---

## 4. Comparación con la meta de 150 páginas

| Escenario | Páginas estimadas | Diferencia vs. meta |
|---|---|---|
| Solo capítulos (sin imágenes, sin frontmatter, sin refs) | ~145 | En la meta |
| Capítulos + tablas/código + Mermaid + frontmatter + refs | ~185 | +35 páginas sobre la meta |
| Versión completa con capturas de pantalla | ~210 | +60 páginas sobre la meta |

**Conclusión:** El documento ya supera los 150 páginas en su cuerpo principal (capítulos + tablas + código). La meta de 150 páginas se interpreta como un mínimo académico, no un máximo. Un reporte de 7 capítulos con este nivel de detalle técnico de 210 páginas es completamente aceptable.

---

## 5. Análisis de equilibrio entre capítulos

| Capítulo | Páginas prosa estimadas | Evaluación |
|---|---|---|
| I | 10.7 | Adecuado para una introducción |
| II | 10.7 | Adecuado; apropiado dado que no hay información institucional formal |
| III | 24.3 | Bien desarrollado; es el capítulo teórico más denso |
| IV | ~20 (prosa + tablas) | Adecuado; bien documentado el proceso |
| V | ~48 (prosa + código + tablas + figuras) | **El más extenso — apropiado** (es el capítulo de desarrollo) |
| VI | ~22 (prosa + tablas) | Adecuado; podría expandirse con análisis comparativo más profundo |
| VII | ~15 (prosa + tablas) | Adecuado para un capítulo de conclusiones |

---

## 6. Capítulos que podrían profundizarse

| Capítulo | Oportunidad de profundización |
|---|---|
| I §1.6 | La descripción de limitaciones es breve; podría expandirse 1 página con más detalle sobre qué no se evaluó (validación psicométrica formal, pruebas de carga) |
| II §2.1 | La descripción institucional es honestamente limitada por falta de documentación formal; aceptable |
| VI §6.6 | El análisis de resultados podría incluir una discusión más extensa sobre el impacto de CP-11 (timeout no probado) y qué implicaciones tiene para el uso real del sistema |

> **Recomendación:** No agregar contenido por el objetivo de alcanzar páginas. Los capítulos son equilibrados para el alcance del proyecto. El documento es sólido en su estado actual.

---

## 7. Parámetros editoriales pendientes de confirmar

Los parámetros provisionales utilizados en esta estimación deben confirmarse contra la plantilla oficial de la institución antes de la maquetación final:

| Parámetro | Valor provisional | Por confirmar |
|---|---|---|
| Fuente principal | Arial 11 | Sí — verificar si la institución especifica Times New Roman u otra |
| Interlineado | 1.5 | Sí — algunas instituciones piden 2.0 |
| Tamaño de hoja | Carta (21.59 × 27.94 cm) | Sí |
| Márgenes | Izq 3 cm, Der 2.5 cm, Sup/Inf 2.5 cm | Sí |
| Numeración de páginas | Esquina inferior derecha o inferior centrada | Por confirmar |
| Encabezado | Título del trabajo o número de capítulo | Por confirmar |
| Estilo de títulos | Jerarquía 1/2/3 con tamaños 14/12/11 | Por confirmar |
