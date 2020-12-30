import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '@csl/ui';
import { AppService } from '@global/services/app/app.service';

@Component({
  selector: 'csl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isInstalled: boolean;
  loginState: 'failed' | null;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public app: AppService
  ) {
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

  installPrompt() {
    this.app.installPrompt.prompt();
  }
}
