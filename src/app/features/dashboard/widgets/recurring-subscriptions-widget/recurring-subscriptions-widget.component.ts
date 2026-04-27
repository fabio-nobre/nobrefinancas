import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/features/dashboard/facade/dashboard.facade'

@Component({
  selector: 'app-recurring-subscriptions-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recurring-subscriptions-widget.component.html'
})
export class RecurringSubscriptionsWidgetComponent {

  private facade = inject(DashboardFacade)

  assinaturas = this.facade.assinaturasDetectadas

}