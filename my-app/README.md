# UCES Plataforma (MVP en progreso)

Stack: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Supabase.

## Configuración
1. Crea un archivo `.env.local` en `my-app/` con las claves de Supabase y el secreto de hashing de CURP:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CURP_HASH_SECRET=
```
2. Instala dependencias
```
npm install
```
3. Ejecuta el proyecto
```
npm run dev
```

## Supabase
Los archivos en `/supabase` incluyen `schema.sql`, `seed.sql` y `rls.sql` para crear la base de datos, semillas iniciales y políticas RLS.

## Estado actual
Se añadió la página principal con llamadas a login/registro y utilidades base (clientes Supabase, hashing de CURP). Las vistas completas de paneles y evaluaciones se construirán en siguientes iteraciones.

## Cómo hacer un usuario admin
1. Abre **Supabase Dashboard -> Authentication -> Users** y copia el `UUID` del usuario en la columna **ID**.
2. Ve a **SQL Editor** y ejecuta:
```sql
insert into public.user_roles(user_id, role)
values ('<uuid>', 'admin')
on conflict (user_id) do update set role = excluded.role;
```
3. Si el usuario ya tenía sesión iniciada, cierra sesión y vuelve a entrar para refrescar permisos.
