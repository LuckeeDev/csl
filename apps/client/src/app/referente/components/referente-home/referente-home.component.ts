import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { DialogService } from '@csl/ui';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'csl-referente-home',
  templateUrl: './referente-home.component.html',
  styleUrls: ['./referente-home.component.scss']
})
export class ReferenteHomeComponent implements OnInit {
  commissione: string;

  constructor(public auth: AuthService, private dialog: DialogService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.commissione = this.activated.snapshot.paramMap.get('commissione');
    console.log(this.commissione);
  }

  signOut() {
    this.dialog
      .open({
        title: 'Sei sicuro di voler uscire?',
        text: 'Ciò che stavi facendo potrebbe non essere salvato',
        color: 'warn',
        answer: 'Sì, esci',
      })
      .subscribe((res) => {
        this.auth.signOut();
      });
  }
}
