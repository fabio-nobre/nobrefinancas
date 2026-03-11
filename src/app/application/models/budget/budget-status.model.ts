export interface BudgetStatus {

  categoriaId: string

  limite: number

  gastoAtual: number

  restante: number

  percentualUsado: number

  status: 'ok' | 'alerta' | 'estourado'

}