import { Component, inject, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UltimosLancamentosComponent } from '../components/ultimos-lancamentos/ultimos-lancamentos.component'
import { GastosCategoriaChartComponent } from '../components/gastos-categoria-chart/gastos-categoria-chart.component'
import { EvolucaoMensalChartComponent } from '../components/evolucao-mensal-chart/evolucao-mensal-chart.component'
import { InsightsFinanceirosComponent } from '../components/insights-financeiros/insights-financeiros.component'
import { DashboardFacade } from '../dashboard.facade'
import { StatCardComponent } from '@/app/shared/ui/stat-card/stat-card.component'
import { DashboardGridComponent } from '@/app/shared/ui/dashboard-grid/dashboard-grid.component'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [

    // Design System
    StatCardComponent,
    DashboardGridComponent,
    ChartCardComponent,
    // componentes existentes
    CommonModule,
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

<!-- 📊 gráfico -->

<div class="bg-white rounded-xl shadow-sm p-6">

<div class="text-sm font-semibold text-slate-700 mb-4">
Gastos por categoria
</div>

<app-gastos-categoria-chart
[lancamentos]="lancamentos()">
</app-gastos-categoria-chart>

</div>

<app-insights-financeiros
[maiorCategoria]="maiorCategoria()"
[mediaDespesas]="mediaDespesas()"
[previsaoSaldo]="previsaoSaldo()">
</app-insights-financeiros>


<!-- 📋 lançamentos -->

<app-ultimos-lancamentos
[lancamentos]="ultimosLancamentos()">
</app-ultimos-lancamentos>

</div>
`
})

export class DashboardPageComponent {

  facade = inject(DashboardFacade)

  lancamentos = computed(() =>
    this.facade.lancamentos()
  )

  ultimosLancamentos = computed(() =>
    this.facade.ultimosLancamentos()
  )

  saldo = computed(() =>
    this.facade.saldo()
  )

  saldoPrevisto = computed(() =>
    this.facade.saldoPrevisto()
  )

  totalReceitas = computed(() =>
    this.facade.totalReceitas()
  )

  totalDespesas = computed(() =>
    this.facade.totalDespesas()
  )

  maiorCategoria = computed(() =>
    this.facade.maiorCategoriaGasto()
  )

  mediaDespesas = computed(() =>
    this.facade.mediaMensalDespesas()
  )

  previsaoSaldo = computed(() =>
    this.facade.previsaoSaldoMes()
  )

}