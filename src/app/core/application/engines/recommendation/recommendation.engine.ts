import { Recommendation, Prioridade } from './recommendation.types';

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
    // POUPANÇA
    // =============================

    if ((score.metricas?.poupanca ?? 0) < 30) {

      const valor = receitas * 0.1;

      recomendacoes.push({
        tipo: 'ECONOMIA',
        titulo: 'Aumentar sua taxa de poupança',
        descricao: `Reduza R$ ${valor.toFixed(2)} em gastos`,
        impacto: valor,
        prioridade: 'ALTA',
        acao: { tipo: 'REDUZIR_GASTOS' }
      });
    }

    // =============================
    // CATEGORIA
    // =============================

    const categoriaTop = this.getCategoriaMaisCara(categorias);

    if (categoriaTop) {

      const economia = (categoriaTop.valor ?? 0) * 0.2;

      recomendacoes.push({
        tipo: 'OTIMIZACAO',
        titulo: `Reduzir ${categoriaTop.nome}`,
        descricao: `Economize até R$ ${economia.toFixed(2)}`,
        impacto: economia,
        prioridade: 'MEDIA',
        acao: {
          tipo: 'AJUSTAR_CATEGORIA',
          payload: categoriaTop.nome
        }
      });
    }


    // =============================
    // RISCO
    // =============================

    if ((score.metricas?.risco ?? 0) > 70) {

      recomendacoes.push({
        tipo: 'RISCO',
        titulo: 'Risco financeiro alto',
        descricao: 'Gastos elevados em relação à renda',
        impacto: 0,
        prioridade: 'ALTA',
        acao: { tipo: 'REVISAR_ORCAMENTO' }
      });
    }

    // =============================
    // COMPORTAMENTO
    // =============================

    const recentes = transacoes.slice(-10);

    if (recentes.length > 7) {

      recomendacoes.push({
        tipo: 'COMPORTAMENTO',
        titulo: 'Muitos gastos recentes',
        descricao: 'Reduza frequência de consumo',
        impacto: 0,
        prioridade: 'MEDIA',
        acao: { tipo: 'REDUZIR_FREQUENCIA' }
      });
    }

    if (!recomendacoes.length) {
      recomendacoes.push({
        tipo: 'ECONOMIA',
        titulo: 'Teste ativo',
        descricao: 'Pipeline funcionando',
        impacto: 100,
        prioridade: 'ALTA',
        acao: { tipo: 'REDUZIR_GASTOS' }
      });
    }

    return this.rankear(recomendacoes);
  }

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
