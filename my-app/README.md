# UCES Plataforma (MVP en progreso)

Stack: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Supabase.

## Configuración
1. Crea un archivo `.env.local` en `my-app/` con las claves de Supabase y el secreto de hashing de CURP:
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CURP_HASH_SECRET=
```
2. Instala dependencias
```bash
npm install
```
3. Ejecuta el proyecto
```bash
npm run dev
```

## Aplicar SQL en Supabase
En **Supabase Dashboard → SQL Editor**, ejecuta en este orden:

1. `supabase/schema.sql`
2. `supabase/seed.sql` (opcional para datos de prueba)
3. `supabase/roles.sql` (tabla `user_roles` + RPC `get_my_role()`)
4. `supabase/rls.sql` (políticas RLS de tablas y Storage)

> `supabase/rls.sql` crea/asegura el bucket privado `evidences` y agrega policies sobre `storage.objects`.

## Cómo hacer un usuario admin
1. Abre **Supabase Dashboard → Authentication → Users** y copia el `UUID` del usuario en la columna **ID**.
2. Ve a **SQL Editor** y ejecuta:
```sql
insert into public.user_roles(user_id, role)
values ('<uuid>', 'admin')
on conflict (user_id) do update set role = excluded.role;
```
3. Si el usuario ya tenía sesión iniciada, cierra sesión y vuelve a entrar para refrescar permisos.

## Probar E2E (checklist MVP)
1. Inicia sesión con un usuario **admin** y abre `/admin`.
2. Crea:
   - Módulo
   - Vacante (ligada al módulo)
   - Evaluación (ligada a la vacante)
   - Preguntas (ligadas a la evaluación)
3. Inicia sesión con un usuario **normal** y valida flujo:
   - `/panel` muestra módulos
   - Entrar a módulo y ver vacantes
   - Postularse a una vacante
   - Responder evaluación
   - Subir evidencia
   - Enviar intento
   - Ver resultado en `/resultado/:attemptId`
4. Regresa al usuario **admin**:
   - Ver listado de intentos
   - Abrir detalle de intento
   - Ver respuestas + evidencia (signed URL)
   - Marcar revisado

## Verificación local
```bash
npm run lint
```
