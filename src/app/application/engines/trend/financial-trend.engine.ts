import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

export interface FinancialTrend {

  despesasCrescendo: boolean
  receitasCrescendo: boolean
  saldoCrescendo: boolean

}

export class FinancialTrendEngine {

  static analisar(
    analytics: FinancialAnalyticsResult
  ): FinancialTrend {

    const evolucao = analytics.evolucaoMensal

    if (evolucao.length < 2) {

      return {
        despesasCrescendo: false,
        receitasCrescendo: false,
        saldoCrescendo: false
      }

    }

    const atual = evolucao[evolucao.length - 1]
    const anterior = evolucao[evolucao.length - 2]

    return {

      despesasCrescendo:
        atual.despesas > anterior.despesas,

      receitasCrescendo:
        atual.receitas > anterior.receitas,

      saldoCrescendo:
        atual.saldo > anterior.saldo

    }

  }

}