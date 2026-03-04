export type PsicometricoSummary = {
  cultureCapital: {
    score: number;
    min: number;
    max: number;
    classification: string;
    answered: number;
  };
  miniBigFive: {
    estabilidadEmocional: TraitResult;
    amabilidad: TraitResult;
    responsabilidad: TraitResult;
    apertura: TraitResult;
    extroversion: TraitResult;
  };
  totals: {
    likertAnswered: number;
    likertQuestions: number;
  };
};

type TraitResult = {
  score: number;
  min: number;
  max: number;
  classification: string;
  answered: number;
};

type QuestionWithAnswer = {
  prompt: string;
  selected_option: string | null;
};

const classifyCultureCapital = (score: number) => {
  if (score <= 40) return "Bajo ajuste cultural";
  if (score <= 55) return "Ajuste medio";
  if (score <= 65) return "Buen ajuste";
  return "Alta alineación";
};

const classifyTrait = (score: number, high: string, mid: string, low: string) => {
  if (score >= 16) return high;
  if (score >= 11) return mid;
  return low;
};

const buildTraitResult = (
  score: number,
  answered: number,
  labels: { high: string; mid: string; low: string },
  withFilter = true
): TraitResult => ({
  score,
  min: 4,
  max: 20,
  classification: withFilter ? classifyTrait(score, labels.high, labels.mid, labels.low) : "Indicador sin filtro",
  answered,
});

const parseLikertValue = (value: string | null) => {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1 || parsed > 5) return null;
  return parsed;
};

export const calculatePsicometricoSummary = (questionsWithAnswers: QuestionWithAnswer[]): PsicometricoSummary => {
  let cultureCapitalScore = 0;
  let cultureCapitalAnswered = 0;

  const traitScores: Record<"ESTABILIDAD_EMOCIONAL" | "AMABILIDAD" | "RESPONSABILIDAD" | "APERTURA" | "EXTROVERSION", number> = {
    ESTABILIDAD_EMOCIONAL: 0,
    AMABILIDAD: 0,
    RESPONSABILIDAD: 0,
    APERTURA: 0,
    EXTROVERSION: 0,
  };

  const traitAnswered: Record<keyof typeof traitScores, number> = {
    ESTABILIDAD_EMOCIONAL: 0,
    AMABILIDAD: 0,
    RESPONSABILIDAD: 0,
    APERTURA: 0,
    EXTROVERSION: 0,
  };

  questionsWithAnswers.forEach(({ prompt, selected_option }) => {
    const likertValue = parseLikertValue(selected_option);
    if (!likertValue) return;

    const segments = prompt.split("|").map((segment) => segment.trim());

    if (segments[0] === "CULTURA_CAPITAL" && segments.length === 2) {
      cultureCapitalScore += likertValue;
      cultureCapitalAnswered += 1;
      return;
    }

    if (segments[0] === "MINI_BIG_FIVE" && segments.length >= 3) {
      const traitKey = segments[1] as keyof typeof traitScores;
      if (traitKey in traitScores) {
        traitScores[traitKey] += likertValue;
        traitAnswered[traitKey] += 1;
      }
    }
  });

  return {
    cultureCapital: {
      score: cultureCapitalScore,
      min: 15,
      max: 75,
      classification: classifyCultureCapital(cultureCapitalScore),
      answered: cultureCapitalAnswered,
    },
    miniBigFive: {
      estabilidadEmocional: buildTraitResult(traitScores.ESTABILIDAD_EMOCIONAL, traitAnswered.ESTABILIDAD_EMOCIONAL, {
        high: "Alta",
        mid: "Adecuada",
        low: "Riesgo reactividad",
      }),
      amabilidad: buildTraitResult(traitScores.AMABILIDAD, traitAnswered.AMABILIDAD, {
        high: "Cooperativo",
        mid: "Funcional",
        low: "Riesgo conflicto",
      }),
      responsabilidad: buildTraitResult(traitScores.RESPONSABILIDAD, traitAnswered.RESPONSABILIDAD, {
        high: "Alto compromiso",
        mid: "Aceptable",
        low: "Riesgo incumplimiento",
      }),
      apertura: buildTraitResult(traitScores.APERTURA, traitAnswered.APERTURA, {
        high: "Innovador/adaptable",
        mid: "Moderado",
        low: "Rigidez",
      }),
      extroversion: buildTraitResult(
        traitScores.EXTROVERSION,
        traitAnswered.EXTROVERSION,
        {
          high: "",
          mid: "",
          low: "",
        },
        false
      ),
    },
    totals: {
      likertAnswered:
        cultureCapitalAnswered +
        traitAnswered.ESTABILIDAD_EMOCIONAL +
        traitAnswered.AMABILIDAD +
        traitAnswered.RESPONSABILIDAD +
        traitAnswered.APERTURA +
        traitAnswered.EXTROVERSION,
      likertQuestions: 35,
    },
  };
};
