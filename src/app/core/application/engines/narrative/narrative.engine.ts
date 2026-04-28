// =============================
// TIPOS
// =============================

type NarrativeStatus = 'POSITIVO' | 'ATENCAO' | 'CRITICO';

export type Narrative = {
  status: NarrativeStatus;

  titulo: string;

  resumo: string;

  destaques: string[];

  acoes: string[];
};

// =============================
// ENGINE
// =============================

export class NarrativeEngine {

  execute(state: any): Narrative {

    const score = state.score ?? { value: 0, metricas: {} };
    const recommendations = state.recommendations ?? [];
    const budget = state.budget ?? {};

    const scoreValue = score.value ?? 0;

    const status = this.definirStatus(scoreValue);

    const titulo = this.gerarTitulo(status);

    const destaques = this.gerarDestaques(score, budget);

    const acoes = this.gerarAcoes(recommendations);

    const resumo = this.gerarResumo({
      status,
      score: scoreValue,
      destaques
    });

    return {
      status,
      titulo,
      resumo,
      destaques,
      acoes
    };
  }

  // =============================
  // STATUS
  // =============================

  private definirStatus(score: number): NarrativeStatus {
    if (score >= 80) return 'POSITIVO';
    if (score >= 50) return 'ATENCAO';
    return 'CRITICO';
  }

  private gerarTitulo(status: NarrativeStatus): string {
    switch (status) {
      case 'POSITIVO':
        return 'Sua vida financeira está saudável';
      case 'ATENCAO':
        return 'Atenção à sua saúde financeira';
      case 'CRITICO':
        return 'Situação financeira crítica';
    }
  }

  // =============================
  // DESTAQUES (problemas reais)
  // =============================

  private gerarDestaques(score: any, budget: any): string[] {

    const destaques: string[] = [];

    if ((score.metricas?.poupanca ?? 0) < 30) {
      destaques.push('Baixa capacidade de poupança');
    }

    if ((score.metricas?.controleDespesas ?? 0) < 50) {
      destaques.push('Gastos acima do ideal');
    }

    if ((score.metricas?.risco ?? 0) > 70) {
      destaques.push('Risco financeiro elevado');
    }

    if ((budget?.saldo ?? 0) < 0) {
      destaques.push('Saldo negativo no período');
    }

    return destaques;
  }

  // =============================
  // AÇÕES (derivadas das recomendações)
  // =============================

  private gerarAcoes(recommendations: any[]): string[] {

    return recommendations
      .slice(0, 3)
      .map(r => r.titulo);
  }

  // =============================
  // RESUMO (texto principal)
  // =============================

  private gerarResumo(input: any): string {

    const { status, score, destaques } = input;

    if (status === 'POSITIVO') {
      return `Seu score está em ${score}. Continue mantendo bons hábitos financeiros.`;
    }

    if (status === 'ATENCAO') {
      return `Seu score está em ${score}. Existem sinais de atenção: ${destaques.join(', ')}.`;
    }

    return `Seu score está em ${score}. Situação crítica: ${destaques.join(', ')}. Ação imediata recomendada.`;
  }
}