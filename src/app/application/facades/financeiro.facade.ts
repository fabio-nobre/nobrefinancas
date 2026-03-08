import { Injectable, inject } from '@angular/core'
import { FinanceiroStore } from '../stores/financeiro.store'

@Injectable({ providedIn: 'root' })
export class FinanceiroFacade {

  private financeiro = inject(FinanceiroStore)

  lancamentos = this.financeiro.lancamentos

  saldo = this.financeiro.saldo
  totalReceitas = this.financeiro.totalReceitas
  totalDespesas = this.financeiro.totalDespesas
  saldoPrevisto = this.financeiro.saldoPrevisto

  ultimosLancamentos = this.financeiro.ultimosLancamentos

  evolucaoMensal = this.financeiro.evolucaoMensal
  gastosPorCategoria = this.financeiro.gastosPorCategoria
  maiorCategoriaGasto = this.financeiro.maiorCategoriaGasto
  mediaMensalDespesas = this.financeiro.mediaMensalDespesas
  previsaoSaldoMes = this.financeiro.previsaoSaldoMes

}