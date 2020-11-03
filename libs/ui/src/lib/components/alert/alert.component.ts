import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'csl-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input()
  color: 'primary' | 'success' | 'accent' | 'warn';

  constructor() {}

  ngOnInit(): void {}
}
