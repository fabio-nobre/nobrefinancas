import { Lancamento } from '../entities/lancamento/lancamento.entity'

export abstract class LancamentoRepository {

  abstract salvar(lancamento: Lancamento): Promise<void>

  abstract listar(): Promise<Lancamento[]>

}