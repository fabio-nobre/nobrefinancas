import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-evolucao-mensal-chart',
  standalone: true,
  imports: [CommonModule],

  template: `
    <div class="space-y-2">

      <div
        *ngFor="let item of data"
        class="flex items-center justify-between border-b py-1">

        <span class="font-medium">
          {{ item.mes }}
        </span>

        <span class="text-green-600">
          +{{ item.receitas }}
        </span>

        <span class="text-red-600">
          -{{ item.despesas }}
        </span>

      </div>

    </div>
  `
})
export class EvolucaoMensalChartComponent {

  @Input() data: { mes: string; receitas: number; despesas: number }[] = []

}