import { Component, OnInit } from '@angular/core';
import { CommissioniService } from '@global/services/commissioni/commissioni.service';
import { Observable } from 'rxjs';
import { ICommissione } from '@csl/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'csl-portarti',
  templateUrl: './portarti.component.html',
  styleUrls: ['./portarti.component.scss']
})
export class PortartiComponent implements OnInit {
  portarti$: Observable<ICommissione>;

  constructor(private commissioni: CommissioniService) { }

  ngOnInit(): void {
    this.portarti$ = this.commissioni
    .getPage('portarti')
    .pipe(map((res) => res.data));
  }

}
