import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialGoal }
  from '../../models/goal/financial-goal.model'

import { FinancialGoalEngine }
  from '../goal/financial-goal.engine'

import { FinancialSimulationScenario }
  from '../../models/simulation/financial-simulation-scenario.model'

import { FinancialSimulationResult }
  from '../../models/simulation/financial-simulation-result.model'

export class FinancialSimulationEngine {

  static simular(

    analytics: FinancialAnalyticsResult,
    goals: FinancialGoal[],
    scenario: FinancialSimulationScenario

  ): FinancialSimulationResult {

    const saldoAtual =
      analytics.resumo.saldo

    let receitas =
      analytics.resumo.receitas

    let despesas =
      analytics.resumo.despesas

    // aumento de renda
    if (scenario.aumentoReceita) {
      receitas += scenario.aumentoReceita
    }

    // redução geral de despesas
    if (scenario.reducaoDespesas) {
      despesas -= scenario.reducaoDespesas
    }

    // redução por categoria
    if (scenario.reducaoCategoria) {

      const categoria =
        analytics.categorias.find(
          c => c.categoria === scenario.reducaoCategoria!.categoria
        )

      if (categoria) {

        despesas -=
          categoria.valor *
          scenario.reducaoCategoria.percentual

      }

    }

    const saldoSimulado =
      receitas - despesas

    const diferenca =
      saldoSimulado - saldoAtual

    // impacto nas metas
    const metasAntes =
      FinancialGoalEngine.calcular(
        analytics,
        goals
      )

    const analyticsSimulado = {
      ...analytics,
      resumo: {
        receitas,
        despesas,
        saldo: saldoSimulado
      }
    }

    const metasDepois =
      FinancialGoalEngine.calcular(
        analyticsSimulado,
        goals
      )

    const impactoMetas =
      metasAntes.map((antes, i) => {

        const depois = metasDepois[i]

        return {

          descricao: antes.descricao,

          mesesAntes: antes.mesesParaConcluir,

          mesesDepois: depois.mesesParaConcluir

        }

      })

    return {

      saldoAtual,

      saldoSimulado,

      diferencaMensal: diferenca,

      impactoMetas

    }

  }

}