# 08h-validacion-supabase.md
# Corte 8H — Guía de validación en Supabase DEMO
**Fecha:** 2026-10-24

---

## 1. Prerrequisitos

1. Proyecto Supabase DEMO independiente creado (distinto de `uilqwyrslwrkeubaayoi`)
2. Archivo `.env.demo.local` en raíz del proyecto con:
   ```
   SUPABASE_DEMO_URL=https://<ref-demo>.supabase.co
   SUPABASE_DEMO_SERVICE_ROLE_KEY=<service_role_key>
   CURP_HMAC_SECRET=DEMO_CURP_KEY_2026
   ```
3. Node.js 18+ y `@supabase/supabase-js` instalado (`npm install @supabase/supabase-js`)

---

## 2. Orden de ejecución

```
1. supabase/demo/01-auditoria-esquema.sql    → Verificar esquema
2. supabase/demo/06-crear-usuarios.js        → node supabase/demo/06-crear-usuarios.js
3. supabase/demo/02-seed-catalogos.sql       → Ejecutar en SQL Editor
4. supabase/demo/03-seed-flujos.sql          → Sustituir UUIDs del .demo-uuids.json, ejecutar
5. supabase/demo/04-validacion-integridad.sql → Verificar conteos y relaciones
```

---

## 3. Conteos esperados tras seed completo

| Tabla | Mínimo esperado |
|-------|----------------|
| profiles | 12 |
| user_roles | 12 |
| curp_hashes | 10 |
| modules | 4 |
| vacancies | 11 (10 demo + 1 psicométrico) |
| assessments | 6 (5 demo + 1 psicométrico) |
| questions | 25 (demo) + 20 (psicométrico) = 45 |
| practical_tasks | 6 |
| applications | 14 (7 psicométrico + 7 vacantes) |
| attempts | 12 (7 psicométrico + 5 vacantes) |
| answers | ~15 (Candidatos 01-03) |
| evidence_uploads | 8 |
| reviews | 4 |

---

## 4. Consultas de validación clave

### 4.1 Verificar candidato con flujo completo (para EV-5B-02/03)
```sql
SELECT p.name, p.email,
       app.id AS app_id, app.status AS app_status,
       t.id AS attempt_id, t.status, t.theory_score, t.decision,
       rev.decision AS review_decision
FROM public.profiles p
JOIN public.applications app ON app.user_id = p.user_id
JOIN public.vacancies v ON v.id = app.vacancy_id
LEFT JOIN public.attempts t ON t.application_id = app.id
LEFT JOIN public.reviews rev ON rev.attempt_id = t.id
WHERE v.id != 'f1000000-0000-0000-0000-000000000001'
  AND t.status = 'completed'
ORDER BY p.name;
```

### 4.2 Verificar psicométrico completado
```sql
SELECT p.name, t.status, t.psychometric_summary->>'profile' AS perfil
FROM public.attempts t
JOIN public.applications app ON app.id = t.application_id
JOIN public.profiles p ON p.user_id = app.user_id
WHERE app.vacancy_id = 'f1000000-0000-0000-0000-000000000001'
  AND t.status = 'completed';
```

### 4.3 Verificar ausencia de huérfanos
```sql
SELECT 'attempt_sin_app' AS tipo, COUNT(*)
FROM public.attempts t
WHERE NOT EXISTS (SELECT 1 FROM public.applications a WHERE a.id = t.application_id)
UNION ALL
SELECT 'answer_sin_attempt', COUNT(*)
FROM public.answers ans
WHERE NOT EXISTS (SELECT 1 FROM public.attempts t WHERE t.id = ans.attempt_id);
-- Ambos deben devolver 0
```

### 4.4 Verificar columna `comments` en reviews (INC-6B-02)
```sql
SELECT column_name FROM information_schema.columns
WHERE table_name = 'reviews' AND table_schema = 'public'
ORDER BY ordinal_position;
-- Debe incluir: id, attempt_id, reviewer_id, rubric, decision, comments, created_at
-- NO debe incluir: notes, updated_at
```

---

## 5. Prueba de acceso a la aplicación con usuarios demo

### 5.1 Credenciales de prueba (contraseña uniforme: `DemoUCES2026!`)

| Rol | Email | Descripción |
|-----|-------|-------------|
| Admin | admin-demo@uces-demo.test | Panel admin completo |
| Candidato completado | candidato-demo-01@uces-demo.test | EV-5B-02/03: candidato con decisión |
| Candidato bajo revisión | candidato-demo-03@uces-demo.test | Intento en under_review |

### 5.2 Ruta admin detalle (para EV-5B-02)
- Login con admin-demo@uces-demo.test
- Ir a `/admin`
- Seleccionar Candidato Demo 01
- URL: `/admin/attempts/<attempt_id>`

### 5.3 URL de la demo (configurar en `.env.local` o `.env.demo.local`)
```
NEXT_PUBLIC_SUPABASE_URL=https://<ref-demo>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
CURP_HMAC_SECRET=DEMO_CURP_KEY_2026
```

---

## 6. Capturas de Supabase Studio (CAP-SB-01..04)

| ID | URL en Studio | Descripción | Archivo sugerido |
|----|---------------|-------------|------------------|
| CAP-SB-01 | /project/\<ref\>/editor → Table Editor → applications | Vista de postulaciones con estados | ev-sb-01-applications.png |
| CAP-SB-02 | /project/\<ref\>/database/schemas | Visualizador del esquema relacional | ev-sb-02-schema.png |
| CAP-SB-03 | /project/\<ref\>/auth/users | Lista de usuarios demo creados | ev-sb-03-auth-users.png |
| CAP-SB-04 | /project/\<ref\>/storage/buckets/evidences | Bucket de evidencias privado | ev-sb-04-storage.png |

**Guardar en:** `docs/titulacion/evidencias/08c/supabase-studio/`

---

## 7. Limpieza post-capturas

Ejecutar `supabase/demo/05-limpieza-demo.sql` en el SQL Editor del proyecto DEMO para eliminar todos los registros con prefijos `d...`, `da...`, `dt...`, `dv...`.

Para eliminar usuarios auth: Dashboard → Authentication → Users → seleccionar y eliminar los 12 usuarios demo.
