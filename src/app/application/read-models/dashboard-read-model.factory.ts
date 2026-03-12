
import { FinancialAnalyticsResult } from '../models/analytics/financial-analytics-result.model'
import { DashboardReadModel }
  from './dashboard.read-model'

export class DashboardReadModelFactory {

  static create(analytics: FinancialAnalyticsResult): DashboardReadModel {

    const resumo = analytics.resumo

    return {

      saldoTotal: resumo.saldo,

      receitasMes: resumo.receitas,

      despesasMes: resumo.despesas,

      saldoMes: resumo.saldo,

      gastosPorCategoria: analytics.categorias.map(c => ({
        categoria: c.categoria,
        total: c.valor
      })),

      maiorCategoria: analytics.maiorCategoria
        ? {
          categoria: analytics.maiorCategoria.categoria,
          valor: analytics.maiorCategoria.valor
        }
        : undefined

    }

  }

}