import axios from 'axios';
import { CalendarEventResource } from './calendarEventResource';

interface Request {
	conferenceDataVersion: 0 | 1;
	body: CalendarEventResource;
}

export async function createCalendarEvent(
	accessToken: string,
	request: Request
) {
	const response = await axios.post(
		`https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=${request.conferenceDataVersion}`,
		request.body,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	return response;
}
