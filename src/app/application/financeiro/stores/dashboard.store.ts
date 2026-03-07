import { Injectable, computed, inject } from '@angular/core'
import { LancamentosStore } from './lancamentos.store'
import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'

@Injectable({ providedIn: 'root' })
export class DashboardStore {

  private lancamentosStore = inject(LancamentosStore)

  saldo = computed(() => {

    const lancamentos = this.lancamentosStore.lancamentos()

    const receitas = lancamentos
      .filter(l => l.tipo === TipoLancamento.RECEITA)
      .reduce((s, l) => s + l.valor, 0)

    const despesas = lancamentos
      .filter(l => l.tipo === TipoLancamento.DESPESA)
      .reduce((s, l) => s + l.valor, 0)

    return receitas - despesas
  })

  totalReceitas = this.lancamentosStore.totalReceitas

  totalDespesas = this.lancamentosStore.totalDespesas

}