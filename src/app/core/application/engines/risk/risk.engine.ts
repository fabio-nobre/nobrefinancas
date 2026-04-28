import { Engine } from '../engine';

export class RiskEngine implements Engine<any, any[]> {
  execute(input: any) {
    if (input.score?.value < 50) {
      return [{ type: 'HIGH_RISK', message: 'Score baixo' }];
    }

    return [];
  }
}