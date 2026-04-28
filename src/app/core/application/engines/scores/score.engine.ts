import { FinancialContext } from '@/app/application/dtos/financial-context.dto';
import { Engine } from '../engine';

export class ScoreEngine implements Engine<FinancialContext, { value: number }> {
  execute(context: any) {

    const transactions = context?.transactions ?? [];

    const total = transactions.length;

    return {
      value: Math.max(0, 100 - total)
    };
  }
}