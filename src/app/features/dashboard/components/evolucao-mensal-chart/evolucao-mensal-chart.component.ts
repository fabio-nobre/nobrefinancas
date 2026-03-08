import { Component, Input, OnChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

@Component({
  selector: 'app-evolucao-mensal-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evolucao-mensal-chart.component.html'
})
export class EvolucaoMensalChartComponent implements OnChanges {

  @Input() data: any[] = []

  chart?: Chart

  ngOnChanges() {
    if (!this.data?.length) return

    const ctx = document.getElementById('evolucaoChart') as HTMLCanvasElement

    if (this.chart) {
      this.chart.destroy()
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map(m => m.mes),
        datasets: [
          {
            label: 'Receitas',
            data: this.data.map(m => m.receitas),
            borderColor: '#16a34a',
            backgroundColor: '#16a34a33'
          },
          {
            label: 'Despesas',
            data: this.data.map(m => m.despesas),
            borderColor: '#dc2626',
            backgroundColor: '#dc262633'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }

}