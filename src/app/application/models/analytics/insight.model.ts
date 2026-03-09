export type InsightTipo =
  | 'info'
  | 'warning'
  | 'positive'

export interface InsightFinanceiro {

  tipo: InsightTipo
  mensagem: string

}