import { Lancamento } from "@/app/domain/financeiro"

export interface FinancialForecast {

  saldoAtual: number
  receitasRestantes: number
  despesasRestantes: number
  saldoPrevisto: number

}

export class FinancialForecastEngine {

  static calcularPrevisaoMensal(
    lancamentos: Lancamento[],
    saldoAtual: number
  ): FinancialForecast {

    const hoje = new Date()

    const mes = hoje.getMonth()
    const ano = hoje.getFullYear()

    const futuros = lancamentos.filter(l => {

      const data = new Date(l.data)

      return (
        data.getMonth() === mes &&
        data.getFullYear() === ano &&
        data > hoje
      )

    })

    const receitasRestantes = futuros
      .filter(l => l.tipo === 'RECEITA')
      .reduce((s, l) => s + l.valor, 0)

    const despesasRestantes = futuros
      .filter(l => l.tipo === 'DESPESA')
      .reduce((s, l) => s + l.valor, 0)

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