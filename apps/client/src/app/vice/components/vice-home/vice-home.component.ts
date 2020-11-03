import { Component, OnInit } from '@angular/core';
import { DialogService } from '@csl/ui';
import { AuthService } from '@global/services/auth/auth.service';

@Component({
  selector: 'app-vice-home',
  templateUrl: './vice-home.component.html',
  styleUrls: ['./vice-home.component.scss'],
})
export class ViceHomeComponent implements OnInit {
  constructor(private dialog: DialogService, public auth: AuthService) {}

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
