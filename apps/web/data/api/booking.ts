import { Booking } from '@prisma/client';
import axios from 'axios';

export function createBooking(seminarId: string) {
	return async () => {
		const { data: newData } = await axios.post<Booking[]>(
			'/api/seminars/booking',
			{
				seminarId,
			}
		);

		return newData;
	};
}
