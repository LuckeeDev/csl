import { Button, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { Seminar } from '@prisma/client';
import { OmitDates } from 'types/omit';

export interface SeminarClientRowProps {
	seminar: OmitDates<Seminar & { _count: { bookings: number } }>;
	onSignup: (seminarId: string) => void;
	isSignedUp: boolean;
	loading: boolean;
}

export default function SeminarClientRow({
	seminar,
	onSignup,
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
						<IconCheck />
						Sei iscritto
					</Text>
				) : (
					seminar._count.bookings < seminar.maxBookings && (
						<Button
							size="xs"
							loading={loading}
							onClick={() => onSignup(seminar.id)}
						>
							Iscriviti
						</Button>
					)
				)}
			</td>
		</tr>
	);
}
