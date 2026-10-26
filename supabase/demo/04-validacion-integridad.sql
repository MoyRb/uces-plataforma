-- =============================================================================
-- 04-validacion-integridad.sql
-- UCES DEMO — Fase 4: Validación de integridad y conteo de registros
-- Ejecutar después de 03-seed-flujos.sql para verificar el estado.
-- =============================================================================

-- ─── 1. Conteo por tabla ──────────────────────────────────────────────────────
SELECT 'profiles'          AS tabla, COUNT(*) AS total FROM public.profiles
UNION ALL SELECT 'user_roles',       COUNT(*) FROM public.user_roles
UNION ALL SELECT 'curp_hashes',      COUNT(*) FROM public.curp_hashes
UNION ALL SELECT 'modules',          COUNT(*) FROM public.modules
UNION ALL SELECT 'vacancies',        COUNT(*) FROM public.vacancies
UNION ALL SELECT 'assessments',      COUNT(*) FROM public.assessments
UNION ALL SELECT 'questions',        COUNT(*) FROM public.questions
UNION ALL SELECT 'practical_tasks',  COUNT(*) FROM public.practical_tasks
UNION ALL SELECT 'applications',     COUNT(*) FROM public.applications
UNION ALL SELECT 'attempts',         COUNT(*) FROM public.attempts
UNION ALL SELECT 'answers',          COUNT(*) FROM public.answers
UNION ALL SELECT 'evidence_uploads', COUNT(*) FROM public.evidence_uploads
UNION ALL SELECT 'reviews',          COUNT(*) FROM public.reviews
ORDER BY tabla;

-- ─── 2. Perfiles con roles ────────────────────────────────────────────────────
SELECT p.name, p.email, p.role AS profile_role, ur.role AS user_role
FROM public.profiles p
LEFT JOIN public.user_roles ur ON ur.user_id = p.user_id
ORDER BY ur.role DESC, p.name;

-- ─── 3. Postulaciones por vacante ────────────────────────────────────────────
SELECT v.title, a.status, COUNT(*) AS total
FROM public.applications a
JOIN public.vacancies v ON v.id = a.vacancy_id
GROUP BY v.title, a.status
ORDER BY v.title, a.status;

-- ─── 4. Intentos por evaluación y estado ─────────────────────────────────────
SELECT asmt.title, t.status, COUNT(*) AS total
FROM public.attempts t
JOIN public.assessments asmt ON asmt.id = t.assessment_id
GROUP BY asmt.title, t.status
ORDER BY asmt.title, t.status;

-- ─── 5. Respuestas por intento ────────────────────────────────────────────────
SELECT t.id, t.status, COUNT(ans.id) AS respuestas
FROM public.attempts t
LEFT JOIN public.answers ans ON ans.attempt_id = t.id
GROUP BY t.id, t.status
ORDER BY respuestas DESC;

-- ─── 6. Evidencias por candidato ─────────────────────────────────────────────
SELECT p.name, COUNT(eu.id) AS evidencias, SUM(eu.size) AS bytes_total
FROM public.evidence_uploads eu
JOIN public.attempts t ON t.id = eu.attempt_id
JOIN public.applications a ON a.id = t.application_id
JOIN public.profiles p ON p.user_id = a.user_id
GROUP BY p.name
ORDER BY evidencias DESC;

-- ─── 7. Revisiones administrativas ───────────────────────────────────────────
SELECT p.name AS candidato, r.decision, r.comments
FROM public.reviews r
JOIN public.attempts t ON t.id = r.attempt_id
JOIN public.applications a ON a.id = t.application_id
JOIN public.profiles p ON p.user_id = a.user_id
ORDER BY r.created_at DESC;

-- ─── 8. Estados de vacantes ───────────────────────────────────────────────────
SELECT status, COUNT(*) AS total FROM public.vacancies GROUP BY status;

-- ─── 9. Candidatos con psicométrico completado ───────────────────────────────
SELECT p.name, t.status AS psicometrico_status, t.psychometric_summary
FROM public.attempts t
JOIN public.applications a ON a.id = t.application_id
JOIN public.vacancies v ON v.id = a.vacancy_id
JOIN public.profiles p ON p.user_id = a.user_id
WHERE v.id = 'f1000000-0000-0000-0000-000000000001'
ORDER BY t.status, p.name;

-- ─── 10. Verificar ausencia de huérfanos ─────────────────────────────────────
-- Aplicaciones sin perfil de usuario
SELECT 'app_sin_perfil' AS tipo, COUNT(*) AS total
FROM public.applications a
WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = a.user_id)
UNION ALL
-- Intentos sin aplicación
SELECT 'attempt_sin_app', COUNT(*)
FROM public.attempts t
WHERE NOT EXISTS (SELECT 1 FROM public.applications a WHERE a.id = t.application_id)
UNION ALL
-- Respuestas sin intento
SELECT 'answer_sin_attempt', COUNT(*)
FROM public.answers ans
WHERE NOT EXISTS (SELECT 1 FROM public.attempts t WHERE t.id = ans.attempt_id)
UNION ALL
-- Evidencias sin intento
SELECT 'evidence_sin_attempt', COUNT(*)
FROM public.evidence_uploads eu
WHERE NOT EXISTS (SELECT 1 FROM public.attempts t WHERE t.id = eu.attempt_id)
UNION ALL
-- Revisiones sin intento
SELECT 'review_sin_attempt', COUNT(*)
FROM public.reviews r
WHERE NOT EXISTS (SELECT 1 FROM public.attempts t WHERE t.id = r.attempt_id);

-- ─── 11. Vista consolidada de flujos completos ────────────────────────────────
-- Candidato → postulación vacante real → intento → decisión
SELECT
  p.name AS candidato,
  v.title AS vacante,
  app.status AS app_status,
  t.status AS intento_status,
  t.theory_score AS score,
  t.decision AS decision_intento,
  rev.decision AS decision_revision,
  (SELECT COUNT(*) FROM public.answers ans WHERE ans.attempt_id = t.id) AS num_respuestas,
  (SELECT COUNT(*) FROM public.evidence_uploads eu WHERE eu.attempt_id = t.id) AS num_evidencias
FROM public.applications app
JOIN public.vacancies v ON v.id = app.vacancy_id
JOIN public.profiles p ON p.user_id = app.user_id
LEFT JOIN public.attempts t ON t.application_id = app.id
LEFT JOIN public.reviews rev ON rev.attempt_id = t.id
WHERE v.id != 'f1000000-0000-0000-0000-000000000001'
ORDER BY p.name, v.title;
