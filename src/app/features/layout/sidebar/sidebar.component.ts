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

<nav class="p-3 space-y-2">

<a
routerLink="/"
routerLinkActive="bg-blue-50 text-blue-600 border-l-4 border-blue-600"
class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">

<lucide-icon name="layout-dashboard" size="18"></lucide-icon>

<span *ngIf="!collapsed()">Dashboard</span>

</a>

<a
routerLink="/lancamentos"
routerLinkActive="bg-blue-50 text-blue-600 border-l-4 border-blue-600"
class="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100">

<lucide-icon name="wallet" size="18"></lucide-icon>

<span *ngIf="!collapsed()">Lançamentos</span>

</a>

</nav>
`
})
export class SidebarComponent {

  collapsed = signal(false)

}