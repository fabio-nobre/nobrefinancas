import { FinancialContext } from '../../types/financial.types';

export interface BudgetResult {
  saldo: number;
}

export class FinancialBudgetEngine {

  process(context: FinancialContext): BudgetResult {

    const saldo = context.receitas - context.despesas;

    return { saldo };
  }
}