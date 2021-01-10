import { Component, OnInit } from '@angular/core';
import { OrientamentoService } from '@global/services/orientamento/orientamento.service';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { IEvent } from '@csl/shared';

@Component({
  selector: 'csl-orientamento',
  templateUrl: './orientamento.component.html',
  styleUrls: ['./orientamento.component.scss']
})
export class OrientamentoComponent implements OnInit {

  events: IEvent[];

  constructor(
    private orientamento: OrientamentoService,
    private afs: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.orientamento.getEvents()
      .pipe(
        map((res) => res.data),
      )
      .subscribe((events) => {
        events.forEach((event, index) => {
          this.afs
            .ref(`orientamento/covers/${event.cover}`)
            .getDownloadURL()
            .subscribe((url) => {
              events[index].cover = url;
            });
        });

        this.events = events.map((event) => {
          delete event.cover;

          return event;
        });
      });
  }

}
