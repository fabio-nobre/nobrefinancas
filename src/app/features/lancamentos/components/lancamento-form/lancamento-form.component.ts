import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoFormStore } from '../../state/lancamento-form.store';
import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum';

@Component({
  selector: 'app-lancamento-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lancamento-form.component.html'
})
export class LancamentoFormComponent {

  store = inject(LancamentoFormStore);

  state = this.store.state;

  tipos = Object.values(TipoLancamento);

  setData(value: string) {
    this.store.setData(new Date(value));
  }
}