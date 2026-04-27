import { FinancialContext } from '../../types/financial.types';

interface ScoreInput {
  context: FinancialContext;
  risco: any;
}

export interface ScoreResult {
  score: number;
}

export class FinancialScoreEngine {

  process(input: {
    receitas: number;
    despesas: number;
    risco: any;
  }): ScoreResult {

    const score = 100 - (input.risco.risco * 100);

    return { score };
  }
}