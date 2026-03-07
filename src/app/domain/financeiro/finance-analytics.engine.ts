import { Lancamento } from './entities/lancamento/lancamento.entity'
import { TipoLancamento } from './enums/tipo-lancamento.enum'

export class FinanceAnalyticsEngine {

  private static toDate(d: Date | string): Date {
    return d instanceof Date ? d : new Date(d)
  }

  static maiorCategoriaGasto(lancamentos: Lancamento[]): string {

    const despesas = lancamentos.filter(
      l => l.tipo === TipoLancamento.DESPESA
    )

    const mapa: Record<string, number> = {}

    for (const l of despesas) {

      const categoria = l.categoriaId ?? 'Outros'

      mapa[categoria] = (mapa[categoria] ?? 0) + l.valor

    }

    const ordenado = Object.entries(mapa)
      .sort((a, b) => b[1] - a[1])

    return ordenado[0]?.[0] ?? '—'

  }

  static mediaMensalDespesas(lancamentos: Lancamento[]): number {

    const despesas = lancamentos.filter(
      l => l.tipo === TipoLancamento.DESPESA
    )

    if (!despesas.length) return 0

    const mapaMes: Record<string, number> = {}

    for (const l of despesas) {

      const data = this.toDate(l.data)

      const chave = `${data.getFullYear()}-${data.getMonth()}`

      mapaMes[chave] = (mapaMes[chave] ?? 0) + l.valor

    }

    const valores = Object.values(mapaMes)

    const total = valores.reduce((s, v) => s + v, 0)

    return total / valores.length

  }

  static categoriaDominante(lancamentos: Lancamento[]): string {

    const mapa: Record<string, number> = {}

    for (const l of lancamentos) {

      if (l.tipo !== TipoLancamento.DESPESA) continue

      const categoria = l.categoriaId ?? 'Outros'

      mapa[categoria] = (mapa[categoria] ?? 0) + l.valor

    }

    const ordenado = Object.entries(mapa)
      .sort((a, b) => b[1] - a[1])

    return ordenado[0]?.[0] ?? '—'

  }

  static variacaoMensalDespesas(lancamentos: Lancamento[]): number {

    const agora = new Date()

    const mesAtual = agora.getMonth()
    const anoAtual = agora.getFullYear()

    const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1
    const anoAnterior = mesAtual === 0 ? anoAtual - 1 : anoAtual

    const despesasMes = (mes: number, ano: number) =>
      lancamentos
        .filter(l => {

          const data = this.toDate(l.data)

          return (
            l.tipo === TipoLancamento.DESPESA &&
            data.getMonth() === mes &&
            data.getFullYear() === ano
          )

        })
        .reduce((s, l) => s + l.valor, 0)

    const atual = despesasMes(mesAtual, anoAtual)
    const anterior = despesasMes(mesAnterior, anoAnterior)

    if (!anterior) return 0

    return ((atual - anterior) / anterior) * 100

  }

  static previsaoSaldoMes(
    saldoAtual: number,
    receitas: number,
    despesas: number
  ): number {

    return saldoAtual + receitas - despesas

  }

  static evolucaoMensal(lancamentos: Lancamento[]) {

    const mapa = new Map<string, { receitas: number; despesas: number }>()

    for (const l of lancamentos) {

      const data = this.toDate(l.data)

      const chave = `${data.getFullYear()}-${data.getMonth()}`

      if (!mapa.has(chave)) {
        mapa.set(chave, { receitas: 0, despesas: 0 })
      }

      const item = mapa.get(chave)!

      if (l.tipo === TipoLancamento.RECEITA) {
        item.receitas += l.valor
      } else {
        item.despesas += l.valor
      }

    }

    return Array.from(mapa.entries()).map(([chave, v]) => {

      const [ano, mes] = chave.split('-').map(Number)

      const data = new Date(ano, mes)

      return {
        mes: data.toLocaleDateString('pt-BR', { month: 'short' }),
        receitas: v.receitas,
        despesas: v.despesas
      }

    })

  }

  static gastosPorCategoria(lancamentos: Lancamento[]) {

    const mapa = new Map<string, number>()

    for (const l of lancamentos) {

      if (l.tipo !== TipoLancamento.DESPESA) continue

      const categoria = l.categoriaId ?? 'Outros'

      mapa.set(categoria, (mapa.get(categoria) ?? 0) + l.valor)

    }

    return Array.from(mapa.entries()).map(([categoria, valor]) => ({
      categoria,
      valor
    }))

  }

}