import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

export interface FinancialProjection {

  saldoFimMes: number
  saldo3Meses: number

}

export class FinancialProjectionEngine {

  static calcular(
    analytics: FinancialAnalyticsResult
  ): FinancialProjection {

    const saldoAtual = analytics.resumo.saldo

    const mediaSaldoMensal =
      analytics.evolucaoMensal.reduce(
        (t, m) => t + m.saldo,
        0
      ) / (analytics.evolucaoMensal.length || 1)

    return {

      saldoFimMes:
        saldoAtual + mediaSaldoMensal,

      saldo3Meses:
        saldoAtual + mediaSaldoMensal * 3

    }

  }

}