import { FinancialContext } from '../types/financial.types';
import { FinancialForecastEngine } from '../engines/forecast/financial-forecast.engine';
import { FinancialRiskEngine } from '../engines/risk/financial-risk.engine';
import { FinancialScoreEngine } from '../engines/score/financial-score.engine';
import { FinancialAnomalyEngine } from '../engines/anomaly/financial-anomaly.engine';
import { FinancialBudgetEngine } from '../engines/budget/financial-budget.engine';
import { FinancialInsightsEngine } from '../engines/insights/financial-insights.engine';
import { FinancialRecommendationEngine } from '../engines/recommendation/financial-recommendation.engine';
import { FinancialNarrativeEngine } from '../engines/narrative/financial-narrative.engine';

export class FinancialIntelligencePipeline {

  private forecastEngine = new FinancialForecastEngine();
  private riskEngine = new FinancialRiskEngine();
  private scoreEngine = new FinancialScoreEngine();
  private anomalyEngine = new FinancialAnomalyEngine();
  private budgetEngine = new FinancialBudgetEngine();
  private insightsEngine = new FinancialInsightsEngine();
  private recommendationEngine = new FinancialRecommendationEngine();
  private narrativeEngine = new FinancialNarrativeEngine();

  process(context: FinancialContext) {

    const forecast = this.forecastEngine.process(context);

    const risco = this.riskEngine.process({
      context,
      forecast
    });

    const score = this.scoreEngine.process({
      receitas: context.receitas,
      despesas: context.despesas,
      risco
    });

    const anomalias = this.anomalyEngine.process(context);

    const budget = this.budgetEngine.process(context);

    const insights = this.insightsEngine.process({
      context,
      forecast,
      risco,
      score,
      anomalias,
      budget
    });

    const recomendacoes = this.recommendationEngine.process({
      context,
      insights,
      risco,
      score
    });

    const narrativa = this.narrativeEngine.process({
      context,
      insights,
      recomendacoes
    });

    // 🔥 GERAR CATEGORIAS DINÂMICAS
    const categoriasMap = new Map<string, number>();

    for (const l of context.lancamentos) {

      if (l.tipo === 'DESPESA') {

        const categoria = l.categoriaId || 'Outros';

        const atual = categoriasMap.get(categoria) || 0;

        categoriasMap.set(categoria, atual + l.valor);

      }
    }

    const categorias = Array.from(categoriasMap.entries()).map(([categoria, valor]) => ({
      categoria,
      valor
    }));

    // ✅ RETORNO FINAL
    return {
      forecast,
      risco,
      score,

      anomalias: [anomalias],
      insights: [insights],
      recomendacoes: [recomendacoes],

      budget,
      narrativa: narrativa.texto,

      saldo: budget.saldo,
      receitas: context.receitas,
      despesas: context.despesas,

      // 🔥 AGORA FUNCIONA
      categorias
    };
  }
}