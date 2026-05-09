-- Seed idempotente de psicométrico base (TEST MINI BIG FIVE)
do $$
declare
  psicometrico_vacancy_id constant uuid := 'f1000000-0000-0000-0000-000000000001';
  psicometrico_assessment_id constant uuid := 'f2000000-0000-0000-0000-000000000001';
begin
  insert into public.vacancies (
    id,module_id,title,schedule,location,description,requirements,status
  ) values (
    psicometrico_vacancy_id,null,'[INTERNAL] Psicométrico base','N/A','N/A','Registro técnico interno para anclar assessment psicométrico.','No aplica','draft'
  )
  on conflict (id) do update set
    module_id = excluded.module_id,title = excluded.title,schedule = excluded.schedule,location = excluded.location,description = excluded.description,requirements = excluded.requirements,status = excluded.status;

  insert into public.assessments (id, vacancy_id, title, duration_minutes)
  values (psicometrico_assessment_id, psicometrico_vacancy_id, 'TEST MINI BIG FIVE', 10)
  on conflict (id) do update set vacancy_id = excluded.vacancy_id, title = excluded.title, duration_minutes = excluded.duration_minutes;

  delete from public.questions where assessment_id = psicometrico_assessment_id;

  insert into public.questions (assessment_id, prompt, options, correct_option)
  values
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Mantengo la calma cuando trabajo bajo presión.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Manejo bien las críticas sin tomarlas de manera personal.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Cuando algo sale mal, me recupero rápidamente.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | ESTABILIDAD_EMOCIONAL | Difícilmente reacciono de forma impulsiva ante un problema.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | AMABILIDAD | Prefiero colaborar antes que competir con mis compañeros.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | AMABILIDAD | Procuro comprender el punto de vista de otros antes de responder.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | AMABILIDAD | Evito generar conflictos innecesarios.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | AMABILIDAD | Me considero una persona accesible y fácil de tratar.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | RESPONSABILIDAD | Cumplo mis tareas incluso cuando requieren esfuerzo adicional.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | RESPONSABILIDAD | Organizo mi trabajo para cumplir en tiempo y forma.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | RESPONSABILIDAD | Soy constante en lo que me comprometo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | RESPONSABILIDAD | Me hago responsable de mis errores cuando ocurren.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | APERTURA | Me gusta proponer mejoras en los procesos.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | APERTURA | Estoy dispuesto(a) a adaptarme a nuevas formas de trabajo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | APERTURA | Busco aprender constantemente.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | APERTURA | Considero que siempre hay algo que mejorar.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | EXTROVERSION | Me siento cómodo(a) interactuando con diferentes personas.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | EXTROVERSION | Participo activamente en dinámicas de equipo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | EXTROVERSION | Expreso mis ideas de manera clara.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null),
    (psicometrico_assessment_id, 'MINI_BIG_FIVE | EXTROVERSION | Me integro fácilmente a nuevos grupos de trabajo.', '{"1":"Totalmente en desacuerdo","2":"En desacuerdo","3":"Neutral","4":"De acuerdo","5":"Totalmente de acuerdo"}', null);
end $$;
