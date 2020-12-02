import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AdminService } from '@admin/services/admin/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { ILog } from '@csl/shared';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { DialogService, ToastrService } from '@csl/ui';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'csl-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements AfterViewInit {
  displayedColumns: string[] = ['time', 'message'];
  dataSource: MatTableDataSource<ILog>;

  logType: 'events' | 'errors';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private admin: AdminService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: DialogService
  ) {
    this.logType = this.router.url.includes('events') ? 'events' : 'errors';
  }

  ngAfterViewInit() {
    if (this.logType === 'events') {
      this.admin.getEvents().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data.reverse());

        this.dataSource.paginator = this.paginator;
      });
    } else if (this.logType === 'errors') {
      this.admin.getErrors().subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data.reverse());

        this.dataSource.paginator = this.paginator;
      });
    }
  }

  emptyLogs() {
    this.dialog
      .open({
        title: 'Svuotare logs?',
        text: 'Tutti i dati cancellati non potranno essere recuperati',
        answer: 'Sì, elimina',
        color: 'warn',
      })
      .pipe(switchMap(() => this.admin.emptyLogs(this.logType)))
      .subscribe((res) => {
        if (res.success) {
          this.dataSource = new MatTableDataSource([]);

          this.toastr.show({
            message: 'Logs svuotati',
            color: 'basic',
          });
        } else {
          this.toastr.showError();
        }
      });
  }
}
