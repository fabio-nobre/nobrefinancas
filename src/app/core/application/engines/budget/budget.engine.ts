export class BudgetEngine {
  execute(context: any) {
    return {
      receitas: context.resumo?.receitas ?? 0,
      despesas: context.resumo?.despesas ?? 0,
      saldo: context.resumo?.saldo ?? 0
    };
  }
}