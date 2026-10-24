# Control de calidad — Corte 8D

**Fecha:** 2026-10-23
**Versión inspeccionada:** v0.1
**Archivos:** `UCES_Trabajo_B_Revision_v01.docx` (2,065 KB) + `UCES_Trabajo_B_Revision_v01.pdf` (2,424 KB, 168 páginas)

---

## 1. Resumen ejecutivo

| Indicador | Valor |
|---|---|
| DOCX generado correctamente | SÍ |
| PDF generado correctamente | SÍ (Microsoft Word COM via docx2pdf) |
| Páginas reales | 168 |
| Imágenes reales embebidas | 14 |
| Tablas integradas | 33 |
| Marcadores de figuras pendientes | 3 (EV-5A-11 inválida, EV-5B-02, EV-5B-03) |
| Capturas pendientes de obtención | 6 (EV-5A-11 re-captura, EV-5B-02, EV-5B-03, EV-5A-04, EV-5B-12, EV-6C-01/02 Studio) |
| Referencias con estado PENDIENTE | 8 de 33 |
| Defectos P0 | 3 |
| Defectos P1 | 9 |
| Defectos P2 | 6 |

---

## 2. Reporte de defectos clasificados

### P0 — Impiden lectura o entrega académica

| ID | Descripción | Página(s) | Acción requerida |
|---|---|---|---|
| P0-01 | Portada sin nombre de autor, matrícula ni asesor — marcadores rojos visibles | p.1 | El autor debe confirmar sus datos y el asesor designado; reemplazar los campos en `generar-docx.py` o directamente en el DOCX |
| P0-02 | EV-5A-11 es una captura de error 404 — insertada solo como marcador rojo | ~p.86 | Re-capturar la pantalla `/vacantes` con vacantes activas visibles; substituir imagen |
| P0-03 | Índice general, de figuras y de tablas son solo placeholders en azul — no generados | p.6 | Abrir el DOCX en Word → Referencias → Tabla de contenido → Actualizar tabla; luego insertar índices de figuras y tablas |

### P1 — Defectos relevantes de contenido o maquetación

| ID | Descripción | Página(s) | Acción requerida |
|---|---|---|---|
| P1-01 | **Figura 5.9 duplicada en §7.5.4** — la keyword "5.4" coincide con "7.5.4 Incidencias detectadas" en Cap VII, insertando la captura del panel candidato en un lugar incorrecto | ~p.160 | En `generar-docx.py` cambiar keyword "5.4" por "§5.4 Panel" o "Panel del candidato" para evitar coincidencia con Cap VII |
| P1-02 | **EV-5A-17 no muestra scores psicométricos** — imagen muestra confirmación de envío (UNDER_REVIEW), no la clasificación Alta/Adecuada/Riesgo por rasgo | ~p.92 | Re-capturar con candidato que haya respondido los 20 ítems Likert; caption corregido para v0.1 |
| P1-03 | **5 capturas no colocadas automáticamente** (EV-5A-17, EV-5B-03, EV-5B-08, EV-6C-05, EV-6C-06) — sus keywords de heading no coincidieron con ningún heading en los capítulos | Varias | Revisar los headings exactos en los capítulos e insertar las figuras manualmente en Word o ajustar los keywords en el script |
| P1-04 | **2 diagramas Mermaid no insertados** (fig-5-3-secuencia-postulacion, fig-5-5-persistencia-decisiones) — keywords no coincidieron | ~p.75, ~p.120 | Insertar manualmente en §5.5 y §5.10 respectivamente, o ajustar keywords |
| P1-05 | **EV-6C-06 muestra error de autenticación** en lugar de la discrepancia D-03 (solo 2 métricas) — el endpoint devuelve 401 sin sesión, no muestra el contenido real de la respuesta | ~p.148 | Re-capturar con sesión admin activa accediendo directamente a `/api/admin/stats`; caption ajustado para v0.1 |
| P1-06 | **Cap V excesivamente largo** (70 páginas) — bloques de código extensos no movidos a anexo | pp.65–134 | Identificar fragmentos de código >30 líneas y moverlos a Anexo A con referencia en el texto |
| P1-07 | **Listas de objetivos (OE-01..OE-07) en párrafos normales** en lugar de lista con formato — el markdown `**OE-01.**` se convierte como párrafo normal | ~pp.8–9 | Mejorar el parser para detectar y formatear líneas que empiezan con `**XX-NN.**` como lista con sangría |
| P1-08 | **EV-5B-02 y EV-5B-03 pendientes** — sin captura del panel de detalle admin ni formulario de decisión; los marcadores rojos aparecen en §5.10 | ~p.94 | Capturar con candidato con intento completo; ver acciones en `08c-pendientes-finales.md` |
| P1-09 | **Fig. 5.1 no reemplazada** (ASCII art de arquitectura) — el diagrama de capas aparece como bloque de código, no como imagen vectorial | ~p.66 | Crear diagrama como imagen (Mermaid, Draw.io) e insertar en §5.2 |

### P2 — Mejoras estéticas menores

| ID | Descripción | Acción para v0.2 |
|---|---|---|
| P2-01 | Logo UCES ausente en portada | Obtener logo institucional e insertar |
| P2-02 | Encabezado de página (título abreviado) no implementado | Agregar header en `generar-docx.py` con campo de sección automático |
| P2-03 | Numeración de páginas no configurada | Agregar campo `{PAGE}` en footer en `generar-docx.py` |
| P2-04 | Algunos bloques de código se parten entre páginas | Agregar `keep_together` a los párrafos de código |
| P2-05 | Marcadores de placeholders en rojo intenso — visibles en impresión B&N | Cambiar color a gris oscuro con indicador de texto más sutil |
| P2-06 | Salto de página al final de cada capítulo genera páginas en blanco cuando el capítulo termina exactamente en el borde de página | Investigar y suprimir saltos redundantes en `generar-docx.py` |

---

## 3. Estado de capturas

| Categoría | Cantidad | IDs |
|---|---|---|
| Válidas e insertadas | 14 | EV-5A-02, EV-5A-05, EV-5A-06, EV-5A-07, EV-5A-09, EV-5A-12, EV-5A-15, EV-5A-19, EV-5B-01, EV-5B-13, EV-5B-15, EV-6C-04, EV-6C-07, fig×4 |
| Válida pero no colocada en texto | 5 | EV-5A-17, EV-5B-08, EV-6C-05, EV-6C-06, fig-5-3, fig-5-5 |
| Inválida (404) — marcador en DOCX | 1 | EV-5A-11 |
| Pendiente de captura | 2 | EV-5B-02, EV-5B-03 |
| Bloqueada (Supabase Studio) | 4 | EV-5A-04, EV-5B-12, EV-6C-01, EV-6C-02 |

---

## 4. Estado de referencias bibliográficas

| Estado | Cantidad |
|---|---|
| VERIFICADAS | 25 |
| PENDIENTES de verificación manual | 8 (B-04, B-15, B-20, B-26, B-33 + 3) |
| **Total** | **33** |

> **Nota:** La bibliografía NO se declara completamente validada hasta concluir las 8 verificaciones pendientes. Ver `08b-validacion-referencias.md` §4 para acciones específicas.

---

## 5. Estado de portada y plantilla institucional

| Elemento | Estado |
|---|---|
| Nombre del autor | PENDIENTE — marcador rojo en portada |
| Matrícula | PENDIENTE — marcador rojo en portada |
| Nombre del asesor | PENDIENTE — marcador rojo en portada |
| Logo institucional UCES | AUSENTE — no disponible |
| Plantilla Word oficial UCES | NO CONFIRMADA — parámetros provisionales aplicados |
| Ciudad y fecha | Zamora, Michoacán — Octubre 2026 (provisional) |

---

## 6. Calidad de imágenes

| Evaluación | Resultado |
|---|---|
| Resolución mínima de capturas | 1280×900 px (generadas por Puppeteer) — adecuada para impresión a 14cm ancho |
| Imágenes con contenido incorrecto | EV-5A-11 (404), EV-5A-17 (no muestra scores), EV-6C-06 (muestra 401, no D-03) |
| Diagramas Mermaid | PNG 1400px ancho con fondo blanco — buena calidad |
| Datos sensibles visibles | Solo datos @prueba-uces.test (ficticio) — aceptable |
| CURP visible | FICA850315MDFBNC08 (ficticia — aceptable) |

---

## 7. Coherencia de tablas y figuras

| Verificación | Resultado |
|---|---|
| 33 tablas en DOCX | Confirmadas; incluyen tablas de los 7 capítulos más referencias |
| Numeración de figuras | Provisionales según `08c-plan-integracion-figuras.md` — algunas no coinciden por placeholders |
| Referencias cruzadas en texto | Las referencias "Ver Figura X.Y" en el cuerpo apuntan a números que podrían cambiar con la corrección de P1-01 |
| Tablas sin leyenda "Tabla X.Y." | Las leyendas de tabla requieren agregar la notación formal encima de cada tabla en v0.2 |

---

## 8. Errores de conversión DOCX/PDF

| Elemento | Estado |
|---|---|
| Caracteres especiales (tildes, ñ, ü) | Correctos en PDF — no se observan pérdidas de caracteres en inspección |
| Hipervínculos en bibliografía | Visibles en PDF como texto; no verificado si son clicables |
| Imágenes en PDF | 14 imágenes renderizadas correctamente según inspección de tamaño de archivo |
| Colores de placeholders (rojo) | Visibles en PDF según inspección de texto |
| Encabezados H1–H3 | Renderizados correctamente en PDF (verificado en extracción de texto) |

---

## 9. Inspección visual del PDF

> **Declaración:** La inspección visual fue realizada de forma programática (pypdf extract_text) y mediante revisión de los metadatos del archivo. No fue posible revisar visualmente cada página del PDF por no disponer de un visor en el entorno de automatización. Se recomienda que el autor abra el PDF en Adobe Acrobat Reader o equivalente y revise:
> 1. Portada (p.1)
> 2. Resumen y Abstract (pp.2–5)
> 3. Inicio de cada capítulo (pp.7, 16, 25, 45, 65, 135, 152)
> 4. Páginas de figuras (especialmente §5.4 y §7.5.4 para verificar P1-01)
> 5. Tablas de §6.5.3 (22 casos de prueba) y §7.5
> 6. Bibliografía (pp.166–168)
> 7. Verificar que no haya páginas en blanco inesperadas

El texto extraído programáticamente muestra contenido correcto en todas las páginas spot-chequeadas.
