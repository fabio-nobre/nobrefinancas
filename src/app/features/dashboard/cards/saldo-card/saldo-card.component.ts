import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/application/facades/dashboard.facade'

@Component({
  selector: 'app-saldo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './saldo-card.component.html'
})
export class SaldoCardComponent {

  private facade = inject(DashboardFacade)

  saldo = this.facade.saldo

}