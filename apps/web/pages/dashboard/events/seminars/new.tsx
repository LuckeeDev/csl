import { Alert } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconX, IconAlertTriangle } from '@tabler/icons-react';
import { Seminar, TimeSlot } from '@prisma/client';
import DashboardPageContainer from 'components/containers/DashboardPageContainer';
import SeminarForm from 'components/forms/SeminarForm';
import PageHeading from 'components/heading/PageHeading';
import ButtonLink from 'components/links/ButtonLink';
import getEndpoint from 'data/api/getEndpoint';
import { createSeminar } from 'data/api/seminars';
import { environment } from 'environments/environment';
import useServiceAccount from 'hooks/accounts/useServiceAccount';
import useSeminarForm, { SeminarFormValues } from 'hooks/forms/useSeminarForm';
import { EVENT_LINKS } from 'navigation/dashboard/events';
import useSWR from 'swr';
import getLocation from 'utils/events/getLocation';
import { v4 } from 'uuid';

function DashboardSeminarsNew() {
	const { data: timeSlots } = useSWR<TimeSlot[]>(
		'/api/time-slots',
		getEndpoint
	);
	const { data: seminarsData, mutate } = useSWR<{
		seminars: Seminar[];
		seminarsCount: number;
	}>('/api/seminars?page=1', getEndpoint);
	const form = useSeminarForm();
	const { serviceAccount } = useServiceAccount();

	async function onSubmit(val: SeminarFormValues) {
		const id = v4();

		if (!serviceAccount || !timeSlots) {
			showNotification({
				color: 'red',
				icon: <IconX />,
				message:
					'Devi collegare un account di servizio prima di creare un seminario!',
				title: 'Errore',
			});
		} else {
			showNotification({
				id: `create-seminar-${id}`,
				message: `Creazione ${
					val.location ? 'del seminario' : 'della riunione Meet'
				} in corso...`,
				loading: true,
			});

			const location = await getLocation(
				val,
				timeSlots,
				serviceAccount.accessToken
			);

			if (!val.location) {
				updateNotification({
					id: `create-seminar-${id}`,
					message: 'Riunione creata, creazione del seminario in corso...',
					loading: true,
				});
			}

			const postData: SeminarFormValues = { ...val, location };

			await mutate(createSeminar(postData), {
				optimisticData: {
					seminars: [
						...(seminarsData?.seminars ?? []),
						{
							...postData,
							created_at: new Date(),
							updated_at: new Date(),
							id: 'new',
						},
					],
					seminarsCount: seminarsData?.seminarsCount ?? 0,
				},
				revalidate: false,
			});

			updateNotification({
				id: `create-seminar-${id}`,
				title: 'Seminario creato',
				message:
					'Il seminario è stato creato ed è ora disponibile nella pagina degli eventi',
				loading: false,
				color: 'teal',
				icon: <IconCheck />,
			});

			form.reset();
		}
	}

	if (!serviceAccount) {
		return (
			<DashboardPageContainer>
				<PageHeading>Nuovo seminario</PageHeading>

				<Alert color="red" title="Importante" icon={<IconAlertTriangle />}>
					Prima di poter creare seminari devi collegare un account di servizio!
					<br />
					<ButtonLink
						mt="xs"
						size="xs"
						variant={serviceAccount ? 'outline' : 'filled'}
						href={`/api/service-account/sign-in?redirectUri=${environment.url}/dashboard/events/service-account`}
					>
						{serviceAccount ? 'Cambia' : 'Collega'} account di servizio
					</ButtonLink>
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
