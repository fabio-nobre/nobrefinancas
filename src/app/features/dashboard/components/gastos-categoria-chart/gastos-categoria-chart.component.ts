import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart, ChartConfiguration, registerables } from 'chart.js'
import { Lancamento } from '@/app/domain/financeiro/entities/lancamento/lancamento.entity'

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

  <div class="h-80 flex items-center justify-center">
    <canvas #chart></canvas>
  </div>

</div>

`
})
export class GastosCategoriaChartComponent implements AfterViewInit {

  @Input() lancamentos: Lancamento[] = []

  @ViewChild('chart')
  chartRef!: ElementRef<HTMLCanvasElement>

  chart!: Chart

  ngAfterViewInit() {

    this.renderChart()

  }

  renderChart() {

    const despesas = this.lancamentos
      .filter(l => l.tipo === 'DESPESA')

    const agrupado: Record<string, number> = {}

    despesas.forEach(l => {

      const cat = l.categoriaId ?? 'Outros'

      agrupado[cat] = (agrupado[cat] ?? 0) + l.valor

    })

    const labels = Object.keys(agrupado)
    const valores = Object.values(agrupado)

    const cores = [
      '#6366F1',
      '#22C55E',
      '#F59E0B',
      '#EF4444',
      '#14B8A6',
      '#8B5CF6'
    ]

    const config: ChartConfiguration<'doughnut'> = {

      type: 'doughnut',

      data: {
        labels,
        datasets: [{
          data: valores,
          backgroundColor: cores,
          borderWidth: 0
        }]
      },

      options: {

        responsive: true,
        maintainAspectRatio: false,

        cutout: '70%',

        plugins: {
          legend: {
            position: 'bottom'
          }
        }

      }

    }

    this.chart = new Chart(
      this.chartRef.nativeElement,
      config
    )

  }

}