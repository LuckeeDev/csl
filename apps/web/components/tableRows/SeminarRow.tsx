import { Button } from '@mantine/core';
import { ExtendedSeminar } from 'types/seminars';

interface SeminarRowProps {
	seminar: ExtendedSeminar;
}

export default function SeminarRow({ seminar }: SeminarRowProps) {
	return (
		<tr>
			<td>{seminar.name}</td>
			<td>{seminar.timeSlot.event.name}</td>
			<td>{seminar.timeSlot.name}</td>
			<td>
				<Button color="red">Elimina</Button>
			</td>
		</tr>
	);
}
