# Preguntas pendientes de confirmación (versión actualizada)

**Proyecto:** UCES Plataforma de Talento (MVP)
**Actualización:** 2026-10-21

Las preguntas P-01 a P-20 fueron respondidas por el desarrollador en el documento `00-respuestas-aclaraciones.md`. Este archivo conserva únicamente los puntos que requieren evidencia documental adicional o cuya respuesta presenta discrepancias con el código fuente verificado.

---

## Puntos con discrepancia entre la declaración del desarrollador y el código

### D-01 | Bloqueo de postulación basado en score psicométrico (originalmente P-12)

**Declaración del desarrollador:** "El comportamiento previsto contempla impedir una nueva postulación a esa misma vacante cuando exista una condición restrictiva asociada al resultado o decisión correspondiente."

**Verificación en código:** El endpoint `POST /api/vacancies/[id]/apply/route.ts` (líneas 27-41) únicamente verifica que el psicométrico haya sido completado (`psicometricoState.completed`). No evalúa el score ni la clasificación del resultado. Un candidato con clasificación "Riesgo" puede postularse a cualquier vacante abierta sin restricción basada en el resultado psicométrico. Tampoco existe lógica que bloquee re-postulaciones basándose en una decisión de rechazo previa.

**Estado de la funcionalidad:** NO IMPLEMENTADA en el MVP actual.

**Acción requerida antes de redactar:**
- Confirmar con el desarrollador si el bloqueo por score es un requisito pendiente de implementación o si fue retirado del alcance.
- Si es pendiente: documentarlo en la sección de trabajo futuro (Cap. 7).
- Si fue retirado: documentar la decisión de mantener la supervisión manual en el administrador.
- En ningún caso se debe describir este bloqueo como funcionalidad implementada.

---

### D-02 | Prioridad real de la tabla reviews en el flujo de decisión (originalmente P-08)

**Declaración del desarrollador:** "La tabla `reviews` se conserva como un mecanismo alternativo de compatibilidad."

**Verificación en código:** Los endpoints `app/api/admin/attempts/[id]/route.ts` (PATCH, función `persistDecisionAndNotes`) y `app/api/admin/attempts/[id]/detail/route.ts` (GET, función `readDecisionState`) muestran que `reviews` es el mecanismo **primario** de escritura y lectura de decisiones. El fallback hacia `attempts.decision` y `attempts.reviewer_notes` ocurre únicamente cuando la tabla `reviews` no existe (errores de código `42P01` o `PGRST205`). En un entorno donde `reviews` existe, todas las decisiones se almacenan y leen desde `reviews`.

**Aclaración requerida:** Confirmar con el desarrollador cuál es el estado real de la tabla `reviews` en el entorno de Supabase activo: ¿existe y tiene datos, o fue omitida al aplicar las migraciones? Esta distinción determina cuál capa de datos contiene las decisiones activas.

**Impacto en redacción:** La descripción del flujo de decisión administrativa debe reflejar que `reviews` es el almacén principal, no un residuo histórico.

---

## Puntos pendientes de evidencia documental

### P-02 | Documentación formal de la iniciativa

**Respuesta del desarrollador:** "La documentación institucional formal se encuentra en proceso de elaboración."

**Pendiente:** Incorporar al menos un documento de definición del proyecto con alcances y objetivos acordados, antes de la defensa del reporte. Ver EV-01 en `00-evidencias-por-recopilar.md`.

---

### P-10 / P-11 | Fuente y umbrales del instrumento psicométrico

**Respuesta del desarrollador:** El instrumento fue proporcionado por Ale Fraga de UCES. Los umbrales son criterios institucionales.

**Pendiente:** Obtener o localizar el cuestionario original (EV-06) y el documento que establece los umbrales (EV-07) para poder hacer referencia a ellos en el Marco teórico. Sin estos documentos, el reporte debe declarar explícitamente que no se dispone de la fuente bibliográfica del instrumento.

**Implicación académica:** El modelo Big Five puede referenciarse con literatura publicada (Costa & McCrae, Goldberg). La adaptación específica de 20 ítems y los umbrales de clasificación utilizados en UCES deben identificarse como criterios institucionales o como adaptación sin validación publicada. Atribuirles validez psicométrica sin respaldo es un riesgo académico.

---

### P-03 / P-16 / P-19 | Evidencia del despliegue y uso institucional

**Respuesta del desarrollador:** Sistema desplegado en Vercel (cuenta MoyRb). Pruebas realizadas con usuarios de UCES, sin registros consolidados.

**Pendientes:**
1. URL pública del despliegue (EV-03).
2. Evidencia de actividad real o confirmación del área de RH (EV-05).
3. Descripción documentable de las pruebas con usuarios institucionales (EV-11).

**Aclaración importante:** El reporte puede presentar el sistema como MVP funcional desplegado sin necesidad de acreditar uso institucional masivo. Lo que no es aceptable es afirmar uso institucional sin evidencia.

---

### P-18 | Registro del checklist E2E

**Respuesta del desarrollador:** El checklist del README fue ejecutado informalmente; sin expediente formal.

**Pendiente:** Ejecutar el checklist documentado en `my-app/README.md` y registrar los resultados en una tabla estructurada (EV-09). Esto puede hacerse en cualquier momento con el sistema en ejecución.

---

## Puntos cerrados (no requieren confirmación adicional)

Los siguientes puntos fueron respondidos adecuadamente y el código confirma o no contradice las respuestas:

| Punto | Resolución |
|---|---|
| P-01 — Área de adscripción | Declarado como RH de UCES. Aceptable como contexto institucional. |
| P-04 — Proceso manual previo | Declarado por el desarrollador. Coherente con el propósito del sistema. |
| P-05 — Metodología | Desarrollo incremental confirmado por historial Git (30+ commits, evolución progresiva). Sin Scrum formal. |
| P-06 — Fallback en get_my_role | Confirmado por código en roles.sql, rls.sql y migración. Decisión de retrocompatibilidad intencional. |
| P-07 — UUID fijo psicométrico | Confirmado por assessmentConstants.ts, seed.sql. Decisión de conveniencia para un solo instrumento en MVP. |
| P-09 — Sin middleware.ts | Confirmado. Protección de datos recae en RLS + requireAdmin(). Protección de rutas es solo del lado del cliente. Documentar como limitación de arquitectura, no como omisión de seguridad de datos. |
| P-13 — Tareas prácticas sin CRUD | Confirmado. Tabla existe, sin panel admin. Configuración por SQL directo. Trabajo futuro. |
| P-14 — Rol reviewer | Confirmado como elemento heredado del schema. No implementado operativamente. |
| P-15 — Endpoint de estadísticas | Confirmado por código. Endpoint funcional con autenticación. Retorna applicationsCount y attemptsCount. No integrado en UI. Propuesta de integración como trabajo futuro. |
| P-17 — Variables de entorno | Confirmado. .env.local en desarrollo, Vercel para producción. Separación NEXT_PUBLIC_* vs. servidor correctamente implementada. |
| P-20 — Incidencias técnicas | Confirmadas por historial Git. PRs documentados para TypeScript, RLS, columnas faltantes, roles, tipado. |
