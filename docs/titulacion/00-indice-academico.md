# Índice Académico Propuesto — Reporte de Residencias Profesionales

**Proyecto:** UCES Plataforma de Talento (MVP)
**Programa:** Ingeniería en Sistemas Computacionales
**Estimación de extensión:** 150 páginas aproximadas

---

## Estructura general

```
Portada
Página de firmas (asesor interno, asesor externo, estudiante)
Resumen ejecutivo
Índice de contenido
Índice de figuras
Índice de tablas
```

---

## Capítulo 1 — Introducción (aprox. 8 páginas)

1.1 Antecedentes del proyecto
1.2 Descripción general del sistema desarrollado
1.3 Objetivo general
1.4 Objetivos específicos
1.5 Justificación
1.6 Alcance y limitaciones del proyecto
1.7 Organización del documento

**Contenido sugerido:** Describir la necesidad de digitalizar el proceso de reclutamiento universitario de UCES, los procesos manuales que se buscaba reemplazar o complementar, y la propuesta de un MVP web con evaluación en línea. Mencionar el carácter de trabajo técnico de residencias y delimitar con claridad qué está implementado versus qué queda fuera del alcance.

---

## Capítulo 2 — Contexto organizacional (aprox. 10 páginas)

2.1 Descripción de la organización receptora (UCES)
2.2 Área de adscripción de las residencias
2.3 Problemática identificada
2.4 Descripción del proceso de reclutamiento previo
2.5 Requerimientos generales planteados

**Contenido sugerido:** Describir la estructura organizacional del área donde se desarrolló el proyecto, el proceso manual que se buscaba apoyar, y cómo se formularon los requerimientos. No inventar entrevistas ni reuniones que no puedan verificarse.

---

## Capítulo 3 — Marco teórico (aprox. 22 páginas)

3.1 Aplicaciones web de una sola página (SPA) y arquitecturas basadas en servidor
3.2 Next.js y el modelo de renderizado híbrido (Server Components / Client Components)
3.3 Backend como Servicio (BaaS): Supabase
   3.3.1 PostgreSQL como motor relacional
   3.3.2 Supabase Auth y JSON Web Tokens
   3.3.3 Row Level Security (RLS) en PostgreSQL
   3.3.4 Supabase Storage
3.4 TypeScript: tipado estático en entornos JavaScript
3.5 Tailwind CSS y el modelo utility-first
3.6 Componentes de UI reutilizables: shadcn/ui y Radix UI
3.7 Seguridad en aplicaciones web
   3.7.1 Autenticación basada en JWT
   3.7.2 Hash con HMAC-SHA256 para datos sensibles
   3.7.3 Políticas de acceso a recursos
3.8 Evaluación psicológica en procesos de selección
   3.8.1 Modelo Big Five de personalidad
   3.8.2 Escala Likert
   3.8.3 Adaptación al contexto de selección universitaria
3.9 Modelo Entidad-Relación y diseño de base de datos relacional
3.10 Control de versiones con Git y GitHub

**Contenido sugerido:** Cada sección del marco teórico debe tener referencia bibliográfica verificable. La sección de Big Five debe apoyarse en literatura de psicología organizacional. La sección de Next.js puede apoyarse en la documentación oficial del framework.

---

## Capítulo 4 — Análisis y diseño del sistema (aprox. 28 páginas)

4.1 Metodología de desarrollo
4.2 Análisis de requerimientos
   4.2.1 Requerimientos funcionales
   4.2.2 Requerimientos no funcionales
4.3 Casos de uso
   4.3.1 Actor: Candidato
   4.3.2 Actor: Administrador
4.4 Modelo de datos
   4.4.1 Diagrama Entidad-Relación
   4.4.2 Descripción de tablas
   4.4.3 Decisiones de diseño del esquema
4.5 Arquitectura del sistema
   4.5.1 Diagrama de componentes
   4.5.2 Patrón App Router de Next.js
   4.5.3 Separación entre Server Components y Client Components
   4.5.4 Clientes de Supabase: browser vs. server
4.6 Diseño de seguridad
   4.6.1 Modelo de roles
   4.6.2 Políticas RLS por tabla
   4.6.3 Protección de APIs con JWT
   4.6.4 Hashing de CURP
4.7 Diseño del test psicométrico
   4.7.1 Selección del instrumento
   4.7.2 Estructura de ítems en base de datos
   4.7.3 Algoritmo de scoring
4.8 Diseño de interfaz de usuario
   4.8.1 Principios de diseño aplicados
   4.8.2 Sistema de componentes
   4.8.3 Flujo de navegación por rol

---

## Capítulo 5 — Desarrollo del sistema (aprox. 50 páginas)

5.1 Configuración del entorno de desarrollo
   5.1.1 Estructura del repositorio
   5.1.2 Variables de entorno requeridas
   5.1.3 Inicialización del proyecto Supabase

5.2 Base de datos
   5.2.1 Implementación del esquema (schema.sql)
   5.2.2 Tabla user_roles y función get_my_role()
   5.2.3 Políticas RLS (rls.sql)
   5.2.4 Migraciones incrementales
   5.2.5 Datos de prueba (seed.sql)

5.3 Módulo de autenticación y registro
   5.3.1 Registro con validación y hash de CURP
   5.3.2 Inicio de sesión y gestión de sesión
   5.3.3 Resolución de rol mediante RPC

5.4 Módulo del candidato
   5.4.1 Panel principal (/panel)
   5.4.2 Exploración de módulos y vacantes
   5.4.3 Detalle de vacante y postulación
   5.4.4 Seguimiento en perfil (/perfil)

5.5 Módulo de evaluación
   5.5.1 Arquitectura del componente de evaluación (Server + Client)
   5.5.2 Guardado automático de respuestas
   5.5.3 Temporizador y envío automático por tiempo agotado
   5.5.4 Carga de evidencia práctica
   5.5.5 Procesamiento del envío y cálculo de scores

5.6 Módulo psicométrico
   5.6.1 Semilla de ítems Mini Big Five
   5.6.2 Lógica de inicio y reanudación de intento
   5.6.3 Algoritmo de cálculo (calculatePsicometricoSummary)
   5.6.4 Almacenamiento del resumen psicométrico
   5.6.5 Restricción de postulación previa al psicométrico

5.7 Panel administrativo
   5.7.1 Middleware de autorización (requireAdmin)
   5.7.2 CRUD de módulos
   5.7.3 CRUD de vacantes
   5.7.4 Configuración de evaluaciones y preguntas
   5.7.5 Listado y filtrado de intentos
   5.7.6 Revisión detallada de intentos
   5.7.7 Flujo de decisión (aprobado/rechazado)
   5.7.8 Acceso a evidencia con URL firmada

5.8 Integración con Supabase Storage
   5.8.1 Configuración del bucket
   5.8.2 Política de acceso al bucket
   5.8.3 Generación de URLs firmadas

---

## Capítulo 6 — Pruebas (aprox. 12 páginas)

6.1 Estrategia de verificación
6.2 Checklist de pruebas E2E documentado en README
6.3 Pruebas funcionales por módulo
   6.3.1 Flujo de registro
   6.3.2 Flujo del candidato (psicométrico → postulación → evaluación → resultado)
   6.3.3 Flujo administrativo (creación de vacante → revisión de intento → decisión)
6.4 Verificación de seguridad
   6.4.1 Intentos de acceso sin autenticación
   6.4.2 Intentos de acceso con rol no autorizado
6.5 Resultados observados
6.6 Defectos identificados y resolución

**Contenido sugerido:** Documentar únicamente pruebas realizadas efectivamente con el sistema en ejecución. No inventar métricas de rendimiento ni resultados de pruebas de carga.

---

## Capítulo 7 — Conclusiones y trabajo futuro (aprox. 8 páginas)

7.1 Conclusiones del desarrollo
7.2 Competencias adquiridas durante la residencia
7.3 Cumplimiento de objetivos
7.4 Limitaciones del MVP actual
7.5 Recomendaciones y trabajo futuro
   7.5.1 Middleware de protección de rutas en el servidor
   7.5.2 CRUD de tareas prácticas en panel admin
   7.5.3 Rol de revisor
   7.5.4 Notificaciones automatizadas
   7.5.5 Despliegue en producción

---

## Referencias bibliográficas (aprox. 3 páginas)

(Mínimo 15 referencias en formato APA o IEEE según lineamientos institucionales)

Incluir obligatoriamente:
- Documentación oficial de Next.js
- Documentación oficial de Supabase
- Referencia del modelo Big Five (Costa & McCrae, u otra fuente académica verificada)
- Referencia de escala Likert
- Referencias de seguridad web (OWASP, RFC de JWT)
- Referencias de PostgreSQL y RLS

---

## Anexos (páginas variables)

Anexo A — Esquema completo de la base de datos
Anexo B — Listado de endpoints de la API con descripción
Anexo C — Ítems del test psicométrico Mini Big Five
Anexo D — Manual de configuración y despliegue
Anexo E — Capturas de pantalla del sistema
Anexo F — Historial de commits relevantes
