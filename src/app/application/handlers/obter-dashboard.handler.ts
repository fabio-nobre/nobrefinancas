import { inject } from '@angular/core'
import { LancamentoRepository } from '../../domain/financeiro/repositories/lancamento.repository'
import { ObterDashboardQuery } from '../queries/obter-dashboard.query'
import { FinanceAnalyticsEngine } from '../engines/analytics/finance-analytics.engine'

export class ObterDashboardHandler {

  private repo = inject(LancamentoRepository) as LancamentoRepository

  async execute(query: ObterDashboardQuery) {

    const lancamentos = this.repo.listar()

    return FinanceAnalyticsEngine.calcular(await lancamentos)

  }

}