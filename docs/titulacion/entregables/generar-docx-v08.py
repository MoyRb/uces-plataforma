#!/usr/bin/env python3
"""
Generador DOCX — UCES Trabajo B Revision v0.8
Corte 8K — 2026-10-25

Correcciones respecto a v0.7 (Corte 8K):
  K01: Portada — nota de fecha sin corchetes editoriales.
  K02: Bibliografía — nota roja de auditoría eliminada del documento.
  K03: FIGURE_PLACEMENTS — fig_num "5.5" duplicado eliminado
       (diagrama persistencia nunca se colocaba; 29 figuras reales).
  K04: parse_md_table — columnas explícitas 3.5 cm / resto para tablas
       de 2 columnas (corrige T-03..T-05 fragmentadas en PP.64-66).
  K05: §1.7 (cap01) — descripción de Cap IV y anuncio de anexos corregidos
       en la fuente markdown.
  K06: cap02 — marcadores editoriales [EV-01] / [EV-06] eliminados
       de la fuente markdown.
  K07: cap05 — referencia interna a "versión v0.4 del reporte" eliminada.
  K08: resumen.md — clasificación de matices corregida a INC-6B-01/02.
  K09: bibliografia-final.md — metadatos de auditoría y anotaciones
       *(PENDIENTE)* eliminados de la fuente markdown.
"""

import os
import re
import sys
from pathlib import Path

from docx import Document
from docx.shared import Inches, Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

# ─── Paths ────────────────────────────────────────────────────────────────────
BASE     = Path("C:/uces-plataforma/docs/titulacion")
CAPS     = BASE / "capitulos"
IMGS_CAP = BASE / "evidencias/08c/candidato"
IMGS_ADM = BASE / "evidencias/08c/administrador"
IMGS_VAL = BASE / "evidencias/08c/validaciones"
IMGS_DGM = BASE / "diagramas/exportados"
IMGS_SB  = BASE / "evidencias/08h/supabase"
IMGS_8J  = BASE / "evidencias/08j/administrador"
OUT_DIR  = BASE / "entregables"
OUT_DOCX = OUT_DIR / "UCES_Trabajo_B_Revision_v08.docx"
OUT_PDF  = OUT_DIR / "UCES_Trabajo_B_Revision_v08.pdf"

# ─── Datos institucionales (sin cambios respecto a v0.3) ─────────────────────
DATOS = {
    "institucion":  "INSTITUTO TECNOLÓGICO DE ESTUDIOS SUPERIORES DE ZAMORA",
    "carrera":      "INGENIERÍA EN SISTEMAS COMPUTACIONALES",
    "titulo":       ("DESARROLLO E IMPLEMENTACIÓN DE UN SISTEMA WEB DE RECLUTAMIENTO "
                     "DE PERSONAL PARA LA UNIVERSIDAD CAPITAL DE ESTUDIOS SUPERIORES"),
    "modalidad":    "Proyecto innovador",
    "autor":        "Moisés Medina Moreno",
    "matricula":    "22010350",
    "asesor":       "Dr. Francisco Rodríguez",
    "lugar":        "Zamora, Michoacán, México",
}

# ─── Captions de tabla (sin cambios respecto a v0.3) ─────────────────────────
TABLE_CAPTIONS = {
    (4, 1):  "Solución técnica T-01: acceso asíncrono en parámetros dinámicos de Next.js App Router.",
    (4, 2):  "Solución técnica T-02: circularidad en políticas de RLS al verificar roles.",
    (4, 3):  "Solución técnica T-03: tipado de relaciones anidadas en respuestas de Supabase.",
    (4, 4):  "Solución técnica T-04: almacenamiento del resumen psicométrico.",
    (4, 5):  "Solución técnica T-05: tipado del enumerado de decisiones de revisión.",
    (4, 6):  "Relación del proyecto con el proceso de prototipado evolutivo.",
    (5, 1):  "Componentes principales de la arquitectura del sistema implementada.",
    (5, 2):  "Comparación entre arquitectura propuesta e implementada.",
    (5, 3):  "Variables de entorno y contexto de disponibilidad.",
    (5, 4):  "Jerarquía módulos → vacantes (RF-04, RF-05).",
    (5, 5):  "Estados del intento de evaluación y sus transiciones.",
    (5, 6):  "Estructura de la tabla evidence_uploads.",
    (5, 7):  "Estructura de navegación por pestañas del panel administrativo.",
    (5, 8):  "Triple capa de defensa en la resolución de roles.",
    (5, 9):  "Uso y alcance del cliente privilegiado service_role.",
    (5, 10): "Variables de entorno y separación de credenciales del sistema.",
    (5, 11): "Limitaciones de seguridad identificadas en el MVP.",
    (5, 12): "Ítems del instrumento Mini Big Five implementado.",
    (6, 1):  "Tipos de prueba aplicados en el proyecto.",
    (6, 2):  "Verificaciones estáticas completadas en el Corte 6A.",
    (6, 3):  "Configuración del entorno local de pruebas.",
    (6, 4):  "Configuración del entorno de producción para pruebas.",
    (6, 5):  "Roles requeridos para la ejecución de pruebas.",
    (6, 6):  "Datos de prueba mínimos requeridos.",
    (6, 7):  "Herramientas de apoyo para la ejecución de pruebas.",
    (6, 8):  "Resumen de casos de prueba diseñados.",
    (6, 9):  "Prioridad de ejecución de los casos de prueba.",
    (6, 10): "Casos de prueba para verificación empírica de discrepancias.",
    (6, 11): "Estado de los casos de prueba al Corte 6A.",
    (6, 12): "Tabla resumen de resultados de ejecución.",
    (6, 13): "Verificación del estado final de discrepancias D-01 a D-05.",
    (7, 1):  "Evaluación del cumplimiento de los objetivos específicos.",
    (7, 2):  "Resultados consolidados y trabajo futuro.",
}

# ─── Heading matcher ──────────────────────────────────────────────────────────
_SECTION_NUM_RE = re.compile(r'^\d+(\.\d+)+$')

def matches_heading(kw, heading_text):
    if _SECTION_NUM_RE.match(kw):
        return bool(re.match(r'^' + re.escape(kw) + r'(\s|$)', heading_text))
    return kw.lower() in heading_text.lower()


# ─── G03 + G04: Figure placements with cross-reference text ──────────────────
# Format: (keyword, fig_num, img_path, caption, ev_id, cross_ref_text)
# cross_ref_text: sentence inserted before the figure as academic in-text reference.
# None → no sentence inserted (figure stands alone after heading).
FIGURE_PLACEMENTS = [
    # §5.1.2 — G04: Figura 5.1 — diagrama de arquitectura (nuevo en v0.4)
    ("5.1.2", "5.1",
     IMGS_DGM / "fig-5-1-arquitectura.png",
     "Figura 5.1. Arquitectura de tres capas implementada: navegador del usuario, servidor Next.js y Supabase BaaS. "
     "Elaboración propia con base en la implementación del sistema, 2026.",
     None,
     "En la Figura 5.1 se ilustra la arquitectura de tres capas implementada: "
     "la capa de presentación en el navegador mediante Client Components de React, "
     "la capa de lógica de negocio en el servidor Next.js mediante Server Components y Route Handlers, "
     "y la capa de datos provista por Supabase a través de Supabase Auth, PostgreSQL 16 y Storage."),

    # §5.3.1 — diagrama de secuencia de registro
    ("5.3.1", "5.2",
     IMGS_DGM / "fig-5-2-secuencia-registro.png",
     "Figura 5.2. Diagrama de secuencia: registro de candidato. Elaboración propia con base en la implementación del sistema, 2026.",
     None,
     "El diagrama de secuencia correspondiente al flujo de registro se muestra en la Figura 5.2, "
     "donde se detalla la interacción entre el cliente, el Route Handler de registro y Supabase Auth."),

    # §5.3 — landing page
    ("5.2", "5.4",
     IMGS_CAP / "EV-5A-02-landing.png",
     "Figura 5.4. Vista de la página de inicio pública del sistema (/). Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-02",
     "En la Figura 5.4 se muestra la página de inicio pública del sistema, "
     "accesible sin autenticación desde la ruta raíz (/)."),

    # §5.3 — registro form
    ("5.3", "5.5",
     IMGS_CAP / "EV-5A-05-registro-formulario.png",
     "Figura 5.5. Formulario de registro de candidato (/register). Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-05",
     "El formulario de registro de candidato se presenta en la Figura 5.5; "
     "el sistema valida la CURP mediante HMAC-SHA256 antes de crear el perfil en Supabase Auth."),

    # §5.3 — CURP duplicada
    ("Registro y autenticación", "5.6",
     IMGS_CAP / "EV-5A-06-curp-duplicada.png",
     "Figura 5.6. Mensaje de error por CURP ya registrada (CP-02a). Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-06",
     "En la Figura 5.6 se observa el mensaje de error generado al intentar registrar "
     "una CURP que ya existe en la base de datos, validando el cumplimiento de RF-02."),

    # §5.3 — login
    ("5.3", "5.7",
     IMGS_CAP / "EV-5A-07-login.png",
     "Figura 5.7. Formulario de inicio de sesión (/login). Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-07",
     "En la Figura 5.7 se muestra el formulario de inicio de sesión, "
     "implementado mediante Supabase Auth con credenciales de correo y contraseña."),

    # §5.4 — panel candidato
    ("Panel del candidato", "5.9",
     IMGS_CAP / "EV-5A-09-panel-candidato.png",
     "Figura 5.9. Panel principal del candidato autenticado (/panel). Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-09",
     "En la Figura 5.9 se muestra el panel principal del candidato autenticado, "
     "desde donde puede visualizar su estado psicométrico y las vacantes disponibles."),

    # §5.5 — detalle vacante  (J03: Fig 5.10; era Fig 5.11 — Fig 5.10 EV-5A-11 eliminada por Regla de Cierre)
    ("5.5", "5.10",
     IMGS_CAP / "EV-5A-12-detalle-vacante.png",
     "Figura 5.10. Detalle de vacante con descripción y botón de postulación (/vacantes/[id]). "
     "Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-12",
     "En la Figura 5.10 se presenta la vista de detalle de vacante, "
     "que muestra la descripción del puesto y el botón de postulación para candidatos elegibles. "
     "El acceso se realiza directamente desde el panel mediante la URL /vacantes/[id], "
     "sin una ruta de listado general."),

    # §5.6.1 — diagrama de secuencia de postulación
    ("5.6.1", "5.3",
     IMGS_DGM / "fig-5-3-secuencia-postulacion.png",
     "Figura 5.3. Diagrama de secuencia: proceso de postulación a vacante. Elaboración propia con base en la implementación del sistema, 2026.",
     None,
     "El flujo completo del proceso de postulación se ilustra en la Figura 5.3, "
     "donde se muestra la validación de prerequisito psicométrico previa a la creación del intento."),

    # §5.6 — subida evidencia  (J03: Fig 5.11; era Fig 5.12)
    ("5.6", "5.11",
     IMGS_CAP / "EV-5A-19-subida-evidencia.png",
     "Figura 5.11. Interfaz de subida de archivo de evidencia en módulo activo. Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-19",
     "En la Figura 5.11 se observa la interfaz de subida de archivo de evidencia, "
     "disponible únicamente cuando el módulo del candidato se encuentra en estado activo."),

    # §5.8 — diagrama secuencia evidencias
    ("5.8", "5.8",
     IMGS_DGM / "fig-5-4-secuencia-evidencias.png",
     "Figura 5.8. Diagrama de secuencia: subida de archivo de evidencia. Elaboración propia con base en la implementación del sistema, 2026.",
     None,
     "El diagrama de secuencia de la subida de evidencia se presenta en la Figura 5.8, "
     "describiendo la interacción entre el cliente, el Route Handler y el bucket privado en Supabase Storage."),

    # §5.9 — panel admin  (J03: Fig 5.12; era Fig 5.13)
    ("5.9", "5.12",
     IMGS_ADM / "EV-5B-01-admin-panel.png",
     "Figura 5.12. Panel de administración (/admin) con lista de candidatos y postulaciones. Captura de UCES Plataforma de Talento, 2026.",
     "EV-5B-01",
     "En la Figura 5.12 se muestra el panel de administración, "
     "que presenta la lista de candidatos con sus postulaciones y el estado de revisión correspondiente."),

    # §5.10 — admin detalle  (J01: Fig 5.15 — captura real EV-5B-02; era Fig 5.16 marcador)
    ("5.10", "5.15",
     IMGS_8J / "EV-5B-02-admin-detalle-candidato.png",
     "Figura 5.15. Vista de detalle de candidato en el panel de administración (/admin/attempts/[id]): "
     "datos generales, resumen psicométrico Mini Big Five y respuestas del intento. "
     "Captura de UCES Plataforma de Talento, 2026.",
     "EV-5B-02",
     "La Figura 5.15 muestra la vista de detalle de candidato en el panel administrativo "
     "(/admin/attempts/[id]), que integra los datos de la postulación, el resumen psicométrico "
     "con clasificación por rasgo del Mini Big Five y el historial de respuestas del intento."),

    # §5.10.2 — acceso denegado (requireAdmin)  (J03: Fig 5.13; era Fig 5.14)
    ("5.10.2", "5.13",
     IMGS_CAP / "EV-5B-08-acceso-denegado.png",
     "Figura 5.13. Redirección al intentar acceder a /admin sin sesión de administrador. Captura de UCES Plataforma de Talento, 2026.",
     "EV-5B-08",
     "En la Figura 5.13 se observa la redirección que recibe el usuario sin privilegios "
     "al intentar acceder a una ruta protegida por la función requireAdmin()."),

    # §5.10.2 — diagrama flujo requireAdmin  (J03: Fig 5.14; era Fig 5.15)
    ("requireAdmin", "5.14",
     IMGS_DGM / "fig-5-6-flujo-requireAdmin.png",
     "Figura 5.14. Diagrama de flujo de la función requireAdmin(). Elaboración propia con base en la implementación del sistema, 2026.",
     None,
     "El diagrama de flujo de requireAdmin() se ilustra en la Figura 5.14, "
     "mostrando la cadena de validación: verificación de sesión, consulta de rol y respuesta 401 en caso de fallo."),

    # §5.9.8 — formulario decisión  (J02: Fig 5.16 — captura real EV-5B-03; era Fig 5.17 marcador)
    ("Registro de decisiones", "5.16",
     IMGS_8J / "EV-5B-03-admin-decision.png",
     "Figura 5.16. Formulario de decisión en el panel de administración: "
     "selector de estado (APPROVED/REJECTED) y campo de notas del revisor. "
     "Captura de UCES Plataforma de Talento, 2026.",
     "EV-5B-03",
     "La Figura 5.16 muestra el formulario de decisión del administrador, "
     "que permite seleccionar el estado APPROVED o REJECTED para la postulación y registrar "
     "notas de revisión que quedan almacenadas en la tabla attempts."),

    # §5.11 — guard prereq  (J03: Fig 5.17; era Fig 5.18)
    ("5.11", "5.17",
     IMGS_CAP / "EV-5B-13-guard-prereq.png",
     "Figura 5.17. Guard de prerequisito: el candidato debe completar el test psicométrico antes de postularse. Captura de UCES Plataforma de Talento, 2026.",
     "EV-5B-13",
     "En la Figura 5.17 se muestra la pantalla de bloqueo que el sistema presenta "
     "al candidato que intenta postularse a una vacante sin haber completado la evaluación psicométrica."),

    # §5.11.1 — preguntas likert  (J03: Fig 5.18; era Fig 5.19)
    ("5.11.1", "5.18",
     IMGS_CAP / "EV-5A-15-psicometrico-preguntas.png",
     "Figura 5.18. Pantalla del TEST MINI BIG FIVE con 20 ítems Likert 1–5 y temporizador. Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-15",
     "En la Figura 5.18 se muestra la pantalla del TEST MINI BIG FIVE, "
     "que presenta los 20 ítems Likert en escala 1–5 junto con el temporizador de sesión."),

    # §5.11.3 — diagrama inicio psicométrico  (J03: Fig 5.20; era Fig 5.21)
    ("5.11.3", "5.20",
     IMGS_DGM / "fig-5-7-inicio-psicometrico.png",
     "Figura 5.20. Diagrama de inicio del flujo psicométrico con verificación de prerequisito. Elaboración propia con base en la implementación del sistema, 2026.",
     None,
     "El diagrama de inicio del flujo psicométrico se presenta en la Figura 5.20, "
     "describiendo la verificación de prerequisito y la creación del intento de evaluación."),

    # §5.11.5 — resultado psicométrico  (J03: Fig 5.19; era Fig 5.20)
    ("Umbrales de clasificación", "5.19",
     IMGS_CAP / "EV-5A-17-resultado-psicometrico.png",
     "Figura 5.19. Pantalla de confirmación de envío de evaluación (estado UNDER_REVIEW). "
     "Nota: los scores por rasgo no son visibles en esta captura por ausencia de respuestas registradas. "
     "Captura de UCES Plataforma de Talento, 2026.",
     "EV-5A-17",
     "En la Figura 5.19 se presenta la pantalla de confirmación de envío de la evaluación psicométrica, "
     "que muestra el estado UNDER_REVIEW mientras el sistema procesa los resultados."),

    # §5.13 — guard score d01  (J03: Fig 5.21; era Fig 5.22)
    ("5.13", "5.21",
     IMGS_CAP / "EV-5B-15-d01-guard-score.png",
     "Figura 5.21. Discrepancia D-01: el guard verifica el campo completed, no el score psicométrico. Captura de UCES Plataforma de Talento, 2026.",
     "EV-5B-15",
     "En la Figura 5.21 se observa la evidencia de la discrepancia D-01, "
     "donde el guard de prerequisito permite el acceso a candidatos cuyo intento tiene completed=true "
     "independientemente de los scores obtenidos por rasgo."),

    # Cap VI §6.5 — CP-07
    ("6.5", "6.1",
     IMGS_VAL / "EV-6C-04-cp07-guard-d01.png",
     "Figura 6.1. Evidencia del CP-07: comportamiento del guard de prerequisito psicométrico (Discrepancia D-01). Captura de UCES Plataforma de Talento, 2026.",
     "EV-6C-04",
     "La Figura 6.1 muestra la evidencia obtenida durante la ejecución del caso de prueba CP-07, "
     "que confirma empíricamente el comportamiento de la Discrepancia D-01."),

    # §6.5 — CP-18 stats
    ("Flujo del administrador", "6.3",
     IMGS_VAL / "EV-6C-06-cp18-stats-d03.png",
     'Figura 6.3. Evidencia del CP-18: respuesta {"error":"No autenticado"} al acceder a la API de estadísticas sin sesión activa. Captura de UCES Plataforma de Talento, 2026.',
     "EV-6C-06",
     "La Figura 6.3 muestra la respuesta de la API al ejecutar el CP-18, "
     "confirmando la Discrepancia D-03: el endpoint de estadísticas devuelve un error 401 "
     "en lugar de las métricas esperadas."),

    # §6.5.3 — CP-20
    ("6.5.3", "6.2",
     IMGS_CAP / "EV-5A-17-resultado-psicometrico.png",
     "Figura 6.2. Evidencia del CP-20: confirmación de envío de evaluación psicométrica (estado UNDER_REVIEW). Captura de UCES Plataforma de Talento, 2026.",
     "EV-6C-05",
     "En la Figura 6.2 se presenta la evidencia del CP-20, "
     "que verifica el flujo completo de envío de la evaluación psicométrica hasta el estado UNDER_REVIEW."),

    # §6.5 — CP-22 RLS
    ("CP-22", "6.4",
     IMGS_VAL / "EV-6C-07-cp22-rls.png",
     "Figura 6.4. Evidencia del CP-22: acceso restringido por Row Level Security en Supabase. Captura de UCES Plataforma de Talento, 2026.",
     "EV-6C-07",
     "En la Figura 6.4 se muestra la evidencia del CP-22, "
     "que confirma el funcionamiento de las políticas de Row Level Security (RLS) "
     "al intentar acceder a registros de otro usuario."),

    # ── I01 + J03: Capturas auténticas de Supabase Studio (renumeradas 5.22-5.25) ──

    # §5.9.6 — Tabla applications poblada  (J03: Fig 5.22; era Fig 5.23)
    ("5.9.6", "5.22",
     IMGS_SB / "SB-01-tablas-pobladas.png",
     "Figura 5.22. Entorno Supabase Studio: tabla applications con registros de postulaciones en distintos estados. "
     "Fuente: elaboración propia, captura del entorno de demostración de UCES en Supabase Studio, 2026.",
     "SB-01",
     "En la Figura 5.22 se presenta el Table Editor de Supabase Studio con los registros de la tabla "
     "`applications` poblados mediante los scripts de datos de prueba. La vista confirma la correcta "
     "persistencia de postulaciones en distintos estados: PENDING, EVALUATED, UNDER_REVIEW y APPROVED."),

    # §5.2.2 — Esquema relacional completo  (J03: Fig 5.23; era Fig 5.24)
    ("5.2.2", "5.23",
     IMGS_SB / "SB-02-esquema-relacional.png",
     "Figura 5.23. Visualizador de esquema relacional en Supabase Studio: las 13 tablas del sistema "
     "con sus relaciones de clave foránea. "
     "Fuente: elaboración propia, captura del entorno de demostración de UCES en Supabase Studio, 2026.",
     "SB-02",
     "La Figura 5.23 ilustra el esquema relacional completo del sistema mediante el Schema Visualizer "
     "de Supabase Studio. Se observan las 13 tablas del modelo de datos — profiles, user_roles, "
     "curp_hashes, modules, vacancies, assessments, questions, practical_tasks, applications, "
     "attempts, answers, evidence_uploads y reviews — con sus relaciones de clave foránea, "
     "confirmando la arquitectura de persistencia definida en supabase/schema.sql."),

    # §5.10.1 — Usuarios en Auth dashboard  (J03: Fig 5.24; era Fig 5.25)
    ("5.10.1", "5.24",
     IMGS_SB / "SB-03-usuarios-auth.png",
     "Figura 5.24. Panel de autenticación de Supabase Studio con los usuarios registrados en el sistema. "
     "Fuente: elaboración propia, captura del entorno de demostración de UCES en Supabase Studio, 2026.",
     "SB-03",
     "La Figura 5.24 muestra el panel de gestión de usuarios de Supabase Auth, donde cada fila "
     "corresponde a un registro en auth.users — la tabla interna gestionada exclusivamente por "
     "Supabase Auth que actúa como fuente de verdad para la identidad de candidatos y administradores. "
     "Los registros corresponden a usuarios de prueba creados mediante la Auth Admin API, "
     "con verificación de correo electrónico activada de forma programática."),

    # §5.10.9 — Bucket evidences privado  (J03: Fig 5.25; era Fig 5.26)
    ("5.10.9", "5.25",
     IMGS_SB / "SB-04-storage-evidencias.png",
     "Figura 5.25. Bucket de almacenamiento privado `evidences` en Supabase Storage. "
     "Fuente: elaboración propia, captura del entorno de demostración de UCES en Supabase Studio, 2026.",
     "SB-04",
     "La Figura 5.25 presenta el bucket `evidences` en el panel de Supabase Storage, "
     "configurado con acceso privado (`public = false`). Esta configuración impide la descarga "
     "directa de los archivos de evidencia sin las credenciales correspondientes; el acceso "
     "se realiza exclusivamente mediante URLs firmadas con vigencia de 60 minutos, "
     "generadas por el cliente de servicio en los Route Handlers del servidor."),
]


# ─── Page number field ────────────────────────────────────────────────────────
def add_page_number_field(paragraph):
    run = paragraph.add_run()
    fldChar1 = OxmlElement('w:fldChar')
    fldChar1.set(qn('w:fldCharType'), 'begin')
    run._r.append(fldChar1)
    run2 = paragraph.add_run()
    instrText = OxmlElement('w:instrText')
    instrText.set(qn('xml:space'), 'preserve')
    instrText.text = ' PAGE '
    run2._r.append(instrText)
    run3 = paragraph.add_run()
    fldChar2 = OxmlElement('w:fldChar')
    fldChar2.set(qn('w:fldCharType'), 'end')
    run3._r.append(fldChar2)


# ─── TOC / TOF field inserter ─────────────────────────────────────────────────
def add_toc_field(doc, instruction, placeholder="[Actualizando… Abrir en Word y presionar Ctrl+A → F9]"):
    para = doc.add_paragraph()
    para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT

    r1 = para.add_run()
    fc1 = OxmlElement('w:fldChar')
    fc1.set(qn('w:fldCharType'), 'begin')
    fc1.set(qn('w:dirty'), '1')
    r1._r.append(fc1)

    r2 = para.add_run()
    instr = OxmlElement('w:instrText')
    instr.set(qn('xml:space'), 'preserve')
    instr.text = f' {instruction} '
    r2._r.append(instr)

    r3 = para.add_run()
    fc2 = OxmlElement('w:fldChar')
    fc2.set(qn('w:fldCharType'), 'separate')
    r3._r.append(fc2)

    r4 = para.add_run(placeholder)
    r4.font.color.rgb = RGBColor(0, 0, 180)
    r4.font.italic = True
    r4.font.size = Pt(9)

    r5 = para.add_run()
    fc3 = OxmlElement('w:fldChar')
    fc3.set(qn('w:fldCharType'), 'end')
    r5._r.append(fc3)

    return para


# ─── Header/footer setup ──────────────────────────────────────────────────────
def setup_header_footer(doc):
    section = doc.sections[0]
    section.different_first_page_header_footer = True

    header = section.header
    hp = header.paragraphs[0] if header.paragraphs else header.add_paragraph()
    hp.clear()
    hp.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r = hp.add_run("ITESZ — INGENIERÍA EN SISTEMAS COMPUTACIONALES")
    r.font.name = "Arial"; r.font.size = Pt(8); r.font.color.rgb = RGBColor(100, 100, 100)

    footer = section.footer
    fp = footer.paragraphs[0] if footer.paragraphs else footer.add_paragraph()
    fp.clear()
    fp.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r1 = fp.add_run("— ")
    r1.font.name = "Arial"; r1.font.size = Pt(9); r1.font.color.rgb = RGBColor(100, 100, 100)
    add_page_number_field(fp)
    r2 = fp.add_run(" —")
    r2.font.name = "Arial"; r2.font.size = Pt(9); r2.font.color.rgb = RGBColor(100, 100, 100)


# ─── Document setup ───────────────────────────────────────────────────────────
def setup_document():
    doc = Document()
    section = doc.sections[0]
    section.page_width  = Cm(21.59)
    section.page_height = Cm(27.94)
    section.left_margin   = Cm(3.0)
    section.right_margin  = Cm(2.5)
    section.top_margin    = Cm(2.5)
    section.bottom_margin = Cm(2.5)

    doc.styles["Normal"].font.name = "Arial"
    doc.styles["Normal"].font.size = Pt(11)
    doc.styles["Normal"].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    doc.styles["Normal"].paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    doc.styles["Normal"].paragraph_format.line_spacing = 1.5
    doc.styles["Normal"].paragraph_format.space_after = Pt(6)

    for lvl, size, bold in [(1, 14, True), (2, 12, True), (3, 11, True), (4, 11, False)]:
        h = doc.styles[f"Heading {lvl}"]
        h.font.name = "Arial"; h.font.size = Pt(size); h.font.bold = bold
        h.font.color.rgb = RGBColor(0, 0, 0)
        h.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        h.paragraph_format.line_spacing = 1.5
        h.paragraph_format.space_before = Pt(12)
        h.paragraph_format.space_after  = Pt(6)
        h.paragraph_format.keep_with_next = True

    try:
        cs = doc.styles.add_style("Code Block", 1)
    except Exception:
        cs = doc.styles["Normal"]
    cs.font.name = "Courier New"; cs.font.size = Pt(9)
    cs.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    cs.paragraph_format.space_before = Pt(3); cs.paragraph_format.space_after = Pt(3)
    cs.paragraph_format.keep_together = True

    for style_name in ("FigureCaption", "TableCaption"):
        try:
            st = doc.styles.add_style(style_name, 1)
        except Exception:
            st = doc.styles.get(style_name, doc.styles["Normal"])
        st.font.name = "Arial"; st.font.size = Pt(9); st.font.italic = True
        st.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        st.paragraph_format.space_before = Pt(2); st.paragraph_format.space_after = Pt(8)

    setup_header_footer(doc)
    return doc


# ─── Shading / border helpers ─────────────────────────────────────────────────
def add_shading(para, fill="F2F2F2"):
    pPr = para._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), fill)
    pPr.append(shd)

def add_left_border(para, color="888888", space="12"):
    pPr = para._p.get_or_add_pPr()
    pb = OxmlElement("w:pBdr")
    left = OxmlElement("w:left")
    left.set(qn("w:val"), "single"); left.set(qn("w:sz"), "12")
    left.set(qn("w:space"), space); left.set(qn("w:color"), color)
    pb.append(left); pPr.append(pb)


# ─── Insert image with FigureCaption style ────────────────────────────────────
def insert_image(doc, img_path, caption_text, max_width_cm=14.0):
    if img_path is None or not Path(img_path).exists():
        p = doc.add_paragraph()
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(f"[ {caption_text} ]")
        run.font.color.rgb = RGBColor(150, 100, 0)
        run.font.bold = True; run.font.size = Pt(10)
        add_shading(p, "FFF8E8")
    else:
        para = doc.add_paragraph()
        para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        para.add_run().add_picture(str(img_path), width=Cm(max_width_cm))

    cap = doc.add_paragraph(caption_text)
    try:
        cap.style = doc.styles["FigureCaption"]
    except Exception:
        cap.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for r in cap.runs:
            r.font.size = Pt(9); r.font.italic = True


# ─── Insert table caption ─────────────────────────────────────────────────────
def insert_table_caption(doc, cap_num, cap_str, description):
    label = f"Tabla {cap_num}.{cap_str}. {description}"
    cap = doc.add_paragraph(label)
    try:
        cap.style = doc.styles["TableCaption"]
    except Exception:
        cap.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for r in cap.runs:
            r.font.size = Pt(9); r.font.italic = True


# ─── Page break ───────────────────────────────────────────────────────────────
def page_break(doc):
    para = doc.add_paragraph()
    run = para.add_run()
    run.add_break(__import__("docx.enum.text", fromlist=["WD_BREAK"]).WD_BREAK.PAGE)


# ─── Inline text parser ───────────────────────────────────────────────────────
def parse_inline(para, text):
    pattern = re.compile(
        r'(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)'
    )
    last = 0
    for m in pattern.finditer(text):
        if m.start() > last:
            r = para.add_run(text[last:m.start()])
            r.font.name = "Arial"; r.font.size = Pt(11)
        if m.group(1):
            r = para.add_run(m.group(2)); r.bold = True; r.italic = True
        elif m.group(3):
            r = para.add_run(m.group(4)); r.bold = True
        elif m.group(5):
            r = para.add_run(m.group(6)); r.italic = True
        elif m.group(7):
            r = para.add_run(m.group(8))
            r.font.name = "Courier New"; r.font.size = Pt(9)
        last = m.end()
    if last < len(text):
        r = para.add_run(text[last:])
        r.font.name = "Arial"; r.font.size = Pt(11)


# ─── Labeled item parser ──────────────────────────────────────────────────────
_LABELED_RE = re.compile(r'^\*\*([A-Z]{1,4}-\d{1,3}[\.\:]?)\*\*\s*(.*)')

def is_labeled_item(line):
    return bool(_LABELED_RE.match(line.strip()))

def add_labeled_item(doc, line):
    m = _LABELED_RE.match(line.strip())
    if not m:
        return False
    label = m.group(1).rstrip('.:')
    rest  = m.group(2).strip()
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Cm(1.0)
    p.paragraph_format.first_line_indent = Cm(-0.5)
    p.paragraph_format.space_after = Pt(4)
    r = p.add_run(f"{label}. "); r.bold = True; r.font.name = "Arial"; r.font.size = Pt(11)
    if rest:
        parse_inline(p, rest)
    return True


# ─── Markdown table parser ────────────────────────────────────────────────────
def parse_md_table(doc, lines):
    rows_data = []
    for ln in lines:
        ln = ln.strip()
        if not ln or re.match(r'^\|[-: |]+\|$', ln):
            continue
        cells = [c.strip() for c in ln.strip("|").split("|")]
        rows_data.append(cells)
    if not rows_data:
        return
    ncols = max(len(r) for r in rows_data)
    rows_data = [r + [""] * (ncols - len(r)) for r in rows_data]
    table = doc.add_table(rows=len(rows_data), cols=ncols)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    # K04: set explicit column widths to prevent narrow-cell fragmentation.
    # Text width = 16.09 cm (21.59 - 3.0 - 2.5 margins).
    # For 2-column "Elemento | Detalle" tables: 3.5 cm + 12.59 cm.
    if ncols == 2:
        for row in table.rows:
            row.cells[0].width = Cm(3.5)
            row.cells[1].width = Cm(12.59)
    elif ncols == 3:
        for row in table.rows:
            for ci in range(3):
                row.cells[ci].width = Cm(16.09 / 3)
    elif ncols == 4:
        for row in table.rows:
            for ci in range(4):
                row.cells[ci].width = Cm(16.09 / 4)
    for ri, row_cells in enumerate(rows_data):
        for ci, cell_text in enumerate(row_cells):
            cell = table.rows[ri].cells[ci]
            para = cell.paragraphs[0]
            if ri == 0:
                r = para.add_run(cell_text); r.bold = True; r.font.size = Pt(10)
            else:
                parse_inline(para, cell_text)
                for r in para.runs:
                    r.font.size = Pt(10)
            para.paragraph_format.space_before = Pt(2)
            para.paragraph_format.space_after  = Pt(2)
    doc.add_paragraph()


# ─── G03: Insert cross-reference sentence before a figure ────────────────────
def insert_cross_ref(doc, text):
    """Insert a justified academic paragraph introducing the figure."""
    p = doc.add_paragraph()
    p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    parse_inline(p, text)


# ─── Main markdown → docx converter ──────────────────────────────────────────
def convert_md_file(doc, md_path, figure_tracker, placed_fig_nums, chapter_num=0):
    """Convert markdown to Word content. G03: inserts cross-ref before each figure."""
    with open(md_path, encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")
    i = 0
    pending_figures = []   # list of dicts: {path, caption, cross_ref}
    chapter_table_counter = [0]

    def flush_pending():
        for fig_info in pending_figures:
            if fig_info.get("cross_ref"):
                insert_cross_ref(doc, fig_info["cross_ref"])
            insert_image(doc, fig_info["path"], fig_info["caption"])
        pending_figures.clear()

    while i < len(lines):
        line = lines[i]

        # ── Headings ──
        hm = re.match(r'^(#{1,4})\s+(.+)$', line)
        if hm:
            level = len(hm.group(1))
            heading_text = hm.group(2).strip().rstrip("-").strip()
            flush_pending()
            doc.add_heading(heading_text, level=level)
            for fp in figure_tracker:
                kw, fig_num = fp[0], fp[1]
                if matches_heading(kw, heading_text) and fig_num not in placed_fig_nums:
                    placed_fig_nums.add(fig_num)
                    cross_ref = fp[5] if len(fp) > 5 else None
                    pending_figures.append({
                        "path": fp[2],
                        "caption": fp[3],
                        "cross_ref": cross_ref,
                    })
            i += 1
            continue

        # ── Horizontal rule ──
        if re.match(r'^-{3,}$', line.strip()):
            i += 1
            continue

        # ── Code block ──
        if line.startswith("```"):
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                code_lines.append(lines[i]); i += 1
            i += 1
            code_text = "\n".join(code_lines)
            if code_text.strip():
                p = doc.add_paragraph(code_text)
                try:
                    p.style = doc.styles["Code Block"]
                except Exception:
                    p.runs[0].font.name = "Courier New"; p.runs[0].font.size = Pt(9)
                add_shading(p)
                p.paragraph_format.keep_together = True
            continue

        # ── Blockquote ──
        if line.startswith(">"):
            bq_lines = []
            while i < len(lines) and lines[i].startswith(">"):
                bq_lines.append(lines[i].lstrip(">").strip()); i += 1
            p = doc.add_paragraph(" ".join(bq_lines))
            p.paragraph_format.left_indent = Cm(1.0); p.paragraph_format.right_indent = Cm(0.5)
            add_left_border(p)
            for r in p.runs:
                r.font.italic = True; r.font.size = Pt(10)
            continue

        # ── Unordered list ──
        if re.match(r'^(\s*)[-*+]\s+', line):
            depth = len(re.match(r'^(\s*)', line).group(1)) // 2
            item_text = re.sub(r'^\s*[-*+]\s+', '', line)
            p = doc.add_paragraph(style="List Bullet")
            p.paragraph_format.left_indent = Cm(1.0 + depth * 0.5)
            parse_inline(p, item_text)
            i += 1
            continue

        # ── Ordered list ──
        if re.match(r'^\s*\d+[.)]\s+', line):
            item_text = re.sub(r'^\s*\d+[.)]\s+', '', line)
            p = doc.add_paragraph(style="List Number")
            parse_inline(p, item_text)
            i += 1
            continue

        # ── Table with caption ──
        if line.strip().startswith("|"):
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i]); i += 1
            flush_pending()
            if chapter_num > 0:
                chapter_table_counter[0] += 1
                t_n = chapter_table_counter[0]
                desc = TABLE_CAPTIONS.get(
                    (chapter_num, t_n),
                    f"Datos de la sección correspondiente al Capítulo {chapter_num}."
                )
                insert_table_caption(doc, chapter_num, t_n, desc)
            parse_md_table(doc, table_lines)
            continue

        # ── Empty line ──
        if line.strip() == "":
            if pending_figures:
                flush_pending()
            i += 1
            continue

        # ── Labeled item ──
        if line.strip() and is_labeled_item(line):
            flush_pending()
            add_labeled_item(doc, line)
            i += 1
            continue

        # ── Regular paragraph ──
        if line.strip():
            p = doc.add_paragraph()
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            parse_inline(p, line.strip())
            if pending_figures:
                flush_pending()
        i += 1

    flush_pending()


# ─── G01: Cover page (phrase removed, spacing rebalanced) ────────────────────
def add_cover(doc):
    """
    Portada corregida (G01):
    - Se elimina 'Reporte de titulación que para obtener el título de
      Ingeniero en Sistemas Computacionales'
    - Espaciado vertical rebalanceado
    - Se conserva 'Proyecto innovador' (modalidad institucional)
    """
    def centered(text, size, bold=False, color=None, italic=False):
        p = doc.add_paragraph()
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(text)
        r.bold = bold; r.italic = italic
        r.font.size = Pt(size); r.font.name = "Arial"
        if color:
            r.font.color.rgb = color
        return p

    # ── Top spacer ──
    doc.add_paragraph()
    doc.add_paragraph()
    doc.add_paragraph()

    # ── Institution & degree ──
    centered(DATOS["institucion"], 13, bold=True)
    doc.add_paragraph()
    centered(DATOS["carrera"], 12)

    # ── Title ──
    doc.add_paragraph()
    doc.add_paragraph()
    centered(DATOS["titulo"], 14, bold=True)

    # ── Author block ──
    doc.add_paragraph()
    doc.add_paragraph()
    centered("PRESENTA", 11)
    centered(DATOS["autor"], 12, bold=True)
    centered(f"MATRÍCULA: {DATOS['matricula']}", 11)

    # ── Advisor block ──
    doc.add_paragraph()
    centered("ASESOR", 11)
    centered(DATOS["asesor"], 12, bold=True)

    # ── Modalidad ──
    doc.add_paragraph()
    centered(f"Modalidad de titulación: {DATOS['modalidad']}", 11, italic=True)

    # ── Location ──
    doc.add_paragraph()
    doc.add_paragraph()
    centered(DATOS["lugar"], 11)

    # ── Pending note ──
    note = doc.add_paragraph()
    note.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = note.add_run("Fecha de presentación: pendiente de confirmación institucional")
    r.font.size = Pt(9); r.font.color.rgb = RGBColor(100, 100, 100); r.font.italic = True

    page_break(doc)


# ─── Index section ────────────────────────────────────────────────────────────
def add_index_section(doc):
    doc.add_heading("ÍNDICE GENERAL", level=1)
    add_toc_field(doc, r'TOC \o "1-3" \h \z \u')
    page_break(doc)

    doc.add_heading("ÍNDICE DE FIGURAS", level=1)
    add_toc_field(doc, r'TOC \h \z \t "FigureCaption,1"')
    page_break(doc)

    doc.add_heading("ÍNDICE DE TABLAS", level=1)
    add_toc_field(doc, r'TOC \h \z \t "TableCaption,1"')
    page_break(doc)


# ─── Bibliography ─────────────────────────────────────────────────────────────
def add_bibliography(doc, bib_path):
    doc.add_heading("REFERENCIAS BIBLIOGRÁFICAS", level=1)

    with open(bib_path, encoding="utf-8") as f:
        lines = f.read().split("\n")
    for line in lines:
        if line.startswith("#") or not line.strip():
            continue
        if line.strip().startswith("|") or line.strip().startswith("---"):
            continue
        p = doc.add_paragraph()
        p.paragraph_format.left_indent  = Cm(1.25)
        p.paragraph_format.first_line_indent = Cm(-1.25)
        p.paragraph_format.space_after  = Pt(6)
        parse_inline(p, line.strip())
    page_break(doc)


# ─── Preliminary section ──────────────────────────────────────────────────────
def add_preliminary(doc, md_path, heading_title):
    doc.add_heading(heading_title, level=1)
    with open(md_path, encoding="utf-8") as f:
        lines = f.read().split("\n")
    for line in lines:
        if line.startswith("#") or not line.strip():
            continue
        p = doc.add_paragraph()
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        parse_inline(p, line.strip())
    page_break(doc)


# ─── Update fields and export PDF via Word COM ───────────────────────────────
def update_fields_and_export_pdf(docx_path, pdf_path):
    print("  [COM] Abriendo Word para actualizar campos...")
    try:
        import win32com.client
        import pythoncom
        pythoncom.CoInitialize()

        word = win32com.client.Dispatch("Word.Application")
        word.Visible = False
        word.DisplayAlerts = 0

        doc = word.Documents.Open(str(docx_path.resolve()))
        doc.Fields.Update()

        toc_count = doc.TablesOfContents.Count
        print(f"  [COM] TablesOfContents encontradas: {toc_count}")
        for idx in range(1, toc_count + 1):
            try:
                doc.TablesOfContents(idx).Update()
                print(f"  [COM] TOC {idx} actualizado.")
            except Exception as e:
                print(f"  [COM] Error actualizando TOC {idx}: {e}")

        tof_count = doc.TablesOfFigures.Count
        print(f"  [COM] TablesOfFigures encontradas: {tof_count}")
        for idx in range(1, tof_count + 1):
            try:
                doc.TablesOfFigures(idx).Update()
                print(f"  [COM] TOF {idx} actualizado.")
            except Exception as e:
                print(f"  [COM] Error actualizando TOF {idx}: {e}")

        doc.Fields.Update()
        doc.Save()
        print("  [COM] DOCX guardado con campos actualizados.")

        doc.ExportAsFixedFormat(str(pdf_path.resolve()), 17)
        print(f"  [COM] PDF exportado: {pdf_path}")

        doc.Close(False)
        word.Quit()
        pythoncom.CoUninitialize()
        return True

    except ImportError:
        print("  [COM] win32com no disponible — usando docx2pdf como fallback.")
        try:
            from docx2pdf import convert
            convert(str(docx_path), str(pdf_path))
            print("  [COM fallback] PDF generado con docx2pdf.")
            return False
        except Exception as e:
            print(f"  [COM fallback] Error en docx2pdf: {e}")
            return False
    except Exception as e:
        print(f"  [COM] Error inesperado: {e}")
        try:
            from docx2pdf import convert
            convert(str(docx_path), str(pdf_path))
            print("  [COM fallback] PDF generado con docx2pdf.")
        except Exception as e2:
            print(f"  [COM fallback] Fallback también falló: {e2}")
        return False


# ─── Main build ───────────────────────────────────────────────────────────────
def build():
    print("=== UCES Trabajo B — Generador DOCX v0.8 ===")
    print(f"Salida: {OUT_DOCX}")
    print("Correcciones: K01-K09 (auditoria visual Corte 8K)")

    # Verify Fig 5.1 image exists
    fig51_path = IMGS_DGM / "fig-5-1-arquitectura.png"
    if not fig51_path.exists():
        print(f"ADVERTENCIA: {fig51_path} no existe — Fig 5.1 aparecerá como placeholder.")

    doc = setup_document()
    figure_tracker = FIGURE_PLACEMENTS
    placed_fig_nums = set()

    print("[1/12] Portada (G01: frase eliminada)...")
    add_cover(doc)

    print("[2/12] Resumen...")
    add_preliminary(doc, BASE / "preliminares/resumen.md", "RESUMEN")

    # H03: Abstract eliminado del documento ensamblado (v0.5)

    print("[3/12] Índices (TOC/TOF/TOT)...")
    add_index_section(doc)

    chapters = [
        ("01-introduccion-generalidades.md",  "Capítulo I",   1),
        ("02-contexto-organizacional.md",      "Capítulo II",  2),
        ("03-marco-teorico.md",                "Capítulo III", 3),
        ("04-metodologia-desarrollo.md",       "Capítulo IV",  4),
        ("05-desarrollo-implementacion.md",    "Capítulo V",   5),
        ("06-pruebas-resultados.md",           "Capítulo VI",  6),
        ("07-conclusiones-trabajo-futuro.md",  "Capítulo VII", 7),
    ]

    for idx, (fname, label, chnum) in enumerate(chapters, 4):
        print(f"[{idx}/12] {label} — {fname}...")
        md_path = CAPS / fname
        if not md_path.exists():
            print(f"  ADVERTENCIA: {md_path} no encontrado.")
            doc.add_heading(f"{label} [ARCHIVO NO ENCONTRADO: {fname}]", level=1)
        else:
            convert_md_file(doc, md_path, figure_tracker, placed_fig_nums, chnum)
        page_break(doc)

    print("[12/12] Bibliografía...")
    bib_path = BASE / "referencias/bibliografia-final.md"
    if bib_path.exists():
        add_bibliography(doc, bib_path)
    else:
        doc.add_heading("REFERENCIAS BIBLIOGRÁFICAS", level=1)
        doc.add_paragraph("[ARCHIVO NO ENCONTRADO: referencias/bibliografia-final.md]")

    # Summary
    print(f"\nFiguras colocadas: {len(placed_fig_nums)}")
    all_nums = {fp[1] for fp in FIGURE_PLACEMENTS}
    missing  = all_nums - placed_fig_nums
    if missing:
        print(f"ADVERTENCIA — fig_nums NO colocados: {sorted(missing)}")
    else:
        print("Todas las figuras colocadas correctamente.")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    doc.save(str(OUT_DOCX))
    print(f"\nDOCX guardado: {OUT_DOCX}")
    print(f"Tamaño DOCX: {OUT_DOCX.stat().st_size // 1024} KB")

    print("\n[COM] Actualizando campos y exportando PDF vía Word COM...")
    com_ok = update_fields_and_export_pdf(OUT_DOCX, OUT_PDF)

    if OUT_PDF.exists():
        print(f"PDF generado: {OUT_PDF}")
        print(f"Tamaño PDF: {OUT_PDF.stat().st_size // 1024} KB")
    else:
        print("ADVERTENCIA: PDF no generado.")

    return len(placed_fig_nums), com_ok


if __name__ == "__main__":
    figs, com = build()
    print(f"\n=== v0.8 generada — {figs} figuras, COM update: {'OK' if com else 'fallback'} ===")
    sys.exit(0)
