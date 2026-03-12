import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '@/app/application/facades/dashboard.facade'
import { BudgetStatus } from '@/app/application/models/budget/budget-status.model'

@Component({
  selector: 'app-budget-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-widget.component.html'
})
export class BudgetWidgetComponent {

  private facade = inject(DashboardFacade)

  get budgets(): BudgetStatus[] {
    return this.facade.intelligence?.budgets ?? []
  }

}