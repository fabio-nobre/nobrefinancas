import { DomainEvent } from '../domain-event'

export class LancamentoCriadoEvent implements DomainEvent {

  type = 'lancamento.criado'

  occurredAt = new Date()

  constructor(
    public lancamentoId: string
  ) { }

}