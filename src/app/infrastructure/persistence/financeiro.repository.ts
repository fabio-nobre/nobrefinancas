import { Injectable } from '@angular/core'
import { Lancamento } from '@/app/domain/financeiro/entities/lancamento/lancamento.entity'

@Injectable({
  providedIn: 'root'
})
export class FinanceiroRepository {

  private STORAGE_KEY = 'nobre-financas'

  salvar(lancamentos: Lancamento[]) {

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(lancamentos)
    )

  }

  carregar(): Lancamento[] {

    const data = localStorage.getItem(this.STORAGE_KEY)

    if (!data) return []

    return JSON.parse(data)

  }

}