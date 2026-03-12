import { FinancialIntelligenceContext }
  from '../intelligence/financial-intelligence.context'

import { DashboardReadModel }
  from './dashboard.read-model'

export class DashboardReadModelFactory {

  static create(
    intelligence: FinancialIntelligenceContext
  ): DashboardReadModel {

    return {

      saldoAtual:
        intelligence.analytics.resumo.saldo,

      receitas:
        intelligence.analytics.resumo.receitas,

      despesas:
        intelligence.analytics.resumo.despesas,

      scoreFinanceiro:
        intelligence.score.score,

      maiorCategoria:
        intelligence.analytics.maiorCategoria?.categoria,

      budgets:
        intelligence.budgets,

      timeline:
        intelligence.timeline

    }

  }

}