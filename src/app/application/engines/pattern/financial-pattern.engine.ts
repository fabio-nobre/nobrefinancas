import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialPattern }
  from '../../models/pattern/financial-pattern.model'

export class FinancialPatternEngine {

  static analisar(
    analytics: FinancialAnalyticsResult
  ): FinancialPattern {

    const lancamentos = analytics.lancamentos

    // =============================
    // detectar recorrência
    // =============================

    const mapa = new Map<string, number[]>()

    for (const l of lancamentos) {

      const chave = l.descricao

      if (!mapa.has(chave)) {
        mapa.set(chave, [])
      }

      mapa.get(chave)!.push(l.valor)

    }

    const recorrentes = Array
      .from(mapa.entries())
      .filter(([_, valores]) => valores.length >= 3)
      .map(([descricao, valores]) => ({

        descricao,

        frequencia: valores.length,

        valorMedio:
          valores.reduce((a, b) => a + b, 0) /
          valores.length

      }))

    // =============================
    // categorias dominantes
    // =============================

    const totalDespesas =
      analytics.resumo.despesas

    const categoriasDominantes =
      analytics.categorias
        .map(c => ({
          categoria: c.categoria,
          percentual:
            totalDespesas > 0
              ? (c.valor / totalDespesas) * 100
              : 0
        }))
        .filter(c => c.percentual > 20)

    // =============================
    // frequência de gastos
    // =============================

    const gastoFrequente =
      lancamentos.length > 50

    return {

      despesasRecorrentes: recorrentes,

      categoriasDominantes,

      gastoFrequente

    }

  }

}