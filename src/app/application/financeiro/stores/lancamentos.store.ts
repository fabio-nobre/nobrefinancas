import { Injectable, signal, computed } from '@angular/core'
import { Lancamento } from '@/app/domain/financeiro'

@Injectable({ providedIn: 'root' })
export class LancamentosStore {

  private _lancamentos = signal<Lancamento[]>([])

  lancamentos = this._lancamentos.asReadonly()

  constructor() {
    this.carregar()
  }

  carregar() {

    const dados = localStorage.getItem('nobre-financas')

    if (!dados) return

    const lista = JSON.parse(dados)

    const lancamentos = lista.map((l: any) => ({
      ...l,
      data: new Date(l.data)
    }))

    this._lancamentos.set(lancamentos)

  }

  adicionar(lancamento: Lancamento) {
    this._lancamentos.update(lista => [...lista, lancamento])
  }

  remover(id: string) {
    this._lancamentos.update(lista =>
      lista.filter(l => l.id !== id)
    )
  }

  totalReceitas = computed(() =>
    this._lancamentos()
      .filter(l => l.tipo === 'RECEITA')
      .reduce((s, l) => s + l.valor, 0)
  )

  totalDespesas = computed(() =>
    this._lancamentos()
      .filter(l => l.tipo === 'DESPESA')
      .reduce((s, l) => s + l.valor, 0)
  )

}