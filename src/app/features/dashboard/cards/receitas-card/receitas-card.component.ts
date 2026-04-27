import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardFacade } from '@/app/features/dashboard/facade/dashboard.facade'

@Component({
  selector: 'app-receitas-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receitas-card.component.html'
})
export class ReceitasCardComponent {

  private facade = inject(DashboardFacade)

  receitas = this.facade.receitas

}