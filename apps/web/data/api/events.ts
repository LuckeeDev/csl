import { Event } from '@prisma/client';
import axios from 'axios';
import { NewEventFormValues } from 'pages/dashboard/events';

export async function getEvents(url: string) {
	return (await axios.get<Event[]>(url)).data;
}

export function createEvent(event: NewEventFormValues) {
	return async (currentEvents: Event[] | undefined) => {
		const { data } = await axios.post<Event>('/api/events', event);

		const events = currentEvents ?? [];

		const index = events.findIndex((e) => e.id === 'new');

		if (index !== -1) {
			events[index] = data;
		} else {
			events.push(data);
		}

		return events;
	};
}
