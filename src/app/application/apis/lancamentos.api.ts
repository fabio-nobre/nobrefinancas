import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lancamento } from '@/app/domain/financeiro';

@Injectable({ providedIn: 'root' })
export class LancamentosApi {

  private url = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Lancamento[]>(this.url);
  }

  salvar(l: Lancamento) {
    return this.http.post(this.url, l);
  }
}