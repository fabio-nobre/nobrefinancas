import { Component, Input } from '@angular/core'
import { BaseChartComponent } from '../base-chart/base-chart.component'
import { ChartData } from '../chart.types'

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartComponent],
  template: `
    <app-base-chart
      [type]="'pie'"
      [data]="data">
    </app-base-chart>
  `
})
export class PieChartComponent {

  @Input() data!: ChartData

}