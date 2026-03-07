import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-gastos-categoria-chart',
  standalone: true,
  imports: [CommonModule],

  template: `
    <div class="space-y-2">

      <div
        *ngFor="let item of data"
        class="flex justify-between border-b py-1">

        <span>
          {{ item.categoria }}
        </span>

        <span class="font-medium">
          {{ item.valor }}
        </span>

      </div>

    </div>
  `
})
export class GastosCategoriaChartComponent {

  @Input() data: { categoria: string; valor: number }[] = []

}