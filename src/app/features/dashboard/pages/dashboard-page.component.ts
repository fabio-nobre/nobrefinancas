import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceiroFacade } from '@/app/application/financeiro/financeiro.facade';
import { StatCardComponent } from '@/app/shared/ui/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {

  facade = inject(FinanceiroFacade)

  saldo = this.facade.saldo
  receitas = this.facade.receitas
  despesas = this.facade.despesas

}