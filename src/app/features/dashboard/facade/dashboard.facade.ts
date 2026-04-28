import { Injectable, computed, inject } from '@angular/core';

import { FinancialOrchestrator } from '@/app/core/application/orchestrator/financial-orchestrator';
import { createFinancialPipeline } from '@/app/core/application/factory/financial-pipeline.factory';
import { buildFinancialContext } from '@/app/core/application/context/financial-context.adapter';
import { ObterDashboardHandler } from '@/app/application/handlers/obter-dashboard.handler';
import { RecommendationActionExecutor } from '@/app/core/application/actions/recommendation-action.executor';



@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  private orchestrator = new FinancialOrchestrator(
    createFinancialPipeline()
  );

  private actionExecutor = new RecommendationActionExecutor();

  // 🔥 VOLTA O HANDLER (dados reais)
  private handler = inject(ObterDashboardHandler);

  // =============================
  // CONTEXTO (substitui handler)
  // =============================

  private context = {
    userId: '1',
    transactions: [],
    accounts: [],
    cards: [],
    goals: [],
    referenceDate: new Date()
  };

  // =============================
  // VIEW MODEL BASE (🔥 AGORA LIMPO)
  // =============================

  // 🔥 MANTÉM O PIPELINE
  vm = computed(() => {

    const data = this.handler.executar();

    const context = buildFinancialContext(data);

    const snapshot = this.orchestrator.execute(context);

    console.log('🔥 SNAPSHOT REAL:', snapshot);

    return snapshot;
  });

  // =============================
  // RESUMO (AGORA DIRETO)
  // =============================

  receitas = computed(() => this.vm()?.budget?.receitas ?? 0);
  despesas = computed(() => this.vm()?.budget?.despesas ?? 0);
  saldo = computed(() => this.vm()?.budget?.saldo ?? 0);

  // =============================
  // ALERTAS (SEM GAMBIARRA)
  // =============================

  alertsFinanceiros = computed(() =>
    this.vm()?.alerts ?? []
  );

  // =============================
  // SCORE (FINAL LIMPO)
  // =============================

  previsaoFinanceira = computed(() => ({
    saldoPrevisto: this.vm()?.forecast?.saldo ?? 0,
    receitasRestantes: this.vm()?.forecast?.receitas ?? 0,
    despesasRestantes: this.vm()?.forecast?.despesas ?? 0
  }));

  // =============================
  // INSIGHTS (DIRETO DO PIPELINE)
  // =============================

  insights = computed(() =>
    this.vm()?.insights ?? []
  );

  // =============================
  // RECOMENDAÇÕES
  // =============================

  budgetSuggestions = computed(() =>
    this.vm()?.recommendations ?? []
  );

  // =============================
  // GRÁFICOS
  // =============================

  gastosPorCategoria = computed(() =>
    this.vm()?.patterns ?? []
  );

  metaEconomiaMensal = computed(() => ({
    metaMensal: 500,
    economiaAtual: this.vm()?.budget?.saldo ?? 0,
    percentual: 60,
    previsao: 700
  }));

  statusMetaEconomia = computed(() => ({
    tipo: 'SUCESSO',
    mensagem: this.vm()?.status ?? ''
  }));

  budgets = computed(() => this.vm()?.budget ?? {});

  definirBudget(categoria: string, valor: number) {
    console.log('definir budget', categoria, valor);
  }

  comparacaoMensal = computed(() => ({
    receitasAtual: this.vm()?.budget?.receitas ?? 0,
    despesasAtual: this.vm()?.budget?.despesas ?? 0,
    saldoAtual: this.vm()?.budget?.saldo ?? 0,
    variacaoReceitas: 0,
    variacaoDespesas: 0,
    variacaoSaldo: 0
  }));

  evolucaoComPrevisao = computed(() => []);

  scoreFinanceiro = computed(() => ({
    score: this.vm()?.score?.value ?? 0,
    classificacao: this.vm()?.status ?? 'N/A',
    metricas: {
      taxaPoupanca: 30,
      controleDespesas: 70,
      estabilidade: 60
    }
  }));

  trendFinanceiro = computed(() => 'estável');

  riskFinanceiro = computed(() =>
    this.vm()?.risks?.length ?? 0
  );

  projectionFinanceira = computed(() => ({}));

  // Array vazio
  // scoreHistory = computed<{ mes: string; score: number }[]>(() => []);
  scoreHistory = computed<{ mes: string; score: number }[]>(() => [
    { mes: 'Jan', score: 60 },
    { mes: 'Fev', score: 70 },
    { mes: 'Mar', score: 80 }
  ]);

  assinaturasDetectadas = computed<{ descricao: string; valorMedio: number }[]>(() => []);

  // =============================
  // EXECUTAR RECOMENDAÇÃO
  // =============================

  executarRecomendacao(rec: any) {
    return this.actionExecutor.execute(rec.acao, this.vm());
  }

}