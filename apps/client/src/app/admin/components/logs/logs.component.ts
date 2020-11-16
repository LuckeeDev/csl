import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AdminService } from '@admin/services/admin/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { ILog } from '@csl/shared';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

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

  constructor(private admin: AdminService, private router: Router) {
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
}
