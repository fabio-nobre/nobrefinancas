import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/application/facades/dashboard.facade'

@Component({
  selector: 'app-financial-score-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-score-widget.component.html'
})
export class FinancialScoreWidgetComponent {

  facade = inject(DashboardFacade)

  score = this.facade.scoreFinanceiro

}