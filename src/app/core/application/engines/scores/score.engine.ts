import { FinancialContext } from '@/app/application/dtos/financial-context.dto';
import { Engine } from '../engine';

export class ScoreEngine implements Engine<FinancialContext, { value: number }> {
  execute(context: any) {

    const receitas = context.resumo?.receitas ?? 0;
    const despesas = context.resumo?.despesas ?? 0;

    if (receitas === 0) return { value: 0 };

    const taxa = (receitas - despesas) / receitas;

    return {
      value: Math.max(0, Math.min(100, taxa * 100))
    };
  }
}