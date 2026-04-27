export interface DashboardViewModel {

  resumo: {
    saldo: number;
    receitas: number;
    despesas: number;
  };

  categorias: any[];

  inteligencia: {
    score: any;
    risco: any;
    insights: any[];
    recomendacoes: any[];
    narrativa: string;
  };

  budget: any;

  alertas: {
    tipo: string;
    mensagem: string;
  }[];
}