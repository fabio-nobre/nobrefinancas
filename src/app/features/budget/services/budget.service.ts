import { Injectable, signal } from '@angular/core';
import { BudgetStorageService, BudgetMap } from './budget-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  // 🔥 estado reativo
  private budgetState = signal<BudgetMap>({});

  constructor(private storage: BudgetStorageService) {
    this.carregarInicial();
  }

  // ===============================
  // INIT
  // ===============================
  private carregarInicial(): void {
    const data = this.storage.carregar();
    this.budgetState.set(data);
  }

  // ===============================
  // GETTERS
  // ===============================
  obterBudget() {
    return this.budgetState.asReadonly();
  }

  obterValor(categoriaId: string): number {
    return this.budgetState()[categoriaId] ?? 0;
  }

  // ===============================
  // ACTIONS
  // ===============================
  definirBudget(categoriaId: string, valor: number): void {
    const atual = this.budgetState();

    const novo = {
      ...atual,
      [categoriaId]: valor
    };

    this.budgetState.set(novo);
    this.storage.salvar(novo);
  }

  removerBudget(categoriaId: string): void {
    const atual = this.budgetState();

    const { [categoriaId]: _, ...resto } = atual;

    this.budgetState.set(resto);
    this.storage.salvar(resto);
  }

  limparTudo(): void {
    this.budgetState.set({});
    this.storage.limpar();
  }
}