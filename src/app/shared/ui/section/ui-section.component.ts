import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-section',
  standalone: true,
  imports: [CommonModule],
  template: `

<div class="space-y-3">

<h2 class="text-sm font-semibold text-slate-700">
{{title}}
</h2>

<ng-content />

</div>

`
})
export class UiSectionComponent {

  @Input() title = ''

}