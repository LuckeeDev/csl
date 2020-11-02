import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
  }

  signIn() {
    this.auth.signIn();
  }
}
