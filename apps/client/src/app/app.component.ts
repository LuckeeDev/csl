import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '@global/services/auth/auth.service';
import { AppService } from '@global/services/app/app.service';
import { ToastrService } from '@csl/ui';

@Component({
  selector: 'csl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  v = 'v1.2.4';

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e) {
    e.preventDefault();

    this.app.installPrompt = e;
    this.app.isInstalled = false;
  }

  @HostListener('window:appinstalled', ['$event'])
  onAppInstalled() {
    this.app.isInstalled = true;

    this.toastr.show({
      message: 'App installata con successo',
      color: 'basic',
    });
  }

  constructor(
    private auth: AuthService,
    private app: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.auth.getUser();
  }
}
