import { Injectable, computed, inject } from '@angular/core'
import { LancamentosStore } from './lancamentos.store'

@Injectable({ providedIn: 'root' })
export class DashboardStore {

  private lancamentosStore = inject(LancamentosStore)

  saldo = computed(() =>
    this.lancamentosStore.totalReceitas()
    - this.lancamentosStore.totalDespesas()
  )

  totalReceitas = this.lancamentosStore.totalReceitas

  totalDespesas = this.lancamentosStore.totalDespesas

}