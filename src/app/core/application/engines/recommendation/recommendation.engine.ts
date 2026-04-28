import { Engine } from '../engine';

export class RecommendationEngine implements Engine<any, any[]> {
  execute(state: any) {
    return [
      {
        action: 'Reduzir gastos em alimentação'
      }
    ];
  }
}