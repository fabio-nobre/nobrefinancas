export class OrcamentoService {

  static calcularPercentualUso(

    gasto: number,
    limite: number

  ): number {

    if (limite <= 0) return 0

    return gasto / limite

  }

}