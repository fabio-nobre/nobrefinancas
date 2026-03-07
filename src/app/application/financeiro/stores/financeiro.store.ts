import { Injectable, computed, signal } from '@angular/core';

import { Lancamento, } from '@domain';
import { Conta } from '@domain';
import { Cartao } from '@domain'
import { Categoria } from '@domain'

import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'
import { gerarLancamentosMock } from '@/app/mocks/lancamentos.mock'

export interface FinanceiroState {

  lancamentos: Lancamento[]

  contas: Conta[]

  cartoes: Cartao[]

  categorias: Categoria[]

}

@Injectable({
  providedIn: 'root'
})
export class FinanceiroStore {

  private state = signal<FinanceiroState>({
    lancamentos: gerarLancamentosMock(),
    contas: [],
    cartoes: [],
    categorias: []
  })

  // SELECTORS

  lancamentos = computed(() => this.state().lancamentos)

  contas = computed(() => this.state().contas)

  cartoes = computed(() => this.state().cartoes)

  categorias = computed(() => this.state().categorias)


  totalReceitas = computed(() =>
    this.state().lancamentos
      .filter(l => l.tipo === TipoLancamento.RECEITA)
      .reduce((total, l) => total + l.valor, 0)
  )


  totalDespesas = computed(() =>
    this.state().lancamentos
      .filter(l => l.tipo === TipoLancamento.DESPESA)
      .reduce((total, l) => total + l.valor, 0)
  )


  saldo = computed(() =>
    this.totalReceitas() - this.totalDespesas()
  )


  saldoPrevisto = computed(() =>
    this.saldo()
  )


  ultimosLancamentos = computed(() => {

    return [...this.state().lancamentos]
      .sort((a, b) =>
        new Date(b.data).getTime() - new Date(a.data).getTime()
      )
      .slice(0, 5)

  })


  // ACTIONS

  adicionarLancamento(lancamento: Lancamento) {

    this.state.update(state => ({
      ...state,
      lancamentos: [...state.lancamentos, lancamento]
    }))

  }


  removerLancamento(id: string) {

    this.state.update(state => ({
      ...state,
      lancamentos: state.lancamentos.filter(l => l.id !== id)
    }))

  }


  atualizarLancamento(lancamento: Lancamento) {

    this.state.update(state => ({
      ...state,
      lancamentos: state.lancamentos.map(l =>
        l.id === lancamento.id ? lancamento : l
      )
    }))

  }

}