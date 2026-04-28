import { Engine } from "../engine";

export class NarrativeEngine implements Engine<any, { message: string }> {
  execute(state: any) {
    return {
      message: 'Situação financeira sob atenção'
    };
  }
}