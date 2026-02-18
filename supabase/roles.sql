-- Roles de aplicación por usuario (admin/user)
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

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

-- El usuario autenticado puede leer su propio rol (policy no recursiva).
drop policy if exists "users-view-own-role" on public.user_roles;
create policy "users-view-own-role"
  on public.user_roles
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Solo admin puede administrar roles.
drop policy if exists "admins-manage-user-roles" on public.user_roles;
create policy "admins-manage-user-roles"
  on public.user_roles
  for all
  to authenticated
  using (public.get_my_role() = 'admin')
  with check (public.get_my_role() = 'admin');

-- Ejemplo: promover usuario a admin.
insert into public.user_roles (user_id, role)
values ('<uuid>', 'admin')
on conflict (user_id) do update
  set role = excluded.role;
