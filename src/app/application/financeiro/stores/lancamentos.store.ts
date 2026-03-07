import { Injectable, signal, computed } from '@angular/core'
import { Lancamento } from '@/app/domain/financeiro'
import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'

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

    const lancamentos: Lancamento[] = lista.map((l: any) => ({
      ...l,
      data: new Date(l.data)
    }))

    this._lancamentos.set(lancamentos)

  }

  adicionar(lancamento: Lancamento) {

    this._lancamentos.update(lista => {
      const nova = [...lista, lancamento]
      localStorage.setItem('nobre-financas', JSON.stringify(nova))
      return nova
    })

  }



  totalReceitas = computed(() =>
    this._lancamentos()
      .filter(l => l.tipo === TipoLancamento.RECEITA)
      .reduce((s, l) => s + l.valor, 0)
  )

  totalDespesas = computed(() =>
    this._lancamentos()
      .filter(l => l.tipo === TipoLancamento.DESPESA)
      .reduce((s, l) => s + l.valor, 0)
  )

  private salvar() {
    localStorage.setItem(
      'nobre-financas',
      JSON.stringify(this._lancamentos())
    )
  }

}