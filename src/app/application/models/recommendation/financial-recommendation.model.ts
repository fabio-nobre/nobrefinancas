export interface FinancialRecommendation {

  tipo: 'economia' | 'alerta' | 'otimizacao'

  mensagem: string

  impactoEstimado?: number

}