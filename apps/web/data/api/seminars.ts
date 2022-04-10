import { Booking, Seminar } from '@prisma/client';
import axios from 'axios';
import { SeminarFormValues } from 'hooks/forms/useSeminarForm';
import { ExtendedSeminar } from 'types/seminars';

export function createSeminar(data: SeminarFormValues) {
	return async (
		currentData: { seminars: Seminar[]; seminarsCount: number } | undefined
	) => {
		const seminars = currentData?.seminars ?? [];
		const seminarsCount = currentData?.seminarsCount ?? 0;

		const { data: newSeminar } = await axios.post<Seminar>(
			'/api/seminars',
			data
		);

		const index = seminars.findIndex((s) => s.id === 'new');

		if (index !== -1) {
			seminars[index] = newSeminar;
		} else {
			seminars.push(newSeminar);
		}

		return { seminars, seminarsCount: seminarsCount + 1 };
	};
}

export function deleteSeminar(seminarId: string) {
	return async (
		currentData:
			| { seminars: ExtendedSeminar[]; seminarsCount: number }
			| undefined
	) => {
		await axios.delete(`/api/seminars/${seminarId}`);

		const index = currentData?.seminars.findIndex((s) => s.id === seminarId);

		if (index && index !== -1) {
			currentData?.seminars.splice(index, 1);
		}

		return currentData;
	};
}

export function bookSeminar(seminarId: string, userId: string) {
	return async () => {
		const { data } = await axios.post<Booking[]>('/api/seminars/booking', {
			seminarId,
			userId,
		});

		return data;
	};
}
