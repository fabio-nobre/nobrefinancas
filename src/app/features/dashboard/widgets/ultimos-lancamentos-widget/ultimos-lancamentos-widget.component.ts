import { Component, inject, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'

import { DashboardFacade } from '../../../../application/facades/dashboard.facade'

@Component({
  selector: 'app-ultimos-lancamentos-widget',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './ultimos-lancamentos-widget.component.html'
})
export class UltimosLancamentosWidgetComponent {

  private facade = inject(DashboardFacade)

  @Output() editar = new EventEmitter<any>();

  lancamentos = this.facade.ultimosLancamentos
  lancamentosAgrupados = this.facade.lancamentosAgrupados

}