# Inventario de figuras, tablas y elementos visuales — Corte 8A

**Fecha:** 2026-10-23
**Alcance:** Todos los capítulos I–VII más diagramas Mermaid referenciados.

---

## 1. Figuras declaradas en los capítulos

| ID | Título | Tipo | Capítulo / Sección | Archivo fuente | Estado | Referenciada en texto |
|---|---|---|---|---|---|---|
| Fig. 5.1 | Diagrama de arquitectura de tres capas | ASCII art / tabla | Cap. V §5.1.2 | Inline en capítulo | Presente (en prosa) | Sí — "Figura 5.1" |
| Fig. 5.2 | Diagrama de secuencia del registro de candidato | Mermaid sequenceDiagram | Cap. V §5.3.1 | `diagramas/05a/fig-5-2-secuencia-registro.mmd` | .mmd creado | Sí — "Figura 5.2" |
| Fig. 5.3 | Diagrama de secuencia de la postulación | Mermaid sequenceDiagram | Cap. V §5.6.1 | `diagramas/05a/fig-5-3-secuencia-postulacion.mmd` | .mmd creado | Sí — "Figura 5.3" |
| Fig. 5.4 | Flujo de almacenamiento de evidencias | Mermaid sequenceDiagram | Cap. V §5.8.1 | `diagramas/05a/fig-5-4-secuencia-evidencias.mmd` | .mmd creado | Sí — "Figura 5.4" |
| Fig. 5.5 | Flujo de persistencia de decisiones (D-02) | Mermaid sequenceDiagram | Cap. V §5.9.8 | `diagramas/05b/fig-5-5-persistencia-decisiones.mmd` | .mmd creado | Sí — "Figura 5.5" |
| Fig. 5.6 | Flujo de autorización en `requireAdmin()` | Mermaid flowchart | Cap. V §5.10.2 | `diagramas/05b/fig-5-6-flujo-requireAdmin.mmd` | .mmd creado | Sí — "Figura 5.6" |
| Fig. 5.7 | Flujo de `ensurePsicometricoAttempt()` | Mermaid flowchart | Cap. V §5.11.3 | `diagramas/05b/fig-5-7-inicio-psicometrico.mmd` | .mmd creado | Sí — "Figura 5.7" |

**Subtotal figuras con archivo exportable:** 6 (Fig. 5.2–5.7)
**Figuras solo en texto/prosa:** 1 (Fig. 5.1 — arquitectura en ASCII)

> **Advertencia para maquetación:** La Fig. 5.1 es un diagrama de arquitectura en texto ASCII dentro de un bloque de código. Al exportar a Word deberá reemplazarse con una imagen generada a partir del mismo diagrama (Lucidchart, draw.io, o mermaid.live con diagrama tipo `graph TD`).

---

## 2. Figuras referenciadas pero no numeradas (por capítulo)

Estas son referencias a capturas de pantalla que aún no se han obtenido. Se listan para confirmar el inventario pendiente.

### Cap. I (§1.7)
- Referencia implícita a capturas del Anexo E (sin número de figura asignado)

### Cap. II (§2.4, §2.5)
- `[EV-01]`, `[EV-06]` — placeholders para documentos institucionales (carta de adscripción, cuestionario original); no son figuras del documento sino evidencias externas

### Cap. III
- Ninguna figura numerada; el capítulo es exclusivamente textual

### Cap. IV
- Tabla 4.1 (Fases del prototipado evolutivo) — 4.8
- No hay figuras numeradas adicionales

### Cap. V (capturas pendientes — 42 requeridas)
Ver catálogo completo en `08a-plan-evidencias.md`.

### Cap. VI
- Las referencias son a respuestas de API textuales (EV-6B-01..EV-6B-21), no a capturas de pantalla

### Cap. VII
- No hay figuras. Las tablas están correctamente integradas en el texto.

---

## 3. Tablas académicas en los capítulos

### Cap. I — Ninguna tabla numerada
El capítulo es íntegramente prosístico.

### Cap. II — Ninguna tabla numerada
El capítulo es íntegramente prosístico.

### Cap. III — Ninguna tabla numerada
El capítulo es íntegramente prosístico.

### Cap. IV — Tablas numerables (~11 tablas)

| Tabla | Descripción | Sección |
|---|---|---|
| Tabla 4.1 | Actividades técnicas del ciclo de desarrollo | §4.2 |
| Tabla 4.2 | Variables de entorno del proyecto | §4.3 |
| Tabla 4.3 | Commits de la Iteración 5 (estabilización) | §4.4 |
| Tabla 4.4 | Problema T-01 (params asíncronos) | §4.6 |
| Tabla 4.5 | Problema T-02 (RLS circularidad) | §4.6 |
| Tabla 4.6 | Problema T-03 (tipado Supabase) | §4.6 |
| Tabla 4.7 | Problema T-04 (psychometric_summary) | §4.6 |
| Tabla 4.8 | Problema T-05 (ReviewDecision) | §4.6 |
| Tabla 4.9 | Fases del prototipado vs. actividades del proyecto | §4.8 |

### Cap. V — Tablas numerables (~9 tablas)

| Tabla | Descripción | Sección |
|---|---|---|
| Tabla 5.1 | Componentes principales del sistema | §5.1.3 |
| Tabla 5.2 | Capas arquitectónicas Trabajo A vs. Trabajo B | §5.1.4 |
| Tabla 5.3 | Variables de entorno y sus contextos | §5.2.2 |
| Tabla 5.4 | Tablas de la base de datos (13 tablas) | §5.2 aprox. |
| Tabla 5.5 | Políticas RLS por tabla | §5.10 aprox. |
| Tabla 5.6 | Discrepancias D-01..D-05 | §5.12 |
| Tabla 5.7 | RF implementados sin discrepancia (14) | §5.13 |
| Tabla 5.8 | RF con discrepancias (4) | §5.13 |
| Tabla 5.9 | Funcionalidades emergentes (FE-01..FE-05) | §5.13 |

### Cap. VI — Tablas numerables (~12 tablas)

| Tabla | Descripción | Sección |
|---|---|---|
| Tabla 6.1 | Tipos de prueba | §6.2.1 |
| Tabla 6.2 | Criterios de aceptación | §6.2.2 |
| Tabla 6.3 | Verificaciones estáticas completadas | §6.2.3 |
| Tabla 6.4 | Entorno local | §6.3.1 |
| Tabla 6.5 | Entorno de producción | §6.3.2 |
| Tabla 6.6 | Roles necesarios para las pruebas | §6.3.3 |
| Tabla 6.7 | Datos de prueba mínimos | §6.3.4 |
| Tabla 6.8 | Herramientas de apoyo | §6.3.5 |
| Tabla 6.9 | Resumen de casos de prueba por grupo | §6.4.1 |
| Tabla 6.10 | Prioridad de ejecución | §6.4.2 |
| Tabla 6.11 | Casos para verificación de discrepancias | §6.4.3 |
| Tabla 6.12 | Resultados por CP (tabla de 22 filas) | §6.5.3 |
| Tabla 6.13 | Verificación de discrepancias | §6.6.3 |

### Cap. VII — Tablas numerables (~5 tablas)

| Tabla | Descripción | Sección |
|---|---|---|
| Tabla 7.1 | Cumplimiento de objetivos específicos | §7.3 |
| Tabla 7.2 | Distribución de RF (sin discrepancia / con discrepancia) | §7.4.1 |
| Tabla 7.3 | Funcionalidades emergentes | §7.4.2 |
| Tabla 7.4 | Resultados de pruebas por estado | §7.5.3 |
| Tabla 7.5 | Estado de discrepancias | §7.5.3 |

---

## 4. Bloques de código en Cap. V

Cap. V contiene aproximadamente 25 bloques de código. A continuación se registran los más relevantes para maquetación:

| # | Lenguaje | Descripción | Sección |
|---|---|---|---|
| 1 | text (tree) | Estructura de directorios del monorepo | §5.1.1 |
| 2 | text (ASCII) | Diagrama de arquitectura | §5.1.2 |
| 3 | mermaid | Secuencia de registro (Fig. 5.2) | §5.3.1 |
| 4 | typescript | `supabaseBrowser()` singleton | §5.2.1 |
| 5 | typescript | `supabaseServer()` factory | §5.2.1 |
| 6 | typescript | `signInWithPassword()` | §5.3.2 |
| 7 | typescript | `hashCurpHmac()` (HMAC-SHA256) | §5.3.1 |
| 8 | typescript | `requireAdmin()` — verificación de JWT | §5.10 aprox. |
| 9 | typescript | `calculatePsicometricoSummary()` | §5.11 aprox. |
| 10+ | typescript | Múltiples snippets de Route Handlers | Varias |

> **Nota para maquetación:** Los bloques de código en Word deben usar fuente monoespaciada (Courier New 9 o 10 pt), fondo gris claro, con pie de código indicando el archivo fuente. Los bloques Mermaid deben reemplazarse por la imagen exportada.

---

## 5. Capturas de pantalla pendientes — resumen

Ver clasificación detallada en `08a-plan-evidencias.md`.

| Categoría | Total requeridas | Obtenidas | Pendientes |
|---|---|---|---|
| Cap. V — secciones 5.1–5.8 | 25 (+1 opcional) | 0 | **25** |
| Cap. V — secciones 5.9–5.13 | 17 (+1 opcional) | 0 | **17** |
| Cap. VI — evidencias Supabase | 8 | 0 | **8** |
| **Total** | **50 (+2)** | **0** | **50** |

> **Nota:** El control previo indicaba 53 capturas pendientes (incluyendo algunas opcionales). El recuento estricto de requeridas es 50. Las 3 opcionales no bloquean la entrega.

---

## 6. Diagramas Mermaid — estado de exportación

| Archivo | Capítulo | Tipo | Exportado a PNG | Ruta destino sugerida |
|---|---|---|---|---|
| `fig-5-2-secuencia-registro.mmd` | V §5.3.1 | sequenceDiagram | PENDIENTE | `evidencias/figuras/fig-5-2-secuencia-registro.png` |
| `fig-5-3-secuencia-postulacion.mmd` | V §5.6.1 | sequenceDiagram | PENDIENTE | `evidencias/figuras/fig-5-3-secuencia-postulacion.png` |
| `fig-5-4-secuencia-evidencias.mmd` | V §5.8.1 | sequenceDiagram | PENDIENTE | `evidencias/figuras/fig-5-4-secuencia-evidencias.png` |
| `fig-5-5-persistencia-decisiones.mmd` | V §5.9.8 | sequenceDiagram | PENDIENTE | `evidencias/figuras/fig-5-5-persistencia-decisiones.png` |
| `fig-5-6-flujo-requireAdmin.mmd` | V §5.10.2 | flowchart | PENDIENTE | `evidencias/figuras/fig-5-6-flujo-requireAdmin.png` |
| `fig-5-7-inicio-psicometrico.mmd` | V §5.11.3 | flowchart | PENDIENTE | `evidencias/figuras/fig-5-7-inicio-psicometrico.png` |

**Procedimiento:** Abrir https://mermaid.live/ → pegar contenido → descargar PNG a 1280×800 mínimo.

---

## 7. Verificación de consistencia de numeración

| Verificación | Resultado |
|---|---|
| Figuras con numeración duplicada | Ninguna detectada |
| Figuras referenciadas sin archivo | Fig. 5.1 (ASCII, pendiente de imagen); Fig. 5.2–5.7 (pendientes de PNG) |
| Tablas con numeración duplicada | No hay numeración formal de tablas en los capítulos (son tablas Markdown no etiquetadas) |
| Capturas fictícias declaradas como obtenidas | Ninguna |
| Bloques de código con secretos expuestos | Ninguno detectado (las URLs y keys mostradas son ejemplos o variables de entorno) |
