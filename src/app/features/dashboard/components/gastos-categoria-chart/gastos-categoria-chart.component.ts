import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart, ChartConfiguration, registerables } from 'chart.js'
import { Lancamento } from '@/app/domain/financeiro/entities/lancamento/lancamento.entity'
import { CATEGORIAS_PADRAO } from '@/app/domain/financeiro/utils/categorias-default'

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

      const cat = l.categoriaId ?? 'outros'

      agrupado[cat] = (agrupado[cat] ?? 0) + l.valor

    })

    const labels = Object.keys(agrupado).map(id => {

      const cat = CATEGORIAS_PADRAO.find(c => c.id === id)

      return cat?.nome ?? id

    })

    const valores = Object.values(agrupado)

    const cores = Object.keys(agrupado).map(id => {

      const cat = CATEGORIAS_PADRAO.find(c => c.id === id)

      return cat?.cor ?? '#64748b'

    })

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

    const centerTextPlugin = {

      id: 'centerText',

      beforeDraw(chart: any) {

        const { ctx, chartArea } = chart

        const total = chart.data.datasets[0].data
          .reduce((a: number, b: number) => a + b, 0)

        ctx.save()

        ctx.font = 'bold 20px sans-serif'
        ctx.fillStyle = '#0f172a'
        ctx.textAlign = 'center'

        ctx.fillText(
          `R$ ${total}`,
          chartArea.width / 2 + chartArea.left,
          chartArea.height / 2 + chartArea.top
        )

        ctx.font = '12px sans-serif'
        ctx.fillStyle = '#64748b'

        ctx.fillText(
          'Total',
          chartArea.width / 2 + chartArea.left,
          chartArea.height / 2 + chartArea.top + 20
        )

        ctx.restore()

      }

    }

    Chart.register(centerTextPlugin)
    this.chart = new Chart(
      this.chartRef.nativeElement,
      {
        ...config,
        plugins: [centerTextPlugin]
      }
    )

  }

}