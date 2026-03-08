import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '../../../../application/facades/dashboard.facade'


@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights.component.html'
})
export class InsightsComponent {

  facade = inject(DashboardFacade)

}