import { Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICommissione } from '@csl/shared';

@Component({
  selector: 'csl-asl',
  templateUrl: './asl.component.html',
  styleUrls: ['./asl.component.scss']
})
export class AslComponent implements OnInit {
  asl$: Observable<ICommissione>;

  constructor(private commissioni: CommissioniService) { }

  ngOnInit(): void {
    this.asl$ = this.commissioni
    .getPage('asl')
    .pipe(map((res) => res.data));
  }

}
