import { PipelineState } from "./pipeline-state";

export interface PipelineStep {
  process(state: PipelineState): PipelineState;
}