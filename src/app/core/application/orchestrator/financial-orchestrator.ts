export class FinancialOrchestrator {

  constructor(private pipeline: any) { }

  execute(context: any) {
    const state = this.pipeline.run(context);

    return {
      // CORE
      score: state.score ?? { value: 0 },

      status: this.resolveStatus(state.score?.value ?? 0),

      insights: state.insights ?? [],
      risks: state.risks ?? [],

      alerts: [
        ...(state.risks ?? []),
        ...(state.anomalies ?? [])
      ],

      recommendations: state.recommendations ?? [],

      // 🔥 ESSENCIAL PRA SUA UI
      budget: state.budget ?? {
        receitas: 0,
        despesas: 0,
        saldo: 0
      },

      forecast: state.forecast ?? {
        saldo: 0,
        receitas: 0,
        despesas: 0
      },

      patterns: state.patterns ?? [],

      anomalies: state.anomalies ?? [],

      narrative: state.narrative ?? { message: '' }
    };
  }

  private resolveStatus(score: number) {
    if (score >= 80) return 'HEALTHY';
    if (score >= 50) return 'WARNING';
    return 'CRITICAL';
  }
}