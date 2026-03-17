import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoFormComponent } from '../lancamento-form/lancamento-form.component';
import { LancamentoFormStore } from '../../state/lancamento-form.store';
import { CriarLancamentoUseCase } from '@/app/application/usercases/criar-lancamento.usecase';

@Component({
  selector: 'app-lancamento-modal',
  standalone: true,
  imports: [CommonModule,
    LancamentoFormComponent
  ],
  templateUrl: './lancamento-modal.component.html'
})
export class LancamentoModalComponent {

  @Output() fechar = new EventEmitter<void>();

  constructor(
    public store: LancamentoFormStore,
    private criarUseCase: CriarLancamentoUseCase) { }

  salvar() {
    const form = this.store.state();

    const lancamento = {
      id: crypto.randomUUID(),
      descricao: form.descricao,
      valor: form.valor,
      data: form.data,
      tipo: form.tipo
    };

    this.criarUseCase.executar(lancamento as any);

    this.store.reset();
    this.fechar.emit();
  }

  cancelar() {
    this.store.reset();
    this.fechar.emit();
  }
}