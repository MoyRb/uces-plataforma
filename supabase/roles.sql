-- Roles de aplicación por usuario (admin/user)
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

-- El usuario autenticado puede leer su propio rol.
drop policy if exists "Users can view own role" on public.user_roles;
create policy "Users can view own role"
  on public.user_roles
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Solo admins pueden ver toda la tabla user_roles.
drop policy if exists "Admins can view all roles" on public.user_roles;
create policy "Admins can view all roles"
  on public.user_roles
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.user_roles ur
      where ur.user_id = auth.uid()
        and ur.role = 'admin'
    )
  );

-- Ejemplo: promover usuario a admin.
insert into public.user_roles (user_id, role)
values ('<uuid>', 'admin')
on conflict (user_id) do update
  set role = excluded.role;
