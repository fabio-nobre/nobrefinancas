export class Categoria {

  constructor(
    public id: string,
    public nome: string,
    public tipo: 'RECEITA' | 'DESPESA',
    public icone?: string
  ) { }

}