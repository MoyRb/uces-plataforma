insert into public.modules (id, name, description) values
  ('11111111-1111-1111-1111-111111111111','Laboratorio','Apoyo en laboratorios clínicos'),
  ('22222222-2222-2222-2222-222222222222','Deportes','Programas de actividad física'),
  ('33333333-3333-3333-3333-333333333333','Campos clínicos','Rotaciones en hospitales'),
  ('44444444-4444-4444-4444-444444444444','Tecnología','Innovación y sistemas'),
  ('55555555-5555-5555-5555-555555555555','Biblioteca','Gestión de recursos'),
  ('66666666-6666-6666-6666-666666666666','Vinculación','Relación con empresas'),
  ('77777777-7777-7777-7777-777777777777','Investigación','Proyectos académicos');

insert into public.vacancies (id, module_id, title, schedule, location, description, requirements) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','11111111-1111-1111-1111-111111111111','Asistente de Laboratorio','L-V 8:00-14:00','Campus central','Apoyo en toma de muestras y registro','CURP, equipo de protección'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','22222222-2222-2222-2222-222222222222','Entrenador Auxiliar','Tardes','Unidad deportiva','Coordinación de rutinas','Conocimiento en primeros auxilios'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc','44444444-4444-4444-4444-444444444444','Becario TI','Matutino','Edificio de Tecnología','Soporte de sistemas y desarrollo','Conocimientos básicos de programación'),
  ('dddddddd-dddd-dddd-dddd-dddddddddddd','55555555-5555-5555-5555-555555555555','Auxiliar de Biblioteca','Mixto','Biblioteca central','Atención a usuarios y catalogación','Trato amable, organización'),
  ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee','77777777-7777-7777-7777-777777777777','Asistente de Investigación','Flexible','Laboratorio de Innovación','Apoyo en protocolos y reportes','Metodología de investigación');

insert into public.assessments (id, vacancy_id, title, duration_minutes) values
  ('99999999-9999-9999-9999-999999999999','aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Evaluación Laboratorio',35),
  ('88888888-8888-8888-8888-888888888888','bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','Evaluación Deportes',30),
  ('77777777-aaaa-aaaa-aaaa-aaaaaaaaaaaa','cccccccc-cccc-cccc-cccc-cccccccccccc','Evaluación TI',40),
  ('66666666-aaaa-aaaa-aaaa-aaaaaaaaaaaa','dddddddd-dddd-dddd-dddd-dddddddddddd','Evaluación Biblioteca',25),
  ('55555555-aaaa-aaaa-aaaa-aaaaaaaaaaaa','eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee','Evaluación Investigación',45);

insert into public.questions (assessment_id, prompt, options, correct_option) values
  ('99999999-9999-9999-9999-999999999999','¿Qué equipo es obligatorio en laboratorio?','{"a":"Bata y guantes","b":"Sandalias","c":"Bufanda"}','a'),
  ('99999999-9999-9999-9999-999999999999','Temperatura ideal de refrigerador clínico','{"a":"2-8°C","b":"15°C","c":"-10°C"}','a'),
  ('99999999-9999-9999-9999-999999999999','Acción ante derrame','{"a":"Avisar y contener","b":"Ignorar","c":"Esperar"}','a'),
  ('99999999-9999-9999-9999-999999999999','¿Qué indica etiqueta roja?','{"a":"Inflamable","b":"Reciclable","c":"Frágil"}','a'),
  ('99999999-9999-9999-9999-999999999999','Métrica básica de calidad','{"a":"Exactitud","b":"Color","c":"Etiqueta"}','a');

insert into public.practical_tasks (assessment_id, instructions, expected_output, max_score) values
  ('99999999-9999-9999-9999-999999999999','Graba un video preparando una muestra siguiendo protocolo','Video en formato mp4',100),
  ('88888888-8888-8888-8888-888888888888','Sube tu rutina de calentamiento en PDF','Documento PDF',100),
  ('77777777-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Desarrolla un script simple que imprima logs','Archivo .txt con el código',100),
  ('66666666-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Explica cómo organizar estantería','Audio o video',100),
  ('55555555-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Diseña propuesta de experimento','Documento PDF',100);
