import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-suggestion-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-suggestion-widget.component.html'
})
export class BudgetSuggestionWidgetComponent {

  @Input() sugestoes: any[] = [];

  // mantém sua lógica
  get suggestionsOrdenadas() {
    return this.sugestoes
      .slice()
      .sort((a: any, b: any) =>
        b.sugestaoOrcamento - a.sugestaoOrcamento
      );
  }
}