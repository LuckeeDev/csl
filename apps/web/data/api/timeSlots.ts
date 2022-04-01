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

		if (timeSlots) {
			const index = timeSlots.findIndex((v) => v.id === 'new');

			if (index !== -1) {
				timeSlots[index] = data;

				return timeSlots;
			}

			timeSlots.push(data);

			return timeSlots;
		}

		return [data];
	};
}
