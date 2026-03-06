import { Injectable, signal, computed } from '@angular/core'
import { Lancamento } from '@/app/domain/financeiro/entities/lancamento/lancamento.entity'
import { FinanceiroRepository } from '@/app/infrastructure/persistence/financeiro.repository'
import { inject } from '@angular/core'
import { FinanceEngine } from '@/app/domain/financeiro/services/finance-engine.service'

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
    FinanceEngine.totalReceitas(this._lancamentos())
  )

  totalDespesas = computed(() =>
    FinanceEngine.totalDespesas(this._lancamentos())
  )

  saldo = computed(() =>
    FinanceEngine.saldo(this._lancamentos())
  )

  ultimosLancamentos = computed(() =>
    FinanceEngine.ultimosLancamentos(this._lancamentos())
  )


  adicionarLancamento(l: Lancamento) {

    this._lancamentos.update(list =>
      this.persistir([...list, l])
    )

  }
  removerLancamento(id: string) {

    this._lancamentos.update(list =>
      this.persistir(
        list.filter(l => l.id !== id)
      )
    )

  }

  marcarParcelaPaga(lancamentoId: string, numero: number) {

    this._lancamentos.update(list =>
      this.persistir(

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
            l.cartaoId,
            l.categoriaId,
            parcelas
          )

        })

      )
    )

  }


  private persistir(lista: Lancamento[]) {

    this.repo.salvar(lista)

    return lista

  }

}