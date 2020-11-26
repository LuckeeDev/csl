import { Component, OnInit } from '@angular/core';
import { ReportsService } from '@global/services/reports/reports.service';
import { IReport } from '@csl/shared';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ToastrService } from '@csl/ui';

@Component({
  selector: 'csl-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  technical: IReport[];
  visual: IReport[];
  other: IReport[];

  constructor(private reports: ReportsService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.updateReports();
  }

  updateReports() {
    this.reports.getReports().subscribe((res) => {
      this.technical = res.data.filter((x) => x.bug.category === 'Tecnico');
      this.visual = res.data.filter((x) => x.bug.category === 'Visivo');
      this.other = res.data.filter((x) => x.bug.category === 'Altro');
    });
  }

  toggleSolved(e: MatCheckboxChange, report: IReport['id']) {
    this.reports.toggleSolved(report, e.checked).subscribe((res) => {
      if (res.success) {
        this.toastr.show({
          color: 'basic',
          message: 'Stato della segnalazione modificato',
        });

        this.updateReports();
      } else {
        this.toastr.showError();
      }
    });
  }

  unsolved(category: IReport['bug']['category']): number | null {
    let length: number;

    if (this[category]) {
      length = this[category].filter((x: IReport) => x.solved === false)
        .length;
    } else {
      length = 0;
    }

    return length === 0 ? null : length;
  }
}
