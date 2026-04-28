import { PipelineStep } from '../pipeline-step';
import { PipelineState } from '../pipeline-state';
import { ScoreEngine } from '../../engines/scores/score.engine';

export class ScoreStep implements PipelineStep {
  private engine = new ScoreEngine();

  process(state: PipelineState): PipelineState {
    return {
      ...state,
      score: this.engine.execute(state.context)
    };
  }
}