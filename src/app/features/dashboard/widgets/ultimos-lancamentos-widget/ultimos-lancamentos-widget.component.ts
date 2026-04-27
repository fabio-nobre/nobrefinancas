import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ultimos-lancamentos-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ultimos-lancamentos-widget.component.html'
})
export class UltimosLancamentosWidgetComponent {

  @Output() editar = new EventEmitter<any>();

  // 🔥 ESSA LINHA RESOLVE
  @Input() grupos: any[] = [];

}