import { Component, inject, computed } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '@/app/application/facades/dashboard.facade'

import { EvolucaoWidgetComponent } from '../widgets/evolucao-widget/evolucao-widget.component'
import { CategoriasWidgetComponent } from '../widgets/categorias-widget/categorias-widget.component'
import { UltimosLancamentosWidgetComponent } from '../widgets/ultimos-lancamentos-widget/ultimos-lancamentos-widget.component'

import { SaldoCardComponent } from '../cards/saldo-card/saldo-card.component'
import { ReceitasCardComponent } from '../cards/receitas-card/receitas-card.component'
import { DespesasCardComponent } from '../cards/despesas-card/despesas-card.component'
import { SaldoPrevistoCardComponent } from '../cards/saldo-previsto-card/saldo-previsto-card.component'

import { BudgetWidgetComponent } from '../widgets/budget-widget/budget-widget.component'
import { BudgetSuggestionWidgetComponent } from '../widgets/budget-suggestion-widget/budget-suggestion-widget.component'
import { AlertsWidgetComponent } from '../widgets/alerts-widget/alerts-widget.component'
import { SavingsGoalWidgetComponent } from '../widgets/savings-goal-widget/savings-goal-widget.component'
import { RecurringSubscriptionsWidgetComponent } from '../widgets/recurring-subscriptions-widget/recurring-subscriptions-widget.component'
import { FinancialScoreGaugeWidgetComponent } from '../widgets/financial-score-gauge-widget/financial-score-gauge-widget.component'
import { FinancialHealthPanelWidgetComponent } from '../widgets/financial-health-panel-widget/financial-health-panel-widget.component'
import { FinancialScoreHistoryWidgetComponent } from '../widgets/financial-score-history-widget/financial-score-history-widget.component'
import { FinancialIntelligencePanelWidgetComponent } from '../widgets/financial-intelligence-panel-widget/financial-intelligence-panel-widget.component'
import { LancamentoModalComponent } from '@/app/features/lancamentos/components/lancamento-modal/lancamento-modal.component';
import { LancamentosStore } from '@/app/application/stores/lancamentos.store'
import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,

  imports: [
    CommonModule,
    EvolucaoWidgetComponent,
    CategoriasWidgetComponent,
    UltimosLancamentosWidgetComponent,

    SaldoCardComponent,
    ReceitasCardComponent,
    DespesasCardComponent,
    SaldoPrevistoCardComponent,
    BudgetWidgetComponent,
    BudgetSuggestionWidgetComponent,
    AlertsWidgetComponent,
    SavingsGoalWidgetComponent,
    RecurringSubscriptionsWidgetComponent,
    FinancialScoreGaugeWidgetComponent,
    FinancialHealthPanelWidgetComponent,
    FinancialScoreHistoryWidgetComponent,
    FinancialIntelligencePanelWidgetComponent,
    LancamentoModalComponent
  ],

  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {

  facade = inject(DashboardFacade)
  lancamentosStore = inject(LancamentosStore);

  // saldo = this.facade.saldo
  // receitas = this.facade.totalReceitas
  // despesas = this.facade.totalDespesas
  saldoPrevisto = this.facade.saldoPrevisto

  receitas = computed(() =>
    this.lancamentos()
      .filter(l => l.tipo === TipoLancamento.RECEITA)
      .reduce((total, l) => total + l.valor, 0)
  );

  despesas = computed(() =>
    this.lancamentos()
      .filter(l => l.tipo === TipoLancamento.DESPESA)
      .reduce((total, l) => total + l.valor, 0)
  );

  saldo = computed(() => this.receitas() - this.despesas());

  evolucaoMensal = this.facade.evolucaoMensal
  gastosPorCategoria = this.facade.gastosPorCategoria
  ultimosLancamentos = this.facade.ultimosLancamentos

  lancamentos = this.lancamentosStore.lancamentos;

  abrirModal = false;

  cashFlow = this.facade.cashFlow

  onPeriodoChange(periodo: string) {
    console.log('Período selecionado:', periodo);

    // 🔜 depois vamos integrar com engines
  }

}