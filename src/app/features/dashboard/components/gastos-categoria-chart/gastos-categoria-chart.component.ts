import { Component, Input, OnChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

@Component({
  selector: 'app-gastos-categoria-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gastos-categoria-chart.component.html'
})
export class GastosCategoriaChartComponent implements OnChanges {

  @Input() data: { categoria: string; valor: number }[] = []

  chart?: Chart

  ngOnChanges() {

    if (!this.data?.length) return

    const ctx = document.getElementById('categoriaChart') as HTMLCanvasElement

    if (this.chart) {
      this.chart.destroy()
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.data.map(c => c.categoria),
        datasets: [{
          data: this.data.map(c => c.valor),
          backgroundColor: [
            '#2563eb',
            '#16a34a',
            '#dc2626',
            '#ca8a04',
            '#9333ea'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })

  }

}