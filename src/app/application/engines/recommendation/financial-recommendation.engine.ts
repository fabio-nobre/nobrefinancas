import { FinancialContext } from '../../types/financial.types';

interface RecommendationInput {
  context: FinancialContext;
  insights: any;
  risco: any;
  score: any;
}

export interface RecommendationResult {
  recomendacoes: string[];
}

export class FinancialRecommendationEngine {

  process(input: RecommendationInput): RecommendationResult {

    const recomendacoes: string[] = [];

    if (input.risco.risco > 0.7) {
      recomendacoes.push('Reduzir despesas');
    }

    if (input.score.score < 50) {
      recomendacoes.push('Aumentar receita');
    }

    return { recomendacoes };
  }
}