import { Injectable, inject } from '@angular/core'
import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  private financeiro = inject(FinanceiroStore)

  // base
  lancamentos = this.financeiro.lancamentos

  // indicadores
  saldo = this.financeiro.saldo
  totalReceitas = this.financeiro.totalReceitas
  totalDespesas = this.financeiro.totalDespesas
  saldoPrevisto = this.financeiro.saldoPrevisto

  // listas
  ultimosLancamentos = this.financeiro.ultimosLancamentos

  // analytics
  evolucaoMensal = this.financeiro.evolucaoMensal
  gastosPorCategoria = this.financeiro.gastosPorCategoria
  maiorCategoriaGasto = this.financeiro.maiorCategoriaGasto
  mediaMensalDespesas = this.financeiro.mediaMensalDespesas
  previsaoSaldoMes = this.financeiro.previsaoSaldoMes

  dadosGraficoEvolucao = this.financeiro.dadosGraficoEvolucao

}