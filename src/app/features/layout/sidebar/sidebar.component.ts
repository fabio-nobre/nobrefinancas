import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  template: `
<div class="w-64 bg-white border-r p-4">

  <div class="text-xl font-semibold mb-6">
    Nobrefinanças
  </div>

  <nav class="space-y-2">

    <a routerLink="/" class="block p-2 rounded hover:bg-slate-100">
      Dashboard
    </a>

    <a routerLink="/lancamentos" class="block p-2 rounded hover:bg-slate-100">
      Lançamentos
    </a>

  </nav>

</div>
`
})
export class SidebarComponent { }