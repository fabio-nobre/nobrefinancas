import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-chart-card',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bg-white rounded-xl shadow-sm p-6">

<div class="text-sm font-semibold text-slate-700 mb-4">
{{ titulo }}
</div>

<ng-content></ng-content>

</div>
`
})
export class ChartCardComponent {

  @Input() titulo!: string

}