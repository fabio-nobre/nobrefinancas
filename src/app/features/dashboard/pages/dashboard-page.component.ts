import { Component, effect, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UltimosLancamentosComponent } from '../components/ultimos-lancamentos/ultimos-lancamentos.component'
import { GastosCategoriaChartComponent } from '../components/gastos-categoria-chart/gastos-categoria-chart.component'
import { EvolucaoMensalChartComponent } from '../components/evolucao-mensal-chart/evolucao-mensal-chart.component'
import { InsightsFinanceirosComponent } from '../components/insights-financeiros/insights-financeiros.component'

import { DashboardFacade } from '../components/facades/dashboard.facade'

import { StatCardComponent } from '@/app/shared/ui/stat-card/stat-card.component'
import { DashboardGridComponent } from '@/app/shared/ui/dashboard-grid/dashboard-grid.component'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'
import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,

    // Design System
    StatCardComponent,
    DashboardGridComponent,
    ChartCardComponent,

    // Components
    UltimosLancamentosComponent,
    GastosCategoriaChartComponent,
    EvolucaoMensalChartComponent,
    InsightsFinanceirosComponent
  ],
  template: `
<div class="p-6 space-y-6">
  
  <h1 class="text-2xl font-semibold">
    Dashboard Financeiro
  </h1>

<ui-dashboard-grid>

<ui-stat-card
titulo="Saldo atual"
[valor]="facade.saldo()">
</ui-stat-card>

<ui-stat-card
titulo="Receitas"
[valor]="facade.totalReceitas()">
</ui-stat-card>

<ui-stat-card
titulo="Despesas"
[valor]="facade.totalDespesas()">
</ui-stat-card>

<ui-stat-card
titulo="Saldo previsto"
[valor]="facade.saldoPrevisto()">
</ui-stat-card>

</ui-dashboard-grid>
<ui-chart-card titulo="Evolução mensal">
<app-evolucao-mensal-chart
  [lancamentos]="facade.lancamentos()">
</app-evolucao-mensal-chart>
</ui-chart-card>

<ui-chart-card titulo="Gastos por categoria">
<app-gastos-categoria-chart
  [lancamentos]="facade.lancamentos()">
</app-gastos-categoria-chart>
</ui-chart-card>

<app-insights-financeiros
[maiorCategoria]="facade.maiorCategoriaGasto()"
[mediaDespesas]="facade.mediaMensalDespesas()"
[previsaoSaldo]="facade.previsaoSaldoMes()">
</app-insights-financeiros>

<app-ultimos-lancamentos
[lancamentos]="facade.ultimosLancamentos()">
</app-ultimos-lancamentos>

</div>
`
})
export class DashboardPageComponent {

  facade = inject(DashboardFacade)
  financeiroStore = inject(FinanceiroStore)

  constructor() {
    effect(() => {
      console.log(this.financeiroStore.lancamentos())
      console.log(this.financeiroStore.totalReceitas())
    })
  }

}