import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialTrend }
  from '../trend/financial-trend.engine'

import { FinancialAnomaly }
  from '../../models/anomaly/financial-anomaly.model'

import { FinancialRecommendation }
  from '../../models/recommendation/financial-recommendation.model'

import { FinancialNarrative }
  from '../../models/narrative/financial-narrative.model'

export class FinancialNarrativeEngine {

  static gerar(

    analytics: FinancialAnalyticsResult,
    trend: FinancialTrend,
    anomaly: FinancialAnomaly,
    recommendation: FinancialRecommendation[]

  ): FinancialNarrative[] {

    const narrativas: FinancialNarrative[] = []

    const receitas = analytics.resumo.receitas
    const despesas = analytics.resumo.despesas

    // narrativa de crescimento de despesas
    if (trend.despesasCrescendo) {

      narrativas.push({

        tipo: 'alerta',

        titulo: 'Aumento de despesas',

        mensagem:
          'Suas despesas aumentaram em relação ao mês anterior. Vale revisar seus gastos recentes.'

      })

    }

    // narrativa de saldo positivo
    if (receitas > despesas) {

      const taxa =
        ((receitas - despesas) / receitas) * 100

      narrativas.push({

        tipo: 'explicacao',

        titulo: 'Boa saúde financeira',

        mensagem:
          `Você está economizando aproximadamente ${taxa.toFixed(0)}% da sua renda.`

      })

    }

    // narrativa de categoria dominante
    const maiorCategoria = analytics.maiorCategoria

    if (maiorCategoria && despesas > 0) {

      const percentual =
        (maiorCategoria.valor / despesas) * 100

      if (percentual > 30) {

        narrativas.push({

          tipo: 'explicacao',

          titulo: 'Categoria dominante',

          mensagem:
            `${maiorCategoria.categoria} representa ${percentual.toFixed(0)}% dos seus gastos.`

        })

      }

    }

    // narrativa de gastos anômalos
    if (anomaly.valoresIncomuns.length > 0) {

      narrativas.push({

        tipo: 'alerta',

        titulo: 'Gasto fora do padrão',

        mensagem:
          'Detectamos uma transação com valor acima do seu padrão normal.'

      })

    }

    // narrativa de recomendação
    if (recommendation.length > 0) {

      const r = recommendation[0]

      narrativas.push({

        tipo: 'oportunidade',

        titulo: 'Oportunidade de economia',

        mensagem: r.mensagem

      })

    }

    return narrativas

  }

}