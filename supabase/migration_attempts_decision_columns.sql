ALTER TABLE public.attempts ADD COLUMN IF NOT EXISTS decision text;
ALTER TABLE public.attempts ADD COLUMN IF NOT EXISTS reviewer_notes text;
