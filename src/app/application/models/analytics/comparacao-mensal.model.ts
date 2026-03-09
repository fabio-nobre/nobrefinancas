export interface ComparacaoMensal {

  mesAtual: {
    receitas: number
    despesas: number
    saldo: number
  }

  mesAnterior: {
    receitas: number
    despesas: number
    saldo: number
  }

  variacao: {
    receitas: number
    despesas: number
    saldo: number
  }
}