import { Parcela } from '../parcela/parcela.entity'

export class Fatura {

  constructor(
    public id: string,
    public cartaoId: string,
    public mes: number,
    public ano: number,
    public parcelas: Parcela[] = []
  ) { }

  get total() {

    return this.parcelas.reduce((t, p) => t + p.valor, 0)

  }

}