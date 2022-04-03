import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import prisma from 'prisma/client';
import FallbackPage from 'components/fallback/FallbackPage';
import BackLink from 'components/links/BackLink';
import { Event, Seminar, TimeSlot } from '@prisma/client';
import { OmitDates } from 'types/omit';
import { Table, Tabs } from '@mantine/core';
import useQueryState from 'hooks/router/useQueryState';
import SeminarClientRow from 'components/tableRows/SeminarClientRow';

interface StaticTimeSlot extends Omit<TimeSlot, 'start' | 'end'> {
	start: string;
	end: string;
	seminars: OmitDates<Seminar>[];
}

interface EventPageProps {
	event: OmitDates<Event> & {
		timeSlots: OmitDates<StaticTimeSlot>[];
	};
}

export default function EventPage({ event }: EventPageProps) {
	const router = useRouter();
	const [activeTab, setActiveTab] = useQueryState<number>('page', 1);

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
				{event.timeSlots.map((s) => (
					<Tabs.Tab label={s.name} key={s.id}>
						<Table>
							<thead>
								<tr>
									<th>Nome</th>
								</tr>
							</thead>

							<tbody>
								{s.seminars.map((seminar) => (
									<SeminarClientRow key={seminar.id} seminar={seminar} />
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
			timeSlots: { include: { seminars: true }, orderBy: { start: 'asc' } },
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
