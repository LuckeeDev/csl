import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { IDashboardLink } from '@csl/shared';
import { DeviceService } from '../../services/device/device.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-model',
  templateUrl: './dashboard-model.component.html',
  styleUrls: ['./dashboard-model.component.scss'],
})
export class DashboardModelComponent implements OnInit {
  @Input() links: IDashboardLink[];

  constructor(private device: DeviceService) {}

  ngOnInit(): void {}

  get mode$(): Observable<'side' | 'over'> {
    return this.device.type$.pipe(
      map((val) => {
        if (val === 'big') {
          return 'side';
        } else if (val === 'small') {
          return 'over';
        }
      })
    );
  }

  get opened$(): Observable<boolean> {
    return this.device.type$.pipe(
      map((val) => {
        if (val === 'big') {
          return true;
        } else if (val === 'small') {
          return false;
        }
      })
    );
  }

  get small$(): Observable<boolean> {
    return this.device.type$.pipe(
      map((val) => {
        if (val === 'big') {
          return false;
        } else if (val === 'small') {
          return true;
        }
      })
    );
  }

  navigate(sidenav: MatSidenav) {
    if (this.device.type === 'small') {
      sidenav.close();
    }
  }
}
