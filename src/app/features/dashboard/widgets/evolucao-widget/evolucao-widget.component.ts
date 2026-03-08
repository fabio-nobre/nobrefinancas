import { Component, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart } from 'chart.js/auto'

import { DashboardFacade } from '../../../../application/facades/dashboard.facade'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'

@Component({
  selector: 'app-evolucao-widget',
  standalone: true,
  imports: [CommonModule, ChartCardComponent],
  templateUrl: './evolucao-widget.component.html'
})
export class EvolucaoWidgetComponent implements AfterViewInit {

  private facade = inject(DashboardFacade)

  evolucao = this.facade.evolucaoMensal

  @ViewChild('chartCanvas') canvas!: ElementRef

  private chart?: Chart


  ngAfterViewInit(): void {

    setTimeout(() => {
      this.criarGrafico()
    })

  }



  private criarGrafico() {

    const dados = this.evolucao()

    if (!dados?.length) return

    if (this.chart) {
      this.chart.destroy()
    }

    this.chart = new Chart(this.canvas.nativeElement, {

      type: 'line',

      data: {
        labels: dados.map(m => m.mes),

        datasets: [
          {
            label: 'Receitas',
            data: dados.map(m => m.receitas),
            borderColor: '#16a34a',
            tension: 0.3
          },
          {
            label: 'Despesas',
            data: dados.map(m => m.despesas),
            borderColor: '#dc2626',
            tension: 0.3
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