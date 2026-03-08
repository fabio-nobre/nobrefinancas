import { Injectable, inject, computed } from '@angular/core'
import { FinanceiroStore } from '@/app/application/financeiro/stores/financeiro.store'
import { FinanceAnalyticsEngine } from '@/app/domain/financeiro/engines/finance-analytics.engine'

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  private financeiro = inject(FinanceiroStore)

  // =============================
  // Base
  // =============================

  lancamentos = this.financeiro.lancamentos

  // =============================
  // Indicadores principais
  // =============================

  saldo = this.financeiro.saldo
  totalReceitas = this.financeiro.totalReceitas
  totalDespesas = this.financeiro.totalDespesas
  saldoPrevisto = this.financeiro.saldoPrevisto

  // =============================
  // Listas
  // =============================

  ultimosLancamentos = this.financeiro.ultimosLancamentos

  // =============================
  // Analytics
  // =============================

  evolucaoMensal = this.financeiro.evolucaoMensal
  gastosPorCategoria = this.financeiro.gastosPorCategoria

  maiorCategoriaGasto = this.financeiro.maiorCategoriaGasto
  mediaMensalDespesas = this.financeiro.mediaMensalDespesas
  previsaoSaldoMes = this.financeiro.previsaoSaldoMes

  dadosGraficoEvolucao = this.financeiro.dadosGraficoEvolucao

  // =============================
  // Insights financeiros
  // =============================

  insightMaiorCategoria = computed(() => {

    const categoria = this.maiorCategoriaGasto()

    if (!categoria) return null

    return `${categoria.categoria} é a categoria com maior gasto.`

  })

  insightSaldoMes = computed(() => {

    const saldo = this.previsaoSaldoMes()

    if (saldo === null || saldo === undefined) return null

    if (saldo >= 0) {
      return `Saldo previsto positivo de ${saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
    }

    return `Atenção: saldo previsto negativo de ${saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`

  })

  comparacaoMensal = computed(() => {

    const lancamentos = this.financeiro.lancamentos()

    return FinanceAnalyticsEngine.compararMesAtualComAnterior(lancamentos)

  })

}