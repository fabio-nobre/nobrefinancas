import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '../../../../features/dashboard/facade/dashboard.facade'

@Component({
  selector: 'app-insights-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights-widget.component.html'
})
export class InsightsWidgetComponent {

  private facade = inject(DashboardFacade)

  insights = this.facade.insights

}