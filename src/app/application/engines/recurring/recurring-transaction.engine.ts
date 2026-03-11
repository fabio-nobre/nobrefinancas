import { Lancamento }
  from '@/app/domain/financeiro'

import { RecurringTransaction }
  from '../../models/recurring/recurring-transaction.model'

export class RecurringTransactionEngine {

  static detectar(
    lancamentos: Lancamento[]
  ): RecurringTransaction[] {

    const mapa = new Map<string, Lancamento[]>()

    for (const l of lancamentos) {

      if (!mapa.has(l.descricao)) {
        mapa.set(l.descricao, [])
      }

      mapa.get(l.descricao)!.push(l)

    }

    const recorrentes: RecurringTransaction[] = []

    for (const [descricao, lista] of mapa.entries()) {

      if (lista.length < 3) continue

      const valores =
        lista.map(l => l.valor)

      const valorMedio =
        valores.reduce((a, b) => a + b, 0) /
        valores.length

      const datas =
        lista.map(l => new Date(l.data))
          .sort((a, b) => a.getTime() - b.getTime())

      const intervalos: number[] = []

      for (let i = 1; i < datas.length; i++) {

        const diff =
          (datas[i].getTime() - datas[i - 1].getTime())
          / (1000 * 60 * 60 * 24)

        intervalos.push(diff)

      }

      const intervaloMedio =
        intervalos.reduce((a, b) => a + b, 0) /
        intervalos.length

      if (intervaloMedio > 25 && intervaloMedio < 35) {

        recorrentes.push({

          descricao,

          valorMedio,

          frequencia: lista.length,

          intervaloDias: intervaloMedio

        })

      }

    }

    return recorrentes

  }

}