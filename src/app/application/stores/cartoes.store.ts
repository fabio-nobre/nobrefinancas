import { Injectable, signal } from '@angular/core'
import { Cartao } from '@/app/domain/financeiro'

@Injectable({ providedIn: 'root' })
export class CartoesStore {

  private _cartoes = signal<Cartao[]>([])

  cartoes = this._cartoes.asReadonly()

  adicionar(cartao: Cartao) {
    this._cartoes.update(lista => [...lista, cartao])
  }

}