import { PipelineStep } from '../pipeline-step';
import { PipelineState } from '../pipeline-state';
import { RiskEngine } from '../../engines/risk/risk.engine';

export class RiskStep implements PipelineStep {
  private engine = new RiskEngine();

  process(state: PipelineState): PipelineState {
    return {
      ...state,
      risks: this.engine.execute(state)
    };
  }
}