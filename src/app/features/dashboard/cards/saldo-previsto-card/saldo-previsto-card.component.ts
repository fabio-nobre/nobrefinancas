import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/application/facades/dashboard.facade'

@Component({
  selector: 'app-saldo-previsto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldo-previsto-card.component.html'
})
export class SaldoPrevistoCardComponent {

  private facade = inject(DashboardFacade)

  previsao = this.facade.previsaoFinanceira

}