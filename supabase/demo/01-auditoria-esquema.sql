-- =============================================================================
-- 01-auditoria-esquema.sql
-- UCES DEMO — Fase 1: Auditoría del esquema real del proyecto DEMO
-- Ejecutar ANTES de insertar datos para verificar columnas existentes.
-- =============================================================================

-- VERIFICAR proyecto: el resultado debe ser el proyecto DEMO, NO producción
SELECT current_database(), now() AS ts;

-- ─── 1. Tablas existentes ────────────────────────────────────────────────────
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- ─── 2. Columnas de cada tabla ───────────────────────────────────────────────

-- profiles
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'profiles'
ORDER BY ordinal_position;

-- user_roles
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'user_roles'
ORDER BY ordinal_position;

-- curp_hashes
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'curp_hashes'
ORDER BY ordinal_position;

-- attempts (verificar si existen decision y reviewer_notes de la migración)
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'attempts'
ORDER BY ordinal_position;

-- reviews (verificar columnas reales: schema.sql tiene 'comments', NO 'notes')
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'reviews'
ORDER BY ordinal_position;

-- ─── 3. Restricciones CHECK ──────────────────────────────────────────────────
SELECT tc.table_name, cc.constraint_name, cc.check_clause
FROM information_schema.table_constraints tc
JOIN information_schema.check_constraints cc
  ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public'
ORDER BY tc.table_name;

-- ─── 4. Incidencias conocidas ────────────────────────────────────────────────
-- INC-6B-02: reviews tiene 'comments', NO 'notes' ni 'updated_at'
-- El código en api/admin/attempts/[id]/route.ts ya tiene fallback para esto.
-- Para el seed DEMO se usará la columna 'comments' directamente.

SELECT
  CASE
    WHEN EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'reviews' AND column_name = 'notes'
    ) THEN 'reviews.notes EXISTS (inesperado)'
    ELSE 'reviews.notes NO existe — usar comments (correcto)'
  END AS inc_6b_02_status,
  CASE
    WHEN EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'attempts' AND column_name = 'decision'
    ) THEN 'attempts.decision EXISTS (migración aplicada)'
    ELSE 'attempts.decision NO existe — aplicar migration_attempts_decision_columns.sql'
  END AS decision_column_status,
  CASE
    WHEN EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'attempts' AND column_name = 'psychometric_summary'
    ) THEN 'attempts.psychometric_summary EXISTS'
    ELSE 'attempts.psychometric_summary NO existe — aplicar migration_attempts_psychometric_summary.sql'
  END AS psych_summary_status;
