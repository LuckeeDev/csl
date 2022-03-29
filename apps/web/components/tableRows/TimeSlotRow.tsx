import { Button, Loader } from '@mantine/core';
import { Event, TimeSlot } from '@prisma/client';

interface TimeSlotRowProps {
	timeSlot: TimeSlot;
	event?: Event;
}

export default function TimeSlotRow({ timeSlot, event }: TimeSlotRowProps) {
	const start = new Date(timeSlot.start);
	const end = new Date(timeSlot.end);

	return (
		<tr>
			<td>{timeSlot.name}</td>
			<td>
				{start.toLocaleTimeString()} {start.toLocaleDateString()}
			</td>
			<td>
				{end.toLocaleTimeString()} {end.toLocaleDateString()}
			</td>
			<td>{event?.name ?? <Loader />}</td>
			<td>
				<Button color="red">Elimina</Button>
			</td>
		</tr>
	);
}
