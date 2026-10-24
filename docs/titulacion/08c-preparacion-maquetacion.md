# Preparación para maquetación — Corte 8C

**Fecha:** 2026-10-23
**Propósito:** Especificación editorial completa para la generación del documento Word final, complementando el plan general de `08a-plan-maquetacion.md` con los hallazgos del Corte 8C.

---

## 1. Estado de los insumos para maquetación

| Insumo | Estado | Ubicación |
|---|---|---|
| Cap. I — Introducción y generalidades | LISTO | `capitulos/01-introduccion-generalidades.md` |
| Cap. II — Contexto organizacional | LISTO | `capitulos/02-contexto-organizacional.md` |
| Cap. III — Marco teórico | LISTO | `capitulos/03-marco-teorico.md` |
| Cap. IV — Metodología de desarrollo | LISTO | `capitulos/04-metodologia-desarrollo.md` |
| Cap. V — Desarrollo e implementación | LISTO | `capitulos/05-desarrollo-implementacion.md` |
| Cap. VI — Pruebas y resultados | LISTO | `capitulos/06-pruebas-resultados.md` |
| Cap. VII — Conclusiones y trabajo futuro | LISTO | `capitulos/07-conclusiones-trabajo-futuro.md` |
| Resumen (español) | LISTO | `preliminares/resumen.md` |
| Abstract (inglés) | LISTO | `preliminares/abstract.md` |
| Bibliografía APA 7 (33 refs) | LISTO (8 pendientes de verificación) | `referencias/bibliografia-final.md` |
| 6 diagramas Mermaid (PNG) | LISTO | `diagramas/exportados/` |
| 15 capturas Categoría A | LISTO (14 aceptadas sin reservas; 1 verificar) | `evidencias/08c/candidato/`, `administrador/`, `validaciones/` |
| 2 capturas Categoría A pendientes | PENDIENTE | EV-5B-02, EV-5B-03 |
| 4 capturas Supabase Studio | PENDIENTE manual | EV-5A-04, EV-5B-12, EV-6C-01, EV-6C-02 |
| Plantilla Word institucional UCES | NO CONFIRMADA | Requerir al autor o asesor |

---

## 2. Parámetros editoriales confirmados

Basados en `08a-plan-maquetacion.md` y convenciones estándar de titulación ISC:

| Parámetro | Valor |
|---|---|
| Tamaño de papel | Carta (21.59 × 27.94 cm) |
| Fuente principal | Arial 11 pt |
| Interlineado | 1.5 líneas |
| Margen superior | 3 cm |
| Margen inferior | 2.5 cm |
| Margen izquierdo | 3 cm (para encuadernación) |
| Margen derecho | 2.5 cm |
| Alineación del cuerpo | Justificado |
| Numeración de páginas | Inicio en página 1 del Cap. I; páginas preliminares en romano minúsculo |
| Encabezado | Título abreviado del trabajo (derecha) |

---

## 3. Estilos Word requeridos

| Estilo | Aplicación | Formato |
|---|---|---|
| Título del trabajo | Portada | Arial 18 pt, negrita, centrado |
| Título 1 | Capítulos (`# Capítulo X`) | Arial 14 pt, negrita, nueva página |
| Título 2 | Secciones (`## X.Y`) | Arial 12 pt, negrita |
| Título 3 | Subsecciones (`### X.Y.Z`) | Arial 11 pt, negrita |
| Normal | Cuerpo del texto | Arial 11 pt, justificado, sangría 1.25 cm |
| Código | Bloques de código | Courier New 9 pt, fondo gris claro, sin sangría |
| Pie de figura | Leyendas de figuras | Arial 9 pt, cursiva, centrado |
| Pie de tabla | Leyendas de tablas | Arial 9 pt, negrita para "Tabla X.Y.", centrado |
| Cita en bloque | Citas textuales largas (>40 palabras) | Arial 10 pt, márgenes aumentados 1.25 cm ambos lados |
| Bibliografía | Entradas de referencias | Arial 11 pt, sangría francesa 1.25 cm |

---

## 4. Orden de ensamblaje del documento Word

```
1. Portada (página i)
   - Logo UCES
   - Título del trabajo
   - Nombre del autor
   - Matrícula
   - Nombre del asesor
   - Carrera: Ingeniería en Sistemas Computacionales
   - Ciudad, mes y año

2. Dedicatoria (página ii) — opcional

3. Agradecimientos (página iii) — opcional

4. Resumen (página iv)
   Fuente: preliminares/resumen.md

5. Abstract (página v)
   Fuente: preliminares/abstract.md

6. Índice general (página vi–viii)
   — generado automáticamente en Word con estilos Título 1/2/3

7. Índice de figuras (página ix)
   — generado automáticamente

8. Índice de tablas (página x)
   — generado automáticamente

9. Capítulo I (página 1)
   Fuente: capitulos/01-introduccion-generalidades.md

10. Capítulo II
    Fuente: capitulos/02-contexto-organizacional.md

11. Capítulo III
    Fuente: capitulos/03-marco-teorico.md

12. Capítulo IV
    Fuente: capitulos/04-metodologia-desarrollo.md

13. Capítulo V
    Fuente: capitulos/05-desarrollo-implementacion.md
    Figuras: diagramas/exportados/ + evidencias/08c/

14. Capítulo VI
    Fuente: capitulos/06-pruebas-resultados.md
    Figuras: evidencias/08c/validaciones/

15. Capítulo VII
    Fuente: capitulos/07-conclusiones-trabajo-futuro.md

16. Referencias bibliográficas
    Fuente: referencias/bibliografia-final.md

17. Anexo A — Fragmentos de código fuente
    Selección de snippets de my-app/

18. Anexo B — Capturas de pantalla adicionales

19. Anexo C — Diagramas en formato SVG

20. Anexo D — Capturas de Supabase Studio
    (insertar cuando se obtengan EV-5A-04, EV-5B-12, EV-6C-01, EV-6C-02)
```

---

## 5. Tratamiento de las figuras en Word

### Figuras de capturas de pantalla

1. Insertar imagen desde archivo PNG (no pegar del portapapeles)
2. Escalar a máximo 14 cm de ancho (cabe en el margen con bordes)
3. Alineación: centrada
4. Aplicar borde delgado (0.5 pt negro) para distinguirla del texto
5. Insertar leyenda inmediatamente debajo con estilo "Pie de figura"
6. Anclaje: "En línea con el texto" para que los índices automáticos funcionen
7. Texto alternativo (accesibilidad): descripción breve en inglés

### Figuras de diagramas Mermaid

1. Usar los archivos PNG de `diagramas/exportados/` (fondo blanco, 1400 px)
2. Los SVG se incluyen solo en Anexo C como material de referencia
3. Mismo tratamiento de escala y borde que las capturas
4. Verificar que el texto dentro del diagrama sea legible a 14 cm de ancho

### Placeholder para figuras pendientes

Para EV-5B-02, EV-5B-03 (y las 4 de Supabase Studio):
```
[FIGURA PENDIENTE: EV-5B-02 — Panel admin detalle candidato]
```
Insertar como texto en cuadro de texto gris hasta obtener la captura real.

---

## 6. Tratamiento de las tablas en Word

- Leyenda encima de la tabla: `Tabla X.Y.` en negrita + descripción en normal
- Estilo: borde exterior sólido 1 pt, bordes interiores 0.5 pt
- Encabezado de tabla (primera fila): fondo gris claro, negrita
- Fuente en tablas: Arial 10 pt para ahorrar espacio
- Tablas largas: activar "Repetir fila de encabezado" en las propiedades

---

## 7. Tratamiento de los bloques de código

Los capítulos V y VI contienen bloques de código TypeScript/JavaScript/SQL. En Word:
- Usar estilo "Código" (Courier New 9 pt, fondo gris claro)
- Si el bloque supera 40 líneas, mover a Anexo A con referencia en el texto
- No aplicar numeración de líneas automática (el Word no lo maneja bien)
- Preservar la indentación usando espacios, no tabulaciones

---

## 8. Condiciones bloqueantes antes de iniciar el Word

| Condición | Estado | Acción |
|---|---|---|
| Plantilla Word UCES disponible | DESCONOCIDO | Solicitar al asesor |
| EV-5A-17 muestra scores válidos (> 0) | VERIFICAR | Ver imagen antes de insertar |
| EV-5B-02 y EV-5B-03 obtenidas | PENDIENTE | Capturar con candidato con datos completos |
| 4 capturas Supabase Studio obtenidas | PENDIENTE | Captura manual |
| Todas las referencias BIB PENDIENTE verificadas | PARCIAL — 8 sin verificar | Verificar antes de imprimir versión final |

---

## 9. Estimación de páginas (actualizada con figuras)

| Sección | Texto | Figuras | Total estimado |
|---|---|---|---|
| Preliminares | 3 pág | — | 10–12 pág |
| Cap. I | 11 pág | 0 figuras | 11 pág |
| Cap. II | 11 pág | 0 figuras | 11 pág |
| Cap. III | 22 pág | 0 figuras | 22 pág |
| Cap. IV | 17 pág | 0 figuras | 17 pág |
| Cap. V | 42 pág | 23 figuras (~15 pág) | 57–60 pág |
| Cap. VI | 18 pág | 4 figuras (~3 pág) | 21–22 pág |
| Cap. VII | 8 pág | 0 figuras | 8 pág |
| Referencias | 5 pág | — | 5–6 pág |
| Anexos | — | 32 figuras (~20 pág) + código | 25–35 pág |
| **Total** | **137 pág** | **~33 pág figuras** | **187–218 pág** |
