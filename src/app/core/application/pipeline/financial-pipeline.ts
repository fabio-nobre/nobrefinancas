import { PipelineState } from "./pipeline-state";
import { PipelineStep } from "./pipeline-step";

export class FinancialPipeline {

  constructor(private steps: PipelineStep[]) { }

  run(context: any): PipelineState {
    let state: PipelineState = { context };

    for (const step of this.steps) {
      state = step.process(state);
    }

    return state;
  }
}