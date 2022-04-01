import { Alert } from '@mantine/core';
import { ExclamationTriangleIcon } from '@modulz/radix-icons';
import { ServiceAccount, TimeSlot } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import SeminarForm from 'components/forms/SeminarForm';
import PageHeading from 'components/heading/PageHeading';
import getEndpoint from 'data/api/getEndpoint';
import useSeminarForm, { SeminarFormValues } from 'hooks/forms/useSeminarForm';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import useSWR from 'swr';

function DashboardSeminarsNew() {
	const { data: serviceAccount } = useSWR<ServiceAccount>(
		'/api/service-account',
		getEndpoint
	);
	const { data: timeSlots } = useSWR<TimeSlot[]>(
		'/api/time-slots',
		getEndpoint
	);
	const form = useSeminarForm();

	function onSubmit(val: SeminarFormValues) {
		console.log(val);
	}

	if (!serviceAccount) {
		return (
			<DashboardPageContainer>
				<PageHeading>Nuovo seminario</PageHeading>

				<Alert
					color="red"
					title="Importante"
					icon={<ExclamationTriangleIcon />}
				>
					Prima di poter creare seminari devi collegare un account di servizio!
				</Alert>
			</DashboardPageContainer>
		);
	}

	return (
		<DashboardPageContainer>
			<PageHeading>Nuovo seminario</PageHeading>

			<SeminarForm
				form={form}
				timeSlots={timeSlots ?? []}
				onSubmit={onSubmit}
			/>
		</DashboardPageContainer>
	);
}

DashboardSeminarsNew.hasSidebar = true;
DashboardSeminarsNew.sidebarLinks = EVENT_LINKS;
DashboardSeminarsNew.hasLocalCache = true;

export default DashboardSeminarsNew;
