-- Seed idempotente de psicométrico base (Cultura Capital + Mini Big Five)
do $$
declare
  psicometrico_vacancy_id constant uuid := 'f1000000-0000-0000-0000-000000000001';
  psicometrico_assessment_id constant uuid := 'f2000000-0000-0000-0000-000000000001';
begin
  -- Vacante interna/oculta para anclar el assessment psicométrico.
  insert into public.vacancies (
    id,
    module_id,
    title,
    schedule,
    location,
    description,
    requirements,
    status
  )
  values (
    psicometrico_vacancy_id,
    null,
    '[INTERNAL] Psicométrico base',
    'N/A',
    'N/A',
    'Registro técnico interno para anclar assessment psicométrico.',
    'No aplica',
    'draft'
  )
  on conflict (id) do update set
    module_id = excluded.module_id,
    title = excluded.title,
    schedule = excluded.schedule,
    location = excluded.location,
    description = excluded.description,
    requirements = excluded.requirements,
    status = excluded.status;

  insert into public.assessments (id, vacancy_id, title, duration_minutes)
  values (
    psicometrico_assessment_id,
    psicometrico_vacancy_id,
    'Psicométrico base (Cultura Capital + Mini Big Five)',
    10
  )
  on conflict (id) do update set
    vacancy_id = excluded.vacancy_id,
    title = excluded.title,
    duration_minutes = excluded.duration_minutes;

  -- Reemplazo completo para mantener exactamente 37 preguntas sin duplicar.
  delete from public.questions where assessment_id = psicometrico_assessment_id;

  insert into public.questions (assessment_id, prompt, options, correct_option)
  values
    -- A) CULTURA CAPITAL — Likert (15)
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Actúo con honestidad incluso cuando nadie me supervisa.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Procuro comprender las emociones de los demás antes de emitir un juicio.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Respeto opiniones diferentes a la mía aunque no esté de acuerdo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Expreso agradecimiento cuando alguien me apoya.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Cumplo mis compromisos aunque implique esfuerzo adicional.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Ante situaciones difíciles mantengo una actitud constructiva.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Cuando algo falla, busco soluciones antes que culpables.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Me motiva ayudar a otros a alcanzar sus metas.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Busco constantemente mejorar los procesos en los que participo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Me adapto con facilidad a cambios inesperados.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Creo que los grandes resultados se logran en equipo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Prefiero colaborar antes que competir con mis compañeros.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Genero confianza a través de mi conducta y cumplimiento.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Me motiva saber que mi trabajo puede impactar positivamente en la vida de otros.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | Considero importante contribuir a construir un entorno más amable.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),

    -- B) CULTURA CAPITAL — Casos (2)
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | ¿Cómo reaccionarias?', '{"a":"Me molesto porque considero que no es cierto.","b":"Lo ignoro, no me interesa su opinión.","c":"Escucho su punto de vista, reflexiono y le pregunto en qué puedo mejorar.","d":"Le respondo que él también tiene defectos."}', null),
    (psicometrico_assessment_id, 'CULTURA_CAPITAL | ¿Qué haces?', '{"a":"Señalo al responsable para deslindarme.","b":"Me mantengo en silencio para no involucrarme.","c":"Propongo asumirlo como equipo y enfocarnos en la solución.","d":"Espero a que alguien más hable primero."}', null),

    -- C) MINI BIG FIVE — Likert (20)
    -- Estabilidad emocional
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Mantengo la calma cuando trabajo bajo presión.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Manejo bien las críticas sin tomarlas de manera personal.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Cuando algo sale mal, me recupero rápidamente', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Difícilmente reacciono de forma impulsiva ante un problema', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),

    -- Amabilidad
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | AMABILIDAD | Prefiero colaborar antes que competir con mis compañeros.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | AMABILIDAD | Procuro comprender el punto de vista de otros antes de responder.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | AMABILIDAD | Evito generar conflictos innecesarios.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | AMABILIDAD | Me considero una persona accesible y fácil de tratar.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),

    -- Responsabilidad
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | RESPONSABILIDAD | Cumplo mis tareas incluso cuando requieren esfuerzo adicional.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | RESPONSABILIDAD | Organizo mi trabajo para cumplir en tiempo y forma.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | RESPONSABILIDAD | Soy constante en lo que me comprometo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | RESPONSABILIDAD | Me hago responsable de mis errores cuando ocurren.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),

    -- Apertura
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | APERTURA | Me gusta proponer mejoras en los procesos.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | APERTURA | Estoy dispuesto(a) a adaptarme a nuevas formas de trabajo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | APERTURA | Busco aprender constantemente.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | APERTURA | Considero que siempre hay algo que mejorar.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),

    -- Extroversión
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | EXTROVERSION | Me siento cómodo(a) interactuando con diferentes personas.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | EXTROVERSION | Participo activamente en dinámicas de equipo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | EXTROVERSION | Expreso mis ideas de manera clara.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | EXTROVERSION | Me integro fácilmente a nuevos grupos de trabajo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null);
end $$;
