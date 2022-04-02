import { SeminarFormValues } from 'hooks/forms/useSeminarForm';
import { createCalendarEvent } from '@csl/google';
import { TimeSlot } from '@prisma/client';
import { v4 } from 'uuid';

export default async function getLocation(
	data: SeminarFormValues,
	timeSlots: TimeSlot[],
	accessToken: string
) {
	if (data.location) {
		return data.location;
	}

	const timeSlot = timeSlots.find((s) => s.id === data.timeSlotId);

	if (!timeSlot) {
		throw 'You must provide an existing timeSlotId';
	}

	const event = await createCalendarEvent(accessToken, {
		conferenceDataVersion: 1,
		body: {
			summary: data.name,
			description: data.description,
			start: {
				dateTime: new Date(timeSlot?.start).toISOString(),
			},
			end: {
				dateTime: new Date(timeSlot?.end).toISOString(),
			},
			conferenceData: {
				createRequest: {
					conferenceSolutionKey: {
						type: 'hangoutsMeet',
					},
					requestId: v4(),
				},
			},
		},
	});

	return event.hangoutLink ?? data.location;
}
