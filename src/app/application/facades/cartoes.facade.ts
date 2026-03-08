import { Injectable, inject } from '@angular/core'
import { CartoesStore } from '@/app/application/stores/cartoes.store'
import { Cartao } from '@/app/domain/financeiro'

@Injectable({ providedIn: 'root' })
export class CartoesFacade {

  private store = inject(CartoesStore)

  cartoes = this.store.cartoes

  adicionar(cartao: Cartao) {
    this.store.adicionar(cartao)
  }
}
