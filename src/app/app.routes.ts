import { Routes } from '@angular/router'

import { LayoutComponent } from './features/layout/layout.component'
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page.component'
import { LancamentosPageComponent } from './features/lancamentos/pages/lancamentos-page.component'
import { CategoriasPageComponent } from './features/categorias/pages/categorias-page.component'

export const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        component: DashboardPageComponent
      },

      {
        path: 'lancamentos',
        component: LancamentosPageComponent
      },

      {
        path: 'categorias',
        component: CategoriasPageComponent
      }

    ]
  }

]