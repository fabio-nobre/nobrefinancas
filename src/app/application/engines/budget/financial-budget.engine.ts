import { Lancamento } from '@/app/domain/financeiro'
import { Budget } from '@/app/domain/financeiro/models/budget.model'
import { BudgetStatus } from '../../models/budget/budget-status.model'

export class FinancialBudgetEngine {

  static calcular(
    lancamentos: Lancamento[],
    budgets: Budget[]
  ): BudgetStatus[] {

    return budgets.map(budget => {

      const gastoAtual =
        lancamentos
          .filter(l => l.tipo === 'DESPESA')
          .filter(l => l.categoriaId === budget.categoria)
          .reduce((total, l) => total + l.valor, 0)

      const percentual =
        budget.limiteMensal === 0
          ? 0
          : (gastoAtual / budget.limiteMensal) * 100

      let alerta: 'ok' | 'proximo' | 'estourado' = 'ok'

      if (percentual >= 100) {
        alerta = 'estourado'
      } else if (percentual >= 80) {
        alerta = 'proximo'
      }

      return {
        categoria: budget.categoria,
        gastoAtual,
        limite: budget.limiteMensal,
        percentual,
        alerta
      }

    })

  }

}