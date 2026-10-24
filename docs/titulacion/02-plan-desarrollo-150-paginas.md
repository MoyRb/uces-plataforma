# Plan de desarrollo — Reporte ~133 páginas

**Trabajo:** "Desarrollo e implementación de una plataforma de reclutamiento para UCES"
**Fecha del plan:** 2026-10-22
**Estado al momento del plan:** Cap. I y II redactados (~22 páginas). Pendientes 5 capítulos + elementos preliminares.

---

## Estado actual de redacción

| Capítulo | Archivo | Estado | Páginas |
|---|---|---|---|
| Elementos preliminares | — | PENDIENTE | ~5 |
| Cap. I — Introducción | `capitulos/01-introduccion-generalidades.md` | REDACTADO (requiere corrección C-01) | ~11 |
| Cap. II — Contexto organizacional | `capitulos/02-contexto-organizacional.md` | REDACTADO (requiere corrección C-01) | ~11 |
| Cap. III — Marco teórico | `capitulos/03-marco-teorico.md` | PENDIENTE | ~18 |
| Cap. IV — Metodología | `capitulos/04-metodologia.md` | PENDIENTE | ~14 |
| Cap. V — Desarrollo | `capitulos/05-desarrollo-implementacion.md` | PENDIENTE | ~40 |
| Cap. VI — Pruebas | `capitulos/06-pruebas-resultados.md` | PENDIENTE | ~18 |
| Cap. VII — Conclusiones | `capitulos/07-conclusiones.md` | PENDIENTE | ~8 |
| Referencias | — | PENDIENTE | ~3 |
| Anexos | — | PENDIENTE | ~5 |
| **Progreso** | | **2/7 capítulos** | **~22/133 páginas (17%)** |

---

## Cortes de redacción propuestos

### Corte 3 — Capítulo III: Marco teórico (~18 páginas)

**Prioridad:** Alta. Necesario antes del Cap. IV porque establece el vocabulario técnico.

**Secciones a redactar:**

| Sección | Fuentes para redacción | Complejidad |
|---|---|---|
| 3.1 Next.js y App Router | Documentación oficial Next.js, `my-app/app/` structure | Media |
| 3.2 Supabase como BaaS | Documentación Supabase, `my-app/lib/supabaseClient.ts`, `supabaseServer.ts` | Media |
| 3.3 JWT y autenticación | RFC 7519, `my-app/lib/auth.ts`, `requireAdmin()` en api/admin/utils.ts | Media |
| 3.4 Row Level Security | PostgreSQL docs, `supabase/rls.sql` | Alta |
| 3.5 TypeScript | TypeScript handbook, tipos en `my-app/` | Baja |
| 3.6 Tailwind y shadcn/ui | Documentación, `my-app/components/` | Baja |
| 3.7 Big Five psicométrico | McCrae & Costa, `my-app/lib/psicometricoResults.ts` | Alta |
| 3.8 HMAC-SHA256 y CURP | Ley LFPDPPP, `my-app/lib/curp.ts` | Media |

**Archivos de código que deben leerse antes de redactar:**
- `my-app/lib/auth.ts`
- `my-app/lib/curp.ts`
- `my-app/lib/psicometricoResults.ts`
- `supabase/rls.sql`
- `my-app/app/api/admin/utils.ts`

**Restricciones del Cap. III:**
- No repetir conceptos del Cap. II del Trabajo A (análisis y diseño, UML, BD relacionales, metodologías)
- La sección 3.7 (Big Five) ES exclusiva del Trabajo B; desarrollarla con profundidad suficiente para justificar el instrumento
- Cada sección debe conectar el concepto teórico con su uso específico en el sistema (e.g., "RLS se aplica en el sistema mediante...")

---

### Corte 4 — Capítulo IV: Metodología de desarrollo (~14 páginas)

**Prioridad:** Media. Puede redactarse en paralelo con la lectura de código para el Cap. V.

**Secciones a redactar:**

| Sección | Fuentes para redacción | Complejidad |
|---|---|---|
| 4.1 Selección de metodología | Prototipado evolutivo (referencia al Trabajo A) | Baja |
| 4.2 Descripción del ciclo | Fases: prototipo inicial, evaluación, refinamiento | Baja |
| 4.3 Herramientas | Git log, `package.json`, Node.js, Supabase CLI | Baja |
| 4.4 Iteraciones del proyecto | Git history (commits por módulo), sprints informales | Alta |
| 4.5 Control de versiones | Estrategia de ramas, relación commit-funcionalidad | Media |
| 4.6 BD en desarrollo | `supabase/schema.sql`, `seed.sql`, migraciones en `supabase/` | Media |

**Insumos necesarios del repositorio:**
- Ejecutar `git log --oneline` para construir la narrativa de iteraciones
- Leer `supabase/schema.sql` y archivos de migración
- Documentar las 3-4 iteraciones principales identificables en el historial

**Restricciones del Cap. IV:**
- Declarar explícitamente "prototipado evolutivo" como metodología
- Mencionar que la metodología fue seleccionada a partir del análisis del Trabajo A
- No inventar fechas de sprint; usar los timestamps de los commits como evidencia

---

### Corte 5 — Capítulo V: Desarrollo e implementación (~40 páginas)

**Prioridad:** Máxima. Es el capítulo central del Trabajo B.

**Subsecciones por módulo:**

| Módulo | Archivos fuente | Tablas BD | Páginas est. |
|---|---|---|---|
| 5.1 Arquitectura general | `my-app/app/`, diagrama propio | Todas | 3 |
| 5.2 Estructura del proyecto | Árbol de directorios | — | 2 |
| 5.3 Autenticación y perfiles | `lib/auth.ts`, `app/login/`, `app/register/` | profiles, user_roles | 4 |
| 5.4 Módulo psicométrico | `lib/psicometrico.ts`, `lib/psicometricoResults.ts`, `app/psicometrico/` | attempts (JSONB) | 5 |
| 5.5 Vacantes y postulaciones | `app/vacantes/`, `app/panel/` | vacancies, applications | 3 |
| 5.6 Evaluación de conocimientos | `app/modulos/`, `app/evaluacion/`, `app/resultado/` | modules, questions, attempts, answers | 5 |
| 5.7 Panel administrativo | `app/admin/`, `app/api/admin/` | reviews (decisiones) | 4 |
| 5.8 Seguridad RLS | `supabase/rls.sql`, `lib/supabaseServer.ts` | Todas | 4 |
| 5.9 Protección CURP | `lib/curp.ts` | curp_hashes | 2 |
| 5.10-5.12 Diferencias y extras | Análisis del código vs. diseño | — | 8 |

**Lineamientos para el Cap. V:**
- Cada módulo: describir qué hace, mostrar fragmento de código representativo, mencionar tablas involucradas
- Fragmentos de código: seleccionar porciones que ilustren decisiones no triviales (e.g., la lógica de get_my_role(), la estructura JSONB del psicométrico)
- No transcribir archivos completos; usar extractos comentados
- Al describir una funcionalidad, mencionar el RF o CU del Trabajo A que implementa (e.g., "Este módulo implementa RF-05...")

---

### Corte 6 — Capítulo VI: Pruebas y resultados (~18 páginas)

**Prioridad:** Alta. Necesario para acreditar que el sistema funciona.

**Formato de los casos de prueba:**

```
| ID | Módulo | Descripción | Entrada | Resultado esperado | Resultado real | Estado |
|---|---|---|---|---|---|---|
| CP-01 | Autenticación | Registro con CURP válida | CURP bien formada | Usuario creado, sesión iniciada | [resultado] | PASA / FALLA |
```

**Secciones a redactar:**

| Sección | Insumo | Páginas est. |
|---|---|---|
| 6.1 Estrategia | Descripción del tipo de pruebas realizadas | 2 |
| 6.2-6.5 Casos por módulo | Ejecución manual con el sistema funcionando | 3 × 4 = 12 |
| 6.6 Tabla de resultados | Resumen tabular | 3 |
| 6.7 Hipótesis | I-1 confirmado por diseño; I-2, I-3 pendientes con propuesta | 3 |

**Nota sobre I-2 e I-3:** No inventar métricas. Documentar que la medición requiere uso real del sistema con el área de RH, y proponer el instrumento (encuesta, comparación de tiempos antes/después).

---

### Corte 7 — Capítulo VII: Conclusiones (~8 páginas)

**Prioridad:** Baja (redactar al final).

Cada objetivo específico OE-01 a OE-07 debe cerrarse con una conclusión que confirme si fue alcanzado. Usar la tabla de trazabilidad `00-matriz-trazabilidad.md` como insumo directo.

---

## Correcciones pendientes en capítulos existentes

| Corrección | Capítulo | Sección | Acción | Prioridad |
|---|---|---|---|---|
| C-01: Nombre completo de UCES | I y II | 1.1 y 2.1 | Agregar "Universidad Capital de Estudios Superiores (UCES)" | ALTA — antes del Corte 3 |
| C-07: Aclaración nombre del sistema | I | 1.2 | Nota aclaratoria sobre "UCES Plataforma de Talento" | MEDIA |
| C-05: Rol reviewer fuera del MVP | I | 1.6 | Agregar mención explícita | MEDIA — antes del Corte 5 |
| C-06: RN-04 (lista negra) fuera del MVP | I | 1.6 | Agregar mención | MEDIA — antes del Corte 5 |
| Marcadores EV-XX → notas al pie | I y II | Todos | Al maquetar en Word, no en archivos .md | BAJA — al cierre |

---

## Distribución final de páginas

| Elemento | Páginas |
|---|---|
| Portada + preliminares | 3 |
| Índice general + figuras | 2 |
| Resumen ejecutivo | 1 |
| Capítulo I | 11 |
| Capítulo II | 11 |
| Capítulo III | 18 |
| Capítulo IV | 14 |
| Capítulo V | 40 |
| Capítulo VI | 18 |
| Capítulo VII | 8 |
| Referencias | 3 |
| Anexos | 5 |
| **TOTAL** | **134** |

Margen de ajuste: ±10 páginas según densidad de código y capturas de pantalla. Rango aceptable: 124-144 páginas.

---

## Orden de redacción recomendado

1. **Inmediato (antes del próximo corte):**
   - Corrección C-01 en Cap. I (sección 1.1) y Cap. II (sección 2.1)

2. **Corte 3:** Cap. III — Marco teórico
   - Leer los archivos de código listados arriba antes de redactar
   - Redactar primero 3.7 (Big Five) porque requiere más investigación

3. **Corte 4:** Cap. IV — Metodología
   - Ejecutar `git log` para documentar las iteraciones
   - Relativamente corto; puede hacerse rápido después del Cap. III

4. **Corte 5:** Cap. V — Desarrollo (el más largo, dividir en dos sesiones)
   - Sesión 5a: secciones 5.1 a 5.6 (módulos candidato)
   - Sesión 5b: secciones 5.7 a 5.12 (admin, seguridad, diferencias)

5. **Corte 6:** Cap. VI — Pruebas
   - Ejecutar el sistema localmente para registrar resultados reales

6. **Corte 7:** Cap. VII — Conclusiones
   - Redactar después de tener todos los demás capítulos

7. **Cierre:** Referencias + Anexos + maquetación en Word

---

## Notas para la maquetación final (Word)

- Fuente: Arial 12pt, interlineado 1.5, márgenes 2.5 cm
- Fragmentos de código: fuente monoespaciada (Courier New 10pt), fondo gris claro, sin número de página
- Tablas: fuente 10pt, encabezados en negrita
- Imágenes/capturas: centradas, con pie de figura numerado
- Los marcadores `[EV-XX]` del texto .md deben convertirse en notas al pie numeradas
- Las secciones de código en .md (bloques ```) deben formatearse como "Figura X. Fragmento de código: [descripción]"
