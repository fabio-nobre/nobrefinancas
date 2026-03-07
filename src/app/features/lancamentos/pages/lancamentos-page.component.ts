import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LancamentosFacade } from '../lancamentos.facade'
import { Lancamento } from '@domain'

@Component({
  selector: 'app-lancamentos-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lancamentos-page.component.html'
})
export class LancamentosPageComponent {

  private facade = inject(LancamentosFacade)

  lancamentos = this.facade.lancamentos

  remover(id: string) {
    this.facade.remover(id)
  }

  editar(l: Lancamento) {
    console.log('Editar lançamento', l)
  }

}