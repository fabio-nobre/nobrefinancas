import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart, ChartConfiguration, registerables } from 'chart.js'
import { Lancamento } from '@domain'
import { FinanceEngine } from '@domain'

Chart.register(...registerables)

@Component({
  selector: 'app-evolucao-mensal-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="bg-white border rounded-2xl p-4 shadow-sm">

  <div class="font-semibold mb-3">
    Evolução mensal
  </div>

  <div class="h-80">
    <canvas #chart></canvas>
  </div>

</div>
`
})
export class EvolucaoMensalChartComponent implements AfterViewInit {

  @Input() lancamentos: Lancamento[] = []

  @ViewChild('chart')
  chartRef!: ElementRef<HTMLCanvasElement>

  chart!: Chart

  ngAfterViewInit() {

    const { meses, receitas, despesas } =
      FinanceEngine.evolucaoMensal(this.lancamentos)

    const config: ChartConfiguration<'line'> = {

      type: 'line',

      data: {

        labels: meses,

        datasets: [

          {
            label: 'Receitas',
            data: receitas,
            borderColor: '#22c55e',
            backgroundColor: '#22c55e33',
            tension: 0.4
          },

          {
            label: 'Despesas',
            data: despesas,
            borderColor: '#ef4444',
            backgroundColor: '#ef444433',
            tension: 0.4
          }

        ]

      },

      options: {

        responsive: true,
        maintainAspectRatio: false,

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