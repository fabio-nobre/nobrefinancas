import { Injectable, computed, inject } from '@angular/core';
import { ObterDashboardHandler } from '@/app/application/handlers/obter-dashboard.handler';

type GrupoLancamentos = {
  categoria: string;
  lancamentos: any[];
};

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  private handler = inject(ObterDashboardHandler);

  // =============================
  // VIEW MODEL BASE
  // =============================

  vm = computed(() => {
    const result = this.handler.executar();

    console.log('🔥 RESULT RAW:', result);

    return result;
  });

  // =============================
  // RESUMO
  // =============================

  receitas = computed(() => this.vm()?.resumo?.receitas ?? 0);
  despesas = computed(() => this.vm()?.resumo?.despesas ?? 0);
  saldo = computed(() => this.vm()?.resumo?.saldo ?? 0);

  // =============================
  // PREVISÃO
  // =============================

  previsaoFinanceira = computed(() => ({
    saldoPrevisto: this.saldo() * 1.1,
    receitasRestantes: 500,
    despesasRestantes: 300
  }));

  // =============================
  // ALERTAS (REAIS)
  // =============================

  alertsFinanceiros = computed(() =>
    this.vm()?.alertas ?? []
  );

  // =============================
  // SCORE (INTELIGÊNCIA)
  // =============================

  scoreFinanceiro = computed(() => {

    const intel = this.vm()?.inteligencia;

    // 🔥 DEBUG (pode remover depois)
    console.log('🔥 SCORE RAW:', intel?.score);

    return {
      score:
        typeof intel?.score === 'number'
          ? intel.score
          : intel?.score?.valor
          ?? intel?.score?.score
          ?? 0,

      classificacao:
        intel?.score?.classificacao
        ?? 'N/A',

      metricas: {
        taxaPoupanca:
          intel?.score?.taxaPoupanca ?? 30,

        controleDespesas:
          intel?.score?.controleDespesas ?? 70,

        estabilidade:
          intel?.score?.estabilidade ?? 60
      }
    };
  });

  trendFinanceiro = computed(() => 'estável');

  riskFinanceiro = computed(() =>
    this.vm()?.inteligencia?.risco?.risco ?? 0
  );

  projectionFinanceira = computed(() => ({}));

  scoreHistory = computed(() => [
    { mes: 'Jan', score: 60 },
    { mes: 'Fev', score: 70 },
    { mes: 'Mar', score: 80 }
  ]);

  // =============================
  // INSIGHTS / IA
  // =============================

  insights = computed(() =>
    this.vm()?.inteligencia?.insights ?? []
  );

  assinaturasDetectadas = computed(() => [
    { descricao: 'Netflix', valorMedio: 39.9 }
  ]);

  // =============================
  // META ECONOMIA
  // =============================

  metaEconomiaMensal = computed(() => ({
    metaMensal: 500,
    economiaAtual: this.saldo(),
    percentual: 60,
    previsao: 700
  }));

  statusMetaEconomia = computed(() => ({
    tipo: 'SUCESSO',
    mensagem: 'Você está indo bem'
  }));

  // =============================
  // BUDGET (INTELIGÊNCIA)
  // =============================

  budgets = computed(() =>
    this.vm()?.budget ?? {}
  );

  budgetSuggestions = computed(() =>
    this.vm()?.inteligencia?.recomendacoes ?? []
  );

  definirBudget(categoria: string, valor: number) {
    console.log('definir budget', categoria, valor);
  }

  // =============================
  // GRÁFICOS (REAIS)
  // =============================

  gastosPorCategoria = computed(() =>
    this.vm()?.categorias ?? []
  );

  comparacaoMensal = computed(() => ({
    receitasAtual: this.receitas(),
    despesasAtual: this.despesas(),
    saldoAtual: this.saldo(),
    variacaoReceitas: 0,
    variacaoDespesas: 0,
    variacaoSaldo: 0
  }));

  evolucaoComPrevisao = computed(() => []);

  // =============================
  // LISTAS (REAIS)
  // =============================

  ultimosLancamentos = computed(() => []);

  lancamentosAgrupados = computed<GrupoLancamentos[]>(() => []);

}