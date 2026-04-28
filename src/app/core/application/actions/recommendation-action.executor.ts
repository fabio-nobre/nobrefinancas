import { RecommendationAction } from '../engines/recommendation/recommendation.types';

export class RecommendationActionExecutor {

  execute(action: { tipo: RecommendationAction; payload?: any }, context: any) {

    switch (action.tipo) {

      case 'REDUZIR_GASTOS':
        return this.reduzirGastos(context);

      case 'AJUSTAR_CATEGORIA':
        return this.ajustarCategoria(action.payload);

      case 'REVISAR_ORCAMENTO':
        return this.revisarOrcamento(context);

      case 'REDUZIR_FREQUENCIA':
        return this.reduzirFrequencia(context);

      default:
        console.warn('Ação não reconhecida:', action.tipo);
        return null;
    }
  }

  // =============================
  // AÇÕES
  // =============================

  private reduzirGastos(context: any) {

    const despesas = context?.budget?.despesas ?? 0;
    const alvoReducao = despesas * 0.1;

    console.log('💡 Reduzir gastos em:', alvoReducao);

    return {
      sucesso: true,
      mensagem: `Redução sugerida de R$ ${alvoReducao.toFixed(2)}`
    };
  }

  private ajustarCategoria(categoria: string) {

    console.log('💡 Ajustando categoria:', categoria);

    return {
      sucesso: true,
      mensagem: `Categoria ${categoria} ajustada`
    };
  }

  private revisarOrcamento(context: any) {

    console.log('💡 Revisando orçamento');

    return {
      sucesso: true,
      mensagem: 'Orçamento revisado com sucesso'
    };
  }

  private reduzirFrequencia(context: any) {

    console.log('💡 Reduzindo frequência de gastos');

    return {
      sucesso: true,
      mensagem: 'Redução de frequência aplicada'
    };
  }
}