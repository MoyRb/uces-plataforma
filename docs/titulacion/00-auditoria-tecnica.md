# Auditoría Técnica — UCES Plataforma

**Proyecto:** UCES Plataforma de Talento (MVP)
**Repositorio:** github.com/MoyRb/uces-plataforma
**Fecha de auditoría:** 2026-10-20
**Rama auditada:** main (commit HEAD: 5ca40d2)

---

## 1. Stack tecnológico verificado

| Tecnología | Versión verificada | Archivo de evidencia |
|---|---|---|
| Next.js | 16.1.1 | `my-app/package.json` |
| React | 19.2.3 | `my-app/package.json` |
| React DOM | 19.2.3 | `my-app/package.json` |
| TypeScript | ^5 | `my-app/package.json` |
| Tailwind CSS | ^4 | `my-app/package.json` |
| @supabase/supabase-js | ^2.89.0 | `my-app/package.json` |
| @radix-ui/react-slot | ^1.2.4 | `my-app/package.json` |
| @tanstack/react-table | ^8.21.3 | `my-app/package.json` |
| lucide-react | ^0.562.0 | `my-app/package.json` |
| class-variance-authority | ^0.7.1 | `my-app/package.json` |
| clsx | ^2.1.1 | `my-app/package.json` |
| tailwind-merge | ^3.4.0 | `my-app/package.json` |
| zod | ^4.2.1 | `my-app/package.json` |
| Node.js types | ^20 | `my-app/package.json` |
| Supabase (BaaS) | Proyecto: UcesCap | `supabase/.temp/linked-project.json` |
| PostgreSQL | vía Supabase | `supabase/.temp/postgres-version` |

**Observación:** Se utiliza el router de Next.js App Router (no Pages Router), confirmado por la estructura bajo `my-app/app/`.

**Turbopack:** Activado con `root: __dirname` en `next.config.ts`. No afecta la lógica de la aplicación.

---

## 2. Estructura de directorios relevante

```
my-app/
├── app/
│   ├── page.tsx                        (landing pública)
│   ├── layout.tsx                      (layout raíz)
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── panel/page.tsx
│   ├── perfil/page.tsx
│   ├── psicometrico/page.tsx
│   ├── modulos/[moduleId]/page.tsx
│   ├── vacantes/[id]/page.tsx
│   ├── vacantes/[id]/postular.tsx
│   ├── evaluacion/[attemptId]/page.tsx
│   ├── evaluacion/[attemptId]/cliente.tsx
│   ├── evaluacion/[attemptId]/utils.ts
│   ├── resultado/[attemptId]/page.tsx
│   ├── admin/page.tsx
│   ├── admin/attempts/[id]/page.tsx
│   └── api/
│       ├── auth/register/route.ts
│       ├── vacancies/[id]/apply/route.ts
│       ├── attempts/[attemptId]/answers/route.ts
│       ├── attempts/[attemptId]/submit/route.ts
│       ├── psicometrico/start/route.ts
│       └── admin/
│           ├── utils.ts
│           ├── modules/route.ts
│           ├── modules/[id]/route.ts
│           ├── vacancies/route.ts
│           ├── vacancies/[id]/route.ts
│           ├── vacancies/[id]/assessment/route.ts
│           ├── vacancies/[id]/stats/route.ts
│           ├── assessments/route.ts
│           ├── assessments/[id]/route.ts
│           ├── assessments/[id]/questions/route.ts
│           ├── questions/[id]/route.ts
│           ├── attempts/route.ts
│           ├── attempts/[id]/route.ts
│           └── attempts/[id]/detail/route.ts
├── lib/
│   ├── supabaseClient.ts               (cliente browser singleton)
│   ├── supabaseServer.ts               (cliente server role)
│   ├── auth.ts                         (getRoleForSession via RPC)
│   ├── curp.ts                         (HMAC-SHA256 para CURP)
│   ├── psicometrico.ts                 (lógica de intentos psicométricos)
│   ├── psicometricoResults.ts          (algoritmo Mini Big Five)
│   ├── reviewDecision.ts               (tipo ReviewDecision)
│   ├── assessmentConstants.ts          (UUID fijo del psicométrico)
│   ├── format.ts                       (formatBytes)
│   └── utils.ts                        (cn helper de Tailwind)
supabase/
├── schema.sql                          (definición de tablas base)
├── roles.sql                           (tabla user_roles + función get_my_role)
├── rls.sql                             (políticas RLS + storage bucket)
├── seed.sql                            (datos de prueba + seed psicométrico)
├── seed_psicometrico_base.sql          (seed autónomo del Mini Big Five)
├── migration_attempts_decision_columns.sql
├── migration_attempts_psychometric_summary.sql
└── migrations/
    └── 20260509_fix_admin_roles.sql
```

---

## 3. Modelo de datos

### 3.1 Tablas definidas en schema.sql

| Tabla | Llave primaria | Relaciones clave | Propósito |
|---|---|---|---|
| `profiles` | user_id (uuid, FK → auth.users) | — | Perfil del usuario registrado |
| `user_roles` | user_id (uuid, FK → auth.users) | — | Roles operativos (user/admin) |
| `modules` | id (uuid) | — | Agrupador de vacantes por área |
| `vacancies` | id (uuid) | module_id → modules | Convocatoria de reclutamiento |
| `assessments` | id (uuid) | vacancy_id → vacancies | Evaluación ligada a vacante |
| `questions` | id (uuid) | assessment_id → assessments | Pregunta de opción múltiple o Likert |
| `practical_tasks` | id (uuid) | assessment_id → assessments | Tarea práctica con entrega esperada |
| `applications` | id (uuid) | user_id → profiles, vacancy_id → vacancies | Postulación de usuario a vacante |
| `attempts` | id (uuid) | application_id → applications, assessment_id → assessments | Intento de evaluación |
| `answers` | id (uuid) | attempt_id → attempts, question_id → questions | Respuesta individual |
| `evidence_uploads` | id (uuid) | attempt_id → attempts | Archivo de evidencia práctica |
| `reviews` | id (uuid) | attempt_id → attempts, reviewer_id → profiles | Revisión manual por administrador |
| `curp_hashes` | (user_id, curp_hash) | user_id → profiles | Hash HMAC de CURP para unicidad |

### 3.2 Columnas añadidas por migración (no en schema.sql original)

| Tabla | Columna | Tipo | Archivo |
|---|---|---|---|
| `attempts` | `psychometric_summary` | jsonb | `migration_attempts_psychometric_summary.sql` |
| `attempts` | `decision` | text CHECK (APPROVED/REJECTED) | `migration_attempts_decision_columns.sql` |
| `attempts` | `reviewer_notes` | text | `migration_attempts_decision_columns.sql` |

### 3.3 Tipo de datos relevante: psychometric_summary (jsonb)

Estructura inferida desde `lib/psicometricoResults.ts`:

```json
{
  "miniBigFive": {
    "estabilidadEmocional": { "score": 0-20, "min": 4, "max": 20, "classification": "...", "answered": 0-4 },
    "amabilidad": { ... },
    "responsabilidad": { ... },
    "apertura": { ... },
    "extroversion": { ... }
  },
  "totals": { "likertAnswered": 0-20, "likertQuestions": 20 },
  "submitMeta": { "timedOutBeforeSubmit": false }
}
```

---

## 4. Seguridad verificada

### 4.1 Row Level Security (RLS)

Todas las tablas relevantes tienen RLS habilitado (`alter table ... enable row level security`), verificado en `supabase/rls.sql`.

**Patrón de políticas:**
- **Lectura propia:** El usuario solo accede a registros donde `user_id = auth.uid()` o a través de join con `applications`.
- **Gestión admin:** Todas las operaciones de escritura admin dependen de `public.get_my_role() = 'admin'`.
- **Lectura pública autenticada:** `modules`, `vacancies`, `assessments`, `questions`, `practical_tasks` son legibles por cualquier usuario autenticado.

### 4.2 Función get_my_role()

- Declarada con `security definer` — se ejecuta con los permisos del propietario, no del invocante.
- Primero consulta `user_roles`; si no encuentra resultado, hace fallback a `profiles.role`.
- `revoke all on function ... from public` + `grant execute ... to authenticated, service_role`.
- Archivos: `supabase/roles.sql`, `supabase/rls.sql`, `supabase/migrations/20260509_fix_admin_roles.sql`.

### 4.3 CURP con HMAC-SHA256

- `lib/curp.ts`: `crypto.createHmac("sha256", secret).update(normalizeCurp(curp)).digest("hex")`
- El secreto se lee de la variable de entorno `CURP_HASH_SECRET`.
- Solo se almacena el hash; la CURP en texto claro no persiste en la base de datos.
- Restricción `UNIQUE` en `curp_hashes.curp_hash` garantiza un registro por CURP.

### 4.4 Autenticación en APIs

**APIs del candidato** (`/api/vacancies/[id]/apply`, `/api/attempts/*/submit`, `/api/psicometrico/start`):
- Extraen el token del header `Authorization: Bearer <token>`.
- Verifican con `supabase.auth.getUser(token)`.

**APIs de administrador** (`/api/admin/**`):
- Pasan por `requireAdmin()` en `app/api/admin/utils.ts`.
- `requireAdmin` verifica el JWT y luego construye un cliente Supabase con el token del usuario para invocar `get_my_role()` vía RPC, garantizando que el rol se evalúa con el contexto del usuario autenticado (no con service_role).

### 4.5 Storage

- Bucket `evidences` es **privado** (`public: false`).
- URL firmadas (signed URLs) generadas en el servidor con `supabase.storage.from("evidences").createSignedUrl(path, 3600)`.
- Políticas de storage: solo el propietario puede subir (`owner = auth.uid()`); lectura para el propietario o admin.

---

## 5. Flujo de datos principal verificado

```
Registro (/register)
  → POST /api/auth/register
    → validar CURP (regex + HMAC)
    → crear usuario en Supabase Auth
    → insertar profiles
    → insertar curp_hashes
    → insertar user_roles (role='user')

Psicométrico (/psicometrico)
  → POST /api/psicometrico/start
    → verificar sesión
    → ensurePsicometricoAttempt():
        buscar attempt existente del assessment f2000000-...
        si no existe: crear application (vacancy interna) + attempt (10 min)
  → redirige a /evaluacion/[attemptId]
    → EvaluationClient (cliente):
        guardar respuestas en tiempo real → POST /api/attempts/[id]/answers
        temporizador regresivo con auto-submit al expirar
    → POST /api/attempts/[id]/submit
        calcular psychometric_summary (Mini Big Five)
        actualizar attempts: theory_score, submitted_at, status='UNDER_REVIEW', psychometric_summary

Postulación a vacante
  → POST /api/vacancies/[id]/apply
    → verificar psicométrico completado
    → verificar vacante abierta
    → verificar evaluación configurada
    → crear/recuperar application + attempt (timer según duration_minutes)
  → redirige a /evaluacion/[attemptId] (mismo componente)

Revisión admin (/admin → /admin/attempts/[id])
  → GET /api/admin/attempts/[id]/detail
    → retorna attempt + answers + evidence + psychometric_summary (signed URLs)
  → PATCH /api/admin/attempts/[id]
    → actualizar status, decision, reviewer_notes
```

---

## 6. Componentes de UI verificados

El proyecto usa **shadcn/ui** con componentes personalizados almacenados en `my-app/components/`. Los componentes base identificados por importación en el código son:

- `Badge`, `Button`, `Card/CardContent/CardHeader/CardTitle/CardDescription` (usados en todas las páginas)
- El sistema de variantes de Badge incluye: `default`, `secondary`, `outline`, `info`, `success`, `warning`, `destructive` (verificado por uso en código).
- La hoja de estilos globales (`globals.css`) define clases utilitarias personalizadas: `uces-page`, `uces-container`, `uces-input`, `uces-label`, `uces-section-title`.

---

## 7. Datos de configuración de Supabase

| Dato | Valor |
|---|---|
| Proyecto | UcesCap |
| Referencia | uilqwyrslwrkeubaayoi |
| Organización | vvnolseuouziuhaxyqhj |
| Bucket de Storage | evidences (privado) |
| Función RPC pública | get_my_role() |

Variables de entorno requeridas (`.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CURP_HASH_SECRET`

---

## 8. Observaciones técnicas detectadas

1. **Columna `role` en `profiles` vs. tabla `user_roles`:** El schema original define `profiles.role` con check `('user','admin','reviewer')`. La evolución del sistema introdujo `user_roles` como tabla separada, relegando `profiles.role` a fallback. El rol `reviewer` aparece en el check de `profiles.role` pero no está implementado en `user_roles` ni en ninguna lógica de la aplicación.

2. **Tabla `reviews` parcialmente utilizada:** El schema define `reviews` con campos `rubric`, `decision`, `comments`. La lógica principal de decisión administrativa se migró a columnas directas en `attempts` (`decision`, `reviewer_notes`). La tabla `reviews` se usa únicamente como fallback en `/perfil/page.tsx` para intentos sin `decision` en `attempts`.

3. **`practical_tasks` sin CRUD en panel admin:** La tabla está definida y se usa en el seed y en el componente de evaluación (`EvaluationClient`), pero no existe endpoint ni formulario en `/admin` para crear o editar tareas prácticas. Solo son modificables a través de SQL directo en Supabase.

4. **Protección de rutas del lado del cliente:** No existe un archivo `middleware.ts` de Next.js para redireccionamiento en el servidor. La protección de rutas autenticadas se implementa con `useEffect` + `supabase.auth.getSession()` en cada página cliente. Esto implica que las rutas se cargan brevemente antes de redirigir.

5. **Estadísticas decorativas en landing page:** Las cifras 12 vacantes, 38 postulantes, 9 en revisión en `app/page.tsx` son valores estáticos en JSX, no datos dinámicos de la base de datos.

6. **Fallback de columna `psychometric_summary`:** El endpoint `submit/route.ts` maneja el caso donde la columna aún no existe en la base de datos: si falla por `column ... psychometric_summary`, almacena el resumen en la tabla `reviews` como fallback. Esto indica desarrollo incremental y soporte de retrocompatibilidad.

7. **UUID fijo para psicométrico:** El assessment psicométrico base tiene un UUID hardcoded: `f2000000-0000-0000-0000-000000000001`. Esto es una decisión de diseño intencional para permitir que el código lo referencie directamente sin queries adicionales.

8. **`extroversion` excluida de decisiones de contratación:** Documentado explícitamente en `lib/psicometricoResults.ts`: extroversión no activa el clasificador de alta/media/baja, solo genera un indicador informativo.
