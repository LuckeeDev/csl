import { TimeSlot } from '@prisma/client';
import axios from 'axios';

interface TimeSlotPostData {
	endDate: Date;
	startDate: Date;
	eventId: string;
	name: string;
}

export function createTimeSlot(timeSlot: TimeSlotPostData) {
	return async (timeSlots: TimeSlot[] | undefined) => {
		const { data } = await axios.post<TimeSlot>('/api/time-slots', timeSlot);

		const result = timeSlots ? [...timeSlots, data] : [data];

		return result;
	};
}
