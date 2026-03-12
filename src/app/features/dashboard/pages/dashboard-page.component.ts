import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '@/app/application/facades/dashboard.facade'

import { EvolucaoWidgetComponent } from '../widgets/evolucao-widget/evolucao-widget.component'
import { CategoriasWidgetComponent } from '../widgets/categorias-widget/categorias-widget.component'
import { UltimosLancamentosWidgetComponent } from '../widgets/ultimos-lancamentos-widget/ultimos-lancamentos-widget.component'

import { SaldoCardComponent } from '../cards/saldo-card/saldo-card.component'
import { ReceitasCardComponent } from '../cards/receitas-card/receitas-card.component'
import { DespesasCardComponent } from '../cards/despesas-card/despesas-card.component'
import { SaldoPrevistoCardComponent } from '../cards/saldo-previsto-card/saldo-previsto-card.component'

import { InsightsWidgetComponent } from '../widgets/insights-widget/insights-widget.component'

@Component({
  selector: 'app-dashboard-page',
  standalone: true,

  imports: [
    CommonModule,
    EvolucaoWidgetComponent,
    CategoriasWidgetComponent,
    UltimosLancamentosWidgetComponent,
    InsightsWidgetComponent,

    SaldoCardComponent,
    ReceitasCardComponent,
    DespesasCardComponent,
    SaldoPrevistoCardComponent
  ],

  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent {

  facade = inject(DashboardFacade)

  saldo = this.facade.saldo
  receitas = this.facade.totalReceitas
  despesas = this.facade.totalDespesas
  saldoPrevisto = this.facade.saldoPrevisto

  evolucaoMensal = this.facade.evolucaoMensal
  gastosPorCategoria = this.facade.gastosPorCategoria
  ultimosLancamentos = this.facade.ultimosLancamentos

  cashFlow = this.facade.cashFlow

}