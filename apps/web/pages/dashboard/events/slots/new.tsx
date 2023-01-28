import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import { Event, TimeSlot } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import TimeSlotForm from 'components/forms/TimeSlotForm';
import PageTitle from 'components/head/PageTitle';
import PageHeading from 'components/heading/PageHeading';
import getEndpoint from 'data/api/getEndpoint';
import { createTimeSlot } from 'data/api/timeSlots';
import useTimeSlotForm, {
	TimeSlotFormValues,
} from 'hooks/forms/useTimeSlotForm';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import useSWR from 'swr';
import { v4 } from 'uuid';

function DashboardTimeSlotsNew() {
	const form = useTimeSlotForm();
	const { data: timeSlots, mutate } = useSWR<TimeSlot[]>(
		'/api/time-slots',
		getEndpoint
	);
	const { data: events } = useSWR<Event[]>('/api/events', getEndpoint);

	async function onSubmit({ startTime, endTime, ...data }: TimeSlotFormValues) {
		const id = v4();

		showNotification({
			id: `create-time-slot-${id}`,
			loading: true,
			message: 'Operazione in corso...',
		});

		const startHours = startTime.getHours();
		const startMinutes = startTime.getMinutes();

		const endHours = endTime.getHours();
		const endMinutes = endTime.getMinutes();

		data.startDate.setHours(startHours);
		data.startDate.setMinutes(startMinutes);

		data.endDate.setHours(endHours);
		data.endDate.setMinutes(endMinutes);

		const now = new Date();

		const newTimeSlot: TimeSlot = {
			created_at: now,
			updated_at: now,
			id: 'new',
			start: data.startDate,
			end: data.endDate,
			...data,
		};

		const optimisticData = timeSlots
			? [...timeSlots, newTimeSlot]
			: [newTimeSlot];

		await mutate(createTimeSlot(data), { revalidate: false, optimisticData });

		updateNotification({
			id: `create-time-slot-${id}`,
			color: 'teal',
			icon: <IconCheck />,
			loading: false,
			message:
				'Operazione completata con successo, ora puoi collegare dei seminari',
			title: 'Fascia oraria creata',
		});

		form.reset();
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Nuova fascia oraria</PageTitle>

			<PageHeading loading={!timeSlots || !events}>
				Nuova fascia oraria
			</PageHeading>

			<TimeSlotForm onSubmit={onSubmit} events={events ?? []} form={form} />
		</DashboardPageContainer>
	);
}

DashboardTimeSlotsNew.hasSidebar = true;
DashboardTimeSlotsNew.sidebarLinks = EVENT_LINKS;
DashboardTimeSlotsNew.hasLocalCache = true;

export default DashboardTimeSlotsNew;
