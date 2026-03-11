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

      const percentual =
        (maiorCategoria.valor / totalDespesas) * 100

      if (percentual > 30) {

        insights.push({
          tipo: 'info',
          mensagem:
            `${maiorCategoria.categoria} representa ${percentual.toFixed(0)}% dos seus gastos`
        })

      }

    }

    const comparacao = analytics.comparacaoMensal

    if (comparacao) {

      const variacao = comparacao.variacaoDespesas

      if (Math.abs(variacao) > 10) {

        insights.push({
          tipo: variacao > 0 ? 'warning' : 'positive',
          mensagem:
            variacao > 0
              ? `Suas despesas aumentaram ${variacao.toFixed(0)}% em relação ao mês anterior`
              : `Suas despesas reduziram ${Math.abs(variacao).toFixed(0)}% em relação ao mês anterior`
        })

      }

    }

    const taxaPoupanca =
      totalReceitas > 0
        ? (totalReceitas - totalDespesas) / totalReceitas
        : 0

    if (taxaPoupanca > 0.2) {

      insights.push({
        tipo: 'positive',
        mensagem:
          `Você está poupando ${(taxaPoupanca * 100).toFixed(0)}% da sua renda`
      })

    }

    if (taxaPoupanca < 0) {

      insights.push({
        tipo: 'warning',
        mensagem:
          'Você está gastando mais do que ganha'
      })

    }

    const variacoes =
      analytics.evolucaoMensal.map(m =>
        Math.abs(m.receitas - m.despesas)
      )

    const mediaVariacao =
      variacoes.reduce((a, b) => a + b, 0) /
      (variacoes.length || 1)

    if (mediaVariacao < 500) {

      insights.push({
        tipo: 'positive',
        mensagem:
          'Seu fluxo financeiro mensal está estável'
      })

    }

    return insights

  }

}