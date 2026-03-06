import { Injectable, inject, computed } from '@angular/core'
import { LancamentosStore } from './lancamentos.store'

@Injectable({ providedIn: 'root' })
export class DashboardStore {

  private lancamentosStore = inject(LancamentosStore)

  saldo = computed(() => {

    const receitas = this.lancamentosStore.totalReceitas()
    const despesas = this.lancamentosStore.totalDespesas()

    return receitas - despesas

  })

}