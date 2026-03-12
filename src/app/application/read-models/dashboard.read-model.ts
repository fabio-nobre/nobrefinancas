export interface DashboardReadModel {

  saldoAtual: number

  receitas: number

  despesas: number

  scoreFinanceiro: number

  maiorCategoria?: string

  budgets: any[]

  timeline: any[]

}