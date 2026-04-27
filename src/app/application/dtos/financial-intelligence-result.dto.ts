export interface FinancialIntelligenceResult {
  saldo: number;
  receitas: number;
  despesas: number;

  categorias: any[];

  forecast: any;
  risco: any;
  score: any;

  insights: any[];
  recomendacoes: any[];

  budget: any;
  anomalias: any[];

  narrativa: string;
}