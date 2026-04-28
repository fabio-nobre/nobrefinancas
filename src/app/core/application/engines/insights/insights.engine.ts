import { Engine } from '../engine';

export class InsightsEngine implements Engine<any, any[]> {
  execute(state: any) {
    return [
      {
        message: 'Você está gastando mais que o normal'
      }
    ];
  }
}