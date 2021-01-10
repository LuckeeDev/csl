import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrientamentoService } from '@global/services/orientamento/orientamento.service';
import { Observable } from 'rxjs';
import { IEvent } from '@csl/shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'csl-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  id: string;

  event: Observable<IEvent>;

  constructor(
    private activated: ActivatedRoute,
    private orientamento: OrientamentoService,
  ) { }

  ngOnInit(): void {
    this.id = this.activated.snapshot.paramMap.get('id');

    this.event = this.orientamento.getEvent(this.id).pipe(map(res => res.data));
  }

}
