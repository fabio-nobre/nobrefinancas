import {
  Component,
  inject,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core'

import { CommonModule } from '@angular/common'
import { Chart } from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { DashboardFacade } from '../../../../application/financeiro/facades/dashboard.facade'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'

Chart.register(
  ChartDataLabels
)

@Component({
  selector: 'app-categorias-widget',
  standalone: true,
  imports: [
    CommonModule,
    ChartCardComponent
  ],
  templateUrl: './categorias-widget.component.html'
})
export class CategoriasWidgetComponent implements AfterViewInit {

  private facade = inject(DashboardFacade)

  categorias = this.facade.gastosPorCategoria

  private chart?: Chart

  @ViewChild('chartCanvas')
  canvas!: ElementRef<HTMLCanvasElement>

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.criarGrafico()
    })

  }

  private criarGrafico() {

    const dados = this.categorias()

    if (this.chart) {
      this.chart.destroy()
    }

    const centerTextPlugin = {
      id: 'centerText',

      afterDraw(chart: any) {

        const { ctx } = chart

        const data = chart.data.datasets[0].data

        const total = data.reduce((a: number, b: number) => a + b, 0)

        const texto = total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const x = chart.getDatasetMeta(0).data[0].x
        const y = chart.getDatasetMeta(0).data[0].y

        ctx.save()

        ctx.font = 'bold 16px sans-serif'
        ctx.fillStyle = '#374151'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.fillText(texto, x, y)

      }
    }

    Chart.register(centerTextPlugin)

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'doughnut',

      data: {

        labels: dados.map(c => c.categoria),

        datasets: [
          {
            data: dados.map(c => c.valor),

            backgroundColor: [
              '#2563eb',
              '#16a34a',
              '#dc2626',
              '#d97706',
              '#7c3aed'
            ]
          }
        ]

      },

      options: {

        cutout: '65%',

        responsive: true,
        maintainAspectRatio: false,
        plugins: {

          legend: {

            position: 'top',

            labels: {
              boxWidth: 12,
              padding: 15,
              usePointStyle: true
            }

          },

          datalabels: {

            color: '#fff',

            font: {
              weight: 'bold',
              size: 12
            },

            formatter: (value: number, ctx) => {

              const data = ctx.chart.data.datasets[0].data as number[]

              const total = data.reduce((a, b) => a + b, 0)

              const pct = (value / total) * 100

              return pct.toFixed(0) + '%'

            }

          },
          tooltip: {

            callbacks: {

              label: (context) => {

                const valor = context.raw as number

                const data = context.chart.data.datasets[0].data as number[]

                const total = data.reduce((a, b) => a + b, 0)

                const percentual = ((valor / total) * 100).toFixed(1)

                const valorFormatado = valor.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })

                return `${context.label}: ${valorFormatado} (${percentual}%)`

              }

            }

          }

        }

      }

    })

  }

}