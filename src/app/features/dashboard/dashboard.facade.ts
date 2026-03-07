import { Injectable, inject, computed } from '@angular/core'
import { LancamentosStore } from '@/app/application/financeiro/stores/lancamentos.store'
import { DashboardStore } from '@/app/application/financeiro/stores/dashboard.store'
import { FinanceAnalyticsEngine } from '@/app/domain/financeiro/finance-analytics.engine'

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  private dashboardStore = inject(DashboardStore)
  private lancamentosStore = inject(LancamentosStore)

  // dados básicos
  lancamentos = this.lancamentosStore.lancamentos

  saldo = this.dashboardStore.saldo
  totalReceitas = this.dashboardStore.totalReceitas
  totalDespesas = this.dashboardStore.totalDespesas

  // últimos lançamentos
  ultimosLancamentos = computed(() => {

    return [...this.lancamentos()]
      .sort((a, b) => b.data.getTime() - a.data.getTime())
      .slice(0, 5)

  })

  // previsão saldo
  saldoPrevisto = computed(() => {

    return this.totalReceitas() - this.totalDespesas()

  })

  // analytics
  maiorCategoriaGasto = computed(() =>
    FinanceAnalyticsEngine.maiorCategoriaGasto(
      this.lancamentos()
    )
  )

  mediaMensalDespesas = computed(() =>
    FinanceAnalyticsEngine.mediaMensalDespesas(
      this.lancamentos()
    )
  )

  previsaoSaldoMes = computed(() =>
    FinanceAnalyticsEngine.previsaoSaldoMes(
      this.saldo(),
      this.totalReceitas(),
      this.totalDespesas()
    )
  )

}