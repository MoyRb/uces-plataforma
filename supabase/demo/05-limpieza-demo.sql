-- =============================================================================
-- 05-limpieza-demo.sql
-- UCES DEMO — Limpieza de datos ficticios
--
-- ADVERTENCIAS:
--   1. SOLO elimina registros prefijados con DEMO UUIDs (d100..., da000..., etc.)
--   2. NO elimina el psicométrico base (f1000000-..., f2000000-...) si ya existía
--   3. NO afecta usuarios productivos ni datos anteriores a este seed
--   4. Ejecutar ÚNICAMENTE cuando las capturas ya estén obtenidas
--   5. Para eliminar usuarios auth, usar el Dashboard de Supabase o Auth Admin API
--
-- NO EJECUTAR AUTOMÁTICAMENTE — requiere confirmación manual
-- =============================================================================

-- ─── CONFIRMAR antes de ejecutar: verificar que estamos en DEMO ───────────────
-- SELECT current_database();  -- Debe ser el proyecto DEMO, NO producción

-- ─── 1. Eliminar en orden inverso a las FK ───────────────────────────────────

-- Revisiones DEMO
DELETE FROM public.reviews
WHERE attempt_id IN (
  SELECT id FROM public.attempts WHERE id::text LIKE 'd2%'
);


-- Evidencias DEMO
DELETE FROM public.evidence_uploads
WHERE attempt_id IN (
  SELECT id FROM public.attempts WHERE id::text LIKE 'd2%'
);


-- Respuestas DEMO
DELETE FROM public.answers
WHERE attempt_id IN (
  SELECT id FROM public.attempts WHERE id::text LIKE 'd2%'
);


-- Intentos DEMO
DELETE FROM public.attempts
WHERE id::text LIKE 'd2%';

-- Postulaciones DEMO (a vacantes demo y a psicométrico vía candidatos demo)
DELETE FROM public.applications
WHERE id::text LIKE 'da%';

-- Preguntas de evaluaciones DEMO (preserva psicométrico base si tiene otro assessment_id)
DELETE FROM public.questions
WHERE assessment_id::text LIKE 'da000%';

-- Tareas prácticas DEMO
DELETE FROM public.practical_tasks
WHERE assessment_id::text LIKE 'da000%';

-- Evaluaciones DEMO
DELETE FROM public.assessments
WHERE id::text LIKE 'da000%';

-- Vacantes DEMO
DELETE FROM public.vacancies
WHERE id::text LIKE 'd00%';

-- Módulos DEMO
DELETE FROM public.modules
WHERE id::text LIKE 'd100%';

-- ─── 2. Limpieza de perfiles DEMO (opcional) ──────────────────────────────────
-- Los perfiles están ligados a auth.users — eliminar auth users primero.
-- Ejecutar desde el Dashboard: Authentication > Users > Delete
-- O usar el Admin API:
--   await supabase.auth.admin.deleteUser(uuid)
-- Los perfiles se eliminan en cascada por FK.

-- Para eliminar solo los registros de profiles/user_roles/curp_hashes
-- SIN tocar auth.users (útil si auth ya fue limpiado):
-- DELETE FROM public.profiles WHERE email LIKE '%@uces-demo.test';
-- DELETE FROM public.user_roles WHERE user_id NOT IN (SELECT id FROM auth.users);
-- DELETE FROM public.curp_hashes WHERE user_id NOT IN (SELECT id FROM auth.users);

-- ─── 3. Verificar limpieza ────────────────────────────────────────────────────
SELECT 'modules'          AS tabla, COUNT(*) FROM public.modules
UNION ALL SELECT 'vacancies',       COUNT(*) FROM public.vacancies
UNION ALL SELECT 'assessments',     COUNT(*) FROM public.assessments
UNION ALL SELECT 'applications',    COUNT(*) FROM public.applications
UNION ALL SELECT 'attempts',        COUNT(*) FROM public.attempts
UNION ALL SELECT 'answers',         COUNT(*) FROM public.answers
UNION ALL SELECT 'evidence_uploads',COUNT(*) FROM public.evidence_uploads
UNION ALL SELECT 'reviews',         COUNT(*) FROM public.reviews
ORDER BY tabla;
