import { DomainEvent } from './domain-event'

type Handler = (event: DomainEvent) => void

export class EventBus {

  private static handlers: Map<string, Handler[]> = new Map()

  static subscribe(
    eventType: string,
    handler: Handler
  ) {

    if (!this.handlers.has(eventType)) {

      this.handlers.set(eventType, [])

    }

    this.handlers.get(eventType)!.push(handler)

  }

  static publish(event: DomainEvent) {

    const handlers =
      this.handlers.get(event.type)

    if (!handlers) return

    for (const h of handlers) {

      h(event)

    }

  }

}