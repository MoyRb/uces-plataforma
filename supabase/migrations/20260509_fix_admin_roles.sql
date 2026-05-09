-- Fix admin roles model: user_roles table + get_my_role fallback to profiles.role

create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_roles
  add column if not exists updated_at timestamptz not null default now();

insert into public.user_roles (user_id, role)
select
  p.user_id,
  case when p.role = 'admin' then 'admin' else 'user' end
from public.profiles p
where p.user_id is not null
on conflict (user_id) do update
set
  role = excluded.role,
  updated_at = now();

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

  if current_role is not null then
    return current_role;
  end if;

  select p.role
    into current_role
  from public.profiles p
  where p.user_id = auth.uid()
  limit 1;

  if current_role = 'admin' then
    return 'admin';
  end if;

  return 'user';
end;
$$;

revoke all on function public.get_my_role() from public;
grant execute on function public.get_my_role() to authenticated, service_role;

alter table public.user_roles enable row level security;

drop policy if exists "users-view-own-role" on public.user_roles;
create policy "users-view-own-role"
  on public.user_roles
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "admins-manage-user-roles" on public.user_roles;
create policy "admins-manage-user-roles"
  on public.user_roles
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');
