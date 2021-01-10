import { Component, OnInit } from '@angular/core';
import { OrientamentoService } from '@global/services/orientamento/orientamento.service';
import {
  CSLDataTableAction,
  CSLDataTableDisplayedColumns,
  CSLDataTableEvent,
  CSLDataTableSource,
  IEvent,
} from '@csl/shared';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DialogService, ToastrService } from '@csl/ui';

type Actions = 'DELETE';

@Component({
  selector: 'csl-orientamento',
  templateUrl: './orientamento.component.html',
  styleUrls: ['./orientamento.component.scss']
})
export class OrientamentoComponent implements OnInit {

  events: Observable<CSLDataTableSource>;

  actions: CSLDataTableAction<Actions>[] = [
    {
      id: 'DELETE',
      label: 'Elimina Evento',
      type: 'warn',
    }
  ]

  displayedColumns: CSLDataTableDisplayedColumns = [
    { type: 'data', id: 'title', label: 'Titolo', },
    { type: 'data', id: 'description', label: 'Descrizione', },
    { type: 'actions', id: 'manage', label: 'Gestisci', }
  ]

  event: IEvent;

  constructor(
    private orientamento: OrientamentoService,
    private dialog: DialogService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  eventHandler(e: CSLDataTableEvent<Actions>) {
    if (e.action === 'DELETE') {
      this.deleteEvent(e.id);
    }
  }

  deleteEvent(id: string) {
    this.dialog.open({
      title: "Eliminare l'evento?",
      answer: 'Elimina',
      text: "I dati dell'evento non potranno più essere recuperati",
      color: 'warn',
    })
      .pipe(
        switchMap(() => this.orientamento.deleteEvent(id)),
      )
      .subscribe((res) => {
        if (res.success) {
          this.getEvents();

          this.toastr.show({
            color: 'basic',
            message: 'Evento eliminato',
          });
        } else {
          this.toastr.showError();
        }
      });
  }

  getEvents(): void {
    this.events = this.orientamento.getEvents().pipe(
      map((res) =>
        res.data.map((event) => ({
          id: event.id,
          data: event,
          actions: this.actions,
        })) as CSLDataTableSource
      ),
    );
  }

}
