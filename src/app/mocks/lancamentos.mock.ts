import { Lancamento } from '@/app/domain/financeiro';

export const LANCAMENTOS_MOCK: Lancamento[] = [

  {
    id: '1',
    tipo: 'RECEITA',
    valor: 5000,
    valorTotal: 5000,
    descricao: 'Salário',
    parcelas: [],
    data: new Date(),
    categoriaId: 'Salário'
  },

  {
    id: '2',
    tipo: 'DESPESA',
    valor: 1500,
    valorTotal: 1500,
    descricao: 'Aluguel',
    parcelas: [],
    data: new Date(),
    categoriaId: 'Moradia'
  },

  {
    id: '3',
    tipo: 'DESPESA',
    valor: 600,
    valorTotal: 600,
    descricao: 'Supermercado',
    parcelas: [],
    data: new Date(),
    categoriaId: 'Alimentação'
  }

];