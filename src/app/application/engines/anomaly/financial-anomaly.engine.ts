import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialAnomaly }
  from '../../models/anomaly/financial-anomaly.model'

export class FinancialAnomalyEngine {

  static analisar(
    analytics: FinancialAnalyticsResult
  ): FinancialAnomaly {

    const categorias = analytics.categorias
    const lancamentos = analytics.lancamentos

    const totalDespesas = analytics.resumo.despesas

    // =============================
    // gasto muito acima da média
    // =============================

    const mediaCategoria =
      categorias.reduce((t, c) => t + c.valor, 0) /
      (categorias.length || 1)

    const gastosAcimaMedia =
      categorias
        .filter(c => c.valor > mediaCategoria * 2)
        .map(c => ({
          categoria: c.categoria,
          percentual:
            totalDespesas > 0
              ? (c.valor / totalDespesas) * 100
              : 0
        }))

    // =============================
    // valores incomuns
    // =============================

    const mediaValor =
      lancamentos.reduce((t, l) => t + l.valor, 0) /
      (lancamentos.length || 1)

    const valoresIncomuns =
      lancamentos
        .filter(l => l.valor > mediaValor * 3)
        .map(l => ({
          descricao: l.descricao,
          valor: l.valor
        }))

    // =============================
    // categoria fora do padrão
    // =============================

    const categoriaForaPadrao =
      categorias
        .filter(c =>
          totalDespesas > 0 &&
          (c.valor / totalDespesas) > 0.5
        )
        .map(c => ({
          categoria: c.categoria,
          percentual:
            (c.valor / totalDespesas) * 100
        }))

    return {

      gastosAcimaMedia,

      valoresIncomuns,

      categoriaForaPadrao

    }

  }

}