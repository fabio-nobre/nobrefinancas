import { FinancialContext } from '../../types/financial.types';

interface NarrativeInput {
  context: FinancialContext;
  insights: any;
  recomendacoes: any;
}

export interface NarrativeResult {
  texto: string;
}

export class FinancialNarrativeEngine {

  process(input: NarrativeInput): NarrativeResult {

    const texto = `
Resumo financeiro:
- Insight: ${input.insights.mensagem}
- Recomendações: ${input.recomendacoes.recomendacoes.join(', ')}
`;

    return { texto };
  }
}