import { Component, computed, inject } from '@angular/core';
import { DashboardFacade } from '../../facade/dashboard.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-widget',
  imports: [CommonModule],
  templateUrl: './budget-widget.component.html'
})
export class BudgetWidgetComponent {

  facade = inject(DashboardFacade);

  // =============================
  // DADOS
  // =============================

  budgets = computed(() =>
    this.facade.budgets()
  );

  recommendations = computed(() =>
    this.facade.budgetSuggestions()
  );

  // =============================
  // ESTADO LOCAL
  // =============================

  simulacao: any = null;

  // =============================
  // AÇÕES
  // =============================

  aplicar(rec: any) {
    const result = this.facade.executarRecomendacao(rec);

    console.log('🔥 AÇÃO EXECUTADA:', result);

    // limpar simulação após aplicar
    this.simulacao = null;
  }

  preview(rec: any) {
    this.simulacao = this.facade.simularRecomendacao(rec);

    console.log('🔥 SIMULAÇÃO:', this.simulacao);
  }

  editar(categoria: string) {
    console.log('Editar categoria:', categoria);

    // pode ligar depois com modal / form
  }
}