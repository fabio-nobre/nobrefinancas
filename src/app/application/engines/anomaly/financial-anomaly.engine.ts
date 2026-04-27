import { FinancialContext } from '../../types/financial.types';

export interface AnomalyResult {
  temAnomalia: boolean;
}

export class FinancialAnomalyEngine {

  process(context: FinancialContext): AnomalyResult {

    const temAnomalia = context.despesas > context.receitas * 1.5;

    return { temAnomalia };
  }
}