export interface BudgetStatus {
  categoria: string
  gastoAtual: number
  limite: number
  percentual: number
  alerta: 'ok' | 'proximo' | 'estourado'
}