import { Button, Text } from '@mantine/core';
import { CheckIcon } from '@modulz/radix-icons';
import { Seminar } from '@prisma/client';
import { StaticTimeSlot } from 'pages/events/[eventId]';
import { OmitDates } from 'types/omit';

export interface SeminarClientRowProps {
	seminar: OmitDates<Seminar & { _count: { bookings: number } }>;
	onSignup: (seminarId: string, timeSlotId: string) => void;
	timeSlot: OmitDates<StaticTimeSlot>;
	isSignedUp: boolean;
	loading: boolean;
}

export default function SeminarClientRow({
	seminar,
	onSignup,
	timeSlot,
	isSignedUp,
	loading,
}: SeminarClientRowProps) {
	return (
		<tr>
			<td>{seminar.name}</td>

			<td>{seminar.description}</td>

			<td>
				{seminar._count.bookings} / {seminar.maxBookings}
			</td>

			<td>
				{isSignedUp ? (
					<Text color="teal" style={{ display: 'flex', alignItems: 'center' }}>
						<CheckIcon />
						Sei iscritto
					</Text>
				) : (
					seminar._count.bookings < seminar.maxBookings && (
						<Button
							size="xs"
							loading={loading}
							onClick={() => onSignup(seminar.id, timeSlot.id)}
						>
							Iscriviti
						</Button>
					)
				)}
			</td>
		</tr>
	);
}
