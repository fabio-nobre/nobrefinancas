import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-evolucao-mensal-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evolucao-mensal-chart.component.html'
})
export class EvolucaoMensalChartComponent {

  @Input() data: any[] = []

}