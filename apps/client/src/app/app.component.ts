import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';

@Component({
  selector: 'csl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  v = 'v1.1.1';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUser();
  }
}
