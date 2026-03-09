import { Injectable, inject, computed } from '@angular/core'
import { FinanceiroStore } from '@/app/application/stores/financeiro.store'
import { FinanceAnalyticsEngine } from '@/app/application/engines/finance-analytics.engine'
import { FinancialForecastEngine } from '../engines/financial-forecast.engine'
import { FinancialInsightsEngine } from '../engines/financial-insights.engine'

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

  totalReceitas = this.financeiro.totalReceitas
  totalDespesas = this.financeiro.totalDespesas

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


  receitas = computed(() =>
    this.financeiro
      .lancamentos()
      .filter(l => l.tipo === 'RECEITA')
      .reduce((s, l) => s + l.valor, 0)
  )

  despesas = computed(() =>
    this.financeiro
      .lancamentos()
      .filter(l => l.tipo === 'DESPESA')
      .reduce((s, l) => s + l.valor, 0)
  )

  saldo = computed(() =>
    this.receitas() - this.despesas()
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

  comparacaoMensal = computed(() => {

    const lancamentos = this.financeiro.lancamentos()

    return FinanceAnalyticsEngine.compararMesAtualComAnterior(lancamentos)

  })

  previsaoFinanceira = computed(() => {

    const lancamentos = this.financeiro.lancamentos()

    const saldoAtual = this.financeiro.saldo()

    return FinancialForecastEngine.calcularPrevisaoMensal(
      lancamentos,
      saldoAtual
    )

  })

  insights = computed(() => {

    const lancamentos = this.financeiro.lancamentos()

    return FinancialInsightsEngine.gerarInsights(lancamentos)

  })

  saldoPrevisto = computed(() => {

    const lancamentos = this.financeiro.lancamentos()

    const receitas = lancamentos
      .filter(l => l.tipo === 'RECEITA')
      .reduce((s, l) => s + l.valor, 0)

    const despesas = lancamentos
      .filter(l => l.tipo === 'DESPESA')
      .reduce((s, l) => s + l.valor, 0)

    return receitas - despesas

  })

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