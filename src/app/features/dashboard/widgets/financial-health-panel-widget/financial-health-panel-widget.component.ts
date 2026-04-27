import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/features/dashboard/facade/dashboard.facade'

@Component({
  selector: 'app-financial-health-panel-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-health-panel-widget.component.html'
})
export class FinancialHealthPanelWidgetComponent {

  facade = inject(DashboardFacade)

  score = this.facade.scoreFinanceiro

}