import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'csl-md',
  templateUrl: './md.component.html',
  styleUrls: ['./md.component.scss']
})
export class MdComponent implements OnInit {
  data: { [key: string]: any };

  path: string;
  privacy: boolean;

  constructor(private activated: ActivatedRoute) {
    this.data = this.activated.snapshot.data;
  }

  ngOnInit(): void {
    this.path = `${environment.api}/md/${this.data.file}`;
    this.privacy = this.data.privacy;
  }

}
