// =============================
// TIPOS DE DOMÍNIO
// =============================

type Prioridade = 'ALTA' | 'MEDIA' | 'BAIXA';

type TipoRecomendacao =
  | 'ECONOMIA'
  | 'RISCO'
  | 'COMPORTAMENTO'
  | 'OTIMIZACAO';

export type Recommendation = {
  tipo: TipoRecomendacao;

  titulo: string;
  descricao: string;

  impacto: number;

  prioridade: Prioridade;

  acao: {
    tipo: string;
    payload?: any;
  };
};

// =============================
// ENGINE
// =============================

export class RecommendationEngine {

  execute(state: any): Recommendation[] {

    const ctx = state.context ?? {};
    const score = state.score ?? { metricas: {} };

    const recomendacoes: Recommendation[] = [];

    const receitas = ctx.resumo?.receitas ?? 0;
    const despesas = ctx.resumo?.despesas ?? 0;

    const categorias = ctx.categorias ?? [];
    const transacoes = ctx.transactions ?? [];

    // =============================
    // 1. BAIXA POUPANÇA
    // =============================

    if ((score.metricas?.poupanca ?? 0) < 30) {

      const valor = receitas * 0.1;

      recomendacoes.push({
        tipo: 'ECONOMIA',
        titulo: 'Aumentar sua taxa de poupança',
        descricao: `Reduza aproximadamente R$ ${valor.toFixed(2)} em gastos para melhorar sua saúde financeira`,
        impacto: valor,
        prioridade: 'ALTA',
        acao: {
          tipo: 'REDUZIR_GASTOS'
        }
      });
    }

    // =============================
    // 2. GASTO ALTO EM CATEGORIA
    // =============================

    const categoriaTop = this.getCategoriaMaisCara(categorias);

    if (categoriaTop) {

      const economia = (categoriaTop.valor ?? 0) * 0.2;

      recomendacoes.push({
        tipo: 'OTIMIZACAO',
        titulo: `Reduzir gastos em ${categoriaTop.nome}`,
        descricao: `Você pode economizar até R$ ${economia.toFixed(2)} nessa categoria`,
        impacto: economia,
        prioridade: 'MEDIA',
        acao: {
          tipo: 'AJUSTAR_CATEGORIA',
          payload: categoriaTop.nome
        }
      });
    }

    // =============================
    // 3. RISCO ALTO
    // =============================

    if ((score.metricas?.risco ?? 0) > 70) {

      recomendacoes.push({
        tipo: 'RISCO',
        titulo: 'Risco financeiro elevado',
        descricao: 'Seus gastos estão próximos ou acima da sua renda',
        impacto: 0,
        prioridade: 'ALTA',
        acao: {
          tipo: 'REVISAR_ORCAMENTO'
        }
      });
    }

    // =============================
    // 4. COMPORTAMENTO RECENTE
    // =============================

    const gastosRecentes = transacoes
      .slice(-10)
      .filter((t: any) => t?.valor < 0);

    if (gastosRecentes.length > 7) {

      recomendacoes.push({
        tipo: 'COMPORTAMENTO',
        titulo: 'Muitos gastos recentes',
        descricao: 'Você realizou muitos gastos nos últimos dias',
        impacto: 0,
        prioridade: 'MEDIA',
        acao: {
          tipo: 'REDUZIR_FREQUENCIA'
        }
      });
    }

    return this.rankear(recomendacoes);
  }

  // =============================
  // HELPERS
  // =============================

  private getCategoriaMaisCara(categorias: any[]) {
    if (!categorias?.length) return null;

    return categorias.reduce((max, c) =>
      (c?.valor ?? 0) > (max?.valor ?? 0) ? c : max
    );
  }

  private rankear(lista: Recommendation[]): Recommendation[] {

    const peso: Record<Prioridade, number> = {
      ALTA: 3,
      MEDIA: 2,
      BAIXA: 1
    };

    return lista.sort(
      (a, b) => peso[b.prioridade] - peso[a.prioridade]
    );
  }
}