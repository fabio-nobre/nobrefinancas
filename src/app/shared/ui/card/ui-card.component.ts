import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `

<div class="bg-white rounded-xl shadow-sm border p-4">
  <ng-content />
</div>

`
})
export class UiCardComponent { }