import { Injectable, inject } from '@angular/core';
import { Lancamento } from '@/app/domain/financeiro';
import { FinanceiroStore } from '../../stores/financeiro.store';

@Injectable({ providedIn: 'root' })
export class CriarLancamentoUseCase {

  private store = inject(FinanceiroStore);

  executar(lancamento: Lancamento) {
    this.store.adicionarLancamento(lancamento);
  }
}