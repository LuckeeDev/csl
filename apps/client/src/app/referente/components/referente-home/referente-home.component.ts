import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { DialogService } from '@csl/ui';

@Component({
  selector: 'csl-referente-home',
  templateUrl: './referente-home.component.html',
  styleUrls: ['./referente-home.component.scss']
})
export class ReferenteHomeComponent implements OnInit {
  commissione: string;

  constructor(public auth: AuthService, private dialog: DialogService) { }

  ngOnInit(): void {
  }

  signOut() {
    this.dialog
      .open({
        title: 'Sei sicuro di voler uscire?',
        text: 'Ciò che stavi facendo potrebbe non essere salvato',
        color: 'warn',
        answer: 'Sì, esci',
      })
      .subscribe(() => {
        this.auth.signOut();
      });
  }
}
