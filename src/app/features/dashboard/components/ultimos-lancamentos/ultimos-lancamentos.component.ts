import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-ultimos-lancamentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimos-lancamentos.component.html'
})
export class UltimosLancamentosComponent {

  @Input() data: any[] = []

}