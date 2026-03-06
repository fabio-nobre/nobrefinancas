import { Component, Input } from '@angular/core'
import { Lancamento } from '@domain'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lancamento-list',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="space-y-2">

<div *ngFor="let l of lancamentos"
class="bg-white border rounded-xl p-3 flex justify-between">

<div>
<div class="font-medium">
{{l.descricao}}
</div>

<div class="text-xs text-slate-500">
{{l.data | date}}
</div>
</div>

<div
[ngClass]="{
'text-red-500': l.tipo==='DESPESA',
'text-green-600': l.tipo==='RECEITA'
}">
{{l.valor | currency:'BRL'}}
</div>

</div>

</div>
`
})
export class LancamentoListComponent {

  @Input() lancamentos: Lancamento[] = []

}