import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '../../facades/dashboard.facade'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'
import { EvolucaoMensalChartComponent } from '../../evolucao-mensal-chart/evolucao-mensal-chart.component'

@Component({
  selector: 'app-evolucao-widget',
  standalone: true,
  imports: [
    CommonModule,
    ChartCardComponent,
    EvolucaoMensalChartComponent
  ],
  templateUrl: './evolucao-widget.component.html'
})
export class EvolucaoWidgetComponent {

  private facade = inject(DashboardFacade)

  evolucao = this.facade.evolucaoMensal

}