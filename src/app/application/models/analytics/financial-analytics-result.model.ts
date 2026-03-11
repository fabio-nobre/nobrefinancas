import { EvolucaoMensal, CategoriaResumo }
  from '../../engines/analytics/finance-analytics.engine'

import { ComparacaoMensal }
  from '../../../domain/financeiro/value-objects/comparacao-mensal'
import { Lancamento } from '@/app/domain/financeiro'

export interface FinancialAnalyticsResult {

  lancamentos: Lancamento[]

  resumo: {
    receitas: number
    despesas: number
    saldo: number
  }

  evolucaoMensal: EvolucaoMensal[]

  categorias: CategoriaResumo[]

  maiorCategoria: CategoriaResumo | null

  comparacaoMensal: ComparacaoMensal

  mediaMensalDespesas: number

  graficoEvolucao: {
    labels: string[]
    receitas: number[]
    despesas: number[]
  }

  graficoCategorias: {
    labels: string[]
    valores: number[]
  }

}