import { Lancamento } from '@/app/domain/financeiro/entities/lancamento/lancamento.entity'
import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const DESPESAS = [
  { descricao: 'Supermercado', categoria: 'alimentacao' },
  { descricao: 'Restaurante', categoria: 'alimentacao' },
  { descricao: 'Gasolina', categoria: 'transporte' },
  { descricao: 'Uber', categoria: 'transporte' },
  { descricao: 'Netflix', categoria: 'entretenimento' },
  { descricao: 'Cinema', categoria: 'entretenimento' },
  { descricao: 'Farmácia', categoria: 'saude' },
  { descricao: 'Internet', categoria: 'servicos' },
  { descricao: 'Energia', categoria: 'servicos' }
]

const RECEITAS = [
  { descricao: 'Salário', categoria: 'salario', valor: 5000 },
  { descricao: 'Freelance', categoria: 'freelance', valor: 800 },
  { descricao: 'Venda', categoria: 'extra', valor: 400 }
]

export function gerarLancamentosMock(): Lancamento[] {

  const lancamentos: Lancamento[] = []

  const hoje = new Date()

  let id = 1

  for (let mes = 0; mes < 12; mes++) {

    const dataBase = new Date(hoje.getFullYear(), hoje.getMonth() - mes, 1)

    // receita principal (salário)
    lancamentos.push(
      new Lancamento(
        String(id++),
        'Salário',
        5000,
        new Date(dataBase.getFullYear(), dataBase.getMonth(), 5),
        TipoLancamento.RECEITA,
        'conta-1',
        undefined,
        'salario',
        []
      )
    )

    // receita extra ocasional
    if (Math.random() > 0.5) {
      lancamentos.push(
        new Lancamento(
          String(id++),
          'Freelance',
          random(300, 1500),
          new Date(dataBase.getFullYear(), dataBase.getMonth(), random(10, 25)),
          TipoLancamento.RECEITA,
          'conta-1',
          undefined,
          'freelance',
          []
        )
      )
    }

    // despesas do mês
    const qtdDespesas = random(8, 15)

    for (let i = 0; i < qtdDespesas; i++) {

      const despesa = DESPESAS[random(0, DESPESAS.length - 1)]

      lancamentos.push(
        new Lancamento(
          String(id++),
          despesa.descricao,
          random(20, 400),
          new Date(dataBase.getFullYear(), dataBase.getMonth(), random(1, 28)),
          TipoLancamento.DESPESA,
          'conta-1',
          undefined,
          despesa.categoria,
          []
        )
      )

    }

  }

  return lancamentos

}