import { Lancamento } from "@/app/domain/financeiro"
import { InsightFinanceiro } from '../models/analytics/insight.model'

export interface FinancialInsight {

  tipo: 'info' | 'warning' | 'positive'
  mensagem: string

}

export class FinancialInsightsEngine {

  static gerarInsights(lancamentos: Lancamento[]): InsightFinanceiro[] {

    if (!lancamentos?.length) return []

    const insights: FinancialInsight[] = []

    const despesas = lancamentos.filter(l => l.tipo === 'DESPESA')
    const receitas = lancamentos.filter(l => l.tipo === 'RECEITA')

    const totalDespesas = despesas.reduce((s, l) => s + l.valor, 0)
    const totalReceitas = receitas.reduce((s, l) => s + l.valor, 0)

    // saldo positivo
    if (totalReceitas > totalDespesas) {

      insights.push({
        tipo: 'positive',
        mensagem: 'Seu saldo está positivo neste período'
      })

    }

    // alerta de gastos maiores que receitas
    if (totalDespesas > totalReceitas) {

      insights.push({
        tipo: 'warning',
        mensagem: 'Suas despesas estão maiores que suas receitas'
      })

    }

    // categoria com maior gasto
    const gastosPorCategoria = new Map<string, number>()

    despesas.forEach(l => {

      const atual = gastosPorCategoria.get(l.categoriaId || 'sem_categoria') || 0

      gastosPorCategoria.set(l.categoriaId || 'sem_categoria', atual + l.valor)

    })

    let maiorCategoria = ''
    let maiorValor = 0

    gastosPorCategoria.forEach((valor, categoria) => {

      if (valor > maiorValor) {
        maiorValor = valor
        maiorCategoria = categoria
      }

    })

    if (maiorCategoria) {

      const percentual = ((maiorValor / totalDespesas) * 100).toFixed(0)

      insights.push({
        tipo: 'info',
        mensagem: `${maiorCategoria} representa ${percentual}% dos seus gastos`
      })

    }

    return insights

  }

}