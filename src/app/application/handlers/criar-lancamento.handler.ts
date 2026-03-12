import { inject } from '@angular/core'
import { LancamentoRepository } from '../../domain/financeiro/repositories/lancamento.repository'
import { CriarLancamentoCommand } from '../commands/criar-lancamento.command'
import { TipoLancamento } from '@/app/domain/financeiro/enums/tipo-lancamento.enum'

export class CriarLancamentoHandler {

  private repo = inject(LancamentoRepository) as LancamentoRepository

  async execute(command: CriarLancamentoCommand) {

    const lancamento = {

      id: crypto.randomUUID(),

      descricao: command.descricao,

      valor: command.valor,

      valorTotal: command.valor,

      data: command.data,

      contaId: command.contaId,

      categoriaId: command.categoriaId,

      tipo: command.tipo === 'receita'
        ? TipoLancamento.RECEITA
        : TipoLancamento.DESPESA,

      parcelas: []

    }

    await this.repo.salvar(lancamento)

  }
}