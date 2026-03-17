import { Component, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LancamentoFormComponent } from '../lancamento-form/lancamento-form.component';
import { LancamentoFormStore } from '../../state/lancamento-form.store';
import { FinanceiroStore } from '@/app/application/stores/financeiro.store';
import { CriarLancamentoUseCase } from '@/app/application/usecases/lancamentos/criar-lancamento.usecase';
import { Input } from '@angular/core';

@Component({
  selector: 'app-lancamento-modal',
  standalone: true,
  imports: [CommonModule,
    LancamentoFormComponent
  ],
  templateUrl: './lancamento-modal.component.html'
})
export class LancamentoModalComponent {

  storeFinanceiro = inject(FinanceiroStore);

  @Input() lancamentoEdicao: any | null = null;
  @Output() fechar = new EventEmitter<void>();


  constructor(
    public store: LancamentoFormStore,
    private criarUseCase: CriarLancamentoUseCase) { }

  salvar() {
    const form = this.store.state();

    const lancamento = {
      id: this.lancamentoEdicao?.id ?? crypto.randomUUID(),

      descricao: form.descricao,
      valor: form.valor,
      valorTotal: form.valor, // 👈 importante

      data: form.data,
      tipo: form.tipo,

      categoriaId: form.categoriaId,
      contaId: form.contaId,

      parcelas: [] // 👈 por enquanto vazio
    };

    if (this.lancamentoEdicao) {
      this.storeFinanceiro.atualizarLancamento(lancamento);
    } else {
      this.storeFinanceiro.adicionarLancamento(lancamento);
    }

    this.store.reset();
    this.fechar.emit();
  }

  excluir() {
    if (!this.lancamentoEdicao) return;

    this.storeFinanceiro.removerLancamento(this.lancamentoEdicao.id);

    this.store.reset();
    this.fechar.emit();
  }

  cancelar() {
    this.store.reset();
    this.fechar.emit();
  }
}