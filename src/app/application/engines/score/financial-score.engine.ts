import { ScoreFinanceiro } from
  '../../models/score/score.model'

export class ScoreEngine {

  calcularScore(
    receitas: number,
    despesas: number
  ): ScoreFinanceiro {

    const percentual = despesas / receitas

    let score = 100

    if (percentual > 0.9) score = 40
    else if (percentual > 0.75) score = 60
    else if (percentual > 0.6) score = 80

    return {
      score,
      classificacao: score > 80
        ? 'Excelente'
        : score > 60
          ? 'Boa'
          : 'Atenção'
    }
  }
}