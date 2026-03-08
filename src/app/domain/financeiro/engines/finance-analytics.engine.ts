import { Lancamento } from '../entities/lancamento/lancamento.entity'
import { TipoLancamento } from '../enums/tipo-lancamento.enum'

export interface EvolucaoMensal {
  mes: string
  receitas: number
  despesas: number
  saldo: number
}

export interface CategoriaResumo {
  categoria: string
  valor: number
}

export class FinanceAnalyticsEngine {

  static calcularEvolucaoMensal(lancamentos: Lancamento[]): EvolucaoMensal[] {

    const mapa = new Map<string, EvolucaoMensal>()

    for (const l of lancamentos) {

      const data = new Date(l.data)
      const chave = `${data.getFullYear()}-${data.getMonth()}`

      if (!mapa.has(chave)) {
        mapa.set(chave, {
          mes: `${data.getMonth() + 1}/${data.getFullYear()}`,
          receitas: 0,
          despesas: 0,
          saldo: 0
        })
      }

      const item = mapa.get(chave)!

      if (l.tipo === TipoLancamento.RECEITA) {
        item.receitas += l.valor
      }

      if (l.tipo === TipoLancamento.DESPESA) {
        item.despesas += l.valor
      }

      item.saldo = item.receitas - item.despesas
    }

    return Array.from(mapa.values())
  }


  static gastosPorCategoria(lancamentos: Lancamento[]): CategoriaResumo[] {

    const mapa = new Map<string, number>()

    for (const l of lancamentos) {

      if (l.tipo !== TipoLancamento.DESPESA) continue

      const categoria = l.categoriaId ?? 'outros'

      mapa.set(
        categoria,
        (mapa.get(categoria) ?? 0) + l.valor
      )
    }

    return Array.from(mapa.entries())
      .map(([categoria, valor]) => ({
        categoria,
        valor
      }))
      .sort((a, b) => b.valor - a.valor)
  }


  static maiorCategoriaGasto(lancamentos: Lancamento[]) {

    const categorias = this.gastosPorCategoria(lancamentos)

    if (categorias.length === 0) {
      return { categoria: '', valor: 0 }
    }

    return categorias[0]

  }


  static mediaMensalDespesas(lancamentos: Lancamento[]) {

    const mapa = new Map<string, number>()

    for (const l of lancamentos) {

      if (l.tipo !== TipoLancamento.DESPESA) continue

      const data = new Date(l.data)
      const chave = `${data.getFullYear()}-${data.getMonth()}`

      mapa.set(
        chave,
        (mapa.get(chave) ?? 0) + l.valor
      )
    }

    const valores = Array.from(mapa.values())

    if (valores.length === 0) return 0

    const total = valores.reduce((t, v) => t + v, 0)

    return total / valores.length
  }


  static previsaoSaldoMes(
    saldoAtual: number,
    receitas: number,
    despesas: number
  ) {
    return saldoAtual + receitas - despesas
  }


  static resumoDoMes(lancamentos: Lancamento[]) {

    const hoje = new Date()

    const receitas = lancamentos
      .filter(l =>
        l.tipo === TipoLancamento.RECEITA &&
        new Date(l.data).getMonth() === hoje.getMonth()
      )
      .reduce((t, l) => t + l.valor, 0)

    const despesas = lancamentos
      .filter(l =>
        l.tipo === TipoLancamento.DESPESA &&
        new Date(l.data).getMonth() === hoje.getMonth()
      )
      .reduce((t, l) => t + l.valor, 0)

    return {
      receitas,
      despesas,
      saldo: receitas - despesas
    }

  }

  static dadosGraficoEvolucao(lancamentos: Lancamento[]) {

    const evolucao = this.calcularEvolucaoMensal(lancamentos)

    return {
      labels: evolucao.map(m => m.mes),
      receitas: evolucao.map(m => m.receitas),
      despesas: evolucao.map(m => m.despesas)
    }

  }

  static dadosGraficoCategorias(lancamentos: Lancamento[]) {

    const categorias = this.gastosPorCategoria(lancamentos)

    return {
      labels: categorias.map(c => c.categoria),
      valores: categorias.map(c => c.valor)
    }

  }

}