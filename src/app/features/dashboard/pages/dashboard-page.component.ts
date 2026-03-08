import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FinanceiroFacade } from '@/app/application/financeiro/financeiro.facade'


import { EvolucaoWidgetComponent } from '../widgets/evolucao-widget/evolucao-widget.component'
import { CategoriasWidgetComponent } from '../widgets/categorias-widget/categorias-widget.component'
import { UltimosLancamentosWidgetComponent } from '../widgets/ultimos-lancamentos-widget/ultimos-lancamentos-widget.component'

import { SaldoCardsComponent } from '../widgets/saldo-cards/saldo-cards.component'

import { InsightsComponent } from '../components/insights/insights.component'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,

  imports: [
    CommonModule,
    SaldoCardsComponent,
    EvolucaoWidgetComponent,
    CategoriasWidgetComponent,
    UltimosLancamentosWidgetComponent,
    InsightsComponent
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