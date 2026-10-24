# Control de figuras y evidencias — Capítulo V (Corte 5C)

**Fecha:** 2026-10-22

---

## 1. Registro de figuras del Capítulo V

| Figura | Título | Tipo | Sección | Archivo .mmd | Estado |
|---|---|---|---|---|---|
| Fig. 5.1 | Arquitectura de tres capas del sistema | Diagrama de arquitectura (tabla/prosa) | §5.1.2 | — | En capítulo |
| Fig. 5.2 | Diagrama de secuencia del registro de candidato | sequenceDiagram Mermaid | §5.3.2 | `diagramas/05a/fig-5-2-secuencia-registro.mmd` | En capítulo + .mmd |
| Fig. 5.3 | Diagrama de secuencia de la postulación | sequenceDiagram Mermaid | §5.6.1 | `diagramas/05a/fig-5-3-secuencia-postulacion.mmd` | En capítulo + .mmd |
| Fig. 5.4 | Flujo de almacenamiento de evidencias | sequenceDiagram Mermaid | §5.8.1 | `diagramas/05a/fig-5-4-secuencia-evidencias.mmd` | En capítulo + .mmd |
| Fig. 5.5 | Diagrama del flujo de persistencia de decisiones | sequenceDiagram Mermaid | §5.9.8 | `diagramas/05b/fig-5-5-persistencia-decisiones.mmd` | En capítulo + .mmd |
| Fig. 5.6 | Flujo de autorización en requireAdmin() | flowchart Mermaid | §5.10.2 | `diagramas/05b/fig-5-6-flujo-requireAdmin.mmd` | En capítulo + .mmd |
| Fig. 5.7 | Flujo de ensurePsicometricoAttempt() | flowchart Mermaid | §5.11.3 | `diagramas/05b/fig-5-7-inicio-psicometrico.mmd` | En capítulo + .mmd |

**Total figuras Capítulo V:** 7
**Figuras con archivo .mmd exportable:** 6 (Fig. 5.2 a 5.7)
**Figuras solo en prosa/tabla:** 1 (Fig. 5.1)

### Instrucciones de exportación a PNG

Para exportar cada `.mmd` a PNG:
1. Abrir https://mermaid.live/
2. Pegar el contenido del archivo `.mmd`
3. Descargar como PNG a resolución mínima 1280 × 800 px
4. Nombrar el archivo según la convención: `fig-5-N-descripcion.png`

---

## 2. Catálogo unificado de capturas de pantalla requeridas

Las siguientes capturas se necesitan para ilustrar el capítulo en su versión final maquetada en Word. Se consolidan los catálogos de Corte 5A y 5B.

### Convenciones

- Resolución mínima: 1280 × 800 px
- Formato: PNG
- Sesión de administrador para capturas del panel admin
- Censurar datos personales reales; usar datos de prueba visibles

### 2.1 Secciones 5.1 a 5.8 (Corte 5A) — 25 capturas

Ver lista completa en `docs/titulacion/evidencias/05a-capturas-pendientes.md`.

| Sección | Capturas requeridas | Capturas opcionales |
|---|---|---|
| 5.1 — Arquitectura | 1 | — |
| 5.2 — Registro | 3 | — |
| 5.3 — Autenticación | 2 | — |
| 5.4 — Panel candidato | 2 | — |
| 5.5 — Catálogo vacantes | 2 | — |
| 5.6 — Postulación | 3 | — |
| 5.7 — Evaluación | 5 | 1 (DevTools temporizador) |
| 5.8 — Evidencias | 7 | — |
| **Total 5A** | **25** | **1** |

### 2.2 Secciones 5.9 a 5.13 (Corte 5B) — 17 capturas

Ver lista completa en `docs/titulacion/evidencias/05b-capturas-pendientes.md`.

| Sección | Capturas requeridas | Capturas opcionales |
|---|---|---|
| 5.9 — Panel admin | 9 | — |
| 5.10 — Seguridad | 2 | 1 (DevTools Bearer) |
| 5.11 — Psicométrico | 4 | — |
| 5.12 — Diferencias | 2 | — |
| **Total 5B** | **17** | **1** |

### 2.3 Totales acumulados

| Concepto | Cantidad |
|---|---|
| Capturas requeridas Capítulo V | **42** |
| Capturas opcionales Capítulo V | **2** |
| Capturas obtenidas | 0 (PENDIENTE) |
| Capturas pendientes | 42 |

---

## 3. Capturas de alta prioridad para Capítulo VI

Las siguientes capturas son prioritarias porque documentan directamente las discrepancias D-01 a D-05 y las correcciones del Corte 5C. Deben obtenerse en las primeras sesiones de prueba del Capítulo VI.

| Prioridad | Captura | Archivo sugerido | Relacionado con |
|---|---|---|---|
| 1 | Candidato con Riesgo en algún rasgo puede postularse normalmente | `fig-5-12b-d01-postulacion-riesgo.png` | D-01 |
| 2 | Detalle de intento con decisión APPROVED y `decision_source` desde `reviews` | `fig-5-12a-decision-aprobado.png` | D-02 |
| 3 | Tabla `curp_hashes` en Supabase mostrando hashes sin CURPs en claro | `fig-5-10c-curp-hashes-tabla.png` | §5.10.8 |
| 4 | Panel admin — resumen Big Five con scores por rasgo | `fig-5-11c-admin-resumen-bigfive.png` | §5.11 |
| 5 | Panel admin — detalle de extroversión mostrando "Indicador sin filtro" | `fig-5-11d-admin-extroversion-indicador.png` | §5.11.6 |
| 6 | Error 403 al acceder a `/admin` con sesión de candidato | `fig-5-10a-acceso-denegado-admin.png` | §5.10.2 |

---

## 4. Estado de archivos de soporte

| Archivo | Tipo | Ubicación | Estado |
|---|---|---|---|
| `fig-5-2-secuencia-registro.mmd` | Mermaid source | `diagramas/05a/` | Creado |
| `fig-5-3-secuencia-postulacion.mmd` | Mermaid source | `diagramas/05a/` | Creado |
| `fig-5-4-secuencia-evidencias.mmd` | Mermaid source | `diagramas/05a/` | Creado |
| `fig-5-5-persistencia-decisiones.mmd` | Mermaid source | `diagramas/05b/` | Creado |
| `fig-5-6-flujo-requireAdmin.mmd` | Mermaid source | `diagramas/05b/` | Creado |
| `fig-5-7-inicio-psicometrico.mmd` | Mermaid source | `diagramas/05b/` | Creado |
| `05a-capturas-pendientes.md` | Catálogo capturas 5A | `evidencias/` | Creado |
| `05b-capturas-pendientes.md` | Catálogo capturas 5B | `evidencias/` | Creado |

---

## 5. Instrucciones para maquetación en Word

Al insertar figuras en el documento Word:

1. **Figuras Mermaid:** Exportar a PNG desde mermaid.live. Insertar con ancho de página (entre márgenes).
2. **Capturas de pantalla:** Insertar con bordes visibles (línea 0.5 pt gris). Centrar horizontalmente.
3. **Pie de figura:** `Figura 5.N — [Título]. Elaboración propia.`
4. **Numeración de tablas:** Usar estilo `Tabla 5.N — [Descripción]` antes de cada tabla. Aplicar al finalizar redacción del capítulo.
5. **Figuras referenciadas en texto:** Verificar que cada `Figura 5.N` mencionada en el cuerpo del texto tenga su imagen correspondiente.
