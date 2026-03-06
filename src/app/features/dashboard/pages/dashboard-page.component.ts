import { Component, inject, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'
import { SaldoCardComponent } from '../components/saldo-card/saldo-card.component'
import { UltimosLancamentosComponent } from '../components/ultimos-lancamentos/ultimos-lancamentos.component'
import { GastosCategoriaChartComponent } from '../components/gastos-categoria-chart/gastos-categoria-chart.component'
import { EvolucaoMensalChartComponent } from '../components/evolucao-mensal-chart/evolucao-mensal-chart.component'


@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    SaldoCardComponent,
    UltimosLancamentosComponent,
    GastosCategoriaChartComponent,
    EvolucaoMensalChartComponent
  ],
  template: `
<div class="p-6 space-y-6">

<h1 class="text-2xl font-semibold">
Dashboard Financeiro
</h1>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

<app-saldo-card
titulo="Saldo atual"
[valor]="saldo()"
tipo="saldo">
</app-saldo-card>

<app-saldo-card
titulo="Receitas"
[valor]="totalReceitas()"
tipo="receita">
</app-saldo-card>

<app-saldo-card
titulo="Despesas"
[valor]="totalDespesas()"
tipo="despesa">
</app-saldo-card>

<app-saldo-card
titulo="Saldo previsto"
[valor]="saldoPrevisto()"
tipo="saldo">
</app-saldo-card>

</div>

<app-evolucao-mensal-chart
  [lancamentos]="lancamentos()">
</app-evolucao-mensal-chart>

<!-- 📊 gráfico -->

<div class="bg-white rounded-xl shadow-sm p-6">

<div class="text-sm font-semibold text-slate-700 mb-4">
Gastos por categoria
</div>

<app-gastos-categoria-chart
[lancamentos]="lancamentos()">
</app-gastos-categoria-chart>

</div>

<!-- 📋 lançamentos -->

<app-ultimos-lancamentos
[lancamentos]="ultimosLancamentos()">
</app-ultimos-lancamentos>

</div>
`
})
export class DashboardPageComponent {

  store = inject(FinanceiroStore)

  lancamentos = computed(() =>
    this.store.lancamentos()
  )

  ultimosLancamentos = computed(() =>
    this.store.ultimosLancamentos()
  )

  saldoPrevisto = computed(() =>
    this.store.saldoPrevisto()
  )

  saldo = computed(() =>
    this.store.saldoPrevisto()
  )

  totalReceitas = computed(() =>
    this.store.saldoPrevisto()
  )

  totalDespesas = computed(() =>
    this.store.saldoPrevisto()
  )

}