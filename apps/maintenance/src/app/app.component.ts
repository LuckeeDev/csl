import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'csl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'maintenance';
  copyright: string;

  ngOnInit() {
    this.copyright = 'Copyright 2020 - ' + new Date().getFullYear() + '©';
  }
}
