import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-categorias-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias-widget.component.html'
})
export class CategoriasWidgetComponent implements AfterViewInit {

  @ViewChild('chartCanvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @Input()
  categorias: { categoria: string; valor: number }[] = [];

  private chart?: Chart;
  private rendered = false;

  ngAfterViewInit(): void {
    this.safeRender();
  }
  constructor() {
    console.log('🧱 COMPONENTE CRIADO');
  }
  private safeRender() {

    if (this.rendered) return;
    if (!this.categorias?.length) return;

    this.rendered = true;

    setTimeout(() => {
      this.render();
    }, 0);
  }

  private render(): void {

    if (!this.canvas) return;

    const el = this.canvas.nativeElement;

    console.log('canvas real:', el);

    // 🔥 TESTE VISUAL DIRETO (já funcionou)
    const ctx = el.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 300, 300);

    // 🔥 AGORA TESTE CHART MÍNIMO
    this.chart = new Chart(el, {
      type: 'bar',
      data: {
        labels: ['A', 'B'],
        datasets: [{
          label: 'Teste',
          data: [10, 20]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    console.log('🔥 TESTE CHART EXECUTADO');
  }
}