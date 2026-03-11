import { Injectable, inject, computed } from '@angular/core'
import { FinanceiroStore } from '@/app/application/stores/financeiro.store'
import { FinanceAnalyticsEngine } from '@/app/application/engines/analytics/finance-analytics.engine'
import { FinancialForecastEngine } from '../engines/forecast/financial-forecast.engine'
import { FinancialInsightsEngine } from '../engines/insights/financial-insights.engine'

@Injectable({ providedIn: 'root' })
export class DashboardFacade {

  private financeiro = inject(FinanceiroStore)

  // =============================
  // Base
  // =============================

  lancamentos = this.financeiro.lancamentos

  // =============================
  // Analytics central
  // =============================

  analytics = computed(() =>
    FinanceAnalyticsEngine.calcular(
      this.financeiro.lancamentos()
    )
  )

  // =============================
  // Indicadores principais
  // =============================

  totalReceitas = computed(() =>
    this.analytics().resumo.receitas
  )

  totalDespesas = computed(() =>
    this.analytics().resumo.despesas
  )

  // =============================
  // Listas
  // =============================

  ultimosLancamentos = this.financeiro.ultimosLancamentos

  // =============================
  // Analytics
  // =============================

  evolucaoMensal = computed(() =>
    this.analytics().evolucaoMensal
  )

  gastosPorCategoria = computed(() =>
    this.analytics().categorias
  )

  maiorCategoriaGasto = computed(() =>
    this.analytics().maiorCategoria
  )

  mediaMensalDespesas = computed(() =>
    this.analytics().mediaMensalDespesas
  )

  previsaoFinanceira = computed(() => {

    return FinancialForecastEngine.calcularPrevisaoMensal(
      this.analytics()
    )

  })

  previsaoSaldoMes = computed(() =>
    this.previsaoFinanceira().saldoPrevisto
  )

  dadosGraficoEvolucao = computed(() =>
    this.analytics().graficoEvolucao
  )

  receitas = computed(() =>
    this.analytics().resumo.receitas
  )

  despesas = computed(() =>
    this.analytics().resumo.despesas
  )

  saldo = computed(() =>
    this.analytics().resumo.saldo
  )

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

  comparacaoMensal = computed(() =>
    this.analytics().comparacaoMensal
  )

  insights = computed(() =>
    FinancialInsightsEngine.gerarInsights(
      this.analytics()
    )
  )

  saldoAtual = computed(() =>
    this.analytics().resumo.saldo
  )

  saldoPrevisto = computed(() =>
    this.previsaoFinanceira().saldoPrevisto
  )

  evolucaoComPrevisao = computed(() => {

    const evolucao = this.evolucaoMensal()

    if (!evolucao?.length) return []

    let saldoAcumulado = 0

    return evolucao.map(m => {

      const saldo = m.receitas - m.despesas

      saldoAcumulado += saldo

      return {
        ...m,
        saldo,
        saldoPrevisto: saldoAcumulado
      }

    })

  })

}