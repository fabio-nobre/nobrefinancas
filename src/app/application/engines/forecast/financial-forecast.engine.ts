import { FinancialAnalyticsResult }
  from "../../models/analytics/financial-analytics-result.model"

import { TipoLancamento }
  from "@/app/domain/financeiro/enums/tipo-lancamento.enum"

export interface FinancialForecast {

  saldoAtual: number
  receitasRestantes: number
  despesasRestantes: number
  saldoPrevisto: number

}

export class FinancialForecastEngine {

  static calcularPrevisaoMensal(
    analytics: FinancialAnalyticsResult
  ): FinancialForecast {

    const hoje = new Date()

    const mes = hoje.getMonth()
    const ano = hoje.getFullYear()

    const lancamentos = analytics.lancamentos

    const futuros = lancamentos.filter(l => {

      const data = new Date(l.data)

      return (
        data.getMonth() === mes &&
        data.getFullYear() === ano &&
        data > hoje
      )

    })

    const receitasRestantes = futuros
      .filter(l => l.tipo === TipoLancamento.RECEITA)
      .reduce((s, l) => s + l.valor, 0)

    const despesasRestantes = futuros
      .filter(l => l.tipo === TipoLancamento.DESPESA)
      .reduce((s, l) => s + l.valor, 0)

    const saldoAtual = analytics.resumo.saldo

    const saldoPrevisto =
      saldoAtual +
      receitasRestantes -
      despesasRestantes

    return {

      saldoAtual,
      receitasRestantes,
      despesasRestantes,
      saldoPrevisto

    }

  }

}