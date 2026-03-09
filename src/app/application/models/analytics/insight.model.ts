export type InsightTipo =
  | 'positivo'
  | 'alerta'
  | 'neutro'

export interface InsightFinanceiro {

  tipo: InsightTipo
  mensagem: string
}