import { Injectable, signal, computed } from '@angular/core'
import { Lancamento } from '@domain'
import { FinanceiroRepository } from '@/app/infrastructure/persistence/financeiro.repository'
import { inject } from '@angular/core'
import { FinanceEngine } from '@domain'

@Injectable({
  providedIn: 'root'
})
export class FinanceiroStore {

  repo = inject(FinanceiroRepository)

  private _lancamentos = signal<Lancamento[]>([])

  lancamentos = this._lancamentos.asReadonly()

  constructor() {
    const dados = this.repo.carregar()

    if (dados.length) {

      this._lancamentos.set(dados)

    } else {

      const mock = [
        new Lancamento(
          crypto.randomUUID(),
          'Salário',
          5000,
          new Date(),
          'RECEITA'
        ),

        new Lancamento(
          crypto.randomUUID(),
          'Supermercado',
          350,
          new Date(),
          'DESPESA'
        ),

        new Lancamento(
          crypto.randomUUID(),
          'Netflix',
          39,
          new Date(),
          'DESPESA'
        )
      ]

      this._lancamentos.set(mock)

    }

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

  saldoPrevisto = computed(() =>
    FinanceEngine.saldoPrevisto(this._lancamentos())
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

  maiorCategoriaGasto() {

    const lancamentos = this.lancamentos()

    const despesas = lancamentos.filter(l => l.tipo === 'DESPESA')

    const mapa: Record<string, number> = {}

    for (const l of despesas) {

      const categoria = l.categoriaId ?? 'Outros'

      mapa[categoria] = (mapa[categoria] ?? 0) + l.valor

    }

    const ordenado = Object.entries(mapa)
      .sort((a, b) => b[1] - a[1])

    return ordenado[0]?.[0] ?? '—'

  }

  mediaDespesasMensais() {

    const lancamentos = this.lancamentos()

    const despesas = lancamentos.filter(l => l.tipo === 'DESPESA')

    if (!despesas.length) return 0

    const total = despesas.reduce((s, l) => s + l.valor, 0)

    return total / 12

  }

  previsaoSaldoMes() {

    const saldoAtual = this.saldo()

    const receitas = this.totalReceitas()

    const despesas = this.totalDespesas()

    return saldoAtual + receitas - despesas

  }


  private persistir(lista: Lancamento[]) {

    this.repo.salvar(lista)

    return lista

  }


}