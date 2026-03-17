import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '@/app/application/facades/dashboard.facade'
import { BudgetStatus } from '@/app/application/models/budget/budget-status.model'
import { FinanceiroStore } from '@/app/application/stores/financeiro.store'

@Component({
  selector: 'app-budget-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-widget.component.html',
  styleUrls: ['./budget-widget.component.scss']
})
export class BudgetWidgetComponent {

  private facade = inject(DashboardFacade)

  private store = inject(FinanceiroStore);

  get budgets(): BudgetStatus[] {
    return this.facade.intelligence()?.budgets ?? []
  }
  orcamento = this.store.orcamentoStatus;
}