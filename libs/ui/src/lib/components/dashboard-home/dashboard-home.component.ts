import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@csl/shared';

@Component({
  selector: 'csl-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  @Input()
  user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}
