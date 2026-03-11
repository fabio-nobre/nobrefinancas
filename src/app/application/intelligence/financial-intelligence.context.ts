import { FinancialAnalyticsResult }
  from '../models/analytics/financial-analytics-result.model'

import { FinancialScore }
  from '../models/score/financial-score.model'

import { InsightFinanceiro }
  from '../models/insights/insight.model'

import { FinancialTrend }
  from '../engines/trend/financial-trend.engine'

import { FinancialRisk }
  from '../engines/risk/financial-risk.engine'

import { FinancialProjection }
  from '../engines/projection/financial-projection.engine'

export interface FinancialIntelligenceContext {

  analytics: FinancialAnalyticsResult

  score: FinancialScore

  insights: InsightFinanceiro[]

  trend: FinancialTrend

  risk: FinancialRisk

  projection: FinancialProjection

}