import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialGoal }
  from '../../models/goal/financial-goal.model'

import { FinancialGoalResult }
  from '../../models/goal/financial-goal-result.model'

export class FinancialGoalEngine {

  static calcular(

    analytics: FinancialAnalyticsResult,
    goals: FinancialGoal[]

  ): FinancialGoalResult[] {

    const resultados: FinancialGoalResult[] = []

    const saldoMensal = analytics.resumo.saldo

    for (const goal of goals) {

      const atual = goal.valorAtual ?? 0

      const restante =
        goal.valorObjetivo - atual

      const economiaMensal =
        saldoMensal > 0
          ? saldoMensal
          : 0

      const meses =
        economiaMensal > 0
          ? restante / economiaMensal
          : Infinity

      resultados.push({

        descricao: goal.descricao,

        valorObjetivo: goal.valorObjetivo,

        valorAtual: atual,

        valorRestante: restante,

        economiaMensalNecessaria:
          restante / 12,

        mesesParaConcluir:
          Math.ceil(meses)

      })

    }

    return resultados

  }

}