import { Injectable, computed, signal } from '@angular/core';

import { Lancamento, } from '@domain';
import { Conta } from '@domain';
import { Cartao } from '@domain'
import { Categoria } from '@domain'

import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'
import { gerarLancamentosMock } from '@/app/mocks/lancamentos.mock'

import { FinanceAnalyticsEngine } from '@/app/application/engines/analytics/finance-analytics.engine'

export interface FinanceiroState {

  lancamentos: Lancamento[]

  contas: Conta[]

  cartoes: Cartao[]

  categorias: Categoria[]

}

@Injectable({
  providedIn: 'root'
})
export class FinanceiroStore {

  orcamento = signal<Record<string, number>>({
    Alimentação: 800,
    Transporte: 300,
    Lazer: 200,
    Moradia: 1500
  });

  private STORAGE_KEY = 'nobrefinancas_lancamentos';

  private state = signal<FinanceiroState>({

    // Dados macaos teste
    // lancamentos: gerarLancamentosMock(),
    lancamentos: this.carregarLancamentos(),
    contas: [],
    cartoes: [],
    categorias: []
  })

  // SELECTORS

  lancamentos = computed(() => this.state().lancamentos)

  contas = computed(() => this.state().contas)

  cartoes = computed(() => this.state().cartoes)

  categorias = computed(() => this.state().categorias)

  private carregarLancamentos() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private salvarLancamentos(lancamentos: Lancamento[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lancamentos));
  }


  totalReceitas = computed(() =>
    this.state().lancamentos
      .filter(l => l.tipo === TipoLancamento.RECEITA)
      .reduce((total, l) => total + l.valor, 0)
  )


  totalDespesas = computed(() =>
    this.state().lancamentos
      .filter(l => l.tipo === TipoLancamento.DESPESA)
      .reduce((total, l) => total + l.valor, 0)
  )


  saldo = computed(() =>
    this.totalReceitas() - this.totalDespesas()
  )


  saldoPrevisto = computed(() =>
    this.saldo()
  )


  ultimosLancamentos = computed(() => {

    return [...this.state().lancamentos]
      .sort((a, b) =>
        new Date(b.data).getTime() - new Date(a.data).getTime()
      )
      .slice(0, 5)

  })

  evolucaoMensal = computed(() =>
    FinanceAnalyticsEngine.calcularEvolucaoMensal(
      this.state().lancamentos
    )
  )

  gastosPorCategoria = computed(() =>
    FinanceAnalyticsEngine.gastosPorCategoria(
      this.state().lancamentos
    )
  )

  resumoDoMes = computed(() =>
    FinanceAnalyticsEngine.resumoDoMes(
      this.state().lancamentos
    )
  )

  maiorCategoriaGasto = computed(() =>
    FinanceAnalyticsEngine.maiorCategoriaGasto(
      this.gastosPorCategoria()
    )
  )

  mediaMensalDespesas = computed(() =>
    FinanceAnalyticsEngine.mediaMensalDespesas(
      this.state().lancamentos
    )
  )

  previsaoSaldoMes = computed(() =>
    FinanceAnalyticsEngine.previsaoSaldoMes(
      this.saldo(),
      this.totalReceitas(),
      this.totalDespesas()
    )
  )

  dadosGraficoEvolucao = computed(() =>
    FinanceAnalyticsEngine.dadosGraficoEvolucao(
      this.state().lancamentos
    )
  )

  // ACTIONS
  adicionarLancamento(lancamento: Lancamento) {
    this.state.update(state => {
      const novos = [...state.lancamentos, lancamento];

      this.salvarLancamentos(novos);

      return {
        ...state,
        lancamentos: novos
      };
    });
  }

  removerLancamento(id: string) {
    this.state.update(state => {
      const novos = state.lancamentos.filter(l => l.id !== id);

      this.salvarLancamentos(novos);

      return {
        ...state,
        lancamentos: novos
      };
    });
  }

  atualizarLancamento(lancamento: Lancamento) {
    this.state.update(state => {
      const novos = state.lancamentos.map(l =>
        l.id === lancamento.id ? lancamento : l
      );

      this.salvarLancamentos(novos);

      return {
        ...state,
        lancamentos: novos
      };
    });
  }

  orcamentoStatus = computed(() => {
    const gastosArray = this.gastosPorCategoria();

    const gastos: Record<string, number> = {};

    gastosArray.forEach(item => {
      gastos[item.categoria] = item.valor;
    });
    const limites = this.orcamento();

    return Object.keys(limites).map(categoria => {
      const gasto = gastos[categoria] ?? 0;
      const limite = limites[categoria];

      const percentual = limite > 0 ? (gasto / limite) * 100 : 0;

      return {
        categoria,
        gasto,
        limite,
        percentual,

        status:
          percentual >= 100 ? 'estourado' :
            percentual >= 80 ? 'alerta' :
              'ok'
      };
    });
  });

}