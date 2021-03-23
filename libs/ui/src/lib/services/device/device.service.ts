import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable()
export class DeviceService {
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

	get type(): 'big' | 'small' | 'medium' {
		const width = window.innerWidth;

		if (width > 1250) {
			return 'big';
		} else if (width >= 768 && width <= 1250) {
			return 'medium';
		} else {
			return 'small';
		}
	}
}
