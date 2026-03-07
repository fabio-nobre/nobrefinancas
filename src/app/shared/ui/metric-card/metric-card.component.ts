import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bg-slate-50 rounded-lg p-4">

<div class="text-xs text-slate-500">
{{ label }}
</div>

<div class="text-lg font-semibold">
{{ value }}
</div>

</div>
`
})
export class MetricCardComponent {

  @Input() label!: string
  @Input() value!: number | string

}