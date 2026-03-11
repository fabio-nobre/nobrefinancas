import { FinancialAnalyticsResult } from "@/app/application/models/analytics/financial-analytics-result.model"

export interface FinancialRisk {

  saldoNegativo: boolean
  despesasAltas: boolean

}

export class FinancialRiskEngine {

  static analisar(
    analytics: FinancialAnalyticsResult
  ): FinancialRisk {

    const receitas = analytics.resumo.receitas
    const despesas = analytics.resumo.despesas

    return {

      saldoNegativo:
        despesas > receitas,

      despesasAltas:
        receitas > 0 &&
        despesas / receitas > 0.8

    }

  }

}