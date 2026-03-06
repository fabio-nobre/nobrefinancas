export class Cartao {

  constructor(
    public id: string,
    public nome: string,
    public limite: number,
    public diaFechamento: number,
    public diaVencimento: number
  ) { }

}