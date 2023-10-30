import { Anchor, ScrollArea, Table, Tabs, Text } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { Booking, Event, Seminar, TimeSlot } from '@prisma/client';
import { IconCheck, IconX } from '@tabler/icons-react';
import FallbackPage from 'components/fallback/FallbackPage';
import PageHeading from 'components/heading/PageHeading';
import BackLink from 'components/links/BackLink';
import SeminarClientRow from 'components/tableRows/SeminarClientRow';
import { createBooking } from 'data/api/booking';
import getEndpoint from 'data/api/getEndpoint';
import useQueryState from 'hooks/router/useQueryState';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { OmitDates } from 'types/omit';
import { v4 } from 'uuid';

import { URL_REGEXP } from '../../utils/regex/url';

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

export default function EventPage({ event: serverSideEvent }: EventPageProps) {
	const router = useRouter();
	const [page, setPage] = useQueryState<number>('page', 1);

	const { data: bookings, mutate } = useSWR<Booking[]>(
		'/api/seminars/booking',
		getEndpoint
	);
	const bookedSeminarIds = useMemo(
		() =>
			bookings && bookings.length > 0 ? bookings.map((b) => b.seminarId) : [],
		[bookings]
	);
	const { data: session } = useSession();
	const event = useMemo(
		() =>
			serverSideEvent
				? {
						...serverSideEvent,
						timeSlots: serverSideEvent.timeSlots.map((e) => ({
							...e,
							start: new Date(e.start),
							end: new Date(e.end),
						})),
				  }
				: null,
		[serverSideEvent]
	);

	// Hack used to refactor when Mantine changed how tabs work
	// See https://mantine.dev/changelog/5-0-0/#tabs
	const activeTab = useMemo(() => event?.timeSlots[page - 1].id, [event, page]);
	const setActiveTab = useCallback(
		(slotId: string | null) =>
			setPage((event?.timeSlots.findIndex((x) => x.id === slotId) ?? 0) + 1),
		[setPage, event]
	);

	const getSlotSeminar = useCallback(
		(timeSlot: OmitDates<TimeSlot & { seminars: OmitDates<Seminar>[] }>) => {
			return (
				timeSlot.seminars.find((s) => bookedSeminarIds.includes(s.id)) ?? null
			);
		},
		[bookedSeminarIds]
	);

	async function onSignup(seminarId: string) {
		const id = v4();

		showNotification({
			id: `book-seminar-${id}`,
			message: 'Iscrizione in corso...',
			loading: true,
		});

		try {
			await mutate(createBooking(seminarId), {
				optimisticData: [
					...(bookings ?? []),
					{
						id: 'new',
						created_at: new Date(),
						updated_at: new Date(),
						seminarId,
						userId: session?.user.id ?? 'you',
					},
				],
				revalidate: false,
			});

			updateNotification({
				id: `book-seminar-${id}`,
				title: 'Seminario prenotato',
				message:
					"Torna il giorno del seminario per visualizzare il link tramite cui accedere all'evento!",
				color: 'teal',
				icon: <IconCheck />,
				loading: false,
			});
		} catch (err) {
			updateNotification({
				id: `book-seminar-${id}`,
				title: 'Errore',
				message: 'Non è stato possibile prenotare questo seminario',
				color: 'red',
				icon: <IconX />,
				loading: false,
			});
		}
	}

	if (router.isFallback) {
		return <FallbackPage />;
	}

	return (
		<>
			<BackLink>Torna indietro</BackLink>

			<h1 style={{ margin: 0 }}>Evento</h1>

			<Tabs value={activeTab} onChange={(newTab) => setActiveTab(newTab)}>
				<Tabs.List grow>
					{event?.timeSlots.map((slot) => (
						<Tabs.Tab value={slot.id} key={slot.id}>
							{slot.name}
						</Tabs.Tab>
					))}
				</Tabs.List>

				{event?.timeSlots.map((slot) => {
					const registrationClosed =
						slot.start.getTime() - 1000 * 60 * 60 * 24 < new Date().getTime();

					const slotSeminar = getSlotSeminar(slot);

					return (
						<Tabs.Panel value={slot.id} key={slot.id}>
							{/*Show page if the event is in less than 1 day*/}
							{registrationClosed ? (
								<>
									<PageHeading type="h2" loading={!bookings}>
										Le iscrizioni per questa fascia sono terminate
									</PageHeading>

									{slotSeminar !== null && (
										<>
											{slotSeminar?.location.match(URL_REGEXP) ? (
												<Anchor href={slotSeminar?.location} target="_blank">
													{slotSeminar?.name}
												</Anchor>
											) : (
												<Text>
													{slotSeminar?.name} - {slotSeminar?.location}
												</Text>
											)}
										</>
									)}
								</>
							) : (
								<ScrollArea>
									<Table style={{ minWidth: '600px' }} striped>
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
													onSignup={onSignup}
													key={seminar.id}
													seminar={seminar}
													isSignedUp={bookedSeminarIds.includes(seminar.id)}
													loading={!bookings}
												/>
											))}
										</tbody>
									</Table>
								</ScrollArea>
							)}
						</Tabs.Panel>
					);
				})}
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
					seminars: {
						orderBy: { name: 'asc' },
						include: { _count: { select: { bookings: true } } },
					},
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
