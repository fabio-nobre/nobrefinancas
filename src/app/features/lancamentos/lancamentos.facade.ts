import { inject, Injectable } from '@angular/core'

import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'
import { Lancamento } from '@domain'

@Injectable({ providedIn: 'root' })
export class LancamentosFacade {

  private store = inject(FinanceiroStore)

  lancamentos = this.store.lancamentos

  adicionar(l: Lancamento) {
    this.store.adicionarLancamento(l)
  }

  remover(id: string) {
    this.store.removerLancamento(id)
  }

}