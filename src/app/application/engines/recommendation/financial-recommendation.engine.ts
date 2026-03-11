import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialRecommendation }
  from '../../models/recommendation/financial-recommendation.model'

import { FinancialPattern }
  from '../../models/pattern/financial-pattern.model'

import { FinancialAnomaly }
  from '../../models/anomaly/financial-anomaly.model'

export class FinancialRecommendationEngine {

  static gerar(

    analytics: FinancialAnalyticsResult,
    pattern: FinancialPattern,
    anomaly: FinancialAnomaly

  ): FinancialRecommendation[] {

    const recomendacoes: FinancialRecommendation[] = []

    const receitas = analytics.resumo.receitas
    const despesas = analytics.resumo.despesas

    const saldo = analytics.resumo.saldo

    // =============================
    // economia possível
    // =============================

    if (receitas > 0) {

      const taxaPoupanca = saldo / receitas

      if (taxaPoupanca < 0.15) {

        const economiaIdeal =
          receitas * 0.15 - saldo

        recomendacoes.push({

          tipo: 'economia',

          mensagem:
            `Você poderia economizar cerca de R$${economiaIdeal.toFixed(0)} por mês para atingir uma taxa de poupança saudável.`,

          impactoEstimado: economiaIdeal

        })

      }

    }

    // =============================
    // categoria dominante
    // =============================

    const maiorCategoria = analytics.maiorCategoria

    if (maiorCategoria && despesas > 0) {

      const percentual =
        maiorCategoria.valor / despesas

      if (percentual > 0.35) {

        const economia =
          maiorCategoria.valor * 0.15

        recomendacoes.push({

          tipo: 'otimizacao',

          mensagem:
            `Reduzir gastos em ${maiorCategoria.categoria} pode economizar cerca de R$${economia.toFixed(0)} por mês.`,

          impactoEstimado: economia

        })

      }

    }

    // =============================
    // despesas recorrentes
    // =============================

    for (const r of pattern.despesasRecorrentes) {

      if (r.valorMedio > 100) {

        recomendacoes.push({

          tipo: 'economia',

          mensagem:
            `Revisar ou cancelar ${r.descricao} pode economizar cerca de R$${r.valorMedio.toFixed(0)} por mês.`,

          impactoEstimado: r.valorMedio

        })

      }

    }

    // =============================
    // valores anômalos
    // =============================

    if (anomaly.valoresIncomuns.length > 0) {

      recomendacoes.push({

        tipo: 'alerta',

        mensagem:
          'Foram detectados gastos fora do padrão. Revise suas transações recentes.'

      })

    }

    return recomendacoes

  }

}