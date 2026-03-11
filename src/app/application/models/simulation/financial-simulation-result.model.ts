export interface FinancialSimulationResult {

  saldoAtual: number

  saldoSimulado: number

  diferencaMensal: number

  impactoMetas: {
    descricao: string
    mesesAntes: number
    mesesDepois: number
  }[]

}