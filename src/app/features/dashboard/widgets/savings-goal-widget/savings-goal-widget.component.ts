import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-savings-goal-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './savings-goal-widget.component.html'
})
export class SavingsGoalWidgetComponent {

  // 🔥 ESSAS LINHAS RESOLVEM
  @Input() meta: any;
  @Input() status: any;

}