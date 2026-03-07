import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FinanceiroFacade } from '@/app/application/financeiro/financeiro.facade'

import { StatCardComponent } from '@/app/shared/ui/stat-card/stat-card.component'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'

import { EvolucaoMensalChartComponent } from '../components/evolucao-mensal-chart/evolucao-mensal-chart.component'
import { GastosCategoriaChartComponent } from '../components/gastos-categoria-chart/gastos-categoria-chart.component'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,

  imports: [
    CommonModule,

    // UI
    StatCardComponent,
    ChartCardComponent,

    // Charts
    EvolucaoMensalChartComponent,
    GastosCategoriaChartComponent
  ],

  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {

  facade = inject(FinanceiroFacade)

  saldo = this.facade.saldo
  receitas = this.facade.receitas
  despesas = this.facade.despesas

  evolucaoMensal = this.facade.evolucaoMensal
  gastosPorCategoria = this.facade.gastosPorCategoria

}