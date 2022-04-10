import { Button } from '@mantine/core';
import { Event } from '@prisma/client';

interface EventRowProps {
	event: Event;
	onDelete: (eventId: string) => void;
}

export default function EventRow({ event, onDelete }: EventRowProps) {
	return (
		<tr>
			<td>{event.name}</td>
			<td>
				<Button color="red" onClick={() => onDelete(event.id)}>
					Elimina
				</Button>
			</td>
		</tr>
	);
}
