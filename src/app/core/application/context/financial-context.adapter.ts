export function buildFinancialContext(data: any) {
  return {
    userId: '1',

    // 🔥 CORE
    transactions: data?.lancamentos ?? [],

    accounts: data?.contas ?? [],
    cards: data?.cartoes ?? [],
    goals: data?.metas ?? [],

    referenceDate: new Date(),

    // 🔥 DADOS AUXILIARES (ESSENCIAL PRA ENGINES)
    resumo: data?.resumo ?? {
      receitas: 0,
      despesas: 0,
      saldo: 0
    },

    categorias: data?.categorias ?? [],
    inteligencia: data?.inteligencia ?? {}
  };
}