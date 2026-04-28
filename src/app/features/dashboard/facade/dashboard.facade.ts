import { Injectable, signal, computed, inject } from '@angular/core';

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

  private state = signal<{
    override?: Partial<any>;
  }>({
    override: {}
  });

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

    const base = buildFinancialContext(data);

    const override = this.state().override ?? {};

    const context = this.mergeDeep(base, override);

    const snapshot = this.orchestrator.execute(context);

    console.log('🔥 SNAPSHOT REATIVO:', snapshot);

    return snapshot;
  });

  private mergeDeep(target: any, source: any): any {
    if (!source) return target;

    const output = { ...target };

    for (const key of Object.keys(source)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        output[key] = this.mergeDeep(target[key] ?? {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }

    return output;
  }

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

    const result = this.actionExecutor.execute(rec.acao, this.vm());

    const patch = this.calcularImpacto(rec);

    this.aplicarPatch(patch);

    return result;
  }
  private calcularImpacto(rec: any): any {

    const vm = this.vm();

    switch (rec.acao.tipo) {

      case 'REDUZIR_GASTOS':
        return {
          resumo: {
            despesas: (vm.budget?.despesas ?? 0) * 0.9
          }
        };

      case 'AJUSTAR_CATEGORIA':
        return {
          categorias: (vm.patterns ?? []).map((c: any) =>
            c.nome === rec.acao.payload
              ? { ...c, valor: c.valor * 0.8 }
              : c
          )
        };

      case 'REVISAR_ORCAMENTO':
        return {
          resumo: {
            despesas: (vm.budget?.despesas ?? 0) * 0.95
          }
        };

      case 'REDUZIR_FREQUENCIA':

        const base = buildFinancialContext(this.handler.executar());
        const current = this.mergeDeep(base, this.state().override ?? {});

        return {
          transactions: (current.transactions ?? []).slice(0, -2)
        };

      default:
        return {};
    }
  }
  private aplicarPatch(patch: any) {

    this.state.update(s => ({
      override: this.mergeDeep(s.override ?? {}, patch)
    }));
  }
}