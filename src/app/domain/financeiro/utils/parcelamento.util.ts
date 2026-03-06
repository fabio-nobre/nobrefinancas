import { Parcela } from '@/app/domain/financeiro/entities/parcela/parcela.entity'

export function gerarParcelas(
  valor: number,
  totalParcelas: number,
  dataInicial: Date
): Parcela[] {

  const parcelas: Parcela[] = []
  const valorParcela = Number((valor / totalParcelas).toFixed(2))

  for (let i = 1; i <= totalParcelas; i++) {

    const vencimento = new Date(dataInicial)
    vencimento.setMonth(vencimento.getMonth() + (i - 1))

    parcelas.push(
      new Parcela(
        i,
        valorParcela,
        vencimento
      )
    )
  }

  return parcelas
}