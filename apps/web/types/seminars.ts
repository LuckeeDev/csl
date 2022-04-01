import { Event, Seminar, TimeSlot } from '@prisma/client';

export type ExtendedSeminar = Seminar & {
	timeSlot: TimeSlot & {
		event: Event;
	};
};
