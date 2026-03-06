import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CategoriaFormComponent } from '../components/categoria-form/categoria-form.component'
import { CategoriaListComponent } from '../components/categoria-list/categoria-list.component'

@Component({
  selector: 'app-categorias-page',
  standalone: true,
  imports: [
    CommonModule,
    CategoriaFormComponent,
    CategoriaListComponent
  ],
  template: `

<div class="p-6 space-y-6">

<h1 class="text-2xl font-semibold">
Categorias
</h1>

<app-categoria-form />

<app-categoria-list />

</div>

`
})
export class CategoriasPageComponent { }