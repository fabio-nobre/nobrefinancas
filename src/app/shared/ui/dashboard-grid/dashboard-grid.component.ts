import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-dashboard-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

<ng-content></ng-content>

</div>
`
})
export class DashboardGridComponent { }