import { RecurringTransactionEngine }
  from './recurring-transaction.engine'

describe('RecurringTransactionEngine', () => {

  it('deve detectar transações recorrentes', () => {

    const lancamentos: any[] = [

      { descricao: 'Netflix', valor: 40, data: '2024-01-10' },

      { descricao: 'Netflix', valor: 40, data: '2024-02-10' },

      { descricao: 'Netflix', valor: 40, data: '2024-03-10' }

    ]

    const recorrentes =
      RecurringTransactionEngine.detectar(
        lancamentos
      )

    expect(recorrentes.length).toBe(1)

  })

})