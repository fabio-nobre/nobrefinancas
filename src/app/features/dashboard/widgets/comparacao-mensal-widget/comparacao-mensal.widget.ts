import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '../../../../application/facades/dashboard.facade'

@Component({
  selector: 'app-comparacao-mensal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparacao-mensal.widget.html'
})
export class ComparacaoMensalWidget {

  private facade = inject(DashboardFacade)

  comparacao = this.facade.comparacaoMensal

}