import { Component, OnInit } from '@angular/core';

import { AuthService } from '@global/services/auth/auth.service';
import { DialogService } from '@csl/ui';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService, private dialog: DialogService) {}

  ngOnInit(): void {}

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
