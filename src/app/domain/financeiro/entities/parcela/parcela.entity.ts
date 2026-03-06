export class Parcela {

  constructor(
    public numero: number,
    public valor: number,
    public vencimento: Date,
    public paga: boolean = false,
    public valorPago?: number,
    public dataPagamento?: Date
  ) { }

  marcarComoPaga(valor: number) {
    this.paga = true
    this.valorPago = valor
    this.dataPagamento = new Date()
  }

}