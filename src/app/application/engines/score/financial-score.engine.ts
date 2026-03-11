import { FinancialAnalyticsResult }
  from '../../models/analytics/financial-analytics-result.model'

import { FinancialScore }
  from '../../models/score/financial-score.model'

export class FinancialScoreEngine {

  static calcular(
    analytics: FinancialAnalyticsResult
  ): FinancialScore {

    const receitas = analytics.resumo.receitas
    const despesas = analytics.resumo.despesas

    const saldo = analytics.resumo.saldo

    // =============================
    // taxa de poupança
    // =============================

    const taxaPoupanca =
      receitas > 0
        ? saldo / receitas
        : 0

    // =============================
    // controle de despesas
    // =============================

    const controleDespesas =
      receitas > 0
        ? 1 - (despesas / receitas)
        : 0

    // =============================
    // estabilidade mensal
    // =============================

    const variacoes =
      analytics.evolucaoMensal.map(m =>
        Math.abs(m.receitas - m.despesas)
      )

    const mediaVariacao =
      variacoes.reduce((a, b) => a + b, 0) /
      (variacoes.length || 1)

    const estabilidade =
      Math.max(0, 1 - mediaVariacao / 5000)

    // =============================
    // score final
    // =============================

    const scoreBruto =
      taxaPoupanca * 35 +
      controleDespesas * 25 +
      estabilidade * 20

    const score =
      Math.max(0, Math.min(100, Math.round(scoreBruto * 100)))

    return {

      score,

      classificacao:
        score < 40
          ? 'critico'
          : score < 60
            ? 'instavel'
            : score < 80
              ? 'bom'
              : 'excelente',

      metricas: {

        taxaPoupanca,
        controleDespesas,
        estabilidade

      }

    }

  }

}