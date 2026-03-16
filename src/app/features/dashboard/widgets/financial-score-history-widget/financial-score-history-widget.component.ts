import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade }
  from '@/app/application/facades/dashboard.facade'

@Component({
  selector: 'app-financial-score-history-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-score-history-widget.component.html'
})
export class FinancialScoreHistoryWidgetComponent {

  facade = inject(DashboardFacade)

  history = this.facade.scoreHistory

}