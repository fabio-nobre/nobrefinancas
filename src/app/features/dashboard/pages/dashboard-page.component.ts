import { Component, inject } from '@angular/core';
import { DashboardFacade } from '../facade/dashboard.facade';

// widgets
import { AlertsWidgetComponent } from '../widgets/alerts-widget/alerts-widget.component';
import { CategoriasWidgetComponent } from '../widgets/categorias-widget/categorias-widget.component';
import { BudgetSuggestionWidgetComponent } from '../widgets/budget-suggestion-widget/budget-suggestion-widget.component';
import { FinancialScoreWidgetComponent } from '../widgets/financial-score-widget/financial-score-widget.component';
import { SavingsGoalWidgetComponent } from '../widgets/savings-goal-widget/savings-goal-widget.component';


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    AlertsWidgetComponent,
    CategoriasWidgetComponent,
    BudgetSuggestionWidgetComponent,
    FinancialScoreWidgetComponent,
    SavingsGoalWidgetComponent
  ],
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {

  facade = inject(DashboardFacade);

}