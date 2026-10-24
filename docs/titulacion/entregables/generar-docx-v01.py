#!/usr/bin/env python3
"""
Generador DOCX — UCES Trabajo B Revision v0.1
Corte 8D — 2026-10-23
Herramienta: python-docx 1.2.0
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
BASE = Path("C:/uces-plataforma/docs/titulacion")
CAPS = BASE / "capitulos"
IMGS_CAP = BASE / "evidencias/08c/candidato"
IMGS_ADM = BASE / "evidencias/08c/administrador"
IMGS_VAL = BASE / "evidencias/08c/validaciones"
IMGS_DGM = BASE / "diagramas/exportados"
OUT_DIR  = BASE / "entregables"
OUT_DOCX = OUT_DIR / "UCES_Trabajo_B_Revision_v01.docx"

# ─── Figura map: (section_keyword, figure_number, filename, caption) ──────────
# Inserted AFTER the paragraph containing section_keyword in the heading.
# Images with path=None are placeholders.
FIGURES = [
    # Cap V – §5.2
    {
        "after_heading": "1.2 Descripción general del sistema",  # No figure here in V
        "fig": None,
    },
    {
        "after_heading": "5.3 Flujo de registro",
        "fig_num": "5.5",
        "path": IMGS_CAP / "EV-5A-05-registro-formulario.png",
        "caption": "Figura 5.5. Formulario de registro de candidato (/register). Fuente: captura de pantalla propia, 2026.",
        "ev_id": "EV-5A-05",
    },
    {
        "after_heading": "5.3 Flujo de registro",
        "fig_num": "5.6",
        "path": IMGS_CAP / "EV-5A-06-curp-duplicada.png",
        "caption": "Figura 5.6. Mensaje de error por CURP ya registrada en el sistema (CP-02a). Fuente: captura de pantalla propia, 2026.",
        "ev_id": "EV-5A-06",
    },
]

# ─── Simplified figure placement — by section heading text fragments ───────────
# Format: (heading_fragment, fig_num, rel_path_or_None, caption_text, ev_id_or_None)
FIGURE_PLACEMENTS = [
    # Cap I – no figures
    # Cap V §5.2 — landing page after "Descripción general"
    ("5.2", "5.4",
     IMGS_CAP / "EV-5A-02-landing.png",
     "Figura 5.4. Vista de la página de inicio pública del sistema (/). Fuente: captura de pantalla propia, 2026.",
     "EV-5A-02"),
    # §5.3 — registro form
    ("5.3", "5.5",
     IMGS_CAP / "EV-5A-05-registro-formulario.png",
     "Figura 5.5. Formulario de registro de candidato (/register). Fuente: captura de pantalla propia, 2026.",
     "EV-5A-05"),
    # §5.3 — CURP duplicada (inline after registro fig)
    ("Registro y autenticación", "5.6",
     IMGS_CAP / "EV-5A-06-curp-duplicada.png",
     "Figura 5.6. Mensaje de error por CURP ya registrada (CP-02a). Fuente: captura de pantalla propia, 2026.",
     "EV-5A-06"),
    # §5.3 — login
    ("5.3", "5.7",
     IMGS_CAP / "EV-5A-07-login.png",
     "Figura 5.7. Formulario de inicio de sesión (/login). Fuente: captura de pantalla propia, 2026.",
     "EV-5A-07"),
    # §5.4 — panel candidato
    ("5.4", "5.9",
     IMGS_CAP / "EV-5A-09-panel-candidato.png",
     "Figura 5.9. Panel principal del candidato autenticado (/panel). Fuente: captura de pantalla propia, 2026.",
     "EV-5A-09"),
    # §5.5 — vacantes — PLACEHOLDER (EV-5A-11 inválida)
    ("5.5", "5.10",
     None,
     "Figura 5.10. [MARCADOR — EV-5A-11 INVÁLIDA: captura muestra error 404. Requiere nueva captura de /vacantes con lista de vacantes activas.]",
     "EV-5A-11"),
    # §5.5 — detalle vacante
    ("5.5", "5.11",
     IMGS_CAP / "EV-5A-12-detalle-vacante.png",
     "Figura 5.11. Detalle de vacante con descripción y botón de postulación. Fuente: captura de pantalla propia, 2026.",
     "EV-5A-12"),
    # §5.6 — subida evidencia
    ("5.6", "5.12",
     IMGS_CAP / "EV-5A-19-subida-evidencia.png",
     "Figura 5.12. Interfaz de subida de archivo de evidencia en módulo activo. Fuente: captura de pantalla propia, 2026.",
     "EV-5A-19"),
    # §5.9 — panel admin
    ("5.9", "5.13",
     IMGS_ADM / "EV-5B-01-admin-panel.png",
     "Figura 5.13. Panel de administración (/admin) con lista de candidatos y postulaciones. Fuente: captura de pantalla propia, 2026.",
     "EV-5B-01"),
    # §5.9 — acceso denegado
    ("Acceso denegado", "5.14",
     IMGS_CAP / "EV-5B-08-acceso-denegado.png",
     "Figura 5.14. Redirección de acceso no autorizado al intentar acceder a /admin como candidato. Fuente: captura de pantalla propia, 2026.",
     "EV-5B-08"),
    # §5.10 — admin detalle — PLACEHOLDER
    ("5.10", "5.16",
     None,
     "Figura 5.16. [MARCADOR — EV-5B-02 PENDIENTE: captura de vista de detalle del candidato en el panel de administración (/admin/attempts/[id]).]",
     "EV-5B-02"),
    # §5.10 — formulario decision — PLACEHOLDER
    ("Decisión", "5.17",
     None,
     "Figura 5.17. [MARCADOR — EV-5B-03 PENDIENTE: captura del formulario de decisión de aprobación o rechazo.]",
     "EV-5B-03"),
    # §5.11 — guard prereq
    ("5.11", "5.18",
     IMGS_CAP / "EV-5B-13-guard-prereq.png",
     "Figura 5.18. Guard de prerequisito: el candidato debe completar el test psicométrico antes de postularse. Fuente: captura de pantalla propia, 2026.",
     "EV-5B-13"),
    # §5.11 — preguntas likert
    ("Evaluación psicométrica", "5.19",
     IMGS_CAP / "EV-5A-15-psicometrico-preguntas.png",
     "Figura 5.19. Pantalla del TEST MINI BIG FIVE con 20 ítems Likert 1–5 y temporizador de 10 minutos. Fuente: captura de pantalla propia, 2026.",
     "EV-5A-15"),
    # §5.11 — resultado psicometrico (caption corregido)
    ("Resultado psicométrico", "5.20",
     IMGS_CAP / "EV-5A-17-resultado-psicometrico.png",
     "Figura 5.20. Pantalla de confirmación de envío de evaluación (estado UNDER_REVIEW). Nota: la captura muestra la confirmación de proceso completado; los scores individuales por rasgo no fueron visibles en la sesión de prueba por ausencia de respuestas registradas. Fuente: captura de pantalla propia, 2026.",
     "EV-5A-17"),
    # §5.13 — guard score d01
    ("5.13", "5.22",
     IMGS_CAP / "EV-5B-15-d01-guard-score.png",
     "Figura 5.22. Discrepancia D-01: el guard verifica el campo completed, no el score numérico del resultado psicométrico. Fuente: captura de pantalla propia, 2026.",
     "EV-5B-15"),
    # Cap VI §6.5 — CP-07 guard D-01
    ("6.5", "6.1",
     IMGS_VAL / "EV-6C-04-cp07-guard-d01.png",
     "Figura 6.1. Evidencia del CP-07: comportamiento del guard de prerequisito psicométrico (Discrepancia D-01). Fuente: captura de pantalla propia, 2026.",
     "EV-6C-04"),
    # Cap VI — CP-20 resultado
    ("CP-20", "6.2",
     IMGS_CAP / "EV-5A-17-resultado-psicometrico.png",
     "Figura 6.2. Evidencia del CP-20: confirmación de envío de evaluación psicométrica (estado UNDER_REVIEW). Fuente: captura de pantalla propia, 2026.",
     "EV-6C-05"),
    # Cap VI — CP-18 stats D-03
    ("CP-18", "6.3",
     IMGS_VAL / "EV-6C-06-cp18-stats-d03.png",
     'Figura 6.3. Evidencia del CP-18: la API de estadísticas devuelve {"error":"No autenticado"} al acceder sin sesión activa, confirmando la protección del endpoint. Fuente: captura de pantalla propia, 2026.',
     "EV-6C-06"),
    # Cap VI — CP-22 RLS
    ("CP-22", "6.4",
     IMGS_VAL / "EV-6C-07-cp22-rls.png",
     "Figura 6.4. Evidencia del CP-22: acceso restringido por Row Level Security activo en Supabase. Fuente: captura de pantalla propia, 2026.",
     "EV-6C-07"),
    # Diagramas — inserted at specific section headings
    ("Diagramas de secuencia", "5.2",
     IMGS_DGM / "fig-5-2-secuencia-registro.png",
     "Figura 5.2. Diagrama de secuencia: registro de candidato. Fuente: elaboración propia, 2026.",
     None),
    ("5.8", "5.8",
     IMGS_DGM / "fig-5-4-secuencia-evidencias.png",
     "Figura 5.8. Diagrama de secuencia: subida de archivo de evidencia. Fuente: elaboración propia, 2026.",
     None),
    ("requireAdmin", "5.15",
     IMGS_DGM / "fig-5-6-flujo-requireAdmin.png",
     "Figura 5.15. Diagrama de flujo de la función requireAdmin(). Fuente: elaboración propia, 2026.",
     None),
    ("psicométrico", "5.21",
     IMGS_DGM / "fig-5-7-inicio-psicometrico.png",
     "Figura 5.21. Diagrama de inicio del flujo psicométrico con verificación de prerequisito. Fuente: elaboración propia, 2026.",
     None),
]

# ─── Helper: set paragraph style safely ──────────────────────────────────────
def set_style(doc, style_name, fallback="Normal"):
    try:
        return doc.styles[style_name]
    except KeyError:
        return doc.styles[fallback]


# ─── Document setup ───────────────────────────────────────────────────────────
def setup_document():
    doc = Document()
    # Page size: Letter (21.59 x 27.94 cm)
    section = doc.sections[0]
    section.page_width  = Cm(21.59)
    section.page_height = Cm(27.94)
    section.left_margin   = Cm(3.0)
    section.right_margin  = Cm(2.5)
    section.top_margin    = Cm(2.5)
    section.bottom_margin = Cm(2.5)

    # Base font
    doc.styles["Normal"].font.name = "Arial"
    doc.styles["Normal"].font.size = Pt(11)
    doc.styles["Normal"].paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    doc.styles["Normal"].paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
    doc.styles["Normal"].paragraph_format.line_spacing = 1.5
    doc.styles["Normal"].paragraph_format.space_after = Pt(6)

    # Heading styles
    for lvl, size, bold in [(1, 14, True), (2, 12, True), (3, 11, True), (4, 11, False)]:
        h = doc.styles[f"Heading {lvl}"]
        h.font.name = "Arial"
        h.font.size = Pt(size)
        h.font.bold = bold
        h.font.color.rgb = RGBColor(0, 0, 0)
        h.paragraph_format.line_spacing_rule = WD_LINE_SPACING.MULTIPLE
        h.paragraph_format.line_spacing = 1.5
        h.paragraph_format.space_before = Pt(12)
        h.paragraph_format.space_after  = Pt(6)
        h.paragraph_format.keep_with_next = True

    # Code style
    try:
        code_style = doc.styles.add_style("Code Block", 1)
    except Exception:
        code_style = doc.styles["Normal"]
    code_style.font.name = "Courier New"
    code_style.font.size = Pt(9)
    code_style.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.LEFT
    code_style.paragraph_format.space_before = Pt(3)
    code_style.paragraph_format.space_after  = Pt(3)
    # Light gray background via shading is set per-paragraph

    # Caption style
    try:
        cap_style = doc.styles.add_style("Figure Caption", 1)
    except Exception:
        cap_style = doc.styles["Normal"]
    cap_style.font.name = "Arial"
    cap_style.font.size = Pt(9)
    cap_style.font.italic = True
    cap_style.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cap_style.paragraph_format.space_before = Pt(2)
    cap_style.paragraph_format.space_after  = Pt(8)

    return doc


# ─── Add shading to a paragraph (for code blocks) ────────────────────────────
def add_shading(para, fill="F2F2F2"):
    pPr = para._p.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), fill)
    pPr.append(shd)


# ─── Add paragraph border (for blockquotes) ──────────────────────────────────
def add_left_border(para, color="888888", space="12"):
    pPr = para._p.get_or_add_pPr()
    pb = OxmlElement("w:pBdr")
    left = OxmlElement("w:left")
    left.set(qn("w:val"), "single")
    left.set(qn("w:sz"), "12")
    left.set(qn("w:space"), space)
    left.set(qn("w:color"), color)
    pb.append(left)
    pPr.append(pb)


# ─── Insert image (with max width) ───────────────────────────────────────────
def insert_image(doc, img_path, caption_text, max_width_cm=14.0):
    if img_path is None or not Path(img_path).exists():
        # Placeholder paragraph
        p = doc.add_paragraph()
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(f"[ {caption_text} ]")
        run.font.color.rgb = RGBColor(180, 0, 0)
        run.font.bold = True
        run.font.size = Pt(10)
        add_shading(p, "FFE8E8")
        # Caption
        cap = doc.add_paragraph(caption_text)
        try:
            cap.style = doc.styles["Figure Caption"]
        except Exception:
            cap.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        return

    # Real image
    para = doc.add_paragraph()
    para.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = para.add_run()
    run.add_picture(str(img_path), width=Cm(max_width_cm))

    # Caption
    cap = doc.add_paragraph(caption_text)
    try:
        cap.style = doc.styles["Figure Caption"]
    except Exception:
        cap.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
        for r in cap.runs:
            r.font.size = Pt(9)
            r.font.italic = True


# ─── Add a page break ─────────────────────────────────────────────────────────
def page_break(doc):
    para = doc.add_paragraph()
    run = para.add_run()
    run.add_break(__import__("docx.enum.text", fromlist=["WD_BREAK"]).WD_BREAK.PAGE)


# ─── Bold/italic inline parser ────────────────────────────────────────────────
def parse_inline(para, text):
    """Parse **bold**, *italic*, `code`, and plain text, adding runs."""
    # Pattern order: bold, italic, inline code, bold-italic
    pattern = re.compile(
        r'(\*\*\*(.+?)\*\*\*)'    # ***bold italic***
        r'|(\*\*(.+?)\*\*)'        # **bold**
        r'|(\*(.+?)\*)'            # *italic*
        r'|(`(.+?)`)'              # `code`
    )
    last = 0
    for m in pattern.finditer(text):
        # Plain text before match
        if m.start() > last:
            plain = text[last:m.start()]
            run = para.add_run(plain)
            run.font.name = "Arial"
            run.font.size = Pt(11)
        if m.group(1):    # bold+italic
            run = para.add_run(m.group(2))
            run.bold = True; run.italic = True
        elif m.group(3):  # bold
            run = para.add_run(m.group(4))
            run.bold = True
        elif m.group(5):  # italic
            run = para.add_run(m.group(6))
            run.italic = True
        elif m.group(7):  # code
            run = para.add_run(m.group(8))
            run.font.name = "Courier New"
            run.font.size = Pt(9)
        last = m.end()
    # Remaining plain text
    if last < len(text):
        run = para.add_run(text[last:])
        run.font.name = "Arial"
        run.font.size = Pt(11)


# ─── Markdown table parser ────────────────────────────────────────────────────
def parse_md_table(doc, lines):
    """Parse a markdown table block and add it to the document."""
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
    # Pad short rows
    rows_data = [r + [""] * (ncols - len(r)) for r in rows_data]

    table = doc.add_table(rows=len(rows_data), cols=ncols)
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER

    for ri, row_cells in enumerate(rows_data):
        for ci, cell_text in enumerate(row_cells):
            cell = table.rows[ri].cells[ci]
            para = cell.paragraphs[0]
            # First row = header: bold
            if ri == 0:
                run = para.add_run(cell_text)
                run.bold = True
                run.font.size = Pt(10)
            else:
                parse_inline(para, cell_text)
                for run in para.runs:
                    run.font.size = Pt(10)
            para.paragraph_format.space_before = Pt(2)
            para.paragraph_format.space_after  = Pt(2)

    # Space after table
    doc.add_paragraph()


# ─── Main markdown → docx converter ──────────────────────────────────────────
def convert_md_file(doc, md_path, figure_tracker, used_figures):
    """Convert a markdown file to Word content, inserting figures at matching headings."""
    with open(md_path, encoding="utf-8") as f:
        content = f.read()

    lines = content.split("\n")
    i = 0
    pending_figures_for_next_para = []

    def flush_pending_figures():
        for fig_info in pending_figures_for_next_para:
            insert_image(doc, fig_info["path"], fig_info["caption"])
            if fig_info.get("ev_id"):
                used_figures.add(fig_info["ev_id"])
        pending_figures_for_next_para.clear()

    while i < len(lines):
        line = lines[i]

        # ── Headings ──
        hm = re.match(r'^(#{1,4})\s+(.+)$', line)
        if hm:
            level = len(hm.group(1))
            heading_text = hm.group(2).strip()
            # Remove trailing ---
            heading_text = heading_text.rstrip("-").strip()
            p = doc.add_heading(heading_text, level=level)
            # After heading, check figure placements
            for fp in figure_tracker:
                kw = fp[0]
                if kw.lower() in heading_text.lower() and fp[1] not in used_figures:
                    pending_figures_for_next_para.append({
                        "path": fp[2],
                        "caption": fp[3],
                        "ev_id": fp[4] or fp[1],
                    })
            i += 1
            continue

        # ── Horizontal rule / section separator ──
        if re.match(r'^-{3,}$', line.strip()):
            i += 1
            continue

        # ── Code block ──
        if line.startswith("```"):
            lang = line[3:].strip()
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].startswith("```"):
                code_lines.append(lines[i])
                i += 1
            i += 1  # skip closing ```
            code_text = "\n".join(code_lines)
            if code_text.strip():
                p = doc.add_paragraph(code_text)
                try:
                    p.style = doc.styles["Code Block"]
                except Exception:
                    p.runs[0].font.name = "Courier New"
                    p.runs[0].font.size = Pt(9)
                add_shading(p)
            continue

        # ── Blockquote ──
        if line.startswith(">"):
            bq_lines = []
            while i < len(lines) and lines[i].startswith(">"):
                bq_lines.append(lines[i].lstrip(">").strip())
                i += 1
            bq_text = " ".join(bq_lines)
            p = doc.add_paragraph(bq_text)
            p.paragraph_format.left_indent  = Cm(1.0)
            p.paragraph_format.right_indent = Cm(0.5)
            add_left_border(p)
            for run in p.runs:
                run.font.italic = True
                run.font.size   = Pt(10)
            continue

        # ── Unordered list ──
        if re.match(r'^(\s*)[-*+]\s+', line):
            indent_depth = len(re.match(r'^(\s*)', line).group(1)) // 2
            item_text = re.sub(r'^\s*[-*+]\s+', '', line)
            p = doc.add_paragraph(style="List Bullet")
            p.paragraph_format.left_indent = Cm(1.0 + indent_depth * 0.5)
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

        # ── Table ──
        if line.strip().startswith("|"):
            table_lines = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                table_lines.append(lines[i])
                i += 1
            flush_pending_figures()
            parse_md_table(doc, table_lines)
            continue

        # ── Empty line ──
        if line.strip() == "":
            if pending_figures_for_next_para:
                flush_pending_figures()
            i += 1
            continue

        # ── Regular paragraph ──
        if line.strip():
            p = doc.add_paragraph()
            p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            parse_inline(p, line.strip())
            if pending_figures_for_next_para:
                flush_pending_figures()
        i += 1

    # Flush any remaining pending figures at end of file
    if pending_figures_for_next_para:
        flush_pending_figures()


# ─── Cover page ───────────────────────────────────────────────────────────────
def add_cover(doc):
    doc.add_paragraph()
    doc.add_paragraph()

    # Institution
    inst = doc.add_paragraph()
    inst.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = inst.add_run("UNIVERSIDAD CAPITAL DE ESTUDIOS SUPERIORES")
    r.bold = True; r.font.size = Pt(14); r.font.name = "Arial"
    doc.add_paragraph()

    # Program
    prog = doc.add_paragraph()
    prog.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = prog.add_run("INGENIERÍA EN SISTEMAS COMPUTACIONALES")
    r.font.size = Pt(12); r.font.name = "Arial"
    doc.add_paragraph()
    doc.add_paragraph()

    # Title
    tit = doc.add_paragraph()
    tit.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = tit.add_run("DESARROLLO E IMPLEMENTACIÓN DE UN SISTEMA WEB DE RECLUTAMIENTO DE PERSONAL PARA LA UNIVERSIDAD CAPITAL DE ESTUDIOS SUPERIORES")
    r.bold = True; r.font.size = Pt(16); r.font.name = "Arial"
    doc.add_paragraph()
    doc.add_paragraph()

    # Document type
    doc_type = doc.add_paragraph()
    doc_type.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = doc_type.add_run("REPORTE DE RESIDENCIAS PROFESIONALES")
    r.font.size = Pt(12); r.font.name = "Arial"
    doc.add_paragraph()

    # Author placeholder
    aut = doc.add_paragraph()
    aut.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = aut.add_run("[NOMBRE DEL AUTOR — PENDIENTE DE CONFIRMACIÓN]")
    r.font.color.rgb = RGBColor(180, 0, 0)
    r.font.size = Pt(12); r.font.name = "Arial"

    mat = doc.add_paragraph()
    mat.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = mat.add_run("Matrícula: [MATRÍCULA — PENDIENTE]")
    r.font.color.rgb = RGBColor(180, 0, 0)
    r.font.size = Pt(11); r.font.name = "Arial"

    doc.add_paragraph()

    # Advisor placeholder
    adv = doc.add_paragraph()
    adv.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = adv.add_run("Asesor: [NOMBRE DEL ASESOR — PENDIENTE DE CONFIRMACIÓN]")
    r.font.color.rgb = RGBColor(180, 0, 0)
    r.font.size = Pt(11); r.font.name = "Arial"

    doc.add_paragraph()
    doc.add_paragraph()

    # Place and date placeholder
    place = doc.add_paragraph()
    place.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = place.add_run("Zamora, Michoacán — Octubre 2026")
    r.font.size = Pt(11); r.font.name = "Arial"

    notice = doc.add_paragraph()
    notice.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = notice.add_run("[NOTA: Portada provisional — formato sin plantilla institucional confirmada. "
                       "Los datos entre corchetes requieren confirmación del autor/asesor.]")
    r.font.size = Pt(9); r.font.color.rgb = RGBColor(128, 128, 128); r.font.italic = True

    page_break(doc)


# ─── TOC placeholder ──────────────────────────────────────────────────────────
def add_toc_placeholder(doc):
    doc.add_heading("ÍNDICE GENERAL", level=1)
    p = doc.add_paragraph()
    p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(
        "[ÍNDICE GENERAL — Actualizar con Word: Referencias → Tabla de contenido → Actualizar tabla]"
    )
    r.font.color.rgb = RGBColor(0, 0, 180)
    r.font.italic = True
    r.font.size = Pt(10)

    p2 = doc.add_paragraph()
    r2 = p2.add_run(
        "[ÍNDICE DE FIGURAS — Insertar con: Referencias → Insertar tabla de ilustraciones]"
    )
    r2.font.color.rgb = RGBColor(0, 0, 180)
    r2.font.italic = True
    r2.font.size = Pt(10)

    p3 = doc.add_paragraph()
    r3 = p3.add_run(
        "[ÍNDICE DE TABLAS — Insertar con: Referencias → Insertar tabla de ilustraciones → Tipo: Tabla]"
    )
    r3.font.color.rgb = RGBColor(0, 0, 180)
    r3.font.italic = True
    r3.font.size = Pt(10)

    page_break(doc)


# ─── Bibliography from MD ─────────────────────────────────────────────────────
def add_bibliography(doc, bib_path):
    doc.add_heading("REFERENCIAS BIBLIOGRÁFICAS", level=1)
    note = doc.add_paragraph()
    r = note.add_run(
        "[NOTA: 8 referencias marcadas como (PENDIENTE) requieren verificación manual "
        "antes de la versión definitiva. Ver 08b-validacion-referencias.md §4.]"
    )
    r.font.color.rgb = RGBColor(180, 0, 0)
    r.font.size = Pt(9)
    r.font.italic = True
    doc.add_paragraph()

    with open(bib_path, encoding="utf-8") as f:
        lines = f.read().split("\n")

    for line in lines:
        # Skip markdown headers and blank lines that are empty
        if line.startswith("#"):
            continue
        if line.strip() == "":
            continue
        if line.strip().startswith("|") or line.strip().startswith("---"):
            continue

        p = doc.add_paragraph()
        p.paragraph_format.left_indent  = Cm(1.25)
        p.paragraph_format.first_line_indent = Cm(-1.25)  # hanging indent
        p.paragraph_format.space_after  = Pt(6)
        parse_inline(p, line.strip())

    page_break(doc)


# ─── Section: Resumen / Abstract ─────────────────────────────────────────────
def add_preliminary(doc, md_path, heading_title):
    doc.add_heading(heading_title, level=1)
    with open(md_path, encoding="utf-8") as f:
        lines = f.read().split("\n")
    for line in lines:
        if line.startswith("#"):
            continue
        if line.strip() == "":
            continue
        p = doc.add_paragraph()
        p.paragraph_format.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        parse_inline(p, line.strip())
    page_break(doc)


# ─── Main build ───────────────────────────────────────────────────────────────
def build():
    print("=== UCES Trabajo B — Generador DOCX v0.1 ===")
    print(f"Salida: {OUT_DOCX}")

    doc = setup_document()
    figure_tracker = FIGURE_PLACEMENTS
    used_figures = set()

    # 1. Cover
    print("[1/12] Portada...")
    add_cover(doc)

    # 2. Resumen
    print("[2/12] Resumen...")
    add_preliminary(doc, BASE / "preliminares/resumen.md", "RESUMEN")

    # 3. Abstract
    print("[3/12] Abstract...")
    add_preliminary(doc, BASE / "preliminares/abstract.md", "ABSTRACT")

    # 4. TOC placeholder
    print("[4/12] Índices (marcadores)...")
    add_toc_placeholder(doc)

    # 5–11. Chapters
    chapters = [
        ("01-introduccion-generalidades.md",  "Capítulo I"),
        ("02-contexto-organizacional.md",      "Capítulo II"),
        ("03-marco-teorico.md",                "Capítulo III"),
        ("04-metodologia-desarrollo.md",       "Capítulo IV"),
        ("05-desarrollo-implementacion.md",    "Capítulo V"),
        ("06-pruebas-resultados.md",           "Capítulo VI"),
        ("07-conclusiones-trabajo-futuro.md",  "Capítulo VII"),
    ]

    for idx, (fname, label) in enumerate(chapters, 5):
        print(f"[{idx}/12] {label} — {fname}...")
        md_path = CAPS / fname
        if not md_path.exists():
            print(f"  ADVERTENCIA: {md_path} no encontrado.")
            doc.add_heading(f"{label} [ARCHIVO NO ENCONTRADO: {fname}]", level=1)
        else:
            convert_md_file(doc, md_path, figure_tracker, used_figures)
        page_break(doc)

    # 12. Bibliography
    print("[12/12] Bibliografía...")
    bib_path = BASE / "referencias/bibliografia-final.md"
    if bib_path.exists():
        add_bibliography(doc, bib_path)
    else:
        doc.add_heading("REFERENCIAS BIBLIOGRÁFICAS", level=1)
        doc.add_paragraph("[ARCHIVO NO ENCONTRADO: referencias/bibliografia-final.md]")

    # Summary
    print(f"\nFiguras insertadas: {len(used_figures)}")
    print(f"IDs: {sorted(used_figures)}")

    # Save
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    doc.save(str(OUT_DOCX))
    print(f"\nDOCX guardado en: {OUT_DOCX}")

    # File size
    size_kb = OUT_DOCX.stat().st_size // 1024
    print(f"Tamaño: {size_kb} KB")
    return len(used_figures)


if __name__ == "__main__":
    n = build()
    sys.exit(0)
