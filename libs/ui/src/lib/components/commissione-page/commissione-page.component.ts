import { Component, Input, OnInit } from '@angular/core';
import { ICommissione } from '@csl/shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'csl-commissione-page',
  templateUrl: './commissione-page.component.html',
  styleUrls: ['./commissione-page.component.scss'],
})
export class CommissionePageComponent implements OnInit {
  @Input()
  commissione: Observable<ICommissione>;

  constructor() {}

  ngOnInit(): void {}
}
