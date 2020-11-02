import { Component, OnInit } from '@angular/core';

import { AuthService } from '@global/services/auth/auth.service';
import { DialogService } from '@global/ui/services/dialog/dialog.service';

@Component({
  selector: 'app-rappre-home',
  templateUrl: './rappre-home.component.html',
  styleUrls: ['./rappre-home.component.scss'],
})
export class RappreHomeComponent implements OnInit {
  constructor(private dialog: DialogService, public auth: AuthService) {}

  ngOnInit(): void {}

  // Open modal to sign out
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
