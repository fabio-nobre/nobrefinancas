import { Injectable, signal } from '@angular/core';
import { Lancamento } from '@/app/domain/financeiro';
import { LANCAMENTOS_MOCK } from '@/app/mocks/lancamentos.mock';

const STORAGE_KEY = 'nobre_financas_lancamentos';

@Injectable({ providedIn: 'root' })
export class LancamentosStore {

  lancamentos = signal<Lancamento[]>([]);

  constructor() {
    this.init();
  }

  // =============================
  // INIT (pipeline de dados)
  // =============================
  private init() {

    // 1. tenta localStorage
    const local = this.load();

    if (local.length) {
      this.lancamentos.set(local);
      return;
    }

    // 2. usa mock
    if (LANCAMENTOS_MOCK.length) {
      this.lancamentos.set(LANCAMENTOS_MOCK);
      this.save(LANCAMENTOS_MOCK);
      return;
    }

    // 3. fallback seed inteligente
    const seed = this.generateSmartSeed();
    this.lancamentos.set(seed);
    this.save(seed);
  }

  // =============================
  // CRUD
  // =============================
  adicionar(l: Lancamento) {
    const lista = [...this.lancamentos(), l];
    this.lancamentos.set(lista);
    this.save(lista);
  }

  remover(id: string) {
    const lista = this.lancamentos().filter(l => l.id !== id);
    this.lancamentos.set(lista);
    this.save(lista);
  }

  // =============================
  // STORAGE
  // =============================
  private save(lista: Lancamento[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  }

  private load(): Lancamento[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // =============================
  // SEED INTELIGENTE
  // =============================
  private generateSmartSeed(): Lancamento[] {

    const categorias = [
      'Alimentação',
      'Transporte',
      'Lazer',
      'Moradia',
      'Saúde'
    ];

    const lista: Lancamento[] = [];

    for (let i = 0; i < 90; i++) {

      const data = new Date();
      data.setDate(data.getDate() - i);

      const isReceita = i % 12 === 0;
      const valor = isReceita
        ? 4000 + Math.random() * 2000
        : 50 + Math.random() * 900;

      lista.push({
        id: String(i),
        tipo: isReceita ? 'RECEITA' : 'DESPESA',
        valor: valor,
        valorTotal: valor,
        descricao: isReceita ? 'Receita automática' : 'Despesa automática',
        parcelas: [], // 🔥 CORRIGIDO
        data,
        categoriaId: categorias[i % categorias.length]
      });
    }

    return lista;
  }
}