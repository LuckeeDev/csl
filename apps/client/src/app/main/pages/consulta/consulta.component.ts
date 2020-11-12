import { Component, OnInit } from '@angular/core';
import { ICommissione } from '@csl/shared';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'csl-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  consulta$: Observable<ICommissione>;

  constructor(private commissioni: CommissioniService) { }

  ngOnInit(): void {
    this.consulta$ = this.commissioni
    .getPage('consulta')
    .pipe(map((res) => res.data));
  }

}
