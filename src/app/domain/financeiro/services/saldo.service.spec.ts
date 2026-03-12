import { SaldoService }
  from './saldo.service'

import { TipoLancamento }
  from '../enums/tipo-lancamento.enum'

describe('SaldoService', () => {

  it('deve calcular saldo corretamente', () => {

    const lancamentos: any[] = [

      { valor: 1000, tipo: TipoLancamento.RECEITA },

      { valor: 200, tipo: TipoLancamento.DESPESA }

    ]

    const saldo =
      SaldoService.calcularSaldo(lancamentos)

    expect(saldo).toBe(800)

  })

})