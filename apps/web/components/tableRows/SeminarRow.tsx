import { Button } from '@mantine/core';
import { ExtendedSeminar } from 'types/seminars';

interface SeminarRowProps {
	seminar: ExtendedSeminar;
	onDelete: (seminarId: string) => void;
}

export default function SeminarRow({ seminar, onDelete }: SeminarRowProps) {
	return (
		<tr>
			<td>{seminar.name}</td>
			<td>{seminar.timeSlot.event.name}</td>
			<td>{seminar.timeSlot.name}</td>
			<td>
				<Button color="red" onClick={() => onDelete(seminar.id)}>
					Elimina
				</Button>
			</td>
		</tr>
	);
}
