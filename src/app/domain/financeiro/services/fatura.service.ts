import { Lancamento }
  from '../entities/lancamento/lancamento.entity'

export class FaturaService {

  static calcularTotalFatura(
    lancamentos: Lancamento[],
    cartaoId: string
  ): number {

    return lancamentos
      .filter(l => l.cartaoId === cartaoId)
      .reduce((t, l) => t + l.valor, 0)

  }

}