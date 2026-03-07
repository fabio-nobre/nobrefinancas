import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core'
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
export class EvolucaoMensalChartComponent implements OnChanges {

  @Input() lancamentos: Lancamento[] = []

  @ViewChild('chart')
  chartRef!: ElementRef<HTMLCanvasElement>

  chart?: Chart

  ngOnChanges(changes: SimpleChanges) {

    if (!this.chartRef) return

    this.renderChart()

  }

  renderChart() {

    const { meses, receitas, despesas } =
      FinanceEngine.evolucaoMensal(this.lancamentos)

    if (this.chart) {
      this.chart.destroy()
    }

    const config: ChartConfiguration<'line'> = {

      type: 'line',

      data: {
        labels: meses,
        datasets: [
          {
            label: 'Receitas',
            data: receitas,
            borderColor: '#22c55e',
            tension: 0.4
          },
          {
            label: 'Despesas',
            data: despesas,
            borderColor: '#ef4444',
            tension: 0.4
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false
      }

    }

    this.chart = new Chart(
      this.chartRef.nativeElement,
      config
    )

  }

}