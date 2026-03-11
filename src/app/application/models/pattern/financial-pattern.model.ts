export interface FinancialPattern {

  despesasRecorrentes: {
    descricao: string
    frequencia: number
    valorMedio: number
  }[]

  categoriasDominantes: {
    categoria: string
    percentual: number
  }[]

  gastoFrequente: boolean

}