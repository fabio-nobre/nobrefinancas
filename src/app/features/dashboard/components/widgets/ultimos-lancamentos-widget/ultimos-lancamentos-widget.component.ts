import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '../../facades/dashboard.facade'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'
import { UltimosLancamentosComponent } from '../../ultimos-lancamentos/ultimos-lancamentos.component'

@Component({
  selector: 'app-ultimos-lancamentos-widget',
  standalone: true,
  imports: [
    CommonModule,
    ChartCardComponent,
    UltimosLancamentosComponent
  ],
  templateUrl: './ultimos-lancamentos-widget.component.html'
})
export class UltimosLancamentosWidgetComponent {

  private facade = inject(DashboardFacade)

  lancamentos = this.facade.ultimosLancamentos

}