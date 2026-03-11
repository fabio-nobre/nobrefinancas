import { Lancamento }
  from '@/app/domain/financeiro'

import { FinancialTimelineEvent }
  from '../../models/timeline/financial-timeline-event.model'

export class FinancialTimelineEngine {

  static gerar(
    lancamentos: Lancamento[],
    saldoAtual: number
  ): FinancialTimelineEvent[] {

    const hoje = new Date()

    const futuros = lancamentos
      .filter(l => new Date(l.data) >= hoje)
      .sort(
        (a, b) =>
          new Date(a.data).getTime() -
          new Date(b.data).getTime()
      )

    let saldo = saldoAtual

    const eventos: FinancialTimelineEvent[] = []

    for (const l of futuros) {

      saldo += l.tipo === 'RECEITA'
        ? l.valor
        : -l.valor

      eventos.push({

        data: new Date(l.data),

        descricao: l.descricao,

        valor:
          l.tipo === 'RECEITA'
            ? l.valor
            : -l.valor,

        saldoProjetado: saldo

      })

    }

    return eventos

  }

}