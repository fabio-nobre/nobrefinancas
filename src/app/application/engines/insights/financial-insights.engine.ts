import { FinancialContext } from '../../types/financial.types';

interface InsightsInput {
  context: FinancialContext;
  forecast: any;
  risco: any;
  score: any;
  anomalias: any;
  budget: any;
}

export interface InsightsResult {
  mensagem: string;
}

export class FinancialInsightsEngine {

  process(input: InsightsInput): InsightsResult {

    const { risco, score } = input;

    let mensagem = 'Situação estável';

    if (risco.risco > 0.7) {
      mensagem = 'Alto risco financeiro';
    }

    if (score.score < 50) {
      mensagem = 'Score financeiro baixo';
    }

    return { mensagem };
  }
}