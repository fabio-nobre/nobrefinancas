import { Component, inject, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
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
export class LancamentoModalComponent implements OnChanges {

  isEdicao = false;
  private idEdicao: string | null = null;
  lancamentoSelecionado: any = null;

  storeFinanceiro = inject(FinanceiroStore);

  @Input() lancamentoEdicao: any | null = null;
  @Output() fechar = new EventEmitter<void>();


  ngOnChanges(changes: SimpleChanges) {
    const lanc = changes['lancamentoEdicao']?.currentValue;

    if (lanc) {
      this.isEdicao = true;
      this.idEdicao = lanc.id; // 👈 GUARDA ID REAL

      this.store.editar(lanc);
    } else {
      this.isEdicao = false;
      this.idEdicao = null;
    }
  }
  constructor(
    public store: LancamentoFormStore,
    private criarUseCase: CriarLancamentoUseCase) { }

  salvar() {
    const form = this.store.state();

    const lancamento = {
      id: this.idEdicao ?? crypto.randomUUID(), // 👈 CORRETO

      descricao: form.descricao,
      valor: form.valor,
      valorTotal: form.valor,

      data: form.data,
      tipo: form.tipo,

      categoriaId: form.categoriaId,
      contaId: form.contaId,

      parcelas: []
    };

    if (this.isEdicao) {
      console.log('ATUALIZANDO...');
      this.storeFinanceiro.atualizarLancamento(lancamento);
    } else {
      console.log('CRIANDO...');
      this.storeFinanceiro.adicionarLancamento(lancamento);
    }

    this.store.reset();
    this.fechar.emit();
  }

  excluir() {
    if (!this.idEdicao) return;

    this.storeFinanceiro.removerLancamento(this.idEdicao);

    this.store.reset();
    this.fechar.emit();
  }

  cancelar() {
    this.store.reset();
    this.fechar.emit();
  }

  editarLancamento(l: any) {
    this.lancamentoSelecionado = l;
  }
}