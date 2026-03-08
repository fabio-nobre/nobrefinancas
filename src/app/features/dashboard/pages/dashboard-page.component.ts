import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FinanceiroFacade } from '@/app/application/financeiro/financeiro.facade'

import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'


import { EvolucaoWidgetComponent } from '../components/widgets/evolucao-widget/evolucao-widget.component'
import { CategoriasWidgetComponent } from '../components/widgets/categorias-widget/categorias-widget.component'
import { UltimosLancamentosWidgetComponent } from '../components/widgets/ultimos-lancamentos-widget/ultimos-lancamentos-widget.component'

import { SaldoCardsComponent } from '../components/widgets/saldo-cards/saldo-cards.component'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,

  imports: [
    CommonModule,
    SaldoCardsComponent,
    EvolucaoWidgetComponent,
    CategoriasWidgetComponent,
    UltimosLancamentosWidgetComponent
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