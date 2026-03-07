import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-stat-card',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bg-white rounded-xl shadow-sm p-4 space-y-1">

<div class="text-sm text-slate-500">
{{ titulo }}
</div>

<div class="text-2xl font-semibold">
{{ valor }}
</div>

</div>
`
})
export class StatCardComponent {

  @Input() titulo!: string
  @Input() valor!: number | string

}