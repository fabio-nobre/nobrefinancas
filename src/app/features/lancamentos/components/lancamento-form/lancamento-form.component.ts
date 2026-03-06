import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'
import { Lancamento } from '@/app/domain/financeiro/entities/lancamento/lancamento.entity'

@Component({
  selector: 'app-lancamento-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
<form [formGroup]="form" (ngSubmit)="salvar()" class="space-y-3">

<input formControlName="descricao" placeholder="Descrição"
class="input"/>

<input formControlName="valor" type="number"
placeholder="Valor" class="input"/>

<select formControlName="tipo" class="input">
<option value="DESPESA">Despesa</option>
<option value="RECEITA">Receita</option>
</select>

<button class="btn">
Adicionar
</button>

</form>
`
})
export class LancamentoFormComponent {

  store = inject(FinanceiroStore)
  fb = inject(FormBuilder)

  form = this.fb.group({
    descricao: '',
    valor: 0,
    tipo: 'DESPESA'
  })

  salvar() {

    const v = this.form.value

    const lancamento = new Lancamento(
      crypto.randomUUID(),
      v.descricao!,
      Number(v.valor),
      new Date(),
      v.tipo as any
    )

    this.store.adicionarLancamento(lancamento)

    this.form.reset()

  }

}