export interface CriarLancamentoCommand {

  descricao: string

  valor: number

  data: Date

  contaId: string

  categoriaId: string

  tipo: 'receita' | 'despesa'
}