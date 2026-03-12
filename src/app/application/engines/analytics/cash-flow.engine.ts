import { Lancamento } from '@/app/domain/financeiro/entities/lancamento/lancamento.entity'
import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'
import { CashFlowItem } from '../../models/analytics/cash-flow.model'

export class CashFlowEngine {

  static calcular(lancamentos: Lancamento[]): CashFlowItem[] {

    const mapa = new Map<string, CashFlowItem>()

    for (const l of lancamentos) {

      const data = new Date(l.data)

      const chave = `${data.getFullYear()}-${data.getMonth()}`

      if (!mapa.has(chave)) {

        mapa.set(chave, {

          mes: `${data.getMonth() + 1}/${data.getFullYear()}`,

          receitas: 0,

          despesas: 0,

          saldo: 0,

          saldoAcumulado: 0

        })

      }

      const item = mapa.get(chave)!

      if (l.tipo === TipoLancamento.RECEITA) {

        item.receitas += l.valor

      }

      if (l.tipo === TipoLancamento.DESPESA) {

        item.despesas += l.valor

      }

      item.saldo = item.receitas - item.despesas

    }

    const meses = Array.from(mapa.values())

    let saldoAcumulado = 0

    for (const m of meses) {

      saldoAcumulado += m.saldo

      m.saldoAcumulado = saldoAcumulado

    }

    return meses

  }

}