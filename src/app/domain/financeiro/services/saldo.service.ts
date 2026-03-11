import { Lancamento }
  from '../entities/lancamento/lancamento.entity'

import { TipoLancamento }
  from '../enums/tipo-lancamento.enum'

export class SaldoService {

  static calcularSaldo(
    lancamentos: Lancamento[]
  ): number {

    let saldo = 0

    for (const l of lancamentos) {

      if (l.tipo === TipoLancamento.RECEITA) {
        saldo += l.valor
      }

      if (l.tipo === TipoLancamento.DESPESA) {
        saldo -= l.valor
      }

    }

    return saldo

  }

}