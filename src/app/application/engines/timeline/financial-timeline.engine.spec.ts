import { FinancialTimelineEngine }
  from './financial-timeline.engine'

describe('FinancialTimelineEngine', () => {

  it('deve gerar eventos futuros', () => {

    const lancamentos: any[] = [

      {
        descricao: 'Salário',
        valor: 5000,
        tipo: 'RECEITA',
        data: '2099-01-10'
      }

    ]

    const timeline =
      FinancialTimelineEngine.gerar(
        lancamentos,
        1000
      )

    expect(timeline.length).toBe(1)

  })

})