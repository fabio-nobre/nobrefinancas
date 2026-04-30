export function buildFinancialContext(data: any) {

  const resumo = data?.resumo ?? {};
  const categorias = data?.categorias ?? [];

  return {
    userId: '1',

    // 🔥 NÃO EXISTE transacoes → criar fallback
    //transactions: data?.transacoes ?? [],
    transactions: data?.transacoes ?? [
      {
        valor: 5000,
        tipo: 'receita',
        categoria: 'Salário',
        data: new Date('2026-04-01'),
        descricao: 'Salário'
      },
      {
        valor: -1200,
        tipo: 'despesa',
        categoria: 'Moradia',
        data: new Date('2026-04-02'),
        descricao: 'Aluguel'
      },
      {
        valor: -400,
        tipo: 'despesa',
        categoria: 'Alimentação',
        data: new Date('2026-04-03'),
        descricao: 'Supermercado'
      },
      {
        valor: -150,
        tipo: 'despesa',
        categoria: 'Transporte',
        data: new Date('2026-04-05'),
        descricao: 'Uber'
      },
      {
        valor: -80,
        tipo: 'despesa',
        categoria: 'Lazer',
        data: new Date('2026-04-07'),
        descricao: 'Cinema'
      },
      {
        valor: -39.9,
        tipo: 'despesa',
        categoria: 'Assinaturas',
        data: new Date('2026-04-08'),
        descricao: 'Netflix'
      },
      {
        valor: -39.9,
        tipo: 'despesa',
        categoria: 'Assinaturas',
        data: new Date('2026-03-08'),
        descricao: 'Netflix'
      },
      {
        valor: -39.9,
        tipo: 'despesa',
        categoria: 'Assinaturas',
        data: new Date('2026-02-08'),
        descricao: 'Netflix'
      }
    ],

    categorias: [
      { nome: 'Moradia', valor: 1200, tipo: 'essencial' },
      { nome: 'Alimentação', valor: 400, tipo: 'essencial' },
      { nome: 'Transporte', valor: 150, tipo: 'essencial' },
      { nome: 'Lazer', valor: 80, tipo: 'nao_essencial' },
      { nome: 'Assinaturas', valor: 120, tipo: 'nao_essencial' }
    ],

    resumo: {
      receitas: resumo.receitas ?? 0,
      despesas: resumo.despesas ?? 0,
      saldo: resumo.saldo ?? 0
    },

    // 🔥 mapear budget correto
    budget: data?.budget ?? {},

    // 🔥 inteligência (se quiser usar depois)
    inteligencia: data?.inteligencia ?? {},

    alerts: data?.alertas ?? [],

    accounts: [],
    cards: [],
    goals: [],

    referenceDate: new Date()
  };
}