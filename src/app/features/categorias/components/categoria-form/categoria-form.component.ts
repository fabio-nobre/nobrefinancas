import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Categoria } from '@domain'
import { CATEGORIAS_PADRAO } from '@domain'

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `

<div class="bg-white rounded-xl shadow-sm p-4">

<h2 class="font-semibold mb-3">
Nova categoria
</h2>

<div class="flex gap-2">

<input
  [(ngModel)]="nome"
  placeholder="Nome da categoria"
  class="border rounded px-3 py-2 flex-1"
/>

<input
  [(ngModel)]="cor"
  type="color"
/>

<button
  (click)="adicionar()"
  class="bg-slate-900 text-white px-4 py-2 rounded"
>
Adicionar
</button>

</div>

</div>

`
})
export class CategoriaFormComponent {

  nome = ''
  cor = '#64748b'

  adicionar() {

    if (!this.nome) return

    CATEGORIAS_PADRAO.push(
      new Categoria(
        crypto.randomUUID(),
        this.nome,
        this.cor
      )
    )

    this.nome = ''

  }

}