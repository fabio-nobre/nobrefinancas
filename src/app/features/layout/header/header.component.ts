import { Component } from '@angular/core'

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
<header class="bg-white border-b px-6 py-3 flex justify-between">

  <div class="font-semibold">
    Dashboard
  </div>

  <div class="text-sm text-slate-500">
    Usuário
  </div>

</header>
`
})
export class HeaderComponent { }