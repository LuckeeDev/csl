import { Event } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import TimeSlotForm from 'components/forms/TimeSlotForm';
import PageTitle from 'components/head/PageTitle';
import getEndpoint from 'data/api/getEndpoint';
import useTimeSlotForm, {
	TimeSlotFormValues,
} from 'hooks/forms/useTimeSlotForm';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import useSWR from 'swr';

function DashboardTimeSlotsNew() {
	const form = useTimeSlotForm();
	const { data: events } = useSWR('/api/events', getEndpoint<Event[]>());

	function onSubmit({ startTime, endTime, ...data }: TimeSlotFormValues) {
		const startHours = startTime.getHours();
		const startMinutes = startTime.getMinutes();

		const endHours = endTime.getHours();
		const endMinutes = endTime.getMinutes();

		data.startDate.setHours(startHours);
		data.startDate.setMinutes(startMinutes);

		data.endDate.setHours(endHours);
		data.endDate.setMinutes(endMinutes);

		console.log(data);
	}

	return (
		<DashboardPageContainer>
			<PageTitle>Dashboard | Nuova fascia oraria</PageTitle>

			<h1>Nuova fascia oraria</h1>

			<TimeSlotForm onSubmit={onSubmit} events={events ?? []} form={form} />
		</DashboardPageContainer>
	);
}

DashboardTimeSlotsNew.hasSidebar = true;
DashboardTimeSlotsNew.sidebarLinks = EVENT_LINKS;
DashboardTimeSlotsNew.hasLocalCache = true;

export default DashboardTimeSlotsNew;
