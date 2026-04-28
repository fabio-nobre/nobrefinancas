import { PipelineStep } from '../pipeline-step';
import { PipelineState } from '../pipeline-state';
import { InsightsEngine } from '../../engines/insights/insights.engine';

export class InsightsStep implements PipelineStep {
  private engine = new InsightsEngine();

  process(state: PipelineState): PipelineState {
    return {
      ...state,
      insights: this.engine.execute(state)
    };
  }
}