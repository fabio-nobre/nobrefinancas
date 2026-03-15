import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/application/facades/dashboard.facade'

@Component({
  selector: 'app-savings-goal-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './savings-goal-widget.component.html'
})
export class SavingsGoalWidgetComponent {

  private facade = inject(DashboardFacade)

  meta = this.facade.metaEconomiaMensal

}