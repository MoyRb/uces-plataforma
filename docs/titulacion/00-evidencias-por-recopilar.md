# Evidencias por recopilar

**Proyecto:** UCES Plataforma de Talento (MVP)
**Fecha de actualización:** 2026-10-21

Este documento lista, de forma precisa y sin especulación, las evidencias que deben recopilarse antes de redactar cada sección del reporte. Cada evidencia está clasificada por prioridad y vinculada al capítulo que la requiere.

**Prioridad:**
- `ALTA` — bloquea la redacción del capítulo si no se obtiene
- `MEDIA` — permite redactar con salvedad; debe resolverse antes de la defensa
- `BAJA` — enriquece el reporte pero no es obligatoria

---

## Bloque 1 — Contexto institucional (Capítulo 2)

### EV-01 | Documento de adscripción o carta de presentación institucional
- **Para qué:** Acreditar que el proyecto se desarrolló formalmente en UCES, en el área de Recursos Humanos.
- **Qué debe contener:** Nombre de la institución, área receptora, periodo de residencias, nombre del asesor externo, firma o sello institucional.
- **Prioridad:** ALTA
- **Sin esta evidencia:** El capítulo de contexto solo puede apoyarse en la declaración del desarrollador, lo cual puede ser cuestionado por el jurado.

### EV-02 | Descripción del proceso de reclutamiento previo
- **Para qué:** Sustentar la problemática planteada (P-04).
- **Qué debe contener:** Cualquier documento institucional que describa cómo se recibían y evaluaban candidatos antes del sistema: correo, formulario, proceso por pasos o descripción del responsable de RH.
- **Prioridad:** MEDIA
- **Sin esta evidencia:** La problemática se redactará como información declarada por el desarrollador, con la aclaración correspondiente.

---

## Bloque 2 — Despliegue y uso del sistema (Capítulos 3 y 6)

### EV-03 | URL pública del despliegue en Vercel
- **Para qué:** Demostrar que el sistema fue desplegado y es accesible.
- **Qué debe contener:** Dominio asignado por Vercel o dominio personalizado, captura de pantalla de la landing page desde el navegador con la URL visible.
- **Prioridad:** ALTA
- **Sin esta evidencia:** No se puede afirmar que el sistema fue desplegado en producción; quedaría como "preparado para despliegue local".

### EV-04 | Captura de pantalla de la configuración de variables de entorno en Vercel
- **Para qué:** Documentar que las variables de entorno fueron configuradas correctamente en el entorno de producción (P-17).
- **Qué debe contener:** Pantalla del panel de configuración de Vercel mostrando los nombres de las variables (NEXT_PUBLIC_SUPABASE_URL, etc.) sin exponer los valores.
- **Prioridad:** BAJA

### EV-05 | Evidencia de uso institucional real
- **Para qué:** Diferenciar el despliegue técnico de la adopción operativa (P-03).
- **Qué debe contener:** Al menos uno de los siguientes: registros de usuarios creados en Supabase Auth (sin datos personales), confirmación escrita del área de RH, captura del dashboard de Supabase con actividad real.
- **Prioridad:** MEDIA
- **Sin esta evidencia:** El sistema se documenta como MVP funcional validado técnicamente, no como sistema en operación institucional. Esto es aceptable académicamente si se delimita con claridad.

---

## Bloque 3 — Instrumento psicométrico (Capítulo 5 y Marco teórico)

### EV-06 | Documento original del cuestionario institucional
- **Para qué:** Identificar la fuente del instrumento de evaluación (P-10).
- **Qué debe contener:** El cuestionario en cualquier formato (papel, PDF, correo) proporcionado por Ale Fraga o el área de RH de UCES, con los 20 ítems o el instrumento en el que se basaron.
- **Prioridad:** ALTA
- **Sin esta evidencia:** El reporte debe describir explícitamente que se desconoce la fuente bibliográfica del instrumento, lo cual limita la justificación del módulo psicométrico.

### EV-07 | Referencia o lineamiento institucional de los umbrales de clasificación
- **Para qué:** Justificar los criterios de clasificación Alta/Adecuada/Riesgo (P-11).
- **Qué debe contener:** Cualquier comunicación, documento o especificación que indique que los umbrales ≥16, 11-15, <11 fueron establecidos por la institución (no definidos arbitrariamente en código).
- **Prioridad:** ALTA
- **Sin esta evidencia:** Los umbrales se documentarán como valores definidos durante el desarrollo sin respaldo publicado ni institucional verificable.

### EV-08 | Verificación de la restricción por score psicométrico (P-12)
- **Para qué:** Confirmar o descartar si existe bloqueo automático de postulación basado en el resultado del psicométrico.
- **Qué debe contener:** Prueba funcional ejecutada: candidato con resultado "Riesgo" intentando postularse a una vacante. Resultado esperado según el desarrollador vs. resultado observado en el sistema.
- **Nota crítica:** La revisión del código (`api/vacancies/[id]/apply/route.ts`) muestra que el sistema ÚNICAMENTE verifica si el psicométrico fue completado (`psicometricoState.completed`), sin evaluar el score ni la clasificación. Si existe bloqueo por score, debe implementarse en una versión posterior, no documentarse como funcionalidad actual.
- **Prioridad:** ALTA

---

## Bloque 4 — Pruebas (Capítulo 6)

### EV-09 | Registro de ejecución del checklist E2E
- **Para qué:** Documentar las pruebas realizadas durante el desarrollo (P-18).
- **Qué debe contener:** Para cada escenario del README: fecha de ejecución, versión o commit probado, resultado observado (éxito / fallo / no probado), nombre o rol de quien ejecutó la prueba.
- **Prioridad:** ALTA — se puede generar ahora ejecutando el checklist con el sistema actual.
- **Acción recomendada:** Ejecutar el checklist documentado en `my-app/README.md` y registrar los resultados de forma estructurada.

### EV-10 | Matriz de casos de prueba formal
- **Para qué:** Sustituir la verificación informal por una documentación reproducible.
- **Qué debe contener:** Tabla con: ID de caso, módulo, precondición, pasos, resultado esperado, resultado observado, estado (pasa/falla).
- **Prioridad:** ALTA — puede elaborarse durante la redacción del Capítulo 6.
- **Alcance mínimo sugerido:** Registro, login, psicométrico, postulación, evaluación con timer, submit, resultado, revisión admin, decisión final.

### EV-11 | Evidencia de pruebas con usuarios institucionales
- **Para qué:** Documentar la validación con usuarios de UCES (P-19).
- **Qué debe contener:** Descripción del escenario (sin datos personales), rol del usuario participante (candidato o administrador), funcionalidades revisadas, observaciones registradas.
- **Prioridad:** MEDIA
- **Sin esta evidencia:** La validación institucional se documenta como declaración del desarrollador, no como prueba de aceptación formal.

---

## Bloque 5 — Capturas de pantalla del sistema (Capítulo 5 y Anexos)

### EV-12 | Capturas del sistema en funcionamiento
- **Para qué:** Ilustrar los capítulos de desarrollo y servir como evidencia de implementación.
- **Qué debe contener:** Capturas de cada pantalla principal con el sistema en funcionamiento real (no mockups). Ver lista completa en `00-plan-paginacion.md`.
- **Prioridad:** ALTA
- **Pantallas mínimas requeridas:** landing, login, register, panel, módulos, vacante, psicométrico en curso, evaluación con timer y progreso, resultado, perfil del candidato, panel admin (resumen), revisión de intento con resumen psicométrico.

---

## Bloque 6 — Referencias bibliográficas (Marco teórico)

### EV-13 | Referencia bibliográfica del modelo Big Five
- **Para qué:** Sustentar teóricamente la descripción del instrumento psicométrico.
- **Qué debe contener:** Al menos una fuente académica publicada sobre el modelo Big Five (Costa & McCrae, Goldberg, o equivalente en español reconocido). Debe incluir año, editorial y datos de localización.
- **Prioridad:** ALTA

### EV-14 | Referencia bibliográfica sobre escala Likert
- **Para qué:** Justificar el uso de escala Likert en el instrumento.
- **Qué debe contener:** Fuente publicada que describa la escala Likert y su uso en cuestionarios de personalidad.
- **Prioridad:** MEDIA

### EV-15 | Referencia bibliográfica sobre JWT y seguridad web
- **Para qué:** Sustentar las decisiones de seguridad (JWT, HMAC, RLS).
- **Qué debe contener:** RFC 7519 (JWT), OWASP Top 10, o documentación técnica equivalente.
- **Prioridad:** MEDIA

---

## Resumen de prioridades

| ID | Evidencia | Prioridad | Puede generarse ahora |
|---|---|---|---|
| EV-01 | Carta/documento institucional | ALTA | No — requiere gestión con UCES |
| EV-02 | Descripción del proceso previo | MEDIA | Parcialmente con declaración del desarrollador |
| EV-03 | URL del despliegue Vercel | ALTA | Sí — verificar en dashboard de Vercel |
| EV-04 | Captura de vars de entorno Vercel | BAJA | Sí |
| EV-05 | Evidencia de uso institucional | MEDIA | Parcial — captura de Supabase Auth |
| EV-06 | Cuestionario original de UCES | ALTA | No — requiere al equipo de RH |
| EV-07 | Lineamiento de umbrales | ALTA | No — requiere confirmación institucional |
| EV-08 | Verificación de restricción por score | ALTA | Sí — prueba funcional ejecutable |
| EV-09 | Registro del checklist E2E | ALTA | Sí — ejecutar ahora con el sistema |
| EV-10 | Matriz formal de casos de prueba | ALTA | Sí — elaborar durante redacción |
| EV-11 | Evidencia pruebas con usuarios | MEDIA | Parcial — declaración del desarrollador |
| EV-12 | Capturas de pantalla del sistema | ALTA | Sí — tomar con el sistema en ejecución |
| EV-13 | Ref. bibliográfica Big Five | ALTA | Sí — búsqueda bibliográfica |
| EV-14 | Ref. bibliográfica Likert | MEDIA | Sí — búsqueda bibliográfica |
| EV-15 | Ref. bibliográfica JWT/seguridad | MEDIA | Sí — RFC 7519, OWASP |
