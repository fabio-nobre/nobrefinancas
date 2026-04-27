import { FinancialContext, ForecastResult } from '../../types/financial.types';

interface RiskInput {
  context: FinancialContext;
  forecast: ForecastResult;
}

export interface RiskResult {
  risco: number;
}

export class FinancialRiskEngine {

  process(input: RiskInput): RiskResult {

    const { context, forecast } = input;

    const risco = context.despesas > forecast.saldoPrevisto ? 0.9 : 0.1;

    return { risco };
  }
}