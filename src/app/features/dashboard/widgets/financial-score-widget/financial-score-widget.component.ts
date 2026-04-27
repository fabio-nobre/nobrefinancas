import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financial-score-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './financial-score-widget.component.html'
})
export class FinancialScoreWidgetComponent {

  // 🔥 ESSA LINHA RESOLVE
  @Input() score: any;

}