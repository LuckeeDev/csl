import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  v = 'v0.0.9';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUser();
  }
}
