import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import FallbackPage from 'components/fallback/FallbackPage';
import BackLink from 'components/links/BackLink';
import { Booking, Event, Seminar, TimeSlot } from '@prisma/client';
import { OmitDates } from 'types/omit';
import { Table, Tabs } from '@mantine/core';
import useQueryState from 'hooks/router/useQueryState';
import SeminarClientRow from 'components/tableRows/SeminarClientRow';
import useSWR from 'swr';
import getEndpoint from 'data/api/getEndpoint';
import { useMemo } from 'react';

export interface StaticTimeSlot extends Omit<TimeSlot, 'start' | 'end'> {
	start: string;
	end: string;
	seminars: OmitDates<Seminar & { _count: { bookings: number } }>[];
}

interface EventPageProps {
	event: OmitDates<Event> & {
		timeSlots: OmitDates<StaticTimeSlot>[];
	};
}

export default function EventPage({ event }: EventPageProps) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useQueryState<number>('page', 1);
	const { data: bookings } = useSWR<Booking[]>(
		'/api/seminars/booking',
		getEndpoint
	);
	const bookedSeminarIds = useMemo(
		() => bookings?.map((b) => b.seminarId) ?? [],
		[bookings]
	);

	function onSignup(seminarId: string, timeSlotId: string) {
		console.log(seminarId, timeSlotId);
	}

	if (router.isFallback) {
		return <FallbackPage />;
	}

	return (
		<>
			<BackLink>Torna indietro</BackLink>

			<h1 style={{ margin: 0 }}>Evento</h1>

			<Tabs
				active={activeTab - 1}
				onTabChange={(newTab) => setActiveTab(newTab + 1)}
			>
				{event.timeSlots.map((slot) => (
					<Tabs.Tab label={slot.name} key={slot.id}>
						<Table striped>
							<thead>
								<tr>
									<th>Seminario</th>
									<th>Dettagli</th>
									<th>Iscritti</th>
									<th>Iscriviti</th>
								</tr>
							</thead>

							<tbody>
								{slot.seminars.map((seminar) => (
									<SeminarClientRow
										timeSlot={slot}
										onSignup={onSignup}
										key={seminar.id}
										seminar={seminar}
										isSignedUp={bookedSeminarIds.includes(seminar.id)}
									/>
								))}
							</tbody>
						</Table>
					</Tabs.Tab>
				))}
			</Tabs>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const events = await prisma.event.findMany();

	return {
		paths: events.map((e) => `/events/${e.id}`),
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<EventPageProps> = async (ctx) => {
	const eventId = ctx.params?.eventId as string;

	const event = await prisma.event.findUnique({
		where: { id: eventId },
		include: {
			timeSlots: {
				include: {
					seminars: { include: { _count: { select: { bookings: true } } } },
				},
				orderBy: { start: 'asc' },
			},
		},
	});

	if (!eventId || !event) {
		return {
			notFound: true,
		};
	}

	const result = {
		...event,
		updated_at: event.updated_at.toISOString(),
		created_at: event.created_at.toISOString(),
		timeSlots: event.timeSlots.map(
			({ updated_at, created_at, start, end, ...s }) => ({
				...s,
				start: start.toISOString(),
				end: end.toISOString(),
				seminars: s.seminars.map(({ created_at, updated_at, ...s }) => s),
			})
		),
	};

	return {
		props: {
			event: result,
		},
		revalidate: 60,
	};
};
