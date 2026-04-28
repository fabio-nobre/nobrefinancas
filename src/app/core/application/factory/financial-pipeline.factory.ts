import { FinancialPipeline } from '../pipeline/financial-pipeline';
import { InsightsStep } from '../pipeline/steeps/insights.step';
import { NarrativeStep } from '../pipeline/steeps/narrative.step';
import { RecommendationStep } from '../pipeline/steeps/recommendation.step';
import { RiskStep } from '../pipeline/steeps/risk.step';
import { ScoreStep } from '../pipeline/steeps/score.step';



export function createFinancialPipeline(): FinancialPipeline {
  return new FinancialPipeline([
    new ScoreStep(),
    new RiskStep(),
    new InsightsStep(),
    new RecommendationStep(),
    new NarrativeStep()
  ]);
}