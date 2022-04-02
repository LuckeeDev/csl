import { Seminar } from '@prisma/client';
import axios from 'axios';
import { SeminarFormValues } from 'hooks/forms/useSeminarForm';

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
