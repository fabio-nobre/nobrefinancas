import { Injectable, inject, computed, signal } from '@angular/core'
import { FinanceiroStore } from '@/app/application/stores/financeiro.store'
import { FinanceAnalyticsEngine } from '@/app/application/engines/analytics/finance-analytics.engine'
import { FinancialForecastEngine } from '../engines/forecast/financial-forecast.engine'
import { FinancialInsightsEngine } from '../engines/insights/financial-insights.engine'
import { FinancialScoreEngine } from '../engines/score/financial-score.engine'
import { FinancialTrendEngine } from '../engines/trend/financial-trend.engine'
import { FinancialProjectionEngine } from '../engines/projection/financial-projection.engine'
import { FinancialRiskEngine } from '../engines/risk/financial-risk.engine'
import { FinancialIntelligencePipeline } from '../intelligence/financial-intelligence.pipeline'
import { DashboardReadModelFactory } from '../read-models/dashboard-read-model.factory'
import { ObterDashboardHandler } from '../handlers/obter-dashboard.handler'
import { DashboardReadModel } from '../read-models/dashboard.read-model'
import { CashFlowEngine } from '../engines/analytics/cash-flow.engine'

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
    this.intelligence().analytics
  )

  cashFlow = computed(() =>
    CashFlowEngine.calcular(
      this.financeiro.lancamentos()
    )
  )

  dashboard = computed(() =>
    DashboardReadModelFactory.create(this.analytics())
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

  scoreFinanceiro = computed(() =>
    this.intelligence().score
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
    this.intelligence().insights
  )

  saldoAtual = computed(() =>
    this.analytics().resumo.saldo
  )

  saldoPrevisto = computed(() =>
    this.previsaoFinanceira().saldoPrevisto
  )

  trendFinanceiro = computed(() =>
    this.intelligence().trend
  )

  riskFinanceiro = computed(() =>
    this.intelligence().risk
  )

  projectionFinanceira = computed(() =>
    this.intelligence().projection
  )

  patternFinanceiro = computed(() =>
    this.intelligence().pattern
  )

  anomalyFinanceira = computed(() =>
    this.intelligence().anomaly
  )

  recommendationFinanceira = computed(() =>
    this.intelligence().recommendation
  )

  goalsFinanceiros = computed(() =>
    this.intelligence().goals
  )

  narrativaFinanceira = computed(() =>
    this.intelligence().narrative
  )

  explainabilityFinanceira = computed(() =>
    this.intelligence().explainability
  )

  budgets = computed(() =>
    this.intelligence().budgets
  )

  recurring = computed(() =>
    this.intelligence().recurring
  )

  timeline = computed(() =>
    this.intelligence().timeline
  )



  intelligence = computed(() =>

    FinancialIntelligencePipeline.processar(
      this.financeiro.lancamentos()
    )

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