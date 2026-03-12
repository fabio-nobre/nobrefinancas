import { DomainEvent } from '../domain-event'

export class LancamentoRemovidoEvent implements DomainEvent {

  type = 'lancamento.removido'

  occurredAt = new Date()

  constructor(
    public lancamentoId: string
  ) { }

}