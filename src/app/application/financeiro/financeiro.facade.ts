import { Injectable, inject } from '@angular/core';
import { FinanceiroStore } from './stores/financeiro.store';
import { Lancamento } from '@domain';

@Injectable({ providedIn: 'root' })
export class FinanceiroFacade {

  private store = inject(FinanceiroStore)

  lancamentos = this.store.lancamentos

  receitas = this.store.totalReceitas

  despesas = this.store.totalDespesas

  saldo = this.store.saldo

  adicionarLancamento(l: Lancamento) {
    this.store.adicionarLancamento(l)
  }

  removerLancamento(id: string) {
    this.store.removerLancamento(id)
  }

}