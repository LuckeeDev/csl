import { Seminar } from '@prisma/client';
import { OmitDates } from 'types/omit';

export interface SeminarClientRowProps {
	seminar: OmitDates<Seminar>;
}

export default function SeminarClientRow({ seminar }: SeminarClientRowProps) {
	return (
		<tr>
			<td>{seminar.name}</td>
		</tr>
	);
}
