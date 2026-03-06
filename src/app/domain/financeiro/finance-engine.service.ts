import { Lancamento } from './entities/lancamento/lancamento.entity'

export class FinanceEngine {

  static totalReceitas(lancamentos: Lancamento[]): number {

    return lancamentos
      .filter(l => l.tipo === 'RECEITA')
      .reduce((t, l) => t + l.valorTotal, 0)

  }

  static totalDespesas(lancamentos: Lancamento[]): number {

    return lancamentos
      .filter(l => l.tipo === 'DESPESA')
      .reduce((t, l) => t + l.valorTotal, 0)

  }

  static saldo(lancamentos: Lancamento[]): number {

    return this.totalReceitas(lancamentos) - this.totalDespesas(lancamentos)

  }

  static ultimosLancamentos(lancamentos: Lancamento[]): Lancamento[] {

    return [...lancamentos]
      .sort((a, b) => b.data.getTime() - a.data.getTime())
      .slice(0, 5)

  }

  static saldoPrevisto(lancamentos: Lancamento[]): number {

    const hoje = new Date()

    return lancamentos.reduce((total, l) => {

      const valor = l.valorTotal

      if (l.data >= hoje) {

        if (l.tipo === 'RECEITA') {
          total += valor
        }

        if (l.tipo === 'DESPESA') {
          total -= valor
        }

      }

      return total

    }, 0)

  }

  static evolucaoMensal(lancamentos: Lancamento[]) {

    const meses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ]

    const receitas = new Array(12).fill(0)
    const despesas = new Array(12).fill(0)

    lancamentos.forEach(l => {

      const mes = new Date(l.data).getMonth()

      if (l.tipo === 'RECEITA') {
        receitas[mes] += l.valor
      }

      if (l.tipo === 'DESPESA') {
        despesas[mes] += l.valor
      }

    })

    return {
      meses,
      receitas,
      despesas
    }

  }

}