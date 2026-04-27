export interface FinancialContext {
  lancamentos: any[];
  contas: any[];
  cartoes: any[];

  categorias: any[];

  saldo: number;
  receitas: number;
  despesas: number;

  periodo: any;
}