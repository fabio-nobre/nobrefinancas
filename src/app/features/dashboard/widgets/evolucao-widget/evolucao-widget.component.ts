import { Component, inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Chart } from 'chart.js/auto'

import { DashboardFacade } from '../../../../features/dashboard/facade/dashboard.facade'
import { ChartCardComponent } from '@/app/shared/ui/chart-card/chart-card.component'

@Component({
  selector: 'app-evolucao-widget',
  standalone: true,
  imports: [CommonModule, ChartCardComponent],
  templateUrl: './evolucao-widget.component.html'
})
export class EvolucaoWidgetComponent implements AfterViewInit {

  private facade = inject(DashboardFacade)

  evolucao = this.facade.evolucaoComPrevisao

  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>

  private chart?: Chart

  ngAfterViewInit(): void {

    const dados = this.evolucao()

    if (!dados?.length) return

    this.renderizarGrafico(dados)

  }

  private renderizarGrafico(dados: any[]) {

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
            backgroundColor: 'rgba(22,163,74,0.15)',
            fill: true,
            tension: 0.4,
            pointRadius: 3
          },

          {
            label: 'Despesas',
            data: dados.map(m => m.despesas),
            borderColor: '#dc2626',
            tension: 0.4,
            pointRadius: 3
          },

          {
            label: 'Saldo',
            data: dados.map(m => m.receitas - m.despesas),
            borderColor: '#2563eb',
            borderDash: [6, 4],
            tension: 0.4,
            pointRadius: 3
          },
          {
            label: 'Saldo Previsto',
            data: dados.map(m => m.saldoPrevisto),
            borderColor: '#9333ea',
            borderDash: [8, 6],
            tension: 0.4,
            pointRadius: 0
          }

        ]

      },

      options: {

        responsive: true,
        maintainAspectRatio: false,

        interaction: {
          mode: 'index',
          intersect: false
        },

        plugins: {

          legend: {
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

              callback: (value: string | number) => {

                const v = Number(value)

                if (v >= 1000) {
                  return 'R$ ' + (v / 1000) + 'k'
                }

                return 'R$ ' + v

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