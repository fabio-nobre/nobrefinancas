import { Lancamento } from "@/app/domain/financeiro";

export interface FinancialContext {

  lancamentos: Lancamento[]; // 🔥 ESSENCIAL

  contas: any[];
  cartoes: any[];

  categorias: any[];

  saldo: number;
  receitas: number;
  despesas: number;

  periodo: any;
}

export interface ForecastResult {
  saldoPrevisto: number;
  receitasRestantes: number;
  despesasRestantes: number;
}

export interface RiskResult {
  risco: number;
}

export interface ScoreResult {
  score: number;
}

export interface AnomalyResult {
  temAnomalia: boolean;
}

export interface BudgetResult {
  saldo: number;
}

export interface InsightsResult {
  mensagem: string;
}

export interface RecommendationResult {
  recomendacoes: string[];
}

export interface NarrativeResult {
  texto: string;
}