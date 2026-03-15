import { Lancamento } from '@/app/domain/financeiro'
import { Budget } from '@/app/domain/financeiro/models/budget.model'
import { BudgetStatus } from '../../models/budget/budget-status.model'

export class FinancialBudgetEngine {

  static calcular(
    lancamentos: Lancamento[],
    budgets: Budget[]
  ): BudgetStatus[] {

    const hoje = new Date()
    const diaAtual = hoje.getDate()

    const ultimoDiaMes =
      new Date(
        hoje.getFullYear(),
        hoje.getMonth() + 1,
        0
      ).getDate()

    const diasRestantes =
      ultimoDiaMes - diaAtual

    return budgets.map(budget => {

      const hoje = new Date().getDate()

      const lancamentosCategoria =
        lancamentos
          .filter(l => l.tipo === 'DESPESA')
          .filter(l =>
            l.categoriaId?.toLowerCase() ===
            budget.categoria.toLowerCase()
          )

      const gastoAtual =
        lancamentosCategoria
          .reduce((total, l) => total + l.valor, 0)

      const excesso =
        gastoAtual > budget.limiteMensal
          ? gastoAtual - budget.limiteMensal
          : 0

      const ultimoDiaMes =
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate()

      const diasRestantesMes =
        ultimoDiaMes - hoje

      let reducaoDiariaNecessaria: number | null = null

      if (excesso > 0 && diasRestantesMes > 0) {

        reducaoDiariaNecessaria =
          excesso / diasRestantesMes

      }

      const percentualBruto =
        budget.limiteMensal === 0
          ? 0
          : (gastoAtual / budget.limiteMensal) * 100

      const percentual = Math.min(percentualBruto, 100)

      const gastoMedioDiario =
        diaAtual === 0
          ? 0
          : gastoAtual / diaAtual

      let diasRestantesOrcamento: number | null = null


      if (gastoMedioDiario > 0) {

        const restante = budget.limiteMensal - gastoAtual

        diasRestantesOrcamento =
          Math.floor(restante / gastoMedioDiario)

      }

      const projecao =
        gastoAtual + (gastoMedioDiario * diasRestantes)

      const riscoEstouro =
        projecao > budget.limiteMensal

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

        alerta,

        projecao: projecao,

        riscoEstouro,

        diasRestantesOrcamento,

        excesso,

        reducaoDiariaNecessaria

      }

    })

  }

}