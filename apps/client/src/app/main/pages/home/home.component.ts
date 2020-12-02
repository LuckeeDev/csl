import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '@csl/ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginState: 'failed' | null;

  constructor(private router: Router, private toastr: ToastrService) {
    this.loginState = this.router.url.includes('login-failed') ? 'failed' : null;
  }

  ngOnInit(): void {
    if (this.loginState === 'failed') {
      this.toastr.showError('Il login non è andato a buon fine!');

      this.router.navigateByUrl('/', {
        state: { ignoreLoadingBar: true },
      });
    }
  }

}
