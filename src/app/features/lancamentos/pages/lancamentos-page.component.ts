import { Component, inject } from '@angular/core'
import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'

@Component({
  selector: 'app-lancamentos-page',
  standalone: true,
  template: `
  <div class="p-6 space-y-6">

    <h1 class="text-2xl font-semibold">
      Lançamentos
    </h1>

    <app-lancamento-form />

    <app-lancamento-list
      [lancamentos]="store.lancamentos()">
    </app-lancamento-list>

  </div>
  `
})
export class LancamentosPageComponent {

  store = inject(FinanceiroStore)

}