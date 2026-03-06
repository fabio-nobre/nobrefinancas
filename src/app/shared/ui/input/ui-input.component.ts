import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

<input
[(ngModel)]="model"
[placeholder]="placeholder"
class="border rounded-lg px-3 py-2 w-full"
/>

`
})
export class UiInputComponent {

  @Input() model: any
  @Input() placeholder = ''

}