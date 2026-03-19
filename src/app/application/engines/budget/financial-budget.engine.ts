import { Injectable } from '@angular/core';
import { Lancamento } from '@/app/domain/financeiro'
import { Budget } from '@/app/domain/financeiro/models/budget.model'
import { BudgetStatus } from '../../models/budget/budget-status.model'
import { BudgetService } from '@/app/features/budget/services/budget.service'

@Injectable({
  providedIn: 'root'
})
export class FinancialBudgetEngine {

  constructor(
    private budgetService: BudgetService
  ) { }

  calcular(
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
      const categoriaId = budget.categoria.toLowerCase()

      // 🔥 ORÇAMENTO REAL DO USUÁRIO (localStorage)
      const limite = this.budgetService.obterValor(categoriaId)

      console.log('ANTES DO BUDGET ENGINE');

      const lancamentosCategoria =
        lancamentos
          .filter(l => l.tipo === 'DESPESA')
          .filter(l =>
            l.categoriaId?.toLowerCase() === categoriaId
          )

      const gastoAtual =
        lancamentosCategoria
          .reduce((total, l) => total + l.valor, 0)

      const excesso =
        gastoAtual > limite
          ? gastoAtual - limite
          : 0

      const hojeDia = new Date().getDate()

      const ultimoDiaMesAtual =
        new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate()

      const diasRestantesMes =
        ultimoDiaMesAtual - hojeDia

      let reducaoDiariaNecessaria: number | null = null

      if (excesso > 0 && diasRestantesMes > 0) {
        reducaoDiariaNecessaria =
          excesso / diasRestantesMes
      }

      const percentualBruto =
        limite === 0
          ? 0
          : (gastoAtual / limite) * 100

      const percentual = Math.min(percentualBruto, 100)

      const gastoMedioDiario =
        diaAtual === 0
          ? 0
          : gastoAtual / diaAtual

      let diasRestantesOrcamento: number | null = null

      if (gastoMedioDiario > 0) {

        const restante = limite - gastoAtual

        diasRestantesOrcamento =
          Math.floor(restante / gastoMedioDiario)
      }

      const projecao =
        gastoAtual + (gastoMedioDiario * diasRestantes)

      const riscoEstouro =
        projecao > limite

      let alerta: 'ok' | 'proximo' | 'estourado' = 'ok'

      if (percentual >= 100) {
        alerta = 'estourado'
      } else if (percentual >= 80) {
        alerta = 'proximo'
      }

      console.log('DEPOIS DO BUDGET ENGINE');

      return {
        categoria: budget.categoria,
        gastoAtual,
        limite,
        percentual,
        alerta,
        projecao,
        riscoEstouro,
        diasRestantesOrcamento,
        excesso,
        reducaoDiariaNecessaria
      }

    })

  }

}