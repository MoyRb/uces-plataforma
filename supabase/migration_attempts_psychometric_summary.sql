alter table public.attempts
add column if not exists psychometric_summary jsonb;
