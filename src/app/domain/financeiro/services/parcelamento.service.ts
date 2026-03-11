export class ParcelamentoService {

  static calcularValorParcela(

    valorTotal: number,
    parcelas: number

  ): number {

    if (parcelas <= 0) return valorTotal

    return valorTotal / parcelas

  }

}