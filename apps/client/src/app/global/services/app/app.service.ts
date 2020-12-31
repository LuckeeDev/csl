import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DialogService } from '@csl/ui';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public installPrompt;
  public isInstalled: boolean;

  constructor(private readonly updates: SwUpdate, private dialog: DialogService) {
    this.updates.available.subscribe(() => {
      this.showAppUpdateAlert();
    });
  }

  showAppUpdateAlert() {
    this.dialog.open({
      color: 'primary',
      answer: 'Aggiorna',
      text: "Vuoi aggiornare l'app? Se confermi, l'applicazione verrà riavviata e sarà disponibile nella nuova versione",
      title: "Aggiornamento disponibile"
    }).subscribe(() => {
      this.updates.activateUpdate().then(() => document.location.reload());
    });
  }
}
