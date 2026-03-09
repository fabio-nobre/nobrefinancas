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

  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>

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
            backgroundColor: 'rgba(22,163,74,0.1)',
            tension: 0.35,
            pointRadius: 3,
            fill: true
          },

          {
            label: 'Despesas',
            data: dados.map(m => m.despesas),
            borderColor: '#dc2626',
            tension: 0.35,
            pointRadius: 3
          },

          {
            label: 'Saldo',
            data: dados.map(m => m.receitas - m.despesas),
            borderColor: '#2563eb',
            tension: 0.35,
            pointRadius: 3,
            borderDash: [5, 5],
            borderWidth: 3
          }

        ]

      },

      options: {

        responsive: true,
        maintainAspectRatio: false,

        layout: {
          padding: {
            left: 20
          }
        },

        interaction: {
          mode: 'index',
          intersect: false
        },

        plugins: {

          legend: {
            display: true,
            position: 'top'
          },

          tooltip: {
            callbacks: {
              label: (ctx) => {

                const value = Number(ctx.raw)

                return `${ctx.dataset.label}: ${value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}`

              }
            }
          }

        },

        scales: {

          y: {
            ticks: {
              padding: 10,
              callback: (value: string | number) => {
                const v = Number(value)
                return 'R$ ' + v.toLocaleString('pt-BR')
              }
            },
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          },

          x: {

            grid: {
              display: false
            }

          }

        }

      }

    })

  }

}