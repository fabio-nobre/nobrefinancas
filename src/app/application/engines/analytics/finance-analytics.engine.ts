import { Lancamento } from '../../../domain/financeiro/entities/lancamento/lancamento.entity'
import { TipoLancamento } from '../../../domain/financeiro/enums/tipo-lancamento.enum'
import { ComparacaoMensal } from '../../../domain/financeiro/value-objects/comparacao-mensal'
import { FinancialAnalyticsResult } from '../../models/analytics/financial-analytics-result.model'

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

  static calcular(lancamentos: Lancamento[]): FinancialAnalyticsResult {

    const hoje = new Date()

    const mapaMes = new Map<string, EvolucaoMensal>()
    const mapaCategoria = new Map<string, number>()

    let totalReceitas = 0
    let totalDespesas = 0

    for (const l of lancamentos) {

      const data = new Date(l.data)

      const mes = data.getMonth()
      const ano = data.getFullYear()

      const chaveMes = `${ano}-${mes}`

      // =============================
      // Evolução mensal
      // =============================

      if (!mapaMes.has(chaveMes)) {

        mapaMes.set(chaveMes, {
          mes: `${mes + 1}/${ano}`,
          receitas: 0,
          despesas: 0,
          saldo: 0
        })

      }

      const itemMes = mapaMes.get(chaveMes)!

      // =============================
      // Receitas / despesas
      // =============================

      if (l.tipo === TipoLancamento.RECEITA) {

        itemMes.receitas += l.valor
        totalReceitas += l.valor

      }

      if (l.tipo === TipoLancamento.DESPESA) {

        itemMes.despesas += l.valor
        totalDespesas += l.valor

        const categoria = l.categoriaId ?? 'outros'

        mapaCategoria.set(
          categoria,
          (mapaCategoria.get(categoria) ?? 0) + l.valor
        )

      }

    }

    const evolucaoMensal = Array
      .from(mapaMes.values())
      .map(m => ({
        ...m,
        saldo: m.receitas - m.despesas
      }))

    const categorias = Array
      .from(mapaCategoria.entries())
      .map(([categoria, valor]) => ({
        categoria,
        valor
      }))
      .sort((a, b) => b.valor - a.valor)

    const maiorCategoria =
      categorias.length > 0
        ? categorias.reduce((maior, atual) =>
          atual.valor > maior.valor ? atual : maior
        )
        : null

    const resumo = {

      receitas: totalReceitas,
      despesas: totalDespesas,
      saldo: totalReceitas - totalDespesas

    }

    const mediaMensalDespesas =
      evolucaoMensal.length > 0
        ? evolucaoMensal
          .reduce((t, m) => t + m.despesas, 0) /
        evolucaoMensal.length
        : 0

    const graficoEvolucao = {

      labels: evolucaoMensal.map(m => m.mes),
      receitas: evolucaoMensal.map(m => m.receitas),
      despesas: evolucaoMensal.map(m => m.despesas)

    }

    const graficoCategorias = {

      labels: categorias.map(c => c.categoria),
      valores: categorias.map(c => c.valor)

    }

    const comparacaoMensal =
      this.compararMesAtualComAnterior(lancamentos)

    return {

      lancamentos,

      resumo,

      evolucaoMensal,

      categorias,

      maiorCategoria,

      comparacaoMensal,

      mediaMensalDespesas,

      graficoEvolucao,

      graficoCategorias

    }

  }

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

  static maiorCategoriaGasto(categorias: { categoria: string; valor: number }[]) {

    if (!categorias.length) return null

    return categorias.reduce((maior, atual) =>
      atual.valor > maior.valor ? atual : maior
    )

  }

  static compararMesAtualComAnterior(lancamentos: Lancamento[]): ComparacaoMensal {

    const hoje = new Date()

    const mesAtual = hoje.getMonth()
    const anoAtual = hoje.getFullYear()

    const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1
    const anoAnterior = mesAtual === 0 ? anoAtual - 1 : anoAtual

    const atual = lancamentos.filter(l => {
      const d = new Date(l.data)
      return d.getMonth() === mesAtual && d.getFullYear() === anoAtual
    })

    const anterior = lancamentos.filter(l => {
      const d = new Date(l.data)
      return d.getMonth() === mesAnterior && d.getFullYear() === anoAnterior
    })

    const soma = (lista: Lancamento[], tipo: string) =>
      lista
        .filter(l => l.tipo === tipo)
        .reduce((t, l) => t + l.valor, 0)

    const receitasAtual = soma(atual, 'RECEITA')
    const receitasAnterior = soma(anterior, 'RECEITA')

    const despesasAtual = soma(atual, 'DESPESA')
    const despesasAnterior = soma(anterior, 'DESPESA')

    const saldoAtual = receitasAtual - despesasAtual
    const saldoAnterior = receitasAnterior - despesasAnterior

    const variacao = (atual: number, anterior: number) =>
      anterior === 0 ? 0 : ((atual - anterior) / anterior) * 100

    return {

      receitasAtual,
      receitasAnterior,

      despesasAtual,
      despesasAnterior,

      saldoAtual,
      saldoAnterior,

      variacaoReceitas: variacao(receitasAtual, receitasAnterior),
      variacaoDespesas: variacao(despesasAtual, despesasAnterior),
      variacaoSaldo: variacao(saldoAtual, saldoAnterior)
    }
  }



}