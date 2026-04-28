import { Engine } from '../engine';

export class InsightsEngine implements Engine<any, any[]> {
  execute(context: any) {

    const despesas = context.resumo?.despesas ?? 0;
    const receitas = context.resumo?.receitas ?? 0;

    if (despesas > receitas) {
      return [{
        message: 'Você está gastando mais do que ganha'
      }];
    }

    return [];
  }
}