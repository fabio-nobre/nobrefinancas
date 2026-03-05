import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'

import { SidebarComponent } from './sidebar/sidebar.component'
import { HeaderComponent } from './header/header.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent
  ],
  template: `
<div class="flex h-screen bg-slate-100">

  <app-sidebar></app-sidebar>

  <div class="flex-1 flex flex-col">

    <app-header></app-header>

    <main class="flex-1 p-6 overflow-auto">
      <router-outlet></router-outlet>
    </main>

  </div>

</div>
`
})
export class LayoutComponent { }