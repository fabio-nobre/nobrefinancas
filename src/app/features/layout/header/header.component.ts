import { Component } from '@angular/core'

@Component({
  selector: 'app-header',
  standalone: true,
  template: `

<header
class="bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between">

<div class="font-semibold text-slate-700">
Dashboard
</div>

<div class="flex items-center gap-4">

<button class="text-slate-500 hover:text-slate-700">
🔔
</button>

<div
class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">

F

</div>

</div>

</header>

`
})
export class HeaderComponent { }