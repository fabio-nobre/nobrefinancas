import { FinanceAnalyticsEngine }
  from './finance-analytics.engine'

describe('FinanceAnalyticsEngine', () => {

  it('deve calcular resumo financeiro', () => {

    const lancamentos: any[] = [

      { valor: 1000, tipo: 'RECEITA', data: new Date() },

      { valor: 400, tipo: 'DESPESA', data: new Date() }

    ]

    const analytics =
      FinanceAnalyticsEngine.calcular(lancamentos)

    expect(analytics.resumo.receitas).toBe(1000)

    expect(analytics.resumo.despesas).toBe(400)

  })

})