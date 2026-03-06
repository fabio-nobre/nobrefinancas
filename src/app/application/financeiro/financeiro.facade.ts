import { Injectable, inject } from '@angular/core'
import { LancamentosStore } from './stores/lancamentos.store'
import { DashboardStore } from './stores/dashboard.store'
import { CartoesStore } from './stores/cartoes.store'

@Injectable({ providedIn: 'root' })
export class FinanceiroFacade {

  private lancamentosStore = inject(LancamentosStore)
  private dashboardStore = inject(DashboardStore)
  private cartoesStore = inject(CartoesStore)

  lancamentos = this.lancamentosStore.lancamentos

  saldo = this.dashboardStore.saldo

  totalReceitas = this.dashboardStore.totalReceitas

  totalDespesas = this.dashboardStore.totalDespesas

  cartoes = this.cartoesStore.cartoes

}