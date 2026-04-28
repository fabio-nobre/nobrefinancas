export interface PipelineState {
  context: any;

  score?: any;
  insights?: any[];
  risks?: any[];
  forecast?: any;

  recommendations?: any[];
  anomalies?: any[];
  patterns?: any;

  narrative?: any;
}