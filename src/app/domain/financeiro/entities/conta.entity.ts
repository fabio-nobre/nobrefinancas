export class Conta {

  constructor(
    public id: string,
    public nome: string,
    public saldoInicial: number,
    public tipo: 'CARTEIRA' | 'CONTA' | 'CARTAO'
  ) { }

}