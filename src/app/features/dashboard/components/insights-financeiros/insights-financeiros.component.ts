import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-insights-financeiros',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bg-white rounded-xl shadow-sm p-6 space-y-4">

<div class="text-sm font-semibold text-slate-700">
Insights financeiros
</div>

<div class="text-sm text-slate-600">
📊 Maior categoria de gasto:
<span class="font-medium">{{ maiorCategoria }}</span>
</div>

<div class="text-sm text-slate-600">
📉 Média mensal de despesas:
<span class="font-medium">
{{ mediaDespesas | currency:'BRL' }}
</span>
</div>

<div class="text-sm text-slate-600">
💰 Previsão de saldo no fim do mês:
<span class="font-medium">
{{ previsaoSaldo | currency:'BRL' }}
</span>
</div>

</div>
`
})
export class InsightsFinanceirosComponent {

  @Input() maiorCategoria!: string
  @Input() mediaDespesas!: number
  @Input() previsaoSaldo!: number

}