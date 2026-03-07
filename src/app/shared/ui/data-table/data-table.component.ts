import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
<table class="w-full text-sm">

<thead class="border-b text-slate-500">

<tr>
<th *ngFor="let col of columns" class="text-left py-2">
{{ col }}
</th>
</tr>

</thead>

<tbody>

<ng-content></ng-content>

</tbody>

</table>
`
})
export class DataTableComponent {

  @Input() columns: string[] = []

}