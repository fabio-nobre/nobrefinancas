import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFacade } from '@/app/application/facades/dashboard.facade';


@Component({
  selector: 'app-budget-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-widget.component.html',
})
export class BudgetWidgetComponent {

  private facade = inject(DashboardFacade);

  budgets = computed(() => this.facade.budgets());

  editar(categoria: string) {
    const novo = prompt('Novo orçamento:');

    if (novo !== null) {
      this.facade.definirBudget(categoria, Number(novo));
    }
  }

}