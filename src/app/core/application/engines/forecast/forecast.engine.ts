export class ForecastEngine {
  execute(context: any) {

    const saldo = context.resumo?.saldo ?? 0;

    return {
      saldo: saldo * 1.1,
      receitas: context.resumo?.receitas ?? 0,
      despesas: context.resumo?.despesas ?? 0
    };
  }
}