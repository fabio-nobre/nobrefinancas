import { Injectable, inject } from '@angular/core';

import { DashboardMapper } from '../mappers/dashboard.mapper';
import { FinancialIntelligencePipeline } from '../pipelines/financial-intelligence.pipeline';

import { FinancialContext } from '../dtos/financial-context.dto';
import { DashboardViewModel } from '../view-models/dashboard.viewmodel';

import { CartoesStore } from '../stores/cartoes.store';
import { FinanceiroStore } from '../stores/financeiro.store';
import { LancamentosStore } from '../stores/lancamentos.store';

@Injectable({ providedIn: 'root' })
export class ObterDashboardHandler {

  // ❌ REMOVIDO:
  // private pipeline = inject(FinancialIntelligencePipeline);

  // ✔ STORES continuam via DI
  private financeiroStore = inject(FinanceiroStore);
  private lancamentosStore = inject(LancamentosStore);
  private cartoesStore = inject(CartoesStore);

  executar(): DashboardViewModel {

    console.log('HANDLER EXECUTANDO');

    const context = this.buildContext();

    console.log('CONTEXT:', context);

    const pipeline = new FinancialIntelligencePipeline();

    const result = pipeline.process(context);

    console.log('PIPELINE RESULT:', result);

    return DashboardMapper.toViewModel(result);
  }

  private buildContext(): FinancialContext {

    const lancamentos = this.lancamentosStore.lancamentos();
    const contas = this.financeiroStore.contas();
    const cartoes = this.cartoesStore.cartoes();

    const receitas = lancamentos
      .filter(l => l.tipo === 'RECEITA')
      .reduce((acc, l) => acc + l.valor, 0);

    const despesas = lancamentos
      .filter(l => l.tipo === 'DESPESA')
      .reduce((acc, l) => acc + l.valor, 0);

    return {
      lancamentos,
      contas,
      cartoes,

      categorias: [],

      saldo: receitas - despesas,
      receitas,
      despesas,

      periodo: {} as any
    };
  }
}