import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatCardComponent } from '@/app/shared/ui/stat-card/stat-card.component'

@Component({
  selector: 'app-saldo-cards',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './saldo-cards.component.html'
})
export class SaldoCardsComponent {

  @Input() saldo!: number
  @Input() receitas!: number
  @Input() despesas!: number
  @Input() saldoPrevisto!: number

}