import { Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { ICommissione } from '@csl/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comitato-home',
  templateUrl: './comitato-home.component.html',
  styleUrls: ['./comitato-home.component.scss'],
})
export class ComitatoHomeComponent implements OnInit {
  comitato$: Observable<ICommissione>;

  constructor(private commissioni: CommissioniService) {}

  ngOnInit(): void {
    this.comitato$ = this.commissioni
      .getPage('comitato')
      .pipe(map((res) => res.data));
  }
}
