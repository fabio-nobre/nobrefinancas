import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'
import { SaldoCardComponent } from '../components/saldo-card/saldo-card.component'
import { UltimosLancamentosComponent } from '../components/ultimos-lancamentos/ultimos-lancamentos.component'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    SaldoCardComponent,
    UltimosLancamentosComponent
  ],
  template: `
<div class="p-6 space-y-6">

<h1 class="text-2xl font-semibold">
Dashboard Financeiro
</h1>

<div class="grid grid-cols-3 gap-4">

<app-saldo-card
titulo="Saldo atual"
[valor]="store.saldo()">
</app-saldo-card>

<app-saldo-card
titulo="Receitas"
[valor]="store.totalReceitas()">
</app-saldo-card>

<app-saldo-card
titulo="Despesas"
[valor]="store.totalDespesas()">
</app-saldo-card>

</div>

<app-ultimos-lancamentos
[lancamentos]="store.ultimosLancamentos()">
</app-ultimos-lancamentos>

</div>
`
})
export class DashboardPageComponent {

  store = inject(FinanceiroStore)

}