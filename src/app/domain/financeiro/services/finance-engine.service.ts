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

}