import { Component, Input } from '@angular/core'
import { BaseChartComponent } from '../base-chart/base-chart.component'

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartComponent],
  template: `
<app-base-chart
  [type]="'line'"
  [data]="data">
</app-base-chart>
`
})
export class LineChartComponent {

  @Input() data: any

}