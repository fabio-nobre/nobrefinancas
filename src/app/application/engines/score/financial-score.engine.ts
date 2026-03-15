
import { FinancialScore }
  from '@/app/application/models/score/financial-score.model'


export class FinancialScoreEngine {

  static calcular(data: {
    analytics: any
    budgets: any[]
    recurring: any[]
  }): FinancialScore {


    const receitas = data.analytics.resumo.receitas
    const despesas = data.analytics.resumo.despesas

    const totalOrcado =
      data.budgets.reduce((s, b) => s + (b.limiteMensal ?? 0), 0)

    const totalGastoCategorias =
      despesas

    const totalAssinaturas =
      data.recurring.length

    const taxaPoupanca =
      receitas === 0
        ? 0
        : (receitas - despesas) / receitas

    const scorePoupanca =
      Math.min(100, taxaPoupanca * 100)

    const controleOrcamento =
      totalOrcado > 0
        ? Math.max(
          0,
          100 -
          ((totalGastoCategorias - totalOrcado) /
            totalOrcado) *
          100
        )
        : 100

    const estabilidade =
      receitas > despesas ? 100 : 40

    const scoreAssinaturas =
      totalAssinaturas <= 2
        ? 100
        : Math.max(
          40,
          100 - totalAssinaturas * 10
        )

    const score =
      scorePoupanca * 0.3 +
      controleOrcamento * 0.3 +
      estabilidade * 0.2 +
      scoreAssinaturas * 0.2


    return {

      score: Math.round(score),

      classificacao: this.classificar(score),

      metricas: {

        taxaPoupanca: Math.round(scorePoupanca),

        controleDespesas: Math.round(controleOrcamento),

        estabilidade: Math.round(estabilidade)

      }

    }
  }

  private static classificar(score: number) {

    if (score >= 80) return 'excelente'

    if (score >= 60) return 'bom'

    if (score >= 40) return 'instavel'

    return 'critico'

  }
}