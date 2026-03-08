import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FinanceiroFacade } from '@/app/application/financeiro/financeiro.facade'

import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'

import { EvolucaoMensalChartComponent } from '../components/evolucao-mensal-chart/evolucao-mensal-chart.component'
import { GastosCategoriaChartComponent } from '../components/gastos-categoria-chart/gastos-categoria-chart.component'
import { UltimosLancamentosComponent } from '../components/ultimos-lancamentos/ultimos-lancamentos.component'

import { SaldoCardsComponent } from '../components/widgets/saldo-cards/saldo-cards.component'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,

  imports: [
    CommonModule,
    SaldoCardsComponent,

    // UI
    ChartCardComponent,

    // Charts
    EvolucaoMensalChartComponent,
    GastosCategoriaChartComponent,

    UltimosLancamentosComponent
  ],

  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {

  facade = inject(FinanceiroFacade)

  saldo = this.facade.saldo
  receitas = this.facade.totalReceitas
  despesas = this.facade.totalDespesas
  saldoPrevisto = this.facade.saldoPrevisto

  evolucaoMensal = this.facade.evolucaoMensal
  gastosPorCategoria = this.facade.gastosPorCategoria
  ultimosLancamentos = this.facade.ultimosLancamentos

}