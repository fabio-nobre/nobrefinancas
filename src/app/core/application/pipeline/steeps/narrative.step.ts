import { PipelineStep } from '../pipeline-step';
import { PipelineState } from '../pipeline-state';
import { NarrativeEngine } from '../../engines/narrative/narrative.engine';

export class NarrativeStep implements PipelineStep {
  private engine = new NarrativeEngine();

  process(state: PipelineState): PipelineState {
    return {
      ...state,
      narrative: this.engine.execute(state)
    };
  }
}