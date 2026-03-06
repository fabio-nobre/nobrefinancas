import { Lancamento } from '../entities/lancamento/lancamento.entity'

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

}