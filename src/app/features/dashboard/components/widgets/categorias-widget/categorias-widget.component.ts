import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '../../facades/dashboard.facade'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'
import { GastosCategoriaChartComponent } from '../../gastos-categoria-chart/gastos-categoria-chart.component'

@Component({
  selector: 'app-categorias-widget',
  standalone: true,
  imports: [
    CommonModule,
    ChartCardComponent,
    GastosCategoriaChartComponent
  ],
  templateUrl: './categorias-widget.component.html'
})
export class CategoriasWidgetComponent {

  private facade = inject(DashboardFacade)

  categorias = this.facade.gastosPorCategoria

}