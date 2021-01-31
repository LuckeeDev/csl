import { Injectable } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { DialogService } from '@csl/ui';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { environment } from '@environments/environment';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IHttpRes } from '@csl/shared';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SwService {
  public installPrompt;
  public isInstalled: boolean;
  public isStandalone: boolean;
  public loading = false;

  constructor(
    private readonly updates: SwUpdate,
    private push: SwPush,
    private http: HttpClient,
    private dialog: DialogService,
    private afm: AngularFireMessaging
  ) {
    if (environment.production) {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        this.isStandalone = true;
        console.log('%cSW:%c Standalone', 'background: #222; color: #fff', 'color: #00CC25');
      }

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
    this.afm.requestPermission.pipe(
      switchMap(() => this.afm.getToken),
      switchMap((token) => this.subscribeToGlobalTopic(token)),
    ).subscribe(() => {
      console.log('%cSW:%c Notifiche attivate', 'background: #222; color: #fff', 'color: #00CC25');
    }, () => {
      console.log('%cSW:%c Notifiche bloccate', 'background: #222; color: #fff', 'color: #EB1A28');
    });
  }

  receiveMessages() {
    this.push.messages.subscribe();

    this.push.notificationClicks.subscribe();
  }

  subscribeToGlobalTopic(token: string): Observable<IHttpRes<any>> {
    return this.http.post<IHttpRes<any>>(
      '/fire/topics/global',
      { token },
      { headers: { ignoreLoadingBar: ''}}
      );
  }

  checkForUpdates() {
    this.loading = true;

    this.updates.checkForUpdate()
      .then(() => this.loading = false)
      .catch(() => {
        console.log('SW are disabled');
        this.loading = false;
      });
  }
}
