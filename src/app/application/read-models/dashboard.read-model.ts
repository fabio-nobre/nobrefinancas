export interface DashboardReadModel {

  saldoTotal: number

  receitasMes: number

  despesasMes: number

  saldoMes: number

  gastosPorCategoria: {
    categoria: string
    total: number
  }[]

  maiorCategoria?: {
    categoria: string
    valor: number
  }

}