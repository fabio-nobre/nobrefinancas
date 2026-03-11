export interface FinancialGoal {

  tipo: 'economia' | 'quitacao' | 'reserva'

  descricao: string

  valorObjetivo: number

  valorAtual?: number

}