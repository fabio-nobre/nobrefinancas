import { Injectable, signal, computed } from '@angular/core';
import { Lancamento } from '@/app/domain/financeiro';

@Injectable({ providedIn: 'root' })
export class LancamentosStore {

  private _lancamentos = signal<Lancamento[]>([]);

  lancamentos = computed(() => this._lancamentos());

  adicionar(lancamento: Lancamento) {
    this._lancamentos.update(lista => [...lista, lancamento]);
  }
}