import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerts-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts-widget.component.html'
})
export class AlertsWidgetComponent {

  @Input() alerts: any[] = [];

}