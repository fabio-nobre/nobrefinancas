import { inject } from '@angular/core'
import { FinanceiroStore } from '../stores/financeiro.store'

import { Lancamento } from '@/app/domain/financeiro'

import { EventBus } from '../events/event-bus'
import { LancamentoCriadoEvent } from '../events/financeiro/lancamento-criado.event'

export class CriarLancamentoUseCase {

  private store = inject(FinanceiroStore)

  executar(lancamento: Lancamento) {

    this.store.adicionarLancamento(lancamento)

    EventBus.publish(
      new LancamentoCriadoEvent(
        lancamento.id
      )
    )

  }

}