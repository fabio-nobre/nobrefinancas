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

  vm = computed(() => this.handler.executar());

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
  // ALERTAS
  // =============================

  alertsFinanceiros = computed(() => {
    const saldo = this.saldo();

    if (saldo < 0) {
      return [
        { tipo: 'CRITICO', mensagem: 'Saldo negativo' }
      ];
    }

    return [
      { tipo: 'ALERTA', mensagem: 'Situação estável' }
    ];
  });

  // =============================
  // SCORE
  // =============================

  scoreFinanceiro = computed(() => ({
    score: this.saldo() > 0 ? 80 : 40,
    classificacao: this.saldo() > 0 ? 'Bom' : 'Ruim',
    metricas: {
      taxaPoupanca: 30,
      controleDespesas: 70,
      estabilidade: 60
    }
  }));

  trendFinanceiro = computed(() => 'estável');

  riskFinanceiro = computed(() => this.saldo() < 0 ? 0.8 : 0.2);

  projectionFinanceira = computed(() => ({}));

  scoreHistory = computed(() => [
    { mes: 'Jan', score: 60 },
    { mes: 'Fev', score: 70 },
    { mes: 'Mar', score: 80 }
  ]);

  // =============================
  // INSIGHTS / IA
  // =============================

  insights = computed(() => [
    { mensagem: 'Você está dentro do orçamento' }
  ]);

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
  // BUDGET
  // =============================

  budgets = computed(() => this.vm()?.budget ?? []);

  budgetSuggestions = computed(() => [
    { categoria: 'Alimentação', sugestaoOrcamento: 800 },
    { categoria: 'Lazer', sugestaoOrcamento: 300 }
  ]);

  definirBudget(categoria: string, valor: number) {
    console.log('definir budget', categoria, valor);
  }

  // =============================
  // GRÁFICOS
  // =============================

  gastosPorCategoria = computed(() => [
    { categoria: 'Alimentação', valor: 500 },
    { categoria: 'Moradia', valor: 1200 }
  ]);

  comparacaoMensal = computed(() => ({
    receitasAtual: 5000,
    despesasAtual: 3000,
    saldoAtual: 2000,
    variacaoReceitas: 10,
    variacaoDespesas: -5,
    variacaoSaldo: 15
  }));

  evolucaoComPrevisao = computed(() => []);

  // =============================
  // LISTAS
  // =============================

  ultimosLancamentos = computed(() => [
    { descricao: 'Teste', valor: 100 }
  ]);

  lancamentosAgrupados = computed<GrupoLancamentos[]>(() => [
    {
      categoria: 'Alimentação',
      lancamentos: []
    }
  ]);
}