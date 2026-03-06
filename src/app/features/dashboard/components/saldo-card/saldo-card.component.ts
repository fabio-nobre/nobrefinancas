import { Component, Input } from '@angular/core'
import { CurrencyPipe, NgClass } from '@angular/common'

@Component({
  selector: 'app-saldo-card',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  template: `

<div
  class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

  <div class="text-sm text-slate-500">
    {{titulo}}
  </div>

  <div
    class="text-2xl font-semibold mt-1"
    [ngClass]="{
      'text-green-600': tipo === 'receita',
      'text-red-500': tipo === 'despesa',
      'text-slate-800': tipo === 'saldo'
    }">

    {{valor | currency:'BRL'}}

  </div>

</div>

`
})
export class SaldoCardComponent {

  @Input() titulo!: string
  @Input() valor!: number
  @Input() tipo: 'saldo' | 'receita' | 'despesa' = 'saldo'

}