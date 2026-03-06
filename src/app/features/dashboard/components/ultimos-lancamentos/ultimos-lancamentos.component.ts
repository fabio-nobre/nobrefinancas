import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lancamento } from '@domain';

@Component({
  selector: 'app-ultimos-lancamentos',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bg-white border rounded-2xl p-4 shadow-sm">

<div class="font-semibold mb-3">
Últimos lançamentos
</div>

<div *ngFor="let l of lancamentos"
class="flex justify-between py-2 border-b">

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
'text-red-500': l.tipo === 'DESPESA',
'text-green-600': l.tipo === 'RECEITA'
}">
{{l.valor | currency:'BRL'}}
</div>

</div>

</div>
`
})
export class UltimosLancamentosComponent {

  @Input() lancamentos: Lancamento[] = []

}