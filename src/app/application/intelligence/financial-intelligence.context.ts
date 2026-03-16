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

import { FinancialPattern }
  from '../models/pattern/financial-pattern.model'

import { FinancialAnomaly }
  from '../models/anomaly/financial-anomaly.model'

import { FinancialRecommendation }
  from '../models/recommendation/financial-recommendation.model'

import { FinancialGoalResult }
  from '../models/goal/financial-goal-result.model'

import { FinancialNarrative }
  from '../models/narrative/financial-narrative.model'

import { FinancialExplanation }
  from '../models/explainability/financial-explanation.model'

import { BudgetStatus }
  from '../models/budget/budget-status.model'
import { RecurringTransaction } from '../models/recurring/recurring-transaction.model'
import { FinancialTimelineEvent } from '../models/timeline/financial-timeline-event.model'
import { BudgetSuggestion } from '../models/budget/budget-suggestion.model'

export interface FinancialIntelligenceContext {

  analytics: FinancialAnalyticsResult

  score: FinancialScore

  scoreHistory: {
    mes: string
    score: number
  }[]

  insights: InsightFinanceiro[]

  trend: FinancialTrend

  risk: FinancialRisk

  projection: FinancialProjection

  pattern: FinancialPattern

  anomaly: FinancialAnomaly

  recommendation: FinancialRecommendation[]

  goals: FinancialGoalResult[]

  narrative: FinancialNarrative[]

  explainability: FinancialExplanation[]

  budgets: BudgetStatus[]

  recurring: RecurringTransaction[]

  timeline: FinancialTimelineEvent[]

  budgetSuggestions: BudgetSuggestion[]

}