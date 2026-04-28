import { ForecastEngine } from "../../engines/forecast/forecast.engine";

export class ForecastStep {
  private engine = new ForecastEngine();

  process(state: any) {
    return {
      ...state,
      forecast: this.engine.execute(state.context)
    };
  }
}