import { Injectable, inject } from '@angular/core'
import { DashboardStore } from '@/app/application/financeiro/stores/dashboard.store'
import { LancamentosStore } from '@/app/application/financeiro/stores/lancamentos.store'

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  private dashboardStore = inject(DashboardStore)
  private lancamentosStore = inject(LancamentosStore)

  saldo = this.dashboardStore.saldo
  totalReceitas = this.dashboardStore.totalReceitas
  totalDespesas = this.dashboardStore.totalDespesas

  lancamentos = this.lancamentosStore.lancamentos

}