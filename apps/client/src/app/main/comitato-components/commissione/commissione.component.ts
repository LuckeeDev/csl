import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-commissione',
  templateUrl: './commissione.component.html',
  styleUrls: ['./commissione.component.scss'],
})
export class CommissioneComponent implements OnInit {
  // commissioneData: ICommissione;
  commissione: string;

  constructor(private activated: ActivatedRoute) {}

  ngOnInit(): void {
    // this.activated.paramMap.subscribe((params) => {
    //   this.commissione = params.get('commissione');

    //   this.commissioneData = commissioni.find(
    //     (x) => x.key === this.commissione
    //   );
    // });
  }
}
