import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store';

import { LancamentoFormComponent }
  from '../components/lancamento-form/lancamento-form.component';

import { LancamentoListComponent }
  from '../components/lancamento-list/lancamento-list.component';

@Component({
  selector: 'app-lancamentos-page',
  standalone: true,
  imports: [
    CommonModule,
    LancamentoFormComponent,
    LancamentoListComponent
  ],
  template: `
<div class="p-6 space-y-6">

<h1 class="text-2xl font-semibold">
Lançamentos
</h1>

<app-lancamento-form></app-lancamento-form>

<app-lancamento-list
  [lancamentos]="store.lancamentos()">
</app-lancamento-list>

</div>
`
})
export class LancamentosPageComponent {

  store = inject(FinanceiroStore);

}