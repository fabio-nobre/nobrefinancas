import { Injectable } from '@angular/core';

export interface BudgetMap {
  [categoriaId: string]: number;
}

const STORAGE_KEY = 'nobre_financas_budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetStorageService {

  salvar(budget: BudgetMap): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budget));
  }

  carregar(): BudgetMap {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) return {};

    try {
      return JSON.parse(data);
    } catch {
      return {};
    }
  }

  limpar(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}