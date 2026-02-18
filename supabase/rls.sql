-- Role helpers
create or replace function public.get_my_role()
returns text
language plpgsql
security definer
set search_path = public
stable
as $$
declare
  current_role text;
begin
  select ur.role
    into current_role
  from public.user_roles ur
  where ur.user_id = auth.uid()
  limit 1;

  return coalesce(current_role, 'user');
end;
$$;

revoke all on function public.get_my_role() from public;
grant execute on function public.get_my_role() to authenticated, service_role;

alter table public.user_roles enable row level security;
alter table public.modules enable row level security;
alter table public.applications enable row level security;
alter table public.attempts enable row level security;
alter table public.answers enable row level security;
alter table public.evidence_uploads enable row level security;
alter table public.reviews enable row level security;
alter table public.questions enable row level security;
alter table public.practical_tasks enable row level security;
alter table public.vacancies enable row level security;
alter table public.assessments enable row level security;

-- Reset policies
 drop policy if exists "users-view-own-role" on public.user_roles;
 drop policy if exists "admins-manage-user-roles" on public.user_roles;

 drop policy if exists "authenticated-read-modules" on public.modules;
 drop policy if exists "admin-manage-modules" on public.modules;

 drop policy if exists "authenticated-read-vacancies" on public.vacancies;
 drop policy if exists "admin-manage-vacancies" on public.vacancies;

 drop policy if exists "authenticated-read-assessments" on public.assessments;
 drop policy if exists "admin-manage-assessments" on public.assessments;

 drop policy if exists "authenticated-read-questions" on public.questions;
 drop policy if exists "admin-manage-questions" on public.questions;

 drop policy if exists "authenticated-read-practical-tasks" on public.practical_tasks;
 drop policy if exists "admin-manage-practical-tasks" on public.practical_tasks;

 drop policy if exists "users-manage-own-applications" on public.applications;
 drop policy if exists "admins-full-access" on public.applications;

 drop policy if exists "users-manage-own-attempts" on public.attempts;
 drop policy if exists "admins-full-access-attempts" on public.attempts;

 drop policy if exists "users-manage-own-answers" on public.answers;
 drop policy if exists "admins-full-access-answers" on public.answers;

 drop policy if exists "users-manage-own-evidence" on public.evidence_uploads;
 drop policy if exists "admins-full-access-evidence" on public.evidence_uploads;

 drop policy if exists "users-read-own-reviews" on public.reviews;
 drop policy if exists "admins-manage-reviews" on public.reviews;

-- user_roles (non-recursive)
create policy "users-view-own-role"
  on public.user_roles
  for select
  to authenticated
  using (user_id = auth.uid());

create policy "admins-manage-user-roles"
  on public.user_roles
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

-- modules/vacancies/assessments/questions/practical_tasks
create policy "authenticated-read-modules"
  on public.modules
  for select
  to authenticated
  using (true);

create policy "admin-manage-modules"
  on public.modules
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "authenticated-read-vacancies"
  on public.vacancies
  for select
  to authenticated
  using (true);

create policy "admin-manage-vacancies"
  on public.vacancies
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "authenticated-read-assessments"
  on public.assessments
  for select
  to authenticated
  using (true);

create policy "admin-manage-assessments"
  on public.assessments
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "authenticated-read-questions"
  on public.questions
  for select
  to authenticated
  using (true);

create policy "admin-manage-questions"
  on public.questions
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "authenticated-read-practical-tasks"
  on public.practical_tasks
  for select
  to authenticated
  using (true);

create policy "admin-manage-practical-tasks"
  on public.practical_tasks
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

-- applications/attempts/answers/evidence_uploads
create policy "users-manage-own-applications"
  on public.applications
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "admins-full-access-applications"
  on public.applications
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "users-manage-own-attempts"
  on public.attempts
  for all
  to authenticated
  using (
    exists (
      select 1 from public.applications a
      where a.id = attempts.application_id
      and a.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.applications a
      where a.id = attempts.application_id
      and a.user_id = auth.uid()
    )
  );

create policy "admins-full-access-attempts"
  on public.attempts
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "users-manage-own-answers"
  on public.answers
  for all
  to authenticated
  using (
    exists (
      select 1
      from public.attempts t
      join public.applications a on a.id = t.application_id
      where t.id = answers.attempt_id
        and a.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.attempts t
      join public.applications a on a.id = t.application_id
      where t.id = answers.attempt_id
        and a.user_id = auth.uid()
    )
  );

create policy "admins-full-access-answers"
  on public.answers
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

create policy "users-manage-own-evidence"
  on public.evidence_uploads
  for all
  to authenticated
  using (
    exists (
      select 1
      from public.attempts t
      join public.applications a on a.id = t.application_id
      where t.id = evidence_uploads.attempt_id
        and a.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1
      from public.attempts t
      join public.applications a on a.id = t.application_id
      where t.id = evidence_uploads.attempt_id
        and a.user_id = auth.uid()
    )
  );

create policy "admins-full-access-evidence"
  on public.evidence_uploads
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

-- reviews
create policy "users-read-own-reviews"
  on public.reviews
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.attempts t
      join public.applications a on a.id = t.application_id
      where t.id = reviews.attempt_id
        and a.user_id = auth.uid()
    )
  );

create policy "admins-manage-reviews"
  on public.reviews
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

-- Storage bucket and policies for evidence uploads
insert into storage.buckets (id, name, public)
values ('evidences', 'evidences', false)
on conflict (id) do update set public = excluded.public;

 drop policy if exists "authenticated-upload-evidences" on storage.objects;
 drop policy if exists "owner-or-admin-read-evidences" on storage.objects;

create policy "authenticated-upload-evidences"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'evidences'
    and owner = auth.uid()
  );

create policy "owner-or-admin-read-evidences"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'evidences'
    and (owner = auth.uid() or public.get_my_role() = 'admin')
  );
