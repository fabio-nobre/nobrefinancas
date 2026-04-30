import { Injectable, signal, computed, inject } from '@angular/core';

import { FinancialOrchestrator } from '@/app/core/application/orchestrator/financial-orchestrator';
import { createFinancialPipeline } from '@/app/core/application/factory/financial-pipeline.factory';
import { buildFinancialContext } from '@/app/core/application/context/financial-context.adapter';
import { ObterDashboardHandler } from '@/app/application/handlers/obter-dashboard.handler';
import { RecommendationActionExecutor } from '@/app/core/application/actions/recommendation-action.executor';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  // =============================
  // DEPENDÊNCIAS
  // =============================

  private handler = inject(ObterDashboardHandler);

  private orchestrator = new FinancialOrchestrator(
    createFinancialPipeline()
  );

  private actionExecutor = new RecommendationActionExecutor();

  // =============================
  // STATE (REATIVO)
  // =============================

  private state = signal<{
    override?: Partial<any>;
  }>({
    override: {}
  });

  // =============================
  // VM (ROOT - SEM DEPENDÊNCIA CÍCLICA)
  // =============================

  vm = computed(() => {

    const data = this.handler.executar();

    const baseContext = buildFinancialContext(data);

    const override = this.state().override ?? {};

    const context = this.mergeDeep(baseContext, override);

    const snapshot = this.orchestrator.execute(context);

    console.log('🔥 SNAPSHOT:', snapshot);
    console.log('🔥 RAW DATA:', this.handler.executar());
    return snapshot;
  });

  // =============================
  // HELPERS
  // =============================

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

  private getCurrentContext() {
    const data = this.handler.executar();
    const base = buildFinancialContext(data);
    return this.mergeDeep(base, this.state().override ?? {});
  }

  // =============================
  // DERIVADOS (SAFE)
  // =============================

  receitas = computed(() => this.vm()?.budget?.receitas ?? 0);
  despesas = computed(() => this.vm()?.budget?.despesas ?? 0);
  saldo = computed(() => this.vm()?.budget?.saldo ?? 0);

  alertsFinanceiros = computed(() => this.vm()?.alerts ?? []);

  insights = computed(() => this.vm()?.insights ?? []);

  budgetSuggestions = computed(() => this.vm()?.recommendations ?? []);

  gastosPorCategoria = computed(() => this.vm()?.patterns ?? []);

  budgets = computed(() => this.vm()?.budget ?? {});

  previsaoFinanceira = computed(() => ({
    saldoPrevisto: this.vm()?.forecast?.saldo ?? 0,
    receitasRestantes: this.vm()?.forecast?.receitas ?? 0,
    despesasRestantes: this.vm()?.forecast?.despesas ?? 0
  }));

  metaEconomiaMensal = computed(() => ({
    metaMensal: 500,
    economiaAtual: this.saldo(),
    percentual: 60,
    previsao: 700
  }));

  statusMetaEconomia = computed(() => ({
    tipo: 'SUCESSO',
    mensagem: this.vm()?.status ?? ''
  }));

  comparacaoMensal = computed(() => ({
    receitasAtual: this.receitas(),
    despesasAtual: this.despesas(),
    saldoAtual: this.saldo(),
    variacaoReceitas: 0,
    variacaoDespesas: 0,
    variacaoSaldo: 0
  }));

  scoreFinanceiro = computed(() => this.vm()?.score ?? {
    value: 0,
    classificacao: 'N/A',
    metricas: {}
  });

  // =============================
  // AÇÕES (REAIS)
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

        const context = this.getCurrentContext();

        return {
          transactions: (context.transactions ?? []).slice(0, -2)
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

  // =============================
  // SIMULAÇÃO
  // =============================

  simularRecomendacao(rec: any) {

    const currentContext = this.getCurrentContext();

    const snapshotAtual = this.orchestrator.execute(currentContext);

    const patch = this.calcularImpacto(rec);

    const simulatedContext = this.mergeDeep(currentContext, patch);

    const snapshotSimulado = this.orchestrator.execute(simulatedContext);

    return {
      antes: snapshotAtual,
      depois: snapshotSimulado,
      diferenca: {
        score:
          (snapshotSimulado.score?.value ?? 0) -
          (snapshotAtual.score?.value ?? 0)
      }
    };
  }

  evolucaoComPrevisao = computed(() =>
    this.vm()?.forecast?.evolucao ?? []
  );

  trendFinanceiro = computed(() => {

    const score = this.vm()?.score?.value ?? 0;

    if (score >= 80) return 'positivo';
    if (score >= 50) return 'estável';
    return 'negativo';
  });

  riskFinanceiro = computed(() => {

    const riscos = this.vm()?.risks ?? [];

    if (!riscos.length) return 0;

    // exemplo simples: cada risco pesa 20
    return Math.min(100, riscos.length * 20);
  });

  projectionFinanceira = computed(() => ({
    saldoPrevisto: this.vm()?.forecast?.saldo ?? 0,
    receitasRestantes: this.vm()?.forecast?.receitas ?? 0,
    despesasRestantes: this.vm()?.forecast?.despesas ?? 0
  }));

  scoreHistory = computed<{ mes: string; score: number }[]>(() => {

    const score = this.vm()?.score?.value ?? 0;

    // versão simples (mock inteligente)
    return [
      { mes: 'Jan', score: score - 10 },
      { mes: 'Fev', score: score - 5 },
      { mes: 'Mar', score: score }
    ];
  });

  assinaturasDetectadas = computed(() => {

    const transactions = this.getCurrentContext().transactions ?? [];

    // heurística simples (recorrência fake)
    const map = new Map<string, number[]>();

    transactions.forEach((t: any) => {
      if (!t.descricao) return;

      const key = t.descricao;

      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(t.valor);
    });

    return Array.from(map.entries())
      .filter(([_, values]) => values.length >= 3)
      .map(([descricao, values]) => ({
        descricao,
        valorMedio:
          values.reduce((a, b) => a + b, 0) / values.length
      }));
  });


}