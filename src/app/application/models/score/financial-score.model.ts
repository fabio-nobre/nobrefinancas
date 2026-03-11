export interface FinancialScore {

  score: number

  classificacao:
  | 'critico'
  | 'instavel'
  | 'bom'
  | 'excelente'

  metricas: {

    taxaPoupanca: number
    controleDespesas: number
    estabilidade: number

  }

}