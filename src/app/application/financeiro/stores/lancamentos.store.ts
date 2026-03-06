import { Injectable, signal, computed } from '@angular/core'
import { Lancamento } from '@domain'

@Injectable({ providedIn: 'root' })
export class LancamentosStore {

  private _lancamentos = signal<Lancamento[]>([])

  lancamentos = this._lancamentos.asReadonly()

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

  adicionar(l: Lancamento) {
    this._lancamentos.update(v => [...v, l])
  }

}