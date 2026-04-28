import { FinancialContext } from '@/app/application/dtos/financial-context.dto';
import { Engine } from '../engine';

export class ScoreEngine {

  execute(context: any) {

    const resumo = context.resumo ?? {};
    const categorias = context.categorias ?? [];
    const transacoes = context.transactions ?? [];

    const receitas = resumo.receitas ?? 0;
    const despesas = resumo.despesas ?? 0;

    // =============================
    // 1. POUPANÇA
    // =============================

    let poupanca = 0;

    if (receitas > 0) {
      poupanca = ((receitas - despesas) / receitas) * 100;
    }

    poupanca = this.normalize(poupanca);

    // =============================
    // 2. CONTROLE DE DESPESAS
    // =============================

    const essenciais = categorias
      .filter((c: any) => c.tipo === 'essencial')
      .reduce((acc: number, c: any) => acc + (c.valor ?? 0), 0);

    let controle = 100;

    if (despesas > 0) {
      const proporcaoEssencial = essenciais / despesas;
      controle = 100 - (proporcaoEssencial * 100);
    }

    controle = this.normalize(controle);

    // =============================
    // 3. ESTABILIDADE
    // =============================

    const estabilidade = this.calcularEstabilidade(transacoes);

    // =============================
    // 4. RISCO
    // =============================

    const risco = despesas > receitas
      ? 100
      : (despesas / (receitas || 1)) * 100;

    const riscoInvertido = 100 - this.normalize(risco);

    // =============================
    // 5. COMPORTAMENTO RECENTE
    // =============================

    const comportamento = this.calcularComportamento(transacoes);

    // =============================
    // PESOS DINÂMICOS
    // =============================

    const pesos = this.ajustarPesos({
      receitas,
      despesas
    });

    // =============================
    // SCORE FINAL
    // =============================

    const score =
      poupanca * pesos.poupanca +
      controle * pesos.controle +
      estabilidade * pesos.estabilidade +
      riscoInvertido * pesos.risco +
      comportamento * pesos.comportamento;

    return {
      value: Math.round(score),

      classificacao: this.classificar(score),

      metricas: {
        poupanca: Math.round(poupanca),
        controleDespesas: Math.round(controle),
        estabilidade: Math.round(estabilidade),
        risco: Math.round(100 - riscoInvertido),
        comportamento: Math.round(comportamento)
      },

      explicacao: this.gerarExplicacao({
        poupanca,
        controle,
        estabilidade,
        risco: 100 - riscoInvertido,
        comportamento
      })
    };
  }

  // =============================
  // HELPERS
  // =============================

  private normalize(v: number) {
    return Math.max(0, Math.min(100, v));
  }

  private calcularEstabilidade(transacoes: any[]) {
    if (!transacoes.length) return 50;

    const variacao = Math.min(50, transacoes.length * 1.5);
    return 100 - variacao;
  }

  private calcularComportamento(transacoes: any[]) {
    if (!transacoes.length) return 50;

    const recentes = transacoes.slice(-10);

    const gastosAltos = recentes.filter(t => t.valor < 0 && Math.abs(t.valor) > 200);

    const impacto = gastosAltos.length * 10;

    return this.normalize(100 - impacto);
  }

  private ajustarPesos({ receitas, despesas }: any) {

    const base = {
      poupanca: 0.30,
      controle: 0.20,
      estabilidade: 0.20,
      risco: 0.15,
      comportamento: 0.15
    };

    // 🔥 Ajuste dinâmico
    if (despesas > receitas) {
      base.risco += 0.10;
      base.poupanca -= 0.05;
    }

    return base;
  }

  private classificar(score: number) {
    if (score >= 85) return 'EXCELENTE';
    if (score >= 70) return 'BOM';
    if (score >= 50) return 'ATENÇÃO';
    return 'CRÍTICO';
  }

  private gerarExplicacao(m: any) {
    const problemas = [];

    if (m.poupanca < 30) problemas.push('Baixa capacidade de poupança');
    if (m.controle < 50) problemas.push('Gastos descontrolados');
    if (m.risco > 70) problemas.push('Alto risco financeiro');

    return problemas;
  }
}