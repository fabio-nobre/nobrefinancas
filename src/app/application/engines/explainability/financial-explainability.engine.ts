import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialScore }
  from '../../models/score/financial-score.model'

import { FinancialTrend }
  from '../trend/financial-trend.engine'

import { FinancialAnomaly }
  from '../../models/anomaly/financial-anomaly.model'

import { FinancialExplanation }
  from '../../models/explainability/financial-explanation.model'

export class FinancialExplainabilityEngine {

  static explicar(

    analytics: FinancialAnalyticsResult,
    score: FinancialScore,
    trend: FinancialTrend,
    anomaly: FinancialAnomaly

  ): FinancialExplanation[] {

    const explicacoes: FinancialExplanation[] = []

    const receitas = analytics.resumo.receitas
    const despesas = analytics.resumo.despesas

    // explicação de score
    if (score.score < 50) {

      explicacoes.push({

        tipo: 'score',

        titulo: 'Score financeiro baixo',

        mensagem:
          'Seu score está baixo porque suas despesas estão próximas ou acima da sua renda.'

      })

    }

    if (score.score > 70) {

      explicacoes.push({

        tipo: 'score',

        titulo: 'Bom controle financeiro',

        mensagem:
          'Seu score está alto devido ao bom equilíbrio entre renda e despesas.'

      })

    }

    // explicação de tendência
    if (trend.despesasCrescendo) {

      explicacoes.push({

        tipo: 'tendencia',

        titulo: 'Crescimento de despesas',

        mensagem:
          'Suas despesas estão aumentando em comparação ao período anterior.'

      })

    }

    if (trend.saldoCrescendo) {

      explicacoes.push({

        tipo: 'tendencia',

        titulo: 'Melhoria no saldo',

        mensagem:
          'Seu saldo mensal está melhorando, indicando maior capacidade de poupança.'

      })

    }

    // explicação de anomalias
    if (anomaly.valoresIncomuns.length > 0) {

      explicacoes.push({

        tipo: 'alerta',

        titulo: 'Transação incomum',

        mensagem:
          'Detectamos uma transação com valor significativamente acima do padrão.'

      })

    }

    return explicacoes

  }

}