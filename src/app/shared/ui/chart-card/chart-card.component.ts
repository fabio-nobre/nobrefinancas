import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-chart-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart-card.component.html'
})
export class ChartCardComponent {

  @Input() titulo: string = ''

}