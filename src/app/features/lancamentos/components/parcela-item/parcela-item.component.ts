import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Parcela } from '@/app/domain/financeiro/entities/parcela.entity';

@Component({
  selector: 'app-parcela-item',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
<div class="flex justify-between">

<span>
Parcela {{parcela.numero}}
</span>

<span>
{{parcela.valor | currency:'BRL'}}
</span>

</div>
`
})
export class ParcelaItemComponent {

  @Input() parcela!: Parcela;

}