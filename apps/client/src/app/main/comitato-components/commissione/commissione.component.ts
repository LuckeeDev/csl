import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { ICommissione } from '@csl/shared';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'csl-commissione',
  templateUrl: './commissione.component.html',
  styleUrls: ['./commissione.component.scss'],
})
export class CommissioneComponent implements OnInit {
  commissione$: Observable<ICommissione>;
  id: string;

  constructor(
    private activated: ActivatedRoute,
    private commissioni: CommissioniService
  ) {}

  ngOnInit(): void {
    this.commissione$ = this.activated.paramMap.pipe(
      switchMap((params) => this.commissioni.getPage(params.get('id'))),
      map((res) => res.data)
    );
  }
}
