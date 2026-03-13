import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/application/facades/dashboard.facade'

@Component({
  selector: 'app-alerts-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts-widget.component.html'
})
export class AlertsWidgetComponent {

  private facade = inject(DashboardFacade)

  alerts = this.facade.alertsFinanceiros

}