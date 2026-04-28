import { FinancialPipeline } from '../pipeline/financial-pipeline';
import { BudgetStep } from '../pipeline/steeps/budget.step.ts';
import { ForecastStep } from '../pipeline/steeps/forecast.step.ts';
import { InsightsStep } from '../pipeline/steeps/insights.step';
import { NarrativeStep } from '../pipeline/steeps/narrative.step';
import { RecommendationStep } from '../pipeline/steeps/recommendation.step';
import { RiskStep } from '../pipeline/steeps/risk.step';
import { ScoreStep } from '../pipeline/steeps/score.step';



export function createFinancialPipeline(): FinancialPipeline {
  return new FinancialPipeline([
    new ScoreStep(),
    new BudgetStep(),
    new ForecastStep(),
    new InsightsStep(),
    new RiskStep(),
    new RecommendationStep(),
    new NarrativeStep()
  ]);
}