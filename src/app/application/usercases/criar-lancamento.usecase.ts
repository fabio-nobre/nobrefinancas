import { Injectable, inject } from '@angular/core';
import { LancamentosStore } from '@/app/application/stores/lancamentos.store';
import { Lancamento } from '@/app/domain/financeiro';

@Injectable({ providedIn: 'root' })
export class CriarLancamentoUseCase {

  private store = inject(LancamentosStore);

  executar(lancamento: Lancamento) {
    this.store.adicionar(lancamento);
  }
}