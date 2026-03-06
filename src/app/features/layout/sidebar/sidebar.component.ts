import { Component, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { LucideAngularModule } from 'lucide-angular'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  template: `

<div
class="h-screen bg-white border-r flex flex-col transition-all duration-300"
[class.w-64]="!collapsed()"
[class.w-16]="collapsed()"
>

<!-- header -->

<div class="h-16 flex items-center justify-between px-4 border-b">

<span *ngIf="!collapsed()" class="font-semibold text-slate-800">
Nobrefinanças
</span>

<button
(click)="toggle()"
class="text-slate-500 hover:text-slate-700">

☰

</button>

</div>

<!-- menu -->

<nav class="flex-1 p-2 space-y-1">

<a
routerLink="/"
routerLinkActive="bg-blue-50 text-blue-600 border-l-4 border-blue-600"
class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition group">

<lucide-icon name="layout-dashboard" size="18"></lucide-icon>

<span
*ngIf="!collapsed()"
class="transition">
Dashboard
</span>

<!-- tooltip -->

<span
*ngIf="collapsed()"
class="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">

Dashboard

</span>

</a>

<a
routerLink="/lancamentos"
routerLinkActive="bg-blue-50 text-blue-600 border-l-4 border-blue-600"
class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition group">

<lucide-icon name="wallet" size="18"></lucide-icon>

<span *ngIf="!collapsed()">
Lançamentos
</span>

<span
*ngIf="collapsed()"
class="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">

Lançamentos

</span>


</a>

<a routerLink="/categorias"
  routerLinkActive="bg-blue-50 text-blue-600 border-l-4 border-blue-600"
class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition group">

<lucide-icon name="wallet" size="18"></lucide-icon>

<span *ngIf="!collapsed()">
Categorias
</span>

<span
*ngIf="collapsed()"
class="absolute left-16 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">

Categorias

</span>
</a>

</nav>

</div>

`
})
export class SidebarComponent {

  collapsed = signal(false)

  toggle() {
    this.collapsed.update(v => !v)
  }

}