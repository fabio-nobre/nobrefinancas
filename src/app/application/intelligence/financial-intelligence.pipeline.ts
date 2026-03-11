import { Lancamento } from '@/app/domain/financeiro'

import { FinanceAnalyticsEngine }
  from '../engines/analytics/finance-analytics.engine'

import { FinancialScoreEngine }
  from '../engines/score/financial-score.engine'

import { FinancialInsightsEngine }
  from '../engines/insights/financial-insights.engine'

import { FinancialTrendEngine }
  from '../engines/trend/financial-trend.engine'

import { FinancialRiskEngine }
  from '../engines/risk/financial-risk.engine'

import { FinancialProjectionEngine }
  from '../engines/projection/financial-projection.engine'

import { FinancialIntelligenceContext }
  from './financial-intelligence.context'
import { FinancialPatternEngine } from '../engines/pattern/financial-pattern.engine'
import { FinancialAnomalyEngine } from '../engines/anomaly/financial-anomaly.engine'
import { FinancialRecommendationEngine } from '../engines/recommendation/financial-recommendation.engine'

export class FinancialIntelligencePipeline {

  static processar(
    lancamentos: Lancamento[]
  ): FinancialIntelligenceContext {

    // etapa 1
    const analytics =
      FinanceAnalyticsEngine.calcular(lancamentos)

    // etapa 2
    const score =
      FinancialScoreEngine.calcular(analytics)

    // etapa 3
    const insights =
      FinancialInsightsEngine.gerarInsights(analytics)

    // etapa 4
    const trend =
      FinancialTrendEngine.analisar(analytics)

    // etapa 5
    const risk =
      FinancialRiskEngine.analisar(analytics)

    // etapa 6
    const projection =
      FinancialProjectionEngine.calcular(analytics)

    const pattern =
      FinancialPatternEngine.analisar(analytics)

    const anomaly =
      FinancialAnomalyEngine.analisar(analytics)

    const recommendation =
      FinancialRecommendationEngine.gerar(
        analytics,
        pattern,
        anomaly
      )

    return {

      analytics,
      score,
      insights,
      trend,
      risk,
      projection,
      pattern,
      anomaly,
      recommendation

    }

  }

}