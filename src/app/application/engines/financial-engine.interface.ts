export interface FinancialEngine<I, O> {
  process(input: I): O;
}