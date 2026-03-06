import { Categoria } from '../entities/categoria/categoria.entity'

export const CATEGORIAS_PADRAO: Categoria[] = [

  new Categoria('alimentacao', 'Alimentação', '#ef4444'),
  new Categoria('moradia', 'Moradia', '#6366f1'),
  new Categoria('transporte', 'Transporte', '#22c55e'),
  new Categoria('lazer', 'Lazer', '#f59e0b'),
  new Categoria('saude', 'Saúde', '#14b8a6'),
  new Categoria('outros', 'Outros', '#64748b')

]