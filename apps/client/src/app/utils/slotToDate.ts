import { ICourse } from '@csl/shared';

export function slotToDate(slot: ICourse['slot']) {
	switch (slot) {
		case 'a':
			return {
				date: 29,
				hour: 8,
				minutes: 50,
			};
		case 'b':
			return {
				date: 29,
				hour: 10,
				minutes: 50,
			};
		case 'c':
			return {
				date: 30,
				hour: 8,
				minutes: 50,
			};
		case 'd':
			return {
				date: 30,
				hour: 10,
				minutes: 50,
			};
		case 'e':
			return {
				date: 31,
				hour: 8,
				minutes: 50,
			};
		case 'f':
			return {
				date: 31,
				hour: 10,
				minutes: 50,
			};
	}
}
