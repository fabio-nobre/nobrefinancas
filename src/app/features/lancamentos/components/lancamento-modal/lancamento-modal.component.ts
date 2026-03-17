import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoFormComponent } from '../lancamento-form/lancamento-form.component';
import { LancamentoFormStore } from '../../state/lancamento-form.store';

@Component({
  selector: 'app-lancamento-modal',
  standalone: true,
  imports: [CommonModule, LancamentoFormComponent],
  templateUrl: './lancamento-modal.component.html'
})
export class LancamentoModalComponent {

  @Output() fechar = new EventEmitter<void>();

  constructor(public store: LancamentoFormStore) { }

  salvar() {
    const dados = this.store.state();

    console.log('Salvar lançamento:', dados);

    this.store.reset();
    this.fechar.emit();
  }

  cancelar() {
    this.store.reset();
    this.fechar.emit();
  }
}