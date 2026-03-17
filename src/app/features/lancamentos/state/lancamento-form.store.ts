import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum';
import { Injectable, signal, computed } from '@angular/core';

export interface LancamentoFormState {
  descricao: string;
  valor: number;
  data: Date;
  tipo: TipoLancamento;
  categoriaId?: string;
  contaId?: string;
}

@Injectable({ providedIn: 'root' })
export class LancamentoFormStore {

  private _state = signal<LancamentoFormState>({
    descricao: '',
    valor: 0,
    data: new Date(),
    tipo: TipoLancamento.DESPESA
  });

  state = computed(() => this._state());

  setDescricao(descricao: string) {
    this._state.update(s => ({ ...s, descricao }));
  }

  setValor(valor: number) {
    this._state.update(s => ({ ...s, valor }));
  }

  setData(data: Date) {
    this._state.update(s => ({ ...s, data }));
  }

  setTipo(tipo: TipoLancamento) {
    this._state.update(s => ({ ...s, tipo }));
  }

  setCategoria(categoriaId: string) {
    this._state.update(s => ({ ...s, categoriaId }));
  }

  setConta(contaId: string) {
    this._state.update(s => ({ ...s, contaId }));
  }

  reset() {
    this._state.set({
      descricao: '',
      valor: 0,
      data: new Date(),
      tipo: TipoLancamento.DESPESA
    });
  }

  editar(lancamento: any) {
    this._state.set({
      descricao: lancamento.descricao,
      valor: lancamento.valor,
      data: new Date(lancamento.data),
      tipo: lancamento.tipo,
      categoriaId: lancamento.categoriaId,
      contaId: lancamento.contaId
    });
  }
}