import { FinancialContext, ForecastResult } from '../../types/financial.types';

export class FinancialForecastEngine {

  process(context: FinancialContext): ForecastResult {

    const saldo = context.receitas - context.despesas;

    return {
      saldoPrevisto: saldo,
      receitasRestantes: context.receitas,
      despesasRestantes: context.despesas
    };
  }
}