import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-gastos-categoria-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gastos-categoria-chart.component.html'
})
export class GastosCategoriaChartComponent {

  @Input() data: { categoria: string; valor: number }[] = []

  calcularPercentual(valor: number): number {

    if (!this.data.length) return 0

    const maior = Math.max(...this.data.map(d => d.valor))

    return (valor / maior) * 100

  }

}