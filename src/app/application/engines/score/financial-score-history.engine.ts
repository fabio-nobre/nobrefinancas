import { Lancamento } from '@/app/domain/financeiro';
import { FinancialScoreEngine } from './financial-score.engine';

export class FinancialScoreHistoryEngine {

  static calcular(lancamentos: Lancamento[]) {

    const porMes: Record<string, Lancamento[]> = {};

    for (const l of lancamentos) {

      const data = new Date(l.data);

      const chave = `${data.getFullYear()}-${data.getMonth() + 1}`;

      if (!porMes[chave]) {
        porMes[chave] = [];
      }

      porMes[chave].push(l);
    }

    const resultado: any[] = [];

    for (const chave of Object.keys(porMes)) {

      const lista = porMes[chave];

      const receitas =
        lista.filter(l => l.tipo === 'RECEITA')
          .reduce((s, l) => s + l.valor, 0);

      const despesas =
        lista.filter(l => l.tipo === 'DESPESA')
          .reduce((s, l) => s + l.valor, 0);

      const context = { receitas, despesas };

      const risco = { risco: despesas > receitas ? 0.8 : 0.2 };

      const engine = new FinancialScoreEngine();

      const score = engine.process({
        receitas,
        despesas,
        risco: { risco: 0 } // ajuste conforme seu modelo
      });

      resultado.push({
        mes: chave,
        score: score.score
      });
    }

    return resultado;
  }
}