import { Component, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart } from 'chart.js/auto'

import { DashboardFacade } from '@/app/features/dashboard/facade/dashboard.facade'

@Component({
  selector: 'app-financial-score-gauge-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-score-gauge-widget.component.html'
})
export class FinancialScoreGaugeWidgetComponent implements AfterViewInit {

  facade = inject(DashboardFacade)

  score = this.facade.scoreFinanceiro

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>

  ngAfterViewInit() {
    setTimeout(() => {
      const valor = this.score().score

      new Chart(this.chartCanvas.nativeElement, {

        type: 'doughnut',

        data: {
          datasets: [
            {
              data: [valor, 100 - valor],
              backgroundColor: [
                '#4f46e5',
                '#e5e7eb'
              ],
              borderWidth: 0
            }
          ]
        },

        options: {

          responsive: true,
          maintainAspectRatio: false,

          animation: {
            duration: 500
          },

          rotation: -90,
          circumference: 180,

          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },

          cutout: '70%'

        }

      })
    }, 0)

  }

}