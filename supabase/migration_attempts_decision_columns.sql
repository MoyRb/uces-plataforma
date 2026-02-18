ALTER TABLE public.attempts ADD COLUMN IF NOT EXISTS decision text;
ALTER TABLE public.attempts ADD COLUMN IF NOT EXISTS reviewer_notes text;
ALTER TABLE public.attempts DROP CONSTRAINT IF EXISTS attempts_decision_check;
ALTER TABLE public.attempts
ADD CONSTRAINT attempts_decision_check CHECK (
  decision IS NULL OR decision = ANY (ARRAY['APPROVED', 'REJECTED'])
);
