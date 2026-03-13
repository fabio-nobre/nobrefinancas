export interface FinancialAlert {

  tipo: 'RISCO' | 'ANOMALIA' | 'ORCAMENTO'

  mensagem: string

  severidade: 'INFO' | 'ALERTA' | 'CRITICO'

}