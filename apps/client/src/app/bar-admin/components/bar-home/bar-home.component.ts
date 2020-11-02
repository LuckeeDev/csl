import { Component, OnInit } from '@angular/core';
import { DialogService } from '@global/ui/services/dialog/dialog.service';
import { AuthService } from '@global/services/auth/auth.service';

@Component({
  selector: 'app-bar-home',
  templateUrl: './bar-home.component.html',
  styleUrls: ['./bar-home.component.scss'],
})
export class BarHomeComponent implements OnInit {
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
