import { PipelineStep } from '../pipeline-step';
import { PipelineState } from '../pipeline-state';
import { RecommendationEngine } from '../../engines/recommendation/recommendation.engine';

export class RecommendationStep implements PipelineStep {
  private engine = new RecommendationEngine();

  process(state: PipelineState): PipelineState {
    return {
      ...state,
      recommendations: this.engine.execute(state)
    };
  }
}