import { BudgetEngine } from "../../engines/budget/budget.engine";

export class BudgetStep {
  private engine = new BudgetEngine();

  process(state: any) {
    return {
      ...state,
      budget: this.engine.execute(state.context)
    };
  }
}