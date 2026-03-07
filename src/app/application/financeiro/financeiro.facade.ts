import { Injectable, computed, inject } from '@angular/core';
import { FinanceiroStore } from './stores/financeiro.store';
import { Lancamento } from '@domain';
import { FinanceAnalyticsEngine } from '@/app/domain/financeiro/finance-analytics.engine';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroFacade {

  private store = inject(FinanceiroStore)

  lancamentos = this.store.lancamentos

  saldo = this.store.saldo
  receitas = this.store.totalReceitas
  despesas = this.store.totalDespesas

  ultimosLancamentos = this.store.ultimosLancamentos

  evolucaoMensal = computed(() =>
    FinanceAnalyticsEngine.evolucaoMensal(
      this.lancamentos()
    )
  )

  gastosPorCategoria = computed(() =>
    FinanceAnalyticsEngine.gastosPorCategoria(
      this.lancamentos()
    )
  )

}