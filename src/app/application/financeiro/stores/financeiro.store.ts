import { Injectable, signal, computed } from '@angular/core'
import { Lancamento } from '@/app/domain/financeiro/entities/lancamento.entity'
import { FinanceiroRepository } from '@/app/infrastructure/persistence/financeiro.repository'
import { inject } from '@angular/core'


@Injectable({
  providedIn: 'root'
})
export class FinanceiroStore {

  repo = inject(FinanceiroRepository)

  private _lancamentos = signal<Lancamento[]>([])

  lancamentos = this._lancamentos.asReadonly()

  constructor() {

    const dados = this.repo.carregar()

    this._lancamentos.set(dados)

  }

  receitas = computed(() =>
    this._lancamentos().filter(l => l.tipo === 'RECEITA')
  )

  despesas = computed(() =>
    this._lancamentos().filter(l => l.tipo === 'DESPESA')
  )

  totalReceitas = computed(() =>
    this.receitas()
      .reduce((t, l) => t + l.valorTotal, 0)
  )

  totalDespesas = computed(() =>
    this.despesas()
      .reduce((t, l) => t + l.valorTotal, 0)
  )

  saldo = computed(() =>
    this.totalReceitas() - this.totalDespesas()
  )

  adicionarLancamento(l: Lancamento) {

    this._lancamentos.update(list => {

      const nova = [...list, l]

      this.repo.salvar(nova)

      return nova

    })

  }

  removerLancamento(id: string) {

    this._lancamentos.update(list =>
      list.filter(l => l.id !== id)
    )

  }

  marcarParcelaPaga(lancamentoId: string, numero: number) {

    this._lancamentos.update(list =>
      list.map(l => {

        if (l.id !== lancamentoId) return l

        const parcelas = l.parcelas.map(p => {

          if (p.numero === numero) {

            p.marcarComoPaga(p.valor)

          }

          return p
        })

        return new Lancamento(
          l.id,
          l.descricao,
          l.valor,
          l.data,
          l.tipo,
          l.contaId,
          l.categoriaId,
          parcelas
        )

      })
    )

  }

  ultimosLancamentos = computed(() =>

    [...this._lancamentos()]
      .sort((a, b) => b.data.getTime() - a.data.getTime())
      .slice(0, 5)

  )

}