import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/features/dashboard/facade/dashboard.facade'

@Component({
  selector: 'app-despesas-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './despesas-card.component.html'
})
export class DespesasCardComponent {

  private facade = inject(DashboardFacade)

  despesas = this.facade.despesas

}