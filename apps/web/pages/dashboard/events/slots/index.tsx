import { ScrollArea, Table } from '@mantine/core';
import { Event, TimeSlot } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import TimeSlotRow from 'components/tableRows/TimeSlotRow';
import getEndpoint from 'data/api/getEndpoint';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import { useMemo } from 'react';
import useSWR from 'swr';

function DashboardEventsSlots() {
	const { data: timeSlots } = useSWR<TimeSlot[]>(
		'/api/time-slots',
		getEndpoint
	);
	const { data: events } = useSWR<Event[]>('/api/events', getEndpoint);
	const rows = useMemo(
		() =>
			timeSlots?.map((t) => (
				<TimeSlotRow
					event={events?.find((e) => e.id === t.eventId)}
					key={t.id}
					timeSlot={t}
				/>
			)) ?? [],
		[timeSlots, events]
	);

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Fasce orarie</PageTitle>

			<PageHeading loading={!timeSlots || !events}>Fasce orarie</PageHeading>

			<ScrollArea>
				<Table style={{ minWidth: '800px' }}>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Inizio</th>
							<th>Fine</th>
							<th>Evento</th>
							<th>Azioni</th>
						</tr>
					</thead>

					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</DashboardPageContainer>
	);
}

DashboardEventsSlots.hasSidebar = true;
DashboardEventsSlots.sidebarLinks = EVENT_LINKS;
DashboardEventsSlots.hasLocalCache = true;

export default DashboardEventsSlots;
