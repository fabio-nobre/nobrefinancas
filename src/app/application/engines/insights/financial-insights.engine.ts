import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { InsightFinanceiro }
  from '../../models/insights/insight.model'

export class FinancialInsightsEngine {

  static gerarInsights(
    analytics: FinancialAnalyticsResult
  ): InsightFinanceiro[] {

    const insights: InsightFinanceiro[] = []

    const totalReceitas = analytics.resumo.receitas
    const totalDespesas = analytics.resumo.despesas

    // saldo positivo
    if (totalReceitas > totalDespesas) {

      insights.push({
        tipo: 'positive',
        mensagem: 'Seu saldo está positivo neste período'
      })

    }

    // alerta de gastos maiores que receitas
    if (totalDespesas > totalReceitas) {

      insights.push({
        tipo: 'warning',
        mensagem: 'Suas despesas estão maiores que suas receitas'
      })

    }

    // maior categoria
    const maiorCategoria = analytics.maiorCategoria

    if (maiorCategoria && totalDespesas > 0) {

      const percentual = (
        (maiorCategoria.valor / totalDespesas) * 100
      ).toFixed(0)

      insights.push({
        tipo: 'info',
        mensagem: `${maiorCategoria.categoria} representa ${percentual}% dos seus gastos`
      })

    }

    return insights

  }

}