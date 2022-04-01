import axios from 'axios';
import { CalendarEvent } from './calendarEvent';

interface Request {
	/**
	 * 1 means that there's a Google Meet conference
	 */
	conferenceDataVersion: 0 | 1;
	body: CalendarEvent;
}

export async function createCalendarEvent(
	accessToken: string,
	request: Request
) {
	const response = await axios.post<CalendarEvent>(
		`https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=${request.conferenceDataVersion}`,
		request.body,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);

	return response.data;
}
