import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `

<button
class="px-4 py-2 rounded-lg font-medium"
[ngClass]="variantClass"
>
<ng-content />
</button>

`
})
export class UiButtonComponent {

  @Input() variant: 'primary' | 'secondary' = 'primary'

  get variantClass() {

    return this.variant === 'primary'
      ? 'bg-slate-900 text-white'
      : 'bg-slate-200 text-slate-900'

  }

}