import { Injectable, signal, computed } from '@angular/core'
import { Lancamento } from '@domain'
import { FinanceiroRepository } from '@/app/infrastructure/persistence/financeiro.repository'
import { inject } from '@angular/core'
import { FinanceEngine } from '@domain'
import { FinanceAnalyticsEngine } from '@/app/domain/financeiro/finance-analytics.engine'
import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'

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
          TipoLancamento.RECEITA
        ),

        new Lancamento(
          crypto.randomUUID(),
          'Supermercado',
          350,
          new Date(),
          TipoLancamento.DESPESA
        ),

        new Lancamento(
          crypto.randomUUID(),
          'Netflix',
          39,
          new Date(),
          TipoLancamento.DESPESA
        )
      ]

      this._lancamentos.set(mock)

    }

  }

  receitas = computed(() =>
    this._lancamentos().filter(l => l.tipo === TipoLancamento.RECEITA)
  )

  despesas = computed(() =>
    this._lancamentos().filter(l => l.tipo === TipoLancamento.DESPESA)
  )

  totalReceitas = computed(() => {

    return this._lancamentos()
      .filter(l => l.tipo === TipoLancamento.RECEITA)
      .reduce((s, l) => s + l.valor, 0)

  })

  totalDespesas = computed(() => {

    return this._lancamentos()
      .filter(l => l.tipo === TipoLancamento.DESPESA)
      .reduce((s, l) => s + l.valor, 0)

  })

  saldo = computed(() => {

    const lancamentos = this._lancamentos()

    return lancamentos.reduce((s, l) => {

      return l.tipo === TipoLancamento.RECEITA
        ? s + l.valor
        : s - l.valor

    }, 0)

  })

  ultimosLancamentos = computed(() => {

    return [...this._lancamentos()]
      .sort((a, b) => b.data.getTime() - a.data.getTime())
      .slice(0, 5)

  })

  saldoPrevisto = computed(() => {

    return this.saldo()
      + this.totalReceitas()
      - this.totalDespesas()

  })


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



  categoriaDominante() {

    return FinanceAnalyticsEngine.categoriaDominante(
      this.lancamentos()
    )

  }

  mediaMensalDespesas() {

    return FinanceAnalyticsEngine.mediaMensalDespesas(
      this.lancamentos()
    )

  }

  variacaoMensalDespesas() {

    return FinanceAnalyticsEngine.variacaoMensalDespesas(
      this.lancamentos()
    )

  }

  previsaoSaldoMes() {

    return FinanceAnalyticsEngine.previsaoSaldoMes(
      this.saldo(),
      this.totalReceitas(),
      this.totalDespesas()
    )

  }

  private persistir(lista: Lancamento[]) {

    this.repo.salvar(lista)

    return lista

  }


}