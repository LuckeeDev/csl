import { Button } from '@mantine/core';
import { Event } from '@prisma/client';

interface EventRowProps {
	event: Event;
}

export default function EventRow({ event }: EventRowProps) {
	return (
		<tr>
			<td>{event.name}</td>
			<td>
				<Button color="red">Elimina</Button>
			</td>
		</tr>
	);
}
