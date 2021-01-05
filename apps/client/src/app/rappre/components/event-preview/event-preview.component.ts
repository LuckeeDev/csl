import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '@csl/shared';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'csl-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit {

  @Input()
  event: IEvent;

  @Input()
  previewURL: string;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  bypassURLSanitizer(url: string) {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

}
