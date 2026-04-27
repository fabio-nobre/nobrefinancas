import { Component, inject } from '@angular/core';

import { DashboardFacade } from '../facade/dashboard.facade';

// ✅ IMPORTAR TODOS OS WIDGETS
import { AlertsWidgetComponent } from '../widgets/alerts-widget/alerts-widget.component';
import { BudgetSuggestionWidgetComponent } from '../widgets/budget-suggestion-widget/budget-suggestion-widget.component';
import { CategoriasWidgetComponent } from '../widgets/categorias-widget/categorias-widget.component';
import { FinancialScoreWidgetComponent } from '../widgets/financial-score-widget/financial-score-widget.component';
import { UltimosLancamentosWidgetComponent } from '../widgets/ultimos-lancamentos-widget/ultimos-lancamentos-widget.component';
import { JsonPipe } from '@angular/common';
import { SavingsGoalWidgetComponent } from '../widgets/savings-goal-widget/savings-goal-widget.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,

  // 🔥 ESSA PARTE É O QUE FALTAVA
  imports: [
    AlertsWidgetComponent,
    CategoriasWidgetComponent,
    BudgetSuggestionWidgetComponent,
    FinancialScoreWidgetComponent,
    UltimosLancamentosWidgetComponent,
    UltimosLancamentosWidgetComponent,
    JsonPipe,
    SavingsGoalWidgetComponent
  ],

  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {

  facade = inject(DashboardFacade);

}