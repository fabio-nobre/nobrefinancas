export class Lancamento {

  constructor(
    public id: string,
    public descricao: string,
    public valor: number,
    public data: Date,
    public tipo: 'RECEITA' | 'DESPESA',
    public contaId?: string,
    public categoriaId?: string,
    public parcelas: Parcela[] = []
  ) { }

  get valorTotal(): number {
    return this.parcelas.length
      ? this.parcelas.reduce((t, p) => t + p.valor, 0)
      : this.valor
  }

}