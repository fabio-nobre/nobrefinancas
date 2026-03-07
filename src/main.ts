import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'
import { AppComponent } from './app/app.component'
import { routes } from './app/app.routes'
import { provideCharts } from 'ng2-charts'

import { LucideAngularModule, LayoutDashboard, Wallet } from 'lucide-angular'
import { importProvidersFrom } from '@angular/core'



bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        LayoutDashboard,
        Wallet
      })
    ),
    provideCharts()
  ]
})