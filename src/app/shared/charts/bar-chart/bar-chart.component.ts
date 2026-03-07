import { Component, Input } from '@angular/core'
import { BaseChartComponent } from '../base-chart/base-chart.component'
import { ChartData } from '../chart.types'

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartComponent],
  template: `
    <app-base-chart
      [type]="'bar'"
      [data]="data">
    </app-base-chart>
  `
})
export class BarChartComponent {

  @Input() data!: ChartData

}