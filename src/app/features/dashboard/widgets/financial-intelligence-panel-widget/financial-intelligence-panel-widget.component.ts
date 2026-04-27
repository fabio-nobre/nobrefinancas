import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade }
  from '@/app/features/dashboard/facade/dashboard.facade'

@Component({
  selector: 'app-financial-intelligence-panel-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-intelligence-panel-widget.component.html'
})
export class FinancialIntelligencePanelWidgetComponent {

  facade = inject(DashboardFacade)

  score = this.facade.scoreFinanceiro
  trend = this.facade.trendFinanceiro
  risk = this.facade.riskFinanceiro
  projection = this.facade.projectionFinanceira

}