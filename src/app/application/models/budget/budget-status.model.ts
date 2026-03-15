export interface BudgetStatus {

  categoria: string

  gastoAtual: number

  limite: number

  percentual: number

  alerta: 'ok' | 'proximo' | 'estourado'

  projecao: number

  riscoEstouro: boolean

  diasRestantesOrcamento: number | null

}