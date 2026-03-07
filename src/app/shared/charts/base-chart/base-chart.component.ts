import { Component, Input } from '@angular/core'
import { BaseChartDirective } from 'ng2-charts'
import { ChartConfiguration } from 'chart.js'

@Component({
  selector: 'app-base-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <canvas
      baseChart
      [data]="data"
      [type]="type"
      [options]="options">
    </canvas>
  `
})
export class BaseChartComponent {

  @Input() data!: ChartConfiguration['data']
  @Input() type!: ChartConfiguration['type']

  options: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }

}