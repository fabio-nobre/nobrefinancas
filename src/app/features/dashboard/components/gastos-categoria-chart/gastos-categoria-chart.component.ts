import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart, ChartConfiguration, registerables } from 'chart.js'
import { Lancamento } from '@/app/domain/financeiro/entities/lancamento.entity'

Chart.register(...registerables)

@Component({
  selector: 'app-gastos-categoria-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bg-white border rounded-2xl p-4 shadow-sm">

  <div class="font-semibold mb-3">
    Gastos por categoria
  </div>

  <canvas #chart></canvas>

</div>
`
})
export class GastosCategoriaChartComponent implements AfterViewInit {

  @Input() lancamentos: Lancamento[] = []

  @ViewChild('chart')
  chartRef!: ElementRef<HTMLCanvasElement>

  chart!: Chart

  ngAfterViewInit() {

    const despesas = this.lancamentos
      .filter(l => l.tipo === 'DESPESA')

    const agrupado: Record<string, number> = {}

    despesas.forEach(l => {

      const cat = l.categoriaId ?? 'Outros'

      agrupado[cat] = (agrupado[cat] ?? 0) + l.valor

    })

    const labels = Object.keys(agrupado)
    const valores = Object.values(agrupado)

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data: valores
        }]
      }
    }

    this.chart = new Chart(
      this.chartRef.nativeElement,
      config
    )

  }

}