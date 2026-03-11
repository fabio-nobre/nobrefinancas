export interface FinancialAnomaly {

  gastosAcimaMedia: {
    categoria: string
    percentual: number
  }[]

  valoresIncomuns: {
    descricao: string
    valor: number
  }[]

  categoriaForaPadrao: {
    categoria: string
    percentual: number
  }[]

}