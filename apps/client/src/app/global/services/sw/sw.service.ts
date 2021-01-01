import { Injectable } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { DialogService, ToastrService } from '@csl/ui';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwService {
  public installPrompt;
  public isInstalled: boolean;

  constructor(
    private readonly updates: SwUpdate,
    private push: SwPush,
    private dialog: DialogService,
    private toastr: ToastrService,
    private afm: AngularFireMessaging
  ) {
    this.updates.available.subscribe(() => {
      this.showAppUpdateAlert();
    });

    navigator.serviceWorker
      .getRegistration(environment.client)
      .then(
        (sw) => this.afm.useServiceWorker(sw)
      );

    this.requestPermission();

    this.receiveMessages();
  }

  showAppUpdateAlert() {
    this.dialog.open({
      color: 'primary',
      answer: 'Aggiorna',
      text: "Vuoi aggiornare l'app? Se confermi, l'applicazione verrà riavviata e sarà disponibile nella nuova versione",
      title: "Aggiornamento disponibile",
      disableClose: true,
    }).subscribe(() => {
      this.updates.activateUpdate().then(() => document.location.reload());
    });
  }

  requestPermission() {
    this.afm.requestPermission.subscribe();
  }

  receiveMessages() {
    this.push.messages.subscribe();

    this.push.notificationClicks.subscribe();
  }
}
