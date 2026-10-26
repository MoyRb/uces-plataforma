-- =============================================================================
-- 03-seed-flujos.sql
-- UCES DEMO — Fase 3: Flujos completos (postulaciones, intentos, respuestas,
--             evidencias, revisiones)
--
-- PRERREQUISITO: 06-crear-usuarios.js ya ejecutado.
-- UUIDs reales ya sustituidos desde .demo-uuids.json (2026-10-25).
--
-- Ejecutar directamente en el SQL Editor de Supabase.
-- =============================================================================

-- ─── Variables de configuración (reemplazar con UUIDs reales) ─────────────────
-- Después de ejecutar 06-crear-usuarios.js, sustituye los valores de abajo:

DO $$
DECLARE
  -- Usuarios (UUIDs reales de producción — generados por 06-crear-usuarios.js)
  uid_admin    uuid := '677dbf14-02c4-47cd-8aab-194b5831fff4'; -- c.mendoza@itesz.edu.mx
  uid_revisor  uuid := '764372d5-09a6-421f-850b-757d80c78382'; -- a.villanueva@itesz.edu.mx
  uid_cand01   uuid := '44dbcf00-5c39-4d6e-bfe9-bedbd2475309'; -- luis.ramirez98 (psicométrico completado, aprobado)
  uid_cand02   uuid := '623a1307-3705-4cc6-ac3e-913b3b94b94d'; -- sofia.martinez99 (evaluación SUBMITTED)
  uid_cand03   uuid := '1e16c668-bffd-4197-bcbd-d6472b6bb50b'; -- roberto.jimenez (en revisión)
  uid_cand04   uuid := '9455f096-4556-41f3-a4ed-b3ccdc9d2f03'; -- mf.lopez (decisión APPROVED)
  uid_cand05   uuid := '7bf26ec9-f53a-41c5-9e13-17400d78c3c4'; -- diego.sanchez (decisión REJECTED)
  uid_cand06   uuid := 'e825c075-7945-48ae-8f53-4e8acf0e5739'; -- valeria.gomez (psicométrico IN_PROGRESS)
  uid_cand07   uuid := 'a19ea318-f729-4fbf-9e12-a9db9ce0a0b4'; -- oscar.hernandez (solo registrado)
  uid_cand08   uuid := '849ab870-742a-4f87-a9ea-1f29e9bbbbb9'; -- daniela.pena (psicométrico COMPLETED)
  uid_extra01  uuid := 'af90b457-b707-4b3c-aa9c-c4807433b0a4'; -- javier.torres

  -- IDs de aplicaciones (fijos para reproducibilidad)
  app01 uuid := 'da100001-0000-0000-0000-000000000001';
  app02 uuid := 'da100002-0000-0000-0000-000000000002';
  app03 uuid := 'da100003-0000-0000-0000-000000000003';
  app04 uuid := 'da100004-0000-0000-0000-000000000004';
  app05 uuid := 'da100005-0000-0000-0000-000000000005';
  app06 uuid := 'da100006-0000-0000-0000-000000000006';
  app07 uuid := 'da100007-0000-0000-0000-000000000007';
  app08 uuid := 'da100008-0000-0000-0000-000000000008';

  -- IDs de intentos psicométricos (uno por candidato)
  psico_attempt01 uuid := 'd2100001-0000-0000-0000-000000000001';
  psico_attempt02 uuid := 'd2100002-0000-0000-0000-000000000002';
  psico_attempt03 uuid := 'd2100003-0000-0000-0000-000000000003';
  psico_attempt04 uuid := 'd2100004-0000-0000-0000-000000000004';
  psico_attempt05 uuid := 'd2100005-0000-0000-0000-000000000005';
  psico_attempt06 uuid := 'd2100006-0000-0000-0000-000000000006';
  psico_attempt08 uuid := 'd2100008-0000-0000-0000-000000000008';

  -- IDs de intentos de evaluación de vacante
  eval_attempt01 uuid := 'd2200001-0000-0000-0000-000000000001';
  eval_attempt02 uuid := 'd2200002-0000-0000-0000-000000000002';
  eval_attempt03 uuid := 'd2200003-0000-0000-0000-000000000003';
  eval_attempt04 uuid := 'd2200004-0000-0000-0000-000000000004';
  eval_attempt05 uuid := 'd2200005-0000-0000-0000-000000000005';

  psych_summary_high jsonb := '{"ESTABILIDAD_EMOCIONAL":{"score":17,"nivel":"Alta"},"AMABILIDAD":{"score":16,"nivel":"Alta"},"RESPONSABILIDAD":{"score":18,"nivel":"Alta"},"APERTURA":{"score":15,"nivel":"Adecuada"},"EXTROVERSION":{"score":14,"nivel":"Adecuada"}}';
  psych_summary_med  jsonb := '{"ESTABILIDAD_EMOCIONAL":{"score":12,"nivel":"Adecuada"},"AMABILIDAD":{"score":13,"nivel":"Adecuada"},"RESPONSABILIDAD":{"score":11,"nivel":"Adecuada"},"APERTURA":{"score":14,"nivel":"Adecuada"},"EXTROVERSION":{"score":10,"nivel":"Riesgo"}}';

BEGIN

-- ─── Postulaciones psicométricas (vacante interna f1000000-...) ───────────────
-- Cada candidato que tiene psicométrico necesita una application a la vacante interna
INSERT INTO public.applications (id, user_id, vacancy_id, status, created_at)
VALUES
  (app01, uid_cand01, 'f1000000-0000-0000-0000-000000000001', 'EVALUATED', now() - interval '10 days'),
  (app02, uid_cand02, 'f1000000-0000-0000-0000-000000000001', 'EVALUATED', now() - interval '8 days'),
  (app03, uid_cand03, 'f1000000-0000-0000-0000-000000000001', 'EVALUATED', now() - interval '7 days'),
  (app04, uid_cand04, 'f1000000-0000-0000-0000-000000000001', 'EVALUATED', now() - interval '6 days'),
  (app05, uid_cand05, 'f1000000-0000-0000-0000-000000000001', 'EVALUATED', now() - interval '5 days'),
  (app06, uid_cand06, 'f1000000-0000-0000-0000-000000000001', 'PENDING',   now() - interval '2 days'),
  (app08, uid_cand08, 'f1000000-0000-0000-0000-000000000001', 'EVALUATED', now() - interval '4 days')
ON CONFLICT (id) DO NOTHING;

-- ─── Intentos psicométricos ───────────────────────────────────────────────────
INSERT INTO public.attempts (id, application_id, assessment_id, started_at, deadline_at, submitted_at, psychometric_summary, status)
VALUES
  -- cand01: COMPLETED con scores altos
  (psico_attempt01, app01, 'f2000000-0000-0000-0000-000000000001',
   now()-interval '10 days', now()-interval '10 days'+interval '10 min',
   now()-interval '10 days'+interval '9 min', psych_summary_high, 'COMPLETED'),
  -- cand02: COMPLETED scores medios
  (psico_attempt02, app02, 'f2000000-0000-0000-0000-000000000001',
   now()-interval '8 days', now()-interval '8 days'+interval '10 min',
   now()-interval '8 days'+interval '8 min', psych_summary_med, 'COMPLETED'),
  -- cand03: COMPLETED
  (psico_attempt03, app03, 'f2000000-0000-0000-0000-000000000001',
   now()-interval '7 days', now()-interval '7 days'+interval '10 min',
   now()-interval '7 days'+interval '9 min', psych_summary_high, 'COMPLETED'),
  -- cand04: COMPLETED
  (psico_attempt04, app04, 'f2000000-0000-0000-0000-000000000001',
   now()-interval '6 days', now()-interval '6 days'+interval '10 min',
   now()-interval '6 days'+interval '7 min', psych_summary_high, 'COMPLETED'),
  -- cand05: COMPLETED
  (psico_attempt05, app05, 'f2000000-0000-0000-0000-000000000001',
   now()-interval '5 days', now()-interval '5 days'+interval '10 min',
   now()-interval '5 days'+interval '10 min', psych_summary_med, 'COMPLETED'),
  -- cand06: IN_PROGRESS (no terminó)
  (psico_attempt06, app06, 'f2000000-0000-0000-0000-000000000001',
   now()-interval '2 days', now()-interval '2 days'+interval '10 min',
   NULL, NULL, 'IN_PROGRESS'),
  -- cand08: COMPLETED
  (psico_attempt08, app08, 'f2000000-0000-0000-0000-000000000001',
   now()-interval '4 days', now()-interval '4 days'+interval '10 min',
   now()-interval '4 days'+interval '9 min', psych_summary_high, 'COMPLETED')
ON CONFLICT (id) DO NOTHING;

-- ─── Postulaciones a vacantes reales ─────────────────────────────────────────
-- (requieren psicométrico completado — cand01..05 lo tienen)
INSERT INTO public.applications (id, user_id, vacancy_id, status, created_at)
VALUES
  ('da200001-0000-0000-0000-000000000001', uid_cand01, 'd0000001-0000-0000-0000-000000000001', 'APPROVED',     now()-interval '9 days'),
  ('da200002-0000-0000-0000-000000000002', uid_cand02, 'd0000002-0000-0000-0000-000000000002', 'UNDER_REVIEW', now()-interval '7 days'),
  ('da200003-0000-0000-0000-000000000003', uid_cand03, 'd0000001-0000-0000-0000-000000000001', 'UNDER_REVIEW', now()-interval '6 days'),
  ('da200004-0000-0000-0000-000000000004', uid_cand04, 'd0000003-0000-0000-0000-000000000003', 'APPROVED',     now()-interval '5 days'),
  ('da200005-0000-0000-0000-000000000005', uid_cand05, 'd0000004-0000-0000-0000-000000000004', 'REJECTED',     now()-interval '4 days'),
  ('da200006-0000-0000-0000-000000000006', uid_cand01, 'd0000002-0000-0000-0000-000000000002', 'PENDING',      now()-interval '3 days'),
  ('da200007-0000-0000-0000-000000000007', uid_cand08, 'd0000005-0000-0000-0000-000000000005', 'PENDING',      now()-interval '2 days')
ON CONFLICT (id) DO NOTHING;

-- ─── Intentos de evaluación de vacante ────────────────────────────────────────
INSERT INTO public.attempts (id, application_id, assessment_id, started_at, deadline_at, submitted_at, theory_score, status, decision, reviewer_notes)
VALUES
  -- cand01/vacante1: COMPLETED+APPROVED
  ('d2200001-0000-0000-0000-000000000001', 'da200001-0000-0000-0000-000000000001', 'da000001-0000-0000-0000-000000000001',
   now()-interval '9 days', now()-interval '9 days'+interval '35 min',
   now()-interval '9 days'+interval '30 min', 85, 'COMPLETED', 'APPROVED', 'Excelente desempeño — DEMO'),
  -- cand02/vacante2: SUBMITTED (aún no revisado)
  ('d2200002-0000-0000-0000-000000000002', 'da200002-0000-0000-0000-000000000002', 'da000002-0000-0000-0000-000000000002',
   now()-interval '7 days', now()-interval '7 days'+interval '40 min',
   now()-interval '7 days'+interval '38 min', 72, 'SUBMITTED', NULL, NULL),
  -- cand03/vacante1: UNDER_REVIEW
  ('d2200003-0000-0000-0000-000000000003', 'da200003-0000-0000-0000-000000000003', 'da000001-0000-0000-0000-000000000001',
   now()-interval '6 days', now()-interval '6 days'+interval '35 min',
   now()-interval '6 days'+interval '33 min', 78, 'UNDER_REVIEW', NULL, NULL),
  -- cand04/vacante3: COMPLETED+APPROVED
  ('d2200004-0000-0000-0000-000000000004', 'da200004-0000-0000-0000-000000000004', 'da000003-0000-0000-0000-000000000003',
   now()-interval '5 days', now()-interval '5 days'+interval '25 min',
   now()-interval '5 days'+interval '22 min', 91, 'COMPLETED', 'APPROVED', 'Muy buen perfil — DEMO'),
  -- cand05/vacante4: COMPLETED+REJECTED
  ('d2200005-0000-0000-0000-000000000005', 'da200005-0000-0000-0000-000000000005', 'da000004-0000-0000-0000-000000000004',
   now()-interval '4 days', now()-interval '4 days'+interval '45 min',
   now()-interval '4 days'+interval '44 min', 55, 'COMPLETED', 'REJECTED', 'Puntaje insuficiente — DEMO')
ON CONFLICT (id) DO NOTHING;

-- ─── Respuestas a preguntas (cand01 y cand02, evaluación de vacante) ──────────
-- Obtener IDs de preguntas de la evaluación da000001
WITH q AS (
  SELECT id, ROW_NUMBER() OVER () AS rn
  FROM public.questions
  WHERE assessment_id = 'da000001-0000-0000-0000-000000000001'
)
INSERT INTO public.answers (attempt_id, question_id, selected_option)
SELECT 'd2200001-0000-0000-0000-000000000001', id,
  CASE rn WHEN 1 THEN 'a' WHEN 2 THEN 'a' WHEN 3 THEN 'a' WHEN 4 THEN 'a' ELSE 'a' END
FROM q
ON CONFLICT (attempt_id, question_id) DO NOTHING;

-- Respuestas cand02 (evaluación TI)
WITH q AS (
  SELECT id, ROW_NUMBER() OVER () AS rn
  FROM public.questions
  WHERE assessment_id = 'da000002-0000-0000-0000-000000000002'
)
INSERT INTO public.answers (attempt_id, question_id, selected_option)
SELECT 'd2200002-0000-0000-0000-000000000002', id,
  CASE rn WHEN 1 THEN 'a' WHEN 2 THEN 'a' WHEN 3 THEN 'a' WHEN 4 THEN 'b' ELSE 'a' END
FROM q
ON CONFLICT (attempt_id, question_id) DO NOTHING;

-- Respuestas psicométricas cand01 (20 ítems, todas opción '4' = De acuerdo)
WITH q AS (SELECT id FROM public.questions WHERE assessment_id = 'f2000000-0000-0000-0000-000000000001')
INSERT INTO public.answers (attempt_id, question_id, selected_option)
SELECT 'd2100001-0000-0000-0000-000000000001', id, '4'
FROM q
ON CONFLICT (attempt_id, question_id) DO NOTHING;

-- Respuestas psicométricas cand02 (mezcla de opciones)
WITH q AS (SELECT id, ROW_NUMBER() OVER () AS rn FROM public.questions WHERE assessment_id = 'f2000000-0000-0000-0000-000000000001')
INSERT INTO public.answers (attempt_id, question_id, selected_option)
SELECT 'd2100002-0000-0000-0000-000000000002', id,
  CASE (rn % 5) WHEN 0 THEN '5' WHEN 1 THEN '4' WHEN 2 THEN '3' WHEN 3 THEN '4' ELSE '3' END
FROM q
ON CONFLICT (attempt_id, question_id) DO NOTHING;

-- ─── Evidencias de archivo (placeholders DEMO) ────────────────────────────────
-- Los archivos reales se crean via Storage API; aquí registramos los metadatos
INSERT INTO public.evidence_uploads (attempt_id, bucket, path, mime_type, size, created_at)
VALUES
  ('d2200001-0000-0000-0000-000000000001', 'evidences', 'demo/cand01/evidencia-laboratorio-demo.pdf', 'application/pdf', 204800, now()-interval '9 days'),
  ('d2200002-0000-0000-0000-000000000002', 'evidences', 'demo/cand02/evidencia-ti-demo.zip',          'application/zip', 512000, now()-interval '7 days'),
  ('d2200003-0000-0000-0000-000000000003', 'evidences', 'demo/cand03/evidencia-lab-demo-2.pdf',       'application/pdf', 153600, now()-interval '6 days'),
  ('d2200004-0000-0000-0000-000000000004', 'evidences', 'demo/cand04/evidencia-biblioteca-demo.pdf',  'application/pdf', 307200, now()-interval '5 days'),
  ('d2200005-0000-0000-0000-000000000005', 'evidences', 'demo/cand05/evidencia-invest-demo.pdf',      'application/pdf', 102400, now()-interval '4 days'),
  ('d2200002-0000-0000-0000-000000000002', 'evidences', 'demo/cand02/evidencia-ti-demo-2.txt',        'text/plain',       10240, now()-interval '7 days'),
  ('d2200001-0000-0000-0000-000000000001', 'evidences', 'demo/cand01/video-muestra-demo.mp4',         'video/mp4',      2048000, now()-interval '9 days'),
  ('d2200003-0000-0000-0000-000000000003', 'evidences', 'demo/cand03/protocolo-demo.docx',            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 81920, now()-interval '6 days')
ON CONFLICT DO NOTHING;

-- ─── Revisiones administrativas ───────────────────────────────────────────────
-- INC-6B-02: usar 'comments' (NO 'notes') — columna real en schema.sql
INSERT INTO public.reviews (attempt_id, reviewer_id, rubric, decision, comments, created_at)
VALUES
  -- cand01 aprobado
  ('d2200001-0000-0000-0000-000000000001', uid_revisor,
   '{"tecnico":90,"actitud":85,"experiencia":80}',
   'APPROVED', 'Candidato sobresaliente. Conocimiento técnico sólido — DEMO FICTICIO', now()-interval '8 days'),
  -- cand04 aprobado
  ('d2200004-0000-0000-0000-000000000004', uid_admin,
   '{"tecnico":95,"actitud":90,"experiencia":88}',
   'APPROVED', 'Perfil excepcional para Biblioteca — DEMO FICTICIO', now()-interval '4 days'),
  -- cand05 rechazado
  ('d2200005-0000-0000-0000-000000000005', uid_revisor,
   '{"tecnico":50,"actitud":65,"experiencia":45}',
   'REJECTED', 'No alcanza el mínimo requerido en área técnica — DEMO FICTICIO', now()-interval '3 days'),
  -- cand03 requiere información adicional
  ('d2200003-0000-0000-0000-000000000003', uid_admin,
   '{"tecnico":75,"actitud":80,"experiencia":null}',
   'INFO_REQUIRED', 'Solicitar documentación adicional de experiencia — DEMO FICTICIO', now()-interval '5 days')
ON CONFLICT DO NOTHING;

END $$;

-- ─── Verificación rápida ──────────────────────────────────────────────────────
SELECT 'profiles'         AS tabla, COUNT(*) AS registros FROM public.profiles
UNION ALL SELECT 'user_roles',      COUNT(*) FROM public.user_roles
UNION ALL SELECT 'curp_hashes',     COUNT(*) FROM public.curp_hashes
UNION ALL SELECT 'applications',    COUNT(*) FROM public.applications
UNION ALL SELECT 'attempts',        COUNT(*) FROM public.attempts
UNION ALL SELECT 'answers',         COUNT(*) FROM public.answers
UNION ALL SELECT 'evidence_uploads',COUNT(*) FROM public.evidence_uploads
UNION ALL SELECT 'reviews',         COUNT(*) FROM public.reviews
ORDER BY tabla;
