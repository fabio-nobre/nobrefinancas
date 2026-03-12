import { FinancialBudgetEngine }
  from './financial-budget.engine'

describe('FinancialBudgetEngine', () => {

  it('deve calcular status do orçamento', () => {

    const analytics: any = {

      categorias: [
        { categoria: 'alimentacao', valor: 500 }
      ]

    }

    const budgets = [

      { categoriaId: 'alimentacao', limiteMensal: 800 }

    ]

    const resultado =
      FinancialBudgetEngine.calcular(
        analytics,
        budgets
      )

    expect(resultado[0].status).toBe('ok')

  })

})