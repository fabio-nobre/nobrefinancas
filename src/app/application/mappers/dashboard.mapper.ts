import { DashboardViewModel } from '../view-models/dashboard.viewmodel';
import { FinancialIntelligenceResult } from '../dtos/financial-intelligence-result.dto';

export class DashboardMapper {

  static toViewModel(data: FinancialIntelligenceResult): DashboardViewModel {

    return {
      resumo: {
        saldo: data.saldo,
        receitas: data.receitas,
        despesas: data.despesas
      },

      categorias: data.categorias,

      inteligencia: {
        score: data.score,
        risco: data.risco,
        insights: data.insights,
        recomendacoes: data.recomendacoes,
        narrativa: data.narrativa
      },

      budget: data.budget,

      alertas: [
        ...data.anomalias.map(a => ({
          tipo: 'anomalia',
          mensagem: a.descricao
        })),
        ...data.insights.map(i => ({
          tipo: 'info',
          mensagem: i.mensagem
        }))
      ]
    };
  }
}