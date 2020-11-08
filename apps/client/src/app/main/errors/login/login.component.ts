import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@global/services/auth/auth.service';

@Component({
  selector: 'csl-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  next: string;

  constructor(private auth: AuthService, private activated: ActivatedRoute) {}

  ngOnInit(): void {
    this.next = this.activated.snapshot.paramMap.get('next');
  }

  signIn() {
    this.auth.signIn(this.next);
  }
}
