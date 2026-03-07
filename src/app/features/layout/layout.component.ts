import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { SidebarComponent } from './sidebar/sidebar.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  template: `

<div class="flex h-screen">

  <app-sidebar></app-sidebar>

  <main class="flex-1 overflow-auto">
    <router-outlet></router-outlet>
  </main>

</div>

`
})
export class LayoutComponent { }