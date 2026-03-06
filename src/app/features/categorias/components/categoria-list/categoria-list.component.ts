import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CATEGORIAS_PADRAO } from '@domain'

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  template: `

<div class="bg-white rounded-xl shadow-sm p-4">

<h2 class="font-semibold mb-3">
Categorias
</h2>

<div
  *ngFor="let c of categorias"
  class="flex items-center gap-2 py-1"
>

<div
  class="w-3 h-3 rounded-full"
  [style.background]="c.cor"
></div>

{{c.nome}}

</div>

</div>

`
})
export class CategoriaListComponent {

  categorias = CATEGORIAS_PADRAO

}