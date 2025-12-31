alter table public.applications enable row level security;
alter table public.attempts enable row level security;
alter table public.answers enable row level security;
alter table public.evidence_uploads enable row level security;
alter table public.reviews enable row level security;
alter table public.questions enable row level security;
alter table public.practical_tasks enable row level security;
alter table public.vacancies enable row level security;
alter table public.assessments enable row level security;

create policy "users-manage-own-applications" on public.applications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "users-manage-own-attempts" on public.attempts
  for all using (auth.uid() in (
    select applications.user_id from applications where applications.id = application_id
  ))
  with check (auth.uid() in (
    select applications.user_id from applications where applications.id = application_id
  ));

create policy "users-manage-own-answers" on public.answers
  for all using (auth.uid() in (
    select applications.user_id from applications join attempts on attempts.application_id = applications.id where attempts.id = attempt_id
  ))
  with check (auth.uid() in (
    select applications.user_id from applications join attempts on attempts.application_id = applications.id where attempts.id = attempt_id
  ));

create policy "users-manage-own-evidence" on public.evidence_uploads
  for all using (auth.uid() in (
    select applications.user_id from applications join attempts on attempts.application_id = applications.id where attempts.id = attempt_id
  ))
  with check (auth.uid() in (
    select applications.user_id from applications join attempts on attempts.application_id = applications.id where attempts.id = attempt_id
  ));

create policy "admins-full-access" on public.applications for all using (
  exists(select 1 from profiles where profiles.user_id = auth.uid() and profiles.role in ('admin','reviewer'))
);
create policy "admins-full-access-attempts" on public.attempts for all using (
  exists(select 1 from profiles where profiles.user_id = auth.uid() and profiles.role in ('admin','reviewer'))
);
create policy "admins-full-access-answers" on public.answers for all using (
  exists(select 1 from profiles where profiles.user_id = auth.uid() and profiles.role in ('admin','reviewer'))
);
create policy "admins-full-access-evidence" on public.evidence_uploads for all using (
  exists(select 1 from profiles where profiles.user_id = auth.uid() and profiles.role in ('admin','reviewer'))
);
create policy "admins-manage-questions" on public.questions for all using (
  exists(select 1 from profiles where profiles.user_id = auth.uid() and profiles.role in ('admin','reviewer'))
);
create policy "admins-manage-tasks" on public.practical_tasks for all using (
  exists(select 1 from profiles where profiles.user_id = auth.uid() and profiles.role in ('admin','reviewer'))
);
create policy "admins-manage-vacancies" on public.vacancies for all using (
  exists(select 1 from profiles where profiles.user_id = auth.uid() and profiles.role in ('admin','reviewer'))
);
create policy "admins-manage-assessments" on public.assessments for all using (
  exists(select 1 from profiles where profiles.user_id = auth.uid() and profiles.role in ('admin','reviewer'))
);
