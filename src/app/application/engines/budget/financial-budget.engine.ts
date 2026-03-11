import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialBudget }
  from '../../models/budget/financial-budget.model'

import { BudgetStatus }
  from '../../models/budget/budget-status.model'

export class FinancialBudgetEngine {

  static calcular(

    analytics: FinancialAnalyticsResult,
    budgets: FinancialBudget[]

  ): BudgetStatus[] {

    const resultado: BudgetStatus[] = []

    for (const budget of budgets) {

      const categoria =
        analytics.categorias.find(
          c => c.categoria === budget.categoriaId
        )

      const gasto = categoria?.valor ?? 0

      const restante =
        budget.limiteMensal - gasto

      const percentual =
        budget.limiteMensal > 0
          ? gasto / budget.limiteMensal
          : 0

      let status: BudgetStatus['status'] = 'ok'

      if (percentual > 1) {

        status = 'estourado'

      } else if (percentual > 0.8) {

        status = 'alerta'

      }

      resultado.push({

        categoriaId: budget.categoriaId,

        limite: budget.limiteMensal,

        gastoAtual: gasto,

        restante,

        percentualUsado: percentual,

        status

      })

    }

    return resultado

  }

}