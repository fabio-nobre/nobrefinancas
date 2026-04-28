export type Prioridade = 'ALTA' | 'MEDIA' | 'BAIXA';

export type RecommendationAction =
  | 'REDUZIR_GASTOS'
  | 'AJUSTAR_CATEGORIA'
  | 'REVISAR_ORCAMENTO'
  | 'REDUZIR_FREQUENCIA';

export type Recommendation = {
  tipo: 'ECONOMIA' | 'RISCO' | 'COMPORTAMENTO' | 'OTIMIZACAO';

  titulo: string;
  descricao: string;

  impacto: number;

  prioridade: Prioridade;

  acao: {
    tipo: RecommendationAction;
    payload?: any;
  };
};