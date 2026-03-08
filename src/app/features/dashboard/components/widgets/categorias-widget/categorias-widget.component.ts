import {
  Component,
  inject,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core'

import { CommonModule } from '@angular/common'
import { Chart } from 'chart.js/auto'

import { DashboardFacade } from '../../facades/dashboard.facade'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'

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

          }

        }

      }

    })

  }

}