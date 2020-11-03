import { Component, OnInit } from '@angular/core';
import { ReportsService } from '@global/services/reports/reports.service';
import { IReport } from '@csl/shared';

@Component({
  selector: 'csl-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  technical: IReport[];
  visual: IReport[];
  other: IReport[];

  constructor(private reports: ReportsService) { }

  ngOnInit(): void {
    this.reports.getReports().subscribe((res) => {
      this.technical = res.data.filter(x => x.bug.category === 'Tecnico');
      this.visual = res.data.filter(x => x.bug.category === 'Visivo');
      this.other = res.data.filter(x => x.bug.category === 'Altro');
    })
  }

}
