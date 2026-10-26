-- =============================================================================
-- 02-seed-catalogos.sql
-- UCES DEMO — Fase 2: Catálogos (módulos, vacantes, evaluaciones, preguntas,
--             tareas prácticas y psicométrico base)
-- Idempotente: usa ON CONFLICT DO NOTHING / DO UPDATE
-- ÁMBITO EXCLUSIVO DEMO — NO ejecutar en producción
-- =============================================================================

-- ─── Módulos DEMO (4 módulos) ─────────────────────────────────────────────────
INSERT INTO public.modules (id, name, description)
VALUES
  ('d1000001-0000-0000-0000-000000000001', 'Laboratorio DEMO',      'Apoyo en laboratorios clínicos — datos ficticios'),
  ('d1000002-0000-0000-0000-000000000002', 'Tecnología DEMO',       'Innovación y sistemas — datos ficticios'),
  ('d1000003-0000-0000-0000-000000000003', 'Biblioteca DEMO',       'Gestión de recursos — datos ficticios'),
  ('d1000004-0000-0000-0000-000000000004', 'Investigación DEMO',    'Proyectos académicos — datos ficticios')
ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description;

-- ─── Vacantes DEMO (10 vacantes) ─────────────────────────────────────────────
INSERT INTO public.vacancies (id, module_id, title, schedule, location, description, requirements, status)
VALUES
  ('d0000001-0000-0000-0000-000000000001','d1000001-0000-0000-0000-000000000001',
   'Asistente de Laboratorio DEMO','L-V 8:00-14:00','Campus central DEMO',
   'Apoyo en toma de muestras — FICTICIO','CURP, equipo de protección','open'),
  ('d0000002-0000-0000-0000-000000000002','d1000002-0000-0000-0000-000000000002',
   'Becario TI DEMO','Matutino','Edificio Tecnología DEMO',
   'Soporte y desarrollo web — FICTICIO','Programación básica','open'),
  ('d0000003-0000-0000-0000-000000000003','d1000003-0000-0000-0000-000000000003',
   'Auxiliar de Biblioteca DEMO','Mixto','Biblioteca central DEMO',
   'Atención a usuarios — FICTICIO','Trato amable','open'),
  ('d0000004-0000-0000-0000-000000000004','d1000004-0000-0000-0000-000000000004',
   'Asistente de Investigación DEMO','Flexible','Lab. Innovación DEMO',
   'Apoyo en protocolos — FICTICIO','Metodología básica','open'),
  ('d0000005-0000-0000-0000-000000000005','d1000001-0000-0000-0000-000000000001',
   'Técnico Clínico DEMO','Vespertino','Clínica DEMO',
   'Análisis clínicos — FICTICIO','Conocimientos biomédicos','open'),
  ('d0000006-0000-0000-0000-000000000006','d1000002-0000-0000-0000-000000000002',
   'Analista de Datos DEMO','Matutino','Sala de Cómputo DEMO',
   'Análisis y visualización — FICTICIO','Python o R básico','open'),
  ('d0000007-0000-0000-0000-000000000007','d1000003-0000-0000-0000-000000000003',
   'Catalogador DEMO','Matutino','Biblioteca 2 DEMO',
   'Catalogación y archivo — FICTICIO','Conocimiento SGB','open'),
  ('d0000008-0000-0000-0000-000000000008','d1000004-0000-0000-0000-000000000004',
   'Auxiliar Estadístico DEMO','Vespertino','Lab. Estadística DEMO',
   'Análisis estadístico — FICTICIO','SPSS o Excel avanzado','open'),
  ('d0000009-0000-0000-0000-000000000009','d1000002-0000-0000-0000-000000000002',
   'Desarrollador Web DEMO','Matutino','Home office DEMO',
   'Desarrollo React/Next.js — FICTICIO','HTML, CSS, JS','open'),
  ('d0000010-0000-0000-0000-000000000010','d1000001-0000-0000-0000-000000000001',
   'Monitor de Calidad DEMO','L-V 9:00-15:00','Lab. Control DEMO',
   'Control de calidad — FICTICIO','Normas ISO básicas','closed')
ON CONFLICT (id) DO UPDATE SET
  title        = EXCLUDED.title,
  status       = EXCLUDED.status,
  description  = EXCLUDED.description;

-- ─── Evaluaciones DEMO (1 por vacante activa + psicométrico base) ─────────────
-- Psicométrico base (UUID fijo del sistema)
INSERT INTO public.vacancies (id, module_id, title, schedule, location, description, requirements, status)
VALUES (
  'f1000000-0000-0000-0000-000000000001', NULL,
  '[INTERNAL] Psicométrico base', 'N/A', 'N/A',
  'Registro técnico interno para anclar assessment psicométrico.', 'No aplica', 'draft'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title, status = EXCLUDED.status;

INSERT INTO public.assessments (id, vacancy_id, title, duration_minutes)
VALUES ('f2000000-0000-0000-0000-000000000001','f1000000-0000-0000-0000-000000000001','TEST MINI BIG FIVE',10)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, duration_minutes = EXCLUDED.duration_minutes;

-- Evaluaciones por vacante DEMO
INSERT INTO public.assessments (id, vacancy_id, title, duration_minutes)
VALUES
  ('da000001-0000-0000-0000-000000000001','d0000001-0000-0000-0000-000000000001','Evaluación Laboratorio DEMO',35),
  ('da000002-0000-0000-0000-000000000002','d0000002-0000-0000-0000-000000000002','Evaluación TI DEMO',40),
  ('da000003-0000-0000-0000-000000000003','d0000003-0000-0000-0000-000000000003','Evaluación Biblioteca DEMO',25),
  ('da000004-0000-0000-0000-000000000004','d0000004-0000-0000-0000-000000000004','Evaluación Investigación DEMO',45),
  ('da000005-0000-0000-0000-000000000005','d0000005-0000-0000-0000-000000000005','Evaluación Clínica DEMO',30)
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title;

-- ─── Preguntas DEMO (5 por evaluación = 25 total) ────────────────────────────
-- Evaluación Laboratorio
INSERT INTO public.questions (assessment_id, prompt, options, correct_option)
VALUES
  ('da000001-0000-0000-0000-000000000001','¿Equipo obligatorio en laboratorio?','{"a":"Bata y guantes","b":"Sandalias","c":"Sin protección"}','a'),
  ('da000001-0000-0000-0000-000000000001','Temperatura de refrigerador clínico','{"a":"2-8°C","b":"15°C","c":"0°C"}','a'),
  ('da000001-0000-0000-0000-000000000001','Acción ante derrame de reactivo','{"a":"Avisar y contener","b":"Ignorar","c":"Limpiar solo"}','a'),
  ('da000001-0000-0000-0000-000000000001','Etiqueta naranja en reactivos','{"a":"Irritante","b":"Inflamable","c":"Tóxico"}','a'),
  ('da000001-0000-0000-0000-000000000001','Métrica de control de calidad básica','{"a":"Exactitud y precisión","b":"Color del reactivo","c":"Etiqueta del fabricante"}','a');

-- Evaluación TI
INSERT INTO public.questions (assessment_id, prompt, options, correct_option)
VALUES
  ('da000002-0000-0000-0000-000000000002','¿Qué significa HTML?','{"a":"HyperText Markup Language","b":"High Tech Machine Learning","c":"Hyper Transfer Main Line"}','a'),
  ('da000002-0000-0000-0000-000000000002','¿Qué es una API REST?','{"a":"Interfaz de comunicación web","b":"Base de datos relacional","c":"Sistema operativo"}','a'),
  ('da000002-0000-0000-0000-000000000002','Protocolo seguro de transferencia','{"a":"HTTPS","b":"FTP","c":"Telnet"}','a'),
  ('da000002-0000-0000-0000-000000000002','¿Qué es Git?','{"a":"Sistema de control de versiones","b":"Editor de código","c":"Lenguaje de programación"}','a'),
  ('da000002-0000-0000-0000-000000000002','¿Qué es SQL?','{"a":"Lenguaje de consulta estructurado","b":"Sistema de archivos","c":"Protocolo de red"}','a');

-- Evaluación Biblioteca
INSERT INTO public.questions (assessment_id, prompt, options, correct_option)
VALUES
  ('da000003-0000-0000-0000-000000000003','Sistema de clasificación Dewey','{"a":"Organiza por materias numéricas","b":"Organiza por autor","c":"Organiza por año"}','a'),
  ('da000003-0000-0000-0000-000000000003','ISBN completo actual','{"a":"13 dígitos","b":"10 dígitos","c":"8 dígitos"}','a'),
  ('da000003-0000-0000-0000-000000000003','Formato de catalogación MARC','{"a":"Machine-Readable Cataloging","b":"Manual de Archivos Clasif.","c":"Método de Acceso Rápido Computacional"}','a'),
  ('da000003-0000-0000-0000-000000000003','Tipo de préstamo sin salida de recinto','{"a":"Sala","b":"Domicilio","c":"Interbibliotecario"}','a'),
  ('da000003-0000-0000-0000-000000000003','Software para gestión bibliotecaria','{"a":"Koha","b":"AutoCAD","c":"Photoshop"}','a');

-- Evaluación Investigación
INSERT INTO public.questions (assessment_id, prompt, options, correct_option)
VALUES
  ('da000004-0000-0000-0000-000000000004','Tipo de investigación con hipótesis','{"a":"Cuantitativa","b":"Exploratoria","c":"Documental"}','a'),
  ('da000004-0000-0000-0000-000000000004','Instrumento de recolección cuantitativa','{"a":"Encuesta Likert","b":"Entrevista abierta","c":"Grupo focal"}','a'),
  ('da000004-0000-0000-0000-000000000004','Prueba estadística de correlación','{"a":"Pearson","b":"Chi cuadrada","c":"ANOVA"}','a'),
  ('da000004-0000-0000-0000-000000000004','Formato de cita APA 7','{"a":"Autor (año). Título.","b":"[Número] Autor","c":"Ibídem p.X"}','a'),
  ('da000004-0000-0000-0000-000000000004','Software de análisis cualitativo','{"a":"Atlas.ti","b":"SPSS","c":"Excel"}','a');

-- Evaluación Clínica
INSERT INTO public.questions (assessment_id, prompt, options, correct_option)
VALUES
  ('da000005-0000-0000-0000-000000000005','Norma de bioseguridad nivel 2','{"a":"BSL-2","b":"ISO 9001","c":"NOM-035"}','a'),
  ('da000005-0000-0000-0000-000000000005','Tiempo de vida de muestra sanguínea','{"a":"72 horas refrigerada","b":"1 semana ambiente","c":"Sin límite"}','a'),
  ('da000005-0000-0000-0000-000000000005','Valor normal de glucosa en ayunas','{"a":"70-100 mg/dL","b":"150-200 mg/dL","c":"50-60 mg/dL"}','a'),
  ('da000005-0000-0000-0000-000000000005','Tipo sanguíneo universal donador','{"a":"O negativo","b":"AB positivo","c":"A positivo"}','a'),
  ('da000005-0000-0000-0000-000000000005','Centrifugación de muestra para suero','{"a":"3000 rpm / 10 min","b":"1000 rpm / 30 min","c":"5000 rpm / 2 min"}','a');

-- ─── Preguntas psicométricas (20 ítems Mini Big Five) ────────────────────────
-- Eliminamos y re-insertamos para garantizar idempotencia
DELETE FROM public.questions WHERE assessment_id = 'f2000000-0000-0000-0000-000000000001';

INSERT INTO public.questions (assessment_id, prompt, options, correct_option)
VALUES
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Mantengo la calma cuando trabajo bajo presión.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Rara vez me siento angustiado o nervioso.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Manejo bien las situaciones de incertidumbre.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Generalmente me recupero rápido de contratiempos.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | AMABILIDAD | Me preocupa el bienestar de los demás.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | AMABILIDAD | Evito conflictos y busco el acuerdo.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | AMABILIDAD | Soy considerado con los sentimientos ajenos.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | AMABILIDAD | Me esfuerzo en ayudar a quienes me rodean.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | RESPONSABILIDAD | Entrego mis tareas a tiempo.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | RESPONSABILIDAD | Soy organizado y metódico en mi trabajo.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | RESPONSABILIDAD | Planifico antes de iniciar una tarea.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | RESPONSABILIDAD | Cumplo con mis compromisos incluso cuando es difícil.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | APERTURA | Me gusta aprender sobre temas nuevos.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | APERTURA | Disfruto las actividades creativas.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | APERTURA | Me interesan las ideas abstractas y conceptuales.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | APERTURA | Busco experiencias y perspectivas nuevas.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | EXTROVERSION | Me siento cómodo en situaciones sociales.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | EXTROVERSION | Disfruto hablar con personas que no conozco.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | EXTROVERSION | Me energizo en entornos con mucha gente.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL),
  ('f2000000-0000-0000-0000-000000000001','MINI_BIG_FIVE | EXTROVERSION | Tomo la iniciativa en conversaciones grupales.','{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}',NULL);

-- ─── Tareas prácticas DEMO (6 registros) ─────────────────────────────────────
INSERT INTO public.practical_tasks (assessment_id, instructions, expected_output, max_score)
VALUES
  ('da000001-0000-0000-0000-000000000001','Graba video preparando muestra — DEMO FICTICIO','Video mp4',100),
  ('da000002-0000-0000-0000-000000000002','Desarrolla script básico de logs — DEMO FICTICIO','Archivo .txt con código',100),
  ('da000003-0000-0000-0000-000000000003','Explica organización de estantería — DEMO FICTICIO','Audio o video',100),
  ('da000004-0000-0000-0000-000000000004','Diseña propuesta de experimento — DEMO FICTICIO','Documento PDF',100),
  ('da000005-0000-0000-0000-000000000005','Simula toma de muestra sanguínea — DEMO FICTICIO','Video mp4',100),
  ('da000002-0000-0000-0000-000000000002','Crea un endpoint REST básico — DEMO FICTICIO','Código fuente ZIP',100);

-- Verificación
SELECT 'modules' AS tabla, COUNT(*) FROM public.modules
UNION ALL SELECT 'vacancies', COUNT(*) FROM public.vacancies
UNION ALL SELECT 'assessments', COUNT(*) FROM public.assessments
UNION ALL SELECT 'questions', COUNT(*) FROM public.questions
UNION ALL SELECT 'practical_tasks', COUNT(*) FROM public.practical_tasks;
