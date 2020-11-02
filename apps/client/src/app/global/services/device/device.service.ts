import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor() {}

  get type$(): Observable<'big' | 'small'> {
    return fromEvent(window, 'resize').pipe(
      startWith(() => {
        if (window.innerWidth > 1250) {
          return 'big';
        } else {
          return 'small';
        }
      }),
      map(() => {
        if (window.innerWidth > 1250) {
          return 'big';
        } else {
          return 'small';
        }
      })
    );
  }

  get type(): 'big' | 'small' {
    if (window.innerWidth > 1250) {
      return 'big';
    } else {
      return 'small';
    }
  }
}
