# Inventario de referencias a figuras — Corte 8F

**Fecha:** 2026-10-23
**Versión:** v0.3

---

## 1. Inventario completo de figuras v0.3

| fig_num | Descripción | Sección | Pág. v0.3 | Fuente en caption | Marcador |
|---|---|---|---|---|---|
| 5.2 | Diagrama de secuencia: registro de candidato | §5.3.1 | 81 | Elaboración propia | — |
| 5.3 | Diagrama de secuencia: postulación | §5.6.1 | 92 | Elaboración propia | — |
| 5.4 | Landing page pública (/) | §5.2 | 79 | Captura UCES Plataforma de Talento | — |
| 5.5 | Diagrama flujo: persistencia de decisiones | §5.9.8 | 84 | Elaboración propia | — |
| 5.6 | Error CURP ya registrada (CP-02a) | §5.3 | 84 | Captura UCES Plataforma de Talento | — |
| 5.7 | Formulario de inicio de sesión (/login) | §5.3 | 84 | Captura UCES Plataforma de Talento | — |
| 5.8 | Diagrama de secuencia: evidencias | §5.8 | 100 | Elaboración propia | — |
| 5.9 | Panel principal del candidato (/panel) | §5.4 | 89 | Captura UCES Plataforma de Talento | — |
| 5.10 | [Placeholder: ruta /vacantes no implementada] | §5.5 | 91 | N/A | ACTIVO |
| 5.11 | Detalle de vacante | §5.5 | 91 | Captura UCES Plataforma de Talento | — |
| 5.12 | Subida de archivo de evidencia | §5.6 | 92 | Captura UCES Plataforma de Talento | — |
| 5.13 | Panel de administración (/admin) | §5.9 | 104 | Captura UCES Plataforma de Talento | — |
| 5.14 | Acceso denegado (requireAdmin) | §5.10.2 | 111 | Captura UCES Plataforma de Talento | — |
| 5.15 | Diagrama flujo requireAdmin() | §5.10.2 | 111 | Elaboración propia | — |
| 5.16 | [Placeholder: EV-5B-02 pendiente] | §5.10 | 110 | N/A | ACTIVO |
| 5.17 | [Placeholder: EV-5B-03 pendiente] | §5.9.8 | 108 | N/A | ACTIVO |
| 5.18 | Guard prerequisito psicométrico | §5.11 | 118 | Captura UCES Plataforma de Talento | — |
| 5.19 | TEST MINI BIG FIVE — 20 ítems Likert | §5.11 | 50 | Captura UCES Plataforma de Talento | — |
| 5.20 | Confirmación envío evaluación (UNDER_REVIEW) | §5.11.5 | 122 | Captura UCES Plataforma de Talento | — |
| 5.21 | Diagrama inicio flujo psicométrico | §5.11 | 66 | Elaboración propia | — |
| 5.22 | Discrepancia D-01: guard por completitud | §5.13 | 131 | Captura UCES Plataforma de Talento | — |
| 6.1 | Evidencia CP-07: guard prerequisito | §6.5 | 142 | Captura UCES Plataforma de Talento | — |
| 6.2 | Evidencia CP-20: UNDER_REVIEW | §6.5.3 | 147 | Captura UCES Plataforma de Talento | — |
| 6.3 | Evidencia CP-18: error 401 en stats | §6.5 | 143 | Captura UCES Plataforma de Talento | — |
| 6.4 | Evidencia CP-22: RLS activo | §6.5 | 143 | Captura UCES Plataforma de Talento | — |

---

## 2. Referencias a figuras en el texto fuente

Las siguientes figuras tienen referencias explícitas en el texto de los capítulos (en formato `**Figura X.Y — descripción**` en el markdown fuente, convertidas como texto en negrita en el DOCX):

| fig_num | Texto de referencia en fuente | Capítulo |
|---|---|---|
| 5.2 | **Figura 5.2 — Diagrama de secuencia del registro de candidato** | Cap V §5.3.1 |
| 5.3 | **Figura 5.3 — Diagrama de secuencia de la postulación** | Cap V §5.6.1 |
| 5.5 | **Figura 5.5 — Diagrama del flujo de persistencia de decisiones** | Cap V §5.9.8 |
| 5.8 | **Figura 5.8 — Diagrama de secuencia de subida de evidencia** | Cap V §5.8 |
| 5.22 | Referenciada en §5.12.1 como evidencia de D-01 | Cap V §5.12 |

---

## 3. Clasificación por origen de imagen

| Origen | Cantidad | Figuras |
|---|---|---|
| Captura propia del sistema (UCES Plataforma de Talento) | 14 | 5.4, 5.6, 5.7, 5.9, 5.11, 5.12, 5.13, 5.14, 5.18, 5.19, 5.20, 5.22, 6.1, 6.2, 6.3, 6.4 |
| Diagrama de elaboración propia | 6 | 5.2, 5.3, 5.5, 5.8, 5.15, 5.21 |
| Placeholder / Marcador editorial | 3 | 5.10, 5.16, 5.17 |
| Reutilizada en dos secciones (EV-5A-17) | 1 | 6.2 (usa misma imagen que 5.20) |

---

## 4. Notas de fuente aplicadas

Todas las figuras de v0.3 tienen notas de fuente en el caption según su origen:

- **Capturas del sistema:** `"Captura de UCES Plataforma de Talento, 2026."`
- **Diagramas propios:** `"Elaboración propia con base en la implementación del sistema, 2026."`
- **Placeholders:** Texto descriptivo del contenido pendiente

---

## 5. Figuras que aún requieren acción

| fig_num | ID | Acción pendiente |
|---|---|---|
| 5.10 | EV-5A-11 | Placeholder permanente (ruta /vacantes no existe) — documentado en caption |
| 5.16 | EV-5B-02 | Captura pendiente: candidato con intento completo en /admin/attempts/[id] |
| 5.17 | EV-5B-03 | Captura pendiente: formulario de decisión admin |
| 5.20 | EV-5A-17 | Re-captura: necesita mostrar scores psicométricos por rasgo (no UNDER_REVIEW) |
| 6.3 | EV-6C-06 | Re-captura: necesita sesión admin activa (actualmente muestra error 401) |

---

## 6. Referencias cruzadas en Word (estado)

Las referencias en el texto como "Como se muestra en la Figura 5.9..." existen en el documento como:
1. **Texto en negrita** (`**Figura X.Y — Descripción**`) en los markdown fuente → aparecen como párrafos en negrita en el DOCX
2. **Texto inline** (`la Figura 5.9`, `Ver Figura X.Y`) en párrafos regulares del markdown

**No implementado en v0.3:** Los campos `REF` de Word (cross-references vinculadas a bookmarks) no han sido insertados programáticamente. Los marcadores de figuras en el texto son texto plano, no campos actualizables de Word. Esto es una tarea pendiente para versión posterior (requeriría post-procesado del DOCX con bookmarks en cada figura).

**Impacto práctico:** Las referencias existentes son legibles y apuntan correctamente a las figuras. La numeración no cambiará si se usa el generador para regenerar (las figuras tienen numeración fija en el código).
