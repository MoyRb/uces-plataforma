create extension if not exists "uuid-ossp";

create table public.profiles (
  user_id uuid primary key references auth.users(id),
  name text,
  email text,
  role text default 'user' check (role in ('user','admin','reviewer')),
  created_at timestamptz default now()
);

create table public.modules (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text
);

create table public.vacancies (
  id uuid primary key default uuid_generate_v4(),
  module_id uuid references public.modules(id) on delete set null,
  title text not null,
  schedule text,
  location text,
  description text,
  requirements text,
  status text default 'open'
);

create table public.assessments (
  id uuid primary key default uuid_generate_v4(),
  vacancy_id uuid references public.vacancies(id) on delete cascade,
  title text,
  duration_minutes integer default 30
);

create table public.questions (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references public.assessments(id) on delete cascade,
  prompt text not null,
  options jsonb not null,
  correct_option text,
  created_by uuid references public.profiles(user_id)
);

create table public.practical_tasks (
  id uuid primary key default uuid_generate_v4(),
  assessment_id uuid references public.assessments(id) on delete cascade,
  instructions text not null,
  expected_output text,
  max_score integer default 100
);

create table public.applications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(user_id) on delete cascade,
  vacancy_id uuid references public.vacancies(id) on delete cascade,
  status text default 'PENDING' check (status in ('PENDING','UNDER_REVIEW','EVALUATED','APPROVED','REJECTED')),
  created_at timestamptz default now()
);

create table public.attempts (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid references public.applications(id) on delete cascade,
  assessment_id uuid references public.assessments(id),
  started_at timestamptz default now(),
  deadline_at timestamptz not null,
  submitted_at timestamptz,
  theory_score numeric,
  status text default 'IN_PROGRESS' check (status in ('IN_PROGRESS','SUBMITTED','UNDER_REVIEW','COMPLETED'))
);

create table public.answers (
  id uuid primary key default uuid_generate_v4(),
  attempt_id uuid references public.attempts(id) on delete cascade,
  question_id uuid references public.questions(id) on delete cascade,
  selected_option text,
  created_at timestamptz default now(),
  unique (attempt_id, question_id)
);

create table public.evidence_uploads (
  id uuid primary key default uuid_generate_v4(),
  attempt_id uuid references public.attempts(id) on delete cascade,
  bucket text default 'evidences',
  path text not null,
  mime_type text,
  size integer,
  created_at timestamptz default now()
);

create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  attempt_id uuid references public.attempts(id) on delete cascade,
  reviewer_id uuid references public.profiles(user_id),
  rubric jsonb,
  decision text check (decision in ('APPROVED','REJECTED','INFO_REQUIRED')),
  comments text,
  created_at timestamptz default now()
);

create table public.curp_hashes (
  user_id uuid references public.profiles(user_id) on delete cascade,
  curp_hash text unique not null,
  primary key (user_id, curp_hash)
);

create unique index curp_hash_unique_idx on public.curp_hashes(curp_hash);
