import { Component, Input } from '@angular/core'
import { CurrencyPipe } from '@angular/common'

@Component({
  selector: 'app-saldo-card',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
<div class="bg-white border rounded-2xl p-4 shadow-sm">

<div class="text-sm text-slate-500">
{{titulo}}
</div>

<div class="text-2xl font-semibold mt-1">
{{valor | currency:'BRL'}}
</div>

</div>
`
})
export class SaldoCardComponent {

  @Input() titulo!: string
  @Input() valor!: number

}