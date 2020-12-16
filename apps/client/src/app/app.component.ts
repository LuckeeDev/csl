import { Component, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';

@Component({
  selector: 'csl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // TODO: Add custom toastr to show use of cookies,
  //  add http interceptor for 413 (request-entity-too-large) and 403 (unauthorized)
  v = 'v1.1.0';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUser();
  }
}
