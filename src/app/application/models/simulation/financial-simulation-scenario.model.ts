export interface FinancialSimulationScenario {

  aumentoReceita?: number

  reducaoDespesas?: number

  reducaoCategoria?: {
    categoria: string
    percentual: number
  }

}