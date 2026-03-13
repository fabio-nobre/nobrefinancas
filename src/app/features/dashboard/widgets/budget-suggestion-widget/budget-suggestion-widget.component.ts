import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade }
  from '@/app/application/facades/dashboard.facade'

@Component({
  selector: 'app-budget-suggestion-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-suggestion-widget.component.html'
})
export class BudgetSuggestionWidgetComponent {

  private facade = inject(DashboardFacade)

  get suggestions() {
    return this.facade
      .budgetSuggestions()
      .sort((a, b) => b.sugestaoOrcamento - a.sugestaoOrcamento)
  }
}