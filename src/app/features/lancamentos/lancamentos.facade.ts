import { Injectable, inject } from '@angular/core'
import { LancamentosStore } from '@/app/application/financeiro/stores/lancamentos.store'
import { Lancamento } from '@/app/domain/financeiro'

@Injectable({ providedIn: 'root' })
export class LancamentosFacade {

  private store = inject(LancamentosStore)

  lancamentos = this.store.lancamentos

  adicionar(l: Lancamento) {
    this.store.adicionar(l)
  }



}