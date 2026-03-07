import { Injectable, inject, computed } from '@angular/core'
import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'
import { FinanceAnalyticsEngine } from '@/app/domain/financeiro/finance-analytics.engine'

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  private financeiro = inject(FinanceiroStore)

  lancamentos = this.financeiro.lancamentos

  saldo = this.financeiro.saldo
  totalReceitas = this.financeiro.totalReceitas
  totalDespesas = this.financeiro.totalDespesas
  saldoPrevisto = this.financeiro.saldoPrevisto

  ultimosLancamentos = this.financeiro.ultimosLancamentos

  maiorCategoriaGasto = computed(() =>
    FinanceAnalyticsEngine.maiorCategoriaGasto(this.lancamentos())
  )

  mediaMensalDespesas = computed(() =>
    FinanceAnalyticsEngine.mediaMensalDespesas(this.lancamentos())
  )

  previsaoSaldoMes = computed(() =>
    FinanceAnalyticsEngine.previsaoSaldoMes(
      this.saldo(),
      this.totalReceitas(),
      this.totalDespesas()
    )
  )

  evolucaoMensal = computed(() =>
    FinanceAnalyticsEngine.evolucaoMensal(this.lancamentos())
  )

  gastosPorCategoria = computed(() =>
    FinanceAnalyticsEngine.gastosPorCategoria(this.lancamentos())
  )

}