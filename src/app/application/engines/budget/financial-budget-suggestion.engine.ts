import { Lancamento } from '@/app/domain/financeiro'
import { BudgetSuggestion } from '../../models/budget/budget-suggestion.model'

export class FinancialBudgetSuggestionEngine {

  static calcular(
    lancamentos: Lancamento[]
  ): BudgetSuggestion[] {

    const despesas =
      lancamentos.filter(
        l => l.tipo === 'DESPESA'
      )

    const categorias =
      Array.from(
        new Set(
          despesas
            .map(l => l.categoriaId)
            .filter((c): c is string => !!c)
        )
      )

    return categorias.map(categoria => {

      const gastosCategoria =
        despesas
          .filter(l => l.categoriaId === categoria)

      const total =
        gastosCategoria.reduce(
          (sum, l) => sum + l.valor,
          0
        )

      const media =
        total / gastosCategoria.length

      const sugestao =
        media * 1.1

      return {

        categoria,

        gastoMedio: media,

        sugestaoOrcamento: sugestao

      }

    })

  }

}